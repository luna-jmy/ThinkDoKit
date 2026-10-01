/**
 * FlattenEmbeds — 光标定位 + 选择确认式嵌入内联
 *
 * 工作流：
 *   1. 自动识别光标附近（优先同行）的 ![[嵌入]] 引用
 *   2. 如果只有一个嵌入 → 跳过选择，直接确认
 *   3. 多个嵌入 → suggester 选择（光标所在行优先排列）
 *   4. 确认后执行：内容内联到当前位置，源笔记对应段落替换为反向嵌入
 *
 * 支持格式：
 *   ![[笔记名]]              → 内联整个笔记，源笔记替换为 ![[当前笔记]]
 *   ![[笔记名#标题]]          → 内联标题段落，源笔记该段落替换为 ![[当前笔记#标题]]
 *   ![[笔记名#标题1#标题2]]   → 内联嵌套标题段落，仅替换最深层标题
 *   ![[笔记名#标题|^块ID]]   → 内联标题段落（忽略块ID）
 */

module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // ── 1. 获取当前文件和光标 ──

    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice('请先打开一个笔记');
        return;
    }

    const activeLeaf = app.workspace.activeLeaf;
    if (!activeLeaf || !activeLeaf.view || !activeLeaf.view.editor) {
        new Notice('无法获取编辑器视图');
        return;
    }
    const editor = activeLeaf.view.editor;
    const cursor = editor.getCursor();

    const currentBasename = activeFile.basename;
    let content = await app.vault.read(activeFile);

    // ── 2. 解析所有 ![[嵌入]] 并记录位置 ──

    const embedRegex = /!\[\[([^\]|#]+)(?:#([^\]|]+?))?(?:\|[^\]]*)?\]\]/g;
    const embeds = [];
    let m;
    while ((m = embedRegex.exec(content)) !== null) {
        const lineNum = content.substring(0, m.index).split('\n').length - 1;
        embeds.push({
            fullMatch: m[0],
            noteRef: m[1].trim(),
            headingChain: m[2] ? m[2].trim().replace(/\|.*$/, '') : null,
            index: m.index,
            line: lineNum
        });
    }

    if (embeds.length === 0) {
        new Notice('当前笔记没有 ![[嵌入]] 引用');
        return;
    }

    // ── 3. 找光标最近的嵌入（同行优先） ──

    let cursorIdx = 0;
    let minDist = Infinity;
    embeds.forEach((e, i) => {
        const onSameLine = e.line === cursor.line;
        const dist = Math.abs(e.line - cursor.line);
        if (onSameLine || (minDist !== 0 && dist < minDist)) {
            minDist = onSameLine ? 0 : dist;
            cursorIdx = i;
        }
    });

    const ordered = [embeds[cursorIdx], ...embeds.filter((_, i) => i !== cursorIdx)];

    // ── 4. 用户选择 ──

    let targets;

    if (embeds.length === 1) {
        targets = [embeds[0]];
    } else {
        const labels = ordered.map((e, i) => {
            const icon = i === 0 ? '◆' : '◇';
            const desc = e.headingChain
                ? `${e.noteRef} → #${e.headingChain}`
                : `${e.noteRef} → 整篇笔记`;
            return `${icon} ![[${desc}]]  (行 ${e.line + 1})`;
        });
        labels.push('──────────────');
        labels.push(`⚡ 全部嵌入（${embeds.length} 个）`);

        const values = [
            ...ordered,
            { type: 'sep' },
            { type: 'all' }
        ];

        const selected = await quickAddApi.suggester(
            labels,
            values,
            '选择要内联的嵌入引用'
        );

        if (!selected) return;

        if (selected.type === 'all') {
            targets = [...embeds];
        } else if (selected.type === 'sep') {
            return;
        } else {
            targets = [selected];
        }
    }

    // ── 5. 预解析 + 确认 ──

    const preview = targets.map(e => {
        const src = app.metadataCache.getFirstLinkpathDest(e.noteRef, activeFile.path);
        const srcLabel = src ? src.basename : '?' + e.noteRef;
        if (e.headingChain) {
            return `![[${e.noteRef}#${e.headingChain}]] → 内容移入，${srcLabel} 中替换为 ![[${currentBasename}#${e.headingChain}]]`;
        }
        return `![[${e.noteRef}]] → 内容移入，${srcLabel} 中替换为 ![[${currentBasename}]]`;
    });

    const confirmMsg = targets.length === 1
        ? `${preview[0]}？`
        : `将执行 ${targets.length} 项操作：\n${preview.map(p => `  ${p}`).join('\n')}`;

    const confirmed = await quickAddApi.suggester(
        ['✅ 确认执行', '❌ 取消'],
        [true, false],
        confirmMsg
    );

    if (!confirmed) return;

    // ── 6. 执行内联 ──

    const sortedTargets = [...targets].sort((a, b) => b.index - a.index);

    const sourceCache = new Map();
    let replaceCount = 0;
    let firstReplaceLine = -1;
    const errors = [];

    for (const target of sortedTargets) {
        const noteRef = target.noteRef;
        const headings = target.headingChain
            ? target.headingChain.split('#').map(h => h.trim())
            : [];

        const sourceFile = app.metadataCache.getFirstLinkpathDest(noteRef, activeFile.path);
        if (!sourceFile) {
            errors.push(`无法解析: ${noteRef}`);
            continue;
        }
        if (sourceFile.path === activeFile.path) {
            errors.push(`跳过自引用: ${noteRef}`);
            continue;
        }

        if (!sourceCache.has(sourceFile.path)) {
            sourceCache.set(sourceFile.path, await app.vault.read(sourceFile));
        }
        let sourceContent = sourceCache.get(sourceFile.path);

        let inlineContent = '';

        if (headings.length === 0) {
            // ── 整个笔记嵌入：用源文件名作一级标题包裹，回引精确指向该标题 ──
            const sourceBasename = sourceFile.basename;
            inlineContent = `# ${sourceBasename}\n${stripFrontmatter(sourceContent)}`;
            sourceCache.set(sourceFile.path, `![[${currentBasename}#${sourceBasename}]]`);
        } else {
            // ── 标题段落嵌入：源笔记该段落替换为反向引用 ──
            const result = extractHeadingChain(sourceContent, headings);
            if (result.found) {
                inlineContent = result.content;
                const backRef = `![[${currentBasename}#${headings.join('#')}]]`;
                const newSource = replaceHeadingChain(sourceContent, headings, backRef);
                sourceCache.set(sourceFile.path, newSource);
            } else {
                errors.push(`未找到标题: ${noteRef}#${headings.join('#')}`);
                continue;
            }
        }

        // 替换当前笔记中的嵌入
        const lineNum = content.substring(0, target.index).split('\n').length - 1;
        const lineStart = content.lastIndexOf('\n', target.index) + 1;
        const lineEnd = content.indexOf('\n', target.index + target.fullMatch.length);
        const linePrefix = content.substring(lineStart, target.index);
        const lineSuffix = lineEnd === -1 ? '' : content.substring(target.index + target.fullMatch.length, lineEnd);
        const isOnlyOnLine = linePrefix.trim() === '' && lineSuffix.trim() === '';

        if (isOnlyOnLine) {
            content = content.substring(0, lineStart) + inlineContent
                + content.substring(lineEnd === -1 ? content.length : lineEnd);
        } else {
            content = content.substring(0, target.index) + inlineContent
                + content.substring(target.index + target.fullMatch.length);
        }

        if (firstReplaceLine === -1 || lineNum < firstReplaceLine) {
            firstReplaceLine = lineNum;
        }
        replaceCount++;
    }

    // ── 7. 写回当前笔记 ──

    await app.vault.modify(activeFile, content);

    if (firstReplaceLine >= 0) {
        editor.setCursor({ line: firstReplaceLine, ch: 0 });
        editor.focus();
    }

    // ── 8. 写回源笔记（替换为反向引用） ──

    for (const [path, newContent] of sourceCache) {
        const file = app.vault.getAbstractFileByPath(path);
        if (!file || !file.extension) continue;
        await app.vault.modify(file, newContent);
    }

    // ── 9. 结果通知 ──

    let msg = `已内联 ${replaceCount} 个嵌入，源笔记已替换为反向引用`;
    if (errors.length > 0) msg += `\n⚠ ${errors.length} 个问题`;
    new Notice(msg);
    if (errors.length > 0) console.log('[FlattenEmbeds]', errors);
};


// ─── 工具函数 ───

/**
 * 提取标题链对应的段落（支持嵌套标题如 标题1#标题2）
 */
function extractHeadingChain(content, headings) {
    let currentContent = content;
    let firstRemaining = null;

    for (let i = 0; i < headings.length; i++) {
        const result = extractSingleHeading(currentContent, headings[i]);

        if (!result.found) {
            return { found: false, content: '', remaining: content };
        }

        if (i === 0) {
            firstRemaining = result.remaining;
        }

        if (i < headings.length - 1) {
            currentContent = result.content;
        } else {
            return {
                found: true,
                content: result.content,
                remaining: firstRemaining || result.remaining
            };
        }
    }

    return { found: false, content: '', remaining: content };
}

/**
 * 从内容中提取单个标题及其下属内容
 */
function extractSingleHeading(content, headingText) {
    const lines = content.split('\n');
    let headingIndex = -1;
    let headingLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+(.+?)(?:\s+[#\[]{2}.*)?$/);
        if (m && m[2].trim() === headingText) {
            headingIndex = i;
            headingLevel = m[1].length;
            break;
        }
    }

    if (headingIndex === -1) {
        return { found: false, content: '', remaining: content };
    }

    let endIndex = lines.length;
    for (let i = headingIndex + 1; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+/);
        if (m && m[1].length <= headingLevel) {
            endIndex = i;
            break;
        }
    }

    const extracted = lines.slice(headingIndex, endIndex);
    const remaining = [...lines.slice(0, headingIndex), ...lines.slice(endIndex)];

    while (remaining.length > 0 && remaining[remaining.length - 1].trim() === '') {
        remaining.pop();
    }

    return {
        found: true,
        content: extracted.join('\n'),
        remaining: remaining.join('\n')
    };
}

/**
 * 将标题链对应的段落替换为指定文本（反向引用）
 * 单层标题：直接替换该标题段落
 * 嵌套标题：保留父级标题，仅替换最深层目标段落
 */
function replaceHeadingChain(content, headings, replacement) {
    if (headings.length === 1) {
        return replaceSingleHeading(content, headings[0], replacement);
    }

    // 嵌套：找到父级标题段落，在其中递归替换子级
    const lines = content.split('\n');
    let headingIndex = -1;
    let headingLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+(.+?)(?:\s+[#\[]{2}.*)?$/);
        if (m && m[2].trim() === headings[0]) {
            headingIndex = i;
            headingLevel = m[1].length;
            break;
        }
    }

    if (headingIndex === -1) return content;

    let endIndex = lines.length;
    for (let i = headingIndex + 1; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+/);
        if (m && m[1].length <= headingLevel) {
            endIndex = i;
            break;
        }
    }

    // 在父级段落内（不含父级标题行）递归替换子级
    const sectionBody = lines.slice(headingIndex + 1, endIndex).join('\n');
    const newBody = replaceHeadingChain(sectionBody, headings.slice(1), replacement);

    return [
        ...lines.slice(0, headingIndex + 1),
        ...newBody.split('\n'),
        ...lines.slice(endIndex)
    ].join('\n');
}

/**
 * 将单个标题段落替换为指定文本
 */
function replaceSingleHeading(content, headingText, replacement) {
    const lines = content.split('\n');
    let headingIndex = -1;
    let headingLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+(.+?)(?:\s+[#\[]{2}.*)?$/);
        if (m && m[2].trim() === headingText) {
            headingIndex = i;
            headingLevel = m[1].length;
            break;
        }
    }

    if (headingIndex === -1) return content;

    let endIndex = lines.length;
    for (let i = headingIndex + 1; i < lines.length; i++) {
        const m = lines[i].match(/^(#{1,6})\s+/);
        if (m && m[1].length <= headingLevel) {
            endIndex = i;
            break;
        }
    }

    return [...lines.slice(0, headingIndex), replacement, ...lines.slice(endIndex)].join('\n');
}

/**
 * 去掉 YAML frontmatter
 */
function stripFrontmatter(content) {
    if (content.startsWith('---')) {
        const end = content.indexOf('---', 3);
        if (end !== -1) {
            return content.substring(end + 3).replace(/^\n+/, '');
        }
    }
    return content;
}

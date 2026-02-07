module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;

        console.log("Inline Field Update (Scanner + Interactive Mode) Started");

        // 1. 获取当前活动文件
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice("请先打开一个笔记文件");
            return;
        }

        // 2. 读取文件内容
        const content = await app.vault.read(activeFile);
        const lines = content.split('\n');

        // 3. 解析标题与按钮分布 (Scan Buttons)
        const headers = [];
        const headerRegex = /^(#{1,6})\s+(.*)$/;
        headers.push({ line: -1, text: "Top/No Header", hasButton: false });

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const match = line.match(headerRegex);
            if (match) {
                headers.push({
                    line: i,
                    text: match[2].trim(),
                    level: match[1].length,
                    hasButton: false
                });
            }
            if (line.includes('button-supdate')) {
                headers[headers.length - 1].hasButton = true;
            }
        }

        const activeHeaders = headers.filter(h => h.hasButton);

        // 4. Determine Target Section
        let targetHeader = null;

        if (activeHeaders.length === 0) {
            new Notice("未找到任何 update 按钮 (button-supdate)");
            return;
        } else if (activeHeaders.length === 1) {
            targetHeader = activeHeaders[0];
        } else {
            const options = activeHeaders.map(h => h.text);
            const selectedText = await quickAddApi.suggester(
                options,
                options,
                false,
                "检测到多个按钮，请选择要更新的区域:"
            );
            if (!selectedText) return;
            targetHeader = activeHeaders.find(h => h.text === selectedText);
        }

        // 5. Extract Fields in Target Section
        const startLine = targetHeader.line + 1;
        let endLine = lines.length;

        for (let i = startLine; i < lines.length; i++) {
            if (lines[i].match(headerRegex)) {
                endLine = i;
                break;
            }
        }

        const allFields = []; // All fields in this section
        const inlineFieldRegex = /\[([^:\]]+)::([^\]]*)\]/g;
        let isInCodeBlock = false;

        for (let i = startLine; i < endLine; i++) {
            const line = lines[i];
            if (line.trim().startsWith('```')) {
                isInCodeBlock = !isInCodeBlock;
                continue;
            }
            if (isInCodeBlock) continue;

            inlineFieldRegex.lastIndex = 0; // reset for new line
            let match;
            while ((match = inlineFieldRegex.exec(line)) !== null) {
                allFields.push({
                    lineIndex: i,
                    fullMatch: match[0],
                    fieldName: match[1].trim(),
                    currentValue: match[2].trim(),
                    isEmpty: match[2].trim() === "",
                    headerText: targetHeader.text
                });
            }
        }

        if (allFields.length === 0) {
            new Notice(`区域 "${targetHeader.text}" 下没有找到内联字段`);
            return;
        }

        // 6. Interaction Menu (New: All / Empty / Single)
        // 参考 InlineFieldUpdate.js 的逻辑
        const emptyFields = allFields.filter(f => f.isEmpty);

        const actionOptions = [];
        const actionValues = [];

        // Option 1: Process All
        actionOptions.push(`🔄 更新所有字段 (${allFields.length}个)`);
        actionValues.push('ALL');

        // Option 2: Process Empty Only (if any)
        if (emptyFields.length > 0) {
            actionOptions.push(`📝 仅填充空白字段 (${emptyFields.length}个)`);
            actionValues.push('EMPTY');
        }

        // Option 3: Process Single Field
        // 我们可以把每个字段作为独立的选项列出来，或者先选一个动作叫 "Select Single"
        // 为了方便，直接把每个字段列在下面 (Mix style)
        // 或者先选模式。InlineFieldUpdate.js 是把 "处理所有" 和 单个字段 放在同一个列表里。

        // 我们采用 InlineFieldUpdate.js 的混合列表模式，加上 "Empty Only" 选项
        const menuOptions = [];
        const menuValues = [];

        menuOptions.push(`🚀 处理本区所有字段 (${allFields.length}个)`);
        menuValues.push({ type: 'ALL' });

        if (emptyFields.length > 0) {
            menuOptions.push(`✨ 仅填充空白字段 (${emptyFields.length}个)`);
            menuValues.push({ type: 'EMPTY' });
        }

        menuOptions.push("--------------------------------");
        menuValues.push({ type: 'SEPARATOR' });

        allFields.forEach(f => {
            const status = f.isEmpty ? "【空白】" : `【${f.currentValue}】`;
            menuOptions.push(`📌 ${f.fieldName} ${status}`);
            menuValues.push({ type: 'SINGLE', field: f });
        });

        const selectedAction = await quickAddApi.suggester(
            menuOptions,
            menuValues,
            false,
            `区域: ${targetHeader.text} - 选择操作:`
        );

        if (!selectedAction || selectedAction.type === 'SEPARATOR') return;

        let fieldsToProcess = [];
        if (selectedAction.type === 'ALL') {
            fieldsToProcess = allFields;
        } else if (selectedAction.type === 'EMPTY') {
            fieldsToProcess = emptyFields;
        } else if (selectedAction.type === 'SINGLE') {
            fieldsToProcess = [selectedAction.field];
        }

        // 7. Process Loop
        const isCheckMode = targetHeader.text.includes("打卡");
        const isDataMode = targetHeader.text.includes("数据");

        let modifiedCount = 0;
        const updatesByLine = {};

        for (const field of fieldsToProcess) {
            const result = await processField(field, quickAddApi, isCheckMode, isDataMode);
            if (result.shouldUpdate) {
                if (!updatesByLine[field.lineIndex]) updatesByLine[field.lineIndex] = [];
                updatesByLine[field.lineIndex].push({
                    original: result.originalMatch,
                    newContent: result.newContent
                });
                modifiedCount++;
            }
        }

        // 8. Apply Updates
        if (modifiedCount > 0) {
            for (const lineIdx in updatesByLine) {
                let lineStr = lines[lineIdx];
                const cleanUpdates = updatesByLine[lineIdx];
                for (const update of cleanUpdates) {
                    lineStr = lineStr.replace(update.original, update.newContent);
                }
                lines[lineIdx] = lineStr;
            }
            const newContent = lines.join('\n');
            await app.vault.modify(activeFile, newContent);
            new Notice(`已更新 ${modifiedCount} 个字段`);
        } else {
            new Notice("未修改任何内容");
        }

    } catch (e) {
        console.error(e);
        new Notice("脚本运行出错: " + e.message);
    }
};

async function processField(field, quickAddApi, isCheckMode, isDataMode) {
    const { fieldName, currentValue, isEmpty, fullMatch } = field;
    let newValue = null;
    let shouldUpdate = false;

    // Prompt Text
    const basePrompt = isEmpty
        ? `请填写 "${fieldName}"`
        : `更新 "${fieldName}" (当前: ${currentValue})`;

    if (isCheckMode) {
        // 打卡 Checkbox
        const options = ['✔️', '❌', '🔲'];
        // 显示当前状态
        const displayOptions = options.map(opt =>
            opt === currentValue ? `${opt} - ${fieldName} (当前)` : `${opt} - ${fieldName}`
        );
        displayOptions.push("⏭️ 跳过");
        const values = [...options, 'SKIP'];

        const choice = await quickAddApi.suggester(displayOptions, values, false, `[打卡] ${basePrompt}`);
        if (choice && choice !== 'SKIP') {
            newValue = choice;
            shouldUpdate = true;
        }
    } else if (isDataMode) {
        // 数据 Number (Allow skip)
        // inputPrompt 不容易直接做 "Button Skip"，但用户可以 Escape 取消。
        // 为了显式 Skip，我们可以在 inputPrompt 里说明 "Esc to Skip" 或者不做特殊处理 (Cancel = Skip Loop? No, Cancel = Stop All?)
        // 为了更好的体验，通常 inputPrompt Cancel = Skip Current Field.
        // 但是 quickAddApi.inputPrompt 如果返回 undefined (Esc)，我们视为 Skip 还是 Quit?
        // 在批量处理中，通常 ESC = Quit Process. Input Empty = Clear?
        // 这里设定：ESC = Skip Current Field (继续下一个)。如果想退出整个脚本，需要狂按ESC？
        // 或者：ESC = 终止。
        // 让我们看看 checkbox 逻辑：choice === SKIP -> continue.
        // 对于 InputPrompt，我们很难加 Skip 按钮。
        // 变通：如果用户不输入直接回车 -> 保持原值 (Skip)。

        while (true) {
            const input = await quickAddApi.inputPrompt(
                `[数据] ${basePrompt}`,
                currentValue
            );

            if (input === undefined || input === null) {
                // User cancelled / Esc
                // 视为跳过当前字段
                break;
            }

            // 如果没变，也是跳过
            if (input === currentValue) break;

            if (!isNaN(parseFloat(input)) && isFinite(input)) {
                newValue = input;
                shouldUpdate = true;
                break;
            } else {
                new Notice("⚠️ 必须输入数字!");
            }
        }
    } else {
        // 普通 Text
        const input = await quickAddApi.inputPrompt(
            `[文本] ${basePrompt}`,
            currentValue
        );
        if (input !== undefined && input !== null && input !== currentValue) {
            newValue = input;
            shouldUpdate = true;
        }
    }

    if (shouldUpdate && newValue !== currentValue) {
        return {
            shouldUpdate: true,
            originalMatch: fullMatch,
            newContent: `[${fieldName}::${newValue}]`
        };
    }
    return { shouldUpdate: false };
}
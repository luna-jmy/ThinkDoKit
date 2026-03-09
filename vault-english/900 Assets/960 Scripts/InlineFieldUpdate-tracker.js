module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;
        const BUTTON_NAME = 'button-tracker';

        console.log(`Inline Field Update (${BUTTON_NAME} Mode) Started`);

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
            if (line.includes(BUTTON_NAME)) {
                headers[headers.length - 1].hasButton = true;
            }
        }

        const activeHeaders = headers.filter(h => h.hasButton);

        // 4. Determine Target Section
        let targetHeader = null;

        if (activeHeaders.length === 0) {
            new Notice(`未找到更新按钮 (${BUTTON_NAME})`);
            return;
        } else if (activeHeaders.length === 1) {
            targetHeader = activeHeaders[0];
        } else {
            const options = activeHeaders.map(h => h.text);
            const selectedText = await quickAddApi.suggester(
                options,
                options,
                false,
                `检测到多个 ${BUTTON_NAME}，请选择区域:`
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

        const allFields = [];
        const inlineFieldRegex = /\[([^:\]]+)::([^\]]*)\]/g;
        let isInCodeBlock = false;

        for (let i = startLine; i < endLine; i++) {
            const line = lines[i];
            if (line.trim().startsWith('```')) {
                isInCodeBlock = !isInCodeBlock;
                continue;
            }
            if (isInCodeBlock) continue;

            inlineFieldRegex.lastIndex = 0;
            let match;
            while ((match = inlineFieldRegex.exec(line)) !== null) {
                allFields.push({
                    lineIndex: i,
                    fullMatch: match[0],
                    fieldName: match[1].trim(),
                    currentValue: match[2].trim(),
                    isEmpty: match[2].trim() === ""
                });
            }
        }

        if (allFields.length === 0) {
            new Notice(`区域 "${targetHeader.text}" 下没有找到内联字段`);
            return;
        }

        // 6. Interaction Menu
        const emptyFields = allFields.filter(f => f.isEmpty);
        const menuOptions = [];
        const menuValues = [];

        menuOptions.push(`🚀 处理本区所有打卡 (${allFields.length}个)`);
        menuValues.push({ type: 'ALL' });

        if (emptyFields.length > 0) {
            menuOptions.push(`✨ 仅填充空白打卡 (${emptyFields.length}个)`);
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
            `打卡区域: ${targetHeader.text}`
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

        // 7. Process Loop (Checkbox Only)
        let modifiedCount = 0;
        const updatesByLine = {};

        for (const field of fieldsToProcess) {
            const result = await processFieldTracker(field, quickAddApi);
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
            new Notice(`已更新 ${modifiedCount} 个打卡项`);
        } else {
            new Notice("未修改任何内容");
        }

    } catch (e) {
        console.error(e);
        new Notice("脚本运行出错: " + e.message);
    }
};

async function processFieldTracker(field, quickAddApi) {
    const { fieldName, currentValue, fullMatch } = field;

    const options = ['✔️', '❌', '🔲'];
    const displayOptions = options.map(opt =>
        opt === currentValue ? `${opt} - ${fieldName} (当前)` : `${opt} - ${fieldName}`
    );
    displayOptions.push("⏭️ 跳过");
    const values = [...options, 'SKIP'];

    const choice = await quickAddApi.suggester(
        displayOptions,
        values,
        false,
        `打卡: ${fieldName}`
    );

    if (choice && choice !== 'SKIP' && choice !== currentValue) {
        return {
            shouldUpdate: true,
            originalMatch: fullMatch,
            newContent: `[${fieldName}::${choice}]`
        };
    }
    return { shouldUpdate: false };
}

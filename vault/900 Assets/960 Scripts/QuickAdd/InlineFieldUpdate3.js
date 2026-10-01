module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;
        
        console.log("Enhanced QuickAdd macro with grouping started");
        
        // 获取当前活动文件
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile) {
            console.log("No active file found");
            return;
        }
        
        console.log("Active file:", activeFile.name);
        
        // 读取文件内容
        const content = await app.vault.read(activeFile);
        console.log("File content length:", content.length);
        
        // 查找所有 button-supdate 按钮的位置（支持任意后缀，如 button-supdate-group1）
        const buttonRegex = /`button-supdate[^`]*`/g;
        const buttonMatches = [];
        let buttonMatch;
        
        while ((buttonMatch = buttonRegex.exec(content)) !== null) {
            const buttonIndex = buttonMatch.index;
            const buttonText = buttonMatch[0];
            // 提取按钮名称（去掉反引号）
            const buttonName = buttonText.slice(1, -1); // 去掉前后的 `
            
            // 获取按钮所在行号
            const textBeforeButton = content.substring(0, buttonIndex);
            const lineNumber = textBeforeButton.split('\n').length;
            
            buttonMatches.push({
                index: buttonIndex,
                lineNumber: lineNumber,
                text: buttonText,
                name: buttonName
            });
        }
        
        if (buttonMatches.length === 0) {
            console.log("No button-supdate found");
            new Notice("未找到 button-supdate 按钮（支持 button-supdate、button-supdate-xxx 等格式）", 2000);
            return;
        }
        
        console.log("Found button-supdate buttons:", buttonMatches.length);
        
        // 获取当前光标位置
        const activeView = app.workspace.getActiveViewOfType(app.workspace.activeLeaf.view.constructor);
        const cursorPosition = activeView ? activeView.editor.getCursor() : null;
        const cursorLine = cursorPosition ? cursorPosition.line : null;
        
        console.log("Cursor line:", cursorLine);
        
        // ===== 智能选择按钮 =====
        let selectedButton;
        
        if (buttonMatches.length === 1) {
            // 只有一个按钮，直接使用
            selectedButton = buttonMatches[0];
            console.log("Only one button found, using it automatically");
        } else if (cursorLine !== null) {
            // 多个按钮时，找到离光标最近的按钮
            let nearestButton = null;
            let minDistance = Infinity;
            
            for (let btn of buttonMatches) {
                const distance = Math.abs(btn.lineNumber - 1 - cursorLine); // lineNumber 是 1-based
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestButton = btn;
                }
            }
            
            if (nearestButton && minDistance <= 3) {
                // 如果最近的按钮在3行以内，自动使用
                selectedButton = nearestButton;
                console.log(`Auto-selected nearest button "${selectedButton.name}" at line ${selectedButton.lineNumber} (distance: ${minDistance})`);
                new Notice(`自动选择按钮: ${selectedButton.name}`, 2000);
            } else {
                // 距离太远，让用户手动选择
                const buttonOptions = buttonMatches.map((btn, idx) => {
                // 提取按钮显示名称：只显示 button-supdate- 后面的部分
                    const displayName = btn.name.startsWith('button-supdate-') 
                        ? btn.name.substring('button-supdate-'.length)
                        : btn.name;
                    return `📍 ${displayName} (第 ${btn.lineNumber} 行)`;
                });
                
                const selectedIndex = await quickAddApi.suggester(
                    buttonOptions,
                    buttonMatches.map((_, idx) => idx),
                    false,
                    "选择要处理的按钮:"
                );
                
                if (selectedIndex === null || selectedIndex === undefined) {
                    console.log("No button selected");
                    return;
                }
                
                selectedButton = buttonMatches[selectedIndex];
                console.log(`User selected button "${selectedButton.name}" at line ${selectedButton.lineNumber}`);
            }
        } else {
            // 无法获取光标位置，让用户选择
            const buttonOptions = buttonMatches.map((btn, idx) => {
                return `📍 ${btn.name} (第 ${btn.lineNumber} 行)`;
            });
            
            const selectedIndex = await quickAddApi.suggester(
                buttonOptions,
                buttonMatches.map((_, idx) => idx),
                false,
                "选择要处理的按钮:"
            );
            
            if (selectedIndex === null || selectedIndex === undefined) {
                console.log("No button selected");
                return;
            }
            
            selectedButton = buttonMatches[selectedIndex];
            console.log(`User selected button "${selectedButton.name}" at line ${selectedButton.lineNumber}`);
        }
        
        const buttonPosition = selectedButton.index;
        const buttonLineNumber = selectedButton.lineNumber - 1; // 转换为0-based
        
        // 查找下一个按钮的位置(如果有)
        let nextButtonPosition = content.length; // 默认为文件末尾
        const currentButtonIndex = buttonMatches.indexOf(selectedButton);
        if (currentButtonIndex < buttonMatches.length - 1) {
            nextButtonPosition = buttonMatches[currentButtonIndex + 1].index;
        }
        
        console.log("Button position:", buttonPosition);
        console.log("Next button position:", nextButtonPosition);
        
        // 正则表达式匹配所有内联字段:[字段名::值] 或 [字段名::]
        const inlineFieldRegex = /\[([^:\]]+)::([^\]]*)\]/g;
        const fields = [];
        let match;
        
        // 匹配代码块的正则表达式
        const codeBlockRegex = /```[\s\S]*?```|`[^`\n]*`/g;
        const codeBlocks = [];
        let codeBlockMatch;
        
        // 收集所有代码块的位置信息
        while ((codeBlockMatch = codeBlockRegex.exec(content)) !== null) {
            codeBlocks.push({
                startIndex: codeBlockMatch.index,
                endIndex: codeBlockMatch.index + codeBlockMatch[0].length
            });
        }
        
        // 检查位置是否在代码块内
        const isInCodeBlock = (position) => {
            return codeBlocks.some(block => 
                position >= block.startIndex && position < block.endIndex
            );
        };
        
        // 收集所有内联字段的信息，但跳过代码块内的字段和不在按钮下方的字段
        while ((match = inlineFieldRegex.exec(content)) !== null) {
            // 检查字段是否在代码块内
            if (isInCodeBlock(match.index)) {
                continue; // 跳过代码块内的字段
            }
            
            // 检查字段是否在当前按钮和下一个按钮之间
            if (match.index <= buttonPosition || match.index >= nextButtonPosition) {
                continue; // 跳过不在按钮范围内的字段
            }
            
            const fieldName = match[1].trim();
            const fieldValue = match[2].trim();
            const isEmpty = fieldValue === "";
            
            // 获取字段所在的行号
            const textBefore = content.substring(0, match.index);
            const lineNumber = textBefore.split('\n').length - 1;
            
            // 检查字段是否在连续段落中(与按钮之间没有空行)
            const textBetweenButtonAndField = content.substring(buttonPosition, match.index);
            const linesBetween = textBetweenButtonAndField.split('\n');
            
            // 检查按钮和字段之间是否有空行(跳过按钮所在行)
            let hasEmptyLineBetween = false;
            for (let i = 1; i < linesBetween.length; i++) {
                if (linesBetween[i].trim() === '') {
                    hasEmptyLineBetween = true;
                    break;
                }
            }
            
            // 如果按钮和字段之间有空行,则跳过此字段
            if (hasEmptyLineBetween) {
                continue;
            }
            
            fields.push({
                fullMatch: match[0],
                fieldName: fieldName,
                currentValue: fieldValue,
                isEmpty: isEmpty,
                startIndex: match.index,
                endIndex: match.index + match[0].length,
                lineNumber: lineNumber
            });
        }
        
        console.log("Found inline fields:", fields.length);
        
        if (fields.length === 0) {
            console.log("No inline fields found");
            new Notice("未找到内联字段", 2000);
            return;
        }
        
        // 按字段在笔记中出现的顺序排序(根据startIndex)
        fields.sort((a, b) => a.startIndex - b.startIndex);
        
        // 调试:打印所有字段
        console.log("All fields:");
        fields.forEach((field, index) => {
            console.log(`${index}: [${field.fieldName}::${field.currentValue}] at line ${field.lineNumber}`);
        });
        
        // 改进的分组逻辑:识别重复的字段序列模式
        const groupFields = (fields) => {
            const groups = [];
            const ungroupedFields = [];
            const processedIndices = new Set();
            
            console.log("\n=== Starting pattern detection ===");
            
            // 尝试从每个位置开始寻找重复模式
            for (let i = 0; i < fields.length; i++) {
                if (processedIndices.has(i)) continue;
                
                // 尝试不同的模式长度(从2到剩余字段数)
                for (let patternLength = 2; patternLength <= Math.floor((fields.length - i) / 2); patternLength++) {
                    // 提取候选模式
                    const pattern = [];
                    for (let j = 0; j < patternLength; j++) {
                        if (i + j >= fields.length || processedIndices.has(i + j)) break;
                        pattern.push(fields[i + j].fieldName);
                    }
                    
                    if (pattern.length !== patternLength) continue;
                    
                    console.log(`\nTrying pattern at index ${i}: [${pattern.join(' → ')}]`);
                    
                    // 检查这个模式是否重复出现
                    const matchingGroups = [];
                    let currentIndex = i;
                    let repetitionCount = 0;
                    
                    while (currentIndex < fields.length) {
                        // 检查从currentIndex开始是否匹配模式
                        let matches = true;
                        const groupFields = [];
                        
                        for (let j = 0; j < patternLength; j++) {
                            const fieldIndex = currentIndex + j;
                            if (fieldIndex >= fields.length || 
                                processedIndices.has(fieldIndex) ||
                                fields[fieldIndex].fieldName !== pattern[j]) {
                                matches = false;
                                break;
                            }
                            groupFields.push(fields[fieldIndex]);
                        }
                        
                        if (matches) {
                            matchingGroups.push(groupFields);
                            repetitionCount++;
                            console.log(`  Found repetition ${repetitionCount} at index ${currentIndex}`);
                            currentIndex += patternLength;
                        } else {
                            break;
                        }
                    }
                    
                    // 如果找到至少2次重复,创建分组
                    if (repetitionCount >= 2) {
                        console.log(`✓ Created ${repetitionCount} groups with pattern: [${pattern.join(' → ')}]`);
                        
                        // 将每个重复作为一个组
                        matchingGroups.forEach((groupFields, groupIndex) => {
                            groups.push(groupFields);
                            // 标记这些字段为已处理
                            groupFields.forEach(field => {
                                const index = fields.indexOf(field);
                                processedIndices.add(index);
                            });
                        });
                        
                        // 跳过已处理的字段
                        break;
                    }
                }
            }
            
            // 收集未分组的字段
            fields.forEach((field, index) => {
                if (!processedIndices.has(index)) {
                    ungroupedFields.push(field);
                    console.log(`Ungrouped field: ${field.fieldName}`);
                }
            });
            
            console.log(`\n=== Final result: ${groups.length} groups, ${ungroupedFields.length} ungrouped fields ===`);
            
            return { groups, ungroupedFields };
        };
        
        const { groups, ungroupedFields } = groupFields(fields);
        
        // 定义打卡字段的预设值
        const checkboxFields = ['flashcard', 'meditation', 'fasting'];
        const checkboxOptions = ['✅', '❌', '🔲'];
        
        // ===== 第一次选择:显示分组和单独字段 =====
        const firstLevelOptions = [];
        const firstLevelValues = [];
        
        // 添加"处理所有字段"选项
        firstLevelOptions.push("📄 处理所有字段");
        firstLevelValues.push({ type: 'all' });
        
        // 添加"处理所有空白字段"选项
        const emptyFields = fields.filter(field => field.isEmpty);
        if (emptyFields.length > 0) {
            firstLevelOptions.push(`📋 处理所有空白字段 (${emptyFields.length}个)`);
            firstLevelValues.push({ type: 'empty', fields: emptyFields });
        }
        
        // 添加分组选项
        groups.forEach((group, index) => {
            const groupNumber = index + 1;
            const fieldName = group[0].fieldName;
            const count = group.length;
            const previewValue = group[0].currentValue || '空白';
            firstLevelOptions.push(`📦 组${groupNumber}: ${fieldName} (${count}个) - 【${previewValue}】`);
            firstLevelValues.push({ type: 'group', index: index, fields: group });
        });
        
        // 添加单独字段选项
        ungroupedFields.forEach(field => {
            const status = field.isEmpty ? "【空白】" : `【${field.currentValue}】`;
            firstLevelOptions.push(`📌 ${field.fieldName} ${status}`);
            firstLevelValues.push({ type: 'field', field: field });
        });
        
        console.log("First level options:", firstLevelOptions);
        
        // 第一次选择
        const selectedOption = await quickAddApi.suggester(
            firstLevelOptions,
            firstLevelValues,
            false,
            "选择要处理的组或字段:"
        );
        
        if (!selectedOption) {
            console.log("No selection made");
            return;
        }
        
        // ===== 处理选择结果 =====
        let fieldsToProcess = [];
        
        if (selectedOption.type === 'all') {
            // 处理所有字段
            fieldsToProcess = fields;
        } else if (selectedOption.type === 'empty') {
            // 处理所有空白字段
            fieldsToProcess = selectedOption.fields;
        } else if (selectedOption.type === 'group') {
            // ===== 第二次选择:显示组内字段 =====
            const groupFields = selectedOption.fields;
            const groupNumber = selectedOption.index + 1;
            
            const secondLevelOptions = [];
            const secondLevelValues = [];
            
            // 添加"处理组内所有字段"选项
            secondLevelOptions.push(`📄 处理组${groupNumber}内所有字段`);
            secondLevelValues.push({ type: 'all', fields: groupFields });
            
            // 添加组内每个字段
            groupFields.forEach((field, idx) => {
                const status = field.isEmpty ? "【空白】" : `【${field.currentValue}】`;
                secondLevelOptions.push(`${field.fieldName} ${status} (第${idx + 1}个)`);
                secondLevelValues.push({ type: 'single', field: field });
            });
            
            // 添加跳过选项
            secondLevelOptions.push("⏭️ 跳过此组");
            secondLevelValues.push({ type: 'skip' });
            
            console.log("Second level options:", secondLevelOptions);
            
            // 第二次选择
            const groupSelection = await quickAddApi.suggester(
                secondLevelOptions,
                secondLevelValues,
                false,
                `组${groupNumber} (${groupFields[0].fieldName}) - 选择要处理的字段:`
            );
            
            if (!groupSelection || groupSelection.type === 'skip') {
                console.log("Skipped group");
                return;
            }
            
            if (groupSelection.type === 'all') {
                // 处理组内所有字段
                fieldsToProcess = groupSelection.fields;
            } else if (groupSelection.type === 'single') {
                // 处理单个字段
                fieldsToProcess = [groupSelection.field];
            }
        } else if (selectedOption.type === 'field') {
            // 处理单个字段
            fieldsToProcess = [selectedOption.field];
        }
        
        // ===== 处理字段并更新内容 =====
        let modifiedCount = 0;
        let updatedContent = content;
        
        for (let field of fieldsToProcess) {
            const result = await processField(field, quickAddApi, checkboxFields, checkboxOptions);
            if (result.updated) {
                updatedContent = updatedContent.replace(field.fullMatch, result.newField);
                modifiedCount++;
            }
        }
        
        // 如果有字段被修改,更新文件
        if (modifiedCount > 0) {
            await app.vault.modify(activeFile, updatedContent);
            console.log(`Successfully modified ${modifiedCount} fields`);
            new Notice(`成功处理了 ${modifiedCount} 个字段`, 3000);
        } else {
            console.log("No fields were modified");
            new Notice("没有字段被修改", 2000);
        }
        
    } catch (error) {
        console.error("Error in QuickAdd macro:", error);
        new Notice(`处理字段时出错: ${error.message}`, 5000);
    }
};

// 处理单个字段的函数
async function processField(field, quickAddApi, checkboxFields, checkboxOptions) {
    const fieldName = field.fieldName;
    const currentValue = field.currentValue;
    
    console.log(`Processing field: ${fieldName} = ${currentValue}`);
    
    // 检查是否为打卡字段
    const isCheckboxField = checkboxFields.some(checkboxField => 
        fieldName.toLowerCase().includes(checkboxField.toLowerCase())
    );
    
    let userInput;
    let shouldUpdate = false;
    
    try {
        if (isCheckboxField) {
            // 为打卡字段提供选择选项
            const displayOptions = checkboxOptions.map(option => {
                const isCurrent = option === currentValue;
                return isCurrent ? `${option} - ${fieldName} (当前)` : `${option} - ${fieldName}`;
            });
            
            displayOptions.push("⏭️ 跳过此字段");
            const allOptions = [...checkboxOptions, "SKIP"];
            
            const promptText = field.isEmpty 
                ? `选择 "${fieldName}" 的状态:` 
                : `当前值: ${currentValue}\n选择 "${fieldName}" 的新状态:`;
            
            userInput = await quickAddApi.suggester(displayOptions, allOptions, false, promptText);
            
            if (userInput === "SKIP") {
                shouldUpdate = false;
            } else if (userInput !== null && userInput !== undefined) {
                shouldUpdate = true;
            } else {
                shouldUpdate = false;
                console.log("User cancelled checkbox selection");
            }
        } else {
            // 普通字段使用输入框
            const promptText = field.isEmpty 
                ? `请为字段 "${fieldName}" 输入值:` 
                : `当前值: ${currentValue}\n请为字段 "${fieldName}" 输入新值:`;
            
            userInput = await quickAddApi.inputPrompt(promptText, currentValue);
            
            if (userInput === null || userInput === undefined) {
                shouldUpdate = false;
                console.log("User cancelled input prompt");
            } else {
                shouldUpdate = true;
            }
        }
        
        console.log("User input:", userInput, "Should update:", shouldUpdate);
        
    } catch (error) {
        console.log("Input cancelled or error:", error);
        shouldUpdate = false;
    }
    
    // 只有当用户确认更新且输入值与当前值不同时才更新字段
    if (shouldUpdate && userInput !== null && userInput !== currentValue) {
        const newField = `[${fieldName}::${userInput}]`;
        console.log(`Updating field: ${field.fullMatch} -> ${newField}`);
        
        return {
            updated: true,
            newField: newField
        };
    }
    
    return {
        updated: false,
        newField: field.fullMatch
    };
}
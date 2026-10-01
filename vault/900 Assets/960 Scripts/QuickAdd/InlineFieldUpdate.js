module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;
        
        // 测试基本功能
        console.log("Enhanced QuickAdd macro started");
        
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
        
        // 正则表达式匹配所有内联字段：[字段名::值] 或 [字段名::]
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
        
        // 收集所有内联字段的信息，但跳过代码块内的字段
        while ((match = inlineFieldRegex.exec(content)) !== null) {
            // 检查字段是否在代码块内
            if (isInCodeBlock(match.index)) {
                continue; // 跳过代码块内的字段
            }
            
            const fieldName = match[1].trim();
            const fieldValue = match[2].trim();
            const isEmpty = fieldValue === "";
            
            fields.push({
                fullMatch: match[0],
                fieldName: fieldName,
                currentValue: fieldValue,
                isEmpty: isEmpty,
                startIndex: match.index,
                endIndex: match.index + match[0].length
            });
        }
        
        console.log("Found inline fields:", fields.length);
        
        if (fields.length === 0) {
            console.log("No inline fields found");
            return;
        }
        
        // 按字段在笔记中出现的顺序排序（根据startIndex）
        fields.sort((a, b) => a.startIndex - b.startIndex);
        
        // 定义打卡字段的预设值
        const checkboxFields = ['medicine', 'flashcard', 'meditation', 'fasting'];
        const checkboxOptions = ['✅', '❎', '🔲'];
        
        let updatedContent = content;
        let modifiedCount = 0;
        
        // 创建字段选择列表
        const fieldDisplayOptions = fields.map(field => {
            const status = field.isEmpty ? "【空白】" : `【${field.currentValue}】`;
            return `${field.fieldName} ${status}`;
        });
        
        // 添加"全部处理"选项
        fieldDisplayOptions.unshift("🔄 处理所有字段");
        
        // 让用户选择要处理的字段
        console.log("Showing field selector");
        const selectedOption = await quickAddApi.suggester(
            fieldDisplayOptions,
            ["ALL", ...fields],
            false,
            "选择要处理的字段:"
        );
        
        if (!selectedOption) {
            console.log("No field selected");
            return;
        }
        
        // 确定要处理的字段列表
        let fieldsToProcess = [];
        if (selectedOption === "ALL") {
            fieldsToProcess = fields;
        } else {
            fieldsToProcess = [selectedOption];
        }
        
        // 逐个处理选中的字段
        for (let i = 0; i < fieldsToProcess.length; i++) {
            const field = fieldsToProcess[i];
            const fieldName = field.fieldName;
            const currentValue = field.currentValue;
            
            console.log(`Processing field ${i + 1}/${fieldsToProcess.length}: ${fieldName}`);
            
            // 检查是否为打卡字段
            const isCheckboxField = checkboxFields.some(checkboxField => 
                fieldName.toLowerCase().includes(checkboxField.toLowerCase())
            );
            
            let userInput;
            let shouldUpdate = false;
            
            try {
                if (isCheckboxField) {
                    // 为打卡字段提供选择选项
                    console.log("Showing suggester for checkbox field");
                    const displayOptions = checkboxOptions.map(option => {
                        const isCurrent = option === currentValue;
                        return isCurrent ? `${option} - ${fieldName} (当前)` : `${option} - ${fieldName}`;
                    });
                    
                    // 添加跳过选项
                    displayOptions.push("⏭️ 跳过此字段");
                    const allOptions = [...checkboxOptions, "SKIP"];
                    
                    const promptText = field.isEmpty 
                        ? `选择 "${fieldName}" 的状态:` 
                        : `当前值: ${currentValue}\n选择 "${fieldName}" 的新状态:`;
                    
                    const selectedIndex = await quickAddApi.suggester(
                        displayOptions, 
                        allOptions, 
                        false, 
                        promptText
                    );
                    
                    if (selectedIndex === "SKIP") {
                        userInput = null;
                        shouldUpdate = false;
                    } else if (selectedIndex !== null && selectedIndex !== undefined) {
                        userInput = selectedIndex;
                        shouldUpdate = true;
                    } else {
                        // 用户取消了选择，不更新字段
                        userInput = null;
                        shouldUpdate = false;
                        console.log("User cancelled checkbox selection");
                    }
                } else {
                    // 普通字段使用输入框
                    console.log("Showing input prompt for regular field");
                    const promptText = field.isEmpty 
                        ? `请为字段 "${fieldName}" 输入值:` 
                        : `当前值: ${currentValue}\n请为字段 "${fieldName}" 输入新值:`;
                    
                    const inputResult = await quickAddApi.inputPrompt(promptText, currentValue);
                    
                    // 检查用户是否取消了输入
                    if (inputResult === null || inputResult === undefined) {
                        userInput = null;
                        shouldUpdate = false;
                        console.log("User cancelled input prompt");
                    } else {
                        userInput = inputResult;
                        shouldUpdate = true;
                    }
                }
                
                console.log("User input:", userInput, "Should update:", shouldUpdate);
                
            } catch (error) {
                console.log("Input cancelled or error:", error);
                userInput = null;
                shouldUpdate = false;
            }
            
            // 只有当用户确认更新且输入值与当前值不同时才更新字段
            if (shouldUpdate && userInput !== null && userInput !== currentValue) {
                const newFieldValue = `[${fieldName}::${userInput}]`;
                
                // 创建匹配当前字段的正则表达式
                const escapedFieldName = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const escapedCurrentValue = currentValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const fieldPattern = new RegExp(
                    `\\[${escapedFieldName}::${escapedCurrentValue}\\]`, 
                    'g'
                );
                
                if (updatedContent.match(fieldPattern)) {
                    updatedContent = updatedContent.replace(fieldPattern, newFieldValue);
                    modifiedCount++;
                    
                    const action = field.isEmpty ? "填入" : "更新";
                    console.log(`${action} field: ${fieldName} = ${userInput}`);
                } else {
                    console.warn(`Could not find field pattern for: ${fieldName}`);
                }
            }
        }
        
        // 如果有字段被修改，更新文件
        if (modifiedCount > 0) {
            await app.vault.modify(activeFile, updatedContent);
            console.log(`Successfully modified ${modifiedCount} fields`);
            
            // 显示成功消息
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

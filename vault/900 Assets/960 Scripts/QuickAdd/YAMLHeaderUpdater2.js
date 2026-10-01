module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;
        
        console.log("YAML Header updater macro started");
        
        // 获取当前活动文件
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile) {
            console.log("No active file found");
            new Notice("未找到活动文件", 3000);
            return;
        }
        
        console.log("Active file:", activeFile.name);
        
        // 读取文件内容
        const content = await app.vault.read(activeFile);
        console.log("File content length:", content.length);
        
        // 解析YAML frontmatter
        const yamlRegex = /^---\s*\n([\s\S]*?)\n---/;
        const yamlMatch = content.match(yamlRegex);
        
        if (!yamlMatch) {
            console.log("No YAML frontmatter found");
            new Notice("未找到YAML头部信息", 3000);
            return;
        }
        
        const yamlContent = yamlMatch[1];
        const yamlStartIndex = yamlMatch.index;
        const yamlEndIndex = yamlMatch.index + yamlMatch[0].length;
        
        console.log("YAML content found:", yamlContent.substring(0, 100));
        
        // 解析YAML字段 (支持简单的key: value格式)
        const yamlFields = [];
        const yamlLines = yamlContent.split('\n');
        
        for (let i = 0; i < yamlLines.length; i++) {
            const line = yamlLines[i].trim();
            if (line === '' || line.startsWith('#')) continue;
            
            // 匹配 key: value 格式
            const fieldMatch = line.match(/^([^:]+):\s*(.*)$/);
            if (fieldMatch) {
                const fieldName = fieldMatch[1].trim();
                const fieldValue = fieldMatch[2].trim();
                const isEmpty = fieldValue === '' || fieldValue === '""' || fieldValue === "''" || fieldValue === 'false';
                
                yamlFields.push({
                    fieldName: fieldName,
                    currentValue: fieldValue,
                    isEmpty: isEmpty,
                    lineIndex: i,
                    originalLine: line
                });
            }
        }
        
        console.log("Found YAML fields:", yamlFields.length);
        
        if (yamlFields.length === 0) {
            console.log("No YAML fields found");
            new Notice("YAML头部中未找到可编辑字段", 3000);
            return;
        }
        
        // 按字段名排序
        yamlFields.sort((a, b) => a.fieldName.localeCompare(b.fieldName));
        
        // 定义特殊字段的预设值
        const statusFields = ['status', 'progress', 'priority'];
        const statusOptions = {
            status: ['inbox', 'draft', 'active', 'on-hold', 'completed', 'cancelled', 'archived'],
            progress: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            priority: ['1', '2', '3', '4', '5']
        };
        
        // 状态字段的显示说明
        const statusDisplayNames = {
            status: {
                'inbox': 'inbox (未开始/待启动)',
                'draft': 'draft (起草/构思中)',
                'active': 'active (执行中)',
                'on-hold': 'on-hold (暂停)',
                'completed': 'completed (完成)',
                'cancelled': 'cancelled (取消)',
                'archived': 'archived (归档)'
            },
            priority: {
                '1': '1 (最高)',
                '2': '2 (高)',
                '3': '3 (中)',
                '4': '4 (低)',
                '5': '5 (最低)'
            }
        };
        
        const booleanFields = ['published', 'public', 'favorite', 'important'];
        const booleanOptions = ['true', 'false'];
        
        const tagFields = ['tags', 'keywords'];
        
        // 创建字段选择列表
        const fieldDisplayOptions = yamlFields.map(field => {
            const status = field.isEmpty ? "【空白】" : `【${field.currentValue}】`;
            return `${field.fieldName} ${status}`;
        });
        
        // 添加"处理空白字段"选项
        fieldDisplayOptions.unshift("🔄 处理所有空白字段");
        
        // 让用户选择要处理的字段
        console.log("Showing field selector");
        const selectedOption = await quickAddApi.suggester(
            fieldDisplayOptions,
            ["ALL", ...yamlFields],
            false,
            "选择要处理的YAML字段:"
        );
        
        if (!selectedOption) {
            console.log("No field selected");
            return;
        }
        
        // 确定要处理的字段列表
        let fieldsToProcess = [];
        if (selectedOption === "ALL") {
            // 只处理空白字段
            fieldsToProcess = yamlFields.filter(field => field.isEmpty);
            if (fieldsToProcess.length === 0) {
                console.log("No empty fields found");
                new Notice("没有找到空白字段", 2000);
                return;
            }
        } else {
            fieldsToProcess = [selectedOption];
        }
        
        // 复制YAML行数组用于修改
        let updatedYamlLines = [...yamlLines];
        let modifiedCount = 0;
        
        // 逐个处理选中的字段
        for (let i = 0; i < fieldsToProcess.length; i++) {
            const field = fieldsToProcess[i];
            const fieldName = field.fieldName.toLowerCase();
            
            console.log(`Processing field ${i + 1}/${fieldsToProcess.length}: ${field.fieldName}`);
            
            let userInput;
            
            try {
                // 检查字段类型并提供相应的输入方式
                if (statusFields.includes(fieldName) && statusOptions[fieldName]) {
                    // 状态字段提供预设选项
                    console.log("Showing suggester for status field");
                    const options = statusOptions[fieldName];
                    const displayNames = statusDisplayNames[fieldName];
                    
                    const displayOptions = options.map(option => {
                        const displayName = displayNames ? displayNames[option] : option;
                        const isCurrent = option === field.currentValue;
                        return isCurrent ? `${displayName} (当前)` : displayName;
                    });
                    
                    displayOptions.push("⏭️ 跳过此字段");
                    const allOptions = [...options, "SKIP"];
                    
                    const promptText = field.isEmpty 
                        ? `选择 "${field.fieldName}" 的值:` 
                        : `当前值: ${field.currentValue}\n选择 "${field.fieldName}" 的新值:`;
                    
                    const selectedValue = await quickAddApi.suggester(
                        displayOptions, 
                        allOptions, 
                        false, 
                        promptText
                    );
                    
                    userInput = selectedValue === "SKIP" ? null : selectedValue;
                    
                } else if (booleanFields.includes(fieldName)) {
                    // 布尔字段提供 true/false 选项
                    console.log("Showing suggester for boolean field");
                    const displayOptions = booleanOptions.map(option => {
                        const isCurrent = option === field.currentValue;
                        return isCurrent ? `${option} (当前)` : option;
                    });
                    
                    displayOptions.push("⏭️ 跳过此字段");
                    const allOptions = [...booleanOptions, "SKIP"];
                    
                    const promptText = field.isEmpty 
                        ? `选择 "${field.fieldName}" 的值:` 
                        : `当前值: ${field.currentValue}\n选择 "${field.fieldName}" 的新值:`;
                    
                    const selectedValue = await quickAddApi.suggester(
                        displayOptions, 
                        allOptions, 
                        false, 
                        promptText
                    );
                    
                    userInput = selectedValue === "SKIP" ? null : selectedValue;
                    
                } else if (tagFields.some(tag => fieldName.includes(tag))) {
                    // 标签字段提示格式
                    console.log("Showing input prompt for tag field");
                    
                    // 获取当前值（去掉方括号）
                    let currentDisplayValue = field.currentValue;
                    if (currentDisplayValue.startsWith('[') && currentDisplayValue.endsWith(']')) {
                        currentDisplayValue = currentDisplayValue.slice(1, -1);
                    }
                    
                    const promptText = field.isEmpty 
                        ? `请为标签字段 "${field.fieldName}" 输入值（用逗号分隔，如：tag1, tag2, tag3）:` 
                        : `当前值: ${currentDisplayValue}\n请为标签字段 "${field.fieldName}" 输入新值（用逗号分隔，留空跳过）:`;
                    
                    const rawInput = await quickAddApi.inputPrompt(promptText, currentDisplayValue);
                    
                    // 如果用户输入了内容，自动添加方括号
                    if (rawInput && rawInput.trim() !== '') {
                        userInput = `[${rawInput.trim()}]`;
                    } else {
                        userInput = rawInput;
                    }
                    
                } else {
                    // 普通字段使用输入框
                    console.log("Showing input prompt for regular field");
                    const promptText = field.isEmpty 
                        ? `请为字段 "${field.fieldName}" 输入值（留空跳过）:` 
                        : `当前值: ${field.currentValue}\n请为字段 "${field.fieldName}" 输入新值（留空跳过）:`;
                    
                    userInput = await quickAddApi.inputPrompt(promptText, field.currentValue);
                }
                
                console.log("User input:", userInput);
                
            } catch (error) {
                console.log("Input cancelled or error:", error);
                userInput = null;
            }
            
            // 如果用户输入了内容且与当前值不同
            if (userInput !== null && userInput !== field.currentValue) {
                // 构建新的YAML行
                const newLine = `${field.fieldName}: ${userInput}`;
                updatedYamlLines[field.lineIndex] = newLine;
                modifiedCount++;
                
                const action = field.isEmpty ? "设置" : "更新";
                console.log(`${action} field: ${field.fieldName} = ${userInput}`);
            }
        }
        
        // 如果有字段被修改，更新文件
        if (modifiedCount > 0) {
            // 重构YAML内容
            const newYamlContent = updatedYamlLines.join('\n');
            const newYamlSection = `---\n${newYamlContent}\n---`;
            
            // 替换原文件中的YAML部分
            const beforeYaml = content.substring(0, yamlStartIndex);
            const afterYaml = content.substring(yamlEndIndex);
            const updatedContent = beforeYaml + newYamlSection + afterYaml;
            
            await app.vault.modify(activeFile, updatedContent);
            console.log(`Successfully modified ${modifiedCount} YAML fields`);
            
            // 显示成功消息
            new Notice(`成功更新了 ${modifiedCount} 个YAML字段`, 3000);
        } else {
            console.log("No YAML fields were modified");
            new Notice("没有YAML字段被修改", 2000);
        }
        
    } catch (error) {
        console.error("Error in YAML Header updater macro:", error);
        new Notice(`处理YAML头部时出错: ${error.message}`, 5000);
    }
};
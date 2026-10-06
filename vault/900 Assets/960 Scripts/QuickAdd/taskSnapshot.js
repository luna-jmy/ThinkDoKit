module.exports = async (params) => {
    const { quickAddApi: { inputPrompt }, app } = params;
    
    // 获取当前日期作为默认值
    const currentDate = new Date();
    const defaultYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    // 使用 inputPrompt 获取用户输入的年月
    const currentYearMonth = await inputPrompt("请输入要查询的年月:", defaultYearMonth);
    
    // 检查用户是否取消了输入
    if (!currentYearMonth) {
        new Notice("已取消任务提取。");
        return;
    }
    
    const dailyNotesFolder = "500 Journal";
    
    // 获取符合条件的文件
    const files = app.vault.getFiles().filter(file => {
        return file.path.startsWith(dailyNotesFolder) && 
               file.name.includes(currentYearMonth);
    });
    
    let allTasks = [];
    
    // 获取前一天日志的"明天想改进的事"字段的函数
    async function getPreviousDayImprovement(currentFileName) {
        try {
            // 尝试从文件名中提取日期
            let dateMatch = currentFileName.match(/(\d{4}-\d{2}-\d{2})/);
            if (!dateMatch) {
                return "无法从文件名中提取日期";
            }
            
            const dateStr = dateMatch[1];
            
            // 从当前文件名解析日期
            const currentDate = new Date(dateStr);
            if (isNaN(currentDate.getTime())) {
                return "无效的日期格式";
            }
            
            // 计算前一天的日期
            const previousDate = new Date(currentDate);
            previousDate.setDate(previousDate.getDate() - 1);
            const previousDateStr = previousDate.toISOString().split('T')[0];
            
            // 查找前一天的日志文件
            const previousFile = app.vault.getFiles().find(file => 
                file.path.startsWith(dailyNotesFolder) && 
                file.name.includes(previousDateStr)
            );
            
            if (!previousFile) {
                return `未找到前一天的日志 (${previousDateStr})`;
            }
            
            // 读取前一天日志的内容
            const content = await app.vault.read(previousFile);
            
            // 尝试从frontmatter中获取"明天想改进的事"
            const fileCache = app.metadataCache.getFileCache(previousFile);
            if (fileCache && fileCache.frontmatter && fileCache.frontmatter["明天想改进的事"]) {
                let improvement = fileCache.frontmatter["明天想改进的事"];
                // 移除可能的 ] 符号
                return improvement.replace(/\]$/, '').trim();
            }
            
            // 如果frontmatter中没有，尝试从内容中查找
            const improvementMatch = content.match(/明天想改进的事[：:]\s*([^\]]+)(?:\])?/);
            if (improvementMatch) {
                return improvementMatch[1].trim();
            }
            
            // 尝试其他可能的格式
            const altMatch1 = content.match(/明天想改进的事[：:]\s*([^\]]+)(?:\])?/m);
            if (altMatch1) {
                return altMatch1[1].trim();
            }
            
            const altMatch2 = content.match(/##\s*明天想改进的事\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
            if (altMatch2) {
                return altMatch2[1].trim();
            }
            
            // 尝试从DataviewJS表达式中提取
            const dataviewMatch = content.match(/\$=\{.*?p\["明天想改进的事"\]:"([^"]+)".*?\}/);
            if (dataviewMatch) {
                return dataviewMatch[1];
            }
            
            return "未找到'明天想改进的事'字段";
        } catch (error) {
            console.error("获取前一天改进事项时出错:", error);
            return `获取前一天改进事项时出错: ${error.message}`;
        }
    }
    
    // 处理每个文件
    for (const file of files) {
        const content = await app.vault.read(file);

        // 提取各种任务状态
        const unchecked = [...content.matchAll(/^\s*-\s\[\s\]\s(.*)$/gm)];
        const checked = [...content.matchAll(/^\s*-\s\[x\]\s(.*)$/gmi)];
        const info = [...content.matchAll(/^\s*-\s\[i\]\s(.*)$/gmi)];
        const incomplete = [...content.matchAll(/^\s*-\s\[\/\]\s(.*)$/gmi)];
        const important = [...content.matchAll(/^\s*-\s\[!\]\s(.*)$/gmi)];
        const note = [...content.matchAll(/^\s*-\s\[n\]\s(.*)$/gmi)];
        
        // 处理所有匹配的任务
        for (const match of unchecked) {
            let taskText = match[1].trim();
            let isSpecialTask = taskText.includes("***今天应改进的事***");
            
            if (isSpecialTask) {
                // 获取前一天的改进事项
                const improvement = await getPreviousDayImprovement(file.name);
                // 保留原始任务状态（未完成）
                taskText = `- [ ] ***今天应改进的事***：${improvement}`;
            } else {
                taskText = `- [ ] ${taskText}`;
            }
            
            allTasks.push({
                task: taskText,
                sourceFile: file.name
            });
        }
        
        for (const match of checked) {
            let taskText = match[1].trim();
            let isSpecialTask = taskText.includes("***今天应改进的事***");
            
            if (isSpecialTask) {
                // 获取前一天的改进事项
                const improvement = await getPreviousDayImprovement(file.name);
                // 保留原始任务状态（已完成）
                taskText = `- [x] ***今天应改进的事***：${improvement}`;
            } else {
                taskText = `- [x] ${taskText}`;
            }
            
            allTasks.push({
                task: taskText,
                sourceFile: file.name
            });
        }
        
        // 处理 [/] 状态的任务（失败状态）
        for (const match of incomplete) {
            let taskText = match[1].trim();
            let isSpecialTask = taskText.includes("***今天应改进的事***");
            
            if (isSpecialTask) {
                // 检查是否包含 DataviewJS 表达式
                const dataviewMatch = taskText.match(/\$=\{.*?p\["明天想改进的事"\]:"([^"]+)".*?\}/);
                if (dataviewMatch) {
                    // 如果是 DataviewJS 表达式，获取前一天的改进事项
                    const improvement = await getPreviousDayImprovement(file.name);
                    // 保留原始任务状态（失败）
                    taskText = `- [/] ***今天应改进的事***：${improvement}`;
                } else {
                    // 如果不是 DataviewJS 表达式，直接使用原文本
                    taskText = `- [/] ${taskText}`;
                }
            } else {
                taskText = `- [/] ${taskText}`;
            }
            
            allTasks.push({
                task: taskText,
                sourceFile: file.name
            });
        }
        
        // 处理其他类型的任务
        for (const match of info) {
            allTasks.push({
                task: `- [i] ${match[1].trim()}`,
                sourceFile: file.name
            });
        }
        
        for (const match of important) {
            allTasks.push({
                task: `- [!] ${match[1].trim()}`,
                sourceFile: file.name
            });
        }
        
        for (const match of note) {
            allTasks.push({
                task: `- [n] ${match[1].trim()}`,
                sourceFile: file.name
            });
        }
    }

    // 创建结果内容
    let resultContent = "";
    
    if (allTasks.length > 0) {
        resultContent += `### ${currentYearMonth} 月日志任务列表\n\n`;
        allTasks.forEach(item => {
            resultContent += `${item.task} (来自 [[${item.sourceFile}]]) \n`;
        });
    } else {
        resultContent += `在 ${currentYearMonth} 的笔记中没有找到任务。`;
    }
    
    // 获取当前活跃文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("请先打开一个笔记文件");
        return;
    }
    
    // 在光标位置插入结果
    const activeView = app.workspace.getActiveViewOfType(app.workspace.getLeavesOfType('markdown')[0]?.view?.constructor);
    if (activeView && activeView.editor) {
        const cursor = activeView.editor.getCursor();
        activeView.editor.replaceRange('\n\n' + resultContent + '\n', cursor);
        new Notice("任务列表已插入到光标位置");
    } else {
        // 备用方案：直接获取编辑器
        const activeLeaf = app.workspace.getActiveViewOfType();
        if (activeLeaf && activeLeaf.editor) {
            const cursor = activeLeaf.editor.getCursor();
            activeLeaf.editor.replaceRange('\n\n' + resultContent + '\n', cursor);
            new Notice("任务列表已插入到光标位置");
        } else {
            new Notice("⚠️ 无法获取编辑器，将追加到文件末尾");
            const content = await app.vault.read(activeFile);
            const newContent = content + '\n\n' + resultContent;
            await app.vault.modify(activeFile, newContent);
        }
    }
};

module.exports = async (params) => {
    const { quickAddApi: { inputPrompt }, app } = params;
    
    // 获取当前活跃文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("请先打开一个笔记文件");
        return;
    }
    
    // 读取文件内容
    const content = await app.vault.read(activeFile);
    
    // 解析任务内容
    function parseTasksFromContent(content) {
        const lines = content.split('\n');
        const tasks = [];
        let currentSection = '';
        let inProjectSection = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // 检查是否到达项目分解部分
            if (line.match(/^##\s*项目分解/)) {
                inProjectSection = true;
                continue;
            }
            
            // 如果遇到其他二级标题，停止解析
            if (inProjectSection && line.match(/^##\s/)) {
                break;
            }
            
            if (!inProjectSection) continue;
            
            // 检查三级标题（section）
            if (line.match(/^###\s/)) {
                currentSection = line.replace(/^###\s/, '').trim();
                continue;
            }
            
            // 解析任务行
            if (line.match(/^-\s\[.\]\s/)) {
                const task = parseTaskLine(line, currentSection);
                if (task) {
                    tasks.push(task);
                }
            }
        }
        
        return tasks;
    }
    
    // 解析单个任务行，修复后的任务解析函数
function parseTaskLine(line, section) {
    const task = {
        section: section,
        name: '',
        completed: false,
        startDate: null,
        dueDate: null,
        owner: '',
        id: '',
        dependency: '',
        isMilestone: false,
        isHighPriority: false
    };
    
    // 检查完成状态
    task.completed = line.includes('[x]');
    
    // 修复：改进任务名称提取方法
    let nameMatch = line.match(/^-\s\[.\]\s(.+)/);
    if (nameMatch) {
        let fullText = nameMatch[1];
        // 移除所有标记内容，保留任务名称
        let taskName = fullText
            .replace(/🛫\s\d{4}-\d{2}-\d{2}/g, '') // 移除开始日期
            .replace(/📅\s\d{4}-\d{2}-\d{2}/g, '') // 移除截止日期
            .replace(/🆔\s[a-zA-Z0-9-]+/g, '')     // 移除ID（支持连字符）
            .replace(/⛔\s[a-zA-Z0-9-]+/g, '')      // 移除依赖（支持连字符）
            .replace(/🔺/g, '')                     // 移除高优先级标记
            .replace(/\[owner::[^\]]+\]/g, '')     // 移除负责人
            .replace(/\[keyword::[^\]]+\]/g, '')   // 移除关键词
            .trim();
        
        task.name = taskName;
    }
    
    // 提取开始日期 🛫
    const startMatch = line.match(/🛫\s(\d{4}-\d{2}-\d{2})/);
    if (startMatch) {
        task.startDate = startMatch[1];
    }
    
    // 提取截止日期 📅
    const dueDateMatch = line.match(/📅\s(\d{4}-\d{2}-\d{2})/);
    if (dueDateMatch) {
        task.dueDate = dueDateMatch[1];
    }
    
    // 提取负责人
    const ownerMatch = line.match(/\[owner::([^\]]+)\]/);
    if (ownerMatch) {
        task.owner = ownerMatch[1];
    }
    
    // 修复：支持带连字符的ID
    const idMatch = line.match(/🆔\s([a-zA-Z0-9-]+)/);
    if (idMatch) {
        task.id = idMatch[1];
    }
    
    // 修复：支持带连字符的依赖ID
    const depMatch = line.match(/⛔\s([a-zA-Z0-9-]+)/);
    if (depMatch) {
        task.dependency = depMatch[1];
    }
    
    // 检查是否为里程碑
    task.isMilestone = line.includes('[keyword::@milestone]');
    
    // 检查是否为高优先级 🔺
    task.isHighPriority = line.includes('🔺');
    
    return task;
    }
    
    // 计算工作日天数（排除周末）
    function calculateWorkingDays(startDate, endDate) {
        if (!startDate || !endDate) return 1;
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // 确保开始日期不晚于结束日期
        if (start > end) {
            [start, end] = [end, start];
        }
        
        let workingDays = 0;
        const currentDate = new Date(start);
        
        // 遍历从开始日期到结束日期的每一天
        while (currentDate <= end) {
            const dayOfWeek = currentDate.getDay();
            // 0 = 周日, 6 = 周六，排除这两天
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return Math.max(1, workingDays); // 至少1天
    }
    
    // 计算任务持续天数
    function calculateDuration(startDate, endDate, excludeWeekends = true) {
        if (!startDate || !endDate) return '1d';
        
        if (excludeWeekends) {
            const workingDays = calculateWorkingDays(startDate, endDate);
            return `${workingDays}d`;
        } else {
            // 日历天数计算（包含周末）
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 包含结束日期当天
            return `${Math.max(1, diffDays)}d`;
        }
    }
    
    // 计算从依赖任务结束到当前任务截止日期的天数
    function calculateDependencyDuration(currentTaskDueDate, dependencyTask, excludeWeekends = true) {
        if (!currentTaskDueDate || !dependencyTask) return '1d';
        
        // 使用依赖任务的截止日期作为基准
        let dependencyEndDate = dependencyTask.dueDate;
        if (!dependencyEndDate) {
            // 如果依赖任务没有截止日期，但有开始日期，假设持续1天
            if (dependencyTask.startDate) {
                const start = new Date(dependencyTask.startDate);
                start.setDate(start.getDate() + 1);
                dependencyEndDate = start.toISOString().split('T')[0];
            } else {
                return '1d';
            }
        }
        
        if (excludeWeekends) {
            // 依赖任务结束后的下一个工作日作为当前任务的开始日期
            const depEnd = new Date(dependencyEndDate);
            let taskStart = new Date(depEnd);
            taskStart.setDate(taskStart.getDate() + 1);
            
            // 确保开始日期是工作日
            while (taskStart.getDay() === 0 || taskStart.getDay() === 6) {
                taskStart.setDate(taskStart.getDate() + 1);
            }
            
            const workingDays = calculateWorkingDays(taskStart.toISOString().split('T')[0], currentTaskDueDate);
            return `${workingDays}d`;
        } else {
            // 日历天数计算
            const currentDue = new Date(currentTaskDueDate);
            const depEnd = new Date(dependencyEndDate);
            
            // 当前任务从依赖任务结束后开始，到当前任务截止日期结束
            const diffTime = currentDue - depEnd;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return `${Math.max(1, diffDays)}d`;
        }
    }
    
    // 生成Mermaid甘特图的修复版本
function generateMermaidGantt(tasks, excludeWeekends = true) {
    let mermaid = `\`\`\`mermaid
    
gantt
axisFormat %m/%d
todayMarker on`;
    
    if (excludeWeekends) {
        mermaid += `\nexcludes weekends`;
    }
    
    mermaid += `\n\n`;
    
    // 按section分组
    const sections = {};
    tasks.forEach(task => {
        if (!sections[task.section]) {
            sections[task.section] = [];
        }
        sections[task.section].push(task);
    });
    
    // 创建任务ID到任务的映射，用于查找依赖任务
    const taskMap = {};
    tasks.forEach(task => {
        if (task.id) {
            taskMap[task.id] = task;
        }
    });
    
    // 为每个section生成甘特图内容
    Object.keys(sections).forEach(sectionName => {
        if (sectionName) {
            mermaid += `    section ${sectionName}\n`;
        }
        
        sections[sectionName].forEach(task => {
            let taskLine = `    ${task.name} :`;
            
            // 修复：状态标记逻辑 - 处理里程碑和完成状态的组合
            if (task.isMilestone) {
                taskLine += 'milestone, ';
                // 里程碑也可以有完成状态
                if (task.completed) {
                    taskLine += 'done, ';
                }
            } else if (task.completed) {
                // 如果任务已完成，只标记为done，不再标记为active
                taskLine += 'done, ';
            } else {
                // 如果任务未完成，标记为active
                taskLine += 'active, ';
            }
            
            // 高优先级标记应该对所有任务生效
            if (task.isHighPriority) {
                taskLine += 'crit, ';
            }
            
            // 处理ID和依赖关系
            if (task.dependency) {
                // 有依赖关系的任务也需要添加自己的ID（如果有的话）
                if (task.id) {
                    taskLine += `${task.id}, `;
                }
                taskLine += `after ${task.dependency}, `;
                
                if (task.dueDate) {
                    // 计算从依赖任务结束到当前任务截止的持续时间
                    const dependencyTask = taskMap[task.dependency];
                    const duration = calculateDependencyDuration(task.dueDate, dependencyTask, excludeWeekends);
                    taskLine += duration;
                } else {
                    taskLine += '1d';
                }
            } else if (task.id) {
                // 有ID但没有依赖关系的任务
                taskLine += `${task.id}, `;
                
                // 添加日期和持续时间
                if (task.isMilestone) {
                    // 里程碑只需要日期，持续时间为0
                    taskLine += `${task.dueDate}, 0d`;
                } else if (task.startDate && task.dueDate) {
                    // 有开始和结束日期
                    const duration = calculateDuration(task.startDate, task.dueDate, excludeWeekends);
                    taskLine += `${task.startDate}, ${duration}`;
                } else if (task.dueDate) {
                    // 只有截止日期，假设持续1天
                    taskLine += `${task.dueDate}, 1d`;
                } else {
                    // 默认情况
                    taskLine += '1d';
                }
            } else {
                // 既没有ID也没有依赖关系的任务
                if (task.isMilestone) {
                    // 里程碑只需要日期，持续时间为0
                    taskLine += `${task.dueDate}, 0d`;
                } else if (task.startDate && task.dueDate) {
                    // 有开始和结束日期
                    const duration = calculateDuration(task.startDate, task.dueDate, excludeWeekends);
                    taskLine += `${task.startDate}, ${duration}`;
                } else if (task.dueDate) {
                    // 只有截止日期，假设持续1天
                    taskLine += `${task.dueDate}, 1d`;
                } else {
                    // 默认情况
                    taskLine += '1d';
                }
            }
            
            mermaid += taskLine + '\n';
        });
        
        mermaid += '\n';
    });
    
    mermaid += '```';
    return mermaid;
}
    
    try {
        // 解析任务
        const tasks = parseTasksFromContent(content);
        
        if (tasks.length === 0) {
            new Notice("未找到任务或项目分解部分，请检查格式");
            return;
        }
        
        // 询问是否排除周末
        const weekendOption = await inputPrompt("周末设置", "是否排除周末？", "yes", [
            "yes - 排除周末（只计算工作日）",
            "no - 包含周末（按日历天数计算）"
        ]);
        
        const excludeWeekends = weekendOption === "yes";
        
        // 生成甘特图
        const ganttChart = generateMermaidGantt(tasks, excludeWeekends);
        
        // 询问插入位置
        const insertOption = await inputPrompt("选择插入方式", "请选择甘特图插入方式:", "cursor", [
            "cursor - 在光标位置插入",
            "append - 追加到文件末尾",
            "replace - 替换现有甘特图", 
            "copy - 复制到剪贴板"
        ]);
        
        if (insertOption === "copy") {
            // 复制到剪贴板
            await navigator.clipboard.writeText(ganttChart);
            new Notice("甘特图已复制到剪贴板");
        } else if (insertOption === "cursor") {
            // 在光标位置插入
            const activeView = app.workspace.getActiveViewOfType(app.workspace.getLeavesOfType('markdown')[0]?.view?.constructor);
            if (activeView && activeView.editor) {
                const cursor = activeView.editor.getCursor();
                activeView.editor.replaceRange('\n\n## 甘特图\n\n' + ganttChart + '\n', cursor);
                new Notice("甘特图已插入到光标位置");
            } else {
                // 备用方案：直接获取编辑器
                const activeLeaf = app.workspace.getActiveViewOfType();
                if (activeLeaf && activeLeaf.editor) {
                    const cursor = activeLeaf.editor.getCursor();
                    activeLeaf.editor.replaceRange('\n\n## 甘特图\n\n' + ganttChart + '\n', cursor);
                    new Notice("甘特图已插入到光标位置");
                } else {
                    new Notice("无法获取编辑器，将追加到文件末尾");
                    const newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
                    await app.vault.modify(activeFile, newContent);
                }
            }
        } else if (insertOption === "append") {
            // 追加到文件末尾
            const newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
            await app.vault.modify(activeFile, newContent);
            new Notice("甘特图已添加到文件末尾");
        } else if (insertOption === "replace") {
            // 替换现有甘特图
            let newContent = content;
            
            // 查找现有甘特图并替换
            const ganttRegex = /```mermaid\s*\ngantt[\s\S]*?```/g;
            if (ganttRegex.test(content)) {
                newContent = content.replace(ganttRegex, ganttChart);
                new Notice("现有甘特图已更新");
            } else {
                // 如果没有现有甘特图，追加到末尾
                newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
                new Notice("甘特图已添加到文件末尾");
            }
            
            await app.vault.modify(activeFile, newContent);
        }
        
    } catch (error) {
        console.error('生成甘特图时出错:', error);
        new Notice('生成甘特图时出错: ' + error.message);
    }
};
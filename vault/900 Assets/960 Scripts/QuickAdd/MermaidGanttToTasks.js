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
    
    // 解析Mermaid甘特图
    function parseMermaidGantt(content) {
        const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g;
        const matches = [...content.matchAll(mermaidRegex)];
        
        if (matches.length === 0) {
            throw new Error("未找到Mermaid甘特图");
        }
        
        // 如果有多个甘特图，使用第一个
        const mermaidContent = matches[0][1];
        const lines = mermaidContent.split('\n').map(line => line.trim()).filter(line => line);
        
        const tasks = [];
        let currentSection = '';
        let inGanttBlock = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 检查是否为甘特图开始
            if (line === 'gantt') {
                inGanttBlock = true;
                continue;
            }
            
            if (!inGanttBlock) continue;
            
            // 跳过配置行
            if (line.startsWith('title') || 
                line.startsWith('dateFormat') || 
                line.startsWith('axisFormat') ||
                line.startsWith('todayMarker') ||
                line.startsWith('excludes')) {
                continue;
            }
            
            // 检查section
            if (line.startsWith('section ')) {
                currentSection = line.replace('section ', '');
                continue;
            }
            
            // 解析任务行
            if (line.includes(':')) {
                const task = parseTaskLine(line, currentSection);
                if (task) {
                    tasks.push(task);
                }
            }
        }
        
        // 处理依赖关系，计算实际的开始和结束日期
        resolveDependencies(tasks);
        
        return tasks;
    }
    
    // 改进的解析逻辑
    function parseTaskLine(line, section) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return null;
        
        const taskName = line.substring(0, colonIndex).trim();
        const taskParams = line.substring(colonIndex + 1).trim();
        
        const task = {
            section: section,
            name: taskName,
            completed: false,
            startDate: null,
            dueDate: null,
            owner: '',
            id: '',
            dependency: '',
            dependencyId: '',
            isMilestone: false,
            isHighPriority: false,
            duration: 0,
            hasAfterDependency: false
        };
        
        // 解析参数
        const params = taskParams.split(',').map(p => p.trim());
        
        let dates = [];
        let duration = null;
        
        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            
            // 检查状态
            if (param === 'done') {
                task.completed = true;
            } else if (param === 'milestone') {
                task.isMilestone = true;
            } else if (param === 'crit') {
                task.isHighPriority = true;
            } else if (param === 'active') {
                // active状态不需要特殊处理
            } else if (param.startsWith('after ')) {
                // 依赖关系
                task.dependencyId = param.replace('after ', '');
                task.dependency = task.dependencyId;
                task.hasAfterDependency = true;
            } else if (param.match(/^\d{4}-\d{2}-\d{2}$/)) {
                // 日期格式
                dates.push(param);
            } else if (param.match(/^\d+d$/)) {
                // 持续时间格式
                duration = param;
                task.duration = parseInt(param.replace('d', ''));
            } else if (param.match(/^[a-zA-Z0-9-_]+$/) && !task.hasAfterDependency) {
                // 任务ID（不是依赖关系中的after）
                task.id = param;
            }
        }
        
        // 处理日期和持续时间
        if (task.hasAfterDependency) {
            // 有依赖关系的任务，暂时不设置日期，后续在resolveDependencies中处理
            task.duration = task.duration || 1; // 默认持续时间为1天
        } else if (dates.length >= 2) {
            // 有两个日期：第一个是开始日期，第二个是结束日期
            task.startDate = dates[0];
            task.dueDate = dates[1];
        } else if (dates.length === 1) {
            // 一个日期的情况
            if (task.isMilestone) {
                // 里程碑：开始和结束都是同一天
                task.startDate = dates[0];
                task.dueDate = dates[0];
            } else if (duration) {
                // 一个日期+持续时间：开始日期+持续时间
                task.startDate = dates[0];
                const start = new Date(dates[0]);
                const end = new Date(start);
                end.setDate(end.getDate() + task.duration - 1);
                task.dueDate = end.toISOString().split('T')[0];
            } else {
                // 只有一个日期，默认持续1天
                task.startDate = dates[0];
                task.dueDate = dates[0];
            }
        }
        
        return task;
    }
    
    // 处理依赖关系，计算依赖任务的实际日期
    function resolveDependencies(tasks) {
        // 创建任务ID到任务的映射
        const taskMap = {};
        tasks.forEach(task => {
            if (task.id) {
                taskMap[task.id] = task;
            }
        });
        
        // 多次遍历直到所有依赖都被解决
        let maxIterations = 10;
        let hasUnresolvedDependencies = true;
        
        while (hasUnresolvedDependencies && maxIterations > 0) {
            hasUnresolvedDependencies = false;
            maxIterations--;
            
            tasks.forEach(task => {
                if (task.hasAfterDependency && !task.startDate && task.dependencyId) {
                    const dependentTask = taskMap[task.dependencyId];
                    
                    if (dependentTask && dependentTask.dueDate) {
                        // 依赖任务已经有结束日期，计算当前任务的开始日期
                        const dependentEndDate = new Date(dependentTask.dueDate);
                        const startDate = new Date(dependentEndDate);
                        startDate.setDate(startDate.getDate() + 1); // 依赖任务结束后的下一天开始
                        
                        task.startDate = startDate.toISOString().split('T')[0];
                        
                        // 计算结束日期
                        if (task.isMilestone) {
                            task.dueDate = task.startDate;
                        } else {
                            const endDate = new Date(startDate);
                            endDate.setDate(endDate.getDate() + task.duration - 1);
                            task.dueDate = endDate.toISOString().split('T')[0];
                        }
                    } else {
                        // 依赖任务还没有解决，标记还有未解决的依赖
                        hasUnresolvedDependencies = true;
                    }
                }
            });
        }
        
        // 对于仍然没有解决的依赖任务，给出警告或默认处理
        tasks.forEach(task => {
            if (task.hasAfterDependency && !task.startDate) {
                console.warn(`无法解析任务 "${task.name}" 的依赖关系: ${task.dependencyId}`);
                // 可以选择给一个默认日期或跳过
                task.startDate = new Date().toISOString().split('T')[0];
                if (task.isMilestone) {
                    task.dueDate = task.startDate;
                } else {
                    const endDate = new Date(task.startDate);
                    endDate.setDate(endDate.getDate() + task.duration - 1);
                    task.dueDate = endDate.toISOString().split('T')[0];
                }
            }
        });
    }
    
    // 生成Tasks插件格式
    function generateTasksFormat(tasks) {
        let output = '## 项目分解\n\n';
        
        // 按section分组
        const sections = {};
        tasks.forEach(task => {
            const sectionName = task.section || '未分类';
            if (!sections[sectionName]) {
                sections[sectionName] = [];
            }
            sections[sectionName].push(task);
        });
        
        // 为每个section生成内容
        Object.keys(sections).forEach(sectionName => {
            output += `### ${sectionName}\n\n`;
            
            sections[sectionName].forEach(task => {
                let taskLine = '- ';
                
                // 完成状态
                taskLine += task.completed ? '[x]' : '[ ]';
                
                // 任务名称
                taskLine += ` ${task.name}`;
                
                // 里程碑只显示截止日期，有依赖关系的任务也只显示截止日期
                if (task.isMilestone) {
                    // 里程碑只显示截止日期
                    if (task.dueDate) {
                        taskLine += ` 📅 ${task.dueDate}`;
                    }
                } else if (task.hasAfterDependency) {
                    // 有依赖关系的任务只显示截止日期
                    if (task.dueDate) {
                        taskLine += ` 📅 ${task.dueDate}`;
                    }
                } else {
                    // 普通任务显示开始日期和截止日期
                    if (task.startDate) {
                        taskLine += ` 🛫 ${task.startDate}`;
                    }
                    
                    if (task.dueDate && task.dueDate !== task.startDate) {
                        taskLine += ` 📅 ${task.dueDate}`;
                    } else if (task.dueDate === task.startDate) {
                        // 如果开始和结束是同一天，也显示截止日期
                        taskLine += ` 📅 ${task.dueDate}`;
                    }
                }
                
                // 任务ID
                if (task.id) {
                    taskLine += ` 🆔 ${task.id}`;
                }
                
                // 依赖关系
                if (task.dependency) {
                    taskLine += ` ⛔ ${task.dependency}`;
                }
                
                // 高优先级
                if (task.isHighPriority) {
                    taskLine += ` 🔺`;
                }
                
                // 里程碑标记
                if (task.isMilestone) {
                    taskLine += ` [keyword::@milestone]`;
                }
                
                output += taskLine + '\n';
            });
            
            output += '\n';
        });
        
        return output;
    }
    
    try {
        // 解析甘特图
        const tasks = parseMermaidGantt(content);
        
        if (tasks.length === 0) {
            new Notice("未找到有效的任务数据");
            return;
        }
        
        // 生成Tasks格式
        const tasksContent = generateTasksFormat(tasks);
        
        // 询问插入方式
        const insertOption = await inputPrompt("选择插入方式", "请选择Tasks格式插入方式:", "append", [
            "append - 追加到文件末尾",
            "copy - 复制到剪贴板",
            "replace - 替换现有项目分解部分"
        ]);
        
        if (insertOption === "copy") {
            // 复制到剪贴板
            await navigator.clipboard.writeText(tasksContent);
            new Notice("Tasks格式已复制到剪贴板");
        } else if (insertOption === "append") {
            // 追加到文件末尾
            const newContent = content + '\n' + tasksContent;
            await app.vault.modify(activeFile, newContent);
            new Notice("Tasks格式已添加到文件末尾");
        } else if (insertOption === "replace") {
            // 替换现有项目分解部分
            let newContent = content;
            
            // 查找现有项目分解部分并替换
            const projectRegex = /##\s*项目分解\s*\n([\s\S]*?)(?=\n##|\n```|$)/;
            if (projectRegex.test(content)) {
                newContent = content.replace(projectRegex, tasksContent.trim());
                new Notice("现有项目分解部分已更新");
            } else {
                // 如果没有现有项目分解部分，追加到末尾
                newContent = content + '\n' + tasksContent;
                new Notice("Tasks格式已添加到文件末尾");
            }
            
            await app.vault.modify(activeFile, newContent);
        }
        
        // 显示转换统计
        new Notice(`成功转换 ${tasks.length} 个任务`);
        
    } catch (error) {
        console.error('转换甘特图时出错:', error);
        new Notice('转换甘特图时出错: ' + error.message);
    }
};
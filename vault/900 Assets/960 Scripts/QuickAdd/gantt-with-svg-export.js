module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester }, app } = params;
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
            if (line.match(/^##\s*项目分解/)) {
                inProjectSection = true;
                continue;
            }
            if (inProjectSection && line.match(/^##\s/)) {
                break;
            }
            if (!inProjectSection) continue;
            if (line.match(/^###\s/)) {
                currentSection = line.replace(/^###\s/, '').trim();
                continue;
            }
            if (line.match(/^-\s\[.\]\s/)) {
                const task = parseTaskLine(line, currentSection);
                if (task) {
                    tasks.push(task);
                }
            }
        }
        return tasks;
    }
    // 解析单个任务行
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
        task.completed = line.includes('[x]');
        let nameMatch = line.match(/^-\s\[.\]\s(.+)/);
        if (nameMatch) {
            let fullText = nameMatch[1];
            let taskName = fullText
                .replace(/🛫\s\d{4}-\d{2}-\d{2}/g, '')
                .replace(/📅\s\d{4}-\d{2}-\d{2}/g, '')
                .replace(/✅\s\d{4}-\d{2}-\d{2}/g, '')
                .replace(/🆔\s[a-zA-Z0-9-]+/g, '')
                .replace(/⛔\s[a-zA-Z0-9-]+/g, '')
                .replace(/🔺/g, '')
                .replace(/\[owner::[^\]]+\]/g, '')
                .replace(/\[keyword::[^\]]+\]/g, '')
                .replace(/#milestone/g, '')
                .trim();
            task.name = taskName;
        }
        const startMatch = line.match(/🛫\s(\d{4}-\d{2}-\d{2})/);
        if (startMatch) {
            task.startDate = startMatch[1];
        }
        const dueDateMatch = line.match(/📅\s(\d{4}-\d{2}-\d{2})/);
        if (dueDateMatch) {
            task.dueDate = dueDateMatch[1];
        }
        const ownerMatch = line.match(/\[owner::([^\]]+)\]/);
        if (ownerMatch) {
            task.owner = ownerMatch[1];
        }
        const idMatch = line.match(/🆔\s([a-zA-Z0-9-]+)/);
        if (idMatch) {
            task.id = idMatch[1];
        }
        const depMatch = line.match(/⛔\s([a-zA-Z0-9-]+)/);
        if (depMatch) {
            task.dependency = depMatch[1];
        }
        task.isMilestone = line.includes('#milestone');
        task.isHighPriority = line.includes('🔺');
        return task;
    }
    // 计算工作日天数
    function calculateWorkingDays(startDate, endDate) {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) {
            [start, end] = [end, start];
        }
        let workingDays = 0;
        const currentDate = new Date(start);
        while (currentDate <= end) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return Math.max(1, workingDays);
    }
    // 计算任务持续天数
    function calculateDuration(startDate, endDate, excludeWeekends = true) {
        if (!startDate || !endDate) return '1d';
        if (excludeWeekends) {
            const workingDays = calculateWorkingDays(startDate, endDate);
            return `${workingDays}d`;
        } else {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return `${Math.max(1, diffDays)}d`;
        }
    }
    // 计算依赖任务持续时间
    function calculateDependencyDuration(currentTaskDueDate, dependencyTask, excludeWeekends = true) {
        if (!currentTaskDueDate || !dependencyTask) return '1d';
        let dependencyEndDate = dependencyTask.dueDate;
        if (!dependencyEndDate) {
            if (dependencyTask.startDate) {
                const start = new Date(dependencyTask.startDate);
                start.setDate(start.getDate() + 1);
                dependencyEndDate = start.toISOString().split('T')[0];
            } else {
                return '1d';
            }
        }
        if (excludeWeekends) {
            const depEnd = new Date(dependencyEndDate);
            let taskStart = new Date(depEnd);
            taskStart.setDate(taskStart.getDate() + 1);
            while (taskStart.getDay() === 0 || taskStart.getDay() === 6) {
                taskStart.setDate(taskStart.getDate() + 1);
            }
            const workingDays = calculateWorkingDays(taskStart.toISOString().split('T')[0], currentTaskDueDate);
            return `${workingDays}d`;
        } else {
            const currentDue = new Date(currentTaskDueDate);
            const depEnd = new Date(dependencyEndDate);
            const diffTime = currentDue - depEnd;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${Math.max(1, diffDays)}d`;
        }
    }
    // 生成Mermaid甘特图
    function generateMermaidGantt(tasks, excludeWeekends = true) {
        let mermaid = `\`\`\`mermaid
gantt
axisFormat %m/%d
todayMarker on`;
        if (excludeWeekends) {
            mermaid += `\nexcludes weekends`;
        }
        mermaid += `\n\n`;
        const sections = {};
        tasks.forEach(task => {
            if (!sections[task.section]) {
                sections[task.section] = [];
            }
            sections[task.section].push(task);
        });
        const taskMap = {};
        tasks.forEach(task => {
            if (task.id) {
                taskMap[task.id] = task;
            }
        });
        Object.keys(sections).forEach(sectionName => {
            if (sectionName) {
                mermaid += `    section ${sectionName}\n`;
            }
            sections[sectionName].forEach(task => {
                let taskLine = `    ${task.name} :`;
                if (task.isMilestone) {
                    taskLine += 'milestone, ';
                    if (task.completed) {
                        taskLine += 'done, ';
                    }
                } else if (task.completed) {
                    taskLine += 'done, ';
                } else {
                    taskLine += 'active, ';
                }
                if (task.isHighPriority) {
                    taskLine += 'crit, ';
                }
                if (task.dependency) {
                    if (task.id) {
                        taskLine += `${task.id}, `;
                    }
                    taskLine += `after ${task.dependency}, `;
                    if (task.dueDate) {
                        const dependencyTask = taskMap[task.dependency];
                        const duration = calculateDependencyDuration(task.dueDate, dependencyTask, excludeWeekends);
                        taskLine += duration;
                    } else {
                        taskLine += '1d';
                    }
                } else if (task.id) {
                    taskLine += `${task.id}, `;
                    if (task.isMilestone) {
                        taskLine += `${task.dueDate}, 0d`;
                    } else if (task.startDate && task.dueDate) {
                        const duration = calculateDuration(task.startDate, task.dueDate, excludeWeekends);
                        taskLine += `${task.startDate}, ${duration}`;
                    } else if (task.dueDate) {
                        taskLine += `${task.dueDate}, 1d`;
                    } else {
                        taskLine += '1d';
                    }
                } else {
                    if (task.isMilestone) {
                        taskLine += `${task.dueDate}, 0d`;
                    } else if (task.startDate && task.dueDate) {
                        const duration = calculateDuration(task.startDate, task.dueDate, excludeWeekends);
                        taskLine += `${task.startDate}, ${duration}`;
                    } else if (task.dueDate) {
                        taskLine += `${task.dueDate}, 1d`;
                    } else {
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
    // 新增: 导出SVG功能
    async function exportSVG(ganttChart) {
        try {
            // 等待Mermaid图表渲染完成 - 使用轮询检测
            new Notice("⏳ 等待甘特图渲染...");
            let mermaidElements = [];
            let attempts = 0;
            const maxAttempts = 20; // 最多等待10秒
            // 轮询检测SVG是否已渲染
            while (attempts < maxAttempts) {
                mermaidElements = document.querySelectorAll('.mermaid svg');
                // 检查是否有包含gantt内容的SVG
                let hasGanttSvg = false;
                for (let svg of mermaidElements) {
                    // 检查SVG是否包含甘特图特征
                    if (svg.querySelector('.task, .taskText, .section') ||
                        svg.innerHTML.includes('gantt')) {
                        hasGanttSvg = true;
                        break;
                    }
                }
                if (hasGanttSvg) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
            }
            // 查找当前文档中的Mermaid SVG元素
            mermaidElements = document.querySelectorAll('.mermaid svg');
            if (mermaidElements.length === 0) {
                new Notice("❌ 未找到已渲染的甘特图。请确保:\n1. 已切换到预览模式或开启实时预览\n2. 甘特图代码正确且已显示");
                return;
            }
            // 获取最后一个Mermaid图表(通常是刚生成的)
            const svgElement = mermaidElements[mermaidElements.length - 1];
            // 克隆SVG元素
            const clonedSvg = svgElement.cloneNode(true);
            // 获取SVG的实际尺寸
            const bbox = svgElement.getBBox();
            clonedSvg.setAttribute('width', bbox.width);
            clonedSvg.setAttribute('height', bbox.height);
            clonedSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
            // 收集所有应用的CSS样式
            const styleSheets = Array.from(document.styleSheets);
            let cssText = '';
            styleSheets.forEach(sheet => {
                try {
                    const rules = sheet.cssRules || sheet.rules;
                    Array.from(rules).forEach(rule => {
                        if (rule.cssText && (
                            rule.cssText.includes('.mermaid') ||
                            rule.cssText.includes('gantt') ||
                            rule.cssText.includes('.task') ||
                            rule.cssText.includes('.section')
                        )) {
                            cssText += rule.cssText + '\n';
                        }
                    });
                } catch (e) {
                    // 跨域样式表可能无法访问
                }
            });
            // 在SVG中嵌入样式
            if (cssText) {
                const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                styleElement.textContent = cssText;
                clonedSvg.insertBefore(styleElement, clonedSvg.firstChild);
            }
            // 序列化SVG
            const serializer = new XMLSerializer();
            let svgString = serializer.serializeToString(clonedSvg);
            // 添加XML声明
            svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
            // 创建Blob
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            // 生成文件名(使用当前文件名 + 时间戳)
            const fileName = `${activeFile.basename}_gantt_${Date.now()}.svg`;
            // 保存文件
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            // 保存到vault的attachments文件夹
            const attachmentPath = app.vault.getConfig('attachmentFolderPath') || '';
            const savePath = attachmentPath ? `${attachmentPath}/${fileName}` : fileName;
            await app.vault.createBinary(savePath, uint8Array);
            new Notice(`✅ SVG已导出: ${savePath}`);
        } catch (error) {
            console.error('导出SVG时出错:', error);
            new Notice('❌ 导出SVG失败: ' + error.message);
        }
    }
    try {
        // 解析任务
        const tasks = parseTasksFromContent(content);
        if (tasks.length === 0) {
            new Notice("未找到任务或项目分解部分,请检查格式");
            return;
        }
        // 周末设置选项
        const weekendOptions = [
            {
                label: "🏢 排除周末(只计算工作日)",
                value: true,
                description: "甘特图将跳过周六日,只计算工作日"
            },
            {
                label: "📅 包含周末(按日历天数计算)",
                value: false,
                description: "甘特图将包含所有日期,包括周末"
            }
        ];
        const selectedWeekendOption = await suggester(
            weekendOptions.map(opt => opt.label),
            weekendOptions
        );
        if (!selectedWeekendOption) {
            new Notice("已取消操作");
            return;
        }
        const excludeWeekends = selectedWeekendOption.value;
        // 生成甘特图
        const ganttChart = generateMermaidGantt(tasks, excludeWeekends);
        // 插入方式选项 - 新增SVG导出选项
        const insertOptions = [
            {
                label: "📍 光标位置插入",
                value: "cursor",
                description: "在当前光标位置插入甘特图"
            },
            {
                label: "📄 文件末尾追加",
                value: "append",
                description: "在文件末尾添加甘特图"
            },
            {
                label: "🔄 替换现有甘特图",
                value: "replace",
                description: "查找并替换现有的甘特图,如无则追加"
            },
            {
                label: "📋 复制到剪贴板",
                value: "copy",
                description: "将甘特图复制到剪贴板,不修改文件"
            },
            {
                label: "🖼️ 导出为SVG图片",
                value: "svg",
                description: "先插入甘特图,然后导出为SVG文件"
            }
        ];
        const selectedInsertOption = await suggester(
            insertOptions.map(opt => opt.label),
            insertOptions
        );
        if (!selectedInsertOption) {
            new Notice("已取消操作");
            return;
        }
        const insertOption = selectedInsertOption.value;
        // 执行相应的插入操作
        if (insertOption === "copy") {
            await navigator.clipboard.writeText(ganttChart);
            new Notice("📋 甘特图已复制到剪贴板");
        } else if (insertOption === "cursor") {
            const activeView = app.workspace.getActiveViewOfType(app.workspace.getLeavesOfType('markdown')[0]?.view?.constructor);
            if (activeView && activeView.editor) {
                const cursor = activeView.editor.getCursor();
                activeView.editor.replaceRange('\n\n## 甘特图\n\n' + ganttChart + '\n', cursor);
                new Notice("📍 甘特图已插入到光标位置");
            } else {
                const activeLeaf = app.workspace.getActiveViewOfType();
                if (activeLeaf && activeLeaf.editor) {
                    const cursor = activeLeaf.editor.getCursor();
                    activeLeaf.editor.replaceRange('\n\n## 甘特图\n\n' + ganttChart + '\n', cursor);
                    new Notice("📍 甘特图已插入到光标位置");
                } else {
                    new Notice("⚠️ 无法获取编辑器,将追加到文件末尾");
                    const newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
                    await app.vault.modify(activeFile, newContent);
                }
            }
        } else if (insertOption === "append") {
            const newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
            await app.vault.modify(activeFile, newContent);
            new Notice("📄 甘特图已添加到文件末尾");
        } else if (insertOption === "replace") {
            let newContent = content;
            const ganttRegex = /```mermaid\s*\ngantt[\s\S]*?```/g;
            if (ganttRegex.test(content)) {
                newContent = content.replace(ganttRegex, ganttChart);
                new Notice("🔄 现有甘特图已更新");
            } else {
                newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
                new Notice("📄 甘特图已添加到文件末尾(未找到现有甘特图)");
            }
            await app.vault.modify(activeFile, newContent);
        } else if (insertOption === "svg") {
            // 先插入甘特图
            const ganttRegex = /```mermaid\s*\ngantt[\s\S]*?```/g;
            let newContent = content;
            if (ganttRegex.test(content)) {
                newContent = content.replace(ganttRegex, ganttChart);
            } else {
                newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
            }
            await app.vault.modify(activeFile, newContent);
            new Notice("🖼️ 甘特图已插入,准备导出SVG...");
            // 等待文件更新和渲染
            await exportSVG(ganttChart);
        }
        // 显示统计信息
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        new Notice(`✅ 甘特图生成完成!共处理 ${totalTasks} 个任务,其中 ${completedTasks} 个已完成`);
    } catch (error) {
        console.error('生成甘特图时出错:', error);
        new Notice('❌ 生成甘特图时出错: ' + error.message);
    }
};
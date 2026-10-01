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
        
        let currentProject = '';
        let currentSection = '';
        let inTargetArea = false;
        let topLevelHeaderLevel = 0;
        let hasMultipleSectionsInProject = false;
        let foundSeparator = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // 🔧 新增: 检测 *** 分隔符
            if (!foundSeparator && line === '***') {
                foundSeparator = true;
                console.log('找到分隔符 ***, 开始从此处解析任务');
                continue;
            }

            // 🔧 修改: 只有在找到分隔符后才开始解析
            if (!foundSeparator) {
                continue;
            }

            if (!inTargetArea) {
                const matchH2 = line.match(/^##\s+(.+)/);
                const matchH3 = line.match(/^###\s+(.+)/);
                
                if (matchH2 || matchH3) {
                    inTargetArea = true;
                    if (matchH2) {
                        topLevelHeaderLevel = 2;
                        currentProject = matchH2[1].trim();
                    } else {
                        topLevelHeaderLevel = 3;
                    }
                }
                continue;
            }

            let breakLoop = false;
            
            if (line.match(/^##\s/)) {
                breakLoop = true;
            } else if (line.match(/^###\s+(.+)/)) {
                const sectionTitle = line.replace(/^###\s+/, '').trim();
                if (topLevelHeaderLevel === 2) {
                    if (currentSection) {
                         hasMultipleSectionsInProject = true;
                    }
                    currentSection = sectionTitle;
                } else if (topLevelHeaderLevel === 3) {
                    hasMultipleSectionsInProject = false;
                    currentProject = sectionTitle;
                    currentSection = null;
                }
            } else if (line.match(/^-\s\[.\]\s/)) {
                let taskSectionName = null;
                let taskProjectName = '';

                if (topLevelHeaderLevel === 2 && hasMultipleSectionsInProject) {
                    taskSectionName = currentSection || '';
                }
                taskProjectName = currentProject || currentSection;

                const task = parseTaskLine(line, taskSectionName, taskProjectName);
                if (task) {
                    tasks.push(task);
                }
            }

            if (breakLoop) {
                break;
            }
        }
        return tasks;
    }

    function parseTaskLine(line, section, project) {
        const task = {
            project: project,
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
                .replace(/⛓\s[a-zA-Z0-9-]+/g, '')
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
        const depMatch = line.match(/⛓\s([a-zA-Z0-9-]+)/);
        if (depMatch) {
            task.dependency = depMatch[1];
        }
        task.isMilestone = line.includes('#milestone');
        task.isHighPriority = line.includes('🔺');
        return task;
    }

    function calculateWorkingDays(startDate, endDate) {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        let workingDays = 0;
        
        let currentDate = start > end ? new Date(endDate) : new Date(startDate);
        let endDateVar = start > end ? new Date(startDate) : new Date(endDate);
        
        while (currentDate <= endDateVar) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return Math.max(1, workingDays);
    }

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

    function generateMermaidGantt(tasks, excludeWeekends = true) {
        let mermaid = `\`\`\`mermaid
gantt
axisFormat %m/%d
todayMarker on`;
        if (excludeWeekends) {
            mermaid += `\nexcludes weekends`;
        }
        mermaid += `\n\n`;

        const hasAnySection = tasks.some(task => task.section);
        
        if (hasAnySection) {
            const sections = {};
            tasks.forEach(task => {
                const sectionName = task.section || '未分组';
                if (!sections[sectionName]) {
                    sections[sectionName] = [];
                }
                sections[sectionName].push(task);
            });

            const taskMap = {};
            tasks.forEach(task => {
                if (task.id) {
                    taskMap[task.id] = task;
                }
            });
            
            Object.keys(sections).forEach(sectionName => {
                mermaid += `    section ${sectionName}\n`;
                sections[sectionName].forEach(task => {
                     mermaid += formatTaskLine(task, taskMap, excludeWeekends) + '\n';
                });
                mermaid += '\n';
            });
        } else {
            const taskMap = {};
            tasks.forEach(task => {
                if (task.id) {
                    taskMap[task.id] = task;
                }
            });

            tasks.forEach(task => {
                mermaid += formatTaskLine(task, taskMap, excludeWeekends) + '\n';
            });
            mermaid += '\n';
        }

        mermaid += '```';
        return mermaid;
    }

    function formatTaskLine(task, taskMap, excludeWeekends) {
        let taskLine = `    ${task.name} :`;
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
        return taskLine;
    }

    async function exportSVG(ganttChart) {
        try {
            new Notice("⏳ 等待甘特图渲染...");
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            let svgElement = null;
            let attempts = 0;
            const maxAttempts = 30;
            
            while (attempts < maxAttempts && !svgElement) {
                const selectors = [
                    '.mermaid svg',
                    '.mermaid-svg svg',
                    '[data-mermaid-chart] svg',
                    'pre.mermaid svg',
                    '.markdown-preview-view .mermaid svg',
                    '.markdown-rendered .mermaid svg'
                ];
                
                for (const selector of selectors) {
                    const elements = document.querySelectorAll(selector);
                    console.log(`尝试选择器 ${selector}, 找到 ${elements.length} 个元素`);
                    
                    if (elements.length > 0) {
                        for (let svg of elements) {
                            const hasGanttContent = 
                                svg.querySelector('.task, .taskText, .section, [class*="task"]') ||
                                svg.innerHTML.includes('gantt') ||
                                svg.querySelector('g.grid') ||
                                svg.querySelector('rect[class*="task"]');
                            
                            if (hasGanttContent) {
                                svgElement = svg;
                                console.log('找到甘特图SVG元素');
                                break;
                            }
                        }
                    }
                    
                    if (svgElement) break;
                }
                
                if (!svgElement) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    attempts++;
                }
            }
            
            if (!svgElement) {
                new Notice("❌ 未找到已渲染的甘特图。请确保:\n1. 已切换到阅读模式(预览模式)\n2. 甘特图已正确显示\n3. 等待几秒后重试");
                console.error('未找到SVG元素,请检查页面上是否有甘特图');
                return;
            }
            
            const clonedSvg = svgElement.cloneNode(true);
            
            let width, height, viewBox;
            
            try {
                const bbox = svgElement.getBBox();
                width = bbox.width || svgElement.clientWidth || 800;
                height = bbox.height || svgElement.clientHeight || 600;
                viewBox = `${bbox.x || 0} ${bbox.y || 0} ${width} ${height}`;
            } catch (e) {
                width = svgElement.clientWidth || svgElement.width.baseVal.value || 800;
                height = svgElement.clientHeight || svgElement.height.baseVal.value || 600;
                viewBox = `0 0 ${width} ${height}`;
            }
            
            console.log(`SVG尺寸: ${width}x${height}, ViewBox: ${viewBox}`);
            
            clonedSvg.setAttribute('width', width);
            clonedSvg.setAttribute('height', height);
            clonedSvg.setAttribute('viewBox', viewBox);
            clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            
            const styleSheets = Array.from(document.styleSheets);
            let cssText = '';
            
            styleSheets.forEach(sheet => {
                try {
                    const rules = sheet.cssRules || sheet.rules;
                    if (rules) {
                        Array.from(rules).forEach(rule => {
                            if (rule.cssText) {
                                const relevantPatterns = [
                                    '.mermaid', 'gantt', '.task', '.section',
                                    '.grid', '.tick', '.domain', 'rect', 'text',
                                    '[class*="task"]', '.taskText'
                                ];
                                
                                const isRelevant = relevantPatterns.some(pattern => 
                                    rule.cssText.includes(pattern)
                                );
                                
                                if (isRelevant) {
                                    cssText += rule.cssText + '\n';
                                }
                            }
                        });
                    }
                } catch (e) {
                    // 跨域CSS无法访问,跳过
                }
            });
            
            cssText += `
                text { fill: currentColor; }
                rect { stroke: currentColor; }
                .taskText { fill: #000; }
                .task { fill: #8a8a8a; }
                .taskTextOutside { fill: #000; }
            `;
            
            if (cssText) {
                const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                styleElement.textContent = cssText;
                clonedSvg.insertBefore(styleElement, clonedSvg.firstChild);
            }
            
            const serializer = new XMLSerializer();
            let svgString = serializer.serializeToString(clonedSvg);
            svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
            
            console.log('SVG字符串长度:', svgString.length);
            
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const fileName = `${activeFile.basename}_gantt_${Date.now()}.svg`;
            const attachmentPath = app.vault.getConfig('attachmentFolderPath') || '';
            const savePath = attachmentPath ? `${attachmentPath}/${fileName}` : fileName;
            
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            await app.vault.createBinary(savePath, uint8Array);
            
            new Notice(`✅ SVG已导出: ${savePath}\n大小: ${(svgString.length / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error('导出SVG时出错:', error);
            new Notice('❌ 导出SVG失败: ' + error.message);
        }
    }

    try {
        const tasks = parseTasksFromContent(content);
        if (tasks.length === 0) {
            new Notice("未在 *** 分隔符后的 ## 或 ### 标题下找到任务,请检查格式");
            return;
        }
        const weekendOptions = [
            { label: "🏢 排除周末(只计算工作日)", value: true },
            { label: "📅 包含周末(按日历天数计算)", value: false }
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
        const ganttChart = generateMermaidGantt(tasks, excludeWeekends);
        const insertOptions = [
            { label: "📍 光标位置插入", value: "cursor" },
            { label: "📄 文件末尾追加", value: "append" },
            { label: "🔄 替换现有甘特图", value: "replace" },
            { label: "📋 复制到剪贴板", value: "copy" },
            { label: "🖼️ 导出为SVG图片(仅阅读模式生效)", value: "svg" }
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
        if (insertOption === "copy") {
            await navigator.clipboard.writeText(ganttChart);
            new Notice("📋 甘特图已复制到剪贴板");
        } else if (insertOption === "cursor") {
            const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
            if (editor) {
                const cursor = editor.getCursor();
                editor.replaceRange('\n\n## 甘特图\n\n' + ganttChart + '\n', cursor);
                new Notice("📍 甘特图已插入到光标位置");
            } else {
                new Notice("⚠️ 无法获取编辑器,将追加到文件末尾");
                const newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
                await app.vault.modify(activeFile, newContent);
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
            const ganttRegex = /```mermaid\s*\ngantt[\s\S]*?```/g;
            let newContent = content;
            if (ganttRegex.test(content)) {
                newContent = content.replace(ganttRegex, ganttChart);
            } else {
                newContent = content + '\n\n## 甘特图\n\n' + ganttChart;
            }
            await app.vault.modify(activeFile, newContent);
            new Notice("🖼️ 甘特图已插入,准备导出SVG...\n请确保已切换到阅读模式");
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            await exportSVG(ganttChart);
        }
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        new Notice(`✅ 甘特图生成完成!共处理 ${totalTasks} 个任务,其中 ${completedTasks} 个已完成`);
    } catch (error) {
        console.error('生成甘特图时出错:', error);
        new Notice('❌ 生成甘特图时出错: ' + error.message);
    }
};
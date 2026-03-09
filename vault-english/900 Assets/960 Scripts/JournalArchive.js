module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester, utility }, app } = params;

    // 获取当前活跃文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("请先打开一个笔记文件");
        return;
    }

    // 读取当前文件内容
    const activeFileContent = await app.vault.read(activeFile);

    try {
        // 从当前文件的元数据中获取日期信息
        const fileCache = app.metadataCache.getFileCache(activeFile);
        if (!fileCache || !fileCache.frontmatter) {
            new Notice("❌ 当前笔记缺少元数据，请在周/月日志中运行此脚本");
            return;
        }

        const journalDate = fileCache.frontmatter["journal-date"];
        const journalType = fileCache.frontmatter["journal"];

        if (!journalDate) {
            new Notice("❌ 当前笔记缺少 `journal-date` 元数据");
            return;
        }

        if (!journalType || (journalType !== "Weekly" && journalType !== "Monthly")) {
            new Notice("❌ 此脚本仅支持 Weekly（周）和 Monthly（月）日志");
            return;
        }

        // 解析日期
        const baseDate = new Date(journalDate);
        if (isNaN(baseDate.getTime())) {
            new Notice("❌ 无效的 journal-date 格式");
            return;
        }

        let startDate, endDate, rangeDescription;

        if (journalType === "Weekly") {
            // 周日志：计算一周的日期范围
            startDate = new Date(baseDate);
            endDate = new Date(baseDate);
            endDate.setDate(endDate.getDate() + 6);

            // 计算周数（ISO周数）
            const year = startDate.getFullYear();
            const weekNumber = getISOWeek(startDate);
            rangeDescription = `${year}-W${weekNumber}周报`;
        } else {
            // 月日志：计算一月的日期范围
            const year = baseDate.getFullYear();
            const month = baseDate.getMonth();

            startDate = new Date(year, month, 1);
            endDate = new Date(year, month + 1, 0); // 当月最后一天

            rangeDescription = `${year}-${(month + 1).toString().padStart(2, '0')}月报`;
        }

        // 计算ISO周数的辅助函数
        function getISOWeek(date) {
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        }
        
        // 清理提取的文本的函数
        function cleanExtractedText(text) {
            if (!text) return "";
            
            return text
                .replace(/^:+/, '')      // 移除开头的冒号
                .replace(/:+$/, '')      // 移除结尾的冒号
                .replace(/^["']+/, '')   // 移除开头的引号
                .replace(/["']+$/, '')   // 移除结尾的引号
                .replace(/^\s+/, '')     // 移除开头的空白
                .replace(/\s+$/, '')     // 移除结尾的空白
                .trim();                 // 再次确保没有前后空白
        }
        
        // 获取前一天日志的"明天想改进的事"字段的函数
        async function getPreviousDayImprovement(currentDate) {
            try {
                // 计算前一天的日期
                const previousDate = new Date(currentDate);
                previousDate.setDate(previousDate.getDate() - 1);
                
                // 格式化日期为YYYY-MM-DD
                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };
                
                const previousDateStr = formatDate(previousDate);
                
                // 查找前一天的日志文件
                const previousFile = app.vault.getFiles().find(file => 
                    file.path.startsWith("500 Journal/540 Daily") && 
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
                    // 清理提取的文本
                    return cleanExtractedText(improvement);
                }
                
                // 如果frontmatter中没有，尝试从内容中查找
                const improvementMatch = content.match(/明天想改进的事[：:]\s*([^\]]+)(?:\])?/);
                if (improvementMatch) {
                    return cleanExtractedText(improvementMatch[1]);
                }
                
                // 尝试其他可能的格式
                const altMatch1 = content.match(/明天想改进的事[：:]\s*([^\]]+)(?:\])?/m);
                if (altMatch1) {
                    return cleanExtractedText(altMatch1[1]);
                }
                
                const altMatch2 = content.match(/##\s*明天想改进的事\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
                if (altMatch2) {
                    return cleanExtractedText(altMatch2[1]);
                }
                
                // 尝试从DataviewJS表达式中提取
                const dataviewMatch = content.match(/\$=\{.*?p\["明天想改进的事"\]:"([^"]+)".*?\}/);
                if (dataviewMatch) {
                    return cleanExtractedText(dataviewMatch[1]);
                }
                
                return "未找到'明天想改进的事'字段";
            } catch (error) {
                console.error("获取前一天改进事项时出错:", error);
                return `获取前一天改进事项时出错: ${error.message}`;
            }
        }
        
        // 修复后的处理DataviewJS表达式的函数
        async function processDataviewJSExpressions(content, currentDate) {
            // 匹配所有DataviewJS表达式
            const dataviewRegex = /\$=\{const p=dv\.pages\('"500 Journal\/540 Daily"'\)\.find\(p=>p\.file\.name===new Date\(new Date\(dv\.current\(\)\.file\.name\)\.setDate\(new Date\(dv\.current\(\)\.file\.name\)\.getDate\(\)-1\)\)\.toISOString\(\)\.split\('T'\)\[0\]\);p\?p\["明天想改进的事"\]:"([^"]+)"\}/g;
            
            // 查找所有匹配项
            const matches = [...content.matchAll(dataviewRegex)];
            
            // 对每个匹配项进行替换
            for (const match of matches) {
                const fullMatch = match[0];
                const defaultValue = match[1];
                
                // 获取实际值
                const improvement = await getPreviousDayImprovement(currentDate);
                
                // 替换内容
                content = content.replace(fullMatch, improvement);
            }
            
            return content;
        }
        
        // 格式化日期为YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        // 计算总天数
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        let monthlyContent = `\n## 🗄️ ${rangeDescription}归档\n\n`;
        const processedDates = [];
        
        // 遍历选定日期范围的每一天
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateStr = formatDate(date);
            const dailyNotePath = `500 Journal/540 Daily/${dateStr}.md`;
            const dailyNote = app.vault.getAbstractFileByPath(dailyNotePath);
            
            // 添加日期标题（包含星期信息）
            const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            monthlyContent += `### ${dayNames[date.getDay()]} ${dateStr}\n`;
            
            if (dailyNote) {
                let content = await app.vault.read(dailyNote);
                
                // 处理DataviewJS表达式
                content = await processDataviewJSExpressions(content, new Date(date));
                
                // 增强过滤
                content = content
                    .replace(/^---[\s\S]*?---/, '')                 // 移除frontmatter
                    .replace(/^#\s+.*?\s+日志\s*$/m, '')             // 移除大标题（如：# 2024-01-01 日志）
                    .replace(/%%[\s\S]*?%%/g, '')                   // 移除备注内容（%%备注%%）
                    .replace(/^\*\*\*.*?\*\*\*\s*$/m, '')           // 移除三星号包围的文字（如：***日事日毕，日清日高***）
                    .replace(/^.*?\[.*?::\s*\].*$/gm, '')           // 移除空值内联字段行
                    .replace(/```[\s\S]*?```/g, '')                 // 移除代码块
                    .replace(/^[\t>]*\>.*$/gm, '')                  // 移除callouts
                    .replace(/`button-[^`]+`/g, '')                 // 移除行内代码按钮
                    .replace(/^\s*[\-\*]\s\[(>)\].*$/gm, '')        // 移除推迟的重复任务
                    .replace(/!\[\[.*?#.*?\]\]/g, '')               // 移除带#的图片引用
                    .replace(/^(?:\*\*\*|---)+$/gm, '')             // 移除单独一行的分隔符
                    .replace(/^(##+)(.*)/gm, (match, p1, p2) => {   // 增加标题层级
                        return '##' + p1 + p2;
                    })
                    .replace(/\n{3,}/g, '\n\n');                    // 压缩空行
                
                // 处理空标题部分和排除特定标题
                const sections = [];
                const lines = content.split('\n');
                let currentSection = [];
                let currentHeader = '';
                let skipCurrentSection = false;
                
                for (let j = 0; j < lines.length; j++) {
                    const line = lines[j];
                    if (line.match(/^#+\s/)) {
                        // 如果遇到新标题，先处理前一个部分
                        if (currentHeader && currentSection.length > 0 && !skipCurrentSection) {
                            sections.push(currentHeader + '\n' + currentSection.join('\n'));
                        }
                        
                        // 设置新标题
                        currentHeader = line;
                        currentSection = [];
                        
                        // 检查是否为需要排除的标题
                        skipCurrentSection = line.match(/^#+\s+📥 收件箱清理/) !== null;
                    } else if (line.trim() !== '') {
                        currentSection.push(line);
                    }
                }
                
                // 处理最后一个部分
                if (currentHeader && currentSection.length > 0 && !skipCurrentSection) {
                    sections.push(currentHeader + '\n' + currentSection.join('\n'));
                }
                
                // 重新组合内容
                content = sections.join('\n\n');
                
                monthlyContent += content.trim() + "\n\n---\n";
                processedDates.push(dateStr);
            } else {
                monthlyContent += "（无当日日志）\n\n---\n";
            }
        }
        
        // 添加处理摘要
        monthlyContent += `\n> 已归档 ${processedDates.length}/${totalDays} 天日志 | 归档范围: ${rangeDescription}`;
        
        // 询问插入方式
        const insertOptions = [
            {
                label: "📍 光标位置插入",
                value: "cursor",
                description: "在当前光标位置插入归档内容"
            },
            {
                label: "📄 文件末尾追加",
                value: "append",
                description: "在文件末尾添加归档内容"
            },
            {
                label: "📋 复制到剪贴板",
                value: "copy",
                description: "将归档内容复制到剪贴板，不修改文件"
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
            // 复制到剪贴板
            await navigator.clipboard.writeText(monthlyContent);
            new Notice("📋 归档内容已复制到剪贴板");
        } else if (insertOption === "cursor") {
            // 在光标位置插入
            const activeView = app.workspace.getActiveViewOfType(app.workspace.getLeavesOfType('markdown')[0]?.view?.constructor);
            if (activeView && activeView.editor) {
                const cursor = activeView.editor.getCursor();
                activeView.editor.replaceRange('\n\n' + monthlyContent + '\n', cursor);
                new Notice("📍 归档内容已插入到光标位置");
            } else {
                // 备用方案：直接获取编辑器
                const activeLeaf = app.workspace.getActiveViewOfType();
                if (activeLeaf && activeLeaf.editor) {
                    const cursor = activeLeaf.editor.getCursor();
                    activeLeaf.editor.replaceRange('\n\n' + monthlyContent + '\n', cursor);
                    new Notice("📍 归档内容已插入到光标位置");
                } else {
                    new Notice("⚠️ 无法获取编辑器，将追加到文件末尾");
                    const newContent = activeFileContent + '\n\n' + monthlyContent;
                    await app.vault.modify(activeFile, newContent);
                }
            }
        } else if (insertOption === "append") {
            // 追加到文件末尾
            const newContent = activeFileContent + '\n\n' + monthlyContent;
            await app.vault.modify(activeFile, newContent);
            new Notice("📄 归档内容已添加到文件末尾");
        }
        
        // 显示统计信息
        new Notice(`✅ 归档完成！已处理 ${processedDates.length}/${totalDays} 天日志`);
        
    } catch (error) {
        console.error('生成归档时出错:', error);
        new Notice('❌ 生成归档时出错: ' + error.message);
    }
};

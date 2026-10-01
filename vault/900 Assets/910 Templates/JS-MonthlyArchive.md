---
created: 2025-09-18
---

<%*
// 获取当前笔记的journal-date
const activeFile = app.workspace.getActiveFile();
const activeFileContent = await app.vault.read(activeFile);
const journalDateMatch = activeFileContent.match(/journal-date:\s*(.*)/);
const referenceDate = journalDateMatch ? journalDateMatch[1] : tp.date.now("YYYY-MM-DD");

// 计算当前月份信息
const currentMonth = moment(referenceDate);
const year = currentMonth.year();
const month = currentMonth.month() + 1; // moment的月份从0开始
const monthStr = month.toString().padStart(2, '0');

// 获取当月第一天和最后一天
const monthStart = moment(referenceDate).startOf('month');
const monthEnd = moment(referenceDate).endOf('month');
const daysInMonth = monthEnd.date();

let monthlyContent = `\n## 🗄️ ${year}-${monthStr}月日志归档\n\n`; 
const processedDates = [];

// 遍历整个月的每一天
for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = moment(referenceDate).startOf('month').add(day - 1, 'days');
    const dateStr = currentDate.format("YYYY-MM-DD");
    const dailyNotePath = `500 Journal/540 Daily/${dateStr}.md`;
    const dailyNote = app.vault.getAbstractFileByPath(dailyNotePath);
    
    // 添加日期标题（包含星期信息）
    monthlyContent += `### ${currentDate.format("ddd YYYY-MM-DD")}\n`;
    
    if (dailyNote) {
        let content = await app.vault.read(dailyNote);
        // 增强过滤
        content = content
            .replace(/^---[\s\S]*?---/, '')                 // 移除frontmatter
            .replace(/^#\s+.*?\s+日志\s*$/m, '')             // 移除大标题（如：# 2024-01-01 日志）
            .replace(/%%[\s\S]*?%%/g, '')                   // 移除备注内容（%%备注%%）
            .replace(/^\*\*\*.*?\*\*\*\s*$/m, '')           // 移除三星号包围的文字（如：***日事日毕，日清日高***）
            .replace(/^.*?\[.*?::\s*\].*$/gm, '')           // 移除空值内联字段行
            .replace(/```[\s\S]*?```/g, '')                 // 移除代码块
            .replace(/^[\t>]*\>.*$/gm, '')                  // 移除callouts
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
const monthName = currentMonth.format("YYYY年MM月");
monthlyContent += `\n> 已归档 ${processedDates.length}/${daysInMonth} 天日志 | 归档月份: ${monthName}`;

tR += monthlyContent;
%>
<%*
// 获取当前周记的journal-date
const activeFile = app.workspace.getActiveFile();
const activeFileContent = await app.vault.read(activeFile);
const journalDateMatch = activeFileContent.match(/journal-date:\s*(.*)/);
const weekStartDate = journalDateMatch ? journalDateMatch[1] : tp.date.now("YYYY-MM-DD");

// 计算当前周数 
const weekNumber = moment(weekStartDate).week(); 
const year = moment(weekStartDate).year(); 
let weeklyContent = `\n## 🗄️ ${year}-W${weekNumber.toString().padStart(2, '0')}周日志归档\n\n`; 
const processedDates = [];

for (let i = 0; i < 7; i++) {
    const currentDate = moment(weekStartDate).add(i, 'days');
    const dateStr = currentDate.format("YYYY-MM-DD");
    const dailyNotePath = `500 Journal/540 Daily/${dateStr}.md`;
    const dailyNote = app.vault.getAbstractFileByPath(dailyNotePath);
    
    weeklyContent += `### ${currentDate.format("ddd YYYY-MM-DD")}\n`;
    
    if (dailyNote) {
        let content = await app.vault.read(dailyNote);
        // 增强过滤
        content = content
            .replace(/^---[\s\S]*?---/, '')                 // 移除frontmatter
            .replace(/^#\s+.*?\s+日志\s*$/m, '')             // 移除大标题（如：# 2024-01-01 日志）
            .replace(/^\*\*\*.*?\*\*\*\s*$/m, '')           // 移除三星号包围的文字（如：***日事日毕，日清日高***）
            .replace(/```[\s\S]*?```/g, '')                 // 移除代码块
            .replace(/^[\t>]*\>.*$/gm, '')                  // 移除callouts
            .replace(/^\s*[\-\*]\s\[(>)\].*$/gm, '')        // 移除推迟的重复任务
            .replace(/!\[\[.*?#.*?\]\]/g, '')               // 移除带#的图片引用
            .replace(/!\[\[.*?\]\]/g, '')                   // 移除所有普通图片引用
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
        
        weeklyContent += content.trim() + "\n\n---\n";
        processedDates.push(dateStr);
    } else {
        weeklyContent += "（无当日日志）\n\n---\n";
    }
}

// 添加处理摘要
weeklyContent += `\n> 已归档 ${processedDates.length}/7 天日志 | 本周开始日期: ${weekStartDate}`;

tR += weeklyContent;
%>
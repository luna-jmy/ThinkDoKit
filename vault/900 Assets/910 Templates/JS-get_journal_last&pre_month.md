<%*
// 获取 journal-date 属性值
const journalDate = tp.frontmatter["journal-date"];

if (journalDate) {
    // 解析日期
    const [year, month] = journalDate.split('-').map(Number);
    
    // 计算上一月
    let prevYear = year;
    let prevMonth = month - 1;
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear--;
    }
    
    // 计算下一月
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
    }
    
    // 格式化为 YYYY-MM
    const format = (y, m) => `${y}-${m.toString().padStart(2, '0')}`;
    
    // 输出结果
    tR += `- 上一月: [[${format(prevYear, prevMonth)}]] 月度日志\n- 下一月: [[${format(nextYear, nextMonth)}]] 月度日志`;
} else {
    tR += "未找到 journal-date 属性";
}
%>
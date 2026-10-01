---
created: 2025-09-18
---

<%*
// 首先获取当前月份格式为YYYY-MM
const currentMonth = tp.date.now("YYYY-MM");

// 构建Tasks查询，查询DailyNotes文件夹下，当月日志笔记里所有未完成任务，但不含标记推迟">"的任务
const query = `\`\`\`tasks
path includes DailyNotes
filename includes ${currentMonth}
filter by function task.status.symbol !== '>'
sort by due date
sort by filename
hide backlink
\`\`\``;

// 输出查询
tR += query;
%>

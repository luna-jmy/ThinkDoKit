---
created: 2025-09-18
---

<%*
const currentYearMonth = tp.date.now("YYYY-MM");
const dailyNotesFolder = "500 Journal/540 Daily/";

const files = app.vault.getFiles().filter(file => {
    return file.path.startsWith(dailyNotesFolder) && 
           file.name.includes(currentYearMonth);
});

let allTasks = [];

for (const file of files) {
    const content = await app.vault.read(file);

    // 提取 [ ] 任务（未完成）
    const unchecked = [...content.matchAll(/^\s*-\s\[\s\]\s.*$/gm)];
    // 提取 [x] 任务（已完成）
    const checked = [...content.matchAll(/^\s*-\s\[x\]\s.*$/gmi)];
    // 提取 [i] 任务（信息类）
    const info = [...content.matchAll(/^\s*-\s\[i\]\s.*$/gmi)];

    const allMatches = [...unchecked, ...checked, ...info];

    allMatches.forEach(match => {
        allTasks.push({
            task: match[0].trim(), // 完整保留任务行，如 - [x] something
            sourceFile: file.name
        });
    });
}

if (allTasks.length > 0) {
    tR += `### ${currentYearMonth} 任务列表\n\n`;
    allTasks.forEach(item => {
        tR += `${item.task} (来自 [[${item.sourceFile}]]) \n`;
    });
} else {
    tR += `在 ${currentYearMonth} 的笔记中没有找到未完成的任务。`;
}
%>

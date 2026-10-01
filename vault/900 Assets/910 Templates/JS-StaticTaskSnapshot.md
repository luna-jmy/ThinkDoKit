---
created: 2025-09-26
---

<%*
// 方式1：简单的文本输入框
//const currentYearMonth = await tp.system.prompt("请输入要查询的年月 (格式: 2025-09):");

// 方式2：带默认值的输入框（推荐）
const currentDate = new Date();
const defaultYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
const currentYearMonth = await tp.system.prompt("请输入要查询的年月:", defaultYearMonth);

const dailyNotesFolder = "500 Journal";

// 检查用户是否取消了输入
if (!currentYearMonth) {
    tR += "已取消任务提取。";
    return;
}

const files = app.vault.getFiles().filter(file => {
    return file.path.startsWith(dailyNotesFolder) && 
           file.name.includes(currentYearMonth);
});

let allTasks = [];

for (const file of files) {
    const content = await app.vault.read(file);

    // 提取 [ ] 任务（待办）
    const unchecked = [...content.matchAll(/^\s*-\s\[\s\]\s.*$/gm)];
    // 提取 [x] 任务（已完成）
    const checked = [...content.matchAll(/^\s*-\s\[x\]\s.*$/gmi)];
    // 提取 [i] 任务（信息）
    const info = [...content.matchAll(/^\s*-\s\[i\]\s.*$/gmi)];
    // 提取 [/] 任务（失败）
    const incomplete = [...content.matchAll(/^\s*-\s\[\/\]\s.*$/gmi)];
    // 提取 [!] 任务（提醒）
    const important = [...content.matchAll(/^\s*-\s\[!\]\s.*$/gmi)];
    // 提取 [n] 任务（备忘）
    const note = [...content.matchAll(/^\s*-\s\[n\]\s.*$/gmi)];    
       
    const allMatches = [...unchecked, ...checked, ...info, ...incomplete, ...important, ...note];
    
    allMatches.forEach(match => {
        allTasks.push({
            task: match[0].trim(),
            sourceFile: file.name
        });
    });
}

if (allTasks.length > 0) {
    tR += `### ${currentYearMonth} 月日志任务列表\n\n`;
    allTasks.forEach(item => {
        tR += `${item.task} (来自 [[${item.sourceFile}]]) \n`;
    });
} else {
    tR += `在 ${currentYearMonth} 的笔记中没有找到任务。`;
}
%>
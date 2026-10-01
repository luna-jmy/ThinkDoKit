---
created: 2025-09-18
---

<%*
const targetFolder = "DailyNotes";
const oldLink = "![[2025-05#Reminders & Pending todos]]";  //原始链接
const newLink = "![[2025-05#Pending todos in DailyNotes]]";  //新链接

// 获取所有2025年5月份的日志文件
const files = app.vault.getFiles().filter(file => 
    file.path.startsWith(targetFolder + "/") && 
    file.name.match(/2025-05-\d{2}\.md/)  //手动修改月份
);

// 遍历并替换内容
for (const file of files) {
    let content = await app.vault.read(file);
    if (content.includes(oldLink)) {
        content = content.replace(new RegExp(escapeRegExp(oldLink), "g"), newLink);
        await app.vault.modify(file, content);
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 正确的转义特殊字符的正则表达式
}

tR += `✅ 已替换 ${files.length} 个文件中的链接`;
%>
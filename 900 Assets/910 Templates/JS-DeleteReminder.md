<%*
// 获取当前笔记的内容
let content = await tp.file.content;

// 定义正则表达式
const regex = /^>\s*\*[^*\n]*\*\s*(?:\s*<[^>]*>)?\s*$/gm;

// 找到所有匹配的内容
const matches = content.match(regex);

if (matches && matches.length > 0) {
    // 显示将要删除的内容
    const matchList = matches.join('\n');
    const confirmed = await tp.system.prompt(`将删除以下 ${matches.length} 行内容：\n\n${matchList}\n\n确认删除？(y/n)`);
    
    if (confirmed && confirmed.toLowerCase() === 'y') {
        // 删除匹配的内容
        const newContent = content.replace(regex, '');
        await app.vault.modify(tp.file.find_tfile(tp.file.title), newContent);
        new Notice(`已删除 ${matches.length} 行内容`);
    } else {
        new Notice("操作已取消");
    }
} else {
    new Notice("未找到匹配的内容");
}
_%>
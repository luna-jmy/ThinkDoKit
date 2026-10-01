module.exports = async (params) => {
    const { app } = params;
    
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("没有活动文档");
        return;
    }
    
    let content = await app.vault.read(activeFile);
    const regex = /^>\s*\*[^*\n]*\*\s*(?:\s*<[^>]*>)?\s*$/gm;
    const newContent = content.replace(regex, '');
    
    if (content !== newContent) {
        await app.vault.modify(activeFile, newContent);
        new Notice("内容删除完成");
    } else {
        new Notice("未找到匹配的内容");
    }
};
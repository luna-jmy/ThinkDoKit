module.exports = async (params) => {
    const { quickAddApi, app } = params;
    const { vault } = app;

    // 获取当前活动笔记
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("请先打开一个文件");
        return;
    }

    // 读取当前文件内容
    let content = await vault.read(activeFile);

    // 段落格式化：在书摘段落之间添加空行
    // 模式：在 "----" 之前添加一个空行
    content = content.replace(/\n----/g, '\n\n----');

    // 确保书摘内容后有空行
    content = content.replace(/书摘：([^\n]+)/g, '书摘：$1\n');

    // 写回文件
    await vault.modify(activeFile, content);

    new Notice("✅ 段落格式化完成");
};

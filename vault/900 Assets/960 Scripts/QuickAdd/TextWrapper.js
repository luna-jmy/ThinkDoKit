module.exports = async function(params) {
    // 获取当前活动的视图
    const activeLeaf = app.workspace.activeLeaf;
    if (!activeLeaf) {
        new Notice("没有活动的编辑器");
        return;
    }

    // 确保当前是Markdown编辑器
    if (activeLeaf.view.getViewType() !== 'markdown') {
        new Notice("当前不是Markdown编辑器");
        return;
    }

    const editor = activeLeaf.view.editor;
    if (!editor) {
        new Notice("没有编辑器");
        return;
    }
    
    // 获取选中的文本
    const selection = editor.getSelection();
    
    if (!selection) {
        new Notice("没有选中文本");
        return;
    }
    
    // 构建包裹后的文本：*==~~选定文本~~==*
    const wrappedText = ` *==~~${selection}~~==* `;
    
    // 替换选中的文本
    editor.replaceSelection(wrappedText);
};

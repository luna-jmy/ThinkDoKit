module.exports = async function(params) {
    // 获取当前活动的页面
    const activeLeaf = app.workspace.activeLeaf;
    if (!activeLeaf) {
        new Notice("没有活动的页面");
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

    // 获取光标位置
    const cursor = editor.getCursor();
    const line = cursor.line;
    const ch = cursor.ch;

    // 获取光标所在行文本
    const lineText = editor.getLine(line);
    
    // 正则表达式匹配包裹文本模式
    const regex = / \*==~~([\s\S]+?)~~==\* /g;
    
    // 查找包含光标位置的匹配项
    let match;
    while ((match = regex.exec(lineText)) !== null) {
        const start = match.index;
        const end = regex.lastIndex;
        
        // 检查光标是否在这个包裹文本范围内
        if (ch >= start && ch <= end) {
            // 选中整个包裹文本
            editor.setSelection({ line: line, ch: start }, { line: line, ch: end });
            
            // 获取选中的文本
            const selection = editor.getSelection();
            const matchCheck = selection.match(/^ \*==~~([\s\S]+?)~~==\* $/);
            
            if (matchCheck) {
                const originalText = matchCheck[1];
                editor.replaceSelection(originalText);
                new Notice("文本已还原");
                return;
            }
        }
    }

    // 如果未找到包含光标位置的包裹文本
    new Notice("未找到包含光标位置的包裹文本");
};

module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;
    
    // 获取当前文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice('请先打开一个笔记');
        return;
    }
    
    // 获取当前文件夹
    const currentFolder = activeFile.parent;
    
    // 获取同文件夹下的所有 Markdown 文件
    const folderFiles = currentFolder.children
        .filter(file => 
            file.extension === 'md' && 
            file.path !== activeFile.path // 排除当前文件
        )
        .sort((a, b) => a.name.localeCompare(b.name)); // 按名称排序
    
    if (folderFiles.length === 0) {
        new Notice('当前文件夹没有其他笔记');
        return;
    }
    
    // 读取当前笔记内容
    const content = await app.vault.read(activeFile);
    const lines = content.split('\n');
    
    // 查找 "🔗 关联笔记" 或 "Related Notes" 标记
    const markerRegex = /🔗\s*关联笔记|Related\s+Notes/i;
    let markerIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (markerRegex.test(lines[i])) {
            markerIndex = i;
            break;
        }
    }
    
    if (markerIndex === -1) {
        new Notice('未找到 "🔗 关联笔记 (Related Notes)" 标记');
        return;
    }
    
    // 生成笔记链接列表
    const linksList = folderFiles.map(file => {
        const fileName = file.basename; // 不含扩展名的文件名
        return `- [[${fileName}]]`;
    });
    
    // 检查标记下方是否已有内容
    let insertIndex = markerIndex + 1;
    
    // 跳过空行
    while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
        insertIndex++;
    }
    
    // 检查是否已存在链接（避免重复添加）
    const existingLinks = new Set();
    let hasExistingContent = false;
    
    for (let i = insertIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('-') && line.includes('[[')) {
            hasExistingContent = true;
            const match = line.match(/\[\[([^\]]+)\]\]/);
            if (match) {
                existingLinks.add(match[1]);
            }
        } else if (line && !line.startsWith('-')) {
            // 遇到非列表内容，停止检查
            break;
        }
    }
    
    // 过滤掉已存在的链接
    const newLinks = linksList.filter(link => {
        const match = link.match(/\[\[([^\]]+)\]\]/);
        return match && !existingLinks.has(match[1]);
    });
    
    if (newLinks.length === 0) {
        new Notice('所有同文件夹笔记的链接已存在');
        return;
    }
    
    // 询问用户操作方式
    let action;
    if (hasExistingContent) {
        action = await QuickAdd.suggester(
            [
                `添加 ${newLinks.length} 个新链接（保留现有链接）`,
                `替换为 ${folderFiles.length} 个链接（删除现有链接）`,
                '取消'
            ],
            ['append', 'replace', 'cancel']
        );
    } else {
        action = 'append';
    }
    
    if (!action || action === 'cancel') {
        new Notice('已取消操作');
        return;
    }
    
    // 获取编辑器
    const editor = app.workspace.activeEditor?.editor;
    if (!editor) {
        new Notice('无法获取编辑器');
        return;
    }
    
    if (action === 'replace') {
        // 替换模式：删除旧内容，插入新内容
        let deleteEnd = insertIndex;
        while (deleteEnd < lines.length && 
               (lines[deleteEnd].trim() === '' || 
                lines[deleteEnd].trim().startsWith('-'))) {
            deleteEnd++;
        }
        
        // 删除旧内容
        if (deleteEnd > insertIndex) {
            editor.replaceRange(
                '',
                { line: insertIndex, ch: 0 },
                { line: deleteEnd, ch: 0 }
            );
        }
        
        // 插入新内容
        const newContent = '\n' + linksList.join('\n') + '\n';
        editor.replaceRange(
            newContent,
            { line: markerIndex + 1, ch: 0 }
        );
        
        new Notice(`已替换为 ${folderFiles.length} 个笔记链接`);
    } else {
        // 追加模式：只添加新链接
        const insertContent = (hasExistingContent ? '' : '\n') + newLinks.join('\n') + '\n';
        
        // 找到插入位置（在现有链接之后）
        let finalInsertLine = insertIndex;
        for (let i = insertIndex; i < lines.length; i++) {
            if (lines[i].trim().startsWith('-') && lines[i].includes('[[')) {
                finalInsertLine = i + 1;
            } else if (lines[i].trim() && !lines[i].trim().startsWith('-')) {
                break;
            }
        }
        
        editor.replaceRange(
            insertContent,
            { line: finalInsertLine, ch: 0 }
        );
        
        new Notice(`已添加 ${newLinks.length} 个新笔记链接`);
    }
};
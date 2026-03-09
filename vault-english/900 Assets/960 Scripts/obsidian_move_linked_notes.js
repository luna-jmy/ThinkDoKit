module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;
    
    // 获取当前文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice('请先打开一个笔记');
        return;
    }
    
    // 获取当前文件夹路径
    const currentFolder = activeFile.parent.path;
    
    // 读取当前笔记内容
    const content = await app.vault.read(activeFile);
    
    // 提取所有 [[wiki链接]]
    const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    const matches = [...content.matchAll(linkRegex)];
    
    if (matches.length === 0) {
        new Notice('当前笔记没有关联的笔记链接');
        return;
    }
    
    // 获取所有链接的文件对象
    const linkedFiles = [];
    const notFoundLinks = [];
    
    for (const match of matches) {
        const linkText = match[1];
        const file = app.metadataCache.getFirstLinkpathDest(linkText, activeFile.path);
        
        if (file && file.path !== activeFile.path) {
            // 检查文件是否已在当前文件夹
            if (file.parent.path !== currentFolder) {
                linkedFiles.push(file);
            }
        } else if (!file) {
            notFoundLinks.push(linkText);
        }
    }
    
    if (linkedFiles.length === 0) {
        if (notFoundLinks.length > 0) {
            new Notice(`所有链接的笔记都已在当前文件夹或不存在\n未找到: ${notFoundLinks.join(', ')}`);
        } else {
            new Notice('所有链接的笔记都已在当前文件夹');
        }
        return;
    }
    
    // 显示将要移动的文件列表
    const fileList = linkedFiles.map(f => f.name).join('\n');
    const confirmed = await QuickAdd.yesNoPrompt(
        `将移动以下 ${linkedFiles.length} 个笔记到当前文件夹：\n\n${fileList}\n\n确认移动？`,
        ''
    );
    
    if (!confirmed) {
        new Notice('已取消移动');
        return;
    }
    
    // 移动文件
    let movedCount = 0;
    let errorCount = 0;
    
    for (const file of linkedFiles) {
        try {
            const newPath = `${currentFolder}/${file.name}`;
            await app.fileManager.renameFile(file, newPath);
            movedCount++;
        } catch (error) {
            console.error(`移动文件失败: ${file.name}`, error);
            errorCount++;
        }
    }
    
    if (errorCount > 0) {
        new Notice(`移动完成：成功 ${movedCount} 个，失败 ${errorCount} 个`);
    } else {
        new Notice(`成功移动 ${movedCount} 个笔记到当前文件夹`);
    }
};
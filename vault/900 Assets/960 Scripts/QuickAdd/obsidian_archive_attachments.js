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
    const assetsFolder = `${currentFolder.path}/assets`;
    
    // 获取当前文件夹下的所有 Markdown 文件
    const markdownFiles = currentFolder.children.filter(file => file.extension === 'md');
    
    if (markdownFiles.length === 0) {
        new Notice('当前文件夹没有笔记');
        return;
    }
    
    // 收集所有笔记中引用的附件
    const attachmentSet = new Set();
    const attachmentRegex = /!\[\[([^\]]+)\]\]|!\[.*?\]\(([^)]+)\)/g;
    
    for (const mdFile of markdownFiles) {
        const content = await app.vault.read(mdFile);
        const matches = [...content.matchAll(attachmentRegex)];
        
        for (const match of matches) {
            // match[1] 是 ![[附件]] 格式，match[2] 是 ![](附件) 格式
            const attachmentPath = match[1] || match[2];
            if (attachmentPath) {
                // 解析附件路径（可能包含 | 符号和尺寸信息）
                const cleanPath = attachmentPath.split('|')[0].trim();
                attachmentSet.add(cleanPath);
            }
        }
    }
    
    if (attachmentSet.size === 0) {
        new Notice('当前文件夹的笔记没有引用任何附件');
        return;
    }
    
    // 查找附件文件
    const attachmentsToMove = [];
    const notFoundAttachments = [];
    
    for (const attachmentPath of attachmentSet) {
        // 尝试解析附件路径
        const file = app.metadataCache.getFirstLinkpathDest(attachmentPath, currentFolder.path);
        
        if (file) {
            // 检查文件是否已经在 assets 文件夹中
            if (!file.path.startsWith(assetsFolder)) {
                attachmentsToMove.push({
                    file: file,
                    originalPath: file.path,
                    name: file.name
                });
            }
        } else {
            notFoundAttachments.push(attachmentPath);
        }
    }
    
    if (attachmentsToMove.length === 0) {
        if (notFoundAttachments.length > 0) {
            new Notice(`所有附件都已在 assets 文件夹或找不到\n未找到: ${notFoundAttachments.slice(0, 3).join(', ')}${notFoundAttachments.length > 3 ? '...' : ''}`);
        } else {
            new Notice('所有附件都已在 assets 文件夹');
        }
        return;
    }
    
    // 显示将要移动的附件列表
    const fileList = attachmentsToMove.slice(0, 10).map(a => a.name).join('\n');
    const moreText = attachmentsToMove.length > 10 ? `\n...还有 ${attachmentsToMove.length - 10} 个附件` : '';
    
    const confirmed = await QuickAdd.yesNoPrompt(
        `将移动以下 ${attachmentsToMove.length} 个附件到 assets 文件夹：\n\n${fileList}${moreText}\n\n确认移动？`,
        '链接会自动更新'
    );
    
    if (!confirmed) {
        new Notice('已取消移动');
        return;
    }
    
    // 创建 assets 文件夹（如果不存在）
    try {
        const assetsFolderExists = app.vault.getAbstractFileByPath(assetsFolder);
        if (!assetsFolderExists) {
            await app.vault.createFolder(assetsFolder);
        }
    } catch (error) {
        console.error('创建 assets 文件夹失败:', error);
        new Notice('创建 assets 文件夹失败');
        return;
    }
    
    // 移动附件
    let movedCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const attachment of attachmentsToMove) {
        try {
            const newPath = `${assetsFolder}/${attachment.name}`;
            
            // 检查目标位置是否已存在同名文件
            const existingFile = app.vault.getAbstractFileByPath(newPath);
            if (existingFile && existingFile.path !== attachment.file.path) {
                // 如果存在同名文件，添加序号
                const nameParts = attachment.name.split('.');
                const ext = nameParts.pop();
                const baseName = nameParts.join('.');
                let counter = 1;
                let uniquePath = newPath;
                
                while (app.vault.getAbstractFileByPath(uniquePath)) {
                    uniquePath = `${assetsFolder}/${baseName}_${counter}.${ext}`;
                    counter++;
                }
                
                await app.fileManager.renameFile(attachment.file, uniquePath);
            } else {
                await app.fileManager.renameFile(attachment.file, newPath);
            }
            
            movedCount++;
        } catch (error) {
            console.error(`移动附件失败: ${attachment.name}`, error);
            errorCount++;
            errors.push(attachment.name);
        }
    }
    
    // 显示结果
    if (errorCount > 0) {
        new Notice(`归档完成：成功 ${movedCount} 个，失败 ${errorCount} 个\n失败: ${errors.slice(0, 3).join(', ')}`);
    } else {
        new Notice(`成功归档 ${movedCount} 个附件到 assets 文件夹\nObsidian 会自动更新所有笔记中的链接`);
    }
    
    if (notFoundAttachments.length > 0) {
        console.log('未找到的附件:', notFoundAttachments);
    }
};
module.exports = async (params) => {
    const { app, quickAddApi } = params;
    const { vault } = app;
    
    // 默认根目录
    const defaultRootPath = "900 Assets/990 Attachments";
    
    // 弹窗确认根目录
    const rootPath = await quickAddApi.inputPrompt(
        "清理空文件夹", 
        "请输入要清理的根目录路径:", 
        defaultRootPath
    );
    
    // 如果用户取消了输入，退出
    if (!rootPath) {
        new Notice("操作已取消");
        return;
    }
    
    // 检查根目录是否存在
    try {
        const folderExists = await vault.adapter.exists(rootPath);
        if (!folderExists) {
            new Notice(`错误: 目录 "${rootPath}" 不存在`);
            return;
        }
        
        const folderStat = await vault.adapter.stat(rootPath);
        if (folderStat.type !== 'folder') {
            new Notice(`错误: "${rootPath}" 不是一个文件夹`);
            return;
        }
    } catch (error) {
        new Notice(`错误: 无法访问目录 "${rootPath}"`);
        return;
    }
    
    // 获取所有空文件夹
    const emptyFolders = await findEmptyFolders(vault, rootPath);
    
    if (emptyFolders.length === 0) {
        new Notice("未找到空文件夹");
        return;
    }
    
    // 显示找到的空文件夹并确认删除
    const folderList = emptyFolders.map(folder => `• ${folder}`).join('\n');
    const confirmMessage = `找到 ${emptyFolders.length} 个空文件夹:\n\n${folderList}\n\n确定要删除这些空文件夹吗？`;
    
    const confirmed = await quickAddApi.yesNoPrompt(
        "确认删除", 
        confirmMessage
    );
    
    if (!confirmed) {
        new Notice("操作已取消");
        return;
    }
    
    // 删除空文件夹
    let deletedCount = 0;
    const errors = [];
    
    // 按路径长度倒序排列，确保先删除子文件夹
    emptyFolders.sort((a, b) => b.length - a.length);
    
    for (const folderPath of emptyFolders) {
        try {
            await vault.adapter.rmdir(folderPath, false);
            deletedCount++;
            console.log(`已删除空文件夹: ${folderPath}`);
        } catch (error) {
            errors.push(`删除 "${folderPath}" 失败: ${error.message}`);
            console.error(`删除文件夹失败: ${folderPath}`, error);
        }
    }
    
    // 显示结果
    if (deletedCount > 0) {
        new Notice(`成功删除 ${deletedCount} 个空文件夹`);
    }
    
    if (errors.length > 0) {
        new Notice(`删除过程中遇到 ${errors.length} 个错误，请查看控制台`);
        console.error("删除空文件夹时的错误:", errors);
    }
};

/**
 * 递归查找空文件夹
 * @param {Vault} vault - Obsidian vault 实例
 * @param {string} rootPath - 根目录路径
 * @returns {Promise<string[]>} 空文件夹路径数组
 */
async function findEmptyFolders(vault, rootPath) {
    const emptyFolders = [];
    
    /**
     * 递归检查文件夹是否为空
     * @param {string} folderPath - 文件夹路径
     * @returns {Promise<boolean>} 是否为空文件夹
     */
    async function isFolderEmpty(folderPath) {
        try {
            const folderContents = await vault.adapter.list(folderPath);
            
            // 如果没有文件和文件夹，则为空
            if (folderContents.files.length === 0 && folderContents.folders.length === 0) {
                return true;
            }
            
            // 如果只有文件夹，检查所有子文件夹是否都为空
            if (folderContents.files.length === 0 && folderContents.folders.length > 0) {
                for (const subFolder of folderContents.folders) {
                    if (!(await isFolderEmpty(subFolder))) {
                        return false;
                    }
                }
                return true;
            }
            
            return false;
        } catch (error) {
            console.error(`检查文件夹 "${folderPath}" 时出错:`, error);
            return false;
        }
    }
    
    /**
     * 递归遍历文件夹
     * @param {string} currentPath - 当前路径
     */
    async function traverseFolder(currentPath) {
        try {
            const folderContents = await vault.adapter.list(currentPath);
            
            // 递归处理子文件夹
            for (const subFolder of folderContents.folders) {
                await traverseFolder(subFolder);
            }
            
            // 检查当前文件夹是否为空（在处理完子文件夹后）
            if (await isFolderEmpty(currentPath)) {
                emptyFolders.push(currentPath);
            }
        } catch (error) {
            console.error(`遍历文件夹 "${currentPath}" 时出错:`, error);
        }
    }
    
    await traverseFolder(rootPath);
    return emptyFolders;
}
module.exports = async (params) => {
    const { quickAddApi: { yesNoPrompt }, app } = params;
    
    try {
        // 获取所有markdown文件
        const files = app.vault.getMarkdownFiles();
        const filesToDelete = [];
        
        // 遍历所有文件，检查frontmatter中的type属性
        for (const file of files) {
            try {
                // 读取文件内容
                const content = await app.vault.read(file);
                
                // 解析frontmatter
                const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
                
                // 检查type属性是否为demo
                if (frontmatter && frontmatter.type === 'demo') {
                    filesToDelete.push(file);
                }
            } catch (error) {
                console.error(`读取文件 ${file.path} 时出错:`, error);
            }
        }
        
        // 如果没有找到符合条件的文件
        if (filesToDelete.length === 0) {
            new Notice('没有找到type为demo的笔记');
            return;
        }
        
        // 显示确认对话框
        const fileList = filesToDelete.map(f => `- ${f.basename}`).join('\n');
        const confirmMessage = `找到 ${filesToDelete.length} 个type为demo的笔记:\n\n${fileList}\n\n确定要删除这些笔记吗？`;
        
        const shouldDelete = await yesNoPrompt(
            '确认删除',
            confirmMessage
        );
        
        if (!shouldDelete) {
            new Notice('操作已取消');
            return;
        }
        
        // 删除文件
        let deletedCount = 0;
        let errorCount = 0;
        
        for (const file of filesToDelete) {
            try {
                await app.vault.delete(file);
                deletedCount++;
                console.log(`已删除: ${file.path}`);
            } catch (error) {
                errorCount++;
                console.error(`删除文件 ${file.path} 时出错:`, error);
            }
        }
        
        // 显示结果
        if (errorCount === 0) {
            new Notice(`成功删除 ${deletedCount} 个笔记`);
        } else {
            new Notice(`删除完成: ${deletedCount} 个成功, ${errorCount} 个失败`);
        }
        
    } catch (error) {
        console.error('脚本执行出错:', error);
        new Notice('删除操作失败，请查看控制台了解详情');
    }
};
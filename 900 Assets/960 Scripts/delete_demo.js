module.exports = async (params) => {
    const { quickAddApi: { yesNoPrompt }, app } = params;

    try {
        // 获取所有markdown文件
        const allFiles = app.vault.getMarkdownFiles();

        // 安全边界1: 过滤掉 900 Assets 文件夹中的文件
        const files = allFiles.filter(file => !file.path.startsWith('900 Assets/'));

        // 安全边界2: 检查非 900 Assets 文件夹的笔记总数
        if (files.length > 100) {
            new Notice('⚠️ 笔记总数过多，为避免误删和UI冻结问题，禁止使用此脚本。', 5000);
            console.warn(`安全限制: 非 900 Assets 文件夹包含 ${files.length} 个笔记，超出安全阈值 (100)`);
            return;
        }

        // 记录扫描的文件数量用于调试
        console.log(`安全检查通过: 扫描 ${files.length} 个文件 (已排除 900 Assets 文件夹)`);

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
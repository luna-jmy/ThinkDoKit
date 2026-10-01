module.exports = async (params) => {
    const { quickAddApi: { inputPrompt }, app } = params;
    
    // 获取当前活动文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("请先打开一个笔记文件");
        return;
    }
    
    // 读取文件内容
    const content = await app.vault.read(activeFile);
    
    // 转换多层标签的函数
    function convertMultiLevelTags(text) {
        // 匹配所有标签的正则表达式
        const tagRegex = /#([^\s#]+)/g;
        
        return text.replace(tagRegex, (match, tagContent) => {
            // 检查是否包含斜杠（多层标签）
            if (tagContent.includes('/')) {
                const parts = tagContent.split('/');
                let result = '';
                
                // 处理多层标签
                for (let i = 0; i < parts.length - 1; i++) {
                    const key = parts[i];
                    const value = parts[i + 1];
                    result += `[${key}::${value}] `;
                }
                
                return result.trim();
            } else {
                // 单层标签保持不变
                return match;
            }
        });
    }
    
    // 转换内容
    const convertedContent = convertMultiLevelTags(content);
    
    // 如果内容有变化，则写回文件
    if (convertedContent !== content) {
        await app.vault.modify(activeFile, convertedContent);
        new Notice("标签转换完成！");
    } else {
        new Notice("没有找到需要转换的多层标签");
    }
};
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
    
    // 清理特殊符号的函数
    function cleanSpecialChars(text) {
        // 移除或替换特殊符号，保留字母、数字、中文和常用符号
        return text.replace(/[@#$%^&*()+=\[\]{}|\\:";'<>?,./`~!]/g, '').trim();
    }
    
    // 转换元数据为标签的函数
    function convertMetadataToTags(text) {
        // 匹配所有元数据的正则表达式 [key::value]
        const metadataRegex = /\[([^:\]]+)::([^\]]+)\]/g;
        
        return text.replace(metadataRegex, (match, key, value) => {
            // 清理 key 和 value 中的特殊符号
            const cleanedKey = cleanSpecialChars(key.trim());
            const cleanedValue = cleanSpecialChars(value.trim());
            
            // 如果清理后为空，则保持原样
            if (!cleanedKey || !cleanedValue) {
                return match;
            }
            
            // 将元数据转换为标签格式
            return `#${cleanedKey}/${cleanedValue}`;
        });
    }
    
    // 转换内容
    const convertedContent = convertMetadataToTags(content);
    
    // 如果内容有变化，则写回文件
    if (convertedContent !== content) {
        await app.vault.modify(activeFile, convertedContent);
        new Notice("元数据转标签完成！");
    } else {
        new Notice("没有找到需要转换的元数据");
    }
};
module.exports = async (params) => {
    const { app, quickAddApi } = params;
    
    // 弹出对话框让用户输入要删除的标签
    const tagToRemove = await quickAddApi.inputPrompt(
        "删除标签",
        "请输入要删除的标签名称（不需要包含#）："
    );
    
    // 如果用户取消输入或输入为空，则退出
    if (!tagToRemove || tagToRemove.trim() === "") {
        new Notice("操作已取消");
        return;
    }
    
    // 确保标签名称不包含 # 符号
    const cleanTag = tagToRemove.replace(/^#+/, '').trim();
    
    // 二次确认对话框
    const confirmation = await quickAddApi.yesNoPrompt(
        "确认删除",
        `确定要从全库删除标签 "${cleanTag}" 吗？\n将同时删除正文中的 #${cleanTag} 和 YAML 中的标签。\n此操作无法撤销。`
    );
    
    if (!confirmation) {
        new Notice("操作已取消");
        return;
    }
    
    // 获取所有文件
    const files = app.vault.getMarkdownFiles();
    let modifiedCount = 0;
    let errorCount = 0;
    
    // 显示进度提示
    new Notice(`开始处理 ${files.length} 个文件...`);
    
    // 遍历所有文件
    for (const file of files) {
        try {
            // 读取文件内容
            const originalContent = await app.vault.read(file);
            let newContent = originalContent;
            let hasChanges = false;
            
            // 1. 处理正文中的 #标签 格式（只删除标签，不改变其他格式）
            const tagRegex = new RegExp(`#${cleanTag}(?![\\w-])`, 'g');
            const afterTagRemoval = newContent.replace(tagRegex, '');
            if (afterTagRemoval !== newContent) {
                newContent = afterTagRemoval;
                hasChanges = true;
            }
            
            // 2. 处理 YAML 中的标签（使用最简单的字符串替换）
            
            // 处理数组格式中的标签: tags: [tag1, "target", tag2] -> tags: [tag1, tag2]
            const arrayTagRegex = new RegExp(`(tags:\\s*\\[)([^\\]]*?)\\b["']?${cleanTag}["']?\\s*,?\\s*([^\\]]*)`, 'g');
            const afterArrayTagRemoval = newContent.replace(arrayTagRegex, (match, prefix, before, after) => {
                // 清理前后的逗号
                let cleanBefore = before.replace(/,\s*$/, '').trim();
                let cleanAfter = after.replace(/^\s*,/, '').trim();
                
                // 重新组合
                let result = prefix;
                if (cleanBefore && cleanAfter) {
                    result += cleanBefore + ', ' + cleanAfter;
                } else if (cleanBefore) {
                    result += cleanBefore;
                } else if (cleanAfter) {
                    result += cleanAfter;
                }
                result += ']';
                return result;
            });
            
            if (afterArrayTagRemoval !== newContent) {
                newContent = afterArrayTagRemoval;
                hasChanges = true;
            }
            
            // 处理列表格式中的标签项: "  - target" -> 删除整行
            const listTagRegex = new RegExp(`^\\s*-\\s+["']?${cleanTag}["']?\\s*$`, 'gm');
            const afterListTagRemoval = newContent.replace(listTagRegex, '');
            if (afterListTagRemoval !== newContent) {
                newContent = afterListTagRemoval;
                hasChanges = true;
            }
            
            // 处理单个标签格式: "tag: target" -> 删除整行
            const singleTagRegex = new RegExp(`^tag:\\s*["']?${cleanTag}["']?\\s*$`, 'gm');
            const afterSingleTagRemoval = newContent.replace(singleTagRegex, '');
            if (afterSingleTagRemoval !== newContent) {
                newContent = afterSingleTagRemoval;
                hasChanges = true;
            }
            
            // 只有在真正有变化时才保存
            if (hasChanges && newContent !== originalContent) {
                await app.vault.modify(file, newContent);
                modifiedCount++;
            }
            
        } catch (error) {
            console.error(`处理文件 ${file.path} 时出错:`, error);
            errorCount++;
        }
    }
    
    // 显示结果
    if (modifiedCount > 0) {
        new Notice(
            `成功删除标签 "${cleanTag}"！\n` +
            `修改了 ${modifiedCount} 个文件` +
            (errorCount > 0 ? `，${errorCount} 个文件处理失败` : '')
        );
    } else {
        new Notice(`未找到标签 "${cleanTag}"`);
    }
    
    // 刷新标签面板（安全方式）
    try {
        const tagLeaves = app.workspace.getLeavesOfType('tag');
        if (tagLeaves && tagLeaves.length > 0) {
            const tagView = tagLeaves[0].view;
            if (tagView && typeof tagView.refresh === 'function') {
                tagView.refresh();
            }
        }
    } catch (error) {
        // 忽略刷新错误
    }
};
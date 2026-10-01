module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester }, app } = params;
    
    // 从 app 获取 Notice 构造函数，使用防御性编程
    const Notice = app.plugins.plugins.quickadd?.api?.Notice || 
                   window.Notice || 
                   class Notice { constructor(msg) { console.log(msg); } };
    
    // 定义基础归档路径
    const baseArchivePath = "400 Archive/420 日志归档";
    const journalBasePath = "500 Journal"; // 日志源文件夹路径
    
    // 弹窗提示用户输入要归档的年份
    const year = await inputPrompt("请输入要归档的年份（如2024）：", new Date().getFullYear().toString());
    if (!year) {
        new Notice("已取消操作");
        return;
    }
    
    // 验证年份格式
    const yearRegex = /^20\d{2}$/;
    if (!yearRegex.test(year)) {
        new Notice("年份格式不正确，请使用YYYY格式（如2023）");
        return;
    }
    
    // 创建年份目录路径（完整路径）
    const yearFolderPath = `${baseArchivePath}/${year}`;
    
    try {
        // 创建基础归档目录（如果不存在）
        try {
            await app.vault.createFolder(baseArchivePath);
        } catch (err) {
            // 忽略"文件夹已存在"错误
            if (!err.message.includes("already exists")) {
                console.error("创建基础归档目录时出错:", err);
                new Notice(`创建基础归档目录时出错: ${err.message}`);
                return;
            }
        }
        
        // 创建年份目录（如果不存在）
        try {
            await app.vault.createFolder(yearFolderPath);
            new Notice(`已创建年份文件夹：${year}`);
        } catch (err) {
            // 忽略"文件夹已存在"错误
            if (!err.message.includes("already exists")) {
                console.error("创建年份目录时出错:", err);
                new Notice(`创建年份目录时出错: ${err.message}`);
                return;
            }
        }
    } catch (err) {
        console.error("创建目录时出错:", err);
        new Notice(`创建目录时出错: ${err.message}`);
        return;
    }
    
    // 定义日志文件的正则表达式模式（改进版）
    const logPatterns = [
        // 日日志格式：YYYY-MM-DD 或 YYYY-MM-DD开头（后面可能跟任意内容）
        { regex: new RegExp(`^${year}-\\d{2}-\\d{2}.*\\.md$`), type: "日日志" },
        // 月日志格式：YYYY-MM 或 YYYY-MM开头（后面可能跟任意内容）
        { regex: new RegExp(`^${year}-\\d{2}.*\\.md$`), type: "月日志" },
        // 周日志格式：YYYY-WW 或 YYYY-W 或带后缀
        { regex: new RegExp(`^${year}-W\\d{1,2}.*\\.md$`, "i"), type: "周日志" },
        // 季度日志格式：YYYY-Q1/Q2/Q3/Q4 或带后缀
        { regex: new RegExp(`^${year}-Q[1-4].*\\.md$`, "i"), type: "季度日志" },
        // 年度日志格式：YYYY.md 或 YYYY开头带任意后缀
        { regex: new RegExp(`^${year}(?!-\\d).*\\.md$`), type: "年度日志" }
    ];
    
    // 获取所有文件并筛选匹配的日志文件
    const allFiles = app.vault.getFiles();
    const matchedFiles = allFiles.filter(file => {
        // 只处理 500 Journal 文件夹下的文件（包括子文件夹）
        if (!file.path.startsWith(`${journalBasePath}/`)) {
            return false;
        }
        
        // 排除已经在归档文件夹内的文件
        if (file.path.startsWith(`${baseArchivePath}/`)) {
            return false;
        }
        
        // 检查文件名是否匹配任何日志格式
        const match = logPatterns.some(pattern => pattern.regex.test(file.name));
        
        // 调试信息：打印每个文件和匹配结果
        if (file.name.includes(year)) {
            console.log(`检查文件: ${file.name} (路径: ${file.path}) - 匹配: ${match}`);
        }
        
        return match;
    });
    
    if (matchedFiles.length === 0) {
        new Notice(`未找到${year}年的日志文件`);
        return;
    }
    
    // 显示将要移动的文件列表供用户确认
    const fileList = matchedFiles.map(f => f.name).join('\n');
    console.log(`将要移动的文件：\n${fileList}`);
    
    // 显示将要移动的文件数量
    new Notice(`准备移动 ${matchedFiles.length} 个日志文件和附件到 ${yearFolderPath} 文件夹`);
    
    // 移动文件到年份文件夹
    let movedFiles = [];
    let failedFiles = [];
    
    for (const file of matchedFiles) {
        try {
            const newPath = `${yearFolderPath}/${file.name}`;
            
            // 检查目标位置是否已有同名文件
            const existingFile = app.vault.getAbstractFileByPath(newPath);
            if (existingFile) {
                // 如果文件已存在，添加到失败列表并跳过
                failedFiles.push(`${file.name}（目标位置已存在同名文件）`);
                continue;
            }
            
            // 移动文件
            await app.vault.rename(file, newPath);
            
            // 添加到已移动文件列表，以便后续处理附件
            const movedFile = app.vault.getAbstractFileByPath(newPath);
            if (movedFile) {
                movedFiles.push(movedFile);
            }
        } catch (err) {
            console.error(`移动文件 ${file.name} 时出错:`, err);
            failedFiles.push(`${file.name}（${err.message}）`);
        }
    }
    
    // 显示移动日志文件的结果
    let moveMessage = `✅ 已将 ${movedFiles.length} 个日志文件归档到 ${yearFolderPath} 文件夹`;
    if (failedFiles.length > 0) {
        moveMessage += `\n⚠️ ${failedFiles.length} 个文件移动失败：\n${failedFiles.join('\n')}`;
    }
    new Notice(moveMessage);
    
    // 如果没有成功移动的文件，则不处理附件
    if (movedFiles.length === 0) {
        return;
    }
    
    // ===== 附件处理部分 =====
    
    // 创建年份目录下的Attachment文件夹
    const attachmentFolderPath = `${yearFolderPath}/Attachment`;
    try {
        await app.vault.createFolder(attachmentFolderPath);
        new Notice(`已创建附件文件夹：${yearFolderPath}/Attachment`);
    } catch (err) {
        // 忽略"文件夹已存在"错误
        if (!err.message.includes("already exists")) {
            console.error("创建附件目录时出错:", err);
            new Notice(`创建附件目录时出错: ${err.message}`);
            return;
        }
    }
    
    // 获取Obsidian设置的附件文件夹路径（用于调试）
    const attachmentFolderConfig = app.vault.getConfig("attachmentFolderPath");
    console.log("Obsidian附件配置:", attachmentFolderConfig);
    
    // 收集所有需要移动的附件
    const attachmentsToMove = [];
    const processedPaths = new Set(); // 用于去重
    
    // 附件文件扩展名集合
    const attachmentExtensions = new Set([
        "png", "jpg", "jpeg", "gif", "webp", "svg", "pdf", 
        "mp3", "wav", "m4a", "ogg",
        "mp4", "mov", "avi", "webm",
        "zip", "rar", "7z", "tar", "gz",
        "doc", "docx", "xls", "xlsx", "ppt", "pptx"
    ]);
    
    // 遍历所有已移动的日志文件，找出其中的附件链接
    for (const file of movedFiles) {
        console.log(`正在处理文件: ${file.path}`);
        const cache = app.metadataCache.getFileCache(file);
        const links = cache?.links || [];
        const embeds = cache?.embeds || [];
        
        // 合并links和embeds以处理所有类型的链接
        const allLinks = [...links, ...embeds];

        for (const linkObj of allLinks) {
            const link = linkObj.link;
            // 检查链接是否是附件类型
            const extension = link.split('.').pop()?.toLowerCase();
            if (extension && attachmentExtensions.has(extension)) {
                
                // 使用metadataCache.getFirstLinkpathDest来解析链接路径
                const linkedFile = app.metadataCache.getFirstLinkpathDest(link, file.path);

                if (linkedFile && linkedFile.extension) {
                    // 使用 Set 去重，避免重复处理同一个附件
                    if (!processedPaths.has(linkedFile.path)) {
                        processedPaths.add(linkedFile.path);
                        attachmentsToMove.push({
                            from: linkedFile,
                            originalLinkText: link,
                            noteFiles: [file],
                        });
                        console.log(`找到附件: ${linkedFile.path} (来自笔记: ${file.path})`);
                    } else {
                        // 如果附件已经在列表中，添加笔记到引用列表
                        const existing = attachmentsToMove.find(item => item.from.path === linkedFile.path);
                        if (existing && !existing.noteFiles.includes(file)) {
                            existing.noteFiles.push(file);
                        }
                    }
                }
            }
        }
    }
    
    console.log(`总共需要移动 ${attachmentsToMove.length} 个附件。`);
    
    if (attachmentsToMove.length === 0) {
        new Notice("在这些日志文件中没有找到需要移动的附件。");
    } else {
        new Notice(`准备移动 ${attachmentsToMove.length} 个附件到 ${attachmentFolderPath}`);
        
        // 移动附件并更新笔记中的链接
        let attachmentSuccessCount = 0;
        for (const { from, originalLinkText, noteFiles } of attachmentsToMove) {
            
            // 处理可能的文件名冲突
            let newAttachmentName = from.name;
            let counter = 1;
            while (app.vault.getAbstractFileByPath(`${attachmentFolderPath}/${newAttachmentName}`)) {
                const nameParts = from.name.split('.');
                const ext = nameParts.length > 1 ? nameParts.pop() : '';
                const baseName = nameParts.join('.');
                newAttachmentName = `${baseName}_${counter}.${ext}`;
                counter++;
            }
            
            const newAttachmentPath = `${attachmentFolderPath}/${newAttachmentName}`;
            // 使用相对路径更新链接
            const newLinkText = `Attachment/${newAttachmentName}`;
            
            try {
                console.log(`正在移动附件: ${from.path} -> ${newAttachmentPath}`);
                
                // 先更新所有笔记中的链接，再移动文件
                for (const noteFile of noteFiles) {
                    let content = await app.vault.read(noteFile);
                    
                    // 构建更精确的正则表达式来匹配链接
                    // 匹配 [[link]] 或 [[link|alias]] 或 ![[link]] 或 ![[link|alias]]
                    const escapedLink = escapeRegExp(originalLinkText);
                    const linkRegex = new RegExp(
                        `(!?\\[\\[)${escapedLink}(\\|[^\\]]+)?(\\]\\])`,
                        'g'
                    );
                    
                    const newContent = content.replace(linkRegex, (match, prefix, alias, suffix) => {
                        return `${prefix}${newLinkText}${alias || ''}${suffix}`;
                    });

                    if (newContent !== content) {
                        await app.vault.modify(noteFile, newContent);
                        console.log(`更新笔记: ${noteFile.path}`);
                    }
                }
                
                // 移动附件文件
                await app.vault.rename(from, newAttachmentPath);
                
                attachmentSuccessCount++;
                console.log(`成功移动并更新链接: ${from.name}`);
            } catch (error) {
                console.error(`处理附件 ${from.name} 失败:`, error);
                new Notice(`处理附件 ${from.name} 失败: ${error.message}`);
            }
        }
        
        // 显示附件移动结果
        const attachmentMessage = `✅ 成功移动了 ${attachmentSuccessCount} 个附件到 ${attachmentFolderPath}`;
        new Notice(attachmentMessage);
    }
    
    // 可选：打开年份文件夹
    const showFolder = await suggester(
        ["打开年份文件夹", "完成"],
        ["打开年份文件夹", "完成"]
    );
    
    if (showFolder === "打开年份文件夹") {
        try {
            const folder = app.vault.getAbstractFileByPath(yearFolderPath);
            if (folder) {
                await app.workspace.getLeaf().openFile(folder);
            } else {
                new Notice(`找不到文件夹：${yearFolderPath}`);
            }
        } catch (err) {
            new Notice(`打开文件夹时出错：${err.message}`);
        }
    }
};

// 辅助函数：转义正则表达式中的特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

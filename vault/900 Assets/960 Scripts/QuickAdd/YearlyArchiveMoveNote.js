module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester }, app } = params;
    
    // 定义基础归档路径
    const baseArchivePath = "400 Archive/420 日志归档";
    
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
    
    // 定义日志源文件夹路径
    const journalBasePath = "500 Journal";
    
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
        return logPatterns.some(pattern => pattern.regex.test(file.name));
    });
    
    if (matchedFiles.length === 0) {
        new Notice(`未找到${year}年的日志文件`);
        return;
    }
    
    // 显示将要移动的文件列表供用户确认
    const fileList = matchedFiles.map(f => f.name).join('\n');
    console.log(`将要移动的文件：\n${fileList}`);
    
    // 显示将要移动的文件数量
    new Notice(`准备移动 ${matchedFiles.length} 个文件到 ${yearFolderPath} 文件夹`);
    
    // 移动文件到年份文件夹
    let movedCount = 0;
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
            movedCount++;
        } catch (err) {
            console.error(`移动文件 ${file.name} 时出错:`, err);
            failedFiles.push(`${file.name}（${err.message}）`);
        }
    }
    
    // 显示归档结果
    let message = `✅ 已将 ${movedCount} 个日志文件归档到 ${yearFolderPath} 文件夹`;
    if (failedFiles.length > 0) {
        message += `\n⚠️ ${failedFiles.length} 个文件移动失败：\n${failedFiles.join('\n')}`;
    }
    new Notice(message);
    
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
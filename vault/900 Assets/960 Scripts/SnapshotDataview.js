// SnapshotDataview.js - 将当前笔记中的 Dataview 查询固化为静态 Markdown
// 使用：在 QuickAdd 中配置此宏，在需要快照的笔记中运行

module.exports = async (params) => {
    const { app, quickAddApi: { suggester } } = params;

    // 获取当前活跃文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("❌ 请先打开一个笔记文件");
        return;
    }

    try {
        // 读取当前文件内容
        let content = await app.vault.read(activeFile);

        // 检查是否有 Dataview 代码块
        const hasDataview = content.includes('```dataview') || content.includes('```dataviewjs');

        if (!hasDataview) {
            new Notice("ℹ️ 当前笔记中没有 Dataview 查询块");
            return;
        }

        // 询问处理方式
        const options = [
            {
                label: "📋 复制快照到剪贴板",
                value: "copy",
                description: "将快照内容复制到剪贴板，不修改原文件"
            },
            {
                label: "✏️ 替换当前文件内容",
                value: "replace",
                description: "用快照内容替换当前文件的 Dataview 查询"
            },
            {
                label: "📄 创建新的快照文件",
                value: "new",
                description: "创建一个新文件保存快照内容"
            }
        ];

        const selectedOption = await suggester(
            options.map(opt => opt.label),
            options
        );

        if (!selectedOption) {
            new Notice("已取消操作");
            return;
        }

        // 生成快照内容
        const snapshotContent = await generateSnapshot(content, app);

        if (!snapshotContent) {
            new Notice("❌ 生成快照失败");
            return;
        }

        // 根据用户选择处理
        if (selectedOption.value === "copy") {
            await navigator.clipboard.writeText(snapshotContent);
            new Notice("📋 快照已复制到剪贴板");
        } else if (selectedOption.value === "replace") {
            await app.vault.modify(activeFile, snapshotContent);
            new Notice("✅ 文件已替换为快照内容");
        } else if (selectedOption.value === "new") {
            // 生成新文件名
            const originalName = activeFile.basename;
            const timestamp = moment().format("YYYYMMDD-HHmmss");
            const newPath = `${activeFile.parent.path}/${originalName}-快照-${timestamp}.md`;

            // 创建新文件
            const newFile = await app.vault.create(newPath, snapshotContent);

            // 打开新文件
            await app.workspace.openLinkText(newFile.path, "", true);
            new Notice(`📄 已创建快照文件: ${newFile.name}`);
        }

    } catch (error) {
        console.error('生成快照时出错:', error);
        new Notice(`❌ 生成快照时出错: ${error.message}`);
    }
};

// 生成快照内容
async function generateSnapshot(content, app) {
    const DataviewAPI = app.plugins.plugins.dataview?.api;
    if (!DataviewAPI) {
        throw new Error("Dataview 插件未启用或未找到 API");
    }

    // 处理 Dataview 查询块（DQL）
    content = content.replace(/```dataview\n([\s\S]*?)```/g, async (match, query) => {
        try {
            // 执行查询
            const result = await DataviewAPI.query(query);

            if (!result || result.successful === false) {
                return `\n> ⚠️ 查询失败: ${result?.error || '未知错误'}\n\n${query}\n`;
            }

            // 转换为 Markdown 表格
            return queryResultToMarkdown(result.value);
        } catch (error) {
            return `\n> ⚠️ 查询出错: ${error.message}\n\n${query}\n`;
        }
    });

    // 处理 DataviewJS 代码块
    content = content.replace(/```dataviewjs\n([\s\S]*?)```/g, (match, code) => {
        // DataviewJS 通常会产生 DOM 输出，无法直接转换为静态 Markdown
        // 这里保留原代码并添加注释
        return `\n> 📝 DataviewJS 代码（需要手动运行或截图）\n${match}\n`;
    });

    // 处理内联 Dataview 查询
    content = content.replace(/\`=dv\.el\(".*?",\s*"(.*?)"\)/g, (match, type, text) => {
        return text;
    });

    content = content.replace(/\`=dv\.el\(".*?",\s*`.*?\]/g, (match) => {
        return match; // 保留复杂的内联表达式
    });

    // 执行所有异步替换
    for (let i = 0; i < 10; i++) { // 最多处理10轮
        const newContent = await Promise.resolve(content);
        if (newContent === content) break;
        content = newContent;
    }

    return content;
}

// 将 Dataview 查询结果转换为 Markdown 表格
function queryResultToMarkdown(result) {
    if (!result) return "";

    // 处理不同类型的查询结果
    if (result.type === "table") {
        return resultToTable(result);
    } else if (result.type === "list") {
        return resultToList(result);
    } else if (result.type === "taskList") {
        return resultToTaskList(result);
    } else {
        return `\n> ℹ️ 不支持的查询类型: ${result.type}\n`;
    }
}

// 表格类型结果
function resultToTable(result) {
    if (!result.headers || result.headers.length === 0) return "";
    if (!result.values || result.values.length === 0) {
        return "> 📭 查询结果为空\n";
    }

    let markdown = "\n";

    // 表头
    markdown += "| " + result.headers.join(" | ") + " |\n";
    markdown += "|" + result.headers.map(() => "---").join("|") + "|\n";

    // 数据行
    for (const row of result.values) {
        const formattedRow = row.map(cell => formatCell(cell));
        markdown += "| " + formattedRow.join(" | ") + " |\n";
    }

    return markdown + "\n";
}

// 列表类型结果
function resultToList(result) {
    if (!result.values || result.values.length === 0) {
        return "> 📭 查询结果为空\n";
    }

    let markdown = "\n";

    for (const item of result.values) {
        const formatted = formatCell(item);
        markdown += `- ${formatted}\n`;
    }

    return markdown + "\n";
}

// 任务列表类型结果
function resultToTaskList(result) {
    if (!result.values || result.values.length === 0) {
        return "> 📭 查询结果为空\n";
    }

    let markdown = "\n";

    for (const task of result.values) {
        const checkbox = task.completed ? "- [x]" : "- [ ]";
        const text = task.text || "";
        markdown += `${checkbox} ${text}\n`;
    }

    return markdown + "\n";
}

// 格式化单元格内容
function formatCell(cell) {
    if (cell === null || cell === undefined) return "";

    // 处理链接对象
    if (typeof cell === "object" && cell.path) {
        const display = cell.display || cell.path;
        return `[[${cell.path}|${display}]]`;
    }

    // 处理日期对象
    if (cell instanceof Date) {
        return moment(cell).format("YYYY-MM-DD");
    }

    // 处理数组
    if (Array.isArray(cell)) {
        return cell.map(item => formatCell(item)).join(", ");
    }

    // 处理对象
    if (typeof cell === "object") {
        return JSON.stringify(cell);
    }

    return String(cell);
}

// Tab任务视图 - 可点击checkbox更新原始笔记

// Tab 逻辑与文件夹过滤
const tabs = [
    { name: "000 Inbox", folder: "000 Inbox" },
    { name: "100 Projects", folder: "100 Projects", blocked: true },
    { name: "200 Areas", folder: "200 Areas" },
    { name: "300 Resources", folder: "300 Resources" },
    { name: "400 Archive", folder: "400 Archive" },
    { name: "500 Journal", folder: "500 Journal" },
    { name: "600 Zettelkasten", folder: "600 Zettelkasten" }
];

// 核心数据抓取：排除 900 Assets
const originalPages = dv.pages().where(p => !p.file.path.includes("900 Assets"));
let allTasks = [];

// 展平任务数组
for (const page of originalPages) {
    const tasks = page.file.tasks;
    if (tasks) {
        allTasks = [...allTasks, ...tasks];
    }
}

// 统计卡片渲染
const stats = [
    { label: "Vault Todo", count: allTasks.filter(t => !t.completed && t.status === " " && !t.text.includes("#exclude")).length },
    { label: "Postponed", count: allTasks.filter(t => t.status === ">" && !t.text.includes("#exclude")).length },
    { label: "Information", count: allTasks.filter(t => ["i","n","!"].includes(t.status) && !t.text.includes("#exclude")).length },
    { label: "Cancelled", count: allTasks.filter(t => ["/","-"].includes(t.status) && !t.text.includes("#exclude")).length },
    { label: "Vault Done", count: allTasks.filter(t => (t.completed || ["x","X"].includes(t.status)) && !t.text.includes("#exclude")).length }
];

const statsHtml = `<div class="custom-stat-cards" style="display:grid; grid-template-columns:repeat(5,1fr); gap:10px; text-align:center; margin-bottom:20px;">`
    + stats.map(s => `<div style="background:var(--background-secondary); padding:10px; border-radius:8px; border:1px solid var(--background-modifier-border)">
        <div style="font-size:0.75em; color:var(--text-muted); text-transform:uppercase;">${s.label}</div>
        <div style="font-size:1.6em; font-weight:bold; color:#4eb06d">${s.count}</div>
    </div>`).join("") + `</div>`;
dv.el("div", statsHtml, { raw: true });

// 创建主容器
const mainContainer = dv.el("div", "", { cls: "tab-group-container" });

// 创建 Tab 按钮栏
const tabBar = dv.el("div", "", { cls: "tab-button-bar", container: mainContainer });

// 创建内容区域容器
const contentContainer = dv.el("div", "", { cls: "tab-content-container", container: mainContainer });

// 当前激活的 tab
let activeTab = null;

// 辅助函数：转义正则表达式特殊字符
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 辅助函数：重新加载所有任务
function reloadAllTasks() {
    const pages = dv.pages().where(p => !p.file.path.includes("900 Assets"));
    const tasks = [];
    for (const page of pages) {
        const pageTasks = page.file.tasks;
        if (pageTasks) {
            tasks.push(...pageTasks);
        }
    }
    allTasks = tasks;
}

// 点击checkbox更新原始笔记
async function toggleTask(checkbox, task) {
    const isCompleted = checkbox.checked;
    const filePath = task.path;

    try {
        // 读取原始文件内容
        const file = app.vault.getAbstractFileByPath(filePath);
        const content = await app.vault.read(file);

        // 查找任务行 - 使用更精确的匹配
        const lines = content.split('\n');
        let taskFound = false;
        let updatedContent = '';
        const escapedTaskText = escapeRegex(task.text);

        // 根据checkbox的状态更新
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // 检查是否是任务行
            // 匹配格式：- [ ] 任务文本 或 - [x] 任务文本
            const taskRegex = new RegExp(`^(\\s*)-\\s*\\[([ xX>])\\]\\s*${escapedTaskText}`);
            const match = line.match(taskRegex);

            if (match) {
                const indent = match[1];
                const currentStatus = match[2];
                const newStatus = isCompleted ? 'x' : ' ';

                // 更新任务状态
                updatedContent += `${indent}- [${newStatus}] ${task.text}`;
                taskFound = true;
            } else {
                updatedContent += line;
            }

            if (i < lines.length - 1) {
                updatedContent += '\n';
            }
        }

        if (taskFound) {
            // 保存文件
            await app.vault.modify(file, updatedContent);

            // 显示成功提示
            new Notice(isCompleted ? "✅ 任务已完成" : "⬜️ 任务已恢复", 2000);

            // 延迟刷新（等待文件同步）
            setTimeout(async () => {
                // 重新加载任务数据
                reloadAllTasks();

                // 遍历所有tab内容，找到当前激活的（display: block）
                const allTabContents = document.querySelectorAll('.tab-content');
                let activeTabContent = null;
                let activeTabName = null;

                allTabContents.forEach(content => {
                    if (content.style.display === 'block') {
                        activeTabContent = content;
                        activeTabName = content.getAttribute('data-tab');
                    }
                });

                if (!activeTabContent) {
                    console.error('未找到激活的tab内容');
                    return;
                }

                if (!activeTabName) {
                    console.error('未找到tab名称');
                    return;
                }

                // 找到对应的tab对象
                const targetTab = tabs.find(t => t.name === activeTabName);
                if (!targetTab) {
                    console.error('未找到tab对象:', activeTabName);
                    return;
                }

                console.log('准备刷新tab任务列表:', targetTab.name);

                // 只清空任务列表容器，不破坏tab结构
                const taskListContainer = activeTabContent.querySelector('.task-list-container');
                if (!taskListContainer) {
                    console.error('未找到任务列表容器');
                    return;
                }

                // 清空任务列表
                taskListContainer.innerHTML = '';

                // 重新渲染任务
                renderTasksForTab(targetTab, activeTabContent);
            }, 500);
        } else {
            new Notice("⚠️ 未找到任务行，请检查任务文本", 3000);
        }
    } catch (error) {
        console.error('更新任务失败:', error);
        new Notice(`❌ 更新任务失败: ${error.message}`, 3000);
    }
}

function renderTasksForTab(tab, container) {
    // 在容器内创建一个任务列表容器（单独管理）
    let taskListContainer = container.querySelector('.task-list-container');
    if (!taskListContainer) {
        taskListContainer = dv.el("div", "", {
            container: container,
            cls: "task-list-container"
        });
    }

    // 清空任务容器（只清空任务，不破坏tab结构）
    taskListContainer.innerHTML = '';

    // 过滤任务
    const tasks = allTasks.filter(t => {
        const path = t.path;
        const inFolder = path.includes(`${tab.folder}/`) ||
                       path.includes(`${tab.folder}\\`) ||
                       path.startsWith(tab.folder);

        return inFolder &&
               !t.completed &&
               t.status === " " &&
               !t.text.includes("#exclude");
    });

    if (tasks.length === 0) {
        taskListContainer.innerHTML = `<p style="color:var(--text-muted); padding:20px;">该目录下没有待办任务</p>`;
        return;
    }

    // 按文件分组
    const tasksByFile = {};
    tasks.forEach(task => {
        if (!tasksByFile[task.path]) {
            tasksByFile[task.path] = [];
        }
        tasksByFile[task.path].push(task);
    });

    // 渲染每个文件的任务
    for (const [filePath, fileTasks] of Object.entries(tasksByFile)) {
        const fileName = filePath.split(/[/\\]/).pop().replace(".md", "");
        const fileLink = `[[${filePath}|📁 ${fileName}]]`;

        // 文件标题
        const fileHeader = dv.el("div", "", { container: taskListContainer });
        fileHeader.style.cssText = `
            margin-top: 15px;
            margin-bottom: 10px;
            padding: 8px;
            background: var(--background-secondary);
            border-radius: 4px;
            font-weight: bold;
        `;
        dv.el("span", fileLink, { container: fileHeader });
        dv.el("span", ` (${fileTasks.length})`, { container: fileHeader });

        // 任务列表
        const taskList = dv.el("div", "", { container: taskListContainer });
        taskList.style.cssText = "margin-left: 20px;";

        fileTasks.forEach(task => {
            const taskItem = dv.el("div", "", { container: taskList });
            taskItem.style.cssText = "margin: 5px 0; display: flex; align-items: flex-start;";

            const checkbox = dv.el("input", "", { container: taskItem });
            checkbox.type = "checkbox";
            checkbox.style.cssText = "margin-right: 8px; margin-top: 4px; cursor: pointer;";

            // 添加点击事件
            checkbox.addEventListener("change", () => {
                toggleTask(checkbox, task);
            });

            const taskText = dv.el("span", task.text, { container: taskItem });
            taskText.style.cssText = "color: var(--text-normal); flex: 1;";

            // 添加backlink
            const backlink = dv.el("span", "", { container: taskItem });
            backlink.style.cssText = "margin-left: 10px; font-size: 0.85em; color: var(--text-muted); white-space: nowrap;";
            dv.el("a", `[[${filePath}|📄]]`, { container: backlink });
        });
    }

    // 标记为已渲染
    container.setAttribute('data-rendered', 'true');
}

// 创建Tab按钮和内容区
tabs.forEach((tab, index) => {
    // 创建Tab按钮
    const tabButton = dv.el("button", tab.name, {
        container: tabBar,
        cls: "tab-button"
    });

    // 创建Tab内容区
    const tabContent = dv.el("div", "", {
        container: contentContainer,
        cls: "tab-content"
    });
    tabContent.setAttribute('data-tab', tab.name);

    // 点击事件
    tabButton.addEventListener("click", () => {
        // 隐藏所有内容
        contentContainer.querySelectorAll(".tab-content").forEach(c => {
            c.style.display = "none";
        });
        // 重置所有按钮样式
        tabBar.querySelectorAll(".tab-button").forEach(b => {
            b.style.background = "var(--background-secondary)";
            b.style.color = "var(--text-normal)";
            b.style.fontWeight = "normal";
            b.style.borderBottom = "none";
        });

        // 显示当前内容
        tabContent.style.display = "block";
        // 激活按钮样式
        tabButton.style.background = "var(--background-primary)";
        tabButton.style.color = "var(--interactive-accent)";
        tabButton.style.fontWeight = "bold";
        tabButton.style.borderBottom = "2px solid var(--interactive-accent)";

        activeTab = tab;

        // 渲染任务（如果还没渲染过）
        if (tabContent.getAttribute('data-rendered') !== 'true') {
            renderTasksForTab(tab, tabContent);
        }
    });

    // 默认激活第一个tab
    if (index === 0) {
        setTimeout(() => tabButton.click(), 100);
    }
});

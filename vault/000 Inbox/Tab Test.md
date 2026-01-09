---
cssclasses:
obsidianUIMode: preview
---


```dataviewjs
// 1. 核心数据抓取：排除 900 Assets
const allTasks = dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks;

// 2. 统计卡片渲染
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

// 3. Tab 逻辑与文件夹过滤
const tabs = [
    { name: "000 Inbox", folder: "000 Inbox" },
    { name: "100 Projects", folder: "100 Projects", blocked: true },
    { name: "200 Areas", folder: "200 Areas" },
    { name: "300 Resources", folder: "300 Resources" },
    { name: "400 Archive", folder: "400 Archive" },
    { name: "500 Journal", folder: "500 Journal" },
    { name: "600 Zettelkasten", folder: "600 Zettelkasten" }
];

// 创建主容器
const mainContainer = dv.el("div", "", { cls: "tab-group-container" });

// 创建 Tab 按钮栏 - 支持换行
const tabBar = dv.el("div", "", { cls: "tab-button-bar", container: mainContainer });
tabBar.style.cssText = "display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 0;";

// 创建内容区域容器
const contentContainer = dv.el("div", "", { cls: "tab-content-container", container: mainContainer });
contentContainer.style.cssText = "";

// 当前激活的 tab
let activeTab = null;

tabs.forEach((tab, index) => {
    // 创建 Tab 按钮
    const tabButton = dv.el("button", tab.name, {
        container: tabBar,
        cls: "tab-button"
    });

    tabButton.style.cssText = `
        padding: 8px 16px;
        cursor: pointer;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        border-bottom: none;
        border-radius: 6px 6px 0 0;
        font-size: 0.9em;
        transition: all 0.2s ease;
    `;
    
    // 创建 Tab 内容区
    const tabContent = dv.el("div", "", {
        container: contentContainer,
        cls: "tab-content"
    });
    tabContent.style.cssText = `
        display: none;
        padding: 20px 10px;
        border: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
    `;

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
        tabButton.style.borderBottom = "2px solid var(--background-primary)";

        activeTab = tab;

        // 渲染任务（如果还没渲染过）
        if (!tabContent.getAttribute("data-rendered")) {
            renderTasksForTab(tab, tabContent);
            tabContent.setAttribute("data-rendered", "true");
        }
    });

    // 默认激活第一个 tab
    if (index === 0) {
        setTimeout(() => tabButton.click(), 100);
    }
});

function renderTasksForTab(tab, container) {
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
        container.innerHTML = `<p style="color:var(--text-muted); padding: 20px;">该目录下没有待办任务</p>`;
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
        const fileLink = `[[${filePath}|📄 ${fileName}]]`;

        // 文件标题
        const fileHeader = dv.el("div", "", { container: container });
        fileHeader.style.cssText = `
            margin-top: 15px;
            margin-bottom: 10px;
            padding: 8px;
            background: var(--background-secondary);
            border-radius: 4px;
            font-weight: bold;
        `;
        dv.el("span", `📁 ${fileLink} (${fileTasks.length})`, { container: fileHeader });

        // 任务列表
        const taskList = dv.el("div", "", { container: container });
        taskList.style.cssText = "margin-left: 20px;";

        fileTasks.forEach(task => {
            const taskItem = dv.el("div", "", { container: taskList });
            taskItem.style.cssText = "margin: 5px 0;";

            const checkbox = dv.el("input", "", { container: taskItem });
            checkbox.type = "checkbox";
            checkbox.style.cssText = "margin-right: 8px;";

            const taskText = dv.el("span", task.text, { container: taskItem });
            taskText.style.cssText = "color: var(--text-normal);";
        });
    }
}
```

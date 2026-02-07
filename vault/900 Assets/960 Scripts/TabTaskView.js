// 参数验证
if (!input || !input.tabs || !Array.isArray(input.tabs)) {
    dv.el("div", "错误: 缺少 tabs 参数", {
        style: "color: red; padding: 10px;"
    });
    return;
}

const tabs = input.tabs;

// 核心数据抓取：排除 900 Assets
const allTasks = dv.pages()
    .where(p => !p.file.path.includes("900 Assets"))
    .file.tasks;

// 创建主容器
const mainContainer = dv.el("div", "", { cls: "tab-group-container" });

// 创建 Tab 按钮栏 - 支持换行
const tabBar = dv.el("div", "", { cls: "tab-button-bar", container: mainContainer });
tabBar.style.cssText = "display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 0;";

// 创建内容区域容器
const contentContainer = dv.el("div", "", { cls: "tab-content-container", container: mainContainer });
contentContainer.style.cssText = "width: 100%; max-width: 100%;";

// 当前激活的 tab
let activeTab = null;

// 存储日历容器引用
const calendarContainers = new Map();

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
        overflow-x: auto;
        overflow-y: visible;
        max-width: 100%;
        width: 100%;
        box-sizing: border-box;
    `;

    // 如果是日历视图，保存引用
    if (tab.type === "calendar") {
        calendarContainers.set(tab.calendar, tabContent);
    }

    // 点击事件
    tabButton.addEventListener("click", async () => {
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
            await renderTasksForTab(tab, tabContent);
            tabContent.setAttribute("data-rendered", "true");
        }
    });

    // 默认激活第一个 tab
    if (index === 0) {
        setTimeout(() => tabButton.click(), 100);
    }
});

/**
 * 渲染指定 Tab 的任务
 */
async function renderTasksForTab(tab, container) {
    // 如果是日历视图类型
    if (tab.type === "calendar") {
        await renderCalendarView(tab, container);
        return;
    }

    // 否则渲染任务列表视图
    renderTaskListView(tab, container);

    // 添加点击监听，在任务状态变化后立即刷新
    setupTaskClickHandler(tab, container);
}

/**
 * 渲染日历视图
 */
async function renderCalendarView(tab, container) {
    const calendarType = tab.calendar || "weeklyCalendar";

    // 清空容器
    container.innerHTML = "";

    // 根据日历类型创建参数
    let calendarParams = {};

    switch (calendarType) {
        case "workdayCalendar":
            calendarParams = {
                pages: "dv.pages().file.tasks.where(t => !t.tags.includes('#exclude'))",
                view: "week",
                firstDayOfWeek: "1",
                options: "style11 filter noProcess"
            };
            break;
        case "weeklyCalendar":
            calendarParams = {
                pages: "dv.pages().file.tasks.where(t => !t.tags.includes('#exclude'))",
                view: "week",
                firstDayOfWeek: "1",
                options: "style9 filter noProcess"
            };
            break;
        case "monthlyCalendar":
            calendarParams = {
                pages: "dv.pages().file.tasks.where(t => !t.tags.includes('#exclude'))",
                view: "month",
                firstDayOfWeek: "1",
                options: "style9 filter noProcess"
            };
            break;
        default:
            container.innerHTML = `<p style="color: red; padding: 20px;">未知的日历类型: ${calendarType}</p>`;
            return;
    }

    try {
        // 直接调用 tasksCalendar view
        const originalContainer = dv.container;
        const beforeCount = originalContainer.children.length;

        // 调用日历视图
        await dv.view("tasksCalendar", calendarParams);

        // 等待渲染完成
        await new Promise(resolve => setTimeout(resolve, 100));

        // 获取新添加的元素（日历内容）
        const newElements = [];
        for (let i = beforeCount; i < originalContainer.children.length; i++) {
            newElements.push(originalContainer.children[i]);
        }

        // 将新元素移动到我们的容器中
        newElements.forEach(el => {
            container.appendChild(el);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: red; padding: 20px;">日历视图加载失败: ${error.message}</p>`;
    }
}

/**
 * 设置任务点击处理器 - 在复选框点击后立即刷新
 */
function setupTaskClickHandler(tab, container) {
    // 使用事件委托监听容器内的点击
    container.addEventListener("click", (event) => {
        // 检查点击的是否是复选框
        const checkbox = event.target.closest('input[type="checkbox"]');
        if (checkbox) {
            // 复选框被点击了，延迟 300ms 让文件更新完成
            setTimeout(() => {
                // 清空容器并重新渲染
                renderTaskListView(tab, container);
            }, 300);
        }
    });
}

/**
 * 渲染任务列表视图 - 使用 Markdown 渲染以支持 Tasks 插件图标
 */
async function renderTaskListView(tab, container) {
    // 清空容器内容，防止重复渲染
    container.innerHTML = "";

    // 获取状态筛选配置
    const statusFilter = tab.status !== undefined ? tab.status : " ";

    console.log(`TabTaskView: 筛选状态 = "${statusFilter}" (类型: ${typeof statusFilter})`);

    // 过滤任务
    const tasks = allTasks.filter(t => {
        const path = t.path;

        // 检查路径是否包含目标文件夹
        let inFolder = true;
        if (tab.folder && tab.folder !== "") {
            inFolder = path.includes(`${tab.folder}/`) ||
                      path.includes(`${tab.folder}\\`) ||
                      path.startsWith(tab.folder);
        }

        // 排除标记的任务
        const notExcluded = !t.text.includes("#exclude");

        // 状态筛选逻辑
        let statusMatch = false;

        if (Array.isArray(statusFilter)) {
            statusMatch = statusFilter.some(s => t.status === s);
        } else {
            switch (statusFilter) {
                case " ":
                    statusMatch = !t.completed && t.status === " ";
                    break;
                case ">":
                    statusMatch = t.status === ">";
                    break;
                case "completed":
                case "x":
                case "X":
                    statusMatch = t.completed || t.status === "x" || t.status === "X";
                    break;
                case "cancelled":
                case "/":
                case "-":
                    statusMatch = t.status === "/" || t.status === "-";
                    break;
                case "information":
                case "i":
                case "n":
                case "!":
                    statusMatch = t.status === "i" || t.status === "!" || t.status === "n";
                    break;
                default:
                    statusMatch = t.status === statusFilter;
            }
        }

        return inFolder && notExcluded && statusMatch;
    });

    if (tasks.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); padding: 20px;">该目录下没有匹配的任务</p>`;
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
        // 创建任务列表容器（不创建文件标题，让 dv.taskList 自己处理分组）
        const taskListWrapper = dv.el("div", "", { container: container });
        taskListWrapper.style.cssText = `
            margin-top: 15px;
            max-width: 100%;
            overflow-x: auto;
            word-wrap: break-word;
            overflow-wrap: break-word;
        `;

        // 临时切换容器到 taskListWrapper，让 dv.taskList() 渲染到正确位置
        const originalContainer = dv.container;
        const beforeCount = dv.container.children.length;
        dv.container = taskListWrapper;

        // 使用 dv.taskList() 渲染任务 - 这样复选框会自动同步到原始文件
        // 不设置 hideFilePath 和 groupByFile，让它使用默认的文件分组显示
        dv.taskList(fileTasks);

        // 恢复原始容器
        dv.container = originalContainer;

        // 等待渲染完成，然后将任务移动到正确容器（处理模式切换问题）
        setTimeout(() => {
            // 检查是否有新增元素被添加到了原始容器
            const newElements = [];
            for (let i = beforeCount; i < originalContainer.children.length; i++) {
                newElements.push(originalContainer.children[i]);
            }

            // 将这些元素移动到 taskListWrapper
            newElements.forEach(el => {
                if (el) {
                    taskListWrapper.appendChild(el);
                }
            });
        }, 50);
    }
}
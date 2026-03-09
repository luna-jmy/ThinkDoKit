const currentPage = dv.current();

// 辅助函数：将 Date 对象转换为本地日期字符串 (YYYY-MM-DD)
function toLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 默认配置
let config = {
    maxNotes: 5,
    status: "hide",
    area: null,
    search: "",
    areaFilter: null,  // 新增：用于交互式 area 筛选
    dateRange: "all"   // 新增：用于日期范围筛选
};

// 收集所有可用的 area 值
const allProjectFiles = dv.pages('"100 Projects"').where(p => p.type === "project");
const availableAreas = new Set();
allProjectFiles.forEach(p => {
    if (p.area) {
        const areas = Array.isArray(p.area) ? p.area : [p.area];
        areas.forEach(a => availableAreas.add(a));
    }
});
const sortedAreas = Array.from(availableAreas).sort();

// 处理输入参数（保留向后兼容）
if (input !== undefined) {
    config.maxNotes = input.maxNotes !== undefined ? input.maxNotes : config.maxNotes;
    config.status = input.status !== undefined ? input.status : config.status;
    config.area = input.area !== undefined ? input.area : config.area;
}

// 通过识别当前笔记元数据传参（如果未使用交互式筛选）
if (currentPage.filter === "include" && !config.areaFilter) {
    config.areaFilter = "include";
    config.area = "include";
} else if (currentPage.filter === "exclude" && !config.areaFilter) {
    config.areaFilter = "exclude";
    config.area = "exclude";
}

if (currentPage.status && !config.statusOverride) {
    config.status = currentPage.status;
}

let filterStart = currentPage.start_date || null;
let filterEnd = currentPage.due_date || null;
const currentNoteArea = currentPage.area;

// 标记当前笔记是否设置了日期范围
const hasExplicitDateRange = filterStart || filterEnd;

// 设置默认日期范围（1年前到1年后）- 仅用于交互式筛选器的初始值
let defaultFilterStart, defaultFilterEnd;
if (!filterStart) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    defaultFilterStart = dv.date(toLocalDateString(oneYearAgo));
} else {
    defaultFilterStart = dv.date(filterStart);
}
if (!filterEnd) {
    const now = new Date();
    const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    defaultFilterEnd = dv.date(toLocalDateString(oneYearLater));
} else {
    defaultFilterEnd = dv.date(filterEnd);
}

// 用于筛选的实际值
const effectiveFilterStart = filterStart ? dv.date(filterStart) : null;
const effectiveFilterEnd = filterEnd ? dv.date(filterEnd) : null;

// 创建筛选控制面板
function createFilterBar(container) {
    // 初始化日期范围（只在第一次）
    if (!config.filterStart || !config.filterEnd) {
        config.filterStart = defaultFilterStart;
        config.filterEnd = defaultFilterEnd;
    }

    const filterBar = container.createEl("div", {
        attr: {
            style: "display: flex; flex-wrap: wrap; gap: 12px; padding: 15px; background: var(--background-secondary); border-radius: 8px; margin-bottom: 20px; align-items: center;"
        }
    });

    // 状态筛选
    const statusGroup = filterBar.createEl("div", {
        attr: { style: "display: flex; align-items: center; gap: 8px;" }
    });
    statusGroup.createEl("label", {
        attr: { style: "font-size: 0.9em; color: var(--text-muted);" }
    }).textContent = "状态:";

    const statusSelect = statusGroup.createEl("select", {
        attr: {
            style: "padding: 6px 10px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; cursor: pointer;"
        }
    });

    const statusOptions = [
        { value: 'hide', label: '🚫 隐藏已完成' },
        { value: 'completed', label: '✅ 仅显示已完成' },
        { value: 'all', label: '📋 显示全部' }
    ];

    statusOptions.forEach(opt => {
        const option = statusSelect.createEl("option", { value: opt.value });
        option.textContent = opt.label;
        if ((opt.value === 'all' && config.status === 'all') ||
            (opt.value === config.status)) {
            option.selected = true;
        }
    });

    statusSelect.onchange = (e) => {
        config.status = e.target.value;
        renderProjects(contentContainer);
    };

    // Area 筛选
    const areaGroup = filterBar.createEl("div", {
        attr: { style: "display: flex; align-items: center; gap: 8px;" }
    });
    areaGroup.createEl("label", {
        attr: { style: "font-size: 0.9em; color: var(--text-muted);" }
    }).textContent = "领域:";

    const areaSelect = areaGroup.createEl("select", {
        attr: {
            style: "padding: 6px 10px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; cursor: pointer; min-width: 120px;"
        }
    });

    const areaOptions = [
        { value: '', label: '全部领域' },
        { value: 'include', label: '✨ 仅显示当前领域' },
        { value: 'exclude', label: '🚫 排除当前领域' }
    ];

    areaOptions.forEach(opt => {
        const option = areaSelect.createEl("option", { value: opt.value });
        option.textContent = opt.label;
        // 选中逻辑：全部领域（空值）或匹配当前值
        if ((opt.value === '' && !config.area && !config.areaFilter) ||
            (config.area === opt.value) ||
            (config.areaFilter === opt.value)) {
            option.selected = true;
        }
    });

    areaSelect.onchange = (e) => {
        const val = e.target.value;
        config.areaFilter = val;
        config.area = val || null;
        renderProjects(contentContainer);
    };

    // 搜索框
    const searchGroup = filterBar.createEl("div", {
        attr: { style: "display: flex; align-items: center; gap: 8px;" }
    });
    searchGroup.createEl("label", {
        attr: { style: "font-size: 0.9em; color: var(--text-muted);" }
    }).textContent = "搜索:";

    const searchInput = searchGroup.createEl("input", {
        attr: {
            type: "text",
            placeholder: "搜索项目名称...",
            style: "padding: 6px 10px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; width: 180px;"
        }
    });

    if (config.search) {
        searchInput.value = config.search;
    }

    // 搜索框：按回车或失去焦点时触发
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            config.search = e.target.value.toLowerCase();
            renderProjects(contentContainer);
        }
    });

    searchInput.addEventListener('blur', (e) => {
        config.search = e.target.value.toLowerCase();
        renderProjects(contentContainer);
    });

    // 日期范围筛选
    const dateGroup = filterBar.createEl("div", {
        attr: { style: "display: flex; align-items: center; gap: 8px;" }
    });
    dateGroup.createEl("label", {
        attr: { style: "font-size: 0.9em; color: var(--text-muted);" }
    }).textContent = "日期:";

    const dateRangeSelect = dateGroup.createEl("select", {
        attr: {
            style: "padding: 6px 10px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-normal); font-size: 0.9em; cursor: pointer;"
        }
    });

    const dateOptions = [
        { value: 'all', label: '全部时间' },
        { value: 'week', label: '本周' },
        { value: 'month', label: '本月' },
        { value: 'quarter', label: '本季度' },
        { value: 'year', label: '本年' }
    ];

    dateOptions.forEach(opt => {
        const option = dateRangeSelect.createEl("option", { value: opt.value });
        option.textContent = opt.label;
        if (opt.value === config.dateRange) option.selected = true;
    });

    dateRangeSelect.onchange = (e) => {
        config.dateRange = e.target.value;
        const now = new Date();

        console.log(`日期筛选变更: ${config.dateRange}`);
        console.log(`  当前时间: ${now.toISOString()}`);

        switch(config.dateRange) {
            case 'week':
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                config.filterStart = dv.date(toLocalDateString(weekStart));
                config.filterEnd = dv.date(toLocalDateString(weekEnd));
                console.log(`  设置为本周: ${config.filterStart.toISO()} - ${config.filterEnd.toISO()}`);
                break;
            case 'month':
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                config.filterStart = dv.date(toLocalDateString(monthStart));
                config.filterEnd = dv.date(toLocalDateString(monthEnd));
                console.log(`  设置为本月: ${config.filterStart.toISO()} - ${config.filterEnd.toISO()}`);
                break;
            case 'quarter':
                const quarter = Math.floor(now.getMonth() / 3);
                const quarterStart = new Date(now.getFullYear(), quarter * 3, 1);
                const quarterEnd = new Date(now.getFullYear(), (quarter + 1) * 3, 1);
                quarterEnd.setDate(quarterEnd.getDate() - 1);
                config.filterStart = dv.date(toLocalDateString(quarterStart));
                config.filterEnd = dv.date(toLocalDateString(quarterEnd));
                console.log(`  设置为本季度: ${config.filterStart.toISO()} - ${config.filterEnd.toISO()}`);
                break;
            case 'year':
                const yearStart = new Date(now.getFullYear(), 0, 1);
                const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
                yearEnd.setDate(yearEnd.getDate() - 1);
                config.filterStart = dv.date(toLocalDateString(yearStart));
                config.filterEnd = dv.date(toLocalDateString(yearEnd));
                console.log(`  设置为本年: ${config.filterStart.toISO()} - ${config.filterEnd.toISO()}`);
                break;
            default:
                const allStart = new Date();
                allStart.setFullYear(allStart.getFullYear() - 1);
                const allEnd = new Date();
                allEnd.setFullYear(allEnd.getFullYear() + 1);
                config.filterStart = dv.date(toLocalDateString(allStart));
                config.filterEnd = dv.date(toLocalDateString(allEnd));
                console.log(`  设置为全部时间: ${config.filterStart.toISO()} - ${config.filterEnd.toISO()}`);
        }
        renderProjects(contentContainer);
    };
}

// 渲染快速项目列表
function renderQuickProjectList(projectFiles, title, containerEl) {
    const filteredProjectFiles = projectFiles.filter(projectFile => {
        const status = projectFile.status || "";
        const projectArea = projectFile.area || null;
        const projectName = projectFile.file.name.toLowerCase();

        // 搜索筛选
        if (config.search && !projectName.includes(config.search)) {
            return false;
        }

        // status 筛选
        const completedStatuses = ["completed", "完成", "done", "archived", "归档", "cancelled", "取消"];
        const isCompleted = completedStatuses.includes(status);

        if (config.status === "hide") {
            if (isCompleted) return false;
        } else if (config.status === "completed") {
            if (!isCompleted) return false;
        }

        // area 筛选
        if (config.area) {
            const projectAreas = projectArea ? (Array.isArray(projectArea) ? projectArea : [projectArea]) : [];

            // 只支持 include/exclude 模式
            if (config.area === "include" || config.area === "exclude") {
                if (!currentNoteArea || currentNoteArea.length === 0) {
                    // 当前笔记没有 area，跳过筛选
                } else {
                    const filterValue = Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea];
                    const hasMatch = projectAreas.some(pa => filterValue.includes(pa));

                    if (config.area === "include" && !hasMatch) return false;
                    if (config.area === "exclude" && hasMatch) return false;
                }
            }
        }

        // 日期筛选 - 快速项目也需要根据当前笔记日期范围筛选
        // 如果是长期项目（long-term: true），跳过日期筛选
        if (projectFile["long-term"] === true) {
            return true;
        }

        const startDate = projectFile.start_date;
        const endDate = projectFile.due_date || projectFile.end_date;

        // 如果当前笔记没有设置任何日期范围，显示全部项目
        if (!hasExplicitDateRange) {
            return true;
        }

        // 将日期转换为 DateTime 对象进行比较
        let startDateObj = null;
        let endDateObj = null;

        if (startDate) {
            startDateObj = dv.date(startDate);
        }
        if (endDate) {
            endDateObj = dv.date(endDate);
        }

        // 如果当前笔记只有 start_date 没有 due_date
        if (effectiveFilterStart && !effectiveFilterEnd) {
            const filterStartTime = effectiveFilterStart.toMillis();
            // 显示所有 start_date >= filterStart 的项目
            if (startDateObj) {
                return startDateObj.toMillis() >= filterStartTime;
            } else if (endDateObj) {
                return endDateObj.toMillis() >= filterStartTime;
            }
            return true;
        }
        // 如果当前笔记有完整的日期范围（start_date 和 due_date 都有）
        else if (effectiveFilterStart && effectiveFilterEnd) {
            const filterStartTime = effectiveFilterStart.toMillis();
            const filterEndTime = effectiveFilterEnd.toMillis();

            if (startDateObj && endDateObj) {
                const startTime = startDateObj.toMillis();
                const endTime = endDateObj.toMillis();
                return (startTime <= filterEndTime && endTime >= filterStartTime);
            } else if (startDateObj) {
                const startTime = startDateObj.toMillis();
                return (startTime >= filterStartTime && startTime <= filterEndTime);
            } else if (endDateObj) {
                const endTime = endDateObj.toMillis();
                return (endTime >= filterStartTime && endTime <= filterEndTime);
            }
            return true;
        }
        // 如果当前笔记只有 due_date 没有 start_date
        else if (!effectiveFilterStart && effectiveFilterEnd) {
            const filterEndTime = effectiveFilterEnd.toMillis();
            // 显示所有 end_date <= filterEnd 或 start_date <= filterEnd 的项目
            if (startDateObj) {
                return startDateObj.toMillis() <= filterEndTime;
            } else if (endDateObj) {
                return endDateObj.toMillis() <= filterEndTime;
            }
            return true;
        }

        return true;
    });

    if (filteredProjectFiles.length === 0) {
        return 0;
    }

    const card = containerEl.createEl("div", {
        cls: "project-card quick-project-card",
        attr: { style: "border-left: 3px solid var(--interactive-accent); height: 100%;" }
    });

    const titleWrapper = card.createEl("div", {
        attr: { style: "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;" }
    });

    const titleEl = titleWrapper.createEl("h3", {
        attr: { style: "margin: 0; font-size: 1em;" }
    });
    titleEl.textContent = `⚡ ${title}`;

    const countBadge = titleWrapper.createEl("span", {
        cls: "project-status",
        attr: { style: "margin: 0; background: rgba(100, 150, 255, 0.2);" }
    });
    countBadge.textContent = `${filteredProjectFiles.length}`;

    const listDiv = card.createEl("div", { cls: "project-notes" });
    const ul = listDiv.createEl("ul", {
        attr: { style: "margin: 0;" }
    });

    filteredProjectFiles.forEach(projectFile => {
        const li = ul.createEl("li", {
            attr: { style: "display: flex; justify-content: space-between; align-items: center; padding: 4px 0;" }
        });

        const linkWrapper = li.createEl("div", {
            attr: { style: "flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" }
        });

        const link = linkWrapper.createEl("a", {
            cls: "internal-link",
            href: projectFile.file.path
        });
        link.textContent = projectFile.file.name;

        const metaWrapper = li.createEl("div", {
            attr: { style: "display: flex; gap: 5px; align-items: center; flex-shrink: 0;" }
        });

        const status = projectFile.status;
        if (status) {
            const statusBadge = metaWrapper.createEl("span", {
                cls: "project-status",
                attr: { style: "margin: 0; font-size: 0.85em; padding: 2px 6px;" }
            });
            const statusMap = {
                "inbox": "📥", "draft": "✏️", "active": "🚀",
                "on-hold": "⏸️", "completed": "✅", "cancelled": "❌", "archived": "📦",
                "未开始/待启动": "📥", "起草/构思中": "✏️", "执行中": "🚀",
                "暂停": "⏸️", "完成": "✅", "取消": "❌", "归档": "📦"
            };
            statusBadge.textContent = statusMap[status] || status;
        }

        const endDate = projectFile.due_date || projectFile.end_date;
        if (endDate) {
            const dateSpan = metaWrapper.createEl("span", {
                attr: { style: "color: var(--text-muted); font-size: 0.85em; white-space: nowrap;" }
            });
            dateSpan.textContent = dv.date(endDate).toFormat("MM-dd");
        }
    });

    return filteredProjectFiles.length;
}

// 渲染正常项目卡片
function renderNormalProjectCard(folderPath, projectFiles, allProjectFiles, allNotesInFolder, containerEl) {
    const hasMultipleProjects = allProjectFiles.length > 1;
    const hasExplicitMainProject = allProjectFiles.some(p => p["main-project"] === true);
    const projectFile = projectFiles[0];

    let projectName, startDate, endDate, status, priority, progress, projectArea;

    projectName = projectFile.file.name;
    startDate = projectFile.start_date || "";
    endDate = projectFile.due_date || projectFile.end_date || "";
    status = projectFile.status || "";
    priority = projectFile.priority || "";
    progress = projectFile.progress || "";
    projectArea = projectFile.area || null;

    // 搜索筛选
    if (config.search && !projectName.toLowerCase().includes(config.search)) {
        return false;
    }

    const completedStatuses = ["completed", "完成", "done", "archived", "归档", "cancelled", "取消"];
    const isCompleted = completedStatuses.includes(status);

    if (config.status === "hide") {
        if (isCompleted) return false;
    } else if (config.status === "completed") {
        if (!isCompleted) return false;
    }

    if (config.area) {
        const projectAreas = projectArea ? (Array.isArray(projectArea) ? projectArea : [projectArea]) : [];

        // 只支持 include/exclude 模式
        if (config.area === "include" || config.area === "exclude") {
            if (!currentNoteArea || currentNoteArea.length === 0) {
                // 当前笔记没有 area，跳过筛选
            } else {
                const filterValue = Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea];
                const hasMatch = projectAreas.some(pa => filterValue.includes(pa));

                if (config.area === "include" && !hasMatch) return false;
                if (config.area === "exclude" && hasMatch) return false;
            }
        }
    }

    // 多项目文件夹检查：如果有多个项目笔记且当前不是主项目，则作为普通笔记处理
    if (hasMultipleProjects) {
        // 检查当前项目是否有 main-project: true
        const isMainProject = projectFile["main-project"] === true;
        // 检查是否有其他项目标记为 main-project: true
        const hasMainProject = projectFiles.some(p => p["main-project"] === true);
        // 如果有其他主项目且当前不是主项目，则不显示为项目卡片（作为普通笔记）
        if (hasMainProject && !isMainProject) {
            return false;
        }
    }

    let shouldDisplay = false;

    // 如果是长期项目（long-term: true），跳过日期筛选直接显示
    if (projectFile["long-term"] === true) {
        shouldDisplay = true;
    } else {
        // 将日期转换为 DateTime 对象进行比较
        // Dataview 的日期字段可能是 DateTime 对象、Link 对象或字符串
        let startDateObj = null;
        let endDateObj = null;

        if (startDate) {
            startDateObj = dv.date(startDate);
        }
        if (endDate) {
            endDateObj = dv.date(endDate);
        }

        // 如果当前笔记没有设置任何日期范围，显示全部项目
        if (!hasExplicitDateRange) {
            shouldDisplay = true;
        }
        // 如果当前笔记只有 start_date 没有 due_date
        else if (effectiveFilterStart && !effectiveFilterEnd) {
            const filterStartTime = effectiveFilterStart.toMillis();
            // 显示所有 start_date >= filterStart 的项目
            if (startDateObj) {
                shouldDisplay = startDateObj.toMillis() >= filterStartTime;
            } else if (endDateObj) {
                // 如果没有 start_date 但有 end_date，显示 end_date >= filterStart 的项目
                shouldDisplay = endDateObj.toMillis() >= filterStartTime;
            } else {
                shouldDisplay = true;
            }
        }
        // 如果当前笔记有完整的日期范围（start_date 和 due_date 都有）
        else if (effectiveFilterStart && effectiveFilterEnd) {
            const filterStartTime = effectiveFilterStart.toMillis();
            const filterEndTime = effectiveFilterEnd.toMillis();

            if (startDateObj && endDateObj) {
                const startTime = startDateObj.toMillis();
                const endTime = endDateObj.toMillis();
                shouldDisplay = (startTime <= filterEndTime && endTime >= filterStartTime);
            } else if (startDateObj) {
                const startTime = startDateObj.toMillis();
                shouldDisplay = (startTime >= filterStartTime && startTime <= filterEndTime);
            } else if (endDateObj) {
                const endTime = endDateObj.toMillis();
                shouldDisplay = (endTime >= filterStartTime && endTime <= filterEndTime);
            } else {
                shouldDisplay = true;
            }
        }
        // 如果当前笔记只有 due_date 没有 start_date
        else if (!effectiveFilterStart && effectiveFilterEnd) {
            const filterEndTime = effectiveFilterEnd.toMillis();
            // 显示所有 end_date <= filterEnd 或 start_date <= filterEnd 的项目
            if (startDateObj) {
                shouldDisplay = startDateObj.toMillis() <= filterEndTime;
            } else if (endDateObj) {
                shouldDisplay = endDateObj.toMillis() <= filterEndTime;
            } else {
                shouldDisplay = true;
            }
        }
    }

    if (!shouldDisplay) return false;

    const card = containerEl.createEl("div", { cls: "project-card" });

    const titleWrapper = card.createEl("div", {
        attr: { style: "display: flex; justify-content: space-between; align-items: start;" }
    });

    const title = titleWrapper.createEl("h3", {
        attr: { style: "margin: 0; flex: 1;" }
    });

    const link = title.createEl("a", {
        cls: "internal-link",
        href: projectFile.file.path,
        attr: { "data-href": projectFile.file.path }
    });
    link.textContent = projectName;
    link.style.color = "inherit";
    link.style.textDecoration = "none";

    const badgesWrapper = titleWrapper.createEl("div", {
        attr: { style: "display: flex; gap: 5px; margin-top: 5px;" }
    });

    // 只有当有多个项目且没有明确指定主项目时，才显示警告徽章
    if (hasMultipleProjects && !hasExplicitMainProject) {
        const warningBadge = badgesWrapper.createEl("span", {
            cls: "project-status",
            attr: { style: "margin: 0; background: rgba(255, 150, 0, 0.2);" }
        });
        warningBadge.textContent = `⚠️ ${allProjectFiles.length}个项目文档`;
    }

    if (priority) {
        const priorityBadge = badgesWrapper.createEl("span", {
            cls: "project-status",
            attr: { style: "margin: 0;" }
        });
        const priorityMap = {
            "1": "🔴", "2": "🟠", "3": "🟡", "4": "🔵", "5": "⚪",
            "最高": "🔴", "高": "🟠", "中": "🟡", "低": "🔵", "最低": "⚪"
        };
        priorityBadge.textContent = priorityMap[priority] || priority;
    }

    if (status) {
        const statusBadge = badgesWrapper.createEl("span", {
            cls: "project-status",
            attr: { style: "margin: 0;" }
        });
        const statusMap = {
            "inbox": "📥", "draft": "✏️", "active": "🚀",
            "on-hold": "⏸️", "completed": "✅", "cancelled": "❌", "archived": "📦",
            "未开始/待启动": "📥", "起草/构思中": "✏️", "执行中": "🚀",
            "暂停": "⏸️", "完成": "✅", "取消": "❌", "归档": "📦"
        };
        statusBadge.textContent = statusMap[status] || status;

        if (status === "active" || status === "执行中") {
            statusBadge.classList.add("active");
        } else if (status === "completed" || status === "完成") {
            statusBadge.classList.add("completed");
        } else if (status === "inbox" || status === "draft" || status === "未开始/待启动" || status === "起草/构思中") {
            statusBadge.classList.add("planned");
        }
    }

    if (progress) {
        const progressBar = card.createEl("div", {
            attr: {
                style: "width: 100%; height: 8px; background: var(--background-modifier-border); border-radius: 4px; margin: 10px 0; overflow: hidden;"
            }
        });
        progressBar.createEl("div", {
            attr: {
                style: `width: ${progress}%; height: 100%; background: var(--interactive-accent); transition: width 0.3s ease;`
            }
        });
    }

    const notesDiv = card.createEl("div", { cls: "project-notes" });
    // 筛选笔记：包括普通笔记，以及同一文件夹中非主项目的其他项目文档
    const notesList = allNotesInFolder.filter(n => {
        if (n.file.folder !== folderPath) return false;
        // 如果是项目文档，只包含那些不是当前主项目的其他项目
        if (n.type === "project") {
            return n.file.path !== projectFile.file.path;
        }
        return true;
    });

    if (notesList.length > 0) {
        const ul = notesDiv.createEl("ul");
        const notesToShow = config.maxNotes === 0 ? notesList : notesList.slice(0, config.maxNotes);

        notesToShow.forEach(note => {
            const li = ul.createEl("li");
            const noteLink = li.createEl("a", {
                cls: "internal-link",
                href: note.file.path
            });
            noteLink.textContent = note.file.name;
        });

        if (config.maxNotes > 0 && notesList.length > config.maxNotes) {
            const moreText = notesDiv.createEl("div", { cls: "notes-empty" });
            moreText.textContent = `还有 ${notesList.length - config.maxNotes} 个笔记...`;
        }
    } else {
        const emptyText = notesDiv.createEl("div", { cls: "notes-empty" });
        emptyText.textContent = "暂无笔记";
    }

    const meta = card.createEl("div", { cls: "project-meta" });

    const dateDiv = meta.createEl("div", { cls: "project-date" });
    const startDateFormatted = startDate ? dv.date(startDate).toFormat("yyyy-MM-dd") : "";
    const endDateFormatted = endDate ? dv.date(endDate).toFormat("yyyy-MM-dd") : "";
    const dateText = endDateFormatted
        ? `📅 ${startDateFormatted} ~ ${endDateFormatted}`
        : startDateFormatted ? `📅 ${startDateFormatted}` : "📅 日期未设置";
    dateDiv.textContent = dateText;

    const countDiv = meta.createEl("div", { cls: "project-count" });
    countDiv.textContent = `📝 ${notesList.length} 个笔记`;

    return true;
}

// 主渲染函数
function renderProjects(container) {
    // 清空容器
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // 创建筛选栏
    createFilterBar(container);

    // 获取所有项目笔记
    const allNotes = dv.pages('"100 Projects"')
        .where(p => p.file.folder !== "100 Projects");

    // 核心逻辑：分类项目
    const quickProjects = {
        root: [],
        folders: new Map()
    };

    const normalProjects = new Map();

    allProjectFiles.forEach(projectFile => {
        const folderPath = projectFile.file.folder;

        if (folderPath === "100 Projects") {
            quickProjects.root.push(projectFile);
            return;
        }

        const pathParts = folderPath.split("/");
        const quickProjectIndex = pathParts.findIndex(part => part === "快速项目");

        if (quickProjectIndex !== -1) {
            const quickFolderPath = pathParts.slice(0, quickProjectIndex + 1).join("/");
            if (!quickProjects.folders.has(quickFolderPath)) {
                quickProjects.folders.set(quickFolderPath, []);
            }
            quickProjects.folders.get(quickFolderPath).push(projectFile);
            return;
        }

        if (!normalProjects.has(folderPath)) {
            normalProjects.set(folderPath, []);
        }
        normalProjects.get(folderPath).push(projectFile);
    });

    const projectsContainer = container.createEl("div", { cls: "projects-container" });

    let displayedNormalProjects = 0;
    let displayedQuickProjects = 0;

    const hasQuickProjects = quickProjects.root.length > 0 || quickProjects.folders.size > 0;

    // 快速项目区域
    if (hasQuickProjects) {
        const quickSection = projectsContainer.createEl("div", {
            cls: "quick-projects-section",
            attr: { style: "margin-bottom: 30px;" }
        });

        const quickHeader = quickSection.createEl("h2", {
            attr: { style: "margin-bottom: 15px; color: var(--interactive-accent); font-size: 1.3em; border-bottom: 2px solid var(--interactive-accent); padding-bottom: 8px;" }
        });
        quickHeader.textContent = "⚡ 快速项目";

        const quickGrid = quickSection.createEl("div", {
            attr: { style: "display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px;" }
        });

        const allQuickGroups = [];

        if (quickProjects.root.length > 0) {
            allQuickGroups.push({
                title: "快速项目（根目录）",
                projects: quickProjects.root
            });
        }

        const sortedQuickFolders = Array.from(quickProjects.folders.entries())
            .sort((a, b) => a[0].localeCompare(b[0]));

        sortedQuickFolders.forEach(([folderPath, projectFiles]) => {
            if (projectFiles.length === 0) return;

            const displayPath = folderPath.replace("100 Projects/", "").replace(/\//g, " > ");
            allQuickGroups.push({
                title: displayPath,
                projects: projectFiles
            });
        });

        allQuickGroups.forEach(group => {
            const renderedCount = renderQuickProjectList(group.projects, group.title, quickGrid);
            if (renderedCount !== undefined) {
                displayedQuickProjects += renderedCount;
            }
        });
    }

    // 正常项目区域
    if (hasQuickProjects) {
        projectsContainer.createEl("div", {
            attr: { style: "border-top: 2px solid var(--background-modifier-border); margin: 30px 0;" }
        });
    }

    const normalSection = projectsContainer.createEl("div", {
        cls: "normal-projects-section"
    });

    const normalHeader = normalSection.createEl("h2", {
        attr: { style: "margin-bottom: 15px; font-size: 1.3em; border-bottom: 2px solid var(--text-muted); padding-bottom: 8px;" }
    });
    normalHeader.textContent = "📋 项目";

    const normalGrid = normalSection.createEl("div", {
        attr: { style: "display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px;" }
    });

    const folderNotesMap = new Map();
    allNotes.forEach(note => {
        const folder = note.file.folder;
        if (!folderNotesMap.has(folder)) {
            folderNotesMap.set(folder, []);
        }
        folderNotesMap.get(folder).push(note);
    });

    const sortedNormalProjects = Array.from(normalProjects.entries())
        .map(([folderPath, projectFiles]) => {
            // 处理多项目文件夹：如果文件夹中有多个项目且其中一个标记为 main-project: true
            // 则只将该主项目作为代表显示
            let displayProjects = projectFiles;
            if (projectFiles.length > 1) {
                const mainProject = projectFiles.find(p => p["main-project"] === true);
                if (mainProject) {
                    displayProjects = [mainProject];
                }
            }
            const mainProject = displayProjects[0];
            const sortDate = mainProject.due_date || mainProject.end_date || null;
            return { folderPath, projectFiles: displayProjects, allProjectFiles: projectFiles, sortDate };
        })
        .sort((a, b) => {
            if (a.sortDate && b.sortDate) {
                return a.sortDate > b.sortDate ? -1 : 1;
            }
            if (a.sortDate && !b.sortDate) return -1;
            if (!a.sortDate && b.sortDate) return 1;
            return a.folderPath.localeCompare(b.folderPath);
        });

    sortedNormalProjects.forEach(({ folderPath, projectFiles, allProjectFiles }) => {
        const notesInFolder = folderNotesMap.get(folderPath) || [];
        const rendered = renderNormalProjectCard(folderPath, projectFiles, allProjectFiles, notesInFolder, normalGrid);
        if (rendered) displayedNormalProjects++;
    });

    if (displayedNormalProjects === 0 && displayedQuickProjects === 0) {
        const empty = projectsContainer.createEl("div", {
            cls: "project-empty",
            attr: { style: "text-align: center; padding: 40px; color: var(--text-muted);" }
        });
        empty.textContent = "📭 没有符合筛选条件的项目";
    }

    // 根据当前笔记的日期设置显示日期范围
    let dateRangeText;
    if (!hasExplicitDateRange) {
        dateRangeText = "全部时间";
    } else if (effectiveFilterStart && !effectiveFilterEnd) {
        dateRangeText = `${effectiveFilterStart.toFormat("yyyy-MM-dd")} 之后`;
    } else if (!effectiveFilterStart && effectiveFilterEnd) {
        dateRangeText = `${effectiveFilterEnd.toFormat("yyyy-MM-dd")} 之前`;
    } else {
        dateRangeText = `${effectiveFilterStart.toFormat("yyyy-MM-dd")} ~ ${effectiveFilterEnd.toFormat("yyyy-MM-dd")}`;
    }

    const summary = projectsContainer.createEl("p", {
        attr: { style: "color: var(--text-muted); margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--background-modifier-border);" }
    });
    summary.textContent = `📊 共 ${displayedNormalProjects} 个项目，${displayedQuickProjects} 个快速项目 (${dateRangeText})`;
}

// 创建主容器
const mainContainer = dv.el('div', '');

// 创建内容容器
const contentContainer = mainContainer.createEl("div");

// 初始渲染
renderProjects(contentContainer);

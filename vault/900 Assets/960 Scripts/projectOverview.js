const currentPage = dv.current();

// 默认配置
const config = {
    maxNotes: 5,
    status: "hide",
    area: null
};

// 处理输入参数
if (input !== undefined) {
    config.maxNotes = input.maxNotes !== undefined ? input.maxNotes : config.maxNotes;
    config.status = input.status !== undefined ? input.status : config.status;
    config.area = input.area !== undefined ? input.area : config.area;
}

// 通过识别当前笔记元数据传参
if (currentPage.filter === "include") {
    config.area = "include";
} else if (currentPage.filter === "exclude") {
    config.area = "exclude";
}

if (currentPage.status) {
    config.status = currentPage.status;
}

const filterStart = currentPage.start_date;
const filterEnd = currentPage.due_date;
const currentNoteArea = currentPage.area;

// 获取所有项目笔记
const allNotes = dv.pages('"100 Projects"')
    .where(p => p.file.folder !== "100 Projects");

// ========== 核心逻辑：分类项目 ==========

// 1. 收集所有项目文件
const allProjectFiles = dv.pages('"100 Projects"')
    .where(p => p.type === "project");

// 2. 快速项目识别
const quickProjects = {
    root: [],  // 根目录快速项目
    folders: new Map()  // 快速项目文件夹分组
};

// 3. 正常项目映射
const normalProjects = new Map();

// 遍历所有项目文件进行分类
allProjectFiles.forEach(projectFile => {
    const filePath = projectFile.file.path;
    const folderPath = projectFile.file.folder;
    
    // 情况1：根目录快速项目
    if (folderPath === "100 Projects") {
        quickProjects.root.push(projectFile);
        return;
    }
    
    // 情况2：快速项目文件夹（任意层级）
    const pathParts = folderPath.split("/");
    const quickProjectIndex = pathParts.findIndex(part => part === "快速项目");
    
    if (quickProjectIndex !== -1) {
        // 是快速项目文件夹内的文件
        const quickFolderPath = pathParts.slice(0, quickProjectIndex + 1).join("/");
        if (!quickProjects.folders.has(quickFolderPath)) {
            quickProjects.folders.set(quickFolderPath, []);
        }
        quickProjects.folders.get(quickFolderPath).push(projectFile);
        return;
    }
    
    // 情况3：正常项目（检查是否是直接子文件）
    // 只收集项目文件夹（100 Projects 下的直接子文件夹或二级文件夹）
    if (!normalProjects.has(folderPath)) {
        normalProjects.set(folderPath, []);
    }
    normalProjects.get(folderPath).push(projectFile);
});

// ========== 渲染函数 ==========

const container = dv.container.createEl("div", { cls: "projects-container" });

// 渲染快速项目列表（多个项目在一个卡片里）
function renderQuickProjectList(projectFiles, title, containerEl) {
    // 对快速项目应用与普通项目相同的筛选逻辑
    const filteredProjectFiles = projectFiles.filter(projectFile => {
        const status = projectFile.status || "";
        const projectArea = projectFile.area || null;
        const startDate = projectFile.start_date;
        const endDate = projectFile.due_date || projectFile.end_date;

        // status 筛选
        // 定义完成状态列表
        const completedStatuses = ["completed", "完成", "done", "archived", "归档"];
        const isCompleted = completedStatuses.includes(status);

        if (config.status === "hide") {
            if (isCompleted) return false;
        } else if (config.status === "completed") {
            if (!isCompleted) return false;
        }

        // area 筛选
        if (config.area) {
            // 即使 currentNoteArea 为空，也要进行筛选（空值意味着不匹配任何 area）
            const filterValue = currentNoteArea ? (Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea]) : [];
            const projectAreas = projectArea ? (Array.isArray(projectArea) ? projectArea : [projectArea]) : [];
            const hasMatch = projectAreas.some(pa => filterValue.includes(pa));

            if (config.area === "include" && !hasMatch) return false;
            if (config.area === "exclude" && hasMatch) return false;
        }

        // 日期筛选
        let shouldDisplay = false;
        if (startDate && endDate) {
            shouldDisplay = (startDate <= filterEnd && endDate >= filterStart);
        } else if (startDate) {
            shouldDisplay = (startDate >= filterStart && startDate <= filterEnd);
        } else if (endDate) {
            shouldDisplay = (endDate >= filterStart && endDate <= filterEnd);
        } else {
            shouldDisplay = true;
        }

        return shouldDisplay;
    });

    // 如果没有项目通过筛选，不渲染卡片
    if (filteredProjectFiles.length === 0) {
        return 0;
    }

    const card = containerEl.createEl("div", {
        cls: "project-card quick-project-card",
        attr: { style: "border-left: 3px solid var(--interactive-accent); height: 100%;" }
    });

    // 标题
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

    // 项目列表
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
        
        // 状态和日期信息（紧凑显示）
        const metaWrapper = li.createEl("div", {
            attr: { style: "display: flex; gap: 5px; align-items: center; flex-shrink: 0;" }
        });
        
        // 状态
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
        
        // 日期（仅显示截止日期）
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
function renderNormalProjectCard(folderPath, projectFiles, allNotesInFolder, containerEl) {
    const folderName = folderPath.split("/").pop();
    
    // 检查是否有多个主文档
    const hasMultipleProjects = projectFiles.length > 1;
    const projectFile = projectFiles[0];  // 取第一个
    
    let projectName, startDate, endDate, status, priority, progress, projectArea;
    
    projectName = projectFile.file.name;
    startDate = projectFile.start_date || "";
    endDate = projectFile.due_date || projectFile.end_date || "";
    status = projectFile.status || "";
    priority = projectFile.priority || "";
    progress = projectFile.progress || "";
    projectArea = projectFile.area || null;
    
    // status 筛选
    // 定义完成状态列表
    const completedStatuses = ["completed", "完成", "done", "archived", "归档"];
    const isCompleted = completedStatuses.includes(status);

    if (config.status === "hide") {
        if (isCompleted) return false;
    } else if (config.status === "completed") {
        if (!isCompleted) return false;
    }
    
    // area 筛选
    if (config.area) {
        // 即使 currentNoteArea 为空，也要进行筛选（空值意味着不匹配任何 area）
        const filterValue = currentNoteArea ? (Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea]) : [];
        const projectAreas = projectArea ? (Array.isArray(projectArea) ? projectArea : [projectArea]) : [];
        const hasMatch = projectAreas.some(pa => filterValue.includes(pa));

        if (config.area === "include" && !hasMatch) return false;
        if (config.area === "exclude" && hasMatch) return false;
    }
    
    // 日期筛选
    let shouldDisplay = false;
    if (startDate && endDate) {
        shouldDisplay = (startDate <= filterEnd && endDate >= filterStart);
    } else if (startDate) {
        shouldDisplay = (startDate >= filterStart && startDate <= filterEnd);
    } else if (endDate) {
        shouldDisplay = (endDate >= filterStart && endDate <= filterEnd);
    } else {
        shouldDisplay = true;
    }
    
    if (!shouldDisplay) return false;
    
    // 开始渲染
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
    
    // 多主文档警告
    if (hasMultipleProjects) {
        const warningBadge = badgesWrapper.createEl("span", {
            cls: "project-status",
            attr: { style: "margin: 0; background: rgba(255, 150, 0, 0.2);" }
        });
        warningBadge.textContent = `⚠️ ${projectFiles.length}个主文档`;
    }
    
    // 优先级
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
    
    // 状态
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
    
    // 进度条
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
    
    // 笔记列表
    const notesDiv = card.createEl("div", { cls: "project-notes" });
    const notesList = allNotesInFolder.filter(n => 
        n.type !== "project" && n.file.folder === folderPath
    );
    
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
    
    // 元信息
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

// ========== 开始渲染 ==========

let displayedNormalProjects = 0;
let displayedQuickProjects = 0;

// 检查是否有快速项目
const hasQuickProjects = quickProjects.root.length > 0 || quickProjects.folders.size > 0;

// === 快速项目区域 ===
if (hasQuickProjects) {
    const quickSection = container.createEl("div", {
        cls: "quick-projects-section",
        attr: { style: "margin-bottom: 30px;" }
    });
    
    const quickHeader = quickSection.createEl("h2", {
        attr: { style: "margin-bottom: 15px; color: var(--interactive-accent); font-size: 1.3em; border-bottom: 2px solid var(--interactive-accent); padding-bottom: 8px;" }
    });
    quickHeader.textContent = "⚡ 快速项目";
    
    // 创建横向网格容器
    const quickGrid = quickSection.createEl("div", {
        attr: { style: "display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px;" }
    });
    
    // 收集所有快速项目分组
    const allQuickGroups = [];
    
    // 1. 根目录快速项目
    if (quickProjects.root.length > 0) {
        allQuickGroups.push({
            title: "快速项目（根目录）",
            projects: quickProjects.root
        });
    }
    
    // 2. 快速项目文件夹（按路径分组）
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
    
    // 渲染所有快速项目卡片到网格中
    allQuickGroups.forEach(group => {
        const renderedCount = renderQuickProjectList(group.projects, group.title, quickGrid);
        if (renderedCount !== undefined) {
            displayedQuickProjects += renderedCount;
        }
    });
}

// === 正常项目区域 ===
if (hasQuickProjects) {
    const divider = container.createEl("div", {
        attr: { style: "border-top: 2px solid var(--background-modifier-border); margin: 30px 0;" }
    });
}

const normalSection = container.createEl("div", { 
    cls: "normal-projects-section"
});

const normalHeader = normalSection.createEl("h2", {
    attr: { style: "margin-bottom: 15px; font-size: 1.3em; border-bottom: 2px solid var(--text-muted); padding-bottom: 8px;" }
});
normalHeader.textContent = "📋 项目";

const normalGrid = normalSection.createEl("div", {
    attr: { style: "display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px;" }
});

// 收集所有文件夹的笔记
const folderNotesMap = new Map();
allNotes.forEach(note => {
    const folder = note.file.folder;
    if (!folderNotesMap.has(folder)) {
        folderNotesMap.set(folder, []);
    }
    folderNotesMap.get(folder).push(note);
});

// 按日期排序正常项目
const sortedNormalProjects = Array.from(normalProjects.entries())
    .map(([folderPath, projectFiles]) => {
        const mainProject = projectFiles[0];
        const sortDate = mainProject.due_date || mainProject.end_date || null;
        return { folderPath, projectFiles, sortDate };
    })
    .sort((a, b) => {
        if (a.sortDate && b.sortDate) {
            return a.sortDate > b.sortDate ? -1 : 1;
        }
        if (a.sortDate && !b.sortDate) return -1;
        if (!a.sortDate && b.sortDate) return 1;
        return a.folderPath.localeCompare(b.folderPath);
    });

sortedNormalProjects.forEach(({ folderPath, projectFiles }) => {
    const notesInFolder = folderNotesMap.get(folderPath) || [];
    const rendered = renderNormalProjectCard(folderPath, projectFiles, notesInFolder, normalGrid);
    if (rendered) displayedNormalProjects++;
});

// 显示统计信息
if (displayedNormalProjects === 0 && displayedQuickProjects === 0) {
    const empty = container.createEl("div", { cls: "project-empty" });
    empty.textContent = "📭 当前时间段内没有项目";
}

const filterStartFormatted = dv.date(filterStart).toFormat("yyyy-MM-dd");
const filterEndFormatted = dv.date(filterEnd).toFormat("yyyy-MM-dd");

const summary = container.createEl("p", {
    attr: { style: "color: var(--text-muted); margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--background-modifier-border);" }
});
summary.textContent = `📊 共 ${displayedNormalProjects} 个项目，${displayedQuickProjects} 个快速项目 (${filterStartFormatted} ~ ${filterEndFormatted})`;
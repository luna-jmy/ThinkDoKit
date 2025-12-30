// 默认配置
const config = {
    maxNotes: 5,           // 每个项目预览的笔记数量
    status: "hide",        // hide: 不显示 completed, show: 显示所有, "completed": 只显示已完成
    area: null             // null: 不过滤, "include": 包含当前笔记area, "exclude": 排除当前笔记area
};

// 处理输入参数
if (input !== undefined) {
    config.maxNotes = input.maxNotes !== undefined ? input.maxNotes : config.maxNotes;
    config.status = input.status !== undefined ? input.status : config.status;
    config.area = input.area !== undefined ? input.area : config.area;
}

const currentPage = dv.current();
const filterStart = currentPage.start_date;
const filterEnd = currentPage.due_date;

// 获取当前笔记的 area 元数据作为筛选值
const currentNoteArea = currentPage.area;

// 获取所有项目笔记
const allNotes = dv.pages('"100 Projects"')
    .where(p => p.file.folder !== "100 Projects");

// 使用 dataview 构建文件夹结构映射
const projectMap = new Map();

// 收集所有唯一的文件夹路径（包含所有子文件夹）
allNotes.forEach(page => {
    const folderPath = page.file.folder;
    // 跳过 "100 Projects" 根目录本身
    if (folderPath === "100 Projects") return;

    // 提取项目文件夹（100 Projects 下的一级子文件夹）
    const parts = folderPath.split("/");
    if (parts.length >= 2 && parts[0] === "100 Projects") {
        const projectFolderPath = parts.slice(0, 2).join("/");
        if (!projectMap.has(projectFolderPath)) {
            projectMap.set(projectFolderPath, []);
        }
        projectMap.get(projectFolderPath).push(page);
    }
});

const projectGroups = Array.from(projectMap.entries())
    .map(([path, notes]) => {
        const projectFile = notes.find(n => n.type === "project");
        let sortDate = null;
        if (projectFile) {
            sortDate = projectFile.due_date || projectFile.end_date;
        }
        return { key: path, rows: notes, sortDate: sortDate };
    })
    .sort((a, b) => {
        // 如果两个都有日期，按日期降序（新到旧）
        if (a.sortDate && b.sortDate) {
            if (a.sortDate > b.sortDate) return -1;
            if (a.sortDate < b.sortDate) return 1;
        }
        // 如果只有一个有日期，有日期的排前面
        if (a.sortDate && !b.sortDate) return -1;
        if (!a.sortDate && b.sortDate) return 1;

        // 如果都没有日期，或日期相同，按文件夹名称排序
        return a.key.localeCompare(b.key);
    });

const container = dv.container.createEl("div", { cls: "projects-container" });

let displayedProjects = 0;

for (let group of projectGroups) {
    const folderPath = group.key;
    const folderName = folderPath.split("/").pop();
    const notes = group.rows;

    const projectFile = notes.find(n => n.type === "project");

    let projectName, startDate, endDate, status, priority, progress;
    let projectArea = null;

    if (projectFile) {
        projectName = projectFile.file.name;
        startDate = projectFile.start_date || "";
        endDate = projectFile.due_date || projectFile.end_date || "";
        status = projectFile.status || "";
        priority = projectFile.priority || "";
        progress = projectFile.progress || "";
        projectArea = projectFile.area || null;
    } else {
        const dateMatch = folderName.match(/^(\d{6})(.*)$/);
        projectName = dateMatch ? dateMatch[2].trim() : folderName;

        startDate = dateMatch ? `${dateMatch[1].substring(0,4)}-${dateMatch[1].substring(4,6)}-01` : "";
        endDate = "";
        status = "";
        priority = "";
        progress = "";
        projectArea = null;
    }

    // status 筛选：默认不显示 completed 项目
    if (config.status === "hide") {
        if (status === "completed" || status === "完成") {
            continue;
        }
    } else if (config.status === "completed") {
        if (status !== "completed" && status !== "完成") {
            continue;
        }
    }
    // config.status === "show" 时显示所有状态

    // area 筛选（使用当前笔记的 area 元数据作为筛选值）
    let skipDueToArea = false;
    if (config.area && currentNoteArea) {
        const filterValue = Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea];
        const projectAreas = projectArea ? (Array.isArray(projectArea) ? projectArea : [projectArea]) : [];

        const hasMatch = projectAreas.some(pa => filterValue.includes(pa));

        if (config.area === "include") {
            // 包含模式：只显示匹配的项目
            // 注意：如果项目没有主文件或没有 area，则不匹配
            if (!hasMatch) {
                skipDueToArea = true;
            }
        } else if (config.area === "exclude") {
            // 排除模式：排除匹配的项目
            if (hasMatch) {
                skipDueToArea = true;
            }
        }
    }

    if (skipDueToArea) {
        continue;
    }

    let shouldDisplay = false;

    if (!projectFile) {
        shouldDisplay = true;
    } else if (startDate && endDate) {
        shouldDisplay = (startDate <= filterEnd && endDate >= filterStart);
    } else if (startDate) {
        shouldDisplay = (startDate >= filterStart && startDate <= filterEnd);
    } else if (endDate) {
        shouldDisplay = (endDate >= filterStart && endDate <= filterEnd);
    } else {
        shouldDisplay = true;
    }

    if (shouldDisplay) {
        displayedProjects++;

        const card = container.createEl("div", { cls: "project-card" });

        const titleWrapper = card.createEl("div", {
            attr: { style: "display: flex; justify-content: space-between; align-items: start;" }
        });

        const title = titleWrapper.createEl("h3", {
            attr: { style: "margin: 0; flex: 1;" }
        });

        if (projectFile) {
            const link = title.createEl("a", {
                cls: "internal-link",
                href: projectFile.file.path,
                attr: { "data-href": projectFile.file.path }
            });
            link.textContent = projectName;
            link.style.color = "inherit";
            link.style.textDecoration = "none";
        } else {
            title.textContent = projectName;
        }

        const badgesWrapper = titleWrapper.createEl("div", {
            attr: { style: "display: flex; gap: 5px; margin-top: 5px;" }
        });

        if (!projectFile) {
            const missingBadge = badgesWrapper.createEl("span", {
                cls: "project-status",
                attr: { style: "margin: 0; background: rgba(255, 100, 100, 0.2); color: var(--text-normal);" }
            });
            missingBadge.textContent = "⚠️ 无主文件";
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

        const notesList = notes.filter(n => n.type !== "project");

        if (notesList.length > 0) {
            const ul = notesDiv.createEl("ul");

            const notesToShow = config.maxNotes === 0 ? notesList : notesList.slice(0, config.maxNotes);

            notesToShow.forEach(note => {
                const li = ul.createEl("li");
                const link = li.createEl("a", {
                    cls: "internal-link",
                    href: note.file.path
                });
                link.textContent = note.file.name;
            });

            if (config.maxNotes > 0 && notesList.length > config.maxNotes) {
                const moreText = notesDiv.createEl("div", {
                    cls: "notes-empty"
                });
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
            : startDateFormatted
                ? `📅 ${startDateFormatted}`
                : "📅 日期未设置";
        dateDiv.textContent = dateText;

        const countDiv = meta.createEl("div", { cls: "project-count" });
        countDiv.textContent = `📝 ${notesList.length} 个笔记`;
    }
}

if (displayedProjects === 0) {
    const empty = container.createEl("div", { cls: "project-empty" });
    empty.textContent = "📭 当前时间段内没有项目";
}

const filterStartFormatted = dv.date(filterStart).toFormat("yyyy-MM-dd");
const filterEndFormatted = dv.date(filterEnd).toFormat("yyyy-MM-dd");
const filterInfo = dv.el("p", `📊 显示 ${displayedProjects} 个项目 (${filterStartFormatted} ~ ${filterEndFormatted})`, {
    attr: { style: "color: var(--text-muted); margin-bottom: 10px;" }
});

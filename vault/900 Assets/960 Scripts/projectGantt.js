const currentPage = dv.current();

// 默认配置
const config = {
    status: "hide",        // hide: 不显示 completed, show: 显示所有, "completed": 只显示已完成
    area: null             // null: 不过滤, "include": 包含当前笔记area, "exclude": 排除当前笔记area
};

// 处理输入参数
if (input !== undefined) {
    config.status = input.status !== undefined ? input.status : config.status;
    config.area = input.area !== undefined ? input.area : config.area;
}

// 通过识别当前笔记元数据 filter: 来传参
if (currentPage.filter === "include") {
    config.area = "include";
} else if (currentPage.filter === "exclude") {
    config.area = "exclude";
}

// 通过识别当前笔记元数据 status: 来传参
if (currentPage.status) {
    config.status = currentPage.status;
}

const filterStart = currentPage.start_date;
const filterEnd = currentPage.due_date;

// 获取当前笔记的 area 元数据作为筛选值
const currentNoteArea = currentPage.area;

// 获取所有项目笔记
let pages = dv.pages()
    .where(p => p.type === "project")
    .where(p => {
        // 获取项目的开始和结束日期
        const projectStart = p.start_date ? dv.date(p.start_date) : null;
        const projectEnd = (p.due_date || p.end_date) ? dv.date(p.due_date || p.end_date) : null;
        const filterStartDate = dv.date(filterStart);
        const filterEndDate = dv.date(filterEnd);

        // 至少需要一个日期
        if (!projectStart && !projectEnd) return false;

        // 日期筛选逻辑：项目时间段与筛选时间段有交集
        // 情况1：项目有开始和结束日期
        if (projectStart && projectEnd) {
            return projectStart <= filterEndDate && projectEnd >= filterStartDate;
        }
        // 情况2：只有开始日期
        if (projectStart) {
            return projectStart >= filterStartDate && projectStart <= filterEndDate;
        }
        // 情况3：只有结束日期
        if (projectEnd) {
            return projectEnd >= filterStartDate && projectEnd <= filterEndDate;
        }
        return false;
    })
    .where(p => p.status !== "cancelled");

// Area 筛选逻辑
if (config.area && currentNoteArea) {
    pages = pages.where(p => {
        const filterValue = Array.isArray(currentNoteArea) ? currentNoteArea : [currentNoteArea];
        const projectArea = p.area ? (Array.isArray(p.area) ? p.area : [p.area]) : [];
        const hasMatch = projectArea.some(pa => filterValue.includes(pa));

        if (config.area === "include") {
            return hasMatch;
        } else if (config.area === "exclude") {
            return !hasMatch;
        }
        return true;
    });
}

// status 筛选：默认不显示 completed 项目
if (config.status === "hide") {
    pages = pages.where(p => p.status !== "completed" && p.status !== "完成");
} else if (config.status === "completed") {
    pages = pages.where(p => p.status === "completed" || p.status === "完成");
}
// config.status === "show" 时显示所有状态

// 排序
pages = pages.sort(p => p.due_date, 'asc');

if (pages.length === 0) {
    dv.paragraph("📭 当前时间段内没有项目");
    return;
}

let mermaidCode = "```mermaid\ngantt\n";
mermaidCode += "    title 项目进度甘特图\n";
mermaidCode += "    dateFormat YYYY-MM-DD\n";
mermaidCode += "    axisFormat %y-%m\n\n";

const groupedPages = {};
pages.forEach(page => {
    const objective = page.objective || "默认项目";
    if (!groupedPages[objective]) {
        groupedPages[objective] = [];
    }
    groupedPages[objective].push(page);
});

Object.keys(groupedPages).forEach(context => {
    if (Object.keys(groupedPages).length > 1) {
        mermaidCode += `    section ${context}\n`;
    }

    groupedPages[context].forEach(page => {
        const taskName = page.file.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');

        // 获取开始和结束日期，支持 due_date 或 end_date
        let startDate = page.start_date ? dv.date(page.start_date) : null;
        let endDate = (page.due_date || page.end_date) ? dv.date(page.due_date || page.end_date) : null;

        // 如果没有开始日期，使用结束日期前7天作为开始日期
        if (!startDate && endDate) {
            startDate = endDate.minus({ days: 7 });
        }
        // 如果没有结束日期，使用开始日期后7天作为结束日期
        if (startDate && !endDate) {
            endDate = startDate.plus({ days: 7 });
        }

        const startDateFormatted = startDate.toFormat("yyyy-MM-dd");
        const endDateFormatted = endDate.toFormat("yyyy-MM-dd");

        let status = "";
        if (page.status === "completed") {
            status = "done, ";
        } else if (page.status === "active") {
            status = "active, ";
        }

        mermaidCode += `    ${page.file.name} :${status}${taskName}, ${startDateFormatted}, ${endDateFormatted}\n`;
    });

    mermaidCode += "\n";
});

mermaidCode += "```";

dv.paragraph(mermaidCode);

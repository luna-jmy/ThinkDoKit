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
    .where(p => p.start_date && p.due_date)
    .where(p => {
        const projectStart = dv.date(p.start_date);
        const projectEnd = dv.date(p.due_date);
        const filterStartDate = dv.date(filterStart);
        const filterEndDate = dv.date(filterEnd);
        return projectStart <= filterEndDate && projectEnd >= filterStartDate;
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
        const startDate = dv.date(page.start_date).toFormat("yyyy-MM-dd");
        const dueDate = dv.date(page.due_date).toFormat("yyyy-MM-dd");

        let status = "";
        if (page.status === "completed") {
            status = "done, ";
        } else if (page.status === "active") {
            status = "active, ";
        }

        mermaidCode += `    ${page.file.name} :${status}${taskName}, ${startDate}, ${dueDate}\n`;
    });

    mermaidCode += "\n";
});

mermaidCode += "```";

dv.paragraph(mermaidCode);

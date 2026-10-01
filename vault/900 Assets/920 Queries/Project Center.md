---
created: 2026-04-06
cssclasses:
  - fullwidth
obsidianUIMode: preview
tags:
---

## 2025 Work Projects
![[项目列表.base#ActiveWorkProjects]]

```dataviewjs
// 获取项目数据
const pages = dv.pages('"100 Projects/工作项目"')
    .where(p => p.start_date && p.due_date)
    .where(p => {
        const startMonth = dv.date(p.start_date).toFormat("yyyy-MM");
        const dueMonth = dv.date(p.due_date).toFormat("yyyy-MM");
        const currentMonth = dv.date("now").toFormat("yyyy-MM");
        return startMonth <= currentMonth && dueMonth >= currentMonth;
    })
    .where(p => p.status !== "cancelled")
    .sort(p => p.due_date, 'asc');

// 生成 Mermaid 甘特图代码
let mermaidCode = "```mermaid\ngantt\n";
mermaidCode += "    title 工作项目进度\n";
mermaidCode += "    dateFormat YYYY-MM-DD\n";
mermaidCode += "    axisFormat %y-%m\n\n";

// 按 objectie 分组（如果有的话）
const groupedPages = {};
pages.forEach(page => {
    const objective = page.objective || "默认项目";
    if (!groupedPages[objective]) {
        groupedPages[objective] = [];
    }
    groupedPages[objective].push(page);
});

// 生成甘特图项目条目
Object.keys(groupedPages).forEach(context => {
    if (Object.keys(groupedPages).length > 1) {
        mermaidCode += `    section ${context}\n`;
    }
    
    groupedPages[context].forEach(page => {
        const taskName = page.file.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ''); // 清理任务名称
        const startDate = dv.date(page.start_date).toFormat("yyyy-MM-dd");
        const dueDate = dv.date(page.due_date).toFormat("yyyy-MM-dd");
        
        // 状态映射
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

// 显示生成的 Mermaid 代码
dv.paragraph(mermaidCode);
```

---

## Active Project Tasks This Month
```tasks
path includes 100 Projects
sort by path
not done
group by filename
hide backlink
is not blocked
sort by due
has due date
due before next month
due after last month
```

---

## Active Project Todos
```tasks
path includes 100 Projects
filter by function task.file.frontmatter.status === 'active'
sort by path
not done
group by filename
hide backlink
sort by due
is not blocked
```

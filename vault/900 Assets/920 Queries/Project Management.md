---
created: 2025-09-22
cssclasses:
  - fullwidth
obsidianUIMode: preview
words:
  2025-07-14: 355
---

## Active Projects
```dataview
TABLE objective, start_date as start, due_date as due, project-leader as leader, status
FROM "100 Projects"
WHERE (start_date AND dateformat(date(start_date), "yyyy-MM") <= dateformat(date(now), "yyyy-MM"))
   AND (due_date AND dateformat(date(due_date), "yyyy-MM") >= dateformat(date(now), "yyyy-MM"))
SORT completion_date DESC
```

```dataviewjs
// 获取项目数据
const pages = dv.pages('"100 Projects/工作项目/2025工作项目"')
    .where(p => p.start_date && p.due_date)
    .where(p => {
        const startMonth = dv.date(p.start_date).toFormat("yyyy-MM");
        const dueMonth = dv.date(p.due_date).toFormat("yyyy-MM");
        const currentMonth = dv.date("now").toFormat("yyyy-MM");
        return startMonth <= currentMonth && dueMonth >= currentMonth;
    })
    .sort(p => p.completion_date, 'desc');

// 生成 Mermaid 甘特图代码
let mermaidCode = "```mermaid\ngantt\n";
mermaidCode += "    title 工作项目甘特图\n";
mermaidCode += "    dateFormat YYYY-MM-DD\n";
mermaidCode += "    axisFormat %y-%m\n\n";

// 按 context 分组（如果有的话）
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
sort by due
is not blocked
short mode
```

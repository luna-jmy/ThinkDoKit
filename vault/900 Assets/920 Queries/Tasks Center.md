---
created: 2026-03-30
cssclasses:
  - fullwidth
obsidianUIMode: preview
type: query
tags:
  - favorite
---


```dataviewjs
const allTasks = dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks;

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
```

>[!warning]- Overdue Tasks
>```tasks
>not done
>filter by function task.status.symbol === ' '
>due before tomorrow
>path does not include 个人项目
>group by filename
>hide backlink
>```

>[!tip]- Active Tasks
>```tasks
>not done
>filter by function task.status.symbol === ' '
>(starts before tomorrow) AND (due after yesterday)
>path does not include 个人项目
>is not blocked
>group by path
>short mode
>```

---

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "推迟", folder: "", status: ">" },
        { name: "备忘", folder: "", status: "information" },
    ]
});
```


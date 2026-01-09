---
cssclasses:
obsidianUIMode: preview
---

# 测试 Tab 视图

## 测试 1: 测试现有的 tasksCalendar（验证 dv.view 是否工作）

```dataviewjs
await dv.view("tasksCalendar", {
    pages: "",
    view: "week",
    firstDayOfWeek: "1",
    options: "style1"
})
```

## 测试 2: 尝试用不同路径调用 tabTaskView

```dataviewjs
// 尝试 1: 完整路径
await dv.view('"900 Assets/960 Scripts/tabTaskView"', {
    tabs: [
        { name: "测试", folder: "000 Inbox", status: " " }
    ]
});
```

```dataviewjs
// 尝试 2: 相对路径
await dv.view("tabTaskView", {
    tabs: [
        { name: "测试", folder: "000 Inbox", status: " " }
    ]
});
```

## 测试 3: 直接嵌入代码（不使用 dv.view）

```dataviewjs
// 直接在这里写代码，不用 dv.view
const allTasks = dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks;

const tasks = allTasks.filter(t => {
    const path = t.path;
    const inFolder = path.includes("000 Inbox/") || path.includes("000 Inbox\\");
    return inFolder && !t.completed && t.status === " ";
});

dv.paragraph(`找到 ${tasks.length} 个待办任务`);
```

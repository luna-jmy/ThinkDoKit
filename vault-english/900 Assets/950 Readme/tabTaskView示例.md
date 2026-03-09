---
cssclasses:
obsidianUIMode: preview
---

# Tab Task View 使用示例

## 基础用法 - 按文件夹查询待办任务

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "收件箱", folder: "000 Inbox", status: " " },
        { name: "项目", folder: "100 Projects", status: " " },
        { name: "领域", folder: "200 Areas", status: " " }
    ]
});
```

## 进阶用法 - 不同任务状态

### 示例 1: 查询推迟任务

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "全库-推迟", folder: "", status: ">" },
        { name: "项目-推迟", folder: "100 Projects", status: ">" }
    ]
});
```

### 示例 2: 查询备忘信息

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "备忘", folder: "", status: "information" },
        { name: "项目备忘", folder: "", status: "information" }
    ]
});
```

### 示例 3: 查询已完成任务

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "已完成", folder: "000 Inbox", status: "completed" },
        { name: "项目完成", folder: "100 Projects", status: "x" }
    ]
});
```

### 示例 4: 混合不同状态

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "待办", folder: "000 Inbox", status: " " },
        { name: "推迟", folder: "000 Inbox", status: ">" },
        { name: "备忘", folder: "000 Inbox", status: "information" },
        { name: "已完成", folder: "000 Inbox", status: "completed" }
    ]
});
```

## 完整示例 - 所有文件夹和状态

```dataviewjs
dv.view("TabTaskView", {
    tabs: [
        { name: "Inbox", folder: "000 Inbox", status: " " },
        { name: "Projects", folder: "100 Projects", status: " " },
        { name: "Areas", folder: "200 Areas", status: " " },
        { name: "Resources", folder: "300 Resources", status: " " },
        { name: "Archive", folder: "400 Archive", status: " " },
        { name: "Journal", folder: "500 Journal", status: " " },
        { name: "Zettelkasten", folder: "600 Zettelkasten", status: " " }
    ]
});
```

## 参数说明

### tabs 数组中的对象属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | Tab 按钮显示的名称 |
| `folder` | string | ❌ | 要查询的文件夹路径，留空或省略则查询所有文件夹 |
| `status` | string/array | ❌ | 任务状态筛选，默认为 `" "` (待办) |

### status 参数可选值

| 值 | 说明 | 示例 |
|---|---|---|
| `" "` | 待办任务 (默认) | `- [ ] 任务` |
| `">"` | 推迟任务 | `- [>] 任务` |
| `"information"` 或 `["i", "n", "!"]` | 备忘信息 | `- [i] 任务` |
| `"completed"` 或 `"x"` 或 `"X"` | 已完成任务 | `- [x] 任务` |
| `"cancelled"` 或 `["/", "-"]` | 已取消任务 | `- [-] 任务` |

## 混合视图 - 任务列表 + 日历

### 示例：文件夹任务 + 工作日日历

```dataviewjs
await dv.view("900 Assets/960 Scripts/tabTaskView", {
    tabs: [
        { name: "收件箱", folder: "000 Inbox", status: " " },
        { name: "项目", folder: "100 Projects", status: " " },
        { name: "工作日历", type: "calendar", calendar: "workdayCalendar" }
    ]
});
```

### 示例：所有视图类型混合

```dataviewjs
await dv.view("TabTaskView", {
    tabs: [
        { name: "所有待办", folder: "", status: " " },
        { name: "工作日历", type: "calendar", calendar: "workdayCalendar" },
        { name: "周日历", type: "calendar", calendar: "weeklyCalendar" },
        { name: "月日历", type: "calendar", calendar: "monthlyCalendar" }
    ]
});
```

### 示例：全库查询（不限制文件夹）

```dataviewjs
await dv.view("TabTaskView", {
    tabs: [
        { name: "所有待办", folder: "", status: " " },
        { name: "所有推迟", folder: "", status: ">" },
        { name: "所有备忘", folder: "", status: "information" },
        { name: "所有完成", folder: "", status: "completed" }
    ]
});
```

### 示例：混合查询（指定文件夹 + 全库）

```dataviewjs
await dv.view("TabTaskView", {
    tabs: [
        { name: "收件箱", folder: "000 Inbox", status: " " },
        { name: "全库待办", folder: "", status: " " },
        { name: "所有推迟", folder: "", status: ">" }
    ]
});
```

## 日历视图参数说明

### 新增参数（用于日历视图）

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | ❌ | 设置为 `"calendar"` 表示这是日历视图 |
| `calendar` | string | ❌ | 日历类型：`workdayCalendar`、`weeklyCalendar`、`monthlyCalendar` |

### 日历类型说明

| 值 | 说明 | 样式 |
|---|---|---|
| `workdayCalendar` | 工作日任务日历 | style11，适合工作日查看 |
| `weeklyCalendar` | 周任务日历 | style9，简洁的周视图 |
| `monthlyCalendar` | 月任务日历 | style9，月度概览 |


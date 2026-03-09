---
journal: Monthly
journal-date: 
type: monthly_review
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
created: <% tp.date.now() %>
tags:
  - journal/monthly
statistic: weight⚖️
---

# <% tp.file.title %> 月度日志

## 🎯 月度目标与计划  

### 本月目标  
- [ ] 

### 重点项目/任务  
- [ ] 

### 🔄 上月Rollover Todos
`button-staskRollover`


## 🤔 月度回顾与总结 
`button-supdate`

- [本月最大的成就/亮点::]
- [本月关键项目进展::]
- [本月遇到的挑战/问题::]
- [下月需要调整的地方::]
- [下月展望::]

## 📊月度数据统计
**本月开始/截止/完成的项目：**
```dataview
TABLE status, start_date as start, due_date as due, completion_date as done
FROM "100 Projects"
WHERE (start_date AND dateformat(date(start_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
   OR (completion_date AND dateformat(date(completion_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
   OR (due_date AND dateformat(date(due_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
SORT completion_date DESC
```

**本月任务完成统计：**  
```dataview
TABLE sum(rows.完成任务数) as 完成任务数
FROM "500 Journal/540 Daily"
WHERE journal-date AND dateformat(journal-date, "yyyy-MM") = "<% tp.date.now("YYYY-MM") %>"
FLATTEN length(filter(file.tasks, (t) => t.status = "x")) as 完成任务数
GROUP BY dateformat(file.day, "yyyy-MM") as Month
```

**本月每日任务完成统计：**  
```dataview
TABLE length(filter(file.tasks, (t) => t.completed = true)) as 完成任务数
FROM "500 Journal/540 Daily"
WHERE journal-date AND dateformat(journal-date, "yyyy-MM") = "<% tp.date.now("YYYY-MM") %>"
SORT file.day ASC
```

```dataviewjs
dv.view("annual-daily-task-stats")
```

>*如果要使用archive的日志计算，请将代码中的 `annual-daily-task-stats` 替换为 `monthly-archive-task-stats` （基于月志archive）*

## ✅ 习惯追踪与回顾

```dataviewjs
dv.view("journal-section-summary", { 
  sectionTitle: "### 打卡" 
})
```

```dataviewjs
dv.view("journal-section-summary", { 
  sectionTitle: "### 数据记录" 
})
```

```dataviewjs
await dv.view("dynamic-chart");
```

```dataviewjs
dv.view("journal-section-summary", { 
  sectionTitle: "## ✍️ 今日小结与回顾" 
})
```

## 📝 笔记与知识整理

- 本月新增的 Zettelkasten 笔记：
```dataview
TABLE 
  created as "创建时间",
  file.mtime as "修改时间",
  aliases as "卡片名称"
FROM "600 Zettelkasten"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date(this.journal-date + dur(1 month)), "yyyy-MM-dd"))
SORT created DESC
```

- 本月新增资源笔记：
```dataview
TABLE 
  file.ctime as "系统创建时间",
  created as "创建时间",
  status
FROM "300 Resources"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date(this.journal-date + dur(1 month)), "yyyy-MM-dd"))
SORT created DESC
limit 20
```

## 🔗 相关日志

<%* tR += `- **上月日志**：[[500 Journal/520 Monthly/${moment(tp.date.now("YYYY-MM"), "YYYY-MM").subtract(1, "month").format("YYYY-MM")}]]\n`; %>
<%* tR += `- **下月日志**：[[500 Journal/520 Monthly/${moment(tp.date.now("YYYY-MM"), "YYYY-MM").add(1, "month").format("YYYY-MM")}]]\n`; %>


```calendar-timeline
mode: month
```
```journals-home
show:
  - day
  - week
  - month
  - year
scale: 1
separator: " | "
```


---

`button-archiveJournal`


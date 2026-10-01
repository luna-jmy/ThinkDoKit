---
journal: Monthly
journal-date:
type: monthly_review
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
created: <% tp.date.now() %>
tags:
  - journal/monthly
statistic: reading🕓
obsidianUIMode: preview
calendar_source: '[month: <% tp.date.now("YYYY-MM") %>]'
---

# <% tp.file.title %> 月度日志

## 🎯 月度目标与计划  
***上月提醒***：
***上月展望***：

>[!info|noborder]+ **<% tp.file.title %>**
>```dataviewjs
>await dv.view("calendar-marker",{displayHead: false})
>```

### 本月目标  
`button-smonthlyGoal`

### 本月关注  
`button-smonthlyReminder`

---

### 上期未完成
`button-staskRollover`

---

## 🤔 月度回顾与总结 
`button-supdate`

- [本月最大的成就/亮点::]
- [本月关键项目进展::]
- [本月遇到的挑战/问题::]
- [下月需要调整的地方::]
- [下月展望::]

## 📝 笔记与知识整理

- 本月新增的 Zettelkasten 笔记：
```dataview
TABLE 
  created as "创建时间",
  file.mtime as "修改时间",
  aliases as "卡片名称"
FROM "600 Zettelkasten"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date((this.journal-date ?? date("2000-01-01")) + dur(1 month)), "yyyy-MM-dd"))
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
	AND created <= date(dateformat(date((this.journal-date ?? date("2000-01-01")) + dur(1 month)), "yyyy-MM-dd"))
SORT created DESC
limit 20
```

- 本月发布的文章
```dataview
TABLE 
  file.ctime as "系统创建时间",
  created as "创建时间",
  published as "发布状态"
FROM "400 Archive/410 我的输出"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date((this.journal-date ?? date("2000-01-01")) + dur(1 month)), "yyyy-MM-dd"))
SORT file.ctime DESC
limit 20
```

## 🔗 相关日志
<%* tR += `- **上月日志**：[[${moment(tp.date.now("YYYY-MM"), "YYYY-MM").subtract(1, "month").format("YYYY-MM")}]]\n`; %>
<%* tR += `- **下月日志**：[[${moment(tp.date.now("YYYY-MM"), "YYYY-MM").add(1, "month").format("YYYY-MM")}]]\n`; %>

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



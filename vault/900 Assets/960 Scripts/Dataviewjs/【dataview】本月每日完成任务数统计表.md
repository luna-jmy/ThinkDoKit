---
created: 2025-09-28
area: Obsidian
type: query
status: archived
priority: 4
tags:
source: "[[TPL-Monthly]]"
keywords:
  - 备份
---

**本月每日任务完成统计：**  
>*样式：两栏列表，日志链接+任务完成数。* 
>*来源：月日志模板，已从模板中删除，备份用*

````
```dataview
TABLE length(filter(file.tasks, (t) => t.completed = true)) as 完成任务数
FROM "500 Journal/540 Daily"
WHERE journal-date AND dateformat(journal-date, "yyyy-MM") = "<% tp.date.now("YYYY-MM") %>"
SORT file.day ASC
```
````



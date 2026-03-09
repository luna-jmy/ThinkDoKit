---
journal: Annual
journal-date:
type: annual_review
year: <% tp.date.now("YYYY") %>
created: <% tp.date.now() %>
tags:
  - journal/annual
cssclasses:
  - matrix
Finance: 1
Social: 1
FunRecreation: 1
PersonalGrowth: 1
HealthFitness: 1
LoveRelationships: 1
CareerWork: 1
Spiritual: 1
---

# <% tp.file.title %> 年度日志

## 🚀 年度目标回顾与设定

### <% tp.date.now("YYYY", "P-1Y") %> 年目标回顾
- [ ] 目标一回顾：完成情况，经验总结
- [ ] 目标二回顾：完成情况，经验总结
- ...

### <% tp.date.now("YYYY") %> 年核心目标
- [ ] 目标一：具体内容
- [ ] 目标二：具体内容
- ...

> *提示1: 可以使用 Tasks 语法设定目标，方便年度/月度/周度回顾时追踪进度。*

> *提示2: 可以根据生命之轮（Wheel of Life）从情绪健康、职业发展、亲密关系、身体健康、个人成长、休闲娱乐、社交生活、财务状况等8个维度设定年度目标。*

```dataviewjs
dv.view("wheel-of-life-interactive")
```

## ✨ 年度高光时刻与挑战

- 高光时刻 1:
- 高光时刻 2:
- ...
- 挑战 1:
- 挑战 2:
- ...

## 🤔 对未来的思考与规划

- ...

## 🌱 个人成长与学习

- 在知识领域 X 的进展:
- 掌握的新技能:
- 重要的书籍/课程/资源:

## 🚧 项目回顾
回顾本年度主要项目完成情况。

```dataview
TABLE status, created, completion_date
FROM "100 Projects"
WHERE (created AND dateformat(date(created), "yyyy") = "2025")
   OR (completion_date AND dateformat(date(completion_date), "yyyy") = "2025") AND (type = "project")
SORT completion_date DESC
```

> *提示: Dataview 查询会列出在本年创建或完成的项目笔记 。*

## 📊 年度数据统计
汇总年度任务、笔记等数据。

```dataviewjs
dv.view("annual-daily-task-stats")
```

>*使用archive的日志计算，请将代码中的 `annual-daily-task-stats` 替换为 `weekly-archive-task-stats` （基于周志archive）或者 `monthly-archive-task-stats` （基于月志archive）*

> *提示: 此 Dataview 示例统计每日完成任务数的月度汇总。*

## 🔗 相关笔记

- [[<% tp.date.now("YYYY", "P-1Y") %>]] 年度日志
- <% tp.date.now("YYYY") %> 年月度日志 Index
	- [[<% tp.date.now("YYYY-01") %>]]
	- [[<% tp.date.now("YYYY-02") %>]]
	- [[<% tp.date.now("YYYY-03") %>]]
	- [[<% tp.date.now("YYYY-04") %>]]
	- [[<% tp.date.now("YYYY-05") %>]]
	- [[<% tp.date.now("YYYY-06") %>]]
	- [[<% tp.date.now("YYYY-07") %>]]
	- [[<% tp.date.now("YYYY-08") %>]]
	- [[<% tp.date.now("YYYY-09") %>]]
	- [[<% tp.date.now("YYYY-10") %>]]
	- [[<% tp.date.now("YYYY-11") %>]]
	- [[<% tp.date.now("YYYY-12") %>]]

```journals-home
show:
  - day
  - week
  - month
  - year
scale: 1
separator: " | "
```




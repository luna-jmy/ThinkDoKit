---
journal: Weekly
journal-date:
type: weekly_review
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
week: <% tp.date.now("[W]w") %>
created: <% tp.date.now() %>
tags:
  - journal/weekly
---

# <% tp.file.title %> 周日志

## 🎯 本周焦点与目标
***上周提醒***：`$={const m=dv.current().file.name.match(/(\d{4})-W(\d+)/);const w=parseInt(m[2])-1;const y=w>0?parseInt(m[1]):parseInt(m[1])-1;const f=y+"-W"+(w>0?w:52).toString().padStart(2,"0");const p=dv.pages('"500 Journal/530 Weekly"').find(p=>p.file.name===f);p?p["下周需要调整的地方"]:"未找到"+f+"日志或字段"}`
***上周展望***：`$={const m=dv.current().file.name.match(/(\d{4})-W(\d+)/);const w=parseInt(m[2])-1;const y=w>0?parseInt(m[1]):parseInt(m[1])-1;const f=y+"-W"+(w>0?w:52).toString().padStart(2,"0");const p=dv.pages('"500 Journal/530 Weekly"').find(p=>p.file.name===f);p?p["下周展望"]:"未找到"+f+"日志或字段"}`

## 🚧 本周计划
`button-sweeklyPlan`


## 上期未完成
`button-staskRollover`


## 🤔 周末回顾与总结 
`button-supdate`

- [本周成就/亮点::]
- [本周关键项目/计划进展::]
- [本周遇到的挑战/问题::]
- [下周需要调整的地方::]
- [下周展望::]

## 🎥 娱乐放松 / 亲子
>*户外、观影、游戏、煲剧等娱乐放松安排*


## 💡 积累与思考

- 本周新增的 Zettelkasten 笔记：
```dataview
TABLE 
  created as "创建时间",
  file.mtime as "修改时间",
  aliases as "卡片名称"
FROM "600 Zettelkasten"
WHERE created >= this.journal-date AND created < this.journal-date + dur("7 days")
SORT created DESC
```

- 本周新增资源笔记：
```dataview
TABLE 
  file.ctime as "系统创建时间",
  created as "创建时间",
  status
FROM "300 Resources"
WHERE created >= this.journal-date AND created < this.journal-date + dur("7 days")
SORT file.ctime DESC
limit 20
```

## 📒 本周日志汇总

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
dv.view("journal-section-summary", { 
  sectionTitle: "## ✍️ 今日小结与回顾" 
})
```

## 🔄 本周任务跟踪回顾
### 本周日志任务跟踪（按截止日期）
>*提示: 此查询汇总本周截止日期的未完成任务。可以根据需要调整过滤条件（如包含特定标签或路径，不会写查询语法的话请直接问DeepSeek如何修改）。*

> *注意：此模板日期范围基于当前周日期，生成历史周日志需手动调整时间范围。*

```tasks
not done
path includes 500 Journal/540 Daily
happens on or after <% moment().startOf('isoWeek').format('YYYY-MM-DD') %>
happens on or before <% moment().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD') %>
filter by function task.status.symbol === ' '
sort by path
sort by priority reverse
short mode
```

### 本周已完成任务回顾

```tasks
done
path includes 500 Journal/540 Daily
happens on or after <% moment().startOf('isoWeek').format('YYYY-MM-DD') %>
happens on or before <% moment().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD') %>
sort by path
sort by priority reverse
short mode
```

>*提示: 此查询汇总本周已完成的任务。*

>*注意：此模板日期范围基于当前周日期，生成历史周日志需手动调整时间范围。*

## 🔗 相关日志

- [[<% tp.date.now("YYYY-MM") %>]] 月度日志
- [[<% tp.date.now("YYYY-[W]w", -7) %>]] 周日志
- [[<% tp.date.now("YYYY-[W]w", 7) %>]] 周日志

```calendar-timeline
mode: week
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

> *提示: 避免日志数量膨胀过快，建议按周或按月进行日志归档。*
---
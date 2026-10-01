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
***上周提醒***：`$={const m=dv.current().file.name.match(/(\d{4})-W(\d+)/);const w=parseInt(m[2])-1;const y=w>0?parseInt(m[1]):parseInt(m[1])-1;const f=y+"-W"+(w>0?w:52).toString().padStart(2,"0");const p=dv.pages('"500 Journal"').where(p=>/^\d{4}-W\d{1,2}$/.test(p.file.name)).find(p=>p.file.name===f);p?p["下周需要调整的地方"]:"未找到"+f+"日志或字段"}`
***上周展望***：`$={const m=dv.current().file.name.match(/(\d{4})-W(\d+)/);const w=parseInt(m[2])-1;const y=w>0?parseInt(m[1]):parseInt(m[1])-1;const f=y+"-W"+(w>0?w:52).toString().padStart(2,"0");const p=dv.pages('"500 Journal"').where(p=>/^\d{4}-W\d{1,2}$/.test(p.file.name)).find(p=>p.file.name===f);p?p["下周展望"]:"未找到"+f+"日志或字段"}`

**周例会**：[[<% moment(tp.frontmatter["journal-date"]).add(1, 'day').format('YYYYMMDD') %> Weekly Meeting]]

**本周周会待办**：
```tasks
not done
path includes <% moment(tp.frontmatter["journal-date"]).add(1, 'day').format('YYYYMMDD') %> Weekly Meeting
filter by function task.status.symbol === ' '
sort by path
sort by priority reverse
short mode
```

---

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

---

## 🎥 娱乐放松 / 亲子
`button-stodoRecreation`


---

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
  created as "创建时间",
  aliases as "别名",
  status
FROM "300 Resources"
WHERE created >= this.journal-date AND created < this.journal-date + dur("7 days")
SORT file.ctime DESC
limit 20
```

- 本周发布文章
```dataview
TABLE 
  publish-date as "发布时间",
  created as "创建时间",
  status
FROM "400 Archive/410 我的输出"
WHERE publish-date >= this.journal-date AND publish-date < this.journal-date + dur("7 days")
SORT created DESC
limit 20
```

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


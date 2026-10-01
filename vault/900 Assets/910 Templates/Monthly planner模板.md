---
created: 2025-09-18
aliases:
  - 月记
tags:
  - monthly
特殊事件: 
remark: 
纪念日:
---

## Monthly Work Plan #work


## Reminders #todo 



---

## Wheel of Life (Monthly Milestones)
- 灵性成长 Spiritual / Spiritual Health / Emotional Health
- 职业发展 Career/Work  / Career & Mission  
- 亲密关系 Love/Relationships  / Intimate Relationship  
- 健康管理 Health/Fitness  / Physical Health & Body
- 个人成长 Personal Growth  / Consistent Growth / Contribution
- 娱乐休闲 Fun/Recreation  / Fun & Excitement
- 社交生活 Social  / Family & Friends  
- 财务状况 Finance  

---
## Calendar

![[2025#<% tp.date.now("YYYY-MM") %>]]

## Tracker

`````col
````col-md
flexGrow=3
===
```tracker
searchType: frontmatter
searchTarget: 冥想次数
folder: DailyNotes
startDate: <% moment(tp.date.now("YYYY-MM")).startOf('month').format("YYYY-MM-DD") %>
endDate: <% moment(tp.date.now("YYYY-MM")).endOf('month').format("YYYY-MM-DD") %>
line:
    title: 冥想次数
    yAxisLabel: 次数
    yAxisUnit: 天
    lineColor: "#d65d0e"
    pointSize: 5
    pointColor: white
    pointBorderWidth: 2
    pointBorderColor: "#d65d0e"
```
````

````col-md
flexGrow=1
===
```tracker
searchType: frontmatter
searchTarget: 冥想次数
folder: DailyNotes
startDate: <% moment(tp.date.now("YYYY-MM")).startOf('month').format("YYYY-MM-DD") %>
endDate: <% moment(tp.date.now("YYYY-MM")).endOf('month').format("YYYY-MM-DD") %>
bullet:
    title: "冥想"
    dataset: 0
    orientation: vertical
    range: 10, 30, 50
    rangeColor: darkgray, silver, lightgray
    value: "{{sum()}}"
    valueUnit: 累积次数
    valueColor: steelblue
    showMarker: true
    markerValue: 40
    markerColor: red
```
````
`````

`````col
````col-md
flexGrow=2
===
```tracker
searchType: frontmatter
searchTarget: 运动时长
folder: DailyNotes
startDate: <% moment(tp.date.now("YYYY-MM")).startOf('month').format("YYYY-MM-DD") %>
endDate: <% moment(tp.date.now("YYYY-MM")).endOf('month').format("YYYY-MM-DD") %>
line:
    title: 运动时长
    yAxisLabel: 分钟
    yAxisUnit: 天
    lineColor: "#d65d0e"
    pointSize: 5
    pointColor: white
    pointBorderWidth: 2
    pointBorderColor: "#d65d0e"
```
````

````col-md
flexGrow=1
===
```tracker
searchType: frontmatter
searchTarget: 运动时长
folder: DailyNotes
startDate: <% moment(tp.date.now("YYYY-MM")).startOf('month').format("YYYY-MM-DD") %>
endDate: <% moment(tp.date.now("YYYY-MM")).endOf('month').format("YYYY-MM-DD") %>
bullet:
    title: "运动"
    dataset: 0
    orientation: vertical
    range: 100, 300, 600
    rangeColor: darkgray, silver, lightgray
    value: "{{sum()}}"
    valueUnit: 累计分钟
    valueColor: steelblue
    showMarker: true
    markerValue: 100
    markerColor: red
```
````
`````

---

## Reminders
%%搜索DailyNotes文件夹下的所有提醒%%
```tasks
not done
path includes DailyNotes
filename includes <% tp.date.now("YYYY-MM") %>
(filter by function task.status.symbol === '<') OR (filter by function task.status.symbol === 'i')
filter by function task.status.symbol !== '>'
sort by due date
sort by filename
hide backlink
```

## Pending todos in DailyNotes
%%搜索DailyNotes文件夹下的本月未完成任务%%
```tasks
not done
path includes DailyNotes
filename includes <% tp.date.now("YYYY-MM") %>-
filter by function task.status.symbol !== '>'
sort by due date
sort by filename
hide backlink
```



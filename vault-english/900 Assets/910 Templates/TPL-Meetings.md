---
created: <% tp.date.now("YYYY-MM-DD") %>
scheduled: <% tp.date.now("YYYY-MM-DD HH:mm") %>
area: 
type: memo_work
tags:
  - context/meeting
status: active
due_date: 
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
会议类型: 
会议发起人: 
会议地点: 
参会人员:
---

## 📤 会议目标 Desired Outcome 
>*举行会议的目的？*

## 🗓️ 会议时间安排 Agenda 
>*是否是例会？如果是例会，记录例会时间，如：周例会在每周二，此处记录每周二。此项考虑移入元数据*

## 📋会议记录 Meeting Minutes 



## 📝 会议决议 Discussion Results 
>*会议有哪些决定事项？*


## ✔️ 跟进事项 Action Items 
>*需要会后跟进的行动事项，用Tasks插件语法记录*


## 🤝小结 Summary 
>*会议要点总结*



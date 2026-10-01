---
created: <% tp.date.now("YYYY-MM-DD") %>
scheduled: <% tp.date.now("YYYY-MM-DD 10:00") %>
area: CIMS工作
type: meeting
tags:
  - context/meeting
  - work
status: active
due_date: <% tp.date.now("YYYY-MM-DD",14) %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
会议类型: 周例会
会议发起人: 张三
会议地点: 线上-Teams
参会人员: HR工作小组（张三, 李四, 王五, 赵六, 钱七）
---

## 📋会议记录 Meeting Minutes 
### 我的汇报
- 

### 会议记录

#### Key Comments from 张三
- 

#### Selina Shen
- 

#### Nick Han
- 


#### Jill Yu
- 


## 📝 会议决议 Discussion Results 
>*会议有哪些决定事项？*


## ✔️ 跟进事项 Action Items 
>*需要会后跟进的行动事项，用Tasks插件语法记录*


## 🤝小结 Summary 
>*会议要点总结*



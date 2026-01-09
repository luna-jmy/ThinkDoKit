---
created: <% tp.date.now("YYYY-MM-DD") %>
project-id: "{{date:YYYYMM}}"
area:
type: project
objective:
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
start_date:
due_date:
completion_date:
progress:
context:
tags:
  - project
project-leader:
project-members:
---

# 🚧 项目: <% tp.file.title %>

## 🎯 项目目标
>*项目的最终成果描述或项目期望达成的具体成果*

***

## 项目分解
>*将复杂项目分解成可执行的小项目。*

### 子项目/任务1


### 子项目/任务2


### 子项目/任务3


`button-generateGantt`

## 项目资料与笔记 (Resources & Notes)
>*记录项目相关的思考、讨论、会议记录链接、收集的资料、头脑风暴等非任务性的内容。*

`button-sfolderLink` | `button-smoveLink` | `button-sfolderArchive`

🔗 关联笔记 (Related Notes): 


---

## 项目回顾与更新 (Review & Updates) 
>*定期（例如每周 GTD 回顾时）记录项目进展、遇到的问题、关键决策和调整。*

`button-supdate`  `button-sprogress`

>[!note]- ### 项目进度
>
>- [Review时间::]
>- [进展::]
>- [问题::]
>- [下一步计划::]
>- [关键调整::]

```dataviewjs
await dv.view("900 Assets/960 Scripts/Dataviewjs/dataview_inline_fields_table", {mode: "current"})
```

---



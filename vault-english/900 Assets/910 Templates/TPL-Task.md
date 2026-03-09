---
type: task
tags:
  - GTD/task
  - task
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
project: 
area: 
context: 
deadline: 
scheduled: 
created: 
completed: false
completion_date:
---

# ✅ 子项目/任务: <% tp.file.title %>
> *此笔记用于管理不适合直接嵌入到日记或项目笔记中的复杂/独立的任务。这类任务在GTD中也被定义为项目，但相对于正式的项目而言，复杂度较低，也更易于执行。其他日常任务管理请优先在日记或项目笔记中记录。*

## 📝 任务描述 (Description):
>*在此处详细说明任务的具体内容、背景和要求。*

### 🎯 目标结果 (Outcome):
>*完成此任务后期望达成的具体、可衡量的成果是什么？*

### ⏳ 预计耗时 (Estimated Time):
>*完成此任务预计需要多少时间？例如：30m, 1h, 2d。*

### 🔗 相关信息 (Related Information)
>*链接到与此任务相关的其他笔记、文档、网页或文件。*

- [[相关笔记 A]]
- [外部链接 B](http://example.com)
- [[相关附件.pdf]]

## 📝 子步骤或检查清单 (Sub-tasks/Checklist)
>*将复杂的任务分解为可执行的子步骤。*

- [ ] 子步骤 1
- [ ] 子步骤 2
- [ ] 子步骤 3

## 🤔 注意事项与思考 (Notes & Considerations)
>*记录执行任务过程中的额外想法、障碍、需要注意的细节等。*

- ...

## 🔄 执行记录/备注 (Execution Log/Notes)
>*按时间顺序记录任务执行的进展、遇到的问题、决策过程或心得。使用QuickAdd插入时间戳*

>*范例：*
>*- {{date:YYYY-MM-DD HH:mm:ss}}: 开始处理任务。*
>*- {{date:YYYY-MM-DD HH:mm:ss}}: 遇到了问题 X，暂时搁置，状态更新为 Waiting。*
>*- {{date:YYYY-MM-DD HH:mm:ss}}: 问题解决，继续执行。*


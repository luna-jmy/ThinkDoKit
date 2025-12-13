---
created: <% tp.date.now("YYYY-MM-DD") %>
type: memo_work
area: 
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
due_date: 
tags: 
keywords: 
source:
---

# <% tp.file.title %>


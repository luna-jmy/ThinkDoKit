---
created: <% tp.date.now("YYYY-MM-DD") %>
area: 
type: content-hub
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
due_date: 
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
tags:
  - content-hub
target_platform:
---

# 领域: <% tp.file.title %>

## 领域描述
>*这个内容项目要达成什么目标？希望产生什么影响？*

## 学习目标
>*你的内容是给谁看的？他们的需求是什么？*

> [!info]- 项目状态与时间线
状态: `=this.file.link.status`
创建日期: `=this.file.link.date_created`
预计完成日期: `=this.file.link.due_date`

>*项目状态与时间线是自动链接笔记属性的行内代码，新建笔记有时不能正常更新内容，关闭笔记重新打开就好了。*

## 相关笔记与资源

### 灵感与想法
- [[链接到相关的想法捕获笔记 1]]
- [[链接到相关的想法捕获笔记 2]]

### 相关内容研究
- [[链接到相关内容研究笔记]]

### 内容大纲
- [[链接到相关内容大纲笔记]]

### 章节草稿
- [[链接到相关内容草稿]]

### 反链列表
```dataview
LIST
FROM [[]]
WHERE file.name != this.file.name
SORT file.mtime DESC
```




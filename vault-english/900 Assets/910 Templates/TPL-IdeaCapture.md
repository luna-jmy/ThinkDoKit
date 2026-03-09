---
created: <% tp.date.now("YYYY-MM-DD") %>
uid: "{{date:YYYYMMDDHHmmss}}"
area: 
type: idea
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
due_date: 
tags:
  - idea
  - inspiration
source:
---

# 灵感想法: <% tp.file.title %>

## 初步思考 / 关键词
>*与此想法相关的初步思考或联想到的关键词。*

## 想法内容
>*在这里快速记录你的灵感点，可以是一句话、一个段落、一个关键词。*

## 可能关联的主题/笔记
- [[可能是哪个领域的想法？]]
- [[可能与哪个已有笔记相关？]]

## 后续行动
- [ ] 将此想法转化为内容输出：
- [ ] 将此想法转化为内容研究笔记：
- [ ] 将此想法提炼为Zettelkasten 知识卡片： 
- [ ] 将此想法添加到一个内容项目中心的想法列表中：
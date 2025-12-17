---
created: <% tp.date.now("YYYY-MM-DD") %>
area: 
type: content-outline
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
due_date: 
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
tags:
  - outline
target_format: 
target_platform: 
content_hub:
---

# 内容大纲: <% tp.file.title %>

## 目标与受众
>*这篇内容的目标是什么？核心信息是什么？目标受众是谁？*

## 核心观点
>*列出本文/视频要阐述的几个主要观点。*

## 结构规划

### 引言 (Introduction)
* 抓人眼球的开头
* 背景介绍
* 提出问题/引入主题
* 本文/视频将涵盖的主要内容预告
[[链接到相关的想法捕获笔记]]

### 第一部分: {{value:章节/段落标题}}
* 要点 1
    * 支撑材料/论据 1
    * [[链接到相关的研究笔记或知识卡片]]
* 要点 2
    * 支撑材料/论据 2
    * [[链接到相关的研究笔记或知识卡片]]

### 第二部分: ... (重复上述结构)

### 结论 (Conclusion)
* 总结核心观点
* 提出行动号召 (Call to Action)
* 展望未来/延伸思考
[[链接到相关的思考笔记]]

## 待办事项
- [ ] 完成第一部分草稿 📅 YYYY-MM-DD ⏳YYYY-MM-DD [[链接到内容项目中心笔记]]
- [ ] 收集更多关于 [[某个概念]] 的研究资料
- [ ] 请 [[某人]] 审阅大纲

## 草稿链接
[[链接到草稿笔记]]
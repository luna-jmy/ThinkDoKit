---
created: <% tp.date.now("YYYY-MM-DD") %>
area: 
type: research-note
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
due_date: 
tags:
  - research
source_type: <% tp.system.suggester(["文章","学术文献","书籍","课程","其他"],["articles","references","books","courses","others"],false,"请选择笔记类型") %>
source_title: <% tp.system.prompt("请输入来源标题") %>
source_author: <% tp.system.prompt("请输入作者") %>
source_url: <% tp.system.prompt("请输入来源链接") %>
keywords: 
content_hub:
---

# 学习笔记: <% tp.file.title %>

```button
name 点击按钮移动笔记
type command
action Templater: Insert JS-ResearchNoteMove
color blue
```
%%根据笔记属性source_type移动笔记至300 Resouces对应子文件夹%%

> [!info]- 来源信息
类型: `=this.file.link.source_type`
标题: `=this.file.link.source_title`
作者: `=this.file.link.source_author`
链接: `=this.file.link.source_url`

>*来源信息是自动链接笔记属性的行内代码，新建笔记有时不能正常更新内容，关闭笔记重新打开就好了。*

## 核心观点 / 摘要
>*用自己的话概括该来源的核心思想和主要内容。*


## 关键引文
> *重要的原文引用。记得标注页码或时间戳。*


## 我的思考 / 分析 / 总结
>*对该来源内容的理解、评价、与已知知识的对比、引发的疑问等。*


## 行动转化
>*从资料中筛选出“要做的事情”记录下来，把知识转化为具体、可执行的行动计划。*


## 可提炼的知识点 (链接到常青笔记)
- [[该来源提到的某个概念的常青笔记]]
- [[该来源支持的某个论点的常青笔记]]

## 相关内容 / 项目
- [[关联的内容中心笔记名称]]
- [[关联的项目笔记名称]]

## 相关研究笔记
- [[与此相关的其他研究笔记]]
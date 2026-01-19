---
created: <% tp.date.now("YYYY-MM-DD") %>
area:
type: content-hub
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
due_date:
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
tags:
  - content-hub
mastery_level: <% tp.system.suggester(["入门","进阶","精通","专家"],["beginner","intermediate","advanced","expert"],false,"请选择掌握程度") %>
---

# 知识地图: <% tp.file.title %>

我来帮你把这个内容项目管理模板改造成领域知识hub模板。以下是改造后的版本：

> [!info]- 知识库状态
状态: `=this.file.link.status`
创建日期: `=this.file.link.date_created`
掌握程度: `=this.file.link.mastery_level`
知识领域: `=this.file.link.area`

## 领域概述
>*这个知识领域涵盖什么内容？它的边界和范围是什么？*

## 核心概念与框架
### 基础概念
- 

### 核心理论
- 

### 重要模型
- 

## 知识结构
### 分类体系
```
领域名称/
├── 基础概念/
├── 核心理论/
├── 实践应用/
├── 工具方法/
└── 进阶主题/
```

### 知识图谱
- 

## 学习路径

### 入门路径
1. 
2. 
3. 

### 进阶路径
1. 
2. 
3. 

### 专家路径
1. 
2. 
3. 

## 相关笔记与资源

### 基础知识
- 

### 核心理论
- 

### 实践案例
- 

### 工具资源
- 

### 外部资源
- 

## 知识网络

```dataview
TABLE WITHOUT ID 
	file.link as "相关笔记", 
	file.mtime as "更新时间", 
	file.folder as "位置" 
FROM [[]] 
WHERE file.name != this.file.name 
SORT file.mtime 
DESC 
LIMIT 20
```

---

## 维护记录
- `<% tp.date.now("YYYY-MM-DD") %>`: 创建知识地图
- 


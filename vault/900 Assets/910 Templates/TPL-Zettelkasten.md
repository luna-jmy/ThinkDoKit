---
created: "{{date:YYYY-MM-DD}}"
uid: "{{date:YYYYMMDDHHmmss}}"
aliases:
  - <% tp.system.prompt("请输入卡片名称") %>
area:
type: knowledge-card
status: <% tp.system.suggester(["未开始/待启动","起草/构思中","执行中","暂停","完成","取消","归档"],["inbox","draft","active","on-hold","completed","cancelled","archived"], "请选择项目状态") %>
priority: <% tp.system.suggester(["最高","高","中","低","最低"],["1","2","3","4","5"],false,"请选择任务优先级") %>
due_date:
tags:
  - knowledge
  - zettelkasten
source:
keywords:
---

## ⚛️ 核心内容 (Atomic Idea)
>*在此处用你自己的话清晰、简洁地阐述一个独立的知识点或想法。*
>*原则: 确保每张卡片只专注于一个最小、最独立的知识单元或概念。*


---

## 🤔 思考与联系
%%相似观点/概念、冲突观点/概念、补充了哪些观点/概念、拓展（领域）、延申（问题）%%
>*这个新的知识点与我已有的哪些知识、概念或笔记相关？它支持、反对、补充了哪些观点？它引发了哪些新的思考或问题？*



## 🔗 参考文献/来源 (Source/References)
>*文献：请明确记录此知识点来自哪个原始文献、书籍、文章或笔记。这有助于追溯信息来源。*
>*来源：链接到你在 `300 Resources/` 文件夹下创建的原始资料笔记（如读书笔记、文献笔记）或来源网站、附件。*
- 

## ➡️ 后续思考/行动
>*基于这个知识卡片，是否有任何需要你进一步探索、研究或采取行动的事项？如为某个关联概念建立研究笔记、在某个关联笔记中引用此卡片、学习某个相关概念*
- [ ] 

---

🔗 关联此卡片的笔记 (Obsidian 内置反向链接)：
```dataview
LIST
FROM [[]]
WHERE file.name != this.file.name
SORT file.mtime DESC
```

>*反链有助于发现意外的连接和查看当前卡片在整个知识网络中的位置。Obsidian 的反向链接面板会自动显示所有链接到当前笔记的笔记。也可以通过上述dataview查询手动在此区域添加反链列表。*
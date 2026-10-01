---
created: 2025-01-17
tags:
  - favorite
cssclasses:
  - kanban
obsidianUIMode: preview
---

## ✅2025已读书籍

![[书籍管理.base#2025 Reading]]

阅读状态 = "✅" or 阅读状态 = "已读"

---

## 在读书籍
```dataview
List 
	without id
	"📙" + file.link + "最后一次阅读是" + date(读完时间) + ""
From "300 Resources/330 Books/331 BookInfo"
Where created > date(2023-01-01) AND (阅读状态 = "📙" or 阅读状态 = "在读")
Sort 结束时间
```

阅读状态 = "📙" or 阅读状态 = "在读"

---

## 待读书籍
```dataview
List 
From "300 Resources/330 Books/331 BookInfo"
Where (阅读状态 = "📆" or 阅读状态 = "未读" or 阅读状态="想读")
Sort 录入时间
```

阅读状态 = "📆" or 阅读状态 = "未读" or 阅读状态="想读"


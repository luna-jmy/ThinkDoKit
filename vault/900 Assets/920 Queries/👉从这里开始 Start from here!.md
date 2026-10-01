---
created: 2026-04-10
obsidianUIMode: preview
obsidianEditingMode: live
cssclasses:
  - fullwidth
  - kanban
---

```dataviewjs
await dv.view("year-timeline-1", { events: [['5/5', '春林生日', '♉'], ['6/17', '泡泡生日', '♊'], ['12/4', '我生日', '♐']]})
```
>[!blank] ***每日金句***
>`$={await dv.view("random-quote3")}`

## 基本信息
- 📃File Count: `$=dv.pages().length`
- 📒Note Count: `$=dv.pages().length - dv.pages('"900 Assets"').length`
- 📓Daily logs: `$=dv.pages('"500 Journal"').where(p=>/^\d{4}-\d{2}-\d{2}$/.test(p.file.name)).length`
- 📖Book Count: `$=dv.pages('"300 Resources/330 Books/331 BookInfo"').length`

## 快速跳转
-   🔄 Recent 5 file updates `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- ✍️ Recent 5 thoughts `$=dv.list(dv.pages('"300 Resources/370 MyContent"').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- 🔖 Tagged: 5 favorites `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(5).file.link)`

## 快速开始
- `button-newNote`
  
  `button-newMeeting`
- `button-pomodora`
  
  `button-llmwiki`
- `button-newWorkMemo`
  
  `button-newPersonalMemo`

---

- ### 任务和项目
  `button-dailyJournal`
  `button-weeklyJournal`
  `button-monthlyJournal`
  `button-yearlyJournal`
  `button-projectNote`
  `button-taskNote`

- ### 内容创作
  `button-ideaNote`
  `button-contentResearch`
  `button-contentOutline`
  `button-contentHub`

- ### 知识管理
  `button-zettelkasten`
  `button-ResearchNote`
	- [[【说明文档】Spaced Repetition (Flashcard)|如何使用闪卡？]]

---


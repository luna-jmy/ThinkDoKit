---
obsidianUIMode: preview
cssclasses:
  - fullwidth
  - kanban
  - matrix
type: homepage
---

***每日书摘***：`$={await dv.view("random-quote",{tag: "#content/观点"})}`

>[!kanban|noborder,nowrap,grid]- Tips
>
|     |     |
| --- | --- |
| ![[主页Tips#初次使用小贴士]]    |  ![[主页Tips#速查表]]   |

>[!kanban|noborder,notitle] ### 库信息
>- 📃File Count: `$=dv.pages().length`
>- 📒Note Count: `$=dv.pages().length - dv.pages('"900 Assets"').length`
>- 📓Daily logs: `$=dv.pages('"500 Journal/540 Daily"').length`
>- 📖Book Count: `$=dv.pages('"300 Resources/330 Books/331 BookInfo"').length`

>[!kanban|noborder,notitle]+ ### 快速跳转
>-   🔄 Recent 5 file updates `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
>- ✍️ Recent 5 journals `$=dv.list(dv.pages('"500 Journal"').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
>- 🔖 Tagged: 5 favorites `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(5).file.link)`

```dataviewjs
await dv.view("year-timeline-1", { theYear: 2026, events: []})
```

## 快速开始
- `button-newNote`
  
  `button-newMeeting`
- `button-pomodora`
  
  `button-newBook`
- `button-newWorkMemo`
  
  `button-newPersonalMemo`


## 新建笔记
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
  
	- [[Readme-Flashcard|如何使用闪卡？]]


---

## 任务日历

```dataviewjs
await dv.view("900 Assets/960 Scripts/tabTaskView", {
    tabs: [
        { name: "工作日历", type: "calendar", calendar: "workdayCalendar" },
        { name: "周日历", type: "calendar", calendar: "weeklyCalendar" },
        { name: "月日历", type: "calendar", calendar: "monthlyCalendar" }
    ]
});
```
---





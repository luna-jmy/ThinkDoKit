---
created: 2025-10-06
cssclasses:
  - kanban
type: note
obsidianUIMode: preview
---
## Basic Info
- 📃File Count: `$=dv.pages().length`
- 📒Note Count: `$=dv.pages().length - dv.pages('"900 Assets"').length`
- 📓Daily logs: `$=dv.pages('"500 Journal"').where(p=>/^\d{4}-\d{2}-\d{2}$/.test(p.file.name)).length`
- 📖Book Count: `$=dv.pages('"300 Resources/330 Books/331 BookInfo"').length`

## Quick Jump
-   🔄 Recent 5 file updates `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- ✍️ Recent 5 thoughts `$=dv.list(dv.pages('"300 Resources/370 MyContent"').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- 🔖 Tagged: 5 favorites `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(5).file.link)`

## 快速开始
- `button-newNote`
  `button-newMeeting`
- `button-pomodora`
  `button-newBook`
- `button-newWorkMemo`
  `button-newPersonalMemo`


## Tags Info

- 标签个数：`$={const f=dv.pages();const tags=f.file.tags;tags.filter(t=>t!="#").length}`
- 标签： `$={const a=new Set();dv.pages().forEach(p=>{if(p.file.tags)p.file.tags.forEach(t=>{if(t!="#")a.add(t)})});a.size}`
- 有标签的笔记：`$={dv.pages().filter(p=>p.file.tags&&p.file.tags.length>0).length}`
- 本笔记标签数：`$={const f=dv.current();const tags=f.file.tags;tags.filter(t=>t!="#").length}`

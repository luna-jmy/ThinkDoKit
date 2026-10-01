---
created: 2025-09-18
cssclasses:
  - fullwidth
---

```dataviewjs
await dv.view("tasksCalendar", {pages: "dv.pages().file.tasks.where(t => !t.tags.includes('#exclude'))", view: "month", firstDayOfWeek: "1", options: "style1 filter"})
```


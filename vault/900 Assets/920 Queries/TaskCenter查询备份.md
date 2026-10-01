---
created: 2026-02-24
---


````

[list2card|addClass(ab-col5)]

- Vault Todo
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => !t.completed && t.status === " " && !t.text.includes("#exclude")).length`
- Postponed
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === ">" && !t.text.includes("#exclude")).length`
- Information
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === "i" || t.status === "n" || t.status === "!" && !t.text.includes("#exclude")).length`
- Cancelled
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.status === "/" || t.status === "-" && !t.text.includes("#exclude")).length`
- Vault Done
  `$=dv.pages().where(p => !p.file.path.includes("900 Assets")).file.tasks.filter(t => t.completed || t.status === "x" || t.status === "X" && !t.text.includes("#exclude")).length`

---

[list2tab]

- 000 Inbox
	- Inbox:
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 000 Inbox 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
- 100 Projects
	- Projects
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 100 Projects 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  is not blocked
	  group by filename
	  ```
- 200 Areas
	- Areas
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 200 Areas 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
- 300 Resources
	- Resources
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 300 Resources 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
- 400 Archive
	- Archive
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 400 Archive 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
- 500 Journal
	- Journal
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 500 Journal 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
- 600 Zettelkasten
	- Zettelkasten
	  ```tasks
	  not done 
	  folder does not include 900 Assets
	  folder includes 600 Zettelkasten 
	  filter by function task.status.symbol === ' '
	  sort by path 
	  sort by priority 
	  group by filename
	  ```
````
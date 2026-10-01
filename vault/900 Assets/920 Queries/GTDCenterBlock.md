---
created: 2026-01-09
cssclasses:
  - kanban
obsidianUIMode: preview
---



- 待交付事项
	- PPT/Reports/Other deliverables：
	  ```tasks
	  not done
	  filter by function task.status.symbol === ' '
	  (tag include #GTD/PPT) OR (tag include #GTD/deliverables) OR (tag include #GTD/report) 
	  group by tags
	  hide backlink
	  path does not include 900 Assets
	  ```
- 待沟通协调事项
	- For coordination and communication：
	  ```tasks
	  not done
	  filter by function task.status.symbol === ' '
	  (tag include #GTD/calls) OR (tag include #GTD/emails) OR (tag include #GTD/meeting) OR (tag include #GTD/coordination) OR (tag include #GTD/errands) 
	  group by tags
	  hide backlink
	  path does not include 900 Assets
	  ```
- Person
	- BP Team：
    ```tasks
    not done
    filter by function task.status.symbol === ' '
    (tags include #GTD/Selina) OR (tags include #GTD/Abby) OR (tags include #GTD/Kate)
    group by function return task.tags.filter(tag => ['#GTD/Selina', '#GTD/Abby', '#GTD/Kate'].includes(tag)).join(', ')
    path does not include 900 Assets
    ```
	- HR Others:
	  ```tasks
	  not done
	  filter by function task.status.symbol === ' '
	  (tags include #GTD/Jill) OR (tags include #GTD/Nick) OR (tags include #GTD/Jianlei) OR (tags include #GTD/Tamar)  OR (tags include #GTD/Anja)  OR (tags include #GTD/Ada)
	  group by filename
	  hide backlink
	  path does not include 900 Assets
	  ```
- Context
	- waiting：
    ```tasks
	  not done
	  filter by function task.status.symbol === ' '
	  tag include #GTD/waiting    
	  group by filename
	  hide backlink
	  path does not include 900 Assets
    ```
- Postpone Tasks
	- Postpone
	  ```tasks
	  folder does not include 900 Assets
	  filter by function task.status.symbol === ">"
	  tags do not include #exclude 
	  sort by due
	  ```
- Information
	- Information
	  ```tasks
	  folder does not include 900 Assets
	  (filter by function task.status.symbol === "i") OR (filter by function task.status.symbol === "n") OR (filter by function task.status.symbol === "!")
	  tags do not include #exclude 
	  sort by due
	  ```





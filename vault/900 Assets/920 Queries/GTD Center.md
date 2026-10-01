---
created: 2025-09-18
---


## GTD 任务跟踪

```dataview
TASK
FROM ""
WHERE !completed
WHERE status = " "
WHERE any(tags, (tag) => startswith(tag, "#GTD/"))
FLATTEN filter(tags, (tag) => startswith(tag, "#GTD/")) as gtd_tag
GROUP BY gtd_tag
SORT gtd_tag ASC
```

## GTD任务统计

```dataview
TABLE WITHOUT ID
  gtd_tag as "GTD标签",
  length(rows) as "总任务数",
  length(filter(rows, (r) => !r.task.completed and r.task.status = " ")) as "待办",
  length(filter(rows, (r) => r.task.completed)) as "已完成",
  length(filter(rows, (r) => !r.task.completed and r.task.status != " ")) as "其他状态"
FROM ""
FLATTEN file.tasks as task
WHERE any(task.tags, (tag) => startswith(tag, "#GTD/"))
FLATTEN filter(task.tags, (tag) => startswith(tag, "#GTD/")) as gtd_tag
GROUP BY gtd_tag
SORT length(rows) DESC
```

## By People
>`(tags include #GTD/Selina) OR (tags include #GTD/Abby) OR (tags include #GTD/Kate) OR (tags include #GTD/Jill) OR (tags include #GTD/Nick) OR (tags include #GTD/Jianlei) OR (tags include #GTD/Tamar)`

```tasks
not done
filter by function task.status.symbol === ' '
(tags include #GTD/Selina) OR (tags include #GTD/Abby) OR (tags include #GTD/Kate) OR (tags include #GTD/Jill) OR (tags include #GTD/Nick) OR (tags include #GTD/Jianlei) OR (tags include #GTD/Tamar)
group by filename
```

## By Action
>`(tags include #GTD/waiting) OR (tags include #GTD/calls) OR (tags include #GTD/errands) OR (tags include #GTD/download) OR (tags include #GTD/review) OR (tags include #GTD/prepare)`

```tasks
not done
filter by function task.status.symbol === ' '
(tags include #GTD/waiting) OR (tags include #GTD/calls) OR (tags include #GTD/errands) OR (tags include #GTD/download) OR (tags include #GTD/review) OR (tags include #GTD/prepare)
group by filename
```



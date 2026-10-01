---
created: 2026-01-18
tags:
  - sometime-maybe
---

## 说明
> 任务列表可以通过dataview语法 也可以通过tasks插件获取

## 所有未完成的任务

### 展开所有未完成的任务和过滤含有关键字的任务

```dataviewjs
//filter输入要过滤的任务关键字
let filter ="#GTD"
//noflod 输入要排除的文件夹
let noflod ='!"900 Assets"'
const groups = dv.pages(noflod).filter(p => p.file.folder != "").groupBy(p => p.file.folder.split("/")[0])
for (let group of groups) {
let tasks=dv.pages(`"${group.key}"`).where(t => { return t.file.name != "" }).file.tasks.where(t => t.text.includes(filter) && !t.completed && t.status === " ")
if(tasks.length>0)
dv.header(3, group.key);
dv.taskList(
    tasks,1)
}
```


## 任务收集【tasks】
通过tasks插件示例

### 过期的任务

```tasks
not done
due before  today
path does not include "900 Assets"
filter by function task.status.symbol === ' '
short mode
```

### 今天要完成的任务

```tasks
not done
due on  today 
path does not include "900 Assets"
filter by function task.status.symbol === ' '
short mode
```

%%也可以用callout 格式书写 %%

> [!CHECK] 3天内要完成的任务
> ```tasks
not done 
due after today
due before in 3 days 
path does not include "900 Assets"
filter by function task.status.symbol === ' '
short mode
>```

### 未两周要完成的任务
```tasks
not done 
due after today
due before in two weeks
path does not include "900 Assets"
filter by function task.status.symbol === ' '
short mode
```

## 任务收集【dataview】

### 过期的任务

```dataview
task
from !"900 Assets"
where !completed
AND  due <= date(today)
AND status = " "
sort  file.cday asc
```

### 今天要完成的任务

```dataview
task
from !"900 Assets"
where !completed
AND due = date(today)
AND status = " "
sort  file.cday asc
```

%%也可以用callout 格式书写 %%
> [!CHECK] 3天内要完成的任务
> ```dataview
task
from !"900 Assets"
where !completed
AND status = " "
WHERE due > date(today) + dur(1 days)
WHERE due <= date(today) + dur(3 days)
sort  file.cday asc
>```

### 未两周要完成的任务
```dataview
task
from !"900 Assets" 
where !completed
WHERE due > date(today) + dur(1 days)
and due <= date(today) + dur(2 weeks)
AND status = " "
sort  file.cday asc
```

### 九月任务
```dataview
task
from !"900 Assets"
where !completed
WHERE due >= date(2025-09-01) 
WHERE due <= date(2025-09-30) 
AND status = " "
sort  file.cday asc
```

### 当月内的本周任务
```dataview
task
from !"900 Assets" 
where !completed
WHERE due.month = date(today).month 
AND due.week = date(today).week
AND status = " "
sort  file.cday asc
```

### 下月任务
```dataview
task
from !"900 Assets" 
where !completed
WHERE due.month = date(today).month + 1 
AND status = " "
sort  file.cday asc
```

## 任务举例

```dataviewjs
function overdue(t) {
  let dValidate = moment(t.text, 'YYYY-MM-DD', true);
  let d = moment(t.text, 'YYYY-MM-DD');
  let containsValidDate = dValidate._pf.unusedTokens.length==0 ;
  let isOverdue = d.diff(moment()) <= 0;
  return (containsValidDate && isOverdue);
}

dv.taskList(dv.pages('"500 Journal"').file.tasks
	.where (t => overdue(t))
	.where (t => !t.completed)
	.where (t => t.status === " "))
```


## 查询带自定义字段的任务

```dataview
TASK 
from !"900 Assets"  
WHERE Group1 
AND status = " "
FLATTEN Group1 
GROUP BY Group1 
```

```dataview
TASK
from !"900 Assets" 
WHERE due = date(today)
AND status = " "
```

### 查询带标签的任务

```dataview
task
WHERE contains(tags, "#GTD/email")
AND status = " "
```

## 列表查询和任务查询的语法差异

```dataview
list
WHERE contains(file.tasks.due, date(today))
```

```dataview
list
WHERE contains(file.tasks.tags, "#GTD/email")
```


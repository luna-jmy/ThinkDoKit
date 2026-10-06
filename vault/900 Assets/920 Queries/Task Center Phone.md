---
created: 2025-10-06
cssclasses:
tags:
  - favorite_phone
type: query
obsidianUIMode: preview
---

>[!warning]- Overdue Tasks 
>```tasks
>not done
>filter by function task.status.symbol === ' '
>due before tomorrow
>sort by due
>group by filename
>hide backlink
>```

>[!todo]- Active Tasks
>```tasks
>not done
>filter by function task.status.symbol === ' '
>(starts before tomorrow) AND (due after yesterday)
>group by filename
>sort by due
>hide backlink
>```

%% 基于场景和标签的任务查询，标签设计方法论见[跳出标签陷阱：如何把混乱的标签用成行动引擎](https://mp.weixin.qq.com/s/nhFci7Db75TQsl3JxBpa1A)%%

>[!kanban|noicon,grid]- 📧待交付（PPT/报告）
>```tasks
>not done
>filter by function task.status.symbol === ' '
>(tag include #GTD/PPT) OR (tag include #GTD/deliverables ) 
>group by filename
>hide backlink
>path does not include 900 Assets
>```

>[!kanban|noicon,grid]- 📞待协调（会议/电话/邮件）
>```tasks
>not done
>filter by function task.status.symbol === ' '
>(tag include #GTD/calls ) OR (tag include #GTD/meeting) OR (tag include #GTD/me) OR (tag include #GTD/email) 
>group by filename
>hide backlink
>path does not include 900 Assets
>```

>[!kanban|noicon,grid]- ⏸️跟踪等待
>```tasks
>not done
>filter by function task.status.symbol === ' '
>tag include #GTD/waiting
>group by filename
>hide backlink
>path does not include 900 Assets
>```



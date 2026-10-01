---
created: 2025-09-28
tags:
  - favorite
  - favorite_phone
---

## Inbox笔记清单
>Inbox文件夹下的所有笔记及其创建日期和最后修改时间：
```dataview
TABLE file.ctime AS "创建日期", file.mtime AS "最后修改时间"
WHERE startswith(file.path, "000 Inbox") OR contains(tags, "inbox")
WHERE file.name != "Inbox Note List"
WHERE !startswith(file.path, "500 Journal")
WHERE !startswith(file.path, "000 Inbox/Clippings")
SORT file.mtime DESC
```

>Inbox但是暂时没有时间处理，改为sometime maybe，有空余时间的时候从清单中选择处理
```dataview
TABLE file.ctime AS "创建日期", file.mtime AS "最后修改时间"
WHERE contains(tags, "sometime-maybe")
WHERE file.name != "Inbox Note List"
WHERE !startswith(file.path, "500 Journal")
SORT file.mtime DESC
```

## Inbox待办（非日志）
```dataview
TASK
WHERE !startswith(file.path, "500 Journal") 
  AND !startswith(file.path, "900 Assets")
  AND contains(tags, "inbox")
  AND file.name != "Inbox Note List"
  AND !completed
SORT file.mtime DESC
GROUP BY file.link
```

>不在 `500 Journal` 以及 `900 Assets` 文件夹下的 `#inbox` 标签任务

---

## 观影煲剧清单

```dataview
TASK
FROM ""
WHERE contains(tags, "#to-watch") AND !completed
GROUP BY file.link
SORT file.mtime DESC
```

>`#to-watch` 标签。
>全库搜索，排除指定文件夹在下列查询代码中添加 `!startswith(file.path, "文件夹名称")` ，指定文件夹在查询代码中添加 `startswith(file.path, "文件夹名称")`

---

## 计划阅读清单
```dataview
TASK
FROM ""
WHERE contains(tags, "#to-read") AND !completed AND status != "-"
GROUP BY file.link
SORT file.mtime DESC
```

> `#to-read` 标签，不含 `status != "-"` 已经取消的阅读计划

---

## 资源下载清单
```dataview
TASK
FROM ""
WHERE contains(tags, "#to-download") AND !completed
GROUP BY file.link
SORT file.mtime DESC
```

>`#to-download` 标签


## 模板类型清单
```dataview
TABLE file.ctime AS "创建日期", file.mtime AS "最后修改时间", type
WHERE startswith(file.path, "900 Assets/910 ")
WHERE type
SORT file.mtime DESC
```



---
cssclasses:
  - fullwidth
obsidianUIMode: preview
type: query
tags:
  - favorite
---

## Inbox笔记清单
>*Inbox文件夹下的所有笔记及其创建日期和最后修改时间*

```dataview
TABLE file.ctime AS "创建日期", file.mtime AS "最后修改时间"
WHERE startswith(file.path, "000 Inbox") OR contains(tags, "inbox")
WHERE file.name != "Inbox Note List"
WHERE !startswith(file.path, "500 Journal")
SORT file.mtime DESC
```

## Inbox待办（非日志）
>*不在 `500 Journal` 以及 `900 Assets` 文件夹下的 `#inbox` 标签任务*

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

---

## 观影煲剧清单
>`#to-watch` 标签。
>全库搜索，排除指定文件夹在下列查询代码中添加 `!startswith(file.path, "文件夹名称")` ，指定文件夹在查询代码中添加 `startswith(file.path, "文件夹名称")`

```dataview
TASK
FROM ""
WHERE contains(tags, "#to-watch") AND !completed
```



---

## 计划阅读清单
> `#to-read` 标签，不含 `status != "-"` 已经取消的阅读计划

```dataview
TASK
FROM ""
WHERE contains(tags, "#to-read") AND !completed AND status != "-"
```


---

## 资源下载清单
>`#to-download` 标签

```dataview
TASK
FROM ""
WHERE contains(tags, "#to-download") AND !completed
```

---

## 模板清单
```dataview
TABLE file.ctime AS "创建日期", file.mtime AS "最后修改时间", type
WHERE startswith(file.path, "900 Assets/910 ")
WHERE type
SORT file.mtime DESC
```



---
created: 2025-09-21
area: Obsidian
type: readme
status: active
priority: 4
tags:
source:
keywords:
obsidianUIMode: preview
---

脚本文件：[[random-quote.js]]

## 使用说明

### 注意事项
引用此代码时，**编辑模式下不显示结果**。仅在阅读模式下显示结果。如过希望在实时预览模式下显示，可以在callout块中调用。例如：

>[!info]+
>`$={await dv.view("random-quote",{tag: "#content/观点"})}`

>[!warning] 书摘的命名方式建议使用：`【书摘】书名` 。脚本会自动剔除`【】`里的内容，仅显示 `书名`

### 基本调用
在任何笔记中使用以下行内代码来调用这个脚本：

````
```dataviewjs
$={await dv.view("random-quote")}
```
````

切换阅读模式查看效果：`$={await dv.view("random-quote")}`

### 高级用法（带参数）
你还可以传递参数来自定义行为：

````
```dataviewjs
$={await dv.view("random-quote",{tag: "#content/观点", folder: "300 Resources/330 Books/332 BookExcerpts"})}
```
````

或

````
``dataviewjs
$={await dv.view("random-quote", {
  tag: "#content/金句",
  folder: "300 Resources/330 Books/332 BookExcerpts",
  noQuoteMessage: "> 没有找到金句",
  quoteTemplate: "> 💭 {quote}\n>\n> —— 出自《{source}》"
})}
```
````

### 参数说明
- `tag`: 要搜索的标签，默认为 `#content/金句`
- `noQuoteMessage`: 没有找到书摘时显示的消息
- `quoteTemplate`: 书摘显示模板，其中 `{quote}` 会被替换为金句内容，`{source}` 会被替换为来源文件名
- `folder`: 要搜索书摘的范围，默认全库搜索。

---


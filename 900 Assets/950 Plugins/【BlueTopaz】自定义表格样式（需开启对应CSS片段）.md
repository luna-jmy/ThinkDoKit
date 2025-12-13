---
created: 2025-09-28
area: Obsidian
type: readme
status: archived
due_date:
priority: 4
tags:
source:
keywords:
---

# 自定义表格样式

## 内容
个性化表格样式，基本涵盖了各类情况

### 紫红红表头

`cssclasses:purpleRed`

![[Pasted image 20251006162354.png]]

### 三线表头

`cssclasses:academia`

![[Pasted image 20251006162408.png]]

### 黄底黑字表头

`cssclasses: yellowCab`

![[Pasted image 20251006162419.png]]

### 白底红字表头

`cssclasses: whiteRed`

![[Pasted image 20251006162430.png]]

### 扁平蓝表头

`cssclasses:flatBlue`

![[Pasted image 20251006162441.png]]

### 圆角表头

`XXX-rounded`
表有一个额外的模式，你可以用来得到它与圆角，所有你需要做的是堆叠两个类：`White red`
比如可以跟白底红字表头叠加

`cssclasses: whiteRed, whiteRed-rounded, wideTable`

![[Pasted image 20251006162514.png]]

`wideTable` 该类将表设置宽度为 100%，因此默认情况下会占用您的笔记**宽度**。可以与上面样式叠加使用。

其他"cssclasses"类是：
###  左对齐
-   `leftAlign`- 有些主题在表格中使用 RTL，这会将内容带回左侧;
- ###  居中对齐
-   `centerAlign`- 表格内容水平居中并垂直居中对齐;
### 首列宽度固定
-   `fixedFc`- 使用 "..." 修复第一列宽度并避免双行在长文本。当您的第一列是日期或其他短文时有用。不能跟`wideFc`同时用
### 首列加宽 
-   `wideFc`- 对于第一列中的大文本，但您也想要单行，它非常适合一般笔记列表，特别是使用dataview插件生成的以文件名作为第一列的表格。**不要**与`fixedFc`一起使用。
### 表格内容留白    
-   `customMargin`- 如果您需要在表和内容之间留些额外的空间。

---

**使用步骤**：

1.  将所附的 CSS 文件放入您的库snippets文件夹中，并确保在 CSS 片段选项中启用它： `【BlueTopaz】表格样式TableStyles`
2.  在需要使用样式的笔记frontmatter区域中设置 cssclasses 代码：
   
```
---
   cssclasses: [purpleRed, fixedFc]
---
```

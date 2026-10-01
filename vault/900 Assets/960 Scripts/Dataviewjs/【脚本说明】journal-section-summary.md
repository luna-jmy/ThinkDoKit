---
created: 2026-01-19
area: Obsidian
type: readme
status: active
priority: 4
tags:
source:
keywords:
obsidianUIMode: preview
---

脚本文件：[[journal-section-summary.js]]

## 使用说明

### 功能简介
此脚本用于在**周日志**或**月日志**中，汇总该时间范围内所有 daily 日志中指定标题下的内联字段数据。

### 注意事项
- 此脚本仅支持 **Weekly**（周）和 **Monthly**（月）日志，不支持年度日志
- 当前笔记必须包含 `journal-date` 元数据字段
- 标题必须**精确匹配** daily 日志中的完整标题

### 基本调用

在周日志或月日志中使用以下代码调用：

````
```dataviewjs
dv.view("900 Assets/960 Scripts/journal-section-summary", {
  sectionTitle: "### 打卡（布尔值🔲✔️❌）"
})
```
````

### 调用示例

#### 示例1：汇总打卡记录
````
```dataviewjs
dv.view("900 Assets/960 Scripts/journal-section-summary", {
  sectionTitle: "### 打卡（布尔值🔲✔️❌）"
})
```
````

#### 示例2：汇总数据记录
````
```dataviewjs
dv.view("900 Assets/960 Scripts/journal-section-summary", {
  sectionTitle: "### 数据记录（仅填写数值）"
})
```
````

#### 示例3：汇总小结与回顾
````
```dataviewjs
dv.view("900 Assets/960 Scripts/journal-section-summary", {
  sectionTitle: "## ✍️ 今日小结与回顾"
})
```
````

#### 示例4：自定义参数
````
```dataviewjs
dv.view("900 Assets/960 Scripts/journal-section-summary", {
  sectionTitle: "### 打卡（布尔值🔲✔️❌）",
  dailyPath: "500 Journal/540 Daily",
  showEmpty: false,
  dateColumn: "日期",
  sortAscending: false
})
```
````

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sectionTitle` | string | `"### 打卡（布尔值🔲✔️❌）"` | daily日志中要汇总的完整标题，**必须精确匹配** |
| `dailyPath` | string | `"500 Journal/540 Daily"` | daily日志的路径 |
| `showEmpty` | boolean | `true` | 是否显示空值字段（显示"—"或留空） |
| `dateColumn` | string | `"📅"` | 日期列的标题 |
| `sortAscending` | boolean | `true` | 是否按日期升序排列（`false`为降序） |

### 输出示例

汇总结果会显示为一个表格，第一列为日期，后续列为该标题下找到的所有内联字段：

| 📅 | 🧠flashcard | 💊medicine | 🧘‍♂️meditation | 🍽️fasting |
|-----|-------------|------------|----------------|-----------|
| [[2025-01-13]] | ✔️ | ✔️ | ❌ | ✔️ |
| [[2025-01-14]] | ✔️ | ❌ | ✔️ | ✔️ |
| [[2025-01-15]] | ❌ | ✔️ | ✔️ | ❌ |

### 支持的字段格式

脚本支持以下内联字段格式：

1. **普通内联字段**：`[字段名::值]`
2. **任务形式**：`- [x] [字段名::值]` 或 `- [ ] [字段名::]`
3. **布尔值**：任务未完成时显示 `❌`，已完成时显示 `✔️`

### 使用场景

- 📊 **周度回顾**：汇总一周的习惯打卡情况
- 📈 **月度统计**：汇总一月的运动、阅读等数据
- 📝 **内容回顾**：汇总一段时间内的感想、灵感等内容

---

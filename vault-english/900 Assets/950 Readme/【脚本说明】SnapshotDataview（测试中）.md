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

脚本文件：[[SnapshotDataview.js]]

## 使用说明

### 功能简介
此脚本用于将当前笔记中的 **Dataview 查询**固化为静态 Markdown 内容。快照后的内容不再依赖 Dataview 插件动态计算，便于分享、归档或长期保存。

### 特点
- **支持多种 Dataview 查询类型**：TABLE、LIST、TASK LIST
- **灵活的输出方式**：复制到剪贴板、替换当前文件、或创建新快照文件
- **保留查询结构**：将动态查询结果转换为标准的 Markdown 格式

### 使用方法

1. 打开包含 Dataview 查询的笔记
2. 运行 QuickAdd 宏（选择此脚本）
3. 选择输出方式：
   - **📋 复制到剪贴板**：将快照内容复制到剪贴板，原文件不变
   - **✏️ 替换当前文件**：用快照内容替换当前文件的 Dataview 查询
   - **📄 创建新的快照文件**：创建一个新的快照文件（文件名包含时间戳）

### 支持的查询类型

#### 1. TABLE 查询
转换为 Markdown 表格：

````

```dataview
TABLE file.name, tags
FROM "300 Resources"
```
````

快照后：
```
| file.name | tags |
| --- | --- |
| 笔记1 | #tag1, #tag2 |
| 笔记2 | #tag3 |
```

#### 2. LIST 查询
转换为 Markdown 列表：

````
```dataview
LIST
FROM "300 Resources"
```
````

快照后：
```
- [[笔记1]]
- [[笔记2]]
```

#### 3. TASK LIST 查询
转换为任务列表：
````
```dataview
TASK
FROM "300 Resources"
```
````
快照后：
```
- [ ] 任务1
- [x] 已完成任务
```

### 限制说明

#### DataviewJS 代码块
DataviewJS 代码块（````dataviewjs`）通常会产生复杂的 DOM 输出，无法直接转换为静态 Markdown。脚本会保留原始代码并添加注释标记：

> 📝 DataviewJS 代码（需要手动运行或截图）

```dataviewjs
dv.table(["列1", "列2"], ...)
```

#### 内联 Dataview 查询
内联查询（和类似表达式）会尽可能保留或转换为静态文本，但复杂的表达式可能无法完全转换。

### 使用场景

- **📦 归档整理**：将动态查询结果固化，便于长期归档
- **📤 导出分享**：将查询结果导出为纯 Markdown，便于分享给他人
- **📊 报告生成**：定期生成快照，记录某个时间点的数据状态
- **🔍 离线查看**：在没有 Dataview 插件的环境中查看查询结果

### 输出文件名格式

创建新快照文件时，文件名格式为：
```
原文件名-快照-YYYYMMDD-HHmmss.md
```

例如：`周报-快照-20260119-143022.md`

### 依赖项

- **Dataview 插件**：必须安装并启用
- **QuickAdd 插件**：用于运行脚本
- **Moment.js**：用于日期格式化（Obsidian 内置）

### 故障排除

**问题**：提示"Dataview 插件未启用"
- **解决**：确保 Dataview 插件已安装并启用

**问题**：快照内容显示错误或不完整
- **解决**：检查原始 Dataview 查询是否正确，某些复杂查询可能不支持

**问题**：DataviewJS 代码块没有被转换
- **解决**：这是预期行为，DataviewJS 需要手动截图或保留原始代码

### 技术说明

#### 工作原理
1. 读取当前文件内容
2. 使用正则表达式找到所有 Dataview 代码块
3. 调用 Dataview API 执行查询
4. 将查询结果转换为 Markdown 格式
5. 替换原始查询代码

#### 单元格格式化规则
- **链接对象**：`[[路径|显示名称]]`
- **日期对象**：`YYYY-MM-DD` 格式
- **数组**：逗号分隔的值
- **对象**：JSON 字符串

### 示例

#### 原始笔记（包含动态查询）

```markdown
# 项目列表

```dataview
TABLE status, tags
FROM "100 Projects"
WHERE status = "进行中"
```
```

#### 快照后（静态 Markdown）
```markdown
# 项目列表

| status | tags |
| --- | --- |
| 进行中 | #project1, #work |
| 进行中 | #project2 |

> 快照生成时间: 2026-01-19
```


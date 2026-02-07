---
name: book-excerpt-processor
description: 书摘整理技能 - 处理电子书阅读器的书摘内容（txt格式），格式化为 ThinkDoKit 的书摘笔记格式，并提取开始和结束时间用于 Douban 插件的 BookInfo 笔记。

trigger:
  - "书摘整理"
  - "整理书摘"
  - "书摘处理"
  - "电子书摘"
  - "阅读器书摘"
  - "excerpt processing"
  - "book excerpt"
  - "书摘笔记"
  - "book note"
  - "book-excerpt-format"
---

# 书摘整理技能 (Book Excerpt Processor)

## 功能概述

这个技能用于处理电子书阅读器（如微信读书、Kindle、Boox 等）导出的书摘内容，并将其格式化为 ThinkDoKit 的书摘笔记格式。

### 核心功能

1. **书摘格式化** - 将 txt 格式转换为 ThinkDoKit 标准格式
2. **段落格式化** - 在书摘段落之间添加空行，提高可读性
3. **日期提取** - 从书摘中提取第一条和最后一条日期（用于 BookInfo 笔记）
4. **笔记创建** - 创建标准格式的书摘笔记
5. **BookInfo 更新** - 更新 BookInfo 笔记的开始和结束时间

---

## ThinkDoKit 书摘格式

### 标准书摘格式

```markdown
---
created: 2026-02-07
area:
type: demo
status: archived
due_date:
priority: 5
tags:
source: 微信读书
keywords:
  - 关键词1
  - 关键词2
---

《[[书名]]》（副标题或描述），作者

书摘：
[书摘内容...] [keyword::关键词] #content/类型 [keyword::关键词]

章节：
书名： 《书名》
作者： 作者

日期 | 页码：loc. 1234-1234

----

书摘：
[下一条书摘...]

章节：
书名： 《书名》
作者： 作者

日期 | 页码：loc. 1234-1234

----
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `created` | 创建日期 |
| `type` | 笔记类型 |
| `status` | 状态 |
| `tags` | 标签 |
| `source` | 来源（电子书阅读器） |
| `keywords` | 关键词列表 |
| `书摘内容` | 书摘原文 |
| `#content/类型` | 书摘内容类型（如：#content/金句、#content/观点） |
| `[keyword::关键词]` | 书摘关键词 |
| `----` | 分隔符（每条书摘之间） |

---

## 工作流程

### 步骤 1：书摘格式化

用户复制书摘后，粘贴到 Obsidian 笔记中，调用书摘格式化脚本：

```javascript
// 调用 book-excerpt-format.js
// 在书摘段落之间添加空行
// 确保 YAML header 和正文之间空两行
```

**QuickAdd 命令：** `book-excerpt-format`

---

### 步骤 2：创建 BookInfo 笔记

使用 Douban 插件创建书籍信息笔记：

1. 按 `Ctrl + P`，输入"豆瓣"或"Douban"
2. 搜索书籍
3. 选择 TPL-BookInfo 模板
4. 创建 BookInfo 笔记

**BookInfo 笔记模板：** `TPL-BookInfo.md`

---

### 步骤 3：创建书摘笔记

格式化后的书摘内容，创建到：
```
300 Resources/330 Books/332 BookExcerpts/【书摘】书名.md
```

---

### 步骤 4：更新 BookInfo 笔记

从书摘笔记中提取第一条和最后一条日期，更新 BookInfo 笔记：

```yaml
开始时间: 第一条书摘的日期
读完时间: 最后一条书摘的日期
```

---

## QuickAdd 脚本

### book-excerpt-format.js

**位置：** `vault/900 Assets/960 Scripts/book-excerpt-format.js`

**功能：**
- 批量插入空行
- 批量删除空行
- 段落规整（智能判断）
- 保留 YAML header
- 书摘格式化

**使用：**
- 在 QuickAdd 中配置命令
- 或通过 QuickAdd API 调用

**与 paragraph-format.js 的区别：**

| 特性 | paragraph-format.js | book-excerpt-format.js |
|------|---------------------|----------------------|
| YAML header 后空行 | 1 行 | 2 行（书摘格式需要） |
| 其他功能 | 相同 | 相同 |
| 主要用途 | 通用格式化 | 书摘专用 |

---

## 常见电子书阅读器格式

### 微信读书

**格式特点：**
- 每条书摘独立一行
- 包含日期、页码、书名、作者
- 日期格式：`2026-02-07` 或 `02/07/2026`

**示例：**
```
2026-02-07 | 页码：loc. 1234-1236

书摘内容...

书名： 《书名》
作者： 作者
```

---

### Kindle

**格式特点：**
- 包含位置信息（loc.）
- 包含时间戳
- 可能包含高亮标记

**示例：**
```
- 位置 1234-1236 | 2026年2月7日

书摘内容...
```

---

### Boox

**格式特点：**
- 类似微信读书
- 可能包含页码或位置

---

## 日期提取规则

### 支持的日期格式

1. **YYYY-MM-DD** - `2026-02-07`
2. **MM/DD/YYYY** - `02/07/2026` 或 `2/7/2026`
3. **DD/MM/YYYY** - `07/02/2026` 或 `7/2/2026`
4. **YYYY年MM月DD日** - `2026年2月7日`
5. **中文日期** - `2026年02月07日`

### 提取逻辑

```javascript
// 1. 查找所有书摘中的日期
// 2. 按出现顺序排序
// 3. 第一条 = 开始时间
// 4. 最后一条 = 结束时间
```

---

## 段落格式化规则

### 空行规则

在书摘段落之间添加一个或两个空行（确保 YAML header 和正文之间空两行）：

**转换前：**
```markdown
书摘内容1----
书摘内容2----
```

**转换后：**
```markdown
书摘内容1

----
书摘内容2

----
```

**YAML header 后：**
```yaml
---

created: 2026-02-07


书摘内容1
```

---

## 关键词和标签

### 关键词字段 `[keyword::关键词]`

用于标记书摘中的重要概念，方便检索。

### 标签 `#content/类型`

ThinkDoKit 使用的标签分类：

- `#content/金句` - 精彩的句子
- `#content/观点` - 重要观点
- `#content/概念` - 新概念或定义
- `#content/方法` - 实用方法
- `#content/案例` - 案例故事
- `#content/原理` - 理论原理

---

## 使用示例

### 示例 1：处理微信读书书摘

**输入（txt）：**
```
2026-02-07 | 页码：loc. 1234-1236

这是一段书摘内容，很有价值。

书名： 《思考快与慢》
作者： 丹尼尔·卡尼曼

2026-02-08 | 页码：loc. 2345-2347

这是另一段书摘内容。

书名： 《思考快与慢》
作者： 丹尼尔·卡尼曼
```

**输出（书摘笔记）：**
```markdown
---
created: 2026-02-07
area:
type: demo
status: archived
due_date:
priority: 5
tags:
source: 微信读书
keywords:
  - 快慢思考
  - 决策
---


《[[思考快与慢]]》（诺贝尔奖得主丹尼尔·卡尼曼经典之作），丹尼尔·卡尼曼

书摘：
这是一段书摘内容，很有价值。 [keyword::决策] #content/观点 [keyword::快慢思考]

章节：
书名： 《思考快与慢》
作者： 丹尼尔·卡尼曼

2026-02-07 | 页码：loc. 1234-1236

----

书摘：
这是另一段书摘内容。 [keyword::心理学] #content/概念 [keyword::行为经济学]

章节：
书名： 《思考快与慢》
作者： 丹尼尔·卡尼曼

2026-02-08 | 页码：loc. 2345-2347

----
```

**提取的日期：**
```
开始时间: 2026-02-07
结束时间: 2026-02-08
```

---

## Douban 插件集成

### BookInfo 笔记模板

**位置：** `vault/900 Assets/910 Templates/TPL-BookInfo.md`

**需要更新的字段：**
```yaml
开始时间: [从书摘提取]
结束时间: [从书摘提取]
```

### 书摘链接

BookInfo 笔记底部包含书摘链接：
```markdown
### 📓**我的书摘&笔记**
-  [[【书摘】{{title}}]]
```

---

## 文件组织

### 目录结构

```
300 Resources/330 Books/
├── 331 BookInfo/              # 书籍信息笔记
│   ├── 书名.md
│   └── ...
└── 332 BookExcerpts/          # 书摘笔记
    ├── 【书摘】书名.md
    └── ...
```

### 命名规范

**BookInfo 笔记：** `书名.md`

**书摘笔记：** `【书摘】书名.md`

---

## 最佳实践

### 1. 先创建 BookInfo 笔记

1. 使用 Douban 插件搜索书籍
2. 选择 TPL-BookInfo 模板
3. 创建 BookInfo 笔记

### 2. 再创建书摘笔记

1. 复制电子书阅读器书摘（txt）
2. 粘贴到 Obsidian，创建新笔记
3. 调用 `book-excerpt-format`，选择"段落规整"
4. 添加元数据（YAML header）
5. 创建到 `332 BookExcerpts/`
6. 提取日期

### 3. 更新 BookInfo 笔记

将提取的日期填入 BookInfo 笔记：
```yaml
开始时间: 2026-02-07
结束时间: 2026-02-08
```

---

## 注意事项

1. **日期格式** - 确保提取的日期格式统一为 `YYYY-MM-DD`
2. **书摘分隔** - 每条书摘之间用 `----` 分隔
3. **关键词** - 每条书摘添加 `[keyword::关键词]` 标记
4. **标签** - 每条书摘添加 `#content/类型` 标签
5. **链接** - 确保 BookInfo 笔记中的书摘链接正确
6. **YAML header** - 确保与正文之间空两行

---

## 相关文档

- **Douban 插件说明：** `vault/900 Assets/950 Readme/【说明文档】Douban.md`
- **BookInfo 模板：** `vault/900 Assets/910 Templates/TPL-BookInfo.md`
- **书摘示例：** `vault/300 Resources/330 Books/332 BookExcerpts/`
- **段落格式化说明：** `vault/900 Assets/950 Readme/【脚本说明】paragraph-format.md`

---

## 技术说明

### QuickAdd API 使用

```javascript
module.exports = async (params) => {
    const { quickAddApi, app } = params;
    const { vault } = app;

    // 读取文件
    const file = app.workspace.getActiveFile();
    const content = await vault.read(file);

    // 处理内容
    // ...

    // 写回文件
    await vault.modify(file, content);
};
```

---

_版本：2.0_
_更新日期：2026-02-07_
_维护者：Luna (Lunaの小爪牙) 🐾_

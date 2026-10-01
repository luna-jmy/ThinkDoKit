---
created: 2025-09-02
area: Obsidian
type: readme
status: completed
due_date: 2025-09-02
priority: 3
tags:
source: Claude AI
keywords:
---

2025-09-28更新：
- [x] Bug修复：tags元数据录入出错问题修正；
- [x] 预防性修正：添加cssclasses的处理逻辑，同tags 

新脚本文件：[[YAMLHeaderUpdater4.js]]

---

2025-09-27更新：
- [x] 删除元数据排序代码，与笔记元数据列表顺序保持一致。

2025-09-03更新：
- [x] 取消（Cancel）时元数据值应该保持不变（原值）而不是显示undefined ➕ 2025-09-03 ✅ 2025-09-03
- [x] 添加7个布尔值打卡字段，提供true/false 选择：`published`, `public`, `favorite`,  `important`, `🧠flashcard`, `🧘‍♂️meditation`, `🍽️fasting`,  ✅ 2025-09-03
- [x] priority增加 0级，描述对应🔴critical，也可用于标记milestone，与task插件优先级对应 

更新脚本文件：[[YAMLHeaderUpdater3.js]]

---

2025-09-02更新记录：
- [x] 更新空字段，而非更新全部字段 ✅ 2025-09-02
- [x] status预设值给定 ✅ 2025-09-02
- [x] progress预设值给定 ✅ 2025-09-02
- [x] priority预设值给定 ✅ 2025-09-02
- [x] 布尔字段值为false的也要放到全部更新里，按空字段处理 ✅ 2025-09-02
- [x] 标签字段应为 (`tags`, `keywords`)，数组格式的括号`[]`是否可以预设？仅需要输入值和逗号即可 ✅ 2025-09-02

脚本文件：[[YAMLHeaderUpdater2.js]]
关联输出：[[【公众号】YAML Header填充器]]

---

这是一个专门处理 YAML Header 元数据（即笔记属性）的宏，只识别和更新笔记顶部的 YAML frontmatter，不会处理内联字段。处理内联字段的宏见内联字段填充器[[【脚本说明】内联字段填充器2种|【脚本说明】内联字段填充器2种]]

这个宏的主要特点包括：
- **只处理 YAML frontmatter**：仅识别和更新笔记顶部 `---` 包围的 YAML 头部信息
- **字段选择**：可以选择处理单个字段或批量处理所有字段
- **智能输入方式**：根据字段类型提供不同的输入选项
- **批量处理空白字段**：批量处理时会自动过滤，只显示和处理值为空以及布尔值为false的字段

## 预设字段类型

1. **状态字段** (`status`, `progress`, `priority`)：提供预设选项选择
	- **Status 字段预设值**
		- `inbox (未开始/待启动)`
		- `draft (起草/构思中)`
		- `active (执行中)`
		- `on-hold (暂停)`
		- `completed (完成)`
		- `cancelled (取消)`
		- `archived (归档)`
	- **Progress 字段预设值**
		- 每10%一个选项：`['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']`
	- **Priority 字段预设值**
		- 数字 `0-5`：
		    - `0（里程碑）`
		    - `1 (最高)`
		    - `2 (高)`
		    - `3 (中)`
		    - `4 (低)`
		    - `5 (最低)`
2. **布尔字段** (`published`, `public`, `favorite`, `important`)：提供 true/false 选择
3. **标签字段** (`tags`, `cssclasses`)：用逗号（半角）分隔多个标签或关键词
4. **普通字段**：使用文本输入框

## 使用方法

1. 将文末代码保存为 `YAMLHeaderUpdater.js`或公众号消息栏输入“元数据更新器”获取下载链接
2. 在 QuickAdd 插件中添加为宏
3. ctrl+p打开obsidian命令栏，找到新添加的宏命令即可运行。
4. 运行时会自动检测当前笔记的 YAML 头部
5. 选择要处理的字段并输入新值

这个版本与原来的内联字段处理器完全分离，专注于 YAML frontmatter 的管理。
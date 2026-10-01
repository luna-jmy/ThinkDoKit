---
created: 2026-03-04
area: Obsidian
type: readme
status: completed
priority: 3
tags:
  - quickadd
  - project
  - frontmatter
source: Claude AI
---

脚本文件：[[CheckProjectFrontmatter.js]]

## 功能概述

这是一个用于批量检查和修复项目笔记 frontmatter 的 QuickAdd 脚本。它会对比 `TPL-Project.md` 模板中的字段定义，自动为 `100 Projects` 文件夹下所有 `type: project` 的笔记补齐缺少的 frontmatter 字段。

## 核心特性

- **模板驱动**：以 `900 Assets/910 Templates/TPL-Project.md` 为基准检查字段完整性
- **智能补齐**：只补充缺失的字段，已有的字段不会被覆盖
- **支持嵌套文件夹**：递归扫描 `100 Projects` 下的所有子文件夹
- **动态值处理**：自动识别模板中的 Templater 动态代码（如 `<% tp.date.now() %>`），补充时替换为空值
- **批量处理**：一键处理所有项目笔记，显示详细报告

## 字段补齐规则

| 情况 | 处理方式 |
|------|----------|
| 笔记有模板所有字段 | 跳过，不做任何修改 |
| 笔记缺少模板字段 | 自动补充（使用空值或默认值） |
| 笔记比模板多字段 | 保留，不会删除多余字段 |
| 模板字段含动态代码 | 替换为空值后再补充到笔记 |

## 支持的字段类型

- **普通字段**：字符串、数字、布尔值
- **列表字段**：如 `tags:` 等数组格式字段
- **空字段**：保持为空，等待后续填写

## 使用方法

### 1. 配置 QuickAdd

1. 打开 Obsidian 设置 → QuickAdd 插件
2. 添加一个 **Macro** 类型的选择器
3. 在 Macro 中添加 **Script** 步骤
4. 选择 `900 Assets/960 Scripts/QuickAdd/CheckProjectFrontmatter.js`
5. 保存配置

### 2. 运行脚本

1. 按 `Ctrl+P` 打开命令面板
2. 搜索并运行配置的宏命令
3. 等待脚本执行完成
4. 查看通知结果和 Console 详细报告

## 执行结果说明

脚本执行后会显示三类结果：

- **已修复**：补充了缺失字段的笔记列表
- **无需修改**：已包含所有模板字段的笔记
- **错误**：处理过程中出错的笔记（显示错误信息）

## 模板字段参考

脚本基于 `TPL-Project.md` 的以下字段进行检查：

```yaml
created:
project-id:
area:
type: project
objective:
status:
priority:
start_date:
due_date:
completion_date:
progress:
context:
tags:
  - project
project-leader:
project-members:
long-term: false
main-project: false
```

## 注意事项

1. **备份建议**：首次使用前建议备份 `100 Projects` 文件夹
2. **只读检查**：可以先查看 Console 报告，确认需要修复的文件列表
3. **幂等性**：脚本可重复运行，已补齐的字段不会重复添加
4. **动态代码**：模板中的 `<% ... %>` 和 `{{date:...}}` 会被识别并替换为空值

## 依赖要求

- QuickAdd 插件
- 有效的项目模板文件：`900 Assets/910 Templates/TPL-Project.md`
- 项目文件夹：`100 Projects`

## 更新日志

- **2026-03-04** - 初始版本创建
  - 实现基础的 frontmatter 对比和补齐功能
  - 支持列表字段和普通字段
  - 添加 Templater 动态代码识别

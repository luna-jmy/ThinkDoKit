---
created: 2026-10-02
type: readme
status: in-progress
version: "2.0"
---

# Obsidian ThinkDoKit（知行盒子）使用指南 2.0

> 本指南面向 **ThinkDoKit 2.0**。2.0 是一次架构性升级：原先依靠 Dataview 查询、DataviewJS 统计脚本和若干辅助插件实现的工作台，现在由**四个自研插件**原生承担——更快、更稳、手机上也能用。
> 如果你从 1.x 版本升级而来，请重点阅读 [[#9. 从 1.x 到 2.0：变化对照与迁移说明]]。
> 方法论基础（GTD / PARA / Zettelkasten / 间隔重复）与文件夹结构不变，1.0 指南中关于理念的部分在 2.0 中依然适用，本指南不再重复展开，聚焦 2.0 的新用法。

## 1. 核心变化：从"拼装"到"插件"

1.x 的三大工作台（任务中心、项目中心、日志体系）由大量 Dataview 查询块、DataviewJS 统计脚本（如 `journal-section-summary`、`annual-daily-task-stats`）和辅助插件拼装而成。它们有两个固有短板：

- **性能与稳定**：查询块随库增长变慢，脚本坏了不容易修；
- **移动端体验差**：DataviewJS 渲染的手机体验参差不齐，表单式录入基本不可用。

2.0 将这些能力集成到四个自研插件（插件说明文档见[https://luna-jmy.github.io/ob-plugin-docs](https://luna-jmy.github.io/ob-plugin-docs)）：

| 插件                         | 核心功能                                  | 替代了 1.x 的什么                                                                       |
| -------------------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| **Vault Dashboard**（仓库工作台） | 打开即见的组件式主页：统计模块、今日任务、常用快捷键、常用模板等      | 原本的 "👉从这里开始 Start from here!.md" 导航主页、920 Queries 中的总览类查询、手机主页中依赖 DataviewJS 的部分 |
| **Task Matrix**（任务仪表盘）     | 全库任务的列表 / GTD / 四象限 / 日历 / 甘特五视图      | 任务中心（Tasks Center / Task Center Phone）、任务日历、GTD 看板等查询                             |
| **Project Master**（项目管理中心） | 基于 frontmatter 的交互式项目看板（甘特 + Mermaid） | 项目中心及其升级版查询、QuickAdd 的任务转甘特图脚本                                                    |
| **Quick Journal**（日志速记）    | 表单式日志录入 + 周月年汇总视图                     | 日志模板中的任务滚动按钮脚本、打卡/数据统计 DataviewJS                                                 |

>Tips：**任务管理用 Task Matrix，项目管理用 Project Master，日志录入与汇总用 Quick Journal，整体入口用 Vault Dashboard。**

## 2. 快速上手

1. 解压发布包（Demo / Full / Lite），用 Obsidian 打开文件夹，信任作者并启用插件（发布包已预配置好插件设置，开箱即用）。
2. 打开 Vault Dashboard 的主页（插件已预配置为启动页），打开 Obsidian 即见统计与今日任务——它取代了旧版的"👉从这里开始"导航页。
3. 试着在日志笔记写一个 `- [ ] 任务 📅 2026-12-31`，然后打开 Task Matrix——它会自动出现在列表和日历里。目前默认设置里扫描的是 `500 Journal` 和 `100 Projects`，不建议设置全库扫描。
4. 在 Project Master 中创建一个项目笔记，模板文件 `TPL-Project` 在设置中已预设好，填好属性中的 `status / start_date / due_date`，在 Project Master 中即可看到它的甘特图时间条。

## 3. 文件夹结构

与 1.x 完全一致（PARA + 时间维度），此处仅列骨架：

```
Obsidian-ThinkDoKit/
├── 000 Inbox              | 📥 快速捕获箱
├── 100 Projects           | 🚧 项目（Project Master 的数据源）
├── 200 Areas              | 🌱 领域
├── 300 Resources          | 📚 资源库（310 Clippings … 390 EverythingElse）
├── 400 Archive            | 🗄️ 存档
├── 500 Journal            | 📅 日志（默认平铺，按文件名区分 年/月/周/日；可保留 1.x 子文件夹结构，见 9.3 提醒）
├── 600 Zettelkasten       | 知识卡片（610 Evergreen / 620 Flashcards）
└── 900 Assets             | 🔢 模板 / 查询 / 说明 / 脚本 / 附件
```

## 4. 四大插件要点

> 完整文档见插件文档站（链接在 GitHub 仓库主页），此处只讲在本体系中的用法。

### 4.1 Vault Dashboard（仓库工作台）

- **组件块拼装**：统计、任务、跳转、图表各为独立组件方块，位置宽度有4个调整选项。推荐布局：顶部统计块，左侧今日任务，右侧常用入口（Inbox、任务中心、项目中心、开始页）。
- **开箱即用**：发布包已预置主页配置；想自定义就进入编辑模式拖拽增删组件块。

### 4.2 Task Matrix（任务矩阵）

- **数据即任务本身**：扫描指定文件夹，任务格式匹配 `Tasks` 插件语法（`📅 ⏳ 🔼` 等）。
- **四视图**：
    - 列表视图：全量任务清单，可筛选；
    - GTD 视图：按"收件箱 / 下一步 / 等待 / 完成"分组；
    - 四象限：按重要 × 紧急归类，拖拽改优先级；
    - 日历：按 due / scheduled 显示；
- **甘特图模式**：类似项目管理甘特图的跨天任务时间线。

### 4.3 Project Master（项目管理中心）

- **数据源是 frontmatter**：`status`（todo/active/on-hold/completed/cancelled）、`start_date`、`due_date`、`completion_date`、`priority`、`area` 等，与 TPL-Project 模板一一对应，模板参数可通过插件设置修改。
- **两视图**：甘特图（按项目笔记展示，可拖拽调日期）与 面板（按项目文件夹展示）。

### 4.4 Quick Journal（日志速记）

- **表单录入**：点按钮 → 填表单 → 打卡、数据、小结自动写进当天日志的对应标题区，全程不进 Markdown 编辑模式，**手机可便利完成**。
- **内容流与汇总**：周 / 月 / 年汇总视图与复盘在同一体系里，不再需要日志模板中复杂的 DataviewJS 统计块。
- **模板变化**：2.0 的 Journal 模板（TPL-Daily / Weekly / Monthly / Annual）已配套删减，但模板中的 `button-` 按钮和QuickAdd 脚本驱动的任务滚动按钮仍保留了。目前全部可由 Quick Journal 插件接管完成（今日待办、打卡、数据、小结、周计划、月目标等），觉得冗余可自行在模板笔记中删除。

## 5. Journal 模板 2.0 详解

模板位置与文件名格式不变（`500 Journal/` 下，YYYY / YYYY-MM / YYYY-Www / YYYY-MM-DD），由 Journals 插件 + Templater 应用模板。变化在于**模板内容变少了**：

### 5.1 TPL-Daily（每日日志）

- 保留：今日关注（含"昨天想改进的事"自动回引）、今日到期任务查询（tasks）、GTD 任务看板 / 日程安排 / 习惯打卡与数据记录 / 小结回顾——**全部可由 Quick Journal 界面编辑**。
- 移除：顶部的 `journals-home` / `calendar-nav` 块（导航交给 Vault Dashboard 与 Journals 面板）、各节的大段使用提示文字、1.x 版依赖脚本的任务滚动说明。
- 手机上推荐用法：只用 Quick Journal 面板录入，不需要进入笔记编辑。

### 5.2 TPL-Weekly（周日志）

- 保留：上周提醒 / 上周展望自动回引、周例会待办查询（tasks）、本周计划 / 上期未完成 / 周末回顾（按钮）、新增 Zettelkasten 与资源笔记、发布文章三张 Dataview 表（这类"本周新增"轻量表保留——它们是知识回顾的一部分，插件不覆盖此场景）。
- 新增：周例会链接与周会待办查询；底部 `calendar-timeline`、`journals-home`、归档按钮。
- 移除：1.x 的"本周日志汇总" DataviewJS 块（`journal-section-summary` 的打卡 / 数据记录汇总）——由 Quick Journal 的周汇总视图替代。

### 5.3 TPL-Monthly（月度日志）

- 保留：月度目标与关注（按钮）、上期未完成（按钮）、月度回顾、本月新增笔记三张表、上下月链接、日历标记。
- 移除：**整个"月度数据统计"章节**——1.x 里的项目开始/截止/完成表、任务完成统计表、每日任务完成统计表、`annual-daily-task-stats` 与 `journal-section-summary` 脚本块全部删除。项目维度看 Project Master，任务与打卡统计看 Quick Journal / Task Matrix。

### 5.4 TPL-Annual（年度日志）

- 生命之轮改为 **Dataview 内联字段**：八个维度（PersonalGrowth / HealthFitness / LoveRelationships / CareerWork / FunRecreation / Social / Finance / Spiritual）各只保留两个指标——年度目标 `🎯` 与年底复盘 `🏆`，以列表内联字段（如 `- [Finance🎯:: 0]`）写在正文中，由 **Quick Journal 读取，在日志汇总视图生成雷达图**；1.x 交互脚本 `wheel-of-life-interactive` 及 frontmatter 中的多组冗余数值字段移除。
- 保留：年度核心目标（Tasks 语法）、高光时刻、对未来的思考。
- 新增：年度日志索引（由脚本自动生成）。
- 移除：项目回顾 Dataview 表与年度数据统计 DataviewJS 块（同上，交给插件）。

## 6. GTD 工作流在 2.0 中的落地

方法论五步不变，工具映射更新：

| GTD 阶段      | 1.x 主要工具                             | 2.0 主要工具                                            |
| ----------- | ------------------------------------ | --------------------------------------------------- |
| 收集 Capture  | 每日日志 + QuickAdd + Inbox              | 不变；手机端推荐 Quick Journal 按钮录入                         |
| 理清 Clarify  | 手动 + Dataview 查询                     | Task Matrix 的 **GTD 视图**（收件箱/下一步/等待分组）              |
| 组织 Organize | 模板 frontmatter + Tasks 语法 + Dataview | 项目统一用 TPL-Project 的 frontmatter，由 Project Master 识别 |
| 回顾 Reflect  | 日志模板中的 Dataview/DataviewJS 统计块       | Quick Journal 周/月/年汇总视图 + 模板中保留的轻量表                 |
| 执行 Engage   | 每日日志 + 任务中心查询                        | Task Matrix 四象限/日历 + 每日日志"今日到期"查询                   |

学习工作流（Zettelkasten + Spaced Repetition）在 2.0 无结构性变化。

## 7. 插件配置总览

| 插件                                 | 2.0 中的角色  | 预配置要点                       |
| ---------------------------------- | --------- | --------------------------- |
| **Vault Dashboard（专有插件）**          | 主页 / 总览   | 发布包已预置主页布局                  |
| **Task Matrix（专有插件）**              | 全局任务视图    | 开箱即扫全库任务                    |
| **Project Master（专有插件，仅PC，手机不适用）** | 项目看板      | 识别 TPL-Project frontmatter  |
| **Quick Journal（专有插件）**            | 日志录入与汇总   | 按钮已预埋在 Journal 模板中          |
| Tasks                              | 任务语法与查询   | 不变                          |
| Dataview                           | 模板内轻量查询   | 职责收窄：只管模板内查询与"新增笔记"类表格      |
| Journals                           | 周期笔记创建与日历 | 不变                          |
| Templater                          | 模板动态填充    | 不变                          |
| QuickAdd                           | 快速捕获 / 创建 | 职责收窄：收集类 Capture 保留，统计类脚本移除 |
| Spaced Repetition                  | 间隔重复复习    | 不变                          |

## 8. 日常使用建议

1. 打开 Obsidian → Vault Dashboard 主页扫一眼，进入状态；
2. 白天：Quick Journal 按钮随手记（待办、打卡、数据、灵感）；复杂任务用四象限挑下一件事；
3. 每天/每周：清 Inbox（配合 Task Matrix 的 GTD 视图），每日日志"日事日毕，日清日高"；
4. 每周/月：周月日志回顾 + Quick Journal 汇总视图；项目进展过一遍 Project Master 甘特；
5. 知识沉淀照旧：知识卡片 → 双链 → 闪卡 → 每日复习。

## 9. 从 1.x 到 2.0：变化对照与迁移说明

### 9.1 模板变化（旧模板可在 GitHub 仓库 1.2.0 tag 中找到）

| 模板 | 1.x | 2.0 |
| --- | --- | --- |
| TPL-Daily | 顶部 journals-home/calendar-nav；提示文字多；脚本驱动的任务滚动 | 模板瘦身，按钮统一由 Quick Journal 驱动；查询块仅保留"今日到期任务" |
| TPL-Weekly | 含"本周日志汇总"DataviewJS（打卡/数据统计） | 移除统计脚本块；保留三张"新增笔记"轻量表；新增周例会区 |
| TPL-Monthly | 含"月度数据统计"（项目表 + 3 张任务统计表 + 2 个 DataviewJS 脚本） | 整章删除，统计交给 Quick Journal / Project Master |
| TPL-Annual | 含项目回顾表 + 年度任务统计 DataviewJS + frontmatter 三组生命之轮数值字段 | 生命之轮改为 `🎯`/`🏆` 两个内联字段指标，由 Quick Journal 生成雷达图；统计块删除；新增自动索引 |

### 9.2 查询与脚本变化

- **移除**：`journal-section-summary`、`annual-daily-task-stats`、`monthly-archive-task-stats` 等统计类 DataviewJS 的模板内用法；任务转甘特、任务批量滚动等 QuickAdd 辅助脚本从核心工作流中退役（920/960 中保留的历史查询/脚本仅作参考）。
- **保留**：模板内轻量 tasks 查询、周/月"新增笔记"表格、闪卡与知识卡片相关流程。

### 9.3 迁移清单（老用户）

> [!warning] ⚠️ 重点提醒：Journal 目录结构调整（默认平铺，可保留旧结构）
> 1.x 的 `500 Journal/` 下设有 `510 Annual / 520 Monthly / 530 Weekly / 540 Daily` 四个子文件夹，按类型分目录存放。**2.0 发布包默认全部铺平在 `500 Journal/` 一个文件夹里**，不再用文件夹区分日志类型，仅通过文件名判断（`YYYY.md` / `YYYY-MM.md` / `YYYY-Www.md` / `YYYY-MM-DD.md`）。
>
> **不强制跟随平铺**：如果你想保持 1.x 的子文件夹结构，需在 **Journals 插件**和 **Quick Journal 插件**的设置里，把各类日志的存放路径改回旧的子文件夹（如 `500 Journal/540 Daily`）即可，历史日志原地不动，模板与插件功能均不受影响。
>
> 若决定切换到平铺结构，路径变化可能导致一系列问题，务必逐项检查：
>
> - **Journals 与 Quick Journal 插件设置**：四类日志的存放路径都要改为 `500 Journal/`，否则新建日志仍会落到旧子文件夹，与平铺结构不一致；
> - **历史日志迁移**：旧子文件夹中的日志需移动到 `500 Journal/` 根目录（文件名不变，移动后插件即可识别）；
> - **Dataview / DataviewJS 查询**：所有写死 `500 Journal/540 Daily`、`500 Journal/530 Weekly` 等路径的查询块和脚本会**查不到数据而静默失效**，需改为 `500 Journal/` 并配合文件名正则过滤（2.0 仓库新模板中的回引查询已按此改写，如仅下载插件，修改路径原本脚本可能失效）；
> - **Tasks 查询**：模板中的 `path does not include 500 Journal/xxx` 之类的过滤条件同样需要更新；

1. 安装并启用四个新插件（新版发布包已预配置；手动安装可从插件文档站获取）；
2. 用新版 TPL-Daily / Weekly / Monthly / Annual 覆盖 Journals 插件指向的模板，并决定日志目录方案：跟随平铺（按上方提醒逐项切换路径），或保持 1.x 子文件夹结构（仅需在 Journals 和 Quick Journal 设置里改回旧路径）；
3. 无论哪种方案，插件都直接读现有任务与 frontmatter，历史数据本身兼容；
4. 旧模板中的统计块如仍想保留，可自行复制回模板，不影响插件运行（注意其中路径需与你选定的目录结构一致）；

## 10. 总结

2.0 方法论不变，升级的是**工具**：GTD / PARA / Zettelkasten / 间隔重复的骨架不变，原先靠查询和脚本拼出来的体系，现在由插件原生支持，因此更快也更稳。**任何笔记体系都是为了服务于你的思考和行动**，框架已就位，剩下的交给大家持续使用、链接和回顾。

---
obsidianUIMode: preview
type: readme
---

# Obsidian任务日历

使用[Obsidian-Dataview](https://github.com/blacksmithgu/obsidian-dataview)构建的自定义视图，用于在高度可定制的日历中展示[Obsidian-Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks)和每日笔记中的任务，支持多种视图模式

![[Pasted image 20250704220130.png]]

## 安装设置
1. 从外部插件安装"Dataview"
2. 创建一个名为"tasksCalendar"或任意名称的新文件夹，并将"view.js"和"view.css"文件粘贴到其中

![[Pasted image 20250704220404.png]]

3. 创建新笔记或编辑现有笔记，添加以下代码：

````
```dataviewjs
await dv.view("tasksCalendar", {pages: "", view: "month", firstDayOfWeek: "1", options: "style1"})
```
````

如果将主文件(js/css)粘贴到"tasksCalendar"以外的文件夹，需要替换第一个引号中的名称。
 
4. 有4个不同的变量可以设置路径/位置("pages")、日历视图样式("view")、每周的第一天(0或1)("firstDayOfWeek")和一些样式类("options")

---
## 必需参数

### pages（查询范围）:

帮助和说明请参考[Dataview帮助](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvpagessource)
```
pages: ""
```
从Obsidian所有笔记中获取任务。

```
pages: '"Task Management/Work"'
```
设置自定义文件夹以获取任务。

dv.pages命令与dataview插件中的完全相同。

```
pages: "dv.pages().file.tasks.where(t => t.tags.includes('#Pierre'))"
pages: "dv.pages().file.tasks.where(t=>!t.checked && t.header.subpath != 'Log')"
pages: "dv.pages().file.where(f=>f.tags.includes('#ToDo') || f.tags.includes('#Task')).where(f=>f.folder != 'Inbox').tasks"
```
也可以定义复杂查询。这些查询必须以`dv.pages`开头，并输出任务结果。

### view（视图设置）:
```
view: "list"
view: "month"
view: "week"
```
使用view参数可以设置默认的日历视图。
  

### firstDayOfWeek（每周第一天）:
```
firstDayOfWeek: "1"
firstDayOfWeek: "0"
```
设置周一(1)或周日(0)作为每周的第一天


### options（样式选项）:
```
options: "style1"
```
您有多种选项可以个性化您的任务日历。绝对必须设置的是将自定义周视图样式(style1, style2, ...)作为默认周视图样式。但是，您可以通过再次点击周视图按钮随时在日历中切换不同的样式。

![[Pasted image 20250704220426.png]]

不仅如此。使用options参数，您可以隐藏不需要或不喜欢的元素，获得日历的迷你版本等等...

```
options: "noIcons"
```

隐藏每个任务前的图标。

```
options: "noProcess"
```
默认情况下，任务日历会显示带有开始日期和截止日期的任务，在这两个日期之间的所有天数上都会显示，就像日历应用程序显示全天事件一样。如果您不喜欢这样，可以使用`noProcess`选项关闭此功能。

```
options: "noDailyNote"
```
隐藏日历中的每日笔记

有些用户不使用Task插件，而是主要使用每日笔记。为了让这些用户也能使用此日历的功能，所有来自每日笔记的任务都会显示在相应日期的每日笔记上。有些Task插件用户可能也会使用每日笔记，可能会觉得在日历中看到这些任务与Task插件的内容混在一起很烦人。使用`noDailyNote`选项可以隐藏所有任务（不包含任何Task插件日期语法）在日历中。

```
options: "noCellNameEvent"
```
默认情况下，您可以点击每个单元格名称直接跳转到每日笔记。如果该日期的每日笔记不存在，则会创建一个新的。这对重度每日笔记用户很有用，但对其他人来说可能很烦人。为了防止意外执行，可以使用`noCellNameEvent`选项禁用单元格名称的点击事件。

```
options: "mini"
```
将日历的宽度、高度和字体大小缩小为更紧凑的格式。这可以用于将日历嵌入到Obsidian的复杂侧边栏中。
在移动设备上，字体大小会自动减小（在某些视图上），因为屏幕尺寸有限。

```
options: "noWeekNr"
```
隐藏月日历中每个周包装器前面的周数。禁用后，很遗憾无法直接跳转到所需的周。

```
options: "noFilename"
```
隐藏任务标题行中的笔记文件名

```
options: "lineClamp1"
options: "lineClamp2"
options: "lineClamp3"
options: "noLineClamp"
```
设置显示任务中的行限制为1-3行。默认设置为1行。或者您可以禁用行限制，显示完整的任务描述文本。

```
options: "noLayer"
```
可以使用此选项隐藏网格的背景层（包含月份或周信息）。

```
options: "noOverdueDays"
```
您可以使用此选项隐藏过期任务上的过期天数标志。

### 可选参数

#### dailyNoteFolder（每日笔记文件夹）:
```
dailyNoteFolder: "MyCustomFolder"
dailyNoteFolder: "Inbox/Daily Notes/Work"
```
仅在使用时才需要指定此参数。您可以在此定义每日笔记的自定义文件夹路径，如果它们不应保存在新文件的默认文件夹中。当然，也可以在此定义多级文件夹结构。

#### dailyNoteFormat（每日笔记格式）:
```
dailyNoteFormat: "YYYY, MMMM DD - dddd"
```
仅在使用时才需要指定此参数。如果没有此参数，则使用默认格式"YYYY-MM-DD"来识别您的每日笔记。您可以设置自定义格式，使用有限的字符集：Y M D [W] ww d . , - : (空格)

#### startPosition（起始位置）:

月份：2022年12月
```
view: "month"
startPosition: "2022-12"
```

周：2022年第50周
```
view: "week"
startPosition: "2022-50"
```
此参数是可选的，可用于设置自定义月份或周，以便在加载后聚焦。月份视图的默认格式是`YYYY-MM`，周视图是`YYYY-ww`。前4位数字代表年份，后1-2位数字代表月份或周。两者必须用减号分隔。

#### globalTaskFilter（全局任务过滤器）:
```
globalTaskFilter: "#task"
```
仅在使用时才需要指定此参数。设置全局任务过滤器以隐藏在任务日历中的任务文本/描述。

#### css（自定义CSS）:
```
css: ".tasksCalendar.style4[view='week'] .grid { height: 300px !important }"
```
现在您可以在css参数中编写自定义CSS规则。请使用开发者控制台来识别元素的类！每个样式字符串应以.tasksCalendar开头，以避免CSS冲突！

---

## 笔记颜色和图标
在每个笔记文件中，您可以定义自定义"color"和"icon"以在日历中显示。为此，您只需在笔记的第一行添加以下元数据。默认情况下，笔记颜色用于半透明背景和文本颜色。如果您想给任务一个与笔记颜色完全不同的颜色，请使用textColor元数据。

```
---
color: "#bf5af2"
textColor: "#000000"
icon: "❤️"
---
```
    
颜色应为带引号的十六进制值才能正常工作。此颜色设置为文本和半透明背景。图标本身放置在任务文件名标题的前面。

![[Pasted image 20250704220508.png]]

## 过滤功能
在日历视图的左上角有一个过滤图标，点击可以切换显示或隐藏已完成和已取消的任务。默认情况下，如果options参数中包含"filter"，则过滤功能默认启用。

![[Pasted image 20250704220528.png]]

## 统计与聚焦功能
在日历视图的右上角有一个统计按钮，点击后会显示当前所选月份/周的所有任务详细列表。通过选择特定任务类型，可以聚焦显示这些任务，同时淡化其他任务，这样能更容易找到您需要的任务。

通过直观的图标和计数器，您可以快速了解所选月份/周内未完成任务的情况，而无需打开弹出窗口。

![[Pasted image 20250704220544.png]]

## 其他特性
1. **日期导航**：在月视图和周视图中，可以通过左右箭头轻松切换不同时间段
2. **任务交互**：点击任务可以直接跳转到对应的笔记位置
3. **响应式设计**：自动适应不同屏幕尺寸，在移动设备上有优化显示
4. **多视图切换**：支持在列表、月、周三种视图间快速切换

## 常见问题
1. **插件不工作**：
   - 确保Dataview插件已安装并启用
   - 检查Dataview插件版本是否为0.5.63以上
   - 确认view.js和view.css文件路径正确

2. **任务显示不全**：
   - 检查pages参数设置是否正确
   - 确认任务符合Tasks插件或每日笔记的格式要求

3. **样式问题**：
   - 可以尝试不同的style选项
   - 使用css参数添加自定义样式

如需进一步帮助，可以参考插件的GitHub页面或联系开发者。
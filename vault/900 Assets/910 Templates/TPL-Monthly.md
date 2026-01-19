---
journal: Monthly
journal-date: 
type: monthly_review
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
created: <% tp.date.now() %>
tags:
  - journal/monthly
statistic: weight⚖️
---

# <% tp.file.title %> 月度日志

## 🎯 月度目标与计划  

### 本月目标  
- [ ] 

### 重点项目/任务  
- [ ] 

### 🔄 上月Rollover Todos


## 🤔 月度回顾与总结  

- **本月最大的成就/亮点**:
- **遇到的挑战/问题**:
- **从中学习到的**:


## 🔄 下月展望与调整

- ...

## 📊月度数据统计
**本月开始/截止/完成的项目：**
```dataview
TABLE status, start_date as start, due_date as due, completion_date as done
FROM "100 Projects"
WHERE (start_date AND dateformat(date(start_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
   OR (completion_date AND dateformat(date(completion_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
   OR (due_date AND dateformat(date(due_date), "yyyy-MM") = dateformat(date(this.file.frontmatter["journal-date"]), "yyyy-MM"))
SORT completion_date DESC
```

**本月任务完成统计：**  
```dataview
TABLE sum(rows.完成任务数) as 完成任务数
FROM "500 Journal/540 Daily"
WHERE journal-date AND dateformat(journal-date, "yyyy-MM") = "<% tp.date.now("YYYY-MM") %>"
FLATTEN length(filter(file.tasks, (t) => t.status = "x")) as 完成任务数
GROUP BY dateformat(file.day, "yyyy-MM") as Month
```

**本月每日任务完成统计：**  
```dataview
TABLE length(filter(file.tasks, (t) => t.completed = true)) as 完成任务数
FROM "500 Journal/540 Daily"
WHERE journal-date AND dateformat(journal-date, "yyyy-MM") = "<% tp.date.now("YYYY-MM") %>"
SORT file.day ASC
```

```dataviewjs
// 获取当前笔记的journal-date元数据来确定要统计的月份
const currentPage = dv.current();
let targetMonth;

if (currentPage["journal-date"]) {
  // 使用当前笔记的journal-date所在月份
  targetMonth = dv.date(currentPage["journal-date"]).toFormat('yyyy-MM');
} else {
  // 如果当前笔记没有journal-date，使用当前月份
  targetMonth = dv.date('now').toFormat('yyyy-MM');
}

const pages = dv.pages('"500 Journal/540 Daily"')
  .where(p => p["journal-date"] && 
        dv.date(p["journal-date"]).toFormat('yyyy-MM') === targetMonth)
  .sort(p => p["journal-date"], 'asc')

// 准备图表数据
const dates = pages.map(p => dv.date(p["journal-date"]).toFormat('MM-dd'))
const completed = pages.map(p => {
  const tasks = p.file.tasks || []
  return tasks.filter(t => t.status === "x").length
})

// 分别准备工作日和周末的数据
const workdayData = [];
const weekendData = [];

pages.forEach(p => {
  const dayOfWeek = dv.date(p["journal-date"]).toFormat('c') // 1-7 (1=周一,7=周日)
  const tasks = p.file.tasks || []
  const completedCount = tasks.filter(t => t.status === "x").length
  
  if (dayOfWeek == 6 || dayOfWeek == 7) {
    // 周末
    weekendData.push(completedCount);
    workdayData.push(0); // 用0代替null
  } else {
    // 工作日
    workdayData.push(completedCount);
    weekendData.push(0); // 用0代替null
  }
})

// 检查是否有数据
if (pages.length === 0) {
  dv.paragraph(`📅 ${targetMonth} 月份没有找到日记记录`);
} else {
  // 渲染图表 - 使用两个数据系列来区分颜色
  dv.paragraph(`\`\`\`chart
type: bar
labels: [${dates.map(d => `"${d}"`).join(',')}]
series:
  - title: 工作日完成任务
    data: [${workdayData.join(',')}]
  - title: 周末完成任务  
    data: [${weekendData.join(',')}]
width: 100%
height: 400px
\`\`\``)
}
```

## ✅ 习惯追踪与回顾
```dataview
TABLE WITHOUT ID
	file.name as "📅",
	🧠flashcard as "🧠✅",
	💊medicine as "💊✅",
	🧘‍♂️meditation as "🧘‍♂️✅",
	🍽️fasting as "🍽️✅",
	weight⚖️ as "⚖️⚖️",
	exercise🕓 as "🏃🕓",
	reading🕓 as "📖🕓"
FROM "500 Journal/540 Daily"
WHERE date(file.name) >= this.journal-date
	AND date(file.name) <= date(dateformat(date(this.journal-date + dur(1 month)), "yyyy-MM-dd"))
SORT file.name ASC
```

```dataviewjs
// 动态统计图表 - 根据当前笔记的YAML元数据配置
const currentFile = dv.current();

// 获取当前笔记的配置
const journalDate = currentFile["journal-date"];
const journalMetadata = currentFile["statistic"];

// 验证必要的配置
if (!journalMetadata) {
    dv.paragraph("❌ 请在当前笔记的YAML中设置 `statistic` 来指定要统计的项目（如：`weight⚖️` 或 `exercise🕓`）");
} else {

// 根据元数据类型设置图表配置
const getChartConfig = (metadataType) => {
    const configs = {
        'weight⚖️': {
            label: '体重 (kg)',
            yAxisTitle: '体重 (kg)',
            chartTitle: '每日体重变化趋势',
            color: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            unit: 'kg',
            icon: '⚖️'
        },
        'exercise🕓': {
            label: '锻炼时间 (分钟)',
            yAxisTitle: '锻炼时间 (分钟)',
            chartTitle: '每日锻炼时间统计',
            color: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            unit: '分钟',
            icon: '🏃'
        },
        'reading🕓': {
            label: '阅读时间 (分钟)',
            yAxisTitle: '阅读时间 (分钟)',
            chartTitle: '每日阅读时间统计',
            color: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            unit: '分钟',
            icon: '📖'
        }
    };
    
    return configs[metadataType] || {
        label: metadataType,
        yAxisTitle: metadataType,
        chartTitle: `${metadataType} 统计图表`,
        color: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        unit: '',
        icon: '📊'
    };
};

const config = getChartConfig(journalMetadata);

// 创建图表配置
const chartData = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: config.label,
            data: [],
            borderColor: config.color,
            backgroundColor: config.backgroundColor,
            tension: 0.1,
            pointBackgroundColor: config.color,
            pointBorderColor: config.color,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: config.chartTitle,
                font: {
                    size: 16
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: '日期'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: config.yAxisTitle
                },
                beginAtZero: false
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
};

// 从文件名中提取日期的函数
const extractDateFromFilename = (filename) => {
    const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
        const dateStr = dateMatch[1];
        const date = new Date(dateStr + 'T00:00:00');
        return isNaN(date.getTime()) ? null : date;
    }
    return null;
};

// 日期解析函数
const parseJournalDate = (dateInput) => {
    if (!dateInput || String(dateInput).trim() === "") {
        return null;
    }
    
    const dateStr = String(dateInput).trim();
    let targetDate = null;
    
    // 直接使用 new Date() 解析（适用于ISO格式）
    targetDate = new Date(dateStr);
    if (!isNaN(targetDate.getTime())) {
        return targetDate;
    }
    
    // 如果是ISO格式，提取日期部分
    const isoMatch = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
    if (isoMatch) {
        targetDate = new Date(isoMatch[1] + 'T00:00:00');
        if (!isNaN(targetDate.getTime())) {
            return targetDate;
        }
    }
    
    // 简单的 YYYY-MM-DD 格式
    const simpleMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (simpleMatch) {
        const [, year, month, day] = simpleMatch;
        targetDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (!isNaN(targetDate.getTime())) {
            return targetDate;
        }
    }
    
    return null;
};

// 根据journal-date确定查询范围
let timeRangeText = "所有时间";
let targetYear = null;
let targetMonth = null;

if (journalDate && String(journalDate).trim() !== "") {
    const targetDate = parseJournalDate(journalDate);
    if (targetDate && !isNaN(targetDate.getTime())) {
        targetYear = targetDate.getFullYear();
        targetMonth = targetDate.getMonth();
        timeRangeText = `${targetYear}年${String(targetMonth + 1).padStart(2, '0')}月`;
    }
}

// 查询数据
const allPages = dv.pages('"500 Journal/540 Daily"')
    .where(p => {
        const value = p[journalMetadata];
        return value !== undefined && value !== null && value !== "";
    });

// 根据文件名日期筛选
let pages;
if (targetYear !== null && targetMonth !== null) {
    pages = allPages.where(p => {
        const fileDate = extractDateFromFilename(p.file.name);
        if (fileDate) {
            const fileYear = fileDate.getFullYear();
            const fileMonth = fileDate.getMonth();
            return fileYear === targetYear && fileMonth === targetMonth;
        }
        return false;
    });
} else {
    pages = allPages;
}

// 处理数据
const dataPoints = [];

for (let page of pages) {
    const value = page[journalMetadata];
    const fileDate = extractDateFromFilename(page.file.name);
    
    // 处理数值 - 支持不同格式的数据
    let numValue = parseFloat(value);
    if (isNaN(numValue)) {
        // 尝试从字符串中提取数字（如 "70.5kg" -> 70.5）
        const match = String(value).match(/(\d+\.?\d*)/);
        if (match) {
            numValue = parseFloat(match[1]);
        }
    }
    
    if (!isNaN(numValue) && fileDate) {
        dataPoints.push({
            date: fileDate,
            value: numValue,
            fileName: page.file.name,
            originalValue: value,
            dateStr: page.file.name.match(/(\d{4}-\d{2}-\d{2})/)[1]
        });
    }
}

// 按文件名日期排序
dataPoints.sort((a, b) => a.date.getTime() - b.date.getTime());

// 填充图表数据
chartData.data.labels = dataPoints.map(item => {
    const dateParts = item.dateStr.split('-');
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    return `${month}.${day}`;
});

chartData.data.datasets[0].data = dataPoints.map(item => item.value);

// 设置图表选项以处理数据中断
chartData.options.elements = {
    line: {
        spanGaps: true
    }
};

// 动态设置Y轴范围
if (dataPoints.length > 0) {
    const values = dataPoints.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    
    chartData.options.scales.y.suggestedMin = minValue - range * 0.1;
    chartData.options.scales.y.suggestedMax = maxValue + range * 0.1;
}

// 渲染结果
if (dataPoints.length > 0) {
    // 计算数据覆盖率
    const dateRange = dataPoints.length > 1 ? 
        Math.ceil((dataPoints[dataPoints.length - 1].date - dataPoints[0].date) / (1000 * 60 * 60 * 24)) + 1 : 1;
    const coverageRate = ((dataPoints.length / dateRange) * 100).toFixed(1);
    
    // 显示统计信息
    const currentValue = dataPoints[dataPoints.length - 1].value;
    const firstValue = dataPoints[0].value;
    const valueChange = currentValue - firstValue;
    const maxValue = Math.max(...dataPoints.map(item => item.value));
    const minValue = Math.min(...dataPoints.map(item => item.value));
    const avgValue = dataPoints.reduce((sum, item) => sum + item.value, 0) / dataPoints.length;
    
    dv.paragraph(`
**${config.icon} ${config.label} 统计概览 (${timeRangeText})：**
- 📊 记录天数: ${dataPoints.length} 天
- 📅 数据覆盖率: ${coverageRate}%
- 📈 当前数值: ${currentValue} ${config.unit}
- 📊 平均值: ${avgValue.toFixed(1)} ${config.unit}
- 🔺 最高值: ${maxValue} ${config.unit}
- 🔻 最低值: ${minValue} ${config.unit}
- 📈 总变化: ${valueChange > 0 ? '+' : ''}${valueChange.toFixed(1)} ${config.unit}
    `);
    
    // 渲染图表
    window.renderChart(chartData, this.container);
    
    // 显示最近几次记录
    dv.paragraph("**最近记录：**");
    const recentData = dataPoints.slice(-5).reverse();
    const recentTable = recentData.map(item => [
        `${item.originalValue}`,
        `[[${item.fileName}]]`
    ]);
    
    dv.table([config.label, "日期"], recentTable);
    
} else {
    dv.paragraph(`❌ 在${timeRangeText}内没有找到包含 \`${journalMetadata}\` 数据的笔记。`);
    dv.paragraph(`📝 使用示例：在笔记的YAML前言中添加 \`${journalMetadata}: 数值\` 或在正文中使用内联元数据 \`[${journalMetadata}:: 数值]\``);
    dv.paragraph(`📋 确保日志文件名格式为 YYYY-MM-DD（如：2024-01-15.md）`);
}

// 显示当前配置信息
dv.paragraph(`
---
**当前配置：**
- 📊 统计项目: \`${journalMetadata}\`
- 📅 时间范围: ${timeRangeText}
- 📝 查询路径: "500 Journal/540 Daily"
- 📋 日期来源: 文件名 (YYYY-MM-DD 格式)
`);
}
```

## 📝 笔记与知识整理

- 本月新增的 Zettelkasten 笔记：
```dataview
TABLE 
  created as "创建时间",
  file.mtime as "修改时间",
  aliases as "卡片名称"
FROM "600 Zettelkasten"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date(this.journal-date + dur(1 month)), "yyyy-MM-dd"))
SORT created DESC
```

- 本月新增资源笔记：
```dataview
TABLE 
  file.ctime as "系统创建时间",
  created as "创建时间",
  status
FROM "300 Resources"
WHERE created >= this.journal-date
	AND created <= date(dateformat(date(this.journal-date + dur(1 month)), "yyyy-MM-dd"))
SORT created DESC
limit 20
```

## 🔗 相关日志


```calendar-timeline
mode: month
```
```journals-home
show:
  - day
  - week
  - month
  - year
scale: 1
separator: " | "
```


---

`button-archiveJournal`


---
journal: Annual
journal-date:
type: annual_review
year: <% tp.date.now("YYYY") %>
created: <% tp.date.now() %>
tags:
  - journal/annual
cssclasses:
  - matrix
---

# <% tp.file.title %> 年度日志

## 🚀 年度目标回顾与设定

### <% tp.date.now("YYYY", "P-1Y") %> 年目标回顾
- [ ] 目标一回顾：完成情况，经验总结
- [ ] 目标二回顾：完成情况，经验总结
- ...

### <% tp.date.now("YYYY") %> 年核心目标
- [ ] 目标一：具体内容
- [ ] 目标二：具体内容
- ...

> *提示1: 可以使用 Tasks 语法设定目标，方便年度/月度/周度回顾时追踪进度。*

> *提示2: 可以根据生命之轮（Wheel of Life）从情绪健康、职业发展、亲密关系、身体健康、个人成长、休闲娱乐、社交生活、财务状况等8个维度设定年度目标。*

## ✨ 年度高光时刻与挑战

- 高光时刻 1:
- 高光时刻 2:
- ...
- 挑战 1:
- 挑战 2:
- ...

## 🤔 对未来的思考与规划

- ...

## 🌱 个人成长与学习

- 在知识领域 X 的进展:
- 掌握的新技能:
- 重要的书籍/课程/资源:

## 🚧 项目回顾
回顾本年度主要项目完成情况。

```dataview
TABLE status, created, completion_date
FROM "100 Projects"
WHERE (created AND dateformat(date(created), "yyyy") = "2025")
   OR (completion_date AND dateformat(date(completion_date), "yyyy") = "2025") AND (type = "project")
SORT completion_date DESC
```

> *提示: Dataview 查询会列出在本年创建或完成的项目笔记 。*

## 📊 年度数据统计
汇总年度任务、笔记等数据。

```dataviewjs
// 获取当前页面的journal-date.year属性，如果没有则使用当前年份
const currentYear = dv.current()["journal-date"]?.year || new Date().getFullYear();

// 查询指定年份的所有日记页面
const pages = dv.pages('"500 Journal/540 Daily"')
    .where(p => p.file.day && 
           dv.date(p.file.day).year === currentYear);

// 按月份分组并统计完成任务数
const monthlyData = {};

pages.forEach(page => {
    // 获取页面的完成任务数
    const completedTasks = page.file.tasks ? 
        page.file.tasks.filter(t => t.status === "x").length : 0;
    
    // 格式化月份 (yyyy-MM)
    const month = dv.date(page.file.day).toFormat("yyyy-MM");
    
    // 累加每月的完成任务数
    if (monthlyData[month]) {
        monthlyData[month] += completedTasks;
    } else {
        monthlyData[month] = completedTasks;
    }
});

// 转换为图表数据格式并排序
const chartData = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

// 如果没有数据，显示提示信息
if (chartData.length === 0) {
    dv.paragraph(`**${currentYear}年暂无任务完成数据**`);
} else {

// 使用Charts插件渲染柱状图
const chartConfig = {
    type: 'bar',
    data: {
        labels: chartData.map(item => item.month),
        datasets: [{
            label: '完成任务数',
            data: chartData.map(item => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${currentYear}年每月任务完成统计`
            },
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: '完成任务数'
                }
            },
            x: {
                title: {
                    display: true,
                    text: '月份'
                }
            }
        }
    }
};

// 渲染图表
window.renderChart(chartConfig, this.container);

// 同时显示数据表格（可选）
dv.paragraph("---");
dv.header(3, "详细数据");
dv.table(
    ["月份", "完成任务数"],
    chartData.map(item => [item.month, item.count])
);
}
```

> *提示: 此 Dataview 示例统计每日完成任务数的月度汇总。*

## 🔗 相关笔记

- [[<% tp.date.now("YYYY", "P-1Y") %>]] 年度日志
- <% tp.date.now("YYYY") %> 年月度日志 Index
	- [[<% tp.date.now("YYYY-01") %>]]
	- [[<% tp.date.now("YYYY-02") %>]]
	- [[<% tp.date.now("YYYY-03") %>]]
	- [[<% tp.date.now("YYYY-04") %>]]
	- [[<% tp.date.now("YYYY-05") %>]]
	- [[<% tp.date.now("YYYY-06") %>]]
	- [[<% tp.date.now("YYYY-07") %>]]
	- [[<% tp.date.now("YYYY-08") %>]]
	- [[<% tp.date.now("YYYY-09") %>]]
	- [[<% tp.date.now("YYYY-10") %>]]
	- [[<% tp.date.now("YYYY-11") %>]]
	- [[<% tp.date.now("YYYY-12") %>]]

```journals-home
show:
  - day
  - week
  - month
  - year
scale: 1
separator: " | "
```


### 生命之轮


|                         |                                        |
| ----------------------- | -------------------------------------- |
| ![[生命之轮#Wheel of Life]] | ![[生命之轮#**说明**]]<br>![[生命之轮#**使用方法**]] |


// DataviewJS - 任务完成统计（支持年度和月度）
// 使用方法：在年度日志或月度日志中使用 dv.view("900 Assets/960 Scripts/annual-daily-task-stats.js")

// 获取当前页面信息
const currentPage = dv.current();
const currentPath = currentPage.file.path;

// 判断当前日志类型
let logType = null;

if (currentPath.includes("500 Journal/510 Annual")) {
  logType = 'annual';
} else if (currentPath.includes("500 Journal/520 Monthly")) {
  logType = 'monthly';
}

if (!logType) {
  dv.paragraph('❌ 请在年度日志或月度日志中使用此脚本');
  return;
}

// 根据日志类型执行不同的统计逻辑
if (logType === 'annual') {
  // ===== 年度日志：按月统计 =====

  // 获取当前页面的journal-date.year属性，如果没有则使用当前年份
  const currentYear = currentPage["journal-date"]?.year || new Date().getFullYear();

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

    // 创建图表容器并渲染
    const chartContainer = dv.el('div', '');
    window.renderChart(chartConfig, chartContainer);

    // 同时显示数据表格
    dv.paragraph("---");
    dv.header(3, "详细数据");
    dv.table(
        ["月份", "完成任务数"],
        chartData.map(item => [item.month, item.count])
    );
  }

} else if (logType === 'monthly') {
  // ===== 月度日志：按日统计（区分工作日和周末）=====

  // 获取当前笔记的journal-date元数据来确定要统计的月份
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
      workdayData.push(0);
    } else {
      // 工作日
      workdayData.push(completedCount);
      weekendData.push(0);
    }
  })

  // 检查是否有数据
  if (pages.length === 0) {
    dv.paragraph(`📅 ${targetMonth} 月份没有找到日记记录`);
  } else {
    // 汇总统计
    const totalCompleted = workdayData.reduce((a, b) => a + b, 0) + weekendData.reduce((a, b) => a + b, 0);
    const workdayTotal = workdayData.reduce((a, b) => a + b, 0);
    const weekendTotal = weekendData.reduce((a, b) => a + b, 0);
    const workdayAvg = (workdayTotal / workdayData.filter(x => x > 0).length).toFixed(1) || 0;
    const weekendAvg = (weekendTotal / weekendData.filter(x => x > 0).length).toFixed(1) || 0;

    dv.paragraph(`
---
**📈 ${targetMonth} 月份统计概览：**
- 📅 统计天数：${pages.length} 天
- ✅ 总完成任务数：${totalCompleted}
- 📊 工作日完成：${workdayTotal} 个（平均 ${workdayAvg} 个/天）
- 📊 周末完成：${weekendTotal} 个（平均 ${weekendAvg} 个/天）
    `);

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
\`\`\``);
  }
}

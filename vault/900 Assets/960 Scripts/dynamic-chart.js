// 900 Assets/960 Scripts/dynamic-chart.js
// 动态图表 - 使用Dataview API查询硬编码的内联字段并渲染图表

// 默认配置
let config = {
  journalDate: null,
  dataPath: "500 Journal/540 Daily",
  showRecentRecords: false,
  recentRecordsCount: 5,
  itemName: "数据",
  itemUnit: ""
};

// 处理输入参数
if (input !== undefined) {
  config = { ...config, ...input };
}

// 获取当前笔记信息
const currentFile = dv.current();
const journalDate = config.journalDate !== null ? config.journalDate : currentFile["journal-date"];

// 硬编码的可用字段列表及配置
const availableFields = [
  { name: "weight⚖️", icon: "⚖️", unit: "kg", label: "体重" },
  { name: "exercise🕓", icon: "🏃", unit: "分钟", label: "锻炼时间" },
  { name: "reading🕓", icon: "📖", unit: "分钟", label: "阅读时间" },
  { name: "saving💰", icon: "💰", unit: "元", label: "储蓄" },
  { name: "spent💰", icon: "💸", unit: "元", label: "支出" }
];

/**
 * 从文件名中提取日期的函数
 */
const extractDateFromFilename = (filename) => {
    const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
        const dateStr = dateMatch[1];
        const date = new Date(dateStr + 'T00:00:00');
        return isNaN(date.getTime()) ? null : date;
    }
    return null;
};

/**
 * 日期解析函数
 */
const parseJournalDate = (dateInput) => {
    if (!dateInput || String(dateInput).trim() === "") {
        return null;
    }

    const dateStr = String(dateInput).trim();
    let targetDate = null;

    targetDate = new Date(dateStr);
    if (!isNaN(targetDate.getTime())) {
        return targetDate;
    }

    const isoMatch = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
    if (isoMatch) {
        targetDate = new Date(isoMatch[1] + 'T00:00:00');
        if (!isNaN(targetDate.getTime())) {
            return targetDate;
        }
    }

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

/**
 * 从日志中提取指定字段的数据
 */
async function extractDataForField(fieldName) {
  const allPages = dv.pages(`"${config.dataPath}"`)
      .where(p => {
          const value = p[fieldName];
          return value !== undefined && value !== null && value !== "";
      });

  // 根据journal-date筛选
  let pages;
  let timeRangeText = "所有时间";
  let targetYear = null;
  let targetMonth = null;
  let daysInMonth = 0;

  if (journalDate && String(journalDate).trim() !== "") {
      const targetDate = parseJournalDate(journalDate);
      if (targetDate && !isNaN(targetDate.getTime())) {
          targetYear = targetDate.getFullYear();
          targetMonth = targetDate.getMonth();
          timeRangeText = `${targetYear}年${String(targetMonth + 1).padStart(2, '0')}月`;

          // 计算当月天数
          const lastDayOfMonth = new Date(targetYear, targetMonth + 1, 0);
          daysInMonth = lastDayOfMonth.getDate();

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
  } else {
      pages = allPages;
  }

  // 按文件名日期排序
  pages = pages.sort(p => p.file.name, 'asc');

  // 处理数据
  const dataPoints = [];

  for (const page of pages) {
      const value = page[fieldName];
      const fileDate = extractDateFromFilename(page.file.name);

      // 处理数值 - 支持不同格式的数据
      let numValue = parseFloat(value);
      if (isNaN(numValue)) {
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

  return { dataPoints, timeRangeText, daysInMonth };
}

// 创建容器
const container = dv.el('div', '');
const selectorContainer = dv.el('div', '', {
  container: container,
  style: "margin-bottom: 15px;"
});
const chartContentContainer = dv.el('div', '', {
  container: container
});

/**
 * 渲染图表
 */
async function renderChart(fieldName) {
  // 清空图表内容
  chartContentContainer.innerHTML = '';

  // 获取字段配置
  const fieldConfig = availableFields.find(f => f.name === fieldName);
  if (!fieldConfig) {
    dv.el('p', `❌ 未找到字段配置: ${fieldName}`, {
      container: chartContentContainer,
      style: "color: var(--text-error);"
    });
    return;
  }

  // 提取数据
  const { dataPoints, timeRangeText, daysInMonth } = await extractDataForField(fieldName);

  if (dataPoints.length === 0) {
    dv.el('p', `❌ 在${timeRangeText}内没有找到包含 \`${fieldName}\` 数据的笔记。`, {
      container: chartContentContainer,
      style: "color: var(--text-muted);"
    });
    return;
  }

  // 创建图表配置
  const chartData = {
    type: 'line',
    data: {
      labels: dataPoints.map(item => {
          const dateParts = item.dateStr.split('-');
          const month = parseInt(dateParts[1]);
          const day = parseInt(dateParts[2]);
          return `${month}.${day}`;
      }),
      datasets: [{
          label: fieldConfig.label,
          data: dataPoints.map(item => item.value),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: 'rgb(75, 192, 192)',
          pointRadius: 4,
          pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
          title: {
              display: true,
              text: `${fieldConfig.label}统计图表`,
              font: { 
                  size: 16,
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              },
              color: 'var(--text-normal)',
              padding: {
                  bottom: 20
              }
          },
          legend: {
              display: true,
              position: 'top',
              labels: {
                  color: 'var(--text-normal)',
                  font: {
                      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  },
                  padding: 20
              }
          },
          tooltip: {
              mode: 'index',
              intersect: false,
              titleColor: 'var(--text-normal)',
              bodyColor: 'var(--text-muted)',
              backgroundColor: 'var(--background-secondary)',
              borderColor: 'var(--background-modifier-border)',
              borderWidth: 1
          }
      },
      scales: {
          x: {
              display: true,
              title: {
                  display: true,
                  text: '日期',
                  color: 'var(--text-normal)',
                  font: {
                      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }
              },
              ticks: {
                  color: 'var(--text-muted)',
                  font: {
                      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }
              },
              grid: {
                  color: 'var(--background-modifier-border-hover)',
                  drawBorder: false
              },
              border: {
                  display: false
              }
          },
          y: {
              display: true,
              title: {
                  display: true,
                  text: fieldConfig.label,
                  color: 'var(--text-normal)',
                  font: {
                      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }
              },
              ticks: {
                  color: 'var(--text-muted)',
                  font: {
                      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }
              },
              grid: {
                  color: 'var(--background-modifier-border-hover)',
                  drawBorder: false
              },
              border: {
                  display: false
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

  // 设置图表选项以处理数据中断
  chartData.options.elements = {
      line: { spanGaps: true }
  };

  // 动态设置Y轴范围
  const values = dataPoints.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  chartData.options.scales.y.suggestedMin = minValue - range * 0.1;
  chartData.options.scales.y.suggestedMax = maxValue + range * 0.1;

  // 计算统计信息
  let coverageRate = "0.0";
  let coverageBaseText = "所选日期范围";

  if (daysInMonth > 0) {
      coverageRate = ((dataPoints.length / daysInMonth) * 100).toFixed(1);
      coverageBaseText = `${timeRangeText} (${daysInMonth}天)`;
  } else if (dataPoints.length > 1) {
      const startDate = dataPoints[0].date;
      const endDate = dataPoints[dataPoints.length - 1].date;
      const daysInRange = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      const datesWithData = new Set();
      dataPoints.forEach(item => {
          datesWithData.add(item.date.toDateString());
      });

      coverageRate = ((datesWithData.size / daysInRange) * 100).toFixed(1);
      coverageBaseText = `数据时间范围 (${daysInRange}天)`;
  } else if (dataPoints.length === 1) {
      coverageRate = "100.0";
      coverageBaseText = "单日记录";
  }

  const currentValue = dataPoints[dataPoints.length - 1].value;
  const firstValue = dataPoints[0].value;
  const valueChange = currentValue - firstValue;
  const maxValue_ = Math.max(...dataPoints.map(item => item.value));
  const minValue_ = Math.min(...dataPoints.map(item => item.value));
  const avgValue = dataPoints.reduce((sum, item) => sum + item.value, 0) / dataPoints.length;

  // 图表标题
  dv.paragraph(`**${fieldConfig.icon} ${fieldConfig.label}统计概览 (${timeRangeText})：**`);

  // 创建统计卡片
  const firstRowStats = [
      { label: '平均值', value: `${avgValue.toFixed(1)} ${fieldConfig.unit}`, icon: '📊', color: '#F59E0B' },
      { label: '最高值', value: `${maxValue_} ${fieldConfig.unit}`, icon: '🔺', color: '#EF4444' },
      { label: '最低值', value: `${minValue_} ${fieldConfig.unit}`, icon: '🔻', color: '#8B5CF6' },
      { label: '总变化', value: `${valueChange > 0 ? '+' : ''}${valueChange.toFixed(1)} ${fieldConfig.unit}`, icon: '📈', color: '#4F46E5' }
  ];

  const secondRowStats = [
      { label: '记录天数', value: `${dataPoints.length} 天`, icon: '📊', color: '#4F46E5' },
      { label: '数据覆盖率', value: `${coverageRate}%`, icon: '📋', color: '#06B6D4', subtext: coverageBaseText }
  ];

  let firstRowHTML = '<div style="display: flex; gap: 12px; margin-bottom: 12px;">';
  firstRowStats.forEach(stat => {
      firstRowHTML += `
      <div style="
          flex:1;
          background: linear-gradient(135deg, var(--background-secondary) 0%, var(--background-primary-alt) 100%);
          border-radius: 12px;
          padding: 12px;
          box-shadow:0 2px 8px rgba(0, 0, 0, 0.06);
          border:1px solid var(--background-modifier-border);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          min-width: 0;
      ">
          <div style="
              color: var(--text-muted);
              font-size: 0.75rem;
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              font-weight: 500;
          ">
              <span style="font-size: 1rem; margin-right: 6px;">${stat.icon}</span>
              <span>${stat.label}</span>
          </div>
          <div style="
              color: var(--text-normal);
              font-size: 1.1rem;
              font-weight: 700;
              line-height: 1.2;
          ">${stat.value}</div>
          ${stat.subtext ? `<div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 4px;">${stat.subtext}</div>` : ''}
          <div style="
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 3px;
              border-radius: 0 0 12px 12px;
              background: ${stat.color};
          "></div>
      </div>`;
  });
  firstRowHTML += '</div>';

  let secondRowHTML = '<div style="display: flex; gap: 12px; justify-content: center;">';
  secondRowStats.forEach(stat => {
      secondRowHTML += `
      <div style="
          flex: 0 0 calc(50% - 6px);
          background: linear-gradient(135deg, var(--background-secondary) 0%, var(--background-primary-alt) 100%);
          border-radius: 12px;
          padding: 12px;
          box-shadow:0 2px 8px rgba(0, 0, 0, 0.06);
          border:1px solid var(--background-modifier-border);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          min-width: 0;
      ">
          <div style="
              color: var(--text-muted);
              font-size: 0.75rem;
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              font-weight: 500;
          ">
              <span style="font-size: 1rem; margin-right: 6px;">${stat.icon}</span>
              <span>${stat.label}</span>
          </div>
          <div style="
              color: var(--text-normal);
              font-size: 1.1rem;
              font-weight: 700;
              line-height: 1.2;
          ">${stat.value}</div>
          ${stat.subtext ? `<div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 4px;">${stat.subtext}</div>` : ''}
          <div style="
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 3px;
              border-radius: 0 0 12px 12px;
              background: ${stat.color};
          "></div>
      </div>`;
  });
  secondRowHTML += '</div>';

  dv.el('div', firstRowHTML + secondRowHTML, { container: chartContentContainer });

  // 渲染图表
  const chartContainer = dv.el('div', '', { container: chartContentContainer, cls: 'chart-container' });

  try {
      if (typeof window.renderChart === 'function') {
          window.renderChart(chartData, chartContainer);
      } else {
          dv.el('p', "❌ 图表渲染函数不可用。请确保已安装并启用了Dataview图表插件。", {
              container: chartContentContainer,
              style: "color: var(--text-error);"
          });
      }
  } catch (error) {
      dv.el('p', `❌ 图表渲染错误: ${error.message}`, {
          container: chartContentContainer,
          style: "color: var(--text-error);"
      });
  }

  // 显示最近记录
  if (config.showRecentRecords && dataPoints.length > 0) {
      const count = Math.min(config.recentRecordsCount || 5, dataPoints.length);
      const recentData = dataPoints.slice(-count).reverse();
      const recentTable = recentData.map(item => [
          `${item.originalValue} ${fieldConfig.unit}`,
          `[[${item.fileName}]]`
      ]);

      dv.paragraph(`**最近${count}条记录：**`, { container: chartContentContainer });
      dv.table([fieldConfig.label, "日期"], recentTable, { container: chartContentContainer });
  }
}

/**
 * 初始化：创建下拉菜单
 */
async function init() {
  // 创建选择器标签
  dv.el('label', '📊 选择要统计的字段：', {
    container: selectorContainer,
    attr: { style: "margin-right: 10px;" }
  });

  // 创建下拉菜单
  const select = document.createElement('select');
  select.style.cssText = "padding: 8px 12px; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--background-primary); color: var(--text-normal); min-width: 200px;";

  // 获取当前笔记的statistic值
  const currentStatistic = currentFile["statistic"];
  let defaultIndex = 0;

  // 添加硬编码的选项
  availableFields.forEach((field, index) => {
    const option = document.createElement('option');
    option.value = field.name;
    option.textContent = `${field.icon} ${field.label}`;
    select.appendChild(option);

    // 如果当前笔记的statistic匹配，设置为默认选项
    if (currentStatistic && field.name === currentStatistic) {
      defaultIndex = index;
    }
  });

  // 将select添加到容器
  selectorContainer.appendChild(select);

  // 设置默认选中项
  select.selectedIndex = defaultIndex;

  // 监听选择变化
  select.addEventListener('change', (e) => {
    renderChart(e.target.value);
  });

  // 默认渲染选中的字段
  await renderChart(availableFields[defaultIndex].name);
}

// 初始化
init();

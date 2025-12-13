// 默认配置
const config = {
  filePath: "500 Journal/540 Daily",
  year: new Date().getFullYear(),
  color: "red",
  showTitle: false,  // 默认不显示标题
  responsiveWidth: true,  // 默认自适应宽度
  theme: "dark"  // 默认暗色模式
};

// 处理输入参数
if (input !== undefined) {
  config.filePath = input.filePath || config.filePath;
  config.year = input.year || config.year;
  config.color = input.color || config.color;
  config.showTitle = input.showTitle !== undefined ? input.showTitle : config.showTitle;
  config.responsiveWidth = input.responsiveWidth !== undefined ? input.responsiveWidth : config.responsiveWidth;
  config.theme = input.theme !== undefined ? input.theme : config.theme;
}

// 获取所有页面，不进行任何过滤
let allPages = [];
try {
  allPages = dv.pages(`"${config.filePath}"`);
} catch (error) {
  dv.paragraph("获取页面时出错: " + error.message);
  return;
}

// 安全过滤函数
function safeFilter(pages) {
  const result = [];
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    // 检查页面对象是否存在
    if (!page) continue;
    
    // 检查文件对象是否存在
    if (!page.file) continue;
    
    // 检查文件名是否存在
    if (!page.file.name) continue;
    
    // 从文件名或元数据中获取日期
    const fileName = page.file.name;
    const fileDate = fileName.match(/(\d{4}-\d{2}-\d{2})/);
    const metaDate = page["journal-date"];
    const dateStr = fileDate ? fileDate[1] : metaDate;
    
    if (!dateStr) continue;
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) continue;
    
    if (date.getFullYear() === config.year) {
      result.push(page);
    }
  }
  
  return result;
}

// 使用安全过滤函数
const dailyPages = safeFilter(allPages);

// 安全排序函数
function safeSort(pages) {
  return pages.sort((a, b) => {
    // 确保a和b都有file和name属性
    const fileNameA = a && a.file && a.file.name ? a.file.name : "";
    const fileNameB = b && b.file && b.file.name ? b.file.name : "";
    
    const dateMatchA = fileNameA.match(/(\d{4}-\d{2}-\d{2})/);
    const dateMatchB = fileNameB.match(/(\d{4}-\d{2}-\d{2})/);
    
    const dateStrA = dateMatchA ? dateMatchA[1] : (a && a["journal-date"]);
    const dateStrB = dateMatchB ? dateMatchB[1] : (b && b["journal-date"]);
    
    const dateA = new Date(dateStrA || "1970-01-01");
    const dateB = new Date(dateStrB || "1970-01-01");
    
    return dateA - dateB;
  });
}

// 使用安全排序函数
const sortedPages = safeSort(dailyPages);

// 安全统计任务函数
function safeCountTasks(pages) {
  const taskData = {};
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    try {
      // 检查页面对象是否存在
      if (!page || !page.file || !page.file.name) continue;
      
      const fileName = page.file.name;
      const dateMatch = fileName.match(/(\d{4}-\d{2}-\d{2})/);
      const dateStr = dateMatch ? dateMatch[1] : page["journal-date"];
      
      if (!dateStr) continue;
      
      // 统计任务数量
      let taskCount = 0;
      
      // 检查是否有lists属性
      if (page.file.lists && Array.isArray(page.file.lists)) {
        taskCount = page.file.lists
          .filter(item => item.checked === true)
          .length;
      }
      
      taskData[dateStr] = taskCount;
    } catch (error) {
      // 静默处理错误
    }
  }
  
  return taskData;
}

// 使用安全统计任务函数
const taskData = safeCountTasks(sortedPages);

// 生成热力图SVG
function generateHeatmapSVG(data, year, color, showTitle, responsiveWidth, theme) {
  // 获取该年的第一天和最后一天
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  
  // 计算最大值用于颜色映射
  const values = Object.values(data);
  const maxValue = values.length > 0 ? Math.max(...values) : 1;
  
  // 颜色方案 - 亮色模式
  const lightColorSchemes = {
    red: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
    blue: ['#eff3ff', '#deebf7', '#9ecae1', '#3182bd', '#08519c'],
    green: ['#edf8e9', '#c7e9c0', '#a1d99b', '#41ab5d', '#005a32'],
    purple: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#6a51a3']
  };
  
  // 颜色方案 - 暗色模式
  const darkColorSchemes = {
    red: ['#3d1a1a', '#5c1f1f', '#8b2525', '#b52c2c', '#e63946'],
    blue: ['#1a2f4f', '#1e3a5f', '#2c4f7f', '#3a649f', '#4879bf'],
    green: ['#1f3d1f', '#295229', '#336733', '#3d7c3d', '#479147'],
    purple: ['#3d1f3d', '#4d294d', '#5d335d', '#6d3c6d', '#7d467d']
  };
  
  // 文本颜色
  const textColor = theme === "dark" ? "#e0e0e0" : "#333333";
  const monthTextColor = theme === "dark" ? "#b0b0b0" : "#666666";
  
  // 背景色（空格子）
  const emptyCellColor = theme === "dark" ? "#2a2a2a" : "#f5f5f5";
  
  // 选择颜色方案
  const colorScheme = theme === "dark" ? darkColorSchemes : lightColorSchemes;
  const colors = colorScheme[color] || colorScheme.red;
  
  // 获取某天是星期几（0=周一，1=周二，...6=周日）
  function getDayOfWeek(date) {
    // JavaScript中getDay()返回0=周日，1=周一，...6=周六
    // 我们需要转换为0=周一，1=周二，...6=周日
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  }
  
  // 格式化日期为YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // 获取颜色值
  function getColor(value) {
    if (value === 0) return emptyCellColor;
    const index = Math.min(Math.floor((value / maxValue) * colors.length), colors.length - 1);
    return colors[index];
  }
  
  // 创建周数组
  const weeks = [];
  let currentWeek = [];
  
  // 添加空白格子（1月1日之前的空白）
  const firstDayOfWeek = getDayOfWeek(firstDay);
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  
  // 添加每一天的格子
  const currentDate = new Date(firstDay);
  while (currentDate <= lastDay) {
    const dateStr = formatDate(currentDate);
    const value = data[dateStr] || 0;
    
    currentWeek.push({
      date: dateStr,
      value: value,
      color: getColor(value)
    });
    
    // 换行（如果是周日，即我们系统中的第6天）
    if (getDayOfWeek(currentDate) === 6) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    // 移动到下一天
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // 添加最后一周
  if (currentWeek.length > 0) {
    weeks.push([...currentWeek]);
  }
  
  // 定义尺寸常量
  const cellSize = 13; // 每个格子的大小
  const cellMargin = 2; // 每个格子的边距
  const weekWidth = cellSize + cellMargin; // 每周的宽度
  const rowHeight = cellSize + cellMargin; // 每行的总高度
  const labelWidth = 20; // 星期标签的宽度
  const monthLabelHeight = 20; // 月份标签的高度
  const monthLabelMargin = 5; // 月份标签和热力图之间的间距
  const titleHeight = showTitle ? 30 : 0; // 标题的高度
  const titleMargin = showTitle ? 10 : 0; // 标题和月份标签之间的间距
  
  // 计算SVG尺寸 - 修复点：正确计算包含标题的总高度
  const svgWidth = weeks.length * weekWidth + labelWidth;
  const svgHeight = titleHeight + titleMargin + monthLabelHeight + monthLabelMargin + 7 * rowHeight;
  
  // 创建SVG
  let svg = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; font-family: sans-serif; font-size: 12px;">`;
  // 添加标题（根据参数）
  if (showTitle) {
    svg += `<text x="${labelWidth}" y="20" font-weight="bold" fill="${textColor}">${year}年任务完成热力图</text>`;
  }
  // 月份标签行 - 修复点：根据是否显示标题调整Y坐标
  const monthLabelY = showTitle ? titleHeight + titleMargin + 15 : 15;
  // 为每个月份创建标签
  for (let month = 0; month < 12; month++) {
    // 找到这个月份的第一天所在的周
    let startWeek = -1;
    let startDay = -1;
    for (let w = 0; w < weeks.length; w++) {
      for (let d = 0; d < weeks[w].length; d++) {
        const day = weeks[w][d];
        if (day && day.date) {
          const date = new Date(day.date);
          if (date.getMonth() === month) {
            startWeek = w;
            startDay = d;
            break;
          }
        }
      }
      if (startWeek !== -1) break;
    }
    if (startWeek === -1) continue; // 这个月份没有数据
    // 计算这个月份跨越的周数
    let weekCount = 0;
    for (let w = startWeek; w < weeks.length; w++) {
      let hasMonthDay = false;
      for (let d = (w === startWeek ? startDay : 0); d < weeks[w].length; d++) {
        const day = weeks[w][d];
        if (day && day.date) {
          const date = new Date(day.date);
          if (date.getMonth() === month) {
            hasMonthDay = true;
          }
        }
      }
      if (hasMonthDay) {
        weekCount++;
      } else {
        break;
      }
    }
    // 添加月份标签
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'short' });
    const xPosition = labelWidth + startWeek * weekWidth + (startDay > 0 ? 5 : 0);
    svg += `<text x="${xPosition}" y="${monthLabelY}" font-size="10" text-anchor="start" fill="${monthTextColor}">${monthName}</text>`;
  }
  // 热力图起始Y坐标 - 修复点：根据是否显示标题调整起始位置
  const heatmapStartY = monthLabelY + monthLabelMargin;
  // 为每一行添加星期标签和热力图格子
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    const yPosition = heatmapStartY + dayOfWeek * rowHeight + cellSize/2;
    // 只在特定位置显示星期标签
    if (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
      const weekDayNames = ['一', '三', '五', '日'];
      let weekDayIndex;
      if (dayOfWeek === 0) {
        weekDayIndex = 0;
      } else if (dayOfWeek === 2) {
        weekDayIndex = 1;
      } else if (dayOfWeek === 4) {
        weekDayIndex = 2;
      } else {
        weekDayIndex = 3;
      }
      // 添加星期标签
      svg += `<text x="${labelWidth - 5}" y="${yPosition}" font-size="10" text-anchor="end" dominant-baseline="middle" fill="${textColor}">${weekDayNames[weekDayIndex]}</text>`;
    }
    // 添加这一行的热力图格子
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      if (dayOfWeek < weeks[weekIndex].length) {
        const day = weeks[weekIndex][dayOfWeek];
        const xPosition = labelWidth + weekIndex * weekWidth;
        if (day) {
          svg += `<rect x="${xPosition}" y="${heatmapStartY + dayOfWeek * rowHeight}" width="${cellSize}" height="${cellSize}" fill="${day.color}" rx="2"><title>${day.date}: ${day.value}个任务</title></rect>`;
        } else {
          svg += `<rect x="${xPosition}" y="${heatmapStartY + dayOfWeek * rowHeight}" width="${cellSize}" height="${cellSize}" fill="${emptyCellColor}"></rect>`;
        }
      }
    }
  }
  svg += '</svg>';
  
  return svg;
}

// 生成并输出热力图
if (config.responsiveWidth) {
  // 使用SVG实现自适应宽度
  const heatmapSVG = generateHeatmapSVG(taskData, config.year, config.color, config.showTitle, config.responsiveWidth, config.theme);
  dv.el('div', heatmapSVG);
} else {
  // 使用HTML实现固定宽度
  const heatmapHTML = generateHeatmapHTML(taskData, config.year, config.color, config.showTitle, config.responsiveWidth, config.theme);
  dv.el('div', heatmapHTML);
}

// 保留原来的HTML生成函数，但不自动调用
function generateHeatmapHTML(data, year, color, showTitle, responsiveWidth, theme) {
  // 原来的HTML生成逻辑的简化版本
  // 这里只是一个占位函数，实际使用时需要完整的HTML生成逻辑
  return "<div>HTML版本暂未实现</div>";
}

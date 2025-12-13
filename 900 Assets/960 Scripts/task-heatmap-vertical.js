// 默认配置
const config = {
  filePath: "500 Journal/540 Daily",
  year: new Date().getFullYear(),
  color: "red",
  title: "任务热力图",  // 默认标题文本，但默认不显示
  showTitle: false,  // 默认不显示标题
  responsiveWidth: true,  // 默认自适应宽度
  theme: "dark",  // 默认暗色模式
  months: "current"  // 默认显示当前月份，可以是数字、数组或"all"
};

// 处理输入参数
if (input !== undefined) {
  config.filePath = input.filePath || config.filePath;
  config.year = input.year || config.year;
  config.color = input.color || config.color;
  config.title = input.title !== undefined ? input.title : config.title;
  // 如果提供了title参数，则显示标题
  config.showTitle = input.title !== undefined;
  config.responsiveWidth = input.responsiveWidth !== undefined ? input.responsiveWidth : config.responsiveWidth;
  config.theme = input.theme !== undefined ? input.theme : config.theme;
  config.months = input.months !== undefined ? input.months : config.months;
}

// 处理月份参数
function getSelectedMonths(monthsParam, year) {
  const currentMonth = new Date().getMonth();
  
  if (monthsParam === "current") {
    return [currentMonth]; // 默认显示当前月份
  } else if (monthsParam === "all") {
    return Array.from({length: 12}, (_, i) => i); // 显示全年
  } else if (Array.isArray(monthsParam)) {
    return monthsParam.map(m => typeof m === 'string' ? parseInt(m) - 1 : m - 1); // 处理数组
  } else if (typeof monthsParam === 'number' || typeof monthsParam === 'string') {
    const month = typeof monthsParam === 'string' ? parseInt(monthsParam) - 1 : monthsParam - 1;
    return [month]; // 显示单个月份
  }
  
  return [currentMonth]; // 默认返回当前月份
}

// 获取选择的月份
const selectedMonths = getSelectedMonths(config.months, config.year);

// 获取所有页面，不进行任何过滤
let allPages = [];
try {
  allPages = dv.pages(`"${config.filePath}"`);
} catch (error) {
  dv.paragraph("获取页面时出错: " + error.message);
  return;
}

// 安全过滤函数
function safeFilter(pages, year, selectedMonths) {
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
    
    // 检查年份和月份是否在选择范围内
    if (date.getFullYear() === year && selectedMonths.includes(date.getMonth())) {
      result.push(page);
    }
  }
  
  return result;
}

// 使用安全过滤函数，传入选择的月份
const dailyPages = safeFilter(allPages, config.year, selectedMonths);

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

// 生成竖直热力图SVG
function generateVerticalHeatmapSVG(data, year, color, title, showTitle, responsiveWidth, theme, selectedMonths) {
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
  
  // 创建月份数组（只包含选择的月份）
  const months = [];
  
  // 为选择的每个月份创建数据
  for (let monthIndex = 0; monthIndex < selectedMonths.length; monthIndex++) {
    const month = selectedMonths[monthIndex];
    const monthWeeks = []; // 每个月分为周
    
    // 获取这个月的第一天和最后一天
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // 计算这个月的第一天是星期几
    const firstDayOfWeek = getDayOfWeek(firstDayOfMonth);
    
    // 创建第一周，添加空白格子（1号之前的空白）
    let currentWeek = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
    
    // 添加这个月的每一天
    const currentDate = new Date(firstDayOfMonth);
    while (currentDate <= lastDayOfMonth) {
      const dateStr = formatDate(currentDate);
      const value = data[dateStr] || 0;
      
      currentWeek.push({
        date: dateStr,
        value: value,
        color: getColor(value)
      });
      
      // 如果是周日或者月底，结束当前周
      if (getDayOfWeek(currentDate) === 6 || currentDate.getDate() === lastDayOfMonth.getDate()) {
        // 如果周不满7天，用null填充
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        monthWeeks.push([...currentWeek]);
        currentWeek = [];
      }
      
      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // 将这个月的数据添加到月份列表
    months.push({
      name: new Date(year, month, 1).toLocaleString('zh-CN', { month: 'short' }),
      weeks: monthWeeks
    });
  }
  
  // 定义尺寸常量（更适合手机显示）
  const cellSize = 12; // 每个格子的大小
  const cellMargin = 2; // 每个格子的边距
  const cellSpacing = cellSize + cellMargin; // 格子之间的间距
  const weekWidth = 7 * cellSpacing; // 一周的宽度
  const monthLabelWidth = 40; // 月份标签的宽度
  const weekLabelHeight = 20; // 星期标签的高度
  const monthHeight = 20; // 每个月份标签的高度
  const monthMargin = 3; // 减少月份之间的间距
  const titleHeight = showTitle ? 30 : 0; // 标题的高度
  const titleMargin = showTitle ? 10 : 0; // 标题和内容之间的间距
  
  // 计算总高度
  let totalHeight = titleHeight + titleMargin + weekLabelHeight;
  for (const month of months) {
    totalHeight += monthHeight + monthMargin + month.weeks.length * cellSpacing;
  }
  
  // 计算SVG尺寸
  const svgWidth = monthLabelWidth + weekWidth;
  const svgHeight = totalHeight;
  
  // 创建SVG
  let svg = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; font-family: sans-serif; font-size: 12px;">`;
  // 添加标题（根据参数）
  if (showTitle) {
    // 使用自定义标题
    svg += `<text x="${monthLabelWidth}" y="20" font-weight="bold" fill="${textColor}" text-anchor="middle">${title}</text>`;
  }
  // 星期标签行
  const labelY = showTitle ? titleHeight + titleMargin + 15 : 15;
  // 添加星期标签
  const weekDayNames = ['一', '二', '三', '四', '五', '六', '日'];
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    const xPosition = monthLabelWidth + dayOfWeek * cellSpacing + cellSize/2;
    svg += `<text x="${xPosition}" y="${labelY}" font-size="10" text-anchor="middle" fill="${monthTextColor}">${weekDayNames[dayOfWeek]}</text>`;
  }
  // 热力图起始Y坐标
  let currentY = labelY + 5;
  // 为每个月份添加热力图格子
  for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
    const month = months[monthIndex];
    // 减少月份之间的间距
    currentY += monthMargin;
    // 添加月份标签，与热力图顶端对齐
    svg += `<text x="${monthLabelWidth/2}" y="${currentY + monthHeight/2}" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${month.name}</text>`;
    // 添加这个月的每一周
    for (let weekIndex = 0; weekIndex < month.weeks.length; weekIndex++) {
      const week = month.weeks[weekIndex];
      // 添加这一周的每一天
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const day = week[dayOfWeek];
        const xPosition = monthLabelWidth + dayOfWeek * cellSpacing;
        if (day) {
          svg += `<rect x="${xPosition}" y="${currentY}" width="${cellSize}" height="${cellSize}" fill="${day.color}" rx="2"><title>${day.date}: ${day.value}个任务</title></rect>`;
        } else {
          svg += `<rect x="${xPosition}" y="${currentY}" width="${cellSize}" height="${cellSize}" fill="${emptyCellColor}"></rect>`;
        }
      }
      // 移动到下一周
      currentY += cellSpacing;
    }
    // 月份标签高度在格子添加完成后才增加
    currentY += monthHeight;
  }
  svg += '</svg>';
  
  return svg;
}

// 生成并输出热力图
if (config.responsiveWidth) {
  // 使用SVG实现自适应宽度
  const heatmapSVG = generateVerticalHeatmapSVG(
    taskData, 
    config.year, 
    config.color, 
    config.title, 
    config.showTitle, 
    config.responsiveWidth, 
    config.theme, 
    selectedMonths
  );
  dv.el('div', heatmapSVG);
} else {
  // 使用HTML实现固定宽度
  const heatmapHTML = generateHeatmapHTML(
    taskData, 
    config.year, 
    config.color, 
    config.title, 
    config.showTitle, 
    config.responsiveWidth, 
    config.theme
  );
  dv.el('div', heatmapHTML);
}

// 保留原来的HTML生成函数，但不自动调用
function generateHeatmapHTML(data, year, color, title, showTitle, responsiveWidth, theme) {
  // 原来的HTML生成逻辑的简化版本
  // 这里只是一个占位函数，实际使用时需要完整的HTML生成逻辑
  return "<div>HTML版本暂未实现</div>";
}

// DataviewJS - 统计月日志归档中的任务完成数量
// 使用方法：在年度日志中使用，会按月份统计该年每月任务完成总量
// 数据来源：月日志中的归档section（每日日志归档到月日志中）

// 配置对象（可通过input参数覆盖）
let config = {
  // 日志平铺后：月度/年度日志都在 500 Journal 根目录（按文件名区分类型）
  monthlyFolder: '500 Journal',
  // 历史年份归档目录（同样按文件名区分类型）
  archiveFolder: '400 Archive/450 Journal',
  // 年度日志文件夹路径（仅用于验证当前文件位置）
  annualFolder: '500 Journal',
  // 归档section标题匹配模式
  archiveSectionPattern: /##\s*🗄️.*?归档/i,
  // 日期标题匹配模式（例如：### 周一 2025-06-02）
  dateHeaderPattern: /###\s*[周日月一二三四五六日]*\s*(\d{4}-\d{2}-\d{2})/,
  // 已完成任务匹配模式
  completedTaskPattern: /^\s*-\s*\[x\]/m
};

// 如果有input参数，覆盖默认配置
if (input !== undefined) {
  config = { ...config, ...input };
}

// 获取当前笔记信息
const currentPage = dv.current();
if (!currentPage) {
  dv.paragraph("⏳ 当前笔记尚未被 Dataview 索引，稍后会自动恢复");
  return;
}
const currentPath = currentPage.file.path;

// 判断当前日志类型
let logType = null;
let targetYear = null;   // 目标年份（用于年度日志）

// 日志平铺后不能靠子文件夹路径判断，改为按 frontmatter 的 journal 字段 + 文件名格式判断
if (currentPage['journal'] === 'Annual' || /^\d{4}$/.test(currentPage.file.name)) {
  logType = 'annual';
  // 从frontmatter中获取year；缺失时依次回退到 journal-date、文件名年份
  const year = currentPage['year'];
  if (year) {
    targetYear = year.toString();
  } else if (currentPage['journal-date']) {
    targetYear = dv.date(currentPage['journal-date']).year.toString();
  } else {
    const nameMatch = currentPage.file.name.match(/^(\d{4})$/);
    if (nameMatch) targetYear = nameMatch[1];
  }
} else {
  dv.paragraph('❌ 请在年度日志中使用此脚本');
}

if (!logType) {
  dv.paragraph('❌ 无法确定当前日志类型');
  return;
}

/**
 * 从月日志中提取归档的任务统计
 */
async function extractArchiveStats(monthlyFile) {
  try {
    // 读取月日志文件内容
    const content = await app.vault.read(monthlyFile);

    // 查找归档section
    const archiveMatch = content.match(config.archiveSectionPattern);
    if (!archiveMatch) {
      return [];
    }

    // 提取归档section的内容
    const archiveSectionStart = archiveMatch.index;
    let archiveSectionEnd = content.length;

    // 查找下一个二级标题（##）作为归档section的结束
    const nextHeaderMatch = content.substring(archiveSectionStart + archiveMatch[0].length).match(/^##\s/m);
    if (nextHeaderMatch) {
      archiveSectionEnd = archiveSectionStart + archiveMatch[0].length + nextHeaderMatch.index;
    }

    const archiveContent = content.substring(archiveSectionStart + archiveMatch[0].length, archiveSectionEnd);

    // 按日期分割内容
    const sections = archiveContent.split(/^---$/gm);

    const dateStats = [];

    // 遍历每个日期section
    for (const section of sections) {
      // 提取日期标题
      const dateHeaderMatch = section.match(config.dateHeaderPattern);
      if (dateHeaderMatch) {
        const dateStr = dateHeaderMatch[1];
        const dateObj = new Date(dateStr);

        if (!isNaN(dateObj.getTime())) {
          // 统计该日期section下的已完成任务数量
          // 将section按行分割，逐行匹配
          const lines = section.split('\n');
          const completedCount = lines.filter(line => {
            return config.completedTaskPattern.test(line);
          }).length;

          dateStats.push({
            date: dateStr,
            year: dateObj.getFullYear(),
            month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
            day: dateObj.getDate().toString().padStart(2, '0'),
            completedCount: completedCount
          });
        }
      }
    }

    return dateStats;
  } catch (error) {
    console.error(`处理月日志 ${monthlyFile.path} 时出错:`, error);
    return [];
  }
}

// 获取所有月日志文件（500 Journal 平铺 + 历史归档目录，按文件名 YYYY-MM 识别月日志）
const journalDirs = [config.monthlyFolder, config.archiveFolder];
const monthlyFiles = app.vault.getFiles().filter(file =>
  file.extension === 'md' &&
  /^\d{4}-\d{2}$/.test(file.basename) &&
  journalDirs.some(dir => file.path.startsWith(dir + '/'))
);

// 按文件名排序
monthlyFiles.sort((a, b) => a.name.localeCompare(b.name));

// 存储所有月日志的统计数据
const allStats = [];

// 异步处理所有月日志
for (const file of monthlyFiles) {
  const stats = await extractArchiveStats(file);
  allStats.push(...stats);
}

// 根据日志类型筛选和汇总数据
if (logType === 'annual') {
  // ===== 年度日志：按月份统计每月任务完成总量 =====

  dv.paragraph(`### 📊 ${targetYear} 年度任务完成统计（来源：月日志归档）`);
  dv.paragraph(`> 数据来源：${targetYear}年度月日志归档中的每日任务完成记录`);

  // 筛选目标年份的数据
  const annualStats = allStats.filter(s => s.year.toString() === targetYear);

  if (annualStats.length === 0) {
    dv.paragraph(`📅 ${targetYear} 年度没有找到月日志归档记录`);
  } else {
    // 按月份汇总
    const monthlyTotals = new Map();

    // 初始化12个月份
    for (let m = 1; m <= 12; m++) {
      monthlyTotals.set(m.toString().padStart(2, '0'), 0);
    }

    // 累加每个日期的任务数到对应月份
    annualStats.forEach(s => {
      const monthKey = s.month;
      if (monthlyTotals.has(monthKey)) {
        monthlyTotals.set(monthKey, monthlyTotals.get(monthKey) + s.completedCount);
      }
    });

    // 汇总统计
    const totalCompleted = annualStats.reduce((sum, s) => sum + s.completedCount, 0);
    const activeMonths = [...monthlyTotals.values()].filter(v => v > 0).length;
    const avgMonthly = (totalCompleted / 12).toFixed(1);

    // 找出任务数最多的月份
    let maxMonth = null;
    let maxMonthValue = 0;
    monthlyTotals.forEach((value, month) => {
      if (value > maxMonthValue) {
        maxMonthValue = value;
        maxMonth = month;
      }
    });

    // 找出任务数最少的非零月份
    let minMonth = null;
    let minMonthValue = Infinity;
    monthlyTotals.forEach((value, month) => {
      if (value > 0 && value < minMonthValue) {
        minMonthValue = value;
        minMonth = month;
      }
    });

    dv.paragraph(`
---
**📈 ${targetYear} 年度统计概览：**
- 📅 有效月份数：${activeMonths} 个月
- ✅ 总完成任务数：${totalCompleted}
- 📊 平均每月完成：${avgMonthly} 个
- 🔺 最高月份：${maxMonth}月（${maxMonthValue} 个）
- 🔻 最低月份：${minMonth || '无'}月（${minMonth === null ? '无数据' : minMonthValue + ' 个'}）
    `);

    // 渲染图表
    const months = [...monthlyTotals.keys()].map(m => `"${m}月"`);
    const monthlyValues = [...monthlyTotals.values()];

    dv.paragraph(`\`\`\`chart
type: bar
labels: [${months.join(',')}]
series:
  - title: 月度完成任务总数
    data: [${monthlyValues.join(',')}]
width: 100%
height: 400px
\`\`\``);
  }
}

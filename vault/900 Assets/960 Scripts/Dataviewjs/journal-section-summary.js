// journal-section-summary.js - 汇总周/月日志中指定标题下的内联字段数据
// 用法: dv.view("900 Assets/960 Scripts/journal-section-summary", { sectionTitle: "每日打卡" })

// 默认配置
let config = {
  sectionTitle: "每日打卡",  // 标题支持模糊匹配，自动忽略表情符号、注释和 # 前缀
  dailyPath: "500 Journal",
  showEmpty: true,
  dateColumn: "📅",
  sortAscending: true
};

// 处理输入参数
if (input !== undefined) {
  config = { ...config, ...input };
}

// 获取当前笔记信息
const currentFile = dv.current();
if (!currentFile) {
  dv.paragraph("⏳ 当前笔记尚未被 Dataview 索引，稍后会自动恢复");
  return;
}
const journalDate = currentFile["journal-date"];
const journalType = currentFile["journal"];

// 验证必要参数
if (!journalDate) {
  dv.el("div", "❌ 当前笔记缺少 `journal-date` 元数据", {
    style: "color: red; padding: 10px;"
  });
  return;
}

// 计算日期范围
function getDateRange(type, dateStr) {
  const startDate = dv.date(dateStr);
  const startDateStr = startDate.toFormat("yyyy-MM-dd");

  if (type === "Weekly") {
    const endDate = startDate.plus({ days: 6 });
    const endDateStr = endDate.toFormat("yyyy-MM-dd");
    return {
      start: startDateStr,
      end: endDateStr,
      display: `${startDateStr} 至 ${endDateStr}`
    };
  } else if (type === "Monthly") {
    const year = startDate.year;
    const month = startDate.month;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = dv.date(`${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`);
    const endDateStr = endDate.toFormat("yyyy-MM-dd");
    return {
      start: startDateStr,
      end: endDateStr,
      display: `${year}年${month}月`
    };
  }

  return null;
}

const dateRange = getDateRange(journalType, journalDate);

if (!dateRange) {
  dv.el("div", `❌ 不支持的日志类型: ${journalType}，仅支持 Weekly 和 Monthly`, {
    style: "color: red; padding: 10px;"
  });
  return;
}

// 提取标题文本（去掉 # 前缀和 %% 注释）
function extractHeadingText(headingLine) {
  let text = headingLine;

  // 如果包含 # 号，移除 # 前缀
  const match = headingLine.match(/^#+\s*(.+)$/);
  if (match) {
    text = match[1];
  }

  text = text.trim();
  // 移除 %% 注释
  text = text.replace(/%%.*%%/g, '').trim();
  return text || null;
}

// 模糊匹配标题
function fuzzyMatchHeading(currentHeading, targetHeading) {
  const current = extractHeadingText(currentHeading);
  const target = extractHeadingText(targetHeading);

  if (!current || !target) {
    return false;
  }

  const normalize = (str) => {
    let result = str.replace(/\s+/g, '');
    result = result.replace(/%%.*%%/g, '');
    result = result.replace(/[^\p{L}\p{N}]/gu, '');
    return result.toLowerCase();
  };

  const normalizedCurrent = normalize(current);
  const normalizedTarget = normalize(target);

  if (normalizedCurrent === normalizedTarget) return true;
  if (normalizedCurrent.includes(normalizedTarget) && normalizedTarget.length > 0) return true;
  if (normalizedTarget.includes(normalizedCurrent) && normalizedCurrent.length > 0) return true;

  return false;
}

// 查询范围内的daily日志
// 日志平铺在 500 Journal 根目录后，只认文件名为完整日期（YYYY-MM-DD）的日日志，
// 避免月日志（如 2025-03）被 dv.date 解析后混入自己的统计范围
const dailyPages = dv.pages(`"${config.dailyPath}"`)
  .where(p => {
    const fileName = p.file.name.replace(".md", "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fileName)) return false;
    const fileDate = dv.date(fileName);
    if (!fileDate) return false;

    const start = dv.date(dateRange.start);
    const end = dv.date(dateRange.end);

    return fileDate >= start && fileDate <= end;
  })
  .sort(p => p.file.name, config.sortAscending ? "asc" : "desc");

// 解析日志内容，提取指定标题下的内联字段
async function extractSectionFields(file, sectionTitle) {
  try {
    const filePath = file.file.path;
    const abstractFile = app.vault.getAbstractFileByPath(filePath);

    if (!abstractFile) {
      console.error(`无法找到文件: ${filePath}`);
      return {};
    }

    const content = await app.vault.read(abstractFile);
    const lines = content.split("\n");

    const targetHeadingText = extractHeadingText(sectionTitle);

    let inSection = false;
    let targetHeadingLevel = 0;
    const fields = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // 检查是否是标题行
      const headingMatch = trimmedLine.match(/^(#+)\s+(.+)$/);

      if (headingMatch) {
        const headingLevel = headingMatch[1].length;
        const headingText = headingMatch[2].trim();

        // 检查是否匹配目标标题
        if (!inSection) {
          const isMatch = fuzzyMatchHeading(headingText, targetHeadingText);

          if (isMatch) {
            inSection = true;
            targetHeadingLevel = headingLevel;
            continue;
          }
        }

        // 如果在 section 中，遇到同级或更高级别标题时离开
        if (inSection && headingLevel <= targetHeadingLevel) {
          break;
        }
      }

      // 如果不在 section 中，跳过这一行
      if (!inSection) {
        continue;
      }

      // 跳过空行、注释和按钮行
      if (!trimmedLine || trimmedLine.startsWith('%%') || trimmedLine.startsWith('`button')) {
        continue;
      }

      // 匹配列表项中的内联字段: - [字段名::]
      const listItemMatch = trimmedLine.match(/^-\s+\[([^\]]+)::([^\]]*)\]/);
      if (listItemMatch) {
        const fieldName = listItemMatch[1].trim();
        let fieldValue = listItemMatch[2].trim();

        // 如果字段值为空，使用默认值
        if (!fieldValue) {
          fieldValue = '🔲';
        }

        if (!fields[fieldName]) {
          fields[fieldName] = [];
        }
        fields[fieldName].push(fieldValue);
        continue;
      }

      // 匹配任务格式: - [x] [字段名::]
      const taskMatch = trimmedLine.match(/^-\s*\[([xX ])\]\s*\[([^\]]+)::([^\]]*)\]/);
      if (taskMatch) {
        const isChecked = taskMatch[1].toLowerCase() === 'x';
        const fieldName = taskMatch[2].trim();
        let fieldValue = taskMatch[3].trim();

        if (!fieldValue) {
          fieldValue = isChecked ? '✔️' : '🔲';
        }

        if (!fields[fieldName]) {
          fields[fieldName] = [];
        }
        fields[fieldName].push(fieldValue);
        continue;
      }
    }

    return fields;
  } catch (error) {
    console.error(`解析文件 ${file.file.name} 失败:`, error);
    return {};
  }
}

// 收集所有字段名称和值
async function collectData() {
  const allFields = new Set();
  const data = [];

  for (const page of dailyPages) {
    const fields = await extractSectionFields(page, config.sectionTitle);

    Object.keys(fields).forEach(key => allFields.add(key));

    data.push({
      date: page.file.name.replace(".md", ""),
      link: page.file.link,
      fields: fields
    });
  }

  return { fields: Array.from(allFields).sort(), data };
}

// 生成Markdown表格字符串
function generateMarkdownTable(headers, data) {
  // 处理表头
  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;

  // 处理数据行
  const dataRows = data.map(row => {
    const processedCells = row.map(cell => {
      // 处理Obsidian链接对象
      if (cell && typeof cell === 'object' && cell.displayText) {
        return cell.displayText;
      }
      // 处理普通文本，转义表格特殊字符
      const text = String(cell || '');
      return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
    });
    return `| ${processedCells.join(' | ')} |`;
  });

  return [headerRow, separatorRow, ...dataRows].join('\n');
}

// 渲染汇总表格
async function renderSummary() {
  if (dailyPages.length === 0) {
    dv.el("div", `📅 在 ${dateRange.display} 范围内没有找到日志记录`, {
      style: "color: var(--text-muted); padding: 10px;"
    });
    return;
  }

  const { fields, data } = await collectData();

  // 显示调试信息
  if (config.debug) {
    const debugBox = dv.el("div", "", {
      style: "background: #f0f0f0; padding: 15px; margin-bottom: 15px; border-radius: 5px; font-family: monospace; font-size: 0.85em;"
    });
    dv.el("div", `🔍 调试信息`, { container: debugBox, style: "font-weight: bold; margin-bottom: 10px;" });
    dv.el("div", `📁 日志数量: ${data.length}`, { container: debugBox });
    dv.el("div", `📋 找到的字段: ${fields.length}`, { container: debugBox });
    dv.el("div", `🏷️ 字段列表: ${fields.join(', ') || '(无)'}`, { container: debugBox });
    
    for (const item of data) {
      const fieldCount = Object.keys(item.fields).length;
      const fieldNames = Object.keys(item.fields).join(', ');
      dv.el("div", `  • ${item.date}: ${fieldCount}个字段 [${fieldNames}]`, { container: debugBox });
    }
  }

  if (fields.length === 0) {
    dv.el("div", `📋 在 ${dateRange.display} 范围内的日志中，标题 "${config.sectionTitle}" 下没有找到内联字段`, {
      style: "color: var(--text-muted); padding: 10px;"
    });
    return;
  }

  // 显示标题
  const header = dv.el("div", "", {
    style: "margin-bottom: 10px;"
  });
  const typeLabel = journalType === "Weekly" ? "周" : "月";
  dv.el("strong", `📊 ${typeLabel}度汇总 - ${config.sectionTitle.replace(/^[#]+\s*/, "")} (${dateRange.display})`, { container: header });

  // 构建表格数据
  const tableData = [];

  for (const item of data) {
    const row = [item.link];

    for (const field of fields) {
      const value = item.fields[field];
      if (value && value.length > 0) {
        row.push(value.join(", "));
      } else {
        row.push(config.showEmpty ? "—" : "");
      }
    }

    tableData.push(row);
  }

  // 表格列名
  const tableHeaders = [config.dateColumn, ...fields];

  // 渲染表格
  dv.table(tableHeaders, tableData);

  // 显示统计信息
  const stats = dv.el("div", "", {
    style: "margin-top: 10px; font-size: 0.9em; color: var(--text-muted);"
  });
  dv.el("span", `📄 日志数量: ${data.length} | 📋 字段数量: ${fields.length}`, { container: stats });

  // 添加导出按钮
  const exportContainer = dv.el("div", "", {
    style: "margin-top: 15px;"
  });
  const exportBtn = dv.el("button", "📋 导出Markdown表格", {
    container: exportContainer,
    attr: {
      style: "padding: 8px 16px; background: var(--interactive-normal); color: var(--text-normal); border: 1px solid var(--background-modifier-border); border-radius: 4px; cursor: pointer;"
    }
  });

  // 复制到剪贴板功能
  exportBtn.onclick = async () => {
    try {
      const markdown = generateMarkdownTable(tableHeaders, tableData);
      await navigator.clipboard.writeText(markdown);

      // 按钮反馈
      exportBtn.textContent = "✅ 已复制到剪贴板";
      exportBtn.style.background = "var(--interactive-success)";

      setTimeout(() => {
        exportBtn.textContent = "📋 导出Markdown表格";
        exportBtn.style.background = "var(--interactive-normal)";
      }, 2000);
    } catch (error) {
      console.error("复制失败:", error);
      exportBtn.textContent = "❌ 复制失败";
      setTimeout(() => {
        exportBtn.textContent = "📋 导出Markdown表格";
      }, 2000);
    }
  };
}

// 执行渲染
renderSummary();
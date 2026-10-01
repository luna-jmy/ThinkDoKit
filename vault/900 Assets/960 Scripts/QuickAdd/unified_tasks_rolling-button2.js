// unified_tasks_rolling-button.js
module.exports = async (params) => {
  const { app } = params;

  // 工具函数：动态生成文件路径
  function getNotePath(dateStr, type) {
    switch (type) {
      case 'daily':
        const [year, month, day] = dateStr.split("-");
        return `500 Journal/540 Daily/${year}-${month}-${day}.md`;
      case 'week':
        return `500 Journal/530 Weekly/${dateStr}.md`;
      case 'month':
        return `500 Journal/520 Monthly/${dateStr}.md`;
      case 'year':
        return `500 Journal/510 Annual/${dateStr}.md`;
      default:
        return '';
    }
  }

  // 获取前一天的日期
  function getPreviousDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 获取前一周的日期
  function getPreviousWeek(weekStr) {
    const [year, weekNumStr] = weekStr.split('-W');
    const week = parseInt(weekNumStr);
    
    let previousYear = parseInt(year);
    let previousWeek = week - 1;
    
    if (previousWeek === 0) {
      // 获取上一年的最后一周（通常是52或53周）
      previousYear = previousYear - 1;
      // 简单估算，大多数年份有52周，部分有53周
      const firstDayOfYear = new Date(previousYear, 0, 1);
      const dayOfWeek = firstDayOfYear.getDay();
      // 如果1月1日是周四、周五、周六或周日，那么这一年有53周
      previousWeek = (dayOfWeek >= 4 || dayOfWeek === 0) ? 53 : 52;
    }
    
    return `${previousYear}-W${previousWeek}`;
  }

  // 获取前一个月的日期
  function getPreviousMonth(monthStr) {
    const [year, month] = monthStr.split('-').map(num => parseInt(num));
    
    let previousYear = year;
    let previousMonth = month - 1;
    
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear = year - 1;
    }
    
    return `${previousYear}-${String(previousMonth).padStart(2, '0')}`;
  }

  // 获取前一年的日期
  function getPreviousYear(yearStr) {
    return (parseInt(yearStr) - 1).toString();
  }

  // 从文件名提取日期（日记格式）
  function extractDateFromFilename(filename) {
    const match = filename.match(/(\d{4}-\d{2}-\d{2})\.md$/);
    if (match) {
      return match[1];
    }
    // 如果没有匹配到日期格式，返回当前日期
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 识别文件类型和获取上一期
  function parseFilenameAndGetPrevious(filename) {
    // 移除.md扩展名
    const baseName = filename.replace(/\.md$/, '');
    
    // 日记格式：YYYY-MM-DD (2025-09-03)
    const dailyMatch = baseName.match(/^(\d{4}-\d{2}-\d{2})$/);
    if (dailyMatch) {
      const currentDate = dailyMatch[1];
      const previousDate = getPreviousDay(currentDate);
      const [year, month, day] = currentDate.split('-');
      const [prevYear, prevMonth, prevDay] = previousDate.split('-');
      
      return {
        type: 'daily',
        current: baseName,
        previous: previousDate,
        getPreviousFunc: getPreviousDay,
        displayName: `${year}年${month}月${day}日`,
        previousDisplayName: `${prevYear}年${prevMonth}月${prevDay}日`
      };
    }
    
    // 年格式：YYYY (2025)
    const yearMatch = baseName.match(/^(\d{4})$/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      const previousYear = getPreviousYear(year);
      return {
        type: 'year',
        current: baseName,
        previous: previousYear,
        getPreviousFunc: getPreviousYear,
        displayName: `${year}`,
        previousDisplayName: `${previousYear}`
      };
    }
    
    // 月格式：YYYY-MM (2025-09)
    const monthMatch = baseName.match(/^(\d{4})-(\d{2})$/);
    if (monthMatch) {
      const year = parseInt(monthMatch[1]);
      const month = parseInt(monthMatch[2]);
      const previousStr = getPreviousMonth(`${year}-${month}`);
      
      return {
        type: 'month',
        current: baseName,
        previous: previousStr,
        getPreviousFunc: getPreviousMonth,
        displayName: `${year}-${month}`,
        previousDisplayName: previousStr
      };
    }
    
    // 周格式：YYYY-W[w] (2025-W9, 2025-W09)
    const weekMatch = baseName.match(/^(\d{4})-W(\d{1,2})$/);
    if (weekMatch) {
      const year = parseInt(weekMatch[1]);
      const week = parseInt(weekMatch[2]);
      const previousStr = getPreviousWeek(`${year}-W${week}`);
      
      return {
        type: 'week',
        current: baseName,
        previous: previousStr,
        getPreviousFunc: getPreviousWeek,
        displayName: `${year}-W${week}`,
        previousDisplayName: previousStr
      };
    }
    
    return null;
  }

  // 读取文件内容
  async function readFileContent(filePath) {
    try {
      const targetFile = app.vault.getAbstractFileByPath(filePath);
      if (targetFile && targetFile.extension === "md") {
        return await app.vault.read(targetFile);
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  }

  // 提取未完成和推迟的任务（包括其子任务）
  function extractUnfinishedTasks(content) {
    // 按行分割内容
    const lines = content.split('\n');
    const tasks = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // 检查是否是未完成的任务或推迟的任务
      if (line.match(/^- \[( |>)\] /)) {
        // 获取当前任务的缩进级别
        const taskIndentMatch = line.match(/^(\s*)-/);
        const taskIndent = taskIndentMatch ? taskIndentMatch[1] : '';
        
        // 收集所有子任务
        const taskBlock = [line + '\n'];
        let j = i + 1;
        
        while (j < lines.length) {
          const nextLine = lines[j];
          // 检查缩进是否更深或者下一行是空的（为了保留空行）
          if (nextLine.match(new RegExp('^' + taskIndent + '\\s+.+')) || nextLine.match(/^\s*$/)) {
            taskBlock.push(nextLine + '\n');
            j++;
          } else {
            // 遇到同级别或更高级别的行，停止
            break;
          }
        }
        
        // 将收集到的任务块（包括子任务）作为一个整体添加到结果中
        tasks.push({
          startIndex: i,
          endIndex: j - 1,
          content: taskBlock.join('')
        });
        
        // 跳过已处理的子任务
        i = j - 1;
      }
    }
    
    return tasks;
  }

  // 检查文件内容是否为空（没有任务）
  function isFileContentEmpty(content) {
    const tasks = extractUnfinishedTasks(content);
    return tasks.length === 0;
  }

  // 查找最近非空的前一期的文件
  async function findLatestNonEmptyPreviousFile(periodInfo) {
    let currentDate = periodInfo.current;
    let previousDate = periodInfo.previous;
    let previousDisplayName = periodInfo.previousDisplayName;
    
    // 首先检查最近的上一期文件
    let previousFilePath = getNotePath(previousDate, periodInfo.type);
    let previousContent = await readFileContent(previousFilePath);
    
    if (previousContent && !isFileContentEmpty(previousContent)) {
      // 找到了非空的文件
      return {
        filePath: previousFilePath,
        date: previousDate,
        displayName: previousDisplayName
      };
    }
    
    // 如果最近的上一期文件为空或不存在，继续向前查找
    while (previousDate) {
      previousDate = periodInfo.getPreviousFunc(previousDate);
      
      // 更新显示名称
      if (periodInfo.type === 'daily') {
        const [year, month, day] = previousDate.split('-');
        previousDisplayName = `${year}年${month}月${day}日`;
      } else if (periodInfo.type === 'month') {
        previousDisplayName = previousDate;
      } else if (periodInfo.type === 'year') {
        previousDisplayName = previousDate;
      } else if (periodInfo.type === 'week') {
        previousDisplayName = previousDate;
      }
      
      previousFilePath = getNotePath(previousDate, periodInfo.type);
      previousContent = await readFileContent(previousFilePath);
      
      if (previousContent && !isFileContentEmpty(previousContent)) {
        return {
          filePath: previousFilePath,
          date: previousDate,
          displayName: previousDisplayName
        };
      }
      
      // 防止无限循环，设置最大查找次数
      if (periodInfo.type === 'daily' && currentDate.split('-')[2] === '01') {
        break; // 防止无限循环
      } else if (periodInfo.type === 'month' && currentDate.split('-')[1] === '01') {
        break; // 防止无限循环
      } else if (periodInfo.type === 'week' && currentDate.split('-')[1] === 'W01') {
        break; // 防止无限循环
      } else if (periodInfo.type === 'year' && parseInt(currentDate) === 2000) {
        break; // 防止无限循环
      }
    }
    
    // 没有找到任何非空文件
    return null;
  }

  /**
   * 在指定行号下方插入任务
   * @param {CodeMirror.Editor} editor - 编辑器实例
   * @param {number} line - 按钮所在的行号
   * @param {Object[]} tasks - 要插入的任务列表（包括子任务）
   */
  async function insertTasksBelowLine(editor, line, tasks) {
    if (tasks.length === 0) {
      return;
    }
    
    // 提取所有任务内容
    const tasksContent = tasks.map(task => task.content).join('');
    
    // 在按钮行下方插入一个空行和所有任务
    const textToInsert = "\n" + tasksContent;
    const pos = { line: line + 1, ch: 0 };
    
    editor.replaceRange(textToInsert, pos);
  }

  // 从上一期文件中删除已转移的未完成任务（包括子任务）
  async function deleteTransferredTasks(previousFilePath, tasks) {
    if (tasks.length === 0) {
      return;
    }
    
    try {
      const targetFile = app.vault.getAbstractFileByPath(previousFilePath);
      if (targetFile) {
        let previousContent = await app.vault.read(targetFile);
        
        // 按行分割内容
        const lines = previousContent.split('\n');
        
        // 从后向前删除，这样不会影响前面的行索引
        for (let i = tasks.length - 1; i >= 0; i--) {
          const task = tasks[i];
          // 删除从任务开始到子任务结束的所有行
          lines.splice(task.startIndex, task.endIndex - task.startIndex + 1);
        }
        
        // 重新组合内容
        let updatedContent = lines.join('\n');
        
        // 清理多余空行
        updatedContent = updatedContent.replace(/\n{3,}/g, '\n\n');
        
        await app.vault.modify(targetFile, updatedContent);
      }
    } catch (error) {
      console.error("删除任务时出错:", error);
    }
  }

  // 主函数：执行任务迁移逻辑
  async function moveUnfinishedTasks() {
    try {
      // 获取当前活动文件和编辑器
      const activeFile = app.workspace.getActiveFile();
      if (!activeFile) {
        new Notice("错误：请先打开一个笔记文件");
        return;
      }

      const activeLeaf = app.workspace.activeLeaf;
      if (!activeLeaf || !activeLeaf.view || !activeLeaf.view.editor) {
        new Notice("错误：无法获取当前编辑器");
        return;
      }
      const editor = activeLeaf.view.editor;
      
      // 解析文件名并获取上一期信息
      const periodInfo = parseFilenameAndGetPrevious(activeFile.name);
      if (!periodInfo) {
        new Notice("错误：无法识别文件名格式。支持的格式：YYYY-MM-DD（日记）、YYYY（年）、YYYY-MM（月）、YYYY-W[w]（周）");
        return;
      }
      
      // 查找最近非空的前一期的文件
      const latestNonEmptyFile = await findLatestNonEmptyPreviousFile(periodInfo);
      
      if (!latestNonEmptyFile) {
        new Notice(`找不到包含未完成任务的前一期${periodInfo.type === 'daily' ? '日记' : periodInfo.type === 'week' ? '周记' : periodInfo.type === 'month' ? '月记' : '年记'}`);
        return;
      }
      
      // 提取未完成的任务（包括子任务）
      const previousContent = await readFileContent(latestNonEmptyFile.filePath);
      const unfinishedTasks = extractUnfinishedTasks(previousContent);
      
      if (unfinishedTasks.length > 0) {
        // 查找 `button-staskRollover` 按钮所在的行
        const buttonRegex = /^`button-staskRollover`/;
        let buttonLine = -1;
        const lineCount = editor.lineCount();
        for (let i = 0; i < lineCount; i++) {
          if (buttonRegex.test(editor.getLine(i))) {
            buttonLine = i;
            break;
          }
        }

        if (buttonLine !== -1) {
          // 在按钮下方插入任务
          await insertTasksBelowLine(editor, buttonLine, unfinishedTasks);
        } else {
          new Notice("错误：在当前文件中未找到 `button-staskRollover` 按钮");
          return;
        }
      }
      
      // 从上一期文件中删除已转移的任务（包括子任务）
      await deleteTransferredTasks(latestNonEmptyFile.filePath, unfinishedTasks);
      
      // 显示结果通知
      const taskCount = unfinishedTasks.reduce((count, task) => {
        // 计算主任务和子任务的总数
        return count + task.content.split('\n').filter(line => line.trim() !== '').length;
      }, 0);
      
      const message = taskCount > 0
        ? `已将${taskCount}个任务（包括子任务）从${latestNonEmptyFile.displayName}移动到${periodInfo.displayName}，并从原文件中删除。`
        : `${latestNonEmptyFile.displayName}没有未完成的任务需要移动。`;
      
      new Notice(message);
      
    } catch (error) {
      console.error("执行任务迁移时出错:", error);
      new Notice("执行任务迁移时发生错误，请检查控制台日志");
    }
  }

  // 执行主函数
  await moveUnfinishedTasks();
};

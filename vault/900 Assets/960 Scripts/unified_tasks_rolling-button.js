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
        displayName: `${year}年${month}月${day}日`,
        previousDisplayName: `${prevYear}年${prevMonth}月${prevDay}日`
      };
    }
    
    // 年格式：YYYY (2025)
    const yearMatch = baseName.match(/^(\d{4})$/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      const previousYear = year - 1;
      return {
        type: 'year',
        current: baseName,
        previous: previousYear.toString(),
        displayName: `${year}`,
        previousDisplayName: `${previousYear}`
      };
    }
    
    // 月格式：YYYY-MM (2025-09)
    const monthMatch = baseName.match(/^(\d{4})-(\d{2})$/);
    if (monthMatch) {
      const year = parseInt(monthMatch[1]);
      const month = parseInt(monthMatch[2]);
      
      let previousYear = year;
      let previousMonth = month - 1;
      
      if (previousMonth === 0) {
        previousMonth = 12;
        previousYear = year - 1;
      }
      
      const previousStr = `${previousYear}-${String(previousMonth).padStart(2, '0')}`;
      
      return {
        type: 'month',
        current: baseName,
        previous: previousStr,
        displayName: `${year}-${month}`,
        previousDisplayName: `${previousYear}-${previousMonth}`
      };
    }
    
    // 周格式：YYYY-W[w] (2025-W9, 2025-W09)
    const weekMatch = baseName.match(/^(\d{4})-W(\d{1,2})$/);
    if (weekMatch) {
      const year = parseInt(weekMatch[1]);
      const week = parseInt(weekMatch[2]);
      
      let previousYear = year;
      let previousWeek = week - 1;
      
      if (previousWeek === 0) {
        // 获取上一年的最后一周（通常是52或53周）
        previousYear = year - 1;
        // 简单估算，大多数年份有52周，部分有53周
        const firstDayOfYear = new Date(previousYear, 0, 1);
        const dayOfWeek = firstDayOfYear.getDay();
        // 如果1月1日是周四、周五、周六或周日，那么这一年有53周
        previousWeek = (dayOfWeek >= 4 || dayOfWeek === 0) ? 53 : 52;
      }
      
      const previousStr = `${previousYear}-W${previousWeek}`;
      
      return {
        type: 'week',
        current: baseName,
        previous: previousStr,
        displayName: `${year}-W${week}`,
        previousDisplayName: `${previousYear}-W${previousWeek}`
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

  // 提取未完成和推迟的任务，匹配未完成任务 ([ ]) 和推迟任务 ([>])
  function extractUnfinishedTasks(content) {
    const taskRegex = /- \[( |>)\] .*?\n/g;
    return content.match(taskRegex) || [];
  }

  /**
   * 在指定行号下方插入任务
   * @param {CodeMirror.Editor} editor - 编辑器实例
   * @param {number} line - 按钮所在的行号
   * @param {string[]} tasks - 要插入的任务列表
   */
  async function insertTasksBelowLine(editor, line, tasks) {
    if (tasks.length === 0) {
      return;
    }
    
    // 在按钮行下方插入一个空行和所有任务
    const textToInsert = "\n" + tasks.join("");
    const pos = { line: line + 1, ch: 0 };
    
    editor.replaceRange(textToInsert, pos);
  }

  // 从上一期文件中删除已转移的未完成任务
  async function deleteTransferredTasks(previousFilePath, tasks) {
    if (tasks.length === 0) {
      return;
    }
    
    try {
      const targetFile = app.vault.getAbstractFileByPath(previousFilePath);
      if (targetFile) {
        let previousContent = await app.vault.read(targetFile);
        
        let updatedContent = previousContent;
        
        for (const task of tasks) {
          const escapedTask = task.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const taskRegex = new RegExp(escapedTask, 'g');
          updatedContent = updatedContent.replace(taskRegex, "");
        }
        
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
      
      // 获取上一期文件路径
      const previousFilePath = getNotePath(periodInfo.previous, periodInfo.type);
      
      // 读取上一期文件内容
      const previousContent = await readFileContent(previousFilePath);
      if (!previousContent) {
        new Notice(`找不到${periodInfo.previousDisplayName}的文件：${previousFilePath}`);
        return;
      }
      
      // 提取未完成的任务
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
      
      // 从上一期文件中删除已转移的任务
      await deleteTransferredTasks(previousFilePath, unfinishedTasks);
      
      // 显示结果通知
      const message = unfinishedTasks.length > 0
        ? `已将${unfinishedTasks.length}个未完成的任务从${periodInfo.previousDisplayName}移动到${periodInfo.displayName}，并从原文件中删除。`
        : `${periodInfo.previousDisplayName}没有未完成的任务需要移动。`;
      
      new Notice(message);
      
    } catch (error) {
      console.error("执行任务迁移时出错:", error);
      new Notice("执行任务迁移时发生错误，请检查控制台日志");
    }
  }

  // 执行主函数
  await moveUnfinishedTasks();
};

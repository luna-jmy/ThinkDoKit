module.exports = async (params) => {
  const { app } = params;

  // 工具函数：动态生成文件路径
  function getNotePath(dateStr, type) {
    switch (type) {
      case 'year':
        return `500 Journal/510 Annual/${dateStr}.md`;
      case 'month':
        return `500 Journal/520 Monthly/${dateStr}.md`;
      case 'week':
        return `500 Journal/530 Weekly/${dateStr}.md`;
      default:
        return '';
    }
  }

  // 识别文件类型和获取上一期
  function parseFilenameAndGetPrevious(filename) {
    // 移除.md扩展名
    const baseName = filename.replace(/\.md$/, '');
    
    // 年格式：YYYY (2025)
    const yearMatch = baseName.match(/^(\d{4})$/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      const previousYear = year - 1;
      return {
        type: 'year',
        current: baseName,
        previous: previousYear.toString(),
        displayName: `${year}年`,
        previousDisplayName: `${previousYear}年`
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
        displayName: `${year}年${month}月`,
        previousDisplayName: `${previousYear}年${previousMonth}月`
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
        const lastDayOfPrevYear = new Date(previousYear, 11, 31);
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
        displayName: `${year}年第${week}周`,
        previousDisplayName: `${previousYear}年第${previousWeek}周`
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

  // 提取未完成和推迟的任务
  function extractUnfinishedTasks(content) {
    // 修改正则表达式以匹配未完成任务 ([ ]) 和推迟任务 ([>])
    const taskRegex = /- \[( |>)\] .*?\n/g;
    return content.match(taskRegex) || [];
  }

  // 将任务插入到当前光标位置
  async function insertTasksAtCursor(tasks, periodInfo) {
    if (tasks.length === 0) {
      return "";
    }
    
    try {
      const activeLeaf = app.workspace.activeLeaf;
      if (activeLeaf && activeLeaf.view && activeLeaf.view.editor) {
        const editor = activeLeaf.view.editor;
        const cursor = editor.getCursor();
        
        // 根据周期类型设置不同的标题
        let sectionTitle = "";
        switch (periodInfo.type) {
          case 'year':
            sectionTitle = `### 🔄 从${periodInfo.previousDisplayName}滚动的任务`;
            break;
          case 'month':
            sectionTitle = `### 🔄 从${periodInfo.previousDisplayName}滚动的任务`;
            break;
          case 'week':
            sectionTitle = `### 🔄 从${periodInfo.previousDisplayName}滚动的任务`;
            break;
        }
        
        const textToInsert = "\n" + sectionTitle + "\n" + tasks.join("");
        
        editor.replaceRange(textToInsert, cursor);
        
        return textToInsert;
      }
      return "";
    } catch (error) {
      console.error("插入任务时出错:", error);
      return "";
    }
  }

  // 从上一期文件中删除已转移的未完成任务和推迟任务
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
      // 获取当前活动文件
      const activeFile = app.workspace.getActiveFile();
      if (!activeFile) {
        new Notice("错误：请先打开一个笔记文件");
        return;
      }
      
      // 解析文件名并获取上一期信息
      const periodInfo = parseFilenameAndGetPrevious(activeFile.name);
      if (!periodInfo) {
        new Notice("错误：无法识别文件名格式。支持的格式：YYYY（年）、YYYY-MM（月）、YYYY-W[w]（周）");
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
      
      // 提取未完成和推迟的任务
      const unfinishedTasks = extractUnfinishedTasks(previousContent);
      
      // 在当前光标位置插入任务
      const insertedText = await insertTasksAtCursor(unfinishedTasks, periodInfo);
      
      // 从上一期文件中删除已转移的任务
      await deleteTransferredTasks(previousFilePath, unfinishedTasks);
      
      // 显示结果通知
      const message = unfinishedTasks.length > 0
        ? `已将${unfinishedTasks.length}个未完成和推迟的任务从${periodInfo.previousDisplayName}移动到${periodInfo.displayName}，并从原文件中删除。`
        : `${periodInfo.previousDisplayName}没有未完成或推迟的任务需要移动。`;
      
      new Notice(message);
      
    } catch (error) {
      console.error("执行任务迁移时出错:", error);
      new Notice("执行任务迁移时发生错误，请检查控制台日志");
    }
  }

  // 执行主函数
  await moveUnfinishedTasks();
};

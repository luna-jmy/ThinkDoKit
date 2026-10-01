module.exports = async (params) => {
  const { app } = params;

  // 工具函数：动态生成日记文件路径  
  function getDailyNotePath(dateStr) {  
    const [year, month, day] = dateStr.split("-");  
    return `500 Journal/540 Daily/${year}-${month}-${day}.md`;
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

  // 从文件名提取日期
  function extractDateFromFilename(filename) {
    // 假设文件名格式为 YYYY-MM-DD.md
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
    
  // 步骤1：读取文件内容  
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
    
  // 步骤2：提取未完成的任务  
  function extractUnfinishedTasks(content) {  
    // 匹配所有未完成的任务
    const taskRegex = /- \[ \] .*?\n/g;
    return content.match(taskRegex) || [];
  }  
    
  // 步骤3：将任务插入到当前光标位置  
  async function insertTasksAtCursor(tasks) {  
    if (tasks.length === 0) {
      return ""; // 如果没有任务，直接返回空字符串
    }
    
    try {
      // 获取当前活动的编辑器
      const activeLeaf = app.workspace.activeLeaf;
      if (activeLeaf && activeLeaf.view && activeLeaf.view.editor) {
        const editor = activeLeaf.view.editor;
        const cursor = editor.getCursor();
        
        // 构建要插入的文本
        const textToInsert = "\n### 🔄 Rollover Todos\n" + tasks.join("");
        
        // 在光标位置插入文本
        editor.replaceRange(textToInsert, cursor);
        
        return textToInsert;
      }
      return "";
    } catch (error) {
      console.error("插入任务时出错:", error);
      return "";
    }
  }  
    
  // 步骤4：从前一日文件中删除已转移的未完成任务
  async function deleteTransferredTasks(previousFilePath, tasks) {  
    if (tasks.length === 0) {
      return; // 如果没有任务，直接返回  
    }
    
    try {  
      const targetFile = app.vault.getAbstractFileByPath(previousFilePath);  
      if (targetFile) {
        let previousContent = await app.vault.read(targetFile);  
      
        // 删除已转移的未完成任务
        let updatedContent = previousContent;
        
        for (const task of tasks) {
          // 创建带转义的正则表达式确保精确匹配任务
          const escapedTask = task.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const taskRegex = new RegExp(escapedTask, 'g');
          
          // 直接删除该任务
          updatedContent = updatedContent.replace(taskRegex, "");
        }
        
        // 清理可能产生的多余空行
        updatedContent = updatedContent.replace(/\n{3,}/g, '\n\n');
        
        await app.vault.modify(targetFile, updatedContent);  
      }
    } catch (error) {  
      console.error("删除任务时出错:", error);
    }  
  }  
    
  // 主函数：执行任务迁移逻辑  
  async function moveUndo() {  
    try {
      // 获取当前活动文件的路径和名称
      const activeFile = app.workspace.getActiveFile();
      if (!activeFile) {
        new Notice("错误：请先打开一个日记文件");
        return;
      }
      
      // 从文件名提取当前日期
      const currentDate = extractDateFromFilename(activeFile.name);
      
      // 计算前一天日期
      const previousDate = getPreviousDay(currentDate);
      
      const previousFilePath = getDailyNotePath(previousDate);  
      
      // 读取前一日文件内容  
      const previousContent = await readFileContent(previousFilePath);  
      
      // 提取未完成的任务  
      const unfinishedTasks = extractUnfinishedTasks(previousContent);  
      
      // 在当前光标位置插入任务
      const insertedText = await insertTasksAtCursor(unfinishedTasks);  
      
      // 从前一日文件中删除已转移的任务  
      await deleteTransferredTasks(previousFilePath, unfinishedTasks);
      
      // 显示结果通知
      const message = unfinishedTasks.length > 0 
        ? `已将${unfinishedTasks.length}个未完成的任务从${previousDate}移动到当前位置，并从前一日文件中删除。` 
        : `${previousDate}没有未完成的任务需要移动。`;
      
      new Notice(message);
      
    } catch (error) {
      console.error("执行任务迁移时出错:", error);
      new Notice("执行任务迁移时发生错误，请检查控制台日志");
    }
  }  
    
  // 执行主函数
  await moveUndo();
};
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
  return tp.date.now("YYYY-MM-DD");
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
    // 直接返回任务文本，让Templater将其插入到当前光标位置
    return "\n## 昨日未完成任务\n" + tasks.join("");
  } catch (error) {
    return "";
  }
}  
  
// 步骤4：将前一日文件中的未完成任务标记为推迟
async function markTasksAsForwarded(previousFilePath, tasks) {  
  if (tasks.length === 0) {
    return; // 如果没有任务，直接返回  
  }
  
  try {  
    const targetFile = app.vault.getAbstractFileByPath(previousFilePath);  
    if (targetFile) {
      let previousContent = await app.vault.read(targetFile);  
    
      // 替换未完成任务标记：将 "- [ ] " 替换为 "- [>] "  
      let updatedContent = previousContent;
      
      for (const task of tasks) {
        // 创建带转义的正则表达式确保精确匹配任务
        const escapedTask = task.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const taskRegex = new RegExp(escapedTask, 'g');
        
        // 将该任务从 "- [ ] " 替换为 "- [>] "
        const forwardedTask = task.replace("- [ ]", "- [>]");
        updatedContent = updatedContent.replace(taskRegex, forwardedTask);
      }
      
      await app.vault.modify(targetFile, updatedContent);  
    }
  } catch (error) {  
    // 静默处理错误
  }  
}  
  
// 主函数：执行任务迁移逻辑  
async function moveUndo() {  
  // 获取当前活动文件的路径和名称
  const activeFile = app.workspace.getActiveFile();
  if (!activeFile) {
    return "错误：请先打开一个日记文件";
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
  
  // 准备在光标位置插入任务
  const tasksToInsert = await insertTasksAtCursor(unfinishedTasks);  
  
  // 在前一日文件中标记已推迟的任务  
  await markTasksAsForwarded(previousFilePath, unfinishedTasks);
  
  // 显示结果，将任务文本返回给Templater以插入到光标位置
  const message = unfinishedTasks.length > 0 
    ? tasksToInsert + "\n\n_已将" + unfinishedTasks.length + "个未完成的任务从" + previousDate + "移动到当前位置，并在前一日文件中标记为已推迟。_" 
    : "_" + previousDate + "没有未完成的任务需要移动。_";
  
  return message;
}  
  
// 执行主函数并返回结果（Templater会将返回值插入到当前光标位置）
const result = await moveUndo();  
tR += result;
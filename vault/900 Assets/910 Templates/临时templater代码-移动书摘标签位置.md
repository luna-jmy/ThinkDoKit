---
created: 2025-09-24
---

<%*
//必须在文档末尾插入运行
try {
  // 获取当前文件内容
  const fileContent = tp.file.content;
  let lines = fileContent.split('\n');
  
  console.log("开始处理文件内容...");
  
  // 用于标记是否进行了修改
  let hasChanges = false;
  
  // 从后往前遍历，这样在删除行时不会影响前面行的索引
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    
    // 查找"标签："或"标签&关键词："行
    let tagContent = '';
    if (line.startsWith('标签：')) {
      tagContent = line.substring(3).trim();
      console.log(`找到标签行，索引: ${i}, 内容: "${tagContent}"`);
    } else if (line.startsWith('标签&关键词：')) {
      tagContent = line.substring(7).trim();
      console.log(`找到标签&关键词行，索引: ${i}, 内容: "${tagContent}"`);
    }
    
    if (tagContent) {
      // 向前查找对应的"书摘"、"书摘[编号]："或"书摘[编号]："行
      let bookExcerptIndex = -1;
      let bookExcerptContent = '';
      let isNumberedExcerpt = false;
      
      for (let j = i - 1; j >= 0; j--) {
        // 检查是否是书摘行（带方括号编号、不带方括号编号或不带编号）
        const bookExcerptMatchWithBrackets = lines[j].match(/^书摘\[(\d+)\]：/);
        const bookExcerptMatchWithoutBrackets = lines[j].match(/^书摘(\d+)：/);
        
        if (lines[j].startsWith('书摘：') || bookExcerptMatchWithBrackets || bookExcerptMatchWithoutBrackets) {
          bookExcerptIndex = j;
          
          if (bookExcerptMatchWithBrackets) {
            isNumberedExcerpt = true;
            console.log(`找到带方括号编号的书摘行，索引: ${bookExcerptIndex}, 编号: ${bookExcerptMatchWithBrackets[1]}`);
          } else if (bookExcerptMatchWithoutBrackets) {
            isNumberedExcerpt = true;
            console.log(`找到带编号的书摘行，索引: ${bookExcerptIndex}, 编号: ${bookExcerptMatchWithoutBrackets[1]}`);
          } else {
            console.log(`找到书摘行，索引: ${bookExcerptIndex}`);
          }
          
          // 检查书摘内容是在同一行还是下一行
          const bookExcerptLine = lines[j];
          const colonIndex = bookExcerptLine.indexOf('：');
          
          if (colonIndex + 1 < bookExcerptLine.length) {
            // 书摘内容在同一行
            bookExcerptContent = bookExcerptLine.substring(colonIndex + 1).trim();
            console.log(`书摘内容在同一行: "${bookExcerptContent}"`);
          } else if (j + 1 < lines.length && !lines[j + 1].startsWith('书名：') && !lines[j + 1].startsWith('章节：')) {
            // 书摘内容在下一行（且不是书名行或章节行）
            bookExcerptContent = lines[j + 1].trim();
            console.log(`书摘内容在下一行: "${bookExcerptContent}"`);
          }
          break;
        }
      }
      
      // 如果找到了对应的书摘
      if (bookExcerptIndex !== -1 && bookExcerptContent && tagContent) {
        // 将标签添加到书摘内容末尾
        bookExcerptContent += ' ' + tagContent;
        
        // 更新书摘内容和格式
        const bookExcerptLine = lines[bookExcerptIndex];
        const colonIndex = bookExcerptLine.indexOf('：');
        
        if (colonIndex + 1 < bookExcerptLine.length) {
          // 书摘内容在同一行，修改该行并去掉编号
          lines[bookExcerptIndex] = '书摘：' + bookExcerptContent;
        } else if (bookExcerptIndex + 1 < lines.length) {
          // 书摘内容在下一行，修改下一行并去掉编号
          lines[bookExcerptIndex] = '书摘：';
          lines[bookExcerptIndex + 1] = bookExcerptContent;
        }
        
        // 删除标签行（无论是"标签："还是"标签&关键词："）
        lines.splice(i, 1);
        
        hasChanges = true;
        console.log(`已将标签 "${tagContent}" 移动到书摘末尾，并${isNumberedExcerpt ? '去掉编号' : '保持格式'}`);
      }
    }
  }
  
  // 如果有修改，则保存文件
  if (hasChanges) {
    // 使用当前活动文件来修改内容
    const activeFile = app.workspace.getActiveFile();
    if (activeFile) {
      await app.vault.modify(activeFile, lines.join('\n'));
      
      // 显示处理结果
      new Notice('所有标签已成功移动到对应书摘末尾，并统一了书摘格式');
      console.log("所有标签已成功移动到对应书摘末尾，并统一了书摘格式");
    } else {
      console.error("无法获取当前活动文件");
      new Notice("无法获取当前活动文件");
    }
  } else {
    new Notice('未找到需要移动的标签');
    console.log('未找到需要移动的标签');
  }
} catch (error) {
  console.error("执行错误:", error);
  new Notice("执行错误: " + error.message);
}
%>

// 内联字段表格生成器
// 使用方法：
// ```dataviewjs
// await dv.view("路径/inline-fields-table", {mode: "current"})  // 当前笔记
// await dv.view("路径/inline-fields-table", {mode: "folder"})   // 同文件夹
// ```

const mode = input?.mode || "current";

// 解析单个笔记的内联字段
function parseInlineFields(file) {
  const fieldMap = {};
  
  if (!file.file.lists) return fieldMap;
  
  file.file.lists.forEach(list => {
    // 匹配内联字段格式 [字段名::值]
    const match = list.text.match(/\[(.*?)::(.*?)\]/);
    if (match) {
      const fieldName = match[1].trim();
      let fieldValue = match[2].trim();
      
      // 检查是否是百分比格式
      const percentMatch = fieldValue.match(/^(\d+)%$/);
      if (percentMatch) {
        const percent = parseInt(percentMatch[1]);
        const progressBar = `<div style="width: 100%; background-color: #f1f1f1; border-radius: 4px;"><div style="width: ${percent}%; background-color: #4CAF50; height: 20px; border-radius: 4px; text-align: center; line-height: 20px; color: white;">${percent}%</div></div>`;
        fieldValue = progressBar;
      }
      
      if (!fieldMap[fieldName]) {
        fieldMap[fieldName] = [];
      }
      fieldMap[fieldName].push(fieldValue);
    }
  });
  
  return fieldMap;
}

// 模式1：当前笔记
if (mode === "current") {
  const currentFile = dv.current();
  const fieldMap = parseInlineFields(currentFile);
  
  if (Object.keys(fieldMap).length === 0) {
    dv.paragraph("⚠️ 当前笔记没有找到内联字段（格式：[字段名::值]）");
    return;
  }
  
  // 获取所有字段名作为表头
  const headers = Object.keys(fieldMap);
  
  // 确定最大行数
  const maxRows = Math.max(...Object.values(fieldMap).map(values => values.length));
  
  // 构建表格数据
  const tableData = [];
  for (let i = 0; i < maxRows; i++) {
    const row = headers.map(header => fieldMap[header][i] || "");
    tableData.push(row);
  }
  
  // 渲染表格
  dv.header(3, "📊 当前笔记内联字段");
  dv.table(headers, tableData);
}

// 模式2：同文件夹所有笔记
else if (mode === "folder") {
  const currentFile = dv.current();
  const currentFolder = currentFile.file.folder;
  
  // 获取同文件夹的所有笔记（排除当前笔记）
  const folderFiles = dv.pages(`"${currentFolder}"`)
    .where(p => p.file.path !== currentFile.file.path)
    .sort(p => p.file.name);
  
  if (folderFiles.length === 0) {
    dv.paragraph("⚠️ 当前文件夹没有其他笔记");
    return;
  }
  
  // 收集所有字段和笔记数据
  const allFields = new Set();
  const notesData = [];
  
  folderFiles.forEach(file => {
    const fieldMap = parseInlineFields(file);
    
    if (Object.keys(fieldMap).length > 0) {
      // 记录所有出现的字段名
      Object.keys(fieldMap).forEach(field => allFields.add(field));
      
      notesData.push({
        noteName: file.file.name,
        noteLink: file.file.link,
        fields: fieldMap
      });
    }
  });
  
  if (notesData.length === 0) {
    dv.paragraph("⚠️ 文件夹中的笔记都没有内联字段");
    return;
  }
  
  // 按字段名排序
  const sortedFields = Array.from(allFields).sort();
  
  // 构建表头：笔记名 + 所有字段
  const headers = ["📝 笔记", ...sortedFields];
  
  // 构建表格数据
  const tableData = [];
  
  notesData.forEach(note => {
    // 计算该笔记的最大行数
    const maxRows = Math.max(
      ...sortedFields.map(field => note.fields[field]?.length || 0),
      1 // 至少一行
    );
    
    // 为该笔记生成多行数据
    for (let i = 0; i < maxRows; i++) {
      const row = [
        i === 0 ? note.noteLink : "" // 只在第一行显示笔记链接
      ];
      
      // 添加每个字段的值
      sortedFields.forEach(field => {
        const value = note.fields[field]?.[i] || "";
        row.push(value);
      });
      
      tableData.push(row);
    }
  });
  
  // 渲染表格
  dv.header(3, `📊 文件夹内联字段汇总 (${notesData.length} 个笔记)`);
  dv.table(headers, tableData);
  
  // 显示统计信息
  dv.paragraph(`📁 文件夹: \`${currentFolder}\` | 🏷️ 字段数: ${sortedFields.length}`);
}

else {
  dv.paragraph("❌ 无效的模式，请使用 'current' 或 'folder'");
}
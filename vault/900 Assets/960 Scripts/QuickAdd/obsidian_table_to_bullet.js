module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;
    
    // 获取当前活动编辑器
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice('请先打开一个笔记');
        return;
    }
    
    const editor = app.workspace.activeEditor?.editor;
    if (!editor) {
        new Notice('无法获取编辑器');
        return;
    }
    
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    // 查找光标所在的表格
    let tableStart = -1;
    let tableEnd = -1;
    
    // 向上查找表格开始
    for (let i = cursor.line; i >= 0; i--) {
        if (lines[i].trim().startsWith('|')) {
            tableStart = i;
        } else if (tableStart !== -1) {
            break;
        }
    }
    
    // 向下查找表格结束
    for (let i = cursor.line; i < lines.length; i++) {
        if (lines[i].trim().startsWith('|')) {
            tableEnd = i;
        } else if (tableEnd !== -1) {
            break;
        }
    }
    
    if (tableStart === -1 || tableEnd === -1) {
        new Notice('未找到表格，请将光标放在表格内');
        return;
    }
    
    // 提取表格内容
    const tableLines = lines.slice(tableStart, tableEnd + 1);
    
    // 解析表格
    const parseTable = (tableLines) => {
        const rows = tableLines
            .filter(line => !line.match(/^\|[\s:-]+\|/)) // 过滤分隔线
            .map(line => 
                line.split('|')
                    .slice(1, -1) // 去掉首尾空元素
                    .map(cell => cell.trim())
            );
        return rows;
    };
    
    const tableData = parseTable(tableLines);
    if (tableData.length < 2) {
        new Notice('表格格式不正确');
        return;
    }
    
    const headers = tableData[0];
    const dataRows = tableData.slice(1);
    
    // 选择转换方式
    const conversionType = await QuickAdd.suggester(
        [
            '按行转换（所有列平铺）',
            '按列转换（标题为主项，内容为子项）',
            '第一列为主项，其他列为子项'
        ],
        ['row', 'column', 'firstColumn']
    );
    
    if (!conversionType) return;
    
    let bulletPoints = [];
    
    // 根据选择的方式转换
    switch (conversionType) {
        case 'row':
            // 按行转换：每行的所有列平铺
            dataRows.forEach(row => {
                const items = row.map((cell, idx) => `- ${headers[idx]}：${cell}`).join('\n');
                bulletPoints.push(items);
            });
            break;
            
        case 'column':
            // 按列转换：标题为主项，列内容为子项
            headers.forEach((header, colIdx) => {
                bulletPoints.push(`- ${header}`);
                dataRows.forEach(row => {
                    bulletPoints.push(`  - ${row[colIdx]}`);
                });
            });
            break;
            
        case 'firstColumn':
            // 第一列为主项，其他列为子项
            dataRows.forEach(row => {
                bulletPoints.push(`- ${row[0]}`);
                for (let i = 1; i < row.length; i++) {
                    bulletPoints.push(`  - ${headers[i]}：${row[i]}`);
                }
            });
            break;
    }
    
    const bulletText = bulletPoints.join('\n');
    
    // 询问是否保留表格
    const keepTable = await QuickAdd.yesNoPrompt(
        '是否保留原表格？',
        '选择"否"将删除表格，仅保留转换后的 bullet points'
    );
    
    // 替换内容
    if (keepTable) {
        // 保留表格，在表格后添加 bullet points
        editor.replaceRange(
            '\n\n' + bulletText,
            { line: tableEnd, ch: lines[tableEnd].length }
        );
    } else {
        // 删除表格，仅保留 bullet points
        editor.replaceRange(
            bulletText,
            { line: tableStart, ch: 0 },
            { line: tableEnd, ch: lines[tableEnd].length }
        );
    }
    
    new Notice('表格转换完成！');
};
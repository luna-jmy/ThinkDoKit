module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester }, app } = params;
    
    // 获取当前活动的文件
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice('没有打开的文件');
        return;
    }
    
    // 读取文件内容
    const content = await app.vault.read(activeFile);
    const lines = content.split('\n');
    
    // 查找所有未完成的任务（只有 - [ ] 的任务）
    const unfinishedTasks = [];
    const taskPattern = /^(\s*)- \[ \] (.*)$/;
    
    lines.forEach((line, index) => {
        const match = line.match(taskPattern);
        if (match) {
            unfinishedTasks.push({
                lineIndex: index,
                indent: match[1],
                taskText: match[2],
                originalLine: line
            });
        }
    });
    
    if (unfinishedTasks.length === 0) {
        new Notice('当前文件中没有未完成的任务');
        return;
    }
    
    // 选择操作类型
    const actions = [
        { label: `✅ 标记完成 (${unfinishedTasks.length} 个任务)`, value: 'complete' },
        { label: `❌ 标记取消 (${unfinishedTasks.length} 个任务)`, value: 'cancel' },
        { label: `⏭️ 标记推迟 (${unfinishedTasks.length} 个任务)`, value: 'defer' },
        { label: `⏹️ 标记为未完成 (${unfinishedTasks.length} 个任务)`, value: 'incomplete' }
    ];
    
    const selectedAction = await suggester(
        actions.map(a => a.label),
        actions.map(a => a.value)
    );
    
    if (!selectedAction) {
        return; // 用户取消了操作
    }
    
    // 确认操作 - 添加默认值选项和默认提示
    const confirmMessage = `确定要${getActionDescription(selectedAction)} ${unfinishedTasks.length} 个未完成的任务吗？ (y/n)`;
    const confirmed = await inputPrompt(confirmMessage, 'y/n', 'y', true);
    // 检查用户输入，如果不是'y'或'yes'（不区分大小写），则取消操作
    if (!confirmed || !['y', 'yes'].includes(confirmed.toLowerCase())) {
        new Notice('操作已取消');
        return;
    }
    
    // 执行批量操作
    const newLines = [...lines];
    let processedCount = 0;
    
    unfinishedTasks.forEach(task => {
        const newMarker = getTaskMarker(selectedAction);
        const newLine = `${task.indent}- [${newMarker}] ${task.taskText}`;
        newLines[task.lineIndex] = newLine;
        processedCount++;
    });
    
    // 写入修改后的内容
    const newContent = newLines.join('\n');
    await app.vault.modify(activeFile, newContent);
    
    // 显示完成消息
    new Notice(`已${getActionDescription(selectedAction)} ${processedCount} 个任务`);
    
    // 辅助函数
    function getTaskMarker(action) {
        switch (action) {
            case 'complete': return 'x';
            case 'cancel': return '-';
            case 'defer': return '>';
            case 'incomplete': return '/';
            default: return ' ';
        }
    }
    
    function getActionDescription(action) {
        switch (action) {
            case 'complete': return '标记为完成';
            case 'cancel': return '标记为取消';
            case 'defer': return '标记为推迟';
            case 'incomplete': return '标记为批量处理中';
            default: return '处理';
        }
    }
};

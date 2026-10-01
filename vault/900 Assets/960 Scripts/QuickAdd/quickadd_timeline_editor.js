module.exports = async (params) => {
    const { quickAddApi: QuickAdd } = params;
    
    try {
        // 获取当前活动文件
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('请先打开一个笔记文件');
            return;
        }
        
        // 读取文件内容
        const content = await app.vault.read(activeFile);
        
        // 查找现有的dataviewjs代码块
        const dataviewPattern = /```dataviewjs\s*await dv\.view\("year-timeline-1",\s*{\s*theYear:\s*(\d+),\s*events:\s*(\[.*?\])\s*}\)\s*```/s;
        const match = content.match(dataviewPattern);
        
        let currentYear = new Date().getFullYear();
        let currentEvents = [];
        
        if (match) {
            currentYear = parseInt(match[1]);
            try {
                currentEvents = JSON.parse(match[2]);
            } catch (e) {
                new Notice('解析当前事件数据时出错');
            }
        }
        
        // 获取年份
        const yearInput = await QuickAdd.inputPrompt(
            "请输入年份", 
            currentYear.toString()
        );
        
        if (!yearInput) return;
        
        const year = parseInt(yearInput);
        if (isNaN(year) || year < 1900 || year > 2100) {
            new Notice('请输入有效的年份 (1900-2100)');
            return;
        }
        
        // 处理事件列表
        let events = [];
        
        // 如果有现有事件，询问是否保留
        if (currentEvents.length > 0) {
            const keepExisting = await QuickAdd.yesNoPrompt(
                `发现现有的 ${currentEvents.length} 个事件，是否保留？`
            );
            
            if (keepExisting) {
                events = [...currentEvents];
            }
        }
        
        // 添加新事件
        while (true) {
            const addMore = await QuickAdd.yesNoPrompt(
                events.length === 0 ? "是否添加事件？" : `已有 ${events.length} 个事件，继续添加？`
            );
            
            if (!addMore) break;
            
            // 获取事件信息
            const eventDate = await QuickAdd.inputPrompt("事件日期 (M/D格式，如 5/5)");
            if (!eventDate) continue;
            
            // 简单验证日期格式
            if (!/^\d{1,2}\/\d{1,2}$/.test(eventDate)) {
                new Notice('日期格式错误，请使用 M/D 格式');
                continue;
            }
            
            const eventTitle = await QuickAdd.inputPrompt("事件标题", `Event (${eventDate})`);
            if (!eventTitle) continue;
            
            const eventIcon = await QuickAdd.inputPrompt("事件图标", "📅");
            if (!eventIcon) continue;
            
            events.push([eventDate, eventTitle, eventIcon]);
            new Notice(`已添加: ${eventTitle}`);
        }
        
        // 如果没有事件，提供示例
        if (events.length === 0) {
            const useExample = await QuickAdd.yesNoPrompt("使用示例事件？");
            if (useExample) {
                events = [
                    ['5/5', 'Event 1', '🎉'],
                    ['6/17', 'Event 2', '🎊'],
                    ['12/4', 'Event 3', '🎈']
                ];
            }
        }
        
        // 生成新代码
        const eventsStr = JSON.stringify(events);
        const newCode = `\`\`\`dataviewjs
await dv.view("year-timeline-1", { theYear: ${year}, events: ${eventsStr}})
\`\`\``;
        
        // 更新文件
        let newContent;
        if (match) {
            newContent = content.replace(dataviewPattern, newCode);
        } else {
            newContent = content + '\n\n' + newCode;
        }
        
        await app.vault.modify(activeFile, newContent);
        new Notice(`时间线已更新：${year}年，${events.length}个事件`);
        
    } catch (error) {
        console.error('Error:', error);
        new Notice('操作失败: ' + error.message);
    }
};
/**
 * 日志内联字段表格视图 - 增强调试版
 * 文件名: journal-field-table.js
 */

// 导出函数 - 立即输出调试信息
module.exports = async (dv, params) => {
    console.log("=== 脚本开始执行 ===");
    console.log("dv 对象:", dv);
    console.log("params:", params);
    console.log("container:", dv.container);
    
    // 先输出一个测试段落
    dv.container.createEl("p", { 
        text: "🎉 脚本已加载！开始处理...",
        attr: { style: "color: green; font-weight: bold;" }
    });
    
    try {
        const view = new JournalFieldTableView(
            dv.app,
            dv,
            dv.container,
            params
        );
        
        console.log("JournalFieldTableView 实例创建成功");
        await view.render();
        console.log("render 完成");
        
    } catch (error) {
        console.error("❌ 错误:", error);
        dv.container.createEl("p", { 
            text: `❌ 错误: ${error.message}`,
            attr: { style: "color: red;" }
        });
        dv.container.createEl("pre", { 
            text: error.stack 
        });
    }
};

class JournalFieldTableView {
    constructor(app, dv, container, params = {}) {
        console.log("constructor 开始");
        this.app = app;
        this.dv = dv;
        this.container = container;
        this.params = {
            journalPath: params.journalPath || "500 Journal",
            titleParam: params.titleParam || null,
            debug: params.debug !== false, // 默认开启
            ...params
        };
        
        console.log("初始化参数:", this.params);
    }

    log(...args) {
        if (this.params.debug) {
            console.log("[JournalFieldTable]", ...args);
        }
    }

    // 解析内联字段
    parseInlineFields(content) {
        const fields = {};
        
        // 格式1: [字段::值]
        const regex1 = /\[([^\[\]::]+)::([^\[\]]+)\]/g;
        // 格式2: - [字段::值] 或 - [字段::]
        const regex2 = /^- \[([^\[\]::]+)::\s*([^\]]*)\]/gm;
        
        let match;
        
        while ((match = regex1.exec(content)) !== null) {
            const fieldName = match[1].trim();
            const fieldValue = match[2].trim();
            if (fieldValue) {
                fields[fieldName] = fieldValue;
            }
        }
        
        while ((match = regex2.exec(content)) !== null) {
            const fieldName = match[1].trim();
            const fieldValue = match[2].trim();
            if (fieldValue) {
                fields[fieldName] = fieldValue;
            }
        }
      
        return fields;
    }

    // 生成日期范围
    generateDateRange(startDate, endDate) {
        const dates = [];
        const current = new Date(startDate);
        const end = new Date(endDate);
      
        while (current <= end) {
            dates.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }
      
        return dates;
    }

    // 计算周日期范围 - 周一到周日
    getWeekDateRange(year, week) {
        this.log("计算周日期:", year, week);
        
        // 找到该年的1月4日
        const jan4 = new Date(year, 0, 4);
        const jan4Day = jan4.getDay() || 7;
        
        // 找到第一周的周一
        const firstMonday = new Date(year, 0, 4 - jan4Day + 1);
        
        // 计算目标周的周一
        const targetMonday = new Date(firstMonday);
        targetMonday.setDate(firstMonday.getDate() + (week - 1) * 7);
        
        // 计算周日
        const targetSunday = new Date(targetMonday);
        targetSunday.setDate(targetMonday.getDate() + 6);
      
        const result = {
            start: targetMonday.toISOString().split('T')[0],
            end: targetSunday.toISOString().split('T')[0]
        };
        
        this.log("周日期范围:", result);
        return result;
    }

    // 计算月日期范围
    getMonthDateRange(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
      
        return {
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0]
        };
    }

    // 获取当前笔记信息
    async getCurrentPageInfo() {
        this.log("获取当前笔记信息");
        const currentPage = this.dv.current();
        if (!currentPage) return;
        const content = await this.app.vault.cachedRead(currentPage.file);
        return {
            file: currentPage.file,
            fileName: currentPage.file.name,
            content: content
        };
    }

    // 获取目标日期列表
    async getTargetDates(currentFileName, currentFileContent) {
        this.log("getTargetDates 开始, 文件名:", currentFileName);
        let dates = [];
      
        const hasArchive = /## \d{4}-\d{2}-\d{2}/.test(currentFileContent);
        this.log("是否有归档:", hasArchive);
      
        if (hasArchive) {
            const archiveMatches = currentFileContent.match(/## (\d{4}-\d{2}-\d{2})/g);
            if (archiveMatches) {
                dates = archiveMatches.map(match => match.replace('## ', ''));
                this.log("从归档提取日期:", dates);
            }
        } else {
            if (/^\d{4}-W\d{1,2}$/.test(currentFileName)) {
                const match = currentFileName.match(/^(\d{4})-W(\d{1,2})$/);
                const year = parseInt(match[1]);
                const week = parseInt(match[2]);
                this.log("识别为周日志:", year, "年第", week, "周");
                
                const dateRange = this.getWeekDateRange(year, week);
                dates = this.generateDateRange(dateRange.start, dateRange.end);
                this.log("生成日期列表:", dates);
            } else if (/^\d{4}-\d{2}$/.test(currentFileName)) {
                const [year, month] = currentFileName.split('-');
                const dateRange = this.getMonthDateRange(parseInt(year), parseInt(month));
                dates = this.generateDateRange(dateRange.start, dateRange.end);
                this.log("月日志日期列表:", dates);
            }
        }
      
        return { dates, hasArchive };
    }

    // 收集日志数据
    async collectJournalData(targetDates) {
        this.log("collectJournalData 开始");
        const allFields = [];
        const fieldNames = new Set();
      
        for (const dateStr of targetDates) {
            const dailyLogPath = `${this.params.journalPath}/${dateStr}.md`;
            this.log("检查文件:", dailyLogPath);
            
            const dailyLog = this.app.vault.getAbstractFileByPath(dailyLogPath);
          
            if (dailyLog) {
                this.log("✅ 文件存在:", dailyLogPath);
                try {
                    const content = await this.app.vault.cachedRead(dailyLog);
                    
                    let contentToProcess = content;
                    if (this.params.titleParam) {
                        const titleRegex = new RegExp(`## ${this.params.titleParam}([\\s\\S]*?)(?=^##|$)`, 'im');
                        const titleMatch = content.match(titleRegex);
                        if (titleMatch) {
                            contentToProcess = titleMatch[1];
                            this.log("提取标题内容成功");
                        } else {
                            this.log("未找到指定标题,跳过");
                            continue;
                        }
                    }
                    
                    const fields = this.parseInlineFields(contentToProcess);
                    this.log(`${dateStr} 解析字段:`, fields);
                  
                    if (Object.keys(fields).length > 0) {
                        Object.keys(fields).forEach(name => fieldNames.add(name));
                        allFields.push({
                            date: dateStr,
                            fields: fields
                        });
                    }
                } catch (error) {
                    this.log("读取文件出错:", error);
                }
            } else {
                this.log("❌ 文件不存在:", dailyLogPath);
            }
        }
        
        this.log("收集完成! 记录数:", allFields.length, "字段:", Array.from(fieldNames));
        return { allFields, fieldNames: Array.from(fieldNames) };
    }

    // 渲染表格
    renderTable(allFields, fieldNames, hasArchive) {
        this.log("renderTable 开始");
        if (hasArchive) {
            this.renderArchivedTables(allFields, fieldNames);
        } else {
            this.renderSingleTable(allFields, fieldNames);
        }
    }

    // 渲染归档表格
    async renderArchivedTables(allFields, fieldNames) {
        this.log("renderArchivedTables 开始");
        const currentPage = this.dv.current();
        if (!currentPage) return;
        const currentFileContent = await this.app.vault.cachedRead(currentPage.file);
      
        const archiveDates = currentFileContent.match(/## (\d{4}-\d{2}-\d{2})/g) || [];
      
        for (const archiveTitle of archiveDates) {
            const date = archiveTitle.replace('## ', '');
            const sectionData = allFields.find(item => item.date === date);
          
            if (sectionData && Object.keys(sectionData.fields).length > 0) {
                this.container.createEl("h3", { text: date });
              
                const tableContainer = this.container.createEl("div", { cls: "dataview table-view-table" });
                const table = tableContainer.createEl("table");
              
                const thead = table.createEl("thead");
                const headerRow = thead.createEl("tr", { cls: "table-view-tr-header" });
                headerRow.createEl("th", { text: "日期", cls: "table-view-th" });
                fieldNames.forEach(fieldName => {
                    headerRow.createEl("th", { text: fieldName, cls: "table-view-th" });
                });
              
                const tbody = table.createEl("tbody");
                const row = tbody.createEl("tr");
                row.createEl("td", { text: sectionData.date, cls: "table-view-td" });
                fieldNames.forEach(fieldName => {
                    row.createEl("td", { 
                        text: sectionData.fields[fieldName] || "", 
                        cls: "table-view-td" 
                    });
                });
            }
        }
    }

    // 渲染单一表格
    renderSingleTable(allFields, fieldNames) {
        this.log("renderSingleTable 开始, 记录数:", allFields.length);
        
        if (allFields.length > 0) {
            const sortedFields = fieldNames.sort();
            this.log("字段列表:", sortedFields);
          
            const tableContainer = this.container.createEl("div", { cls: "dataview table-view-table" });
            const table = tableContainer.createEl("table");
          
            const thead = table.createEl("thead");
            const headerRow = thead.createEl("tr", { cls: "table-view-tr-header" });
            headerRow.createEl("th", { text: "日期", cls: "table-view-th" });
            sortedFields.forEach(fieldName => {
                headerRow.createEl("th", { text: fieldName, cls: "table-view-th" });
            });
          
            const tbody = table.createEl("tbody");
            allFields.forEach(item => {
                const row = tbody.createEl("tr");
                row.createEl("td", { text: item.date, cls: "table-view-td" });
                sortedFields.forEach(fieldName => {
                    row.createEl("td", { 
                        text: item.fields[fieldName] || "", 
                        cls: "table-view-td" 
                    });
                });
            });
            
            this.log("✅ 表格渲染完成");
        } else {
            this.container.createEl("p", { 
                text: "在指定时间范围内没有找到包含内联字段的日志。"
            });
            this.log("⚠️ 没有数据");
        }
    }

    // 主渲染方法
    async render() {
        this.log("=== render 方法开始 ===");
        
        try {
            const { fileName, content } = await this.getCurrentPageInfo();
            this.log("当前文件:", fileName);
          
            const { dates, hasArchive } = await this.getTargetDates(fileName, content);
            this.log("目标日期:", dates);
          
            if (dates.length === 0) {
                this.container.createEl("p", { 
                    text: `无法确定目标日期范围。文件名: ${fileName}`
                });
                return;
            }
          
            const { allFields, fieldNames } = await this.collectJournalData(dates);
            this.renderTable(allFields, fieldNames, hasArchive);
            
            this.log("=== render 方法完成 ===");
          
        } catch (error) {
            console.error("❌ render 错误:", error);
            this.container.createEl("p", { 
                text: `错误: ${error.message}`,
                attr: { style: "color: red;" }
            });
            this.container.createEl("pre", { text: error.stack });
        }
    }
}
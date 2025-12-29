// 获取ISO周数的辅助函数
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

module.exports = async (params) => {
    try {
        const { quickAddApi, app } = params;

        // 步骤1: 输入项目名称，格式为 YYYYMM项目名
        const projectNameInput = await quickAddApi.inputPrompt(
            "请输入项目名称",
            "202501我的新项目",
            "格式：YYYYMM项目名（如：202501我的新项目）"
        );

        if (!projectNameInput || projectNameInput.trim() === "") {
            new Notice("项目创建已取消");
            return;
        }

        // 验证格式：YYYYMM项目名（空格可选）
        const formatRegex = /^(\d{6})\s*(.+)$/;
        const match = projectNameInput.trim().match(formatRegex);

        if (!match) {
            new Notice("格式错误！请使用 YYYYMM项目名 格式，例如：202501我的新项目");
            return;
        }

        const datePrefix = match[1]; // YYYYMM
        let pureProjectName = match[2] ? match[2].trim() : ""; // 纯项目名，去除前后空格

        // 双重检查
        if (!pureProjectName) {
            new Notice("项目名不能为空！请使用格式：YYYYMM项目名");
            return;
        }

        console.log("项目名解析结果:", { datePrefix, pureProjectName, input: projectNameInput });

        // 验证YYYYMM是否为有效日期
        const year = parseInt(datePrefix.substring(0, 4));
        const month = parseInt(datePrefix.substring(4, 6));

        if (month < 1 || month > 12) {
            new Notice("无效的月份！月份必须在 01-12 之间");
            return;
        }

        // 步骤2: 创建项目文件夹
        const projectsBasePath = "100 Projects";
        const folderName = `${datePrefix}${pureProjectName}`;
        const folderPath = `${projectsBasePath}/${folderName}`;

        // 检查文件夹是否已存在
        const folderExists = await app.vault.adapter.exists(folderPath);
        if (folderExists) {
            new Notice(`文件夹 "${folderName}" 已存在！`);
            return;
        }

        // 创建文件夹
        await app.vault.createFolder(folderPath);
        new Notice(`已创建项目文件夹: ${folderName}`);

        // 步骤3: 询问是否创建主项目文件
        const createMainFile = await quickAddApi.suggester(
            ["是 - 创建主项目文件", "否 - 仅创建文件夹"],
            [true, false],
            false,
            `已创建文件夹 "${folderName}"，是否创建主项目文件？`
        );

        if (!createMainFile) {
            new Notice(`项目 "${folderName}" 创建完成（仅文件夹）`);
            return;
        }

        // 步骤4: 创建主项目文件
        const templatePath = "900 Assets/910 Templates/TPL-Project.md";

        try {
            // 检查模板文件是否存在
            const templateExists = await app.vault.adapter.exists(templatePath);
            if (!templateExists) {
                new Notice(`模板文件不存在: ${templatePath}`);
                console.error("模板文件路径:", templatePath);
                return;
            }

            console.log("开始读取模板文件:", templatePath);

            // 检查模板文件对象
            const templateFile = app.vault.getAbstractFileByPath(templatePath);
            if (!templateFile) {
                new Notice(`无法找到模板文件对象: ${templatePath}`);
                return;
            }

            // 读取模板内容
            const templateContent = await app.vault.read(templateFile);

            // 处理模板变量
            let processedContent = templateContent;

            // 替换 Templater 变量
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const yyyymm = `${yyyy}${mm}`;

            console.log("日期变量准备完成:", { yyyy, mm, dd, yyyymm });

            // 获取周数
            let weekNum, yyyyWeek;
            try {
                weekNum = getWeekNumber(now);
                yyyyWeek = `${yyyy}-W${String(weekNum).padStart(2, '0')}`;
                console.log("周数计算完成:", { weekNum, yyyyWeek });
            } catch (e) {
                console.error("计算周数失败:", e);
                yyyyWeek = `${yyyy}-W01`;
            }

            console.log("开始替换变量...");

            processedContent = processedContent.replace(/<%\s*tp\.date\.now\("YYYY-MM-DD"\)\s*%>/g, `${yyyy}-${mm}-${dd}`);
            console.log("1. 替换日期完成");
            processedContent = processedContent.replace(/<%\s*tp\.file\.title\s*%>/g, pureProjectName);
            console.log("2. 替换文件名完成");
            processedContent = processedContent.replace(/\{\{date:YYYYMM\}\}/g, yyyymm);
            console.log("3. 替换YYYYMM完成");
            processedContent = processedContent.replace(/\{\{date:YYYY-\[W\]w\}\}/g, yyyyWeek);
            console.log("4. 替换YYYY-[W]w完成");
            processedContent = processedContent.replace(/\{\{date:YYYY-MM\}\}/g, `${yyyy}-${mm}`);
            console.log("5. 替换YYYY-MM完成");

            // 移除需要用户交互的 suggester 变量，设置为默认值
            console.log("开始替换suggester变量...");
            processedContent = processedContent.replace(
                /<%\s*tp\.system\.suggester\(\["未开始\/待启动","起草\/构思中","执行中","暂停","完成","取消","归档"\],\["inbox","draft","active","on-hold","completed","cancelled","archived"\],\s*"请选择项目状态"\)\s*%>/g,
                "inbox"
            );
            console.log("6. 替换status suggester完成");
            processedContent = processedContent.replace(
                /<%\s*tp\.system\.suggester\(\["最高","高","中","低","最低"\],\["1","2","3","4","5"\],false,"请选择任务优先级"\)\s*%>/g,
                "3"
            );
            console.log("7. 替换priority suggester完成");

            // 创建主项目文件
            console.log("创建文件前的变量检查:", { folderPath, pureProjectName, folderName });
            const projectFilePath = `${folderPath}/${pureProjectName}.md`;
            console.log("准备创建项目文件:", projectFilePath);
            console.log("文件路径类型:", typeof projectFilePath, "长度:", projectFilePath?.length);

            await app.vault.create(projectFilePath, processedContent);

            new Notice(`项目 "${pureProjectName}" 创建完成！（含主项目文件）`);

            // 可选：打开新创建的项目文件
            // const newFile = app.vault.getAbstractFileByPath(projectFilePath);
            // if (newFile) {
            //     await app.workspace.openLinkText(newFile.path, "", true);
            // }
        } catch (error) {
            console.error("创建主项目文件时出错:", error);
            console.error("错误堆栈:", error.stack);
            new Notice(`主项目文件创建失败: ${error.message}`, 5000);
        }

    } catch (error) {
        console.error("创建项目时出错:", error);
        new Notice(`创建项目失败: ${error.message}`, 5000);
    }
};

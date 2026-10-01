module.exports = async (params) => {
    // 从 quickAddApi 中解构 inputPrompt，让 Notice 使用 Obsidian 的全局变量
    const { quickAddApi: { inputPrompt }, app } = params;

    // 获取或创建全局存储区域
    if (!window.pomodoroTimer) {
        window.pomodoroTimer = {
            timer: null,              // 单一的计时器句柄 (使用 setTimeout)
            isRunning: false,
            currentPhase: 'stopped', // 'work', 'break', 'stopped'
            completedPomodoros: 0,
            workTime: 25,            // 初始默认工作时间 (分钟)
            breakTime: 5,            // 初始默认休息时间 (分钟)
            endTime: 0,               // 阶段结束的精确时间戳
            startTime: 0,             // 会话开始的精确时间戳
            displayTime: '00:00'      // 用于显示的时间字符串
        };
    }

    let area = window.pomodoroTimer;

    // 更新背景颜色类名
    function updateBackgroundTheme() {
        const bodyElement = document.body;
        
        // 移除所有番茄钟相关的类名
        bodyElement.classList.remove('pomodoro-work', 'pomodoro-break', 'pomodoro-stopped');
        
        // 根据当前阶段添加对应的类名
        if (area.currentPhase === 'work') {
            bodyElement.classList.add('pomodoro-work');
        } else if (area.currentPhase === 'break') {
            bodyElement.classList.add('pomodoro-break');
        } else {
            bodyElement.classList.add('pomodoro-stopped');
        }
        
        console.log(`背景主题已更新为: ${area.currentPhase}`);
    }

    // 停止所有计时器 (更可靠的停止函数)
    function stopAllTimers() {
        if (area.timer) {
            clearTimeout(area.timer); // 使用 clearTimeout
            area.timer = null;
        }
        area.isRunning = false;
        area.currentPhase = 'stopped';
        updateStatusBar(); // 更新状态为已停止
        updateBackgroundTheme(); // 更新背景主题
        console.log('番茄钟已彻底停止');
    }

    // 更新状态显示 (在 Obsidian 标题栏和控制台)
    function updateStatusBar() {
        let statusText = '';
        if (area.currentPhase === 'stopped') {
            statusText = `🍅 ${area.completedPomodoros}个番茄 - 已停止`;
        } else if (area.currentPhase === 'work') {
            statusText = `🍅 工作中 ${area.displayTime} (完成${area.completedPomodoros}个)`;
        } else if (area.currentPhase === 'break') {
            statusText = `😴 休息中 ${area.displayTime} (完成${area.completedPomodoros}个)`;
        }

        // 实时更新控制台和标题
        console.log('番茄钟状态:', statusText);
        try {
            const originalTitle = document.title.split(' - ')[0];
            document.title = area.currentPhase !== 'stopped' ? `${originalTitle} - ${statusText}` : originalTitle;
        } catch (error) {
            // 忽略在非浏览器环境下的错误，例如在 Node.js 环境中运行
        }
    }

    // 核心计时函数 (每次执行后，如果计时器还在运行，会安排下一次执行)
    async function tickAndProceed() {
        if (!area.isRunning) {
            stopAllTimers();
            return;
        }

        const remainingSeconds = Math.round((area.endTime - Date.now()) / 1000);

        if (remainingSeconds <= 0) {
            // 时间到，切换阶段
            if (area.currentPhase === 'work') {
                await goto_break();
            } else {
                await goto_work();
            }
            // 阶段切换后，如果计时器还在运行，继续下一个阶段的计时
            if (area.isRunning) {
                startNextPhaseTimer();
            }
        } else {
            // 时间未到，更新显示
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            area.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            updateStatusBar();
            // 继续每秒的更新，直到时间到
            if (area.isRunning) {
                area.timer = setTimeout(tickAndProceed, 1000);
            }
        }
    }

    // 启动或继续下一个阶段的计时器循环
    function startNextPhaseTimer() {
        if (!area.isRunning) return;

        // 确保清除任何旧的计时器实例，防止重复
        if (area.timer) {
            clearTimeout(area.timer);
            area.timer = null;
        }

        // 立即执行一次 tickAndProceed 来更新初始状态和设置第一个 setTimeout
        area.timer = setTimeout(tickAndProceed, 0);
    }

    // 切换到休息阶段
    async function goto_break() {
        area.completedPomodoros++;
        area.currentPhase = 'break';
        area.endTime = Date.now() + area.breakTime * 60 * 1000;
        updateBackgroundTheme(); // 更新背景主题
        
        await inputPrompt(
            "休息时间到了！",
            `第${area.completedPomodoros}个番茄完成！开始休息 🍅\n\n点击确定开始休息计时`,
            "好的"
        );
    }

    // 切换到工作阶段 (下一个番茄)
    async function goto_work() {
        area.currentPhase = 'work';
        area.endTime = Date.now() + area.workTime * 60 * 1000;
        updateBackgroundTheme(); // 更新背景主题
        
        await inputPrompt(
            "工作时间到了！",
            '休息结束，重新开始工作 💪\n\n点击确定开始工作计时',
            "好的"
        );
    }

    // 启动番茄钟
    async function startPomodoro(workTime, breakTime) {
        stopAllTimers();

        area.isRunning = true;
        area.currentPhase = 'work';
        area.workTime = workTime;
        area.breakTime = breakTime;
        area.endTime = Date.now() + workTime * 60 * 1000;
        area.startTime = Date.now(); // 记录会话开始时间

        updateBackgroundTheme(); // 更新背景主题

        new Notice(`番茄钟已启动 🍅\n工作: ${workTime} 分钟\n休息: ${breakTime} 分钟\n当前完成: ${area.completedPomodoros} 个`, 4000);
        console.log(`番茄钟已启动：工作 ${workTime} 分钟，休息 ${breakTime} 分钟`);

        startNextPhaseTimer();
    }

    // 格式化日期时间为 YYYY-MM-DD HH:mm
    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // --- 主逻辑 ---

    if (area.isRunning) {
        // 番茄钟正在运行时的交互
        const action = await inputPrompt(
            "番茄钟正在运行",
            `当前阶段: ${area.currentPhase === 'work' ? '工作' : '休息'}\n剩余时间: ${area.displayTime}\n\n请输入操作代码：\n's' - 停止番茄钟\n'r' - 重置番茄钟计数\n'c' - 查看当前状态\n输入其他任意字符 - 取消操作并返回`,
            "s" // 默认选中停止，方便快捷操作
        );

        if (action === null) { // 用户点击了"取消"
            new Notice('操作已取消。', 2000);
            return; // 退出脚本，不执行任何操作
        }

        if (action.toLowerCase() === 's') {
            const stopOption = await inputPrompt(
                "停止番茄钟",
                "选择停止方式：\n's' - 仅停止\n'o' - 停止并输出结果到当前笔记",
                "s" // 默认选中仅停止
            );

            if (stopOption === null) { // 用户在停止选项弹窗点击了"取消"
                new Notice('停止操作已取消。', 2000);
                return;
            }

            if (stopOption.toLowerCase() === 'o') {
                stopAllTimers();
                const endTime = Date.now();
                const formattedStartTime = formatDateTime(area.startTime);
                const formattedEndTime = formatDateTime(endTime);

                const resultContent = `## 番茄钟总结\n` +
                                     `- 番茄钟会话开始时间: ${formattedStartTime}\n` +
                                     `- 番茄钟会话结束时间: ${formattedEndTime}\n` +
                                     `- 工作时间: ${area.workTime} 分钟\n` +
                                     `- 休息时间: ${area.breakTime} 分钟\n` +
                                     `- 完成的番茄钟: ${area.completedPomodoros} 个\n\n`;

                // 尝试获取当前活动编辑器并插入内容
                const activeLeaf = app.workspace.activeLeaf;
                if (activeLeaf && activeLeaf.view && activeLeaf.view.editor) {
                    activeLeaf.view.editor.replaceSelection(resultContent);
                    new Notice('番茄钟结果已输出到当前笔记 📝', 3000);
                } else {
                    new Notice('无法获取当前笔记编辑器，结果已复制到剪贴板。', 4000);
                    // 无法直接写入，则复制到剪贴板，提供备用方案
                    navigator.clipboard.writeText(resultContent);
                }

                new Notice(`番茄钟会话结束！\n完成的番茄钟: ${area.completedPomodoros} 个`, 6000);
                console.log('番茄钟结果:', resultContent);
                area.completedPomodoros = 0; // 输出结果后清零，方便下次重新统计
                area.startTime = 0; // 重置开始时间
                updateStatusBar();
            } else {
                stopAllTimers();
                new Notice('番茄钟已停止 ⏹️', 2000);
            }
        } else if (action.toLowerCase() === 'r') {
            area.completedPomodoros = 0;
            area.startTime = 0; // 重置开始时间
            updateStatusBar();
            new Notice('番茄钟计数器已重置', 2000);
            const resetCustomize = await inputPrompt(
                "计数器已重置",
                "是否立即自定义工作/休息时间？\n'y' - 是\n输入其他任意字符 - 否 (当前计时器将继续运行)",
                "n"
            );
            if (resetCustomize === null) { // 用户在重置后取消自定义
                new Notice('操作已取消。', 2000);
                return;
            }
            if (resetCustomize.toLowerCase() === 'y') {
                stopAllTimers(); // 停止当前计时器，以便进入下面的自定义流程
            }
        } else if (action.toLowerCase() === 'c') {
            const phaseText = area.currentPhase === 'work' ? '工作' : '休息';
            new Notice(`当前${phaseText}阶段，剩余 ${area.displayTime}\n已完成 ${area.completedPomodoros} 个番茄`, 4000);
            // 只是查看状态，不需要改变任何状态或退出脚本，让番茄钟继续运行
        } else {
            new Notice('操作已取消。', 2000);
        }
    } else {
        // 番茄钟未运行时，启动番茄钟的交互
        let shouldCustomizeInput = "n";
        if (area.completedPomodoros === 0) {
            shouldCustomizeInput = "y"; // 如果是新会话，默认建议自定义
        }

        const shouldCustomize = await inputPrompt(
            "启动番茄钟",
            `是否自定义工作/休息时间？\n'y' - 是 (推荐)\n输入其他任意字符 - 否 (使用上次设置: ${area.workTime}/${area.breakTime} 分钟)`,
            shouldCustomizeInput
        );

        if (shouldCustomize === null) { // 用户在启动弹窗点击了"取消"
            new Notice('番茄钟启动已取消。', 2000);
            return; // 退出脚本，不启动番茄钟
        }

        let workTime = area.workTime;
        let breakTime = area.breakTime;

        if (shouldCustomize.toLowerCase() === 'y') {
            const workTimeInput = await inputPrompt("设置工作时间（分钟）", `当前: ${area.workTime}分钟`, area.workTime.toString());
            if (workTimeInput === null) { // 用户在设置工作时间时点击了"取消"
                new Notice('番茄钟启动已取消。', 2000);
                return;
            }

            const breakTimeInput = await inputPrompt("设置休息时间（分钟）", `当前: ${area.breakTime}分钟`, area.breakTime.toString());
            if (breakTimeInput === null) { // 用户在设置休息时间时点击了"取消"
                new Notice('番茄钟启动已取消。', 2000);
                return;
            }

            const parsedWork = parseInt(workTimeInput);
            const parsedBreak = parseInt(breakTimeInput);

            if (!isNaN(parsedWork) && !isNaN(parsedBreak) && parsedWork > 0 && parsedBreak > 0) {
                workTime = parsedWork;
                breakTime = parsedBreak;
            } else {
                new Notice("输入无效，将使用上一次的设置。", 3000);
            }
        } else {
            // 用户选择了不自定义（输入了除'y'和null之外的字符），使用上次设置或默认值
        }

        // 确保 workTime 和 breakTime 有效，避免为 0 或 NaN
        if (isNaN(workTime) || workTime <= 0) workTime = 25;
        if (isNaN(breakTime) || breakTime <= 0) breakTime = 5;

        // 只有当用户没有取消任何一步操作时，才启动番茄钟
        await startPomodoro(workTime, breakTime);
    }
};
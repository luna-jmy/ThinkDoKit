// unified_tasks_rolling-button3.js - FIXED VERSION
module.exports = async (params) => {
	const { app } = params;

	// 获取Notice
	const Notice = app.plugins.plugins.quickadd?.api?.Notice || window.Notice || (msg => console.log(`Notice: ${msg}`));

	// 工具函数：动态生成文件路径
	function getNotePath(dateStr, type) {
		switch (type) {
			case 'daily':
				const [year, month, day] = dateStr.split("-");
				return `500 Journal/540 Daily/${year}-${month}-${day}.md`;
			case 'week':
				return `500 Journal/530 Weekly/${dateStr}.md`;
			case 'month':
				return `500 Journal/520 Monthly/${dateStr}.md`;
			case 'year':
				return `500 Journal/510 Annual/${dateStr}.md`;
			default:
				return '';
		}
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

	// 获取前一周的日期
	function getPreviousWeek(weekStr) {
		const [year, weekNumStr] = weekStr.split('-W');
		const week = parseInt(weekNumStr);

		let previousYear = parseInt(year);
		let previousWeek = week - 1;

		if (previousWeek === 0) {
			previousYear = previousYear - 1;
			const firstDayOfYear = new Date(previousYear, 0, 1);
			const dayOfWeek = firstDayOfYear.getDay();
			previousWeek = (dayOfWeek >= 4 || dayOfWeek === 0) ? 53 : 52;
		}

		return `${previousYear}-W${previousWeek}`;
	}

	// 获取前一个月的日期
	function getPreviousMonth(monthStr) {
		const [year, month] = monthStr.split('-').map(num => parseInt(num));

		let previousYear = year;
		let previousMonth = month - 1;

		if (previousMonth === 0) {
			previousMonth = 12;
			previousYear = year - 1;
		}

		return `${previousYear}-${String(previousMonth).padStart(2, '0')}`;
	}

	// 获取前一年的日期
	function getPreviousYear(yearStr) {
		return (parseInt(yearStr) - 1).toString();
	}

	// 识别文件类型和获取上一期
	function parseFilenameAndGetPrevious(filename) {
		const baseName = filename.replace(/\.md$/, '');

		const dailyMatch = baseName.match(/^(\d{4}-\d{2}-\d{2})$/);
		if (dailyMatch) {
			const currentDate = dailyMatch[1];
			const previousDate = getPreviousDay(currentDate);
			const [year, month, day] = currentDate.split('-');
			const [prevYear, prevMonth, prevDay] = previousDate.split('-');

			return {
				type: 'daily',
				current: baseName,
				previous: previousDate,
				getPreviousFunc: getPreviousDay,
				displayName: `${year}年${month}月${day}日`,
				previousDisplayName: `${prevYear}年${prevMonth}月${prevDay}日`
			};
		}

		const yearMatch = baseName.match(/^(\d{4})$/);
		if (yearMatch) {
			const year = parseInt(yearMatch[1]);
			const previousYear = getPreviousYear(year);
			return {
				type: 'year',
				current: baseName,
				previous: previousYear,
				getPreviousFunc: getPreviousYear,
				displayName: `${year}`,
				previousDisplayName: `${previousYear}`
			};
		}

		const monthMatch = baseName.match(/^(\d{4})-(\d{2})$/);
		if (monthMatch) {
			const year = parseInt(monthMatch[1]);
			const month = parseInt(monthMatch[2]);
			const previousStr = getPreviousMonth(`${year}-${month}`);

			return {
				type: 'month',
				current: baseName,
				previous: previousStr,
				getPreviousFunc: getPreviousMonth,
				displayName: `${year}-${month}`,
				previousDisplayName: previousStr
			};
		}

		const weekMatch = baseName.match(/^(\d{4})-W(\d{1,2})$/);
		if (weekMatch) {
			const year = parseInt(weekMatch[1]);
			const week = parseInt(weekMatch[2]);
			const previousStr = getPreviousWeek(`${year}-W${week}`);

			return {
				type: 'week',
				current: baseName,
				previous: previousStr,
				getPreviousFunc: getPreviousWeek,
				displayName: `${year}-W${week}`,
				previousDisplayName: previousStr
			};
		}

		return null;
	}

	// 读取文件内容
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

	// 提取未完成的任务块
	function extractUnfinishedTasks(content) {
		const lines = content.split('\n');
		const taskBlocks = [];
		const linesToRemove = new Set();

		let i = 0;
		while (i < lines.length) {
			const line = lines[i];

			const headingMatch = line.match(/^(#{3,6})\s+(.*)/);

			if (headingMatch) {
				let sectionEndIndex = i;
				let hasUnfinishedTask = false;

				let j = i + 1;
				while (j < lines.length) {
					const subsequentLine = lines[j];
					const nextHeadingMatch = subsequentLine.match(/^(#{1,6})\s+/);
					if (nextHeadingMatch) {
						break;
					}
					if (subsequentLine.match(/^- \[([ >])\] /)) {
						hasUnfinishedTask = true;
					}
					j++;
				}
				sectionEndIndex = j - 1;

				if (hasUnfinishedTask) {
					const sectionLines = [];
					// 【修复】添加标题行到要删除的行中
					linesToRemove.add(i);

					j = i;
					while (j <= sectionEndIndex) {
						const isTask = lines[j].match(/^- \[([ >])\] /);
						const isEmptyLine = lines[j].trim() === '';
						const isSublistItem = lines[j].match(/^\s{2,}- \[.\] /);

						if (isTask || isEmptyLine || isSublistItem) {
							sectionLines.push(lines[j] + '\n');
							if (isTask || isSublistItem) {
								linesToRemove.add(j);
							}
						}
						j++;
					}
					taskBlocks.push({
						content: line + '\n' + sectionLines.join('').replace(/^\n+/, '').replace(/\n+$/, '\n'),
						linesToDelete: Array.from(linesToRemove)
					});
				}
				i = sectionEndIndex + 1;
				linesToRemove.clear();
			} else if (line.match(/^- \[([ >])\] /)) {
				const taskIndentMatch = line.match(/^(\s*)-/);
				const taskIndent = taskIndentMatch ? taskIndentMatch[1] : '';

				const taskBlockLines = [line + '\n'];
				linesToRemove.add(i);

				let j = i + 1;
				while (j < lines.length) {
					const nextLine = lines[j];
					const nextHeadingMatch = nextLine.match(/^(#{1,6})\s+/);
					if (nextHeadingMatch || (!nextLine.startsWith(taskIndent + ' ') && !nextLine.match(/^\s*$/))) {
						break;
					}
					taskBlockLines.push(nextLine + '\n');
					if (nextLine.trim() !== '') {
						linesToRemove.add(j);
					}
					j++;
				}

				taskBlocks.push({
					content: taskBlockLines.join('').replace(/\n+$/, '\n'),
					linesToDelete: Array.from(linesToRemove)
				});

				i = j;
				linesToRemove.clear();
			} else {
				i++;
			}
		}
		return taskBlocks;
	}

	// 从上一期文件中删除已转移的未完成任务
	async function deleteTransferredTasks(previousFilePath, taskBlocks) {
		if (taskBlocks.length === 0) {
			return;
		}

		try {
			const targetFile = app.vault.getAbstractFileByPath(previousFilePath);
			if (!targetFile) {
				console.error(`Source file not found at path: ${previousFilePath}`);
				return;
			}

			const originalContent = await app.vault.read(targetFile);
			const lines = originalContent.split('\n');

			const allLinesToDelete = new Set();
			taskBlocks.forEach(task => {
				task.linesToDelete.forEach(lineIndex => allLinesToDelete.add(lineIndex));
			});

			if (allLinesToDelete.size === 0) {
				return;
			}

			const sortedIndices = Array.from(allLinesToDelete).sort((a, b) => b - a);

			for (const index of sortedIndices) {
				if (index >= 0 && index < lines.length) {
					lines.splice(index, 1);
				}
			}

			let updatedContent = lines.join('\n');
			updatedContent = updatedContent.replace(/\n{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '');

			await app.vault.modify(targetFile, updatedContent);

		} catch (error) {
			console.error("Error during file modification in deleteTransferredTasks:", error);
			new Notice("删除源文件任务时发生错误,请检查控制台。");
		}
	}

	// 查找最近非空的前一期的文件
	async function findLatestNonEmptyPreviousFile(periodInfo) {
		let previousDate = periodInfo.previous;
		const MAX_ITERATIONS = 365; // 最大迭代次数，防止无限循环

		for (let i = 0; i < MAX_ITERATIONS && previousDate; i++) {
			const previousFilePath = getNotePath(previousDate, periodInfo.type);
			const previousContent = await readFileContent(previousFilePath);

			if (previousContent && extractUnfinishedTasks(previousContent).length > 0) {
				let previousDisplayName;
				if (periodInfo.type === 'daily') {
					const [year, month, day] = previousDate.split('-');
					previousDisplayName = `${year}年${month}月${day}日`;
				} else {
					previousDisplayName = previousDate;
				}
				return {
					filePath: previousFilePath,
					date: previousDate,
					displayName: previousDisplayName
				};
			}

			previousDate = periodInfo.getPreviousFunc(previousDate);
		}

		return null;
	}

	// 【核心修复】查找按钮所在行 - 使用新的API
	function findButtonLine(editor) {
		const content = editor.getValue();
		const lines = content.split('\n');

		for (let i = 0; i < lines.length; i++) {
			if (lines[i].includes('button-staskRollover')) {
				return i;
			}
		}

		return -1;
	}

	async function insertTasksBelowLine(editor, line, taskBlocks) {
		if (taskBlocks.length === 0) {
			return;
		}

		const tasksContent = taskBlocks.map(task => task.content).join('');
		const textToInsert = "\n" + tasksContent;
		const pos = { line: line + 1, ch: 0 };

		editor.replaceRange(textToInsert, pos);
	}

	async function moveUnfinishedTasks() {
		try {
			// 【第一优先级保护】检查是否处于编辑模式（必须最先检查）
			const activeLeaf = app.workspace.activeLeaf;
			if (!activeLeaf || !activeLeaf.view) {
				new Notice("错误:无法获取当前视图");
				return;
			}

			// 调试：输出 viewType 到控制台
			const viewType = activeLeaf.view.getViewType();
			console.log("当前 viewType:", viewType);
			console.log("是否有 editor:", activeLeaf.view.editor !== undefined);

			// 检查视图类型
			if (activeLeaf.view.getViewType() !== 'markdown') {
				new Notice("错误:请在 Markdown 视图中运行此脚本");
				return;
			}

			// 【关键修复】检查模式：必须是 'source' (编辑/实时预览)，不能是 'preview' (阅读)
			// Obsidian API: view.getMode() returns 'source' or 'preview'
			const mode = activeLeaf.view.getMode();
			if (mode !== 'source') {
				new Notice("错误: 请切换到 编辑模式 (Live Preview 或 Source) 后再运行此脚本！\n防止数据丢失保护已触发。");
				return;
			}

			// 检查是否有 editor 属性 (双重保险)
			if (activeLeaf.view.editor === undefined) {
				new Notice("错误:无法获取编辑器实例");
				return;
			}

			const editor = activeLeaf.view.editor;

			const activeFile = app.workspace.getActiveFile();
			if (!activeFile) {
				new Notice("错误:请先打开一个笔记文件");
				return;
			}

			const periodInfo = parseFilenameAndGetPrevious(activeFile.name);
			if (!periodInfo) {
				new Notice("错误:无法识别文件名格式。支持的格式:YYYY-MM-DD(日记)、YYYY(年)、YYYY-MM(月)、YYYY-W[w](周)");
				return;
			}

			const latestNonEmptyFile = await findLatestNonEmptyPreviousFile(periodInfo);

			if (!latestNonEmptyFile) {
				const typeName = periodInfo.type === 'daily' ? '日记' : periodInfo.type === 'week' ? '周记' : periodInfo.type === 'month' ? '月记' : '年记';
				new Notice(`找不到包含未完成任务的前一期${typeName}`);
				return;
			}

			const previousContent = await readFileContent(latestNonEmptyFile.filePath);
			const unfinishedTasks = extractUnfinishedTasks(previousContent);

			if (unfinishedTasks.length > 0) {
				// 【修复】使用新的查找方法
				const buttonLine = findButtonLine(editor);

				if (buttonLine === -1) {
					new Notice("错误:在当前文件中未找到 button-staskRollover 按钮");
					return;
				}

				await insertTasksBelowLine(editor, buttonLine, unfinishedTasks);
			}

			await deleteTransferredTasks(latestNonEmptyFile.filePath, unfinishedTasks);

			const taskBlockCount = unfinishedTasks.length;
			const message = taskBlockCount > 0
				? `已将 ${taskBlockCount} 个任务块从 ${latestNonEmptyFile.displayName} 移动到 ${periodInfo.displayName}。`
				: `${latestNonEmptyFile.displayName} 没有未完成的任务需要移动。`;

			new Notice(message);

		} catch (error) {
			console.error("执行任务迁移时出错:", error);
			new Notice("执行任务迁移时发生错误,请检查控制台日志。");
		}
	}

	await moveUnfinishedTasks();
};
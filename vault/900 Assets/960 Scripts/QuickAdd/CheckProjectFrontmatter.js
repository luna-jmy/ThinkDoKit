module.exports = async (params) => {
    const { quickAddApi, app } = params;

    try {
        // 配置路径
        const TEMPLATE_PATH = "900 Assets/910 Templates/TPL-Project.md";
        const PROJECTS_FOLDER = "100 Projects";

        // 读取模板文件
        const templateFile = app.vault.getAbstractFileByPath(TEMPLATE_PATH);
        if (!templateFile) {
            new Notice(`未找到模板文件: ${TEMPLATE_PATH}`, 5000);
            return;
        }

        const templateContent = await app.vault.read(templateFile);

        // 解析模板的 frontmatter（仅获取字段名，值使用空值）
        const templateFrontmatter = parseTemplateFrontmatter(templateContent);
        if (!templateFrontmatter) {
            new Notice("模板文件中没有找到有效的 frontmatter", 5000);
            return;
        }

        // 获取 100 Projects 文件夹
        const projectsFolder = app.vault.getAbstractFileByPath(PROJECTS_FOLDER);
        if (!projectsFolder || !projectsFolder.children) {
            new Notice(`未找到项目文件夹: ${PROJECTS_FOLDER}`, 5000);
            return;
        }

        // 递归获取所有 markdown 文件
        const allFiles = [];
        collectMarkdownFiles(projectsFolder, allFiles);

        // 筛选出 type: project 的文件
        const projectFiles = [];
        for (const file of allFiles) {
            const content = await app.vault.read(file);
            const frontmatter = parseFrontmatter(content);
            if (frontmatter && frontmatter.type === "project") {
                projectFiles.push({ file, content, frontmatter });
            }
        }

        if (projectFiles.length === 0) {
            new Notice("在 100 Projects 文件夹下未找到 type: project 的笔记", 5000);
            return;
        }

        // 检查每个项目文件
        const results = {
            fixed: [],
            skipped: [],
            errors: []
        };

        for (const { file, content, frontmatter } of projectFiles) {
            try {
                const missingFields = [];

                // 检查模板中的每个字段
                for (const [key, value] of Object.entries(templateFrontmatter)) {
                    if (!(key in frontmatter)) {
                        missingFields.push({ key, value });
                    }
                }

                if (missingFields.length === 0) {
                    // 没有缺少的字段，跳过
                    results.skipped.push({
                        file: file.name,
                        path: file.path
                    });
                    continue;
                }

                // 补充缺少的字段
                const updatedFrontmatter = { ...frontmatter };
                for (const { key, value } of missingFields) {
                    updatedFrontmatter[key] = value;
                }

                // 生成新的 frontmatter YAML
                const newYaml = generateFrontmatterYaml(updatedFrontmatter);

                // 替换文件中的 frontmatter
                const yamlRegex = /^---\s*\n([\s\S]*?)\n---/;
                const newContent = content.replace(yamlRegex, `---\n${newYaml}---`);

                // 保存修改
                await app.vault.modify(file, newContent);

                results.fixed.push({
                    file: file.name,
                    path: file.path,
                    addedFields: missingFields.map(f => f.key)
                });

            } catch (error) {
                results.errors.push({
                    file: file.name,
                    path: file.path,
                    error: error.message
                });
            }
        }

        // 显示结果摘要
        displayResults(results, projectFiles.length);

    } catch (error) {
        console.error("CheckProjectFrontmatter error:", error);
        new Notice(`检查项目 frontmatter 时出错: ${error.message}`, 5000);
    }
};

/**
 * 解析模板 frontmatter（提取字段名，动态值替换为空值）
 * @param {string} content - 模板内容
 * @returns {Object|null} - 解析后的 frontmatter 对象
 */
function parseTemplateFrontmatter(content) {
    const yamlRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(yamlRegex);

    if (!match) return null;

    const yamlContent = match[1];
    const lines = yamlContent.split('\n');
    const frontmatter = {};
    let currentKey = null;
    let currentList = [];
    let isInList = false;

    // 检测动态值的正则
    const dynamicValuePattern = /<%.*%>|\{\{date:.*\}\}/;

    for (const line of lines) {
        const trimmedLine = line.trim();

        // 空行跳过
        if (trimmedLine === '') continue;

        // 检查是否是列表项
        if (trimmedLine.startsWith('- ')) {
            if (isInList && currentKey) {
                const itemValue = trimmedLine.substring(2).trim();
                // 列表项如果是动态值，也替换为空
                currentList.push(dynamicValuePattern.test(itemValue) ? '' : itemValue);
            }
            continue;
        }

        // 如果有之前的列表需要保存
        if (isInList && currentKey) {
            // 过滤掉空值，如果列表全空则设为空数组
            const filteredList = currentList.filter(item => item !== '');
            frontmatter[currentKey] = filteredList.length > 0 ? filteredList : [];
            currentList = [];
            isInList = false;
        }

        // 匹配 key: value 格式
        const fieldMatch = trimmedLine.match(/^([^:]+):\s*(.*)$/);
        if (fieldMatch) {
            currentKey = fieldMatch[1].trim();
            let value = fieldMatch[2].trim();

            // 检查是否是列表字段
            if (value === '') {
                // 可能是列表的开始
                isInList = true;
                currentList = [];
                frontmatter[currentKey] = []; // 先设为数组
            } else {
                // 普通值 - 如果是动态值则设为空
                if (dynamicValuePattern.test(value)) {
                    frontmatter[currentKey] = '';
                } else {
                    frontmatter[currentKey] = parseValue(value);
                }
                isInList = false;
            }
        }
    }

    // 处理最后一个列表
    if (isInList && currentKey) {
        const filteredList = currentList.filter(item => item !== '');
        frontmatter[currentKey] = filteredList.length > 0 ? filteredList : [];
    }

    return frontmatter;
}

/**
 * 解析 frontmatter
 * @param {string} content - 文件内容
 * @returns {Object|null} - 解析后的 frontmatter 对象
 */
function parseFrontmatter(content) {
    const yamlRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(yamlRegex);

    if (!match) return null;

    const yamlContent = match[1];
    const lines = yamlContent.split('\n');
    const frontmatter = {};
    let currentKey = null;
    let currentList = [];
    let isInList = false;

    for (const line of lines) {
        const trimmedLine = line.trim();

        // 空行跳过
        if (trimmedLine === '') continue;

        // 检查是否是列表项
        if (trimmedLine.startsWith('- ')) {
            if (isInList && currentKey) {
                currentList.push(trimmedLine.substring(2).trim());
            }
            continue;
        }

        // 如果有之前的列表需要保存
        if (isInList && currentKey) {
            frontmatter[currentKey] = currentList.length > 0 ? currentList : '';
            currentList = [];
            isInList = false;
        }

        // 匹配 key: value 格式
        const fieldMatch = trimmedLine.match(/^([^:]+):\s*(.*)$/);
        if (fieldMatch) {
            currentKey = fieldMatch[1].trim();
            let value = fieldMatch[2].trim();

            // 检查是否是列表字段
            if (value === '') {
                // 可能是列表的开始
                isInList = true;
                currentList = [];
                frontmatter[currentKey] = []; // 先设为数组
            } else {
                // 普通值
                frontmatter[currentKey] = parseValue(value);
                isInList = false;
            }
        }
    }

    // 处理最后一个列表
    if (isInList && currentKey) {
        frontmatter[currentKey] = currentList.length > 0 ? currentList : '';
    }

    return frontmatter;
}

/**
 * 解析单个值
 * @param {string} value - 值字符串
 * @returns {any} - 解析后的值
 */
function parseValue(value) {
    // 去除引号
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
    }

    // 布尔值
    if (value === 'true') return true;
    if (value === 'false') return false;

    // 数字
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);

    return value;
}

/**
 * 生成 frontmatter YAML 字符串
 * @param {Object} frontmatter - frontmatter 对象
 * @returns {string} - YAML 字符串
 */
function generateFrontmatterYaml(frontmatter) {
    const lines = [];

    for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
            // 数组格式
            if (value.length === 0) {
                lines.push(`${key}:`);
            } else {
                lines.push(`${key}:`);
                for (const item of value) {
                    lines.push(`  - ${item}`);
                }
            }
        } else if (typeof value === 'boolean') {
            lines.push(`${key}: ${value}`);
        } else if (value === '' || value === null || value === undefined) {
            lines.push(`${key}:`);
        } else {
            // 需要引号的值
            const needsQuotes = /[:#{}[\],&*?|<>=%!@`]/.test(value) ||
                               value.startsWith('"') ||
                               value.startsWith("'") ||
                               value.startsWith('-') ||
                               /^(true|false|null|yes|no|on|off)$/i.test(value);

            if (needsQuotes) {
                lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
            } else {
                lines.push(`${key}: ${value}`);
            }
        }
    }

    return lines.join('\n') + '\n';
}

/**
 * 递归收集所有 markdown 文件
 * @param {TFolder} folder - 文件夹对象
 * @param {TFile[]} files - 文件数组（用于存储结果）
 */
function collectMarkdownFiles(folder, files) {
    for (const child of folder.children) {
        if (child.extension === 'md') {
            files.push(child);
        } else if (child.children) {
            // 是子文件夹
            collectMarkdownFiles(child, files);
        }
    }
}

/**
 * 显示结果
 * @param {Object} results - 结果对象
 * @param {number} total - 总文件数
 */
function displayResults(results, total) {
    const { fixed, skipped, errors } = results;

    // 构建详细报告
    let report = `## 项目 Frontmatter 检查完成\n\n`;
    report += `- **总项目文件**: ${total}\n`;
    report += `- **已修复**: ${fixed.length}\n`;
    report += `- **无需修改**: ${skipped.length}\n`;
    report += `- **错误**: ${errors.length}\n\n`;

    if (fixed.length > 0) {
        report += `### 已修复的文件\n\n`;
        for (const item of fixed) {
            report += `- **${item.file}**\n`;
            report += `  - 路径: \`${item.path}\`\n`;
            report += `  - 补充字段: ${item.addedFields.join(', ')}\n`;
        }
        report += `\n`;
    }

    if (errors.length > 0) {
        report += `### 处理失败的文件\n\n`;
        for (const item of errors) {
            report += `- **${item.file}**: ${item.error}\n`;
        }
        report += `\n`;
    }

    // 在 Obsidian 中显示结果
    console.log(report);

    // 显示通知
    let noticeMsg = `检查完成: ${total} 个项目文件`;
    if (fixed.length > 0) noticeMsg += `, ${fixed.length} 个已修复`;
    if (skipped.length > 0) noticeMsg += `, ${skipped.length} 个无需修改`;
    if (errors.length > 0) noticeMsg += `, ${errors.length} 个错误`;

    new Notice(noticeMsg, 5000);

    // 如果有修复的文件，显示详细信息
    if (fixed.length > 0) {
        console.log("已修复的文件详情:", fixed);
    }
}
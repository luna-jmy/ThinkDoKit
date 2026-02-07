module.exports = async (params) => {
    const { quickAddApi } = params;
    const editor = this.app.workspace.activeLeaf.view.editor;
    const content = editor.getValue();

    // Helper functions
    function isListItem(line) {
        const trimmed = line.trim();
        return trimmed.startsWith('- ') || trimmed.startsWith('* ') ||
               /^\d+\.\s/.test(trimmed) || trimmed.startsWith('+ ');
    }

    function isTableRow(line) {
        return line.includes('|') && line.trim() !== '';
    }

    function isDivider(line) {
        const trimmed = line.trim();
        return trimmed.startsWith('---') || trimmed.startsWith('***') || trimmed.startsWith('___');
    }

    function isYamlHeader(line) {
        return line.trim() === '---';
    }

    function isButtonTag(line) {
        // 检测 button 标签，如 `button-supdate`
        return line.trim().startsWith('`button-') && line.trim().endsWith('`');
    }

    function isCalloutBlock(line) {
        // 检测 callout 块，如 [!note]-, [!tip]- 等
        return /^\[!\w+\]-/.test(line.trim());
    }

    function isCalloutContent(line) {
        // 检测 callout 内容行，通常以 > 开头
        return line.trim().startsWith('>');
    }

    function isProjectProgressItem(line) {
        // 检测项目进度条目，如 - [Review时间::2025-W38周]
        return line.trim().startsWith('- [') && line.trim().includes('::');
    }

    function isCodeBlockStart(line) {
        // 检测代码块开始标记，如 ```javascript 或 ``` 等
        return line.trim().startsWith('```');
    }

    function isCodeBlockEnd(line) {
        // 检测代码块结束标记
        return line.trim() === '```';
    }

    function isInlineCode(line) {
        // 检测行内代码，但这主要用于判断，不在段落处理中使用
        // 因为行内代码通常是段落的一部分，不应该单独处理
        return false;
    }

    // Check if content has YAML header
    const lines = content.split('\n');
    let hasYamlHeader = false;
    let yamlHeaderEndIndex = -1;
    
    if (lines.length > 0 && lines[0].trim() === '---') {
        // Look for end of YAML header
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                hasYamlHeader = true;
                yamlHeaderEndIndex = i;
                break;
            }
        }
    }

    // Extract YAML header and body content
    let yamlHeader = '';
    let bodyContent = '';
    
    if (hasYamlHeader) {
        yamlHeader = lines.slice(0, yamlHeaderEndIndex + 1).join('\n');
        bodyContent = lines.slice(yamlHeaderEndIndex + 1).join('\n');
    } else {
        bodyContent = content;
    }

    // Option 1: Batch insert blank lines
    const batchInsertBlankLines = (currentContent) => {
        const contentLines = currentContent.split('\n');
        const result = [];
        let inCodeBlock = false;

        for (let i = 0; i < contentLines.length; i++) {
            const currentLine = contentLines[i];
            result.push(currentLine);

            // 检查是否在代码块中
            if (isCodeBlockStart(currentLine) || isCodeBlockEnd(currentLine)) {
                inCodeBlock = !inCodeBlock;
            }

            if (i < contentLines.length - 1) {
                const nextLine = contentLines[i+1];
                if (currentLine.trim() !== '' && nextLine.trim() !== '') {
                    // 如果在代码块中，不插入空行
                    if (inCodeBlock) {
                        continue;
                    }
                    
                    const areConnectedItems = (isListItem(currentLine) && isListItem(nextLine)) ||
                                              (isTableRow(currentLine) && isTableRow(nextLine)) ||
                                              (isProjectProgressItem(currentLine) && isProjectProgressItem(nextLine)) ||
                                              (isCalloutContent(currentLine) && isCalloutContent(nextLine));
                    if (!areConnectedItems) {
                        result.push('');
                    }
                }
            }
        }
        return result.join('\n');
    };

    // Option 2: Batch delete blank lines
    const batchDeleteBlankLines = (currentContent) => {
        return currentContent.split('\n').filter(line => line.trim() !== '').join('\n');
    };

    // Option 3: Paragraph formatting (Revised and Fixed)
    const paragraphFormatting = (currentContent) => {
        // 1. Preserve original trailing whitespace and process main body
        const contentToProcess = currentContent.trimEnd();
        const trailingWhitespace = currentContent.substring(contentToProcess.length);

        // 2. Start with a "condensed" version of text (no empty lines)
        const initialLines = contentToProcess.split('\n').filter(line => line.trim() !== '');
        if (initialLines.length <= 1) {
            // If 0 or 1 line of content, just return it with correct EOF
            return contentToProcess + (trailingWhitespace || '\n');
        }

        const result = [];
        let inCodeBlock = false;
        result.push(initialLines[0]); // Add first line to result

        // 检查第一行是否是代码块开始
        if (isCodeBlockStart(initialLines[0])) {
            inCodeBlock = true;
        }

        // 3. Iterate through rest of the lines and add blank lines based on context
        for (let i = 1; i < initialLines.length; i++) {
            const prevLine = initialLines[i - 1];
            const currentLine = initialLines[i];

            // 更新代码块状态
            if (isCodeBlockStart(prevLine) || isCodeBlockEnd(prevLine)) {
                inCodeBlock = !inCodeBlock;
            }

            // 如果在代码块中，不插入空行
            if (inCodeBlock) {
                result.push(currentLine);
                continue;
            }

            const isPrevTable = isTableRow(prevLine);
            const isPrevDivider = isDivider(prevLine);
            const isPrevList = isListItem(prevLine);
            const isPrevButton = isButtonTag(prevLine);
            const isPrevCallout = isCalloutBlock(prevLine);
            const isPrevCalloutContent = isCalloutContent(prevLine);
            const isPrevProjectItem = isProjectProgressItem(prevLine);
            const isPrevCodeBlock = isCodeBlockStart(prevLine) || isCodeBlockEnd(prevLine);

            const isCurrentTable = isTableRow(currentLine);
            const isCurrentDivider = isDivider(currentLine);
            const isCurrentList = isListItem(currentLine);
            const isCurrentButton = isButtonTag(currentLine);
            const isCurrentCallout = isCalloutBlock(currentLine);
            const isCurrentCalloutContent = isCalloutContent(currentLine);
            const isCurrentProjectItem = isProjectProgressItem(currentLine);
            const isCurrentCodeBlock = isCodeBlockStart(currentLine) || isCodeBlockEnd(currentLine);

            let needsBlankLine = false;

            // 特殊情况：不需要插入空行的情况
            if (isCurrentDivider || isPrevDivider) {
                // 分隔符周围需要空行
                needsBlankLine = true;
            } else if (isCurrentTable !== isPrevTable) {
                // 进入或离开表格块时需要空行
                needsBlankLine = true;
            } else if (isCurrentList && isPrevList) {
                // 连续的列表项之间不需要空行
                needsBlankLine = false;
            } else if (isCurrentTable && isPrevTable) {
                // 连续的表格行之间不需要空行
                needsBlankLine = false;
            } else if ((isCurrentCallout && isPrevCallout) || 
                       (isCurrentCalloutContent && isPrevCalloutContent)) {
                // 连续的 callout 块或内容之间不需要空行
                needsBlankLine = false;
            } else if (isCurrentProjectItem && isPrevProjectItem) {
                // 连续的项目进度条目之间不需要空行
                needsBlankLine = false;
            } else if (isCurrentButton || isPrevButton) {
                // button 标签周围不需要空行
                needsBlankLine = false;
            } else if (isCurrentCallout && isPrevButton) {
                // button 标签后面紧接着 callout 块不需要空行
                needsBlankLine = false;
            } else if (isPrevCodeBlock || isCurrentCodeBlock) {
                // 代码块标记周围不需要空行（保持原有的空行处理）
                needsBlankLine = false;
            } else if (prevLine.endsWith('  ') || currentLine.endsWith('  ')) {
                // 以两个空格结尾的行不需要空行（手动换行）
                needsBlankLine = false;
            } else if ((isCurrentCallout && !isPrevCallout) || 
                       (!isCurrentCallout && isPrevCallout)) {
                // 进入或离开 callout 块时需要空行
                needsBlankLine = true;
            } else {
                // 默认情况：段落之间需要空行
                needsBlankLine = true;
            }

            if (needsBlankLine) {
                result.push('');
            }
            result.push(currentLine);
        }

        // 4. Reconstruct body and handle end of file
        const newBody = result.join('\n');
        // Use original trailing whitespace if it exists, otherwise add a single newline
        return newBody + (trailingWhitespace || '\n');
    };

    // --- Main logic ---
    const options = {
        "批量插入空行": batchInsertBlankLines,
        "批量删除空行": batchDeleteBlankLines,
        "段落规整": paragraphFormatting,
    };

    const choice = await quickAddApi.suggester(Object.keys(options), Object.keys(options));

    if (!choice) {
        return;
    }

    const selectedFunction = options[choice];
    const newBodyContent = selectedFunction(bodyContent);

    // Reconstruct full content with YAML header (if exists)
    let newContent;
    if (hasYamlHeader) {
        // 确保 YAML header 和正文之间空一行
        newContent = yamlHeader + '\n' + newBodyContent;
    } else {
        newContent = newBodyContent;
    }

    if (newContent !== content) {
        editor.setValue(newContent);
    }
};

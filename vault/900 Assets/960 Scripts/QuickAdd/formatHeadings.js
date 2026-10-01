/*
 * QuickAdd-Macro: Format Headings from TOC (Fixed Version)
 * 修复了原代码中的多个问题，并移除了弹框提示
 */

module.exports = async (params) => {
    const { app, quickAddApi } = params;

    try {
        const baseHeadingLevel = 2;
        const tocIdentifier = "### **目录**";
        
        // 1. Prompt for the TOC filename
        const tocFilename = await quickAddApi.inputPrompt(
            "Enter TOC note filename:",
            "Filename (e.g., TOC.md)"
        );

        if (!tocFilename) {
            new Notice("Operation cancelled.");
            return;
        }

        new Notice("Debug: Script starting...", 1500);

            // 2. Find the TOC file (improved search logic)
            let tocFile = app.vault.getFiles().find(f => f.name === tocFilename);
            
            if (!tocFile && !tocFilename.endsWith('.md')) {
                tocFile = app.vault.getFiles().find(f => f.name === `${tocFilename}.md`);
            }

            if (!tocFile) {
                new Notice(`Error: File "${tocFilename}" not found.`, 5000);
                console.log("Available files:", app.vault.getFiles().map(f => f.name));
                return;
            }

            const activeFile = app.workspace.getActiveFile();
            if (!activeFile) {
                new Notice("Error: No active file.", 5000);
                return;
            }

            // 3. Read and extract TOC content
            const tocFileContent = await app.vault.read(tocFile);
            console.log("TOC file content:", tocFileContent);
            
            const tocLines = extractTocFromContent(tocFileContent, tocIdentifier);

            if (!tocLines || tocLines.length === 0) {
                new Notice(`Error: No content found under "${tocIdentifier}" in TOC file.`, 5000);
                console.log("Available lines in TOC:", tocFileContent.split('\n'));
                return;
            }
            
            console.log("Extracted TOC lines:", tocLines);
            
            let activeFileContent = await app.vault.read(activeFile);
            let originalContent = activeFileContent;
            let changesMade = 0;

            // 4. Process lines and replace content
            for (const tocLine of tocLines) {
                const trimmedLine = tocLine.trim();
                if (trimmedLine === '') continue;

                // 计算缩进级别 (支持空格和制表符)
                const indentMatch = tocLine.match(/^(\s*)/);
                const indentLevel = indentMatch ? Math.floor(indentMatch[1].length / 2) : 0; // 假设2个空格 = 1级缩进
                
                const headingLevel = Math.min(baseHeadingLevel + indentLevel, 6); // 限制最大标题级别为6
                const headingHashes = '#'.repeat(headingLevel);

                // 移除列表标记
                const searchTerm = trimmedLine.replace(/^([-*+]\s+|\d+\.\s+)/, '').trim();
                if (searchTerm === '') continue;

                console.log(`Processing: "${searchTerm}" -> Level ${headingLevel}`);

                // 创建更精确的正则表达式
                const escapedSearchTerm = escapeRegExp(searchTerm);
                const regex = new RegExp(`^${escapedSearchTerm}$`, "gm");
                const replacement = `${headingHashes} ${searchTerm}`;
                
                const beforeReplace = activeFileContent;
                activeFileContent = activeFileContent.replace(regex, replacement);
                
                if (beforeReplace !== activeFileContent) {
                    changesMade++;
                    console.log(`✓ Replaced: "${searchTerm}" with "${replacement}"`);
                } else {
                    console.log(`✗ No match found for: "${searchTerm}"`);
                }
            }

            // 5. Remove duplicate headings after formatting
            const { content: contentAfterDedup, removedCount } = removeDuplicateHeadings(activeFileContent);
            activeFileContent = contentAfterDedup;

            // 6. Write back to file only if changes were made
            if (activeFileContent !== originalContent) {
                await app.vault.modify(activeFile, activeFileContent);
                const totalChanges = changesMade + removedCount;
                new Notice(`Headings formatted successfully! ${changesMade} headings formatted, ${removedCount} duplicates removed.`, 3000);
            } else {
                new Notice("No matching content found to format.", 3000);
            }

    } catch (error) {
        new Notice("A critical error occurred! Check dev console.", 5000);
        console.error("QuickAdd Script Error:", error);
        console.error("Error stack:", error.stack);
    }
};

function extractTocFromContent(content, tocIdentifier) {
    const lines = content.split('\n');
    const tocStartIndex = lines.findIndex(line => line.trim() === tocIdentifier);

    if (tocStartIndex === -1) {
        console.log(`TOC identifier "${tocIdentifier}" not found`);
        return null;
    }

    const tocLines = [];
    for (let i = tocStartIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        // 停止条件：遇到同级或更高级的标题
        if (trimmedLine.startsWith('#')) {
            const headingLevel = trimmedLine.match(/^#+/)[0].length;
            if (headingLevel <= 3) { // 如果是 ### 或更高级别的标题，停止
                break;
            }
        }
        
        // 如果是空行，跳过但继续
        if (trimmedLine === '') {
            continue;
        }
        
        tocLines.push(line);
    }
    
    console.log(`Extracted ${tocLines.length} lines from TOC`);
    return tocLines;
}

function removeDuplicateHeadings(content) {
    const lines = content.split('\n');
    const seenHeadings = new Set();
    const resultLines = [];
    let removedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        // 检查是否是标题行
        if (trimmedLine.match(/^#+\s+/)) {
            // 标准化标题文本（忽略标题级别的差异，只比较文本内容）
            const headingText = trimmedLine.replace(/^#+\s+/, '').trim();
            
            // 如果这个标题文本已经出现过，跳过这一行
            if (seenHeadings.has(headingText)) {
                console.log(`✗ Removed duplicate heading: "${trimmedLine}"`);
                removedCount++;
                continue;
            }
            
            // 记录这个标题文本
            seenHeadings.add(headingText);
            console.log(`✓ Keeping heading: "${trimmedLine}"`);
        }
        
        resultLines.push(line);
    }

    return {
        content: resultLines.join('\n'),
        removedCount: removedCount
    };
}

function escapeRegExp(string) {
    // 修复正则表达式转义
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
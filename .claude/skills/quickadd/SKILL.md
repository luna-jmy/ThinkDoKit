---
name: quickadd
description: Reference guide for QuickAdd API usage and common Obsidian file operations. Use when writing or modifying QuickAdd scripts for Obsidian, or when working with app.vault operations, file creation/modification, or user input prompts.
---

# QuickAdd API Skill

This skill enables Claude Code to write and modify QuickAdd scripts for Obsidian, including file operations, user input handling, and common automation patterns.

## Overview

QuickAdd is an Obsidian plugin for automating note creation and file operations. QuickAdd scripts have access to `quickAddApi`, `app` (Obsidian app instance), and `app.vault` (file system operations).

## Core QuickAdd API

### `quickAddApi.inputPrompt`

Get text input from the user with a modal dialog.

```javascript
const value = await quickAddApi.inputPrompt(
    "Header Text",           // Modal header/title
    "Placeholder/Default",   // Placeholder text (optional)
    "Helper Text"            // Value (optional default value) or description
);
```

**Example:**

```javascript
// Simple input
const projectName = await quickAddApi.inputPrompt(
    "项目名称",
    "请输入项目名称"
);

// Input with default value
const projectDate = await quickAddApi.inputPrompt(
    "项目日期",
    "YYYY-MM-DD",
    "2024-01-15"
);
```

**When to use:** When you need to collect text input from the user (names, descriptions, dates, etc.).

### `quickAddApi.suggester`

Present a list of options to the user for selection.

```javascript
const selected = await quickAddApi.suggester(
    ["Display Option 1", "Display Option 2"], // Display items (what user sees)
    ["value1", "value2"],                     // Actual values (returned)
    false,                                    // Allow multiple selections (false = single)
    "Prompt Text"                             // Placeholder/prompt text
);
```

**Example:**

```javascript
// Simple selection
const status = await quickAddApi.suggester(
    ["进行中", "已完成", "已取消"],
    ["in-progress", "completed", "cancelled"],
    false,
    "选择项目状态"
);

// With default selection
const priority = await quickAddApi.suggester(
    ["高优先级", "中优先级", "低优先级"],
    ["high", "medium", "low"],
    false,
    "选择优先级"
);
```

**When to use:** When you need the user to select from a predefined set of options.

## Obsidian App API (`app`)

### File System Operations (`app.vault`)

#### Read File Content

```javascript
const activeFile = app.workspace.getActiveFile();
const content = await app.vault.read(activeFile);

// Or read by path
const fileObj = app.vault.getAbstractFileByPath(path);
const content = await app.vault.read(fileObj);
```

**When to use:** When you need to read the content of a file for processing.

#### Modify File Content

```javascript
await app.vault.modify(fileObject, newContentString);
```

**Example:**

```javascript
const file = app.workspace.getActiveFile();
const content = await app.vault.read(file);

// Process content
const newContent = content + "\n\nNew content added";

// Write back
await app.vault.modify(file, newContent);
```

**When to use:** When you need to update an existing file's content.

#### Create New File

```javascript
await app.vault.create(filePath, contentString);
```

**Example:**

```javascript
const filePath = "100 Projects/My Project.md";
const content = "# My Project\n\nCreated on " + new Date().toISOString();
await app.vault.create(filePath, content);
```

**When to use:** When creating new notes or files from templates or user input.

#### Create Folder

```javascript
await app.vault.createFolder(folderPath);
```

**Example:**

```javascript
const projectName = await quickAddApi.inputPrompt("项目名称");
const folderPath = `100 Projects/${projectName}`;
await app.vault.createFolder(folderPath);
```

**When to use:** When organizing files into folders or creating project structures.

#### Check Existence

```javascript
const exists = await app.vault.adapter.exists(path);
```

**Example:**

```javascript
const filePath = "100 Projects/Existing Project.md";
const exists = await app.vault.adapter.exists(filePath);

if (exists) {
    new Notice("File already exists!");
} else {
    await app.vault.create(filePath, content);
}
```

**When to use:** When you need to check if a file or folder exists before creating or modifying it.

#### Get Abstract File

Get a `TFile` or `TFolder` object from a path string.

```javascript
const fileObj = app.vault.getAbstractFileByPath(path);
```

**Example:**

```javascript
const path = "300 Resources/330 Books/Book Info.md";
const fileObj = app.vault.getAbstractFileByPath(path);

if (fileObj && fileObj instanceof TFile) {
    const content = await app.vault.read(fileObj);
    // Process content
}
```

**When to use:** When you have a path string and need the file object for operations.

### User Feedback (`Notice`)

Display a notification to the user.

```javascript
new Notice("Operation successful");

// With duration (in milliseconds)
new Notice("This will disappear in 5 seconds", 5000);
```

**Example:**

```javascript
// Success message
new Notice("项目创建成功！");

// Error message
new Notice("创建失败: " + error.message);

// Info message
new Notice("正在处理...", 3000);
```

**When to use:** To provide feedback to the user about the operation's success or failure.

## Common Patterns

### 1. Parsing Headers in Current File

Extract headers to determine sections or structure.

```javascript
const content = await app.vault.read(activeFile);
const lines = content.split('\n');
const headerRegex = /^(#{1,6})\s+(.*)$/;

const headers = [];
lines.forEach((line, index) => {
    const match = line.match(headerRegex);
    if (match) {
        // match[1] is hashes (#), match[2] is title
        headers.push({
            level: match[1].length,
            title: match[2],
            index: index
        });
    }
});
```

**When to use:** When you need to navigate or analyze the document structure.

### 2. Inline Field Regex

Parse Dataview inline fields `[key:: value]` from content.

```javascript
const inlineFieldRegex = /\[([^:\]]+)::([^\]]*)\]/g;
let match;
const fields = {};

while ((match = inlineFieldRegex.exec(line)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    fields[key] = value;
}
```

**Example:**

```javascript
// Parse inline fields from content
const fields = {};
const regex = /\[([^:\]]+)::([^\]]*)\]/g;
let match;

while ((match = regex.exec(content)) !== null) {
    fields[match[1].trim()] = match[2].trim();
}

// Access fields
console.log(fields.status);    // e.g., "in-progress"
console.log(fields.priority);   // e.g., "high"
```

**When to use:** When reading or updating Dataview inline fields programmatically.

### 3. Template Variable Replacement

Replace placeholders in a template string manually before creating a file.

```javascript
let processed = templateContent;
processed = processed.replace(/\{\{date:YYYYMM\}\}/g, "202401");
processed = processed.replace(/\{\{project\}\}/g, "My Project");
```

**Example:**

```javascript
const projectName = await quickAddApi.inputPrompt("项目名称");
const projectDate = await quickAddApi.inputPrompt("项目日期");

let template = `---
title: {{project}}
date: {{date}}
---

# {{project}}

## Tasks
- [ ] First task
`;

template = template.replace(/\{\{project\}\}/g, projectName);
template = template.replace(/\{\{date\}\}/g, projectDate);

await app.vault.create(`100 Projects/${projectName}.md`, template);
```

**When to use:** When you can't use Templater plugin and need manual variable replacement.

### 4. Templater System Call Replacement

Handle raw Templater tags if reading a raw template file.

```javascript
processed = processed.replace(
    /<%\s*tp\.date\.now\("YYYY-MM-DD"\)\s*%>/g,
    "2024-01-01"
);
```

**Example:**

```javascript
// Replace Templater date tags
const now = new Date();
const dateString = now.toISOString().split('T')[0];

processed = processed.replace(
    /<%\s*tp\.date\.now\("YYYY-MM-DD"\)\s*%>/g,
    dateString
);

// Replace other Templater tags
processed = processed.replace(
    /<%\s*tp\.file\.title\s*%>/g,
    fileName
);
```

**When to use:** When reading templates that contain Templater syntax but you're not running them through Templater.

### 5. Creating Project Structure

Create a folder and associated files in one operation.

```javascript
async function createProject() {
    // Get user input
    const projectName = await quickAddApi.inputPrompt("项目名称");
    const projectDate = await quickAddApi.inputPrompt("项目日期", "YYYY-MM-DD");

    // Create folder
    const folderPath = `100 Projects/${projectDate} ${projectName}`;
    await app.vault.createFolder(folderPath);

    // Create main project file
    const projectContent = `---
title: ${projectName}
date: ${projectDate}
status: in-progress
---

# ${projectName}

## 概述

## 任务
- [ ] 

## 参考资料
`;
    await app.vault.create(`${folderPath}/${projectName}.md`, projectContent);

    new Notice(`项目 "${projectName}" 创建成功！`);
}
```

**When to use:** When setting up new projects with consistent structure.

### 6. Inline Field Update

Update specific inline fields in a file while preserving other content.

```javascript
async function updateInlineField(filePath, fieldName, newValue) {
    const file = app.vault.getAbstractFileByPath(filePath);
    let content = await app.vault.read(file);

    const regex = new RegExp(`\\[${fieldName}::[^\\]]*\\]`, 'g');
    const fieldPattern = `[${fieldName}:: ${newValue}]`;

    if (regex.test(content)) {
        // Update existing field
        content = content.replace(regex, fieldPattern);
    } else {
        // Add new field at the start
        content = `${fieldPattern}\n\n${content}`;
    }

    await app.vault.modify(file, content);
}
```

**When to use:** When updating specific metadata fields without rewriting the entire file.

## Style Guidelines for ThinkDoKit

### Naming Conventions

- **Variables**: `camelCase` (e.g., `projectName`, `filePath`)
- **Functions**: `camelCase` (e.g., `createProject`, `updateInlineField`)
- **Constants**: `UPPER_SNAKE_CASE` (rarely used)

### Code Formatting

- **Indentation**: 2 spaces (JavaScript standard)
- **Quotes**: Single quotes for strings, template literals for multiline
- **Semicolons**: Required (always use)
- **Braces**: K&R style (opening brace on same line)

### Async/Await Pattern

```javascript
async function processFile() {
    try {
        // Get file
        const file = app.workspace.getActiveFile();

        // Read content
        const content = await app.vault.read(file);

        // Process
        const processed = processContent(content);

        // Write back
        await app.vault.modify(file, processed);

        new Notice("处理完成！");

    } catch (error) {
        new Notice("错误: " + error.message);
    }
}
```

### Error Handling

Always wrap file operations in try-catch and provide user feedback:

```javascript
try {
    await app.vault.create(filePath, content);
    new Notice("文件创建成功！");
} catch (error) {
    new Notice("创建失败: " + error.message);
}
```

### Comments

- **Code logic**: English comments explaining technical details
- **User-facing text**: Chinese text for messages displayed to users

```javascript
// User-facing text in Chinese
const message = "已复制到剪贴板";
new Notice(message);

// Technical comment in English
// Check if file exists before creating
const exists = await app.vault.adapter.exists(path);
```

## Common Code Patterns from ThinkDoKit

### Create Project with Inline Fields

```javascript
const projectName = await quickAddApi.inputPrompt("项目名称");
const projectDate = await quickAddApi.inputPrompt("项目日期", "YYYY-MM-DD");

const projectPath = `100 Projects/${projectDate} ${projectName}`;
await app.vault.createFolder(projectPath);

const content = `---
title: ${projectName}
[日期:: ${projectDate}]
[状态:: in-progress]
[优先级:: medium]
---

# ${projectName}

## 概述

## 任务
- [ ] [状态:: ] 任务1
- [ ] [状态:: ] 任务2
`;

await app.vault.create(`${projectPath}/${projectName}.md`, content);
```

### Parse and Update Inline Fields

```javascript
// Parse inline fields from content
function parseInlineFields(content) {
    const regex = /\[([^:\]]+)::([^\]]*)\]/g;
    const fields = {};
    let match;

    while ((match = regex.exec(content)) !== null) {
        fields[match[1].trim()] = match[2].trim();
    }

    return fields;
}

// Update specific inline field
function updateInlineField(content, fieldName, newValue) {
    const regex = new RegExp(`\\[${fieldName}::[^\\]]*\\]`, 'g');
    const newField = `[${fieldName}:: ${newValue}]`;

    if (regex.test(content)) {
        return content.replace(regex, newField);
    } else {
        return `${newField}\n\n${content}`;
    }
}
```

### Date Input with Validation

```javascript
async function getDateInput(promptText, format = "YYYY-MM-DD") {
    const dateStr = await quickAddApi.inputPrompt(promptText, format);

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) {
        throw new Error("日期格式错误，请使用 YYYY-MM-DD 格式");
    }

    return dateStr;
}

// Usage
try {
    const projectDate = await getDateInput("项目日期");
    // Proceed with project date
} catch (error) {
    new Notice(error.message);
}
```

### Folder Selection with Suggester

```javascript
const folders = await quickAddApi.suggester(
    ["100 Projects", "200 Areas", "300 Resources", "400 Archive"],
    ["100 Projects", "200 Areas", "300 Resources", "400 Archive"],
    false,
    "选择目标文件夹"
);

if (folders) {
    const fileName = await quickAddApi.inputPrompt("文件名");
    const filePath = `${folders}/${fileName}.md`;
    await app.vault.create(filePath, "# " + fileName);
    new Notice("文件创建成功！");
}
```

## Best Practices

### 1. Always Check File Existence

Before creating or modifying files, check if they exist:

```javascript
const filePath = "100 Projects/Existing.md";
const exists = await app.vault.adapter.exists(filePath);

if (exists) {
    // Ask user what to do
    const action = await quickAddApi.suggester(
        ["覆盖", "取消", "重命名"],
        ["overwrite", "cancel", "rename"],
        false,
        "文件已存在，请选择操作"
    );

    if (action === "cancel") return;
    // Handle overwrite or rename
}
```

### 2. Use Path Joining for Cross-Platform Compatibility

```javascript
// Use proper path joining
const path = `100 Projects/${projectName}/${fileName}.md`;

// Better: Use Obsidian's internal path handling
const path = app.vault.adapter.path.join(
    "100 Projects",
    projectName,
    `${fileName}.md`
);
```

### 3. Provide Clear User Feedback

Always inform the user about what's happening:

```javascript
new Notice("正在创建项目...", 3000);

// Do work...

new Notice("项目创建成功！");
```

### 4. Handle Errors Gracefully

Never let exceptions crash without user notification:

```javascript
try {
    // File operations
} catch (error) {
    new Notice("操作失败: " + error.message);
    console.error("QuickAdd error:", error);
}
```

## References

- [QuickAdd Documentation](https://github.com/chhoumann/quickadd)
- [Obsidian API Documentation](https://docs.obsidian.md/Reference/TypeScript+API/app)
- ThinkDoKit scripts in `vault/900 Assets/960 Scripts/`

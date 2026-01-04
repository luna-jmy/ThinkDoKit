---
description: Reference guide for QuickAdd API usage and common Obsidian file operations found in the codebase.
---

# QuickAdd API Skill

This document outlines the common usage patterns for the QuickAdd API and Obsidian `app` object found in the user's scripts (e.g., `InlineFieldUpdate.js`, `createProject.js`). Use this as a reference when creating or modifying QuickAdd scripts.

## Core QuickAdd API

### `quickAddApi.inputPrompt`
Used to get text input from the user.

```javascript
const value = await quickAddApi.inputPrompt(
    "Header Text",           // Header
    "Placeholder/Default",   // Placeholder (optional)
    "Helper Text"            // Value (optional default value) or description
);
```

### `quickAddApi.suggester`
Used to present a list of options to the user.

```javascript
const selected = await quickAddApi.suggester(
    ["Display Option 1", "Display Option 2"], // Display items
    ["value1", "value2"],                     // Actual values
    false,                                    // Allow multiple selections (false = single)
    "Prompt Text"                             // Placeholder/Prompt
);
```

## Obsidian App API (`app`)

### File System Operations (`app.vault`)

#### Read File Content
```javascript
const activeFile = app.workspace.getActiveFile();
const content = await app.vault.read(activeFile);
```

#### Modify File Content
```javascript
await app.vault.modify(fileObject, newContentString);
```

#### Create New File
```javascript
await app.vault.create(filePath, contentString);
```

#### Create Folder
```javascript
await app.vault.createFolder(folderPath);
```

#### Check Existence
```javascript
const exists = await app.vault.adapter.exists(path);
```

#### Get Abstract File
Used to get a `TFile` or `TFolder` object from a path string.
```javascript
const fileObj = app.vault.getAbstractFileByPath(path);
```

### User Feedback (`Notice`)
Standard Obsidian Notice for UI feedback.
```javascript
new Notice("Operation successful");
```

## Common Patterns

### 1. Parsing Headers in Current File
Extract headers to determine sections.
```javascript
const lines = content.split('\n');
const headerRegex = /^(#{1,6})\s+(.*)$/;
lines.forEach((line, index) => {
    const match = line.match(headerRegex);
    if (match) {
        // match[1] is hashes (#), match[2] is title
    }
});
```

### 2. Inline Field Regex
Parsing Dataview inline fields `[key:: value]`.
```javascript
const inlineFieldRegex = /\[([^:\]]+)::([^\]]*)\]/g;
// Usage with loop to find all matches in a line
let match;
while ((match = inlineFieldRegex.exec(line)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
}
```

### 3. Template Variable Replacement
Replacing placeholders in a template string manually before creation.
```javascript
let processed = templateContent;
processed = processed.replace(/\{\{date:YYYYMM\}\}/g, "202401");
```

### 4. Templater System Call Replacement
Handling raw Templater tags if reading a raw template file.
```javascript
processed = processed.replace(
    /<%\s*tp\.date\.now\("YYYY-MM-DD"\)\s*%>/g, 
    "2024-01-01"
);
```
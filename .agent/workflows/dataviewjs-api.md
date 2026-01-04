---
description: Reference guide for DataviewJS API usage and visualization patterns found in the codebase.
---

# DataviewJS API Skill

This document outlines the common usage patterns for the DataviewJS API (`dv`) found in the user's scripts (e.g., `projectOverview.js`, `task-heatmap.js`).

## Core Dataview API (`dv`)

### `dv.pages`
Query pages with a source string (similar to DQL FROM).
```javascript
const pages = dv.pages('"Folder/Path" or #tag');
```

### `dv.current()`
Get the page object for the file where the script is running.
```javascript
const curr = dv.current();
const customMeta = curr.my_metadata_field;
```

### `dv.el` & `dv.container`
Render HTML elements.

#### Simple Element
```javascript
dv.el("div", "Content", { cls: "my-class", attr: { style: "color: red" } });
```

#### Container
Create complex DOM structures.
```javascript
const container = dv.container.createEl("div", { cls: "container-class" });
const child = container.createEl("span", { text: "Hello" });
```

### `dv.date`
Parse or format dates (returns Luxon DateTime).
```javascript
const dateObj = dv.date("2024-01-01");
const formatted = dateObj.toFormat("yyyy-MM-dd");
```

## Data Processing Patterns

### 1. Grouping Pages
Manually grouping pages (e.g., by folder structure) instead of `dv.pages().groupBy()`.
```javascript
const map = new Map();
pages.forEach(p => {
    const key = p.file.folder;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
});
```

### 2. Custom Filtering
Filtering logic often sits outside the initial `dv.pages` query for more control.
```javascript
const filtered = pages.filter(p => {
    if (!p.file.name) return false;
    // Custom logic
    return true;
});
```

### 3. Custom Sorting
Sorting array of page objects.
```javascript
pages.sort((a, b) => {
    // Sort by date descending
    const dateA = new Date(a.dateField);
    const dateB = new Date(b.dateField);
    return dateB - dateA;
});
```

## Visualization Patterns

### 1. SVG Generation
Generating SVG strings for complex visualizations (like Heatmaps) and rendering them via `dv.el`.
```javascript
const svgContent = `<svg ...>...</svg>`;
dv.el('div', svgContent);
```
*Note: Ensure `responsiveWidth` logic is handled if needed.*

### 2. Project Card Layout
Creating a grid of cards using CSS classes (`project-card`, `project-meta`) injected into a container.
```javascript
const card = container.createEl("div", { cls: "project-card" });
// Add title, badges, progress bar manually
```

### 3. Progress Bar
Manual HTML implementation of progress bars.
```javascript
const bar = div.createEl("div", { 
    attr: { style: "width: 100%; background: gray;" } 
});
bar.createEl("div", { 
    attr: { style: `width: ${progress}%; background: accent-color;` } 
});
```
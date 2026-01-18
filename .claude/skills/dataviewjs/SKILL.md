---
name: dataviewjs
description: Reference guide for DataviewJS API usage and visualization patterns. Use when writing or modifying DataviewJS scripts for Obsidian, or when working with dv object, dv.el, dv.pages, or Dataview queries.
---

# DataviewJS API Skill

This skill enables Claude Code to write and modify DataviewJS scripts for Obsidian, including common API usage patterns, data processing, and visualizations.

## Overview

DataviewJS is the JavaScript API for Obsidian's Dataview plugin. It provides access to `dv` (Dataview API), `app` (Obsidian app instance), and `input` (configuration object) for creating dynamic visualizations and queries.

## Core Dataview API (`dv`)

### `dv.pages`

Query pages with a source string (similar to DQL FROM clause).

```javascript
const pages = dv.pages('"Folder/Path" or #tag');
```

**Examples:**
```javascript
// Query specific folder
const pages = dv.pages('"300 Resources/330 Books"');

// Query by tag
const pages = dv.pages('#project');

// Query all pages
const allPages = dv.pages();
```

### `dv.current()`

Get the page object for the file where the script is running.

```javascript
const curr = dv.current();
const customMeta = curr.my_metadata_field;
```

### `dv.el` & `dv.container`

Render HTML elements to create custom UI.

#### Simple Element

```javascript
dv.el("div", "Content", { cls: "my-class", attr: { style: "color: red" } });
```

#### Container with Nested Elements

Create complex DOM structures by chaining `createEl` calls.

```javascript
const container = dv.container.createEl("div", { cls: "container-class" });
const child = container.createEl("span", { text: "Hello" });
```

### `dv.date`

Parse or format dates (returns Luxon DateTime object).

```javascript
const dateObj = dv.date("2024-01-01");
const formatted = dateObj.toFormat("yyyy-MM-dd");
```

#### Date Parsing Rules

- **Input format**: Accepts string format `YYYY-MM-DD` (e.g., "2024-01-15")
- **Cannot accept**: JavaScript `Date` objects or Luxon `DateTime` objects directly
- **Timezone awareness**: Uses local timezone for string parsing

#### Common Pitfall - Date Object Conversion

```javascript
// ❌ WRONG - Passing Date object directly
const date = new Date();
const parsed = dv.date(date); // Error: No implementation of 'date' found for arguments: object

// ✅ CORRECT - Convert to string first
function toLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const date = new Date();
const parsed = dv.date(toLocalDateString(date));
```

#### Date Comparison and Manipulation

```javascript
// Get timestamps for comparison
const timestamp = dateObj.toMillis();  // Returns milliseconds since epoch

// Format dates
const iso = dateObj.toISO();           // "2024-01-15T00:00:00.000+08:00"
const formatted = dateObj.toFormat("yyyy-MM-dd");  // "2024-01-01"

// Date arithmetic (Luxon DateTime)
const nextWeek = dateObj.plus({ weeks: 1 });
const yesterday = dateObj.minus({ days: 1 });
```

#### Date Field Types in Dataview

Dataview metadata fields can be different types:

- **DateTime objects**: From frontmatter dates (e.g., `start_date: 2024-01-15`)
- **Link objects**: From `[[2024-01-15]]` wiki-links
- **Strings**: From string values

**Always convert with `dv.date()` before comparison:**

```javascript
const projectStart = dv.date(p.start_date);  // Handles all types
const filterStart = dv.date("2024-01-01");

// Compare using timestamps
if (projectStart.toMillis() >= filterStart.toMillis()) {
    // Project starts after filter date
}
```

## Data Processing Patterns

### 1. Manual Grouping

Manually grouping pages (e.g., by folder structure) instead of using `dv.pages().groupBy()`.

```javascript
const map = new Map();
pages.forEach(p => {
    const key = p.file.folder;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
});
```

**When to use:** When you need more control than `groupBy()` provides, or when grouping by complex criteria.

### 2. Custom Filtering

Filtering logic often sits outside of initial `dv.pages` query for more control.

```javascript
const filtered = pages.filter(p => {
    if (!p.file.name) return false;
    // Custom logic
    return p.file.path.includes("Projects/");
});
```

**When to use:** When filtering logic is complex or requires access to computed properties.

### 3. Custom Sorting

Sorting an array of page objects by custom criteria.

```javascript
pages.sort((a, b) => {
    // Sort by date descending
    const dateA = new Date(a.dateField);
    const dateB = new Date(b.dateField);
    return dateB - dateA;
});
```

**When to use:** When you need sorting by multiple fields or custom comparison logic.

## Visualization Patterns

### 1. SVG Generation

Generating SVG strings for complex visualizations (like heatmaps) and rendering them via `dv.el`.

```javascript
const svgContent = `<svg width="100%" height="100" viewBox="0 0 365 100">
    <!-- SVG content here -->
</svg>`;
dv.el('div', svgContent);
```

**Note:** Ensure `responsiveWidth` logic is handled if needed.

**When to use:** When creating custom charts, heatmaps, or complex data visualizations.

### 2. Project Card Layout

Creating a grid of cards using CSS classes (`project-card`, `project-meta`) injected into a container.

```javascript
const card = container.createEl("div", { cls: "project-card" });

// Add title
const title = card.createEl("h3", { text: p.title });

// Add badges
const badges = card.createEl("div", { cls: "project-meta" });
tags.forEach(tag => {
    badges.createEl("span", { text: tag, cls: "badge" });
});

// Add progress bar manually
const progress = calculateProgress(p);
const progressBar = card.createEl("div", { cls: "progress-bar" });
progressBar.style.width = `${progress}%`;
```

**When to use:** When displaying project summaries or similar card-based layouts.

### 3. Progress Bar

Manual HTML implementation of progress bars.

```javascript
const bar = div.createEl("div", {
    attr: { style: "width: 100%; background: var(--background-modifier-border);" }
});
bar.createEl("div", {
    attr: { style: `width: ${progress}%; background: var(--interactive-accent);` }
});
```

**When to use:** When visualizing completion percentages or progress metrics.

## Common Code Patterns from ThinkDoKit

### Tab Interface Pattern

```javascript
const tabs = input.tabs;
const tabBar = dv.el("div", "", { cls: "tab-button-bar" });
const contentContainer = dv.el("div", "", { cls: "tab-content-container" });

tabs.forEach((tab, index) => {
    const button = dv.el("button", tab.name, {
        container: tabBar,
        cls: "tab-button"
    });

    const tabContent = dv.el("div", "", {
        container: contentContainer,
        cls: "tab-content"
    });
    tabContent.style.display = "none"; // Hide by default

    button.onclick = async () => {
        // Hide all content
        contentContainer.querySelectorAll(".tab-content").forEach(c => {
            c.style.display = "none";
        });

        // Show current content
        tabContent.style.display = "block";

        // Render tasks if not already rendered
        if (!tabContent.getAttribute("data-rendered")) {
            await renderTasks(tab, tabContent);
            tabContent.setAttribute("data-rendered", "true");
        }
    };

    // Activate first tab
    if (index === 0) {
        setTimeout(() => button.click(), 100);
    }
});
```

### Task Query Pattern

```javascript
// Get all tasks, excluding specific folders
const allTasks = dv.pages()
    .where(p => !p.file.path.includes("900 Assets"))
    .file.tasks;

// Filter tasks
const tasks = allTasks.filter(t => {
    const path = t.path;

    // Check path
    let inFolder = true;
    if (tab.folder && tab.folder !== "") {
        inFolder = path.includes(`${tab.folder}/`) ||
                  path.startsWith(tab.folder);
    }

    // Exclude marked tasks
    const notExcluded = !t.text.includes("#exclude");

    // Status filter
    let statusMatch = !t.completed;

    return inFolder && notExcluded && statusMatch;
});
```

### Random Quote Pattern

```javascript
async function displayRandomQuote(container, config) {
    try {
        // Clear container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Get pages with specific folder and tag
        const pages = dv.pages(`"${config.folder}"`)
            .where(p => p.file.tags && p.file.tags.includes(config.tag));

        if (pages.length === 0) {
            dv.paragraph(config.noQuoteMessage, container);
            return;
        }

        const randomPage = pages[Math.floor(Math.random() * pages.length)];

        // Read file content
        const file = app.vault.getAbstractFileByPath(randomPage.file.path);
        const content = await app.vault.read(file);

        // Extract lines with tag
        const quotelines = content.split('\n')
            .filter(line => line.includes(config.tag));

        // Display random quote
        if (quotelines.length > 0) {
            const randomLine = quotelines[Math.floor(Math.random() * quotelines.length)];

            // Clean the quote
            const cleanQuote = randomLine
                .replace(/#[^\s#]+/g, '') // Remove tags
                .replace(/\[.*?::.*?\]/g, '') // Remove inline fields
                .replace(/^[#\-*\s>]+/, '') // Remove markdown markers
                .trim();

            const quoteElement = document.createElement('blockquote');
            quoteElement.innerHTML = `<p>${cleanQuote}</p>`;
            container.appendChild(quoteElement);
        }
    } catch (error) {
        dv.paragraph(`> Error: ${error.message}`, container);
    }
}
```

## Style Guidelines for ThinkDoKit

### Naming Conventions

- **Variables**: `camelCase` (e.g., `tabButton`, `refreshTimeout`)
- **Functions**: `camelCase` (e.g., `formatBookName`, `copyToClipboard`)
- **Constants**: `UPPER_SNAKE_CASE` (rarely used)

### Code Formatting

- **Indentation**: 2 spaces (JavaScript standard)
- **Quotes**: Single quotes for strings, template literals for multiline
- **Semicolons**: Required (always use)
- **Braces**: K&R style (opening brace on same line)

### Async/Await Pattern

```javascript
async function renderContent(container) {
    try {
        // Clear existing content
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Async operations
        const file = app.vault.getAbstractFileByPath(path);
        const content = await app.vault.read(file);

        // Process and render
        const processed = processData(content);
        dv.paragraph(processed, { container });

    } catch (error) {
        // Error handling with user-friendly message
        const errorMessage = `> 错误: ${error.message}`;
        dv.paragraph(errorMessage, container);
    }
}
```

### Comments

- **Code logic**: English comments explaining technical details
- **User-facing text**: Chinese text for messages displayed to users

```javascript
// User-facing text in Chinese
const message = "已复制到剪贴板";

// Technical comment in English
// Debounce mechanism to prevent rapid-fire updates
if (refreshTimeout) {
    clearTimeout(refreshTimeout);
}
```

## Configuration Object Pattern

Always define a default config and merge with `input`:

```javascript
let config = {
  folder: "300 Resources/330 Books/332 BookExcerpts",
  tag: "#content/金句",
  noQuoteMessage: "> 暂无金句可显示",
  errorTemplate: "> 错误: {error}",
  quoteTemplate: "> {quote}\n>\n> — *{source}*"
};

// Override with input if provided
if (input !== undefined) {
  config = { ...config, ...input };
}
```

## References

- [DataviewJS API Documentation](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
- [Luxon DateTime Documentation](https://moment.github.io/luxon/docs/manual/formatting)
- ThinkDoKit scripts in `vault/900 Assets/960 Scripts/`

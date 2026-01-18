# ThinkDoKit - Agent Development Guide

## Available Skills

The following skills are available for specialized tasks:

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `/dataviewjs` | DataviewJS API usage and visualization patterns | Writing/modifying DataviewJS scripts, working with `dv` object, Dataview queries |
| `/quickadd` | QuickAdd API usage and Obsidian file operations | Writing/modifying QuickAdd scripts, file creation/modification, user input prompts |
| `/obsidian-markdown` | Obsidian Flavored Markdown syntax | Creating/editing Obsidian notes, wikilinks, callouts, frontmatter |
| `/obsidian-bases` | Obsidian Bases (.base files) | Creating/editing database views, tables, cards in Obsidian |
| `/json-canvas` | JSON Canvas (.canvas) files | Creating/editing visual canvases, mind maps, flowcharts |

---

## Project Overview

ThinkDoKit (知行盒子) is an Obsidian vault template distribution project for Personal Knowledge Management (PKM). The repository contains packaging scripts and the vault content itself.

**Project Type**: Obsidian vault distribution with Python packaging utilities
**Languages**: Python (scripts), JavaScript (Obsidian/Dataview plugins)
**Target**: Obsidian users seeking a structured PKM system

---

## Build & Run Commands

### Python Packaging Scripts
```bash
# Create full distribution (includes .obsidian, 900 Assets, empty folder structure)
python scripts/pack-full.py

# Create lite distribution (includes .obsidian, selected 900 Assets subfolders)
python scripts/pack-lite.py

# Create demo distribution (complete vault excluding .trash/)
python scripts/pack-demo.py
```

### Running Scripts
All scripts are standalone executables. They auto-detect paths based on their location in `scripts/` folder.

### Testing
No test framework configured. Manual testing:
1. Run packaging scripts locally
2. Verify output in `releases/` directory
3. Extract and test vault in Obsidian

### Linting
No linting configured. Maintain code style manually (see guidelines below).

---

## Code Style Guidelines

### Python Scripts

#### Import Style
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Standard library imports
import os
import shutil
import zipfile
from pathlib import Path
from datetime import datetime

# Third-party imports (if any)
# Local imports (if any)
```

- Group imports: stdlib → third-party → local
- One import per line
- No wildcard imports
- Use specific module imports (e.g., `from pathlib import Path`)

#### Naming Conventions
- **Variables/Functions**: `snake_case` (e.g., `temp_dir`, `create_zip`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `VERSION`, `TARGET`)
- **Classes**: `PascalCase` (rarely used)

#### Formatting
- **Indentation**: 4 spaces
- **Quotes**: Double quotes for strings
- **Line length**: Prefer under 80 chars when practical
- **Blank lines**: 2 blank lines before top-level functions

#### Functions
```python
def create_folder_structure(dest_dir):
    """Create fixed empty folder structure"""
    for folder, subfolders in FOLDER_STRUCTURE.items():
        folder_path = dest_dir / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"  [CREATE] {folder}")
```

- Docstring on single line for simple functions
- Use `pathlib.Path` for all path operations (not `os.path`)
- Use f-strings for string formatting

#### Error Handling
```python
try:
    await navigator.clipboard.writeText(text);
except err:
    console.error('复制失败:', err);
```

- Wrap operations that may fail in try-except
- Provide user-friendly error messages
- Log technical details to console

#### Output Messages
```python
print("=" * 60)
print("ThinkDoKit Full Packaging Tool")
print(f"Version: {VERSION}")
print("=" * 60)
print(f"\nDetected paths:")
print(f"  Script:   {SCRIPT_DIR}")
```

- Use section dividers (`"=" * 60`) for major sections
- Use 2-space indent for continuation lines
- Include timestamps/sizes in output

---

### JavaScript Scripts (Obsidian/Dataview)

#### Global Objects Available
- `dv` - Dataview API instance
- `app` - Obsidian app instance
- `input` - Configuration object passed from calling code

#### Config Pattern
```javascript
let config = {
  folder: "300 Resources/330 Books/332 BookExcerpts",
  tag: "#content/金句",
  quoteTemplate: "> {quote}\n>\n> — *{source}*"
};

// Override with input if provided
if (input !== undefined) {
  config = { ...config, ...input };
}
```

- Define default config object
- Use spread operator to merge input
- Support partial config override

#### Naming Conventions
- **Variables**: `camelCase` (e.g., `tabButton`, `refreshTimeout`)
- **Constants**: `UPPER_SNAKE_CASE` (rare)
- **Functions**: `camelCase` (e.g., `formatBookName`, `copyToClipboard`)
- **Event handlers**: Descriptive (e.g., `onclick`, `addEventListener`)

#### Formatting
- **Indentation**: 2 spaces (JavaScript standard)
- **Quotes**: Single quotes for strings, template literals for multiline
- **Semicolons**: Required (always use)

#### Functions
```javascript
async function displayRandomQuote(container, config) {
  try {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // ... logic
  } catch (error) {
    const errorMessage = config.errorTemplate.replace('{error}', error.message);
    dv.paragraph(errorMessage, container);
  }
}
```

- Use `async/await` for asynchronous operations
- Wrap async code in try-catch
- Use `const` for variables that don't change, `let` for those that do

#### DOM Manipulation
```javascript
const container = dv.el('div', '');
const buttonContainer = dv.el('div', '', { cls: 'button-container' });

buttonContainer.style.cssText = "display: flex; gap: 5px;";

const button = dv.el('button', 'Refresh', { container: buttonContainer });
button.onclick = function() {
  // handler logic
};
```

- Use `dv.el()` for creating elements (Obsidian API)
- Use inline styles via `cssText` for simplicity
- Store element references for later manipulation

#### Comments
```javascript
// Single-line comment for code logic
/**
 * Multi-line comment for complex functions
 * Explains the purpose and behavior
 */
function complexFunction() {
  // User-facing text in Chinese
  const message = "已复制到剪贴板";
}
```

- English comments for code logic
- Chinese text for user-facing messages
- JSDoc-style for function documentation

---

## File Structure

```
ThinkDoKit/
├── scripts/              # Python packaging utilities
│   ├── pack-full.py     # Full distribution
│   ├── pack-lite.py     # Lite distribution
│   └── pack-demo.py     # Demo distribution
├── vault/               # Obsidian vault content
│   ├── .obsidian/       # Obsidian configuration
│   ├── 000 Inbox/       # Inbox folder
│   ├── 100 Projects/    # Active projects
│   ├── 200 Areas/       # Areas of responsibility
│   ├── 300 Resources/   # Reference materials
│   ├── 400 Archive/     # Archived items
│   ├── 500 Journal/     # Time-based notes
│   ├── 600 Zettelkasten/# Permanent notes
│   └── 900 Assets/      # Templates, queries, scripts
│       ├── 910 Templates/
│       ├── 920 Queries/
│       ├── 950 Readme/
│       └── 960 Scripts/    # Dataview JS scripts
├── releases/            # Generated ZIP distributions
├── .github/             # GitHub workflows
└── AGENTS.md           # This file
```

---

## Common Patterns

### Python: Path Operations
```python
# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
```

### Python: ZIP Creation
```python
def create_zip(source_dir, output_file):
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = Path(root) / file
                arcname = file_path.relative_to(source_dir)
                zipf.write(file_path, arcname)
```

### JavaScript: Dataview Queries
```javascript
const pages = dv.pages('"300 Resources/330 Books"')
    .where(p => p.file.tags.includes('#content/金句'));

const tasks = dv.pages().file.tasks
    .where(t => !t.tags.includes('#exclude'));
```

### JavaScript: Tab Interface Pattern
```javascript
// Create tab container
const container = dv.el('div', '');

// Tab buttons
const tabs.forEach((tab, index) => {
  const button = dv.el('button', tab.name, {
    container: tabBar,
    cls: 'tab-button'
  });

  button.onclick = async () => {
    // Show/hide content
    // Update active state
  };
});
```

---

## Important Notes

1. **No dependencies**: Python scripts use only stdlib. No `requirements.txt` needed.
2. **Versioning**: Update `VERSION` constant in all pack scripts when making releases.
3. **Path handling**: Always use `pathlib.Path` in Python scripts for cross-platform compatibility.
4. **Chinese support**: All user-facing text in Chinese, code comments in English.
5. **Script location**: Packaging scripts expect to be in `scripts/` folder relative to project root.
6. **Output directory**: Generated ZIPs go to `releases/` folder (auto-created if missing).
7. **Temporary files**: Packaging scripts create temp directories and clean them up automatically.

---

## Workflow for Adding New Scripts

### Python Packaging Script
1. Copy existing pack script (e.g., `pack-full.py`)
2. Update `VERSION` and `TARGET` constants
3. Modify folder selection logic as needed
4. Test with `python scripts/pack-newscript.py`
5. Verify output ZIP in `releases/` directory

### JavaScript Dataview Script
1. Create new `.js` file in `vault/900 Assets/960 Scripts/`
2. Follow config pattern with defaults
3. Use `dv` and `app` globals as needed
4. Handle errors gracefully with user messages
5. Test in Obsidian via Dataview code block
6. Document usage in `vault/900 Assets/950 Readme/` if complex

**Reference**: Use `/dataviewjs` skill for DataviewJS API patterns and examples

### QuickAdd Script
1. Create new `.js` file in `vault/900 Assets/960 Scripts/`
2. Use `quickAddApi` for user input and `app.vault` for file operations
3. Follow async/await pattern for file operations
4. Handle errors gracefully with user feedback
5. Test via QuickAdd macro or command
6. Document usage in `vault/900 Assets/950 Readme/` if complex

**Reference**: Use `/quickadd` skill for QuickAdd API patterns and examples

---

## GitHub Integration

The repository uses OpenCode workflow for GitHub issue/PR automation. Triggered by `/oc` or `/opencode` commands in issue comments.

**Model**: `siliconflow-cn/zai-org/GLM-4.6` (configured in `.github/workflows/opencode.yml`)

# ThinkDoKit - Agent Development Guide

## Available Skills

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `/dataviewjs` | DataviewJS API usage and visualization patterns | Writing/modifying DataviewJS scripts, working with `dv` object, Dataview queries |
| `/quickadd` | QuickAdd API usage and Obsidian file operations | Writing/modifying QuickAdd scripts, file creation/modification, user input prompts |
| `/obsidian-markdown` | Obsidian Flavored Markdown syntax | Creating/editing Obsidian notes, wikilinks, callouts, frontmatter |
| `/obsidian-bases` | Obsidian Bases (.base files) | Creating/editing database views, tables, cards in Obsidian |
| `/json-canvas` | JSON Canvas (.canvas) files | Creating/editing visual canvases, mind maps, flowcharts |

---

## Build & Run Commands

```bash
# Python packaging scripts
python scripts/pack-full.py   # Full distribution (.obsidian + 900 Assets + empty folders)
python scripts/pack-lite.py   # Lite distribution (.obsidian + selected 900 Assets subfolders)
python scripts/pack-demo.py   # Demo distribution (complete vault excluding .trash/)
```

**Testing**: Manual testing only. Run scripts locally, verify output in `releases/` directory, extract and test in Obsidian.

**Linting**: None configured. Maintain code style manually.

---

## Code Style Guidelines

### Python Scripts

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Standard library imports
import shutil
import zipfile
from pathlib import Path
from datetime import datetime

# Configuration constants
VERSION = "1.2.0"
TARGET = f"ThinkDoKit-Full-{VERSION}.zip"

# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
```

**Imports**: Group stdlib → third-party → local. One per line. No wildcards.
**Naming**: `snake_case` for variables/functions, `UPPER_SNAKE_CASE` for constants.
**Formatting**: 4-space indentation, double quotes, f-strings for interpolation.
**Paths**: Always use `pathlib.Path`, never `os.path`.
**Error handling**: Wrap operations in try-except, log technical details.
**Output**: Use section dividers (`"=" * 60`), 2-space indents for continuation.

```python
def create_folder_structure(dest_dir):
    """Create fixed empty folder structure"""
    for folder, subfolders in FOLDER_STRUCTURE.items():
        folder_path = dest_dir / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"  [CREATE] {folder}")
```

---

### JavaScript/Dataview Scripts

**Dataview Pattern**:
```javascript
let config = {
  folder: "300 Resources/330 Books/332 BookExcerpts",
  tag: "#content/金句",
  quoteTemplate: "> {quote}\n>\n> — *{source}*"
};

if (input !== undefined) {
  config = { ...config, ...input };
}
```

**QuickAdd Pattern**:
```javascript
module.exports = async (params) => {
    const { quickAddApi, app } = params;
    // implementation
};
```

**Global Objects**:
- `dv` - Dataview API instance (Dataview scripts)
- `app` - Obsidian app instance
- `quickAddApi` - QuickAdd API (QuickAdd scripts)
- `input` - Optional configuration object

**Naming**: `camelCase` for variables/functions.
**Formatting**: 2-space indentation, single quotes for strings, semicolons required.
**Async**: Always use `async/await` for file operations and API calls.

```javascript
async function displayRandomQuote(container, config) {
  try {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // logic
  } catch (error) {
    const errorMessage = config.errorTemplate.replace('{error}', error.message);
    dv.paragraph(errorMessage, container);
  }
}
```

**DOM Manipulation** (Dataview):
```javascript
const container = dv.el('div', '');
const button = dv.el('button', 'Refresh', { container });
button.onclick = function() { /* handler */ };
```

**Comments**: English for code logic, Chinese for user-facing text.

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
│       └── 960 Scripts/    # Dataview JS and QuickAdd scripts
├── releases/            # Generated ZIP distributions
└── .github/             # GitHub workflows
```

---

## Common Patterns

### Python: Path Detection
```python
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
```

### Python: ZIP Creation
```python
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
```

### JavaScript: File Operations (QuickAdd)
```javascript
const file = app.vault.getAbstractFileByPath(path);
const content = await app.vault.read(file);
await app.vault.modify(activeFile, updatedContent);
```

---

## Important Notes

1. **No Python dependencies**: Scripts use only stdlib. No `requirements.txt`.
2. **Versioning**: Update `VERSION` constant in all pack scripts for releases.
3. **Path handling**: Use `pathlib.Path` for cross-platform compatibility.
4. **Language**: User-facing text in Chinese, code comments in English.
5. **Script location**: Packaging scripts expect to be in `scripts/` folder.
6. **Output**: Generated ZIPs go to `releases/` folder (auto-created).
7. **Temp cleanup**: Scripts create temp directories and clean up automatically.

---

## Workflow for Adding Scripts

### Python Packaging Script
1. Copy existing pack script (e.g., `pack-full.py`)
2. Update `VERSION` and `TARGET` constants
3. Modify folder selection logic
4. Test: `python scripts/pack-newscript.py`
5. Verify ZIP in `releases/` directory

### Dataview Script
1. Create `.js` file in `vault/900 Assets/960 Scripts/`
2. Define config object with defaults
3. Use `dv` and `app` globals
4. Handle errors with user messages
5. Test in Obsidian via Dataview code block
6. Document usage in `vault/900 Assets/950 Readme/` if complex

### QuickAdd Script
1. Create `.js` file in `vault/900 Assets/960 Scripts/`
2. Use `module.exports = async (params) =>`
3. Use `quickAddApi` for input, `app.vault` for file operations
4. Follow async/await pattern
5. Handle errors gracefully
6. Test via QuickAdd macro/command

---

## GitHub Integration

Uses OpenCode workflow for GitHub issue/PR automation. Triggered by `/oc` or `/opencode` in issue comments.

**Model**: `siliconflow-cn/zai-org/GLM-4.6` (configured in `.github/workflows/opencode.yml`)

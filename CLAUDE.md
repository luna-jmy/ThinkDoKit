# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ThinkDoKit (知行盒子) is an Obsidian vault template distribution for Personal Knowledge Management (PKM). The project combines GTD, PARA, Zettelkasten, and Spaced Repetition methodologies into a pre-configured Obsidian vault.

**Architecture**: This is a distribution system that produces portable ZIP archives, not a traditional application. The "product" is the `vault/` directory containing Obsidian notes, templates, scripts, and configurations.

---

## Build Commands

```bash
# Full distribution (~50MB): .obsidian + full 900 Assets + empty folder structure
python scripts/pack-full.py

# Lite distribution: .obsidian + selected 900 Assets subfolders only
python scripts/pack-lite.py

# Demo distribution: Complete vault excluding .trash/
python scripts/pack-demo.py
```

Output ZIP files are created in `releases/` directory (auto-created if missing).

---

## Code Architecture

### Distribution Model

The repository has three distinct layers:

1. **`scripts/`** - Python build system that creates distribution ZIPs
2. **`vault/`** - The actual product (Obsidian vault content)
3. **`releases/`** - Generated output (not tracked in git)

### Python Build System (`scripts/`)

All packaging scripts are standalone executables with no external dependencies:

- **Auto-path detection**: Scripts dynamically locate paths using `Path(__file__).parent.resolve()`
- **Cross-platform**: Uses `pathlib.Path` for all file operations
- **Version constants**: Each script has a `VERSION` constant that must be updated for releases
- **Temporary directories**: Created and cleaned up automatically during packaging

**Critical pattern** - All scripts rely on being in `scripts/` folder:
```python
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
```

### JavaScript/Vault Content (`vault/900 Assets/960 Scripts/`)

JavaScript files are designed for Obsidian's plugin ecosystem:

- **DataviewJS scripts**: Use global `dv` object for Dataview API queries
- **QuickAdd scripts**: Use `quickAddApi` for user interactions and file operations
- **Config pattern**: Default config object with spread-operator override from `input` parameter
- **Error handling**: User-facing messages in Chinese, technical logging in English

---

## Vault Folder Structure

The `vault/` directory follows the PARA + GTD methodology:

- `000-600/`: Main PKM folders (Inbox, Projects, Areas, Resources, Archive, Journal, Zettelkasten)
- `900 Assets/`: Non-content assets (Templates, Queries, Scripts, Documentation)

**Key insight**: Only `900 Assets/` contains code/templates. The numbered folders are for user content and are distributed as empty folder structure.

---

## Important Notes

1. **No test framework**: Manual testing by running scripts locally and verifying ZIP contents
2. **No linting**: Code style maintained manually (see AGENTS.md for guidelines)
3. **Version synchronization**: When making releases, update `VERSION` in all pack scripts
4. **Chinese-first**: User-facing text is in Chinese; code comments in English
5. **Plugin dependencies**: The vault requires Obsidian with Dataview, Tasks, Templater, QuickAdd, Journals, and Spaced Repetition plugins

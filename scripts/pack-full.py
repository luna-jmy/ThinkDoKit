#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ThinkDoKit Lite Packaging Script
Preserves folder structure but removes note contents
"""

import os
import shutil
import zipfile
from pathlib import Path
from datetime import datetime

# Configuration
VERSION = "1.1.3"
TARGET = f"ThinkDoKit-Full-{VERSION}.zip"

# Set to True if you want .gitkeep files in empty folders
# Set to False to have truly empty folders (but Git won't track them)
USE_GITKEEP = False

# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
RELEASES_DIR = PROJECT_ROOT / "releases"
TEMP_DIR = Path.cwd() / f"temp-pack-{datetime.now().strftime('%Y%m%d%H%M%S')}"

# Folders to empty but keep structure (including ALL subfolders)
FOLDERS_TO_EMPTY = [
    "000 Inbox",
    "100 Projects",
    "200 Areas",
    "300 Resources",
    "400 Archive",
    "500 Journal",
    "600 Zettelkasten"
]

# Folders to completely exclude (don't create at all)
FOLDERS_TO_EXCLUDE = [
    ".trash",
    ".obsidian/plugins/remotely-save"
]

# Files to exclude from root directory
FILES_TO_EXCLUDE = [
    "✅请完成你的第一个任务！.md"
]


def is_in_empty_zone(relative_path):
    """Check if path is in a folder that should be emptied"""
    rel_str = str(relative_path).replace("\\", "/")
    for folder in FOLDERS_TO_EMPTY:
        if rel_str == folder or rel_str.startswith(f"{folder}/"):
            return True
    return False


def should_exclude(relative_path):
    """Check if path should be completely excluded"""
    rel_str = str(relative_path).replace("\\", "/")
    for folder in FOLDERS_TO_EXCLUDE:
        if rel_str == folder or rel_str.startswith(f"{folder}/"):
            return True
    return False


def copy_structure(src_dir, dest_dir, relative_path=""):
    """
    Recursively copy folder structure, excluding files in empty zones
    """
    # Create destination directory
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    current_relative = relative_path
    is_empty_zone = is_in_empty_zone(current_relative) if current_relative else False
    
    # Process files in current directory
    for item in src_dir.iterdir():
        if item.is_file():
            item_relative = str(Path(relative_path) / item.name) if relative_path else item.name
            
            # Check if file should be excluded (root level only)
            should_exclude_file = False
            if not relative_path and item.name in FILES_TO_EXCLUDE:
                should_exclude_file = True
                print(f"  [EXCLUDE] File: {item.name}")
            
            # Copy file only if NOT in empty zone and NOT excluded
            if not is_empty_zone and not should_exclude_file:
                shutil.copy2(item, dest_dir / item.name)
                print(f"  [COPY] {item_relative}")
            elif is_empty_zone:
                print(f"  [SKIP] {item_relative} (empty zone)")
    
    # Process subdirectories
    for item in src_dir.iterdir():
        if item.is_dir():
            item_relative = str(Path(relative_path) / item.name) if relative_path else item.name
            
            # Check if folder should be completely excluded
            if should_exclude(item_relative):
                print(f"  [EXCLUDE] Folder: {item_relative}")
                continue
            
            # ALWAYS create folder structure, even in empty zones
            print(f"  [CREATE] Folder: {item_relative}")
            new_dest = dest_dir / item.name
            
            # Recursively process subfolder
            copy_structure(item, new_dest, item_relative)
    
    # Add .gitkeep to empty folders (optional)
    if USE_GITKEEP:
        items = list(dest_dir.iterdir())
        if not items or all(f.name == ".gitkeep" for f in items):
            gitkeep = dest_dir / ".gitkeep"
            gitkeep.write_text("# Preserve folder structure\n", encoding="utf-8")
            print(f"  [GITKEEP] {current_relative}")


def create_zip(source_dir, output_file):
    """Create ZIP archive from directory, including empty folders"""
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Walk through all directories and files
        for root, dirs, files in os.walk(source_dir):
            # Add files
            for file in files:
                file_path = Path(root) / file
                arcname = file_path.relative_to(source_dir)
                zipf.write(file_path, arcname)
            
            # Add empty directories
            for dir_name in dirs:
                dir_path = Path(root) / dir_name
                # Check if directory is empty
                if not any(dir_path.iterdir()):
                    # Add empty directory to ZIP
                    arcname = str(dir_path.relative_to(source_dir)) + "/"
                    zipf.writestr(zipfile.ZipInfo(arcname), "")
                    print(f"  [EMPTY] {arcname}")


def main():
    print("=" * 60)
    print("ThinkDoKit Lite Packaging Tool")
    print(f"Version: {VERSION}")
    print(f"Empty folder handling: {'With .gitkeep' if USE_GITKEEP else 'Truly empty'}")
    print("=" * 60)
    print(f"\nDetected paths:")
    print(f"  Script:   {SCRIPT_DIR}")
    print(f"  Project:  {PROJECT_ROOT}")
    print(f"  Vault:    {VAULT_PATH}")
    print(f"  Releases: {RELEASES_DIR}")
    print(f"  Temp:     {TEMP_DIR}")
    
    # Validate source directory
    if not VAULT_PATH.exists():
        print(f"\nERROR: Vault directory not found: {VAULT_PATH}")
        print("\nPlease ensure:")
        print("  1. This script is in the 'scripts/' folder")
        print("  2. The 'vault/' folder exists in the project root")
        return 1
    
    # Create releases directory
    RELEASES_DIR.mkdir(parents=True, exist_ok=True)
    
    # Clean up temp directory if exists
    if TEMP_DIR.exists():
        shutil.rmtree(TEMP_DIR)
    
    print("\n" + "=" * 60)
    print("[Step 1] Copying folder structure...")
    print("=" * 60)
    copy_structure(VAULT_PATH, TEMP_DIR)
    
    print("\n" + "=" * 60)
    print("[Step 2] Verifying results...")
    print("=" * 60)
    for folder in FOLDERS_TO_EMPTY:
        folder_path = TEMP_DIR / folder
        if folder_path.exists():
            md_files = list(folder_path.rglob("*.md"))
            subfolders = [d for d in folder_path.rglob("*") if d.is_dir()]
            
            if md_files:
                print(f"  [WARNING] {folder} contains {len(md_files)} .md files!")
            else:
                print(f"  [OK] {folder} - No .md files ({len(subfolders)} subfolders)")
        else:
            print(f"  [WARNING] {folder} not found in package!")
    
    print("\n" + "=" * 60)
    print("[Step 3] Creating ZIP archive...")
    print("=" * 60)
    zip_path = RELEASES_DIR / TARGET
    if zip_path.exists():
        zip_path.unlink()
    
    create_zip(TEMP_DIR, zip_path)
    print(f"  Archive created: {zip_path.name}")
    
    print("\n" + "=" * 60)
    print("[Step 4] Cleaning up temporary files...")
    print("=" * 60)
    shutil.rmtree(TEMP_DIR)
    print(f"  Removed: {TEMP_DIR}")
    
    # Show results
    file_size_mb = zip_path.stat().st_size / (1024 * 1024)
    print("\n" + "=" * 60)
    print("✓ Packaging Complete!")
    print("=" * 60)
    print(f"  Output: {zip_path}")
    print(f"  Size:   {file_size_mb:.2f} MB")
    print(f"\n  Empty folders: {'With .gitkeep placeholders' if USE_GITKEEP else 'Truly empty'}")
    print("=" * 60)
    
    return 0


if __name__ == "__main__":
    exit(main())
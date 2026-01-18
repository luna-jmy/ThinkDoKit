#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ThinkDoKit Full Packaging Script
Packages .obsidian, 900 Assets (full) and fixed folder structure
"""

import shutil
import zipfile
from pathlib import Path
from datetime import datetime

# Configuration
VERSION = "1.2.0"
TARGET = f"ThinkDoKit-Full-{VERSION}.zip"

# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
RELEASES_DIR = PROJECT_ROOT / "releases"
TEMP_DIR = Path.cwd() / f"temp-pack-{datetime.now().strftime('%Y%m%d%H%M%S')}"

# Fixed folder structure (nested format)
FOLDER_STRUCTURE = {
    "000 Inbox": [],
    "100 Projects": [],
    "200 Areas": [],
    "300 Resources": [
        "310 Clippings",
        "320 References",
        "330 Books",
        "340 Courses",
        "350 Articles",
        "390 EverythingElse"
    ],
    "400 Archive": [],
    "500 Journal": [
        "510 Annual",
        "520 Monthly",
        "530 Weekly",
        "540 Daily"
    ],
    "600 Zettelkasten": [
        "610 Evergreen",
        "620 Flashcards"
    ]
}


def create_folder_structure(dest_dir):
    """Create fixed empty folder structure"""
    for folder, subfolders in FOLDER_STRUCTURE.items():
        folder_path = dest_dir / folder
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"  [CREATE] {folder}")

        for subfolder in subfolders:
            subfolder_path = folder_path / subfolder
            subfolder_path.mkdir(parents=True, exist_ok=True)
            print(f"  [CREATE] {folder}/{subfolder}")


def copy_full_folders(src_dir, dest_dir):
    """Copy .obsidian, 900 Assets folders and start file completely"""
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Copy .obsidian folder
    obsidian_src = src_dir / ".obsidian"
    if obsidian_src.exists():
        obsidian_dest = dest_dir / ".obsidian"
        shutil.copytree(obsidian_src, obsidian_dest, dirs_exist_ok=True)
        print(f"  [COPY] .obsidian")
    else:
        print(f"  [WARNING] .obsidian not found in vault")

    # Copy 900 Assets folder completely
    assets_src = src_dir / "900 Assets"
    if assets_src.exists():
        assets_dest = dest_dir / "900 Assets"
        shutil.copytree(assets_src, assets_dest, dirs_exist_ok=True)
        print(f"  [COPY] 900 Assets")
    else:
        print(f"  [WARNING] 900 Assets not found in vault")

    # Copy start file
    start_file = src_dir / "👉从这里开始 Start from here!.md"
    if start_file.exists():
        shutil.copy2(start_file, dest_dir / start_file.name)
        print(f"  [COPY] {start_file.name}")
    else:
        print(f"  [WARNING] Start file not found in vault")


def create_zip(source_dir, output_file):
    """Create ZIP archive from directory"""
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
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


import os


def main():
    print("=" * 60)
    print("ThinkDoKit Full Packaging Tool")
    print(f"Version: {VERSION}")
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
    print("[Step 1] Creating package...")
    print("=" * 60)

    # Copy full folders (.obsidian, 900 Assets)
    print("\nCopying full folders:")
    copy_full_folders(VAULT_PATH, TEMP_DIR)

    # Create fixed folder structure
    print("\nCreating folder structure:")
    create_folder_structure(TEMP_DIR)

    print("\n" + "=" * 60)
    print("[Step 2] Creating ZIP archive...")
    print("=" * 60)
    zip_path = RELEASES_DIR / TARGET
    if zip_path.exists():
        zip_path.unlink()

    create_zip(TEMP_DIR, zip_path)
    print(f"  Archive created: {zip_path.name}")

    print("\n" + "=" * 60)
    print("[Step 3] Cleaning up temporary files...")
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
    print(f"\n  Contains:")
    print(f"    - .obsidian (full)")
    print(f"    - 900 Assets (full)")
    print(f"    - 👉从这里开始 Start from here!.md")
    print(f"    - Fixed folder structure (empty)")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    exit(main())

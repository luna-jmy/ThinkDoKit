#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ThinkDoKit Lite Packaging Script
Only packages .obsidian and selected subfolders from 900 Assets
"""

import shutil
import zipfile
from pathlib import Path
from datetime import datetime

# Configuration
VERSION = "1.2.0"
TARGET = f"ThinkDoKit-Lite-{VERSION}.zip"

# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
RELEASES_DIR = PROJECT_ROOT / "releases"
TEMP_DIR = Path.cwd() / f"temp-pack-{datetime.now().strftime('%Y%m%d%H%M%S')}"

# Subfolders to include from 900 Assets
ASSETS_SUBFOLDERS = ["910 Templates", "920 Queries", "960 Scripts"]


def copy_folders(src_dir, dest_dir):
    """Copy .obsidian and selected subfolders from 900 Assets"""
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Copy .obsidian folder
    obsidian_src = src_dir / ".obsidian"
    if obsidian_src.exists():
        obsidian_dest = dest_dir / ".obsidian"
        shutil.copytree(obsidian_src, obsidian_dest, dirs_exist_ok=True)
        print(f"  [COPY] .obsidian")
    else:
        print(f"  [WARNING] .obsidian not found in vault")

    # Copy selected subfolders from 900 Assets
    assets_src = src_dir / "900 Assets"
    if assets_src.exists():
        assets_dest = dest_dir / "900 Assets"
        assets_dest.mkdir(parents=True, exist_ok=True)
        for subfolder in ASSETS_SUBFOLDERS:
            subfolder_src = assets_src / subfolder
            if subfolder_src.exists():
                subfolder_dest = assets_dest / subfolder
                shutil.copytree(subfolder_src, subfolder_dest, dirs_exist_ok=True)
                print(f"  [COPY] 900 Assets/{subfolder}")
            else:
                print(f"  [WARNING] 900 Assets/{subfolder} not found in vault")
    else:
        print(f"  [WARNING] 900 Assets not found in vault")


def create_zip(source_dir, output_file):
    """Create ZIP archive from directory"""
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source_dir):
            for file in files:
                file_path = Path(root) / file
                arcname = file_path.relative_to(source_dir)
                zipf.write(file_path, arcname)


import os


def main():
    print("=" * 60)
    print("ThinkDoKit Lite Packaging Tool")
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
    print("[Step 1] Copying folders...")
    print("=" * 60)
    print(f"  Including: .obsidian")
    print(f"            900 Assets/{', '.join(ASSETS_SUBFOLDERS)}")
    copy_folders(VAULT_PATH, TEMP_DIR)

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
    print(f"  Contains: .obsidian, 900 Assets/{', '.join(ASSETS_SUBFOLDERS)}")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    exit(main())

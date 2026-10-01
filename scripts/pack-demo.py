#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ThinkDoKit Demo Packaging Script
Packages the entire vault without exclusions
"""

import os
import zipfile
from pathlib import Path

# Configuration
VERSION = os.environ.get("TDK_VERSION", "1.2.2")
TARGET = f"ThinkDoKit-Demo-{VERSION}.zip"
EXCLUDE_DIRS = {".trash"}
EXCLUDE_FILES = {".DS_Store"}

# Auto-detect paths based on script location
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
VAULT_PATH = PROJECT_ROOT / "vault"
RELEASES_DIR = PROJECT_ROOT / "releases"


def create_zip(source_dir, output_file):
    """Create ZIP archive from directory, excluding specified directories"""
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        # Walk through all directories and files
        for root, dirs, files in os.walk(source_dir):
            # Filter out excluded directories in-place
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            # Add files
            for file in files:
                if file in EXCLUDE_FILES:
                    continue
                file_path = Path(root) / file
                arcname = file_path.relative_to(source_dir)
                zipf.write(file_path, arcname)
                print(f"  [ADD] {arcname}")

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
    print("ThinkDoKit Demo Packaging Tool")
    print(f"Version: {VERSION}")
    print("=" * 60)
    print(f"\nDetected paths:")
    print(f"  Script:   {SCRIPT_DIR}")
    print(f"  Project:  {PROJECT_ROOT}")
    print(f"  Vault:    {VAULT_PATH}")
    print(f"  Releases: {RELEASES_DIR}")

    # Validate source directory
    if not VAULT_PATH.exists():
        print(f"\nERROR: Vault directory not found: {VAULT_PATH}")
        print("\nPlease ensure:")
        print("  1. This script is in the 'scripts/' folder")
        print("  2. The 'vault/' folder exists in the project root")
        return 1

    # Create releases directory
    RELEASES_DIR.mkdir(parents=True, exist_ok=True)

    print("\n" + "=" * 60)
    print("[Step 1] Creating ZIP archive directly...")
    print("=" * 60)

    zip_path = RELEASES_DIR / TARGET
    if zip_path.exists():
        zip_path.unlink()

    # Merge seed (demo content & base configs) + vault (kit); vault wins on conflict
    import shutil
    from datetime import datetime
    seed_path = PROJECT_ROOT / "seed"
    if seed_path.exists():
        merge_dir = Path.cwd().parent / f"temp-pack-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        if merge_dir.exists():
            shutil.rmtree(merge_dir)
        shutil.copytree(seed_path, merge_dir, ignore=shutil.ignore_patterns(".DS_Store", ".trash"))
        for item in VAULT_PATH.rglob("*"):
            if item.is_file():
                rel = item.relative_to(VAULT_PATH)
                dst = merge_dir / rel
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(item, dst)
        source_dir = merge_dir
    else:
        merge_dir = None
        source_dir = VAULT_PATH

    # Create ZIP directly from merged source
    create_zip(source_dir, zip_path)

    if merge_dir:
        shutil.rmtree(merge_dir, ignore_errors=True)

    print("\n" + "=" * 60)
    print("[Step 2] Calculating archive size...")
    print("=" * 60)

    # Show results
    file_size_mb = zip_path.stat().st_size / (1024 * 1024)
    print("\n" + "=" * 60)
    print("✓ Packaging Complete!")
    print("=" * 60)
    print(f"  Output: {zip_path}")
    print(f"  Size:   {file_size_mb:.2f} MB")
    print(f"  Contains: Complete vault (excluding: {', '.join(sorted(EXCLUDE_DIRS))})")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    exit(main())

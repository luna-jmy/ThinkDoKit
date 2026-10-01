# ThinkDoKit

ThinkDoKit（知行盒子）是一个面向 Obsidian 的知识管理模板仓库，整合了 GTD、PARA、Zettelkasten 和间隔复习等常见工作流，提供可直接分发的 vault 配置、模板、查询和脚本。

## What's Included

- `vault/`: 分发的核心内容（Kit）——`.obsidian`（插件/主题/工作区布局）、`900 Assets`（模板、查询、整体说明文档、脚本）
- `seed/`: 演示内容与基础配置——样例笔记（000–600）、`.obsidian` 顶层配置，打包时叠加进发布包
- `scripts/`: 打包脚本，用于生成 Full、Lite、Demo 三种发布包
- `releases/`: 本地生成的 ZIP 产物目录（不纳入 Git 跟踪）

## Release Variants

- `Demo`: Kit + seed 演示内容，开箱即用的完整体验
- `Full`: Kit + seed 基础配置 + 固定空文件夹结构
- `Lite`: 精简 Kit（模板/查询/脚本）+ seed 基础配置

## Build

```bash
python scripts/pack-demo.py
python scripts/pack-full.py
python scripts/pack-lite.py
```

生成的 ZIP 会写入 `releases/` 目录。可用环境变量覆盖版本号做本地测试构建：

```bash
TDK_VERSION=2.0.0-local python scripts/pack-demo.py
```

## Release Workflow

- Push a tag like `v1.2.2` to trigger the GitHub release workflow automatically
- Or run the `release` workflow manually in GitHub Actions and provide a tag
- The workflow builds all three packages and uploads them to the matching GitHub Release

## Project Structure

```text
ThinkDoKit/
├── scripts/   # Python 打包脚本
├── vault/     # Kit：同步自工作库的分发内容
├── seed/      # 演示内容 + 基础配置（打包时叠加）
├── releases/  # 本地构建产物（gitignore）
└── .github/   # CI 工作流
```

## Notes

- 打包脚本仅依赖 Python 标准库
- 版本号默认读取脚本内常量，可用 `TDK_VERSION` 环境变量临时覆盖
- `.DS_Store` 和 `.trash` 不会被打进发布包

## Changelog

发布记录见 [CHANGELOG.md](CHANGELOG.md)

# ThinkDoKit

ThinkDoKit（知行盒子）是一个面向 Obsidian 的知识管理模板仓库，整合了 GTD、PARA、Zettelkasten 和间隔复习等常见工作流，提供可直接分发的 vault 配置、模板、查询和脚本。

## What's Included

- `vault/`: 实际分发内容，包含 Obsidian 配置、模板、查询、脚本和示例内容
- `scripts/`: 打包脚本，用于生成 Full、Lite、Demo 三种发布包
- `releases/`: 本地生成的 ZIP 产物目录（不纳入 Git 跟踪）

## Release Variants

- `Full`: `.obsidian`、完整 `900 Assets` 和固定空文件夹结构
- `Lite`: `.obsidian`、`900 Assets/910 Templates`、`920 Queries`、`960 Scripts`
- `Demo`: 完整 vault 内容，适合体验和演示

## Build

```bash
python3 scripts/pack-full.py
python3 scripts/pack-lite.py
python3 scripts/pack-demo.py
```

生成的 ZIP 会写入 `releases/` 目录。

## Project Structure

```text
ThinkDoKit/
├── scripts/
├── vault/
├── releases/
└── .github/
```

## Notes

- 打包脚本仅依赖 Python 标准库
- 发布版本号需要同步更新到 `scripts/pack-*.py`
- `.DS_Store` 和 `.trash` 不会被打进发布包

## Changelog

项目发布记录见 [CHANGELOG.md](</Users/luna/GitHub/ThinkDoKit/CHANGELOG.md>)。

## Contributing

贡献说明见 [CONTRIBUTING.md](</Users/luna/GitHub/ThinkDoKit/CONTRIBUTING.md>)。

## Security

安全相关反馈见 [SECURITY.md](</Users/luna/GitHub/ThinkDoKit/SECURITY.md>)。

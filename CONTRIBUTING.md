# Contributing

Thanks for contributing to ThinkDoKit.

## Scope

This repository mainly contains:

- Obsidian vault content in `vault/`
- Packaging scripts in `scripts/`
- Release workflow metadata in `.github/`

## How To Contribute

1. Create a branch for your changes.
2. Keep edits focused and avoid unrelated formatting churn.
3. If you change release contents, update the relevant docs and packaging scripts.
4. Run the packaging scripts locally when your change affects distributed assets.
5. Open a pull request with a short summary and testing notes.

## Content Guidelines

- User-facing text can be Chinese
- Code comments should stay in English where possible
- Python scripts should use `pathlib.Path` and standard library only
- Obsidian scripts should follow the existing DataviewJS and QuickAdd patterns

## Manual Verification

There is no automated test suite yet. Please verify changes manually:

```bash
python3 scripts/pack-full.py
python3 scripts/pack-lite.py
python3 scripts/pack-demo.py
```

Then inspect the generated ZIP files in `releases/` and test them in Obsidian if needed.

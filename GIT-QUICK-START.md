# 🚀 ThinkDoKit Git 同步工具

## 快速使用

### 📥 从其他电脑同步（Pull）

```bash
cd ~/.openclaw/thinkdokit
./git-sync.sh
```

### 📤 推送到其他电脑（Push）

```bash
cd ~/.openclaw/thinkdokit
./git-push.sh
```

---

## 📋 常用命令

| 操作 | 命令 |
|------|------|
| Pull 最新内容 | `./git-sync.sh` |
| Push 更改 | `./git-push.sh` |
| 查看状态 | `git status` |
| 查看修改 | `git diff` |
| 查看历史 | `git log --oneline` |

---

## ⚠️ 注意事项

- Pull 前确保没有未提交的更改，或先处理它们
- Push 前先 Pull 以避免冲突
- 提交信息要清晰描述更改内容
- 不要提交敏感信息

---

## 📚 详细文档

完整文档请查看：`workspace/ThinkDoKit-Git同步指南.md`

---

_版本：1.0_
_创建日期：2026-02-07_

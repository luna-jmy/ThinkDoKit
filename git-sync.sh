#!/bin/bash

# ThinkDoKit 同步脚本
# 用于 pull/push GitHub 仓库

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${SCRIPT_DIR}"
GIT_ORIGIN="origin"
MAIN_BRANCH="main"

echo "======================================"
echo "  ThinkDoKit Git 同步工具"
echo "======================================"
echo ""

# 检查是否在仓库中
cd "$REPO_DIR" || {
    echo "❌ 错误：无法进入仓库目录"
    exit 1
}

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  警告：你有未提交的更改"
    echo ""
    echo "未提交的文件："
    git status --short
    echo ""
    echo "请先处理这些更改："
    echo "  1. 提交更改：git add . && git commit -m '说明'"
    echo "  2. 暂存更改：git stash"
    echo "  3. 丢弃更改：git checkout ."
    echo ""
    read -p "是否继续 pull（可能会产生冲突）？(y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 已取消"
        exit 1
    fi
fi

# 获取当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支：$CURRENT_BRANCH"
echo ""

# 执行 pull
echo "📥 正在从 GitHub pull 最新内容..."
echo ""

git pull "$GIT_ORIGIN" "$CURRENT_BRANCH"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Pull 成功！"
    echo ""
    echo "最新状态："
    git log --oneline -5
else
    echo ""
    echo "❌ Pull 失败"
    echo ""
    echo "可能的解决方案："
    echo "  1. 检查网络连接"
    echo "  2. 如果有冲突，手动解决后运行：git add . && git commit"
    echo "  3. 如果需要强制覆盖本地：git reset --hard origin/$CURRENT_BRANCH"
    exit 1
fi

echo ""
echo "======================================"
echo "  完成！"
echo "======================================"

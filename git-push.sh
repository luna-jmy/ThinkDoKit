#!/bin/bash

# ThinkDoKit 推送脚本
# 用于提交和推送更改到 GitHub

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${SCRIPT_DIR}"
GIT_ORIGIN="origin"
MAIN_BRANCH="main"

echo "======================================"
echo "  ThinkDoKit Git 推送工具"
echo "======================================"
echo ""

# 检查是否在仓库中
cd "$REPO_DIR" || {
    echo "❌ 错误：无法进入仓库目录"
    exit 1
}

# 检查是否有 Git user 配置
if ! git config user.name > /dev/null 2>&1; then
    echo "⚠️  未配置 Git 用户信息"
    echo ""
    read -p "请输入你的名字: " username
    git config user.name "$username"

    read -p "请输入你的邮箱: " email
    git config user.email "$email"

    echo ""
    echo "✅ Git 用户配置完成"
    echo ""
fi

# 显示当前状态
echo "📊 当前 Git 状态："
echo ""
git status --short
echo ""

# 检查是否有更改
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 没有需要提交的更改"
    exit 0
fi

# 询问提交信息
echo "请输入提交信息（留空使用默认）:"
read -p "> " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update $(date +%Y-%m-%d)"
fi

echo ""
echo "📝 提交信息：$commit_message"
echo ""

# 添加所有更改
echo "➕ 添加所有更改..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "$commit_message"

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 提交失败"
    exit 1
fi

# 获取当前分支
CURRENT_BRANCH=$(git branch --show-current)

# 推送
echo ""
echo "📤 推送到 GitHub..."
echo ""

git push "$GIT_ORIGIN" "$CURRENT_BRANCH"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "最新提交："
    git log --oneline -1
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的解决方案："
    echo "  1. 检查网络连接"
    echo "  2. 先 pull 最新内容：./git-sync.sh"
    echo "  3. 检查是否需要认证"
    exit 1
fi

echo ""
echo "======================================"
echo "  完成！"
echo "======================================"

---
created: 2025-09-18
obsidianUIMode: preview
---

## 查询所有有关键词的笔记(limit 5)

```dataview
TABLE area, type, created, file.mday as "修改日期"
WHERE keyword
SORT file.mday DESC
limit 5
```

### 查询有特定关键词笔记
```button
name 更新查询的关键词
type command
action QuickAdd: UpdateInlineField
color purple
```

[query::心理学] 
```dataviewjs
// 获取当前页面的 query 内联字段值
const currentFile = dv.current();
const queryKeyword = currentFile.query || "心理学"; // 如果没有 query 字段，默认使用"心理学"

// 获取所有页面并筛选
const pages = dv.pages("")
    .where(p => p.keyword && p.keyword.includes(queryKeyword))
    .sort(p => p.file.mday, 'desc')
    .limit(10);

// 创建表格
dv.table(
    ["File", "Area", "Type", "Created", "修改日期"],
    pages.map(p => [
        p.file.link,  // 添加文件链接
        p.area,
        p.type, 
        p.created,
        p.file.mday
    ])
);
```

## 查询YAML里的关键词数量 (Top 10)

```dataview
TABLE WITHOUT ID
  keywords AS "关键词",
  length(rows) AS "出现次数"
FLATTEN file.frontmatter.keywords AS keywords
WHERE keywords
GROUP BY keywords
SORT length(rows) DESC
limit 10
```

## 查询笔记内容里的关键词
>*此关键词统计是基于笔记的内联字段keyword，如笔记中无此字段则无法统计。*

```dataviewjs
// --- 关键词词云生成脚本 (v4, 已修正HTML解析错误) ---

// ------------------- 可配置参数 -------------------
const MAX_PAGES_TO_SCAN = 2000;
const MAX_KEYWORDS_FOR_CLOUD = 150;
const MAX_KEYWORDS_FOR_TABLE = 10;
const MIN_KEYWORD_FREQUENCY = 10;
const EXCLUDED_KEYWORDS = [];
// ----------------------------------------------------


// 启动时先清理已有内容并显示加载提示
dv.container.innerHTML = '';
dv.paragraph("🔄 正在生成关键词词云，请稍候...");

// 使用 setTimeout(..., 0) 可以将任务推入事件队列，防止初始加载时阻塞UI
setTimeout(() => {
    // 1. 获取页面
    let query = dv.pages().where(p => p.keyword);
    if (MAX_PAGES_TO_SCAN > 0) {
        query = query.limit(MAX_PAGES_TO_SCAN);
    }
    const pages = query;

    // 2. 收集并统计关键词
    let keywordCount = {};
    let totalKeywords = 0;
    let scannedPages = 0;

    for (let page of pages) {
        scannedPages++;
        if (!page.keyword) continue;
        let keywords = [];
        if (Array.isArray(page.keyword)) {
            keywords = page.keyword;
        } else if (typeof page.keyword === 'string') {
            keywords = page.keyword.split(/[,;，；\s]+/);
        } else if (page.keyword) {
            keywords = [String(page.keyword)];
        }
        keywords.forEach(keyword => {
            if (!keyword) return;
            let cleanKeyword = String(keyword).trim();
            if (cleanKeyword && !EXCLUDED_KEYWORDS.includes(cleanKeyword.toLowerCase())) {
                keywordCount[cleanKeyword] = (keywordCount[cleanKeyword] || 0) + 1;
            }
        });
    }

    // 3. 数据后处理和筛选
    const allSortedKeywords = Object.entries(keywordCount)
        .filter(([, count]) => count >= MIN_KEYWORD_FREQUENCY)
        .sort(([, a], [, b]) => b - a);
    
    // 清理加载提示
    dv.container.innerHTML = '';

    // 4. 判断是否有结果
    if (allSortedKeywords.length === 0) {
        dv.paragraph("❌ 未找到符合条件的关键词。");
        dv.paragraph(`(已扫描 ${scannedPages} 篇笔记，要求关键词至少出现 ${MIN_KEYWORD_FREQUENCY} 次)`);
    } else {
        const cloudKeywords = allSortedKeywords.slice(0, MAX_KEYWORDS_FOR_CLOUD);
        const tableKeywords = allSortedKeywords.slice(0, MAX_KEYWORDS_FOR_TABLE);

        // 显示统计信息
        dv.paragraph(`📊 **词云统计**: 从 **${scannedPages}** 篇笔记中筛选出 **${allSortedKeywords.length}** 个高频词 (出现次数 >= ${MIN_KEYWORD_FREQUENCY})。`);
        if (MAX_PAGES_TO_SCAN > 0 && scannedPages >= MAX_PAGES_TO_SCAN) {
             dv.paragraph(`⚠️ **注意**: 已达到 **${MAX_PAGES_TO_SCAN}** 篇的扫描上限，结果可能不完整。`);
        }

        // ------------------- 词云渲染 (已修正) -------------------
        dv.header(3, `☁️ 关键词云 (Top ${cloudKeywords.length})`);
        if (cloudKeywords.length > 0) {
            const maxCount = cloudKeywords[0][1];
            const minCount = cloudKeywords[cloudKeywords.length - 1][1];
            const range = Math.max(maxCount - minCount, 1);
            const colors = ['#5E7CE2', '#4496EB', '#3DB8B2', '#76D39B', '#FAD362', '#F4A261', '#E76F51', '#D05379', '#8E5EB4'];

            const wordCloudHtml = cloudKeywords
                .sort(() => Math.random() - 0.5)
                .map(([keyword, count]) => {
                    const scale = Math.pow((count - minCount) / range, 0.7); 
                    const fontSize = 14 + scale * 34; 
                    const opacity = 0.7 + scale * 0.3; 
                    const rotation = Math.random() > 0.5 ? `transform: rotate(${(Math.random() - 0.5) * 25}deg);` : '';
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const fontWeight = (scale > 0.7) ? '600' : '400';

                    // 修正点：移除了 style 字符串中的所有 /* ... */ 注释
                    return `<span style="display: inline-block; margin: 2px 5px; font-size: ${fontSize.toFixed(1)}px; font-weight: ${fontWeight}; color: ${color}; opacity: ${opacity}; white-space: nowrap; cursor: default; ${rotation} transition: all 0.3s ease;" title="${keyword}: ${count}次">${keyword}</span>`;
                }).join('');

            dv.el('div', wordCloudHtml, {
                attr: {
                    // 修正点：移除了 style 字符串中的所有 /* ... */ 注释
                    style: `padding: 10px; text-align: center; line-height: 1.3; background: var(--background-secondary); border-radius: 8px; margin: 10px 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: center;`
                }
            });
        }
        // -----------------------------------------------------------

        // 生成详细统计表格
        dv.header(3, `📋 详细统计 (Top ${tableKeywords.length})`);
        const totalKeywordCountForTable = allSortedKeywords.slice(0, tableKeywords.length).reduce((sum, [, count]) => sum + count, 0);
        const tableData = tableKeywords.map(([keyword, count], index) => [
            index + 1,
            `[[${keyword}]]`,
            count
        ]);
        dv.table(['排名', '关键词', '出现次数'], tableData);
        if (allSortedKeywords.length > tableKeywords.length) {
            dv.paragraph(`💡 **提示**: 表格仅显示了 Top ${tableKeywords.length} 的结果。`);
        }
    }
}, 0);
```



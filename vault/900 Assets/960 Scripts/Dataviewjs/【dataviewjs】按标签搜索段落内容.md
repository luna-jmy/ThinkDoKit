---
created: 2025-09-21
area: Obsidian
type: readme
status: active
due_date:
priority: 3
tags:
source:
keywords:
---

改进方向：
- [ ] 标签通过内联字段在笔记内直接修改参数
- [ ] 支持多标签，And/Or搜索
- [x] 根据笔记修改时间排序（新到旧） ✅ 2025-09-22
- [x] 创建随机生其中一条内容的行内代码 ✅ 2025-09-22
- [ ] 生成一个基于关键词的段落内容查询
- [ ] 支持多参数查询：标签、关键词内联字段、文件夹范围

---

>[!info]+ 每日金句 
`$={await dv.view("random-quote")}`

---

文件夹范围：留空（全库）
标签：content/金句
限制输出：20条
排序：文件修改时间，降序

```dataviewjs
const pages = dv.pages('') // 可以指定特定文件夹，或留空搜索所有笔记
  .where(p => p.file.tags.includes("#content/金句"))
  .sort(p => p.file.mtime, 'desc'); // 根据修改时间降序排序

// 创建结果列表
let result = [];
for (let page of pages) {
  // 获取文件内容
  const file = app.vault.getAbstractFileByPath(page.file.path);
  const content = await app.vault.read(file);
  
  // 按行分割内容
  const lines = content.split('\n');
  
  // 查找包含标签的行及其上下文
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('#content/金句')) {
      // 获取该段落内容（假设段落以空行分隔）
      let paragraph = lines[i];
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== '') {
        paragraph += '\n' + lines[j];
        j++;
      }
      
      result.push({
        link: page.file.link,
        paragraph: paragraph,
        mtime: page.file.mtime // 保存修改时间用于排序
      });
    }
  }
}

// 根据修改时间降序排序并限制输出数量
result = result
  .sort((a, b) => b.mtime - a.mtime)
  .slice(0, 10); // 限制输出10条

// 显示结果
if (result.length > 0) {
  dv.table(["链接", "段落内容"], 
    result.map(r => [r.link, r.paragraph])
  );
} else {
  dv.paragraph("没有找到包含 #content/金句 的段落");
}
```


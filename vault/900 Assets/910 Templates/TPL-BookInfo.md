---
豆瓣id: "{{id}}"
书名: "{{title}}"
副标题: "{{subTitle}}"
原作名: "{{originalTitle}}"
丛书: "{{series}}"
类型: "{{type}}"
author: "{{author}}"
豆瓣评分: "{{score}}"
出版时间: "{{datePublished}}"
译者: "{{translator}}"
出版社: "{{publisher}}"
出品方: "{{producer}}"
ISBN: "{{isbn}}"
豆瓣页面: "{{url}}"
总页数: "{{totalPage}}"
定价: "{{price}}"
装帧: "{{binding}}"
封面: "{{imageData.url}}"
created: "{{currentDate}}"
阅读状态: <% tp.system.suggester(["在读","已读","想读","待读"],["在读","已读","想读","待读"],false,"请选择阅读状态") %>
我的评级: <% tp.system.suggester(["⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"],["⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"],false,"请给书籍打分") %>
备注: 
开始时间: 
读完时间: 
本地封面图: "{{image}}"
短评: <% tp.system.prompt("请输入书籍短评。稍后输入直接跳过/关闭即可") %>
tags: 
obsidianUIMode: preview
---

> [!bookinfo]+ **《{{title}}》** 
> ![[{{image}}|200]]
>
| 作者   | `=this.file.link.作者`                           |
|:------: |:------------------------------------------: |
| ISBN   | `=this.file.link.ISBN`                             |
| 出版年 | `=this.file.link.出版时间`                      | 
| 出版社 | `=this.file.link.出版社`                          |
| 来源   | `=this.file.link.豆瓣页面` |
| 豆瓣评分   |  `=this.file.link.豆瓣评分`                            |
| 页码   | `=this.file.link.总页数`                        |
| 标签分类   | `=this.file.etags`                     |
| 我的评级  | `=this.file.link.我的评级`                     |

> [!abstract]- ### **内容简介**
> {{desc}}

### **目录**
{{menu}}

### 📓**我的书摘&笔记**
-  [[【书摘】{{title}}]]

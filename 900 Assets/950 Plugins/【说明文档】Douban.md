---
obsidianUIMode: preview
type: readme
---

这是一款[Obsidian](https://obsidian.md/)插件，支持在Obsidian中导入[豆瓣](https://github.com/Wanxp/obsidian-douban/blob/master)中的 _电影、书籍、音乐、电视剧、日记、游戏_  
甚至是 _你标记过的书影音_ , 包含你的评分、观看日期、评论、阅读状态等信息.

访问[Get Started/指导手册](https://wanxp.github.io/obsidian-douban/) 获取更多
![[../../900 Assets/990 Attachments/GitHub - Wanxp - obsidian-douban -  an obsidian plugin that can pull data from douban to your markdown file/c8c4b1dd078799413b354f4997fc11ef_MD5.png]]

## 功能

- ☑️ 导入电影、电视剧、书籍、音乐、游戏、日记
- ☑️ 同步个人听过/看过的电影、电视剧、书籍、音乐、游戏
- ☑️ 导入个人的评论,评论时间,阅读状态,个人评分
- ☑️ 支持保存封面至本地/图床
    - ⬜ 支持图床自定义
- ☑️ 支持自定义参数
- ☑️ 支持移动端导入

## 效果

1. 结合Timeline插件 **构建个人观影时间线**，请参照[结合timeline插件实现时间线效果](https://github.com/Wanxp/obsidian-douban/blob/master/doc/Obsidian-Douban-TimeLine.md) ![[../../900 Assets/990 Attachments/GitHub - Wanxp - obsidian-douban -  an obsidian plugin that can pull data from douban to your markdown file/b4e8151ce4423ded6df5a3f93c72cda3_MD5.gif]]
2. 结合主题 **构建类豆瓣网页效果**，请参照[结合Blue Topaz实现网页效果](https://github.com/Wanxp/obsidian-douban/blob/master/doc/Obsidian-Douban-BlueTopaz.md) ![[../../900 Assets/990 Attachments/GitHub - Wanxp - obsidian-douban -  an obsidian plugin that can pull data from douban to your markdown file/c8c4b1dd078799413b354f4997fc11ef_MD5.png]]
## 如何使用

### 搜索

使用方式： 输入Ctrl + P，输入“豆瓣”或“Douban”，选择搜索并使用

- 搜索数据并创建笔记
- 通过当前文件名搜索
- 通过输入文本搜索 ![[../../900 Assets/990 Attachments/GitHub - Wanxp - obsidian-douban -  an obsidian plugin that can pull data from douban to your markdown file/05a5e567fd7126e7bb9ec696b668dbbd_MD5.gif]]

### 同步

- 同步个人的观影、观剧、阅读、游戏、音乐记录  
    ![[../../900 Assets/990 Attachments/GitHub - Wanxp - obsidian-douban -  an obsidian plugin that can pull data from douban to your markdown file/6acd3c8ead52566256ee0613e743c466_MD5.gif]]

## 设置

- 设置豆瓣账号(可选，可使用少部分功能)
- 设置导入模板(可选，不设置的情况下使用默认模板)
- 设置导入路径(可选，不设置的情况下使用默认路径)

## 支持的字段

(若有缺少想导入的字段, 欢迎提issues反馈)

| 字段               | 电影                | 电视剧               | 书籍                | 音乐             | 日记             | 游戏            | 人物    |
| ---------------- | ----------------- | ----------------- | ----------------- | -------------- | -------------- | ------------- | ----- |
| id               | 豆瓣ID              | 豆瓣ID              | 豆瓣ID              | 豆瓣ID           | 豆瓣ID           | 豆瓣ID          | id    |
| title            | 电影名称              | 电视剧名称             | 书名                | 音乐名            | 日记标题           | 游戏名称          | 姓名    |
| type             | 类型                | 类型                | 类型                | 类型             | 类型             | 类型            | 类型    |
| score            | 评分                | 评分                | 评分                | 评分             | 评分             | 评分            |       |
| scoreStar        | 评分⭐               | 评分⭐               | 评分⭐               | 评分⭐            | 评分⭐            | 评分⭐           |       |
| image            | 封面                | 封面                | 封面                | 封面             | 图片             | 封面            | 照片    |
| imageData.url    | 封面url             | 封面url             | 封面url             | 封面url          | 封面url          | 封面url         | 照片url |
| url              | 豆瓣网址              | 豆瓣网址              | 豆瓣网址              | 豆瓣网址           | 豆瓣网址           | 豆瓣网址          | 豆瓣网址  |
| desc             | 简介                | 简介                | 内容简介              | 简介             | 简介             | 简介            | 简介    |
| publisher        | -                 | -                 | 出版社               | 出版者            | 发布者            | 发行商           | -     |
| datePublished    | 上映日期              | 上映日期              | 出版年               | 发行时间           | 发布时间           | 发行日期          | -     |
| yearPublished    | 上映年份              | 上映年份              | 出版年份              | 发行年份           | 发布年份           | 发行年份          | -     |
| genre            | 类型                | 类型                | -                 | 流派             | -              | 类型            | -     |
| currentDate      | 今日日期              | 今日日期              | 今日日期              | 今日日期           | 今日日期           | 今日日期          |       |
| currentTime      | 当前时间              | 当前时间              | 当前时间              | 当前时间           | 当前时间           | 当前时间          |       |
| myTags           | 我标记的标签            | 我标记的标签            | 我标记的标签            | 我标记的标签         | -              | 我标记的标签        |       |
| myRating         | 我的评分              | 我的评分              | 我的评分              | 我的评分           | -              | 我的评分          |       |
| myState          | 状态:想看/在看/看过       | 状态:想看/在看/看过       | 状态:想看/在看/看过       | 状态:想听/在听/听过    | -              | 状态:想玩/在玩/玩过   |       |
| myComment        | 我的评语              | 我的评语              | 我的评语              | 我的评语           | -              | 我的评语          |       |
| myCollectionDate | 我标记的时间            | 我标记的时间            | 我标记的时间            | 我标记的时间         | -              | 我标记的时间        |       |
| 扩展1              | director:导演*      | director:导演*      | author:原作者        | actor: 表演者     | author:作者      | aliases:别名    |       |
| 扩展2              | author:编剧*        | author:编剧*        | translator:译者     | albumType:专辑类型 | authorUrl:作者网址 | developer:开发商 |       |
| 扩展3              | actor:主演*         | actor:主演*         | isbn:isbn         | medium:介质      | content:日记内容   | platform:平台   |       |
| 扩展4              | originalTitle:原作名 | originalTitle:原作名 | originalTitle:原作名 | records:唱片数    |                |               |       |
| 扩展5              | country:国家        | country:国家        | subTitle:副标题      | barcode:条形码    |                |               |       |
| 扩展6              | language:语言       | language:语言       | totalPage:页数      |                |                |               |       |
| 扩展7              | time:片长           | time:片长           | series:丛书         |                |                |               |       |
| 扩展8              | aliases:又名*       | aliases:又名*       | menu:目录           |                |                |               |       |
| 扩展9              | IMDb              | IMDb              | price:定价          |                |                |               |       |
| 扩展7              |                   | episode:集数        | binding:装帧        |                |                |               |       |
| 扩展8              |                   |                   | producer: 出品方     |                |                |               |       |

- 注: myTags, myRating, myRatingStar:⭐ , myState, myComment, myCollectionDate 参数均为在插件中登录后可用

## 影响

注意: 除了在同步书影音数据时勾选 `替换同名文档` 有可能会修改同路径同文档名的笔记外，其余操作均不会修改已有笔记。

|操作|条件|影响|举例|
|---|---|---|---|
|导入书影音数据|默认条件|新建一条名为所选条目的笔记|如搜索蝙蝠侠并选中导入，则会创建笔记 《蝙蝠侠》|
|导入书影音数据|已有同名笔记|无任何影响，提示已经存在同名笔记，不会修改已有笔记|如搜索蝙蝠侠并选中导入，但因存在同路径同名称笔记，则会不会创建笔记|
|导入书影音数据|配置 `笔记名称`值包含路径|若没有此路径则会创建对应文件名|如搜索蝙蝠侠并选中导入，配置`笔记名称`值为`/data/{{type}}/{{title}}`，则会创建文件夹`data/电影`|
|导入书影音数据|配置 `保存图片附件`值为勾选|则会在`附件存放位置`指定位置保存封面图片|如搜索蝙蝠侠并选中导入，配置`附件存放位置`值为`assets`，则会在`assets`文件夹中保存封面文件`p462657443.jpg`|
|同步书影音数据|以上所有|以上所有|以上所有|
|同步书影音数据|`替换同名文档`值为勾选|已经存在 **同路径同文档名** ，直接覆盖|如已经存在在`data/Movie/蝙蝠侠.md`,配置`笔记名称`值为`/data/{{type}}/{{title}}`, 同步书影音记录时勾选 `替换同名文档`, 则`data/Movie/蝙蝠侠.md`会被替换成最新|
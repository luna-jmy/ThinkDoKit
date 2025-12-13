---
created: 2025-09-26
area: Obsidian
type: readme
status: completed
priority: 4
tags:
source:
keywords:
  - callouts
  - css样式
  - 高亮样式
cssclasses:
  - matrix
---

>*BlueTopaz主题支持的效果。不开启自定义css，不开启插件即可实现的效果*

## 涂黑和挖空效果（三种语法）

- `删除+高亮组合：==~~xx~~==`鼠标悬浮触发
- `删除+高亮+斜体组合：*==~~xx~~==*`点击触发
- `删除+斜体组合：*~~xx~~*`点击触发无背景颜色

### 例子1 

>[!NOTE|center] 
> 劝学
>[唐] [颜真卿]
>
三更灯火五更鸡，*==~~正是男儿读书时~~==*。
==~~黑发不知勤学早~~==，白首方悔读书迟。

>[!NOTE|noborder,center] 
>咏柳
[唐] [贺知章]
碧玉妆成一树高，万条垂下绿丝绦。
*~~不知细叶谁裁出~~*，二月春风似剪刀。

### 例子2
> [!success |noborder,center]+  **将进酒**
>
>[唐] [李白]
>
君不见黄河之水天上来，奔流到海不复回。
君不见高堂明镜悲白发，朝如青丝暮成雪。
*~~人生得意须尽欢~~*，莫使金樽空对月。
天生我材必有用，*~~千金散尽还复来~~*。
烹羊宰牛且为乐，会须一饮三百杯。
岑夫子，丹丘生，将进酒，杯莫停。
>
与君歌一曲，请君为我倾耳听。
钟鼓馔玉何足贵，但愿长醉不复醒。
古来圣贤皆寂寞，*~~惟有饮者留其名~~*。
陈王昔时宴平乐，斗酒十千恣欢谑。
主人何为言少钱，径须沽取对君酌。
五花马，千金裘，
*~~呼儿将出换美酒~~*，与尔同销万古愁。 


## 各类checkbox
> 完整checkbox支持需要css片段 【图标】checkbox.css
- [ ] Unchecked `- [ ]`
- [x] Checked `- [x]`
- [>] Rescheduled `- [>]`
- [<] Scheduled `- [<]`
- [!] Important `- [!]`
- [-] Cancelled `- [-]`
- [/] In Progress `- [/]`
- ["] Quote`- ["]`
- [?] Question `- [?]`
- [*] Star `- [*]`
- [n] Note `- [n]`
- [l] Location `- [l]`
- [i] Information `- [i]`
- [I] Idea `- [I]`
- [S] Amount `- [S]`
- [p] Pro `- [p]`
- [c] Con `- [c]`
- [b] Bookmark `- [b]`
- [f] Fire `- [ f ]`
- [w] Win `- [w]`
- [k] Key `- [k]`
- [u] Up `- [u]`
- [d] down `- [d]`
- [F] Feature `- [F]`
- [r] Rule `- [r]`
- [m] Measurement `- [m]`
- [M] Medical `- [M]`
- [L] Language `- [L]`
- [t] Clock `- [t]`
- [T] Telephone `- [T]`
- [P] Person `- [P]`
- [#] Tags `- [#]`
- [W] World `- [W]`
- [U] Universe `- [U]`


## 便签效果
%%应该是没有修复的主题bug，只有便签1在阅读模式下可以嵌入到正文里；另外2个都是单独占据整行的%%

> - 主题之前内置的便签依赖html 语法，目前便签已移植到callout语法，并支持三种便签类型
> - 目前有四种色系属性可以叠加分别是 `blue`   `pink`  `green`  `yellow`

> [!stickies] 
> 我是一个小小便签目前一共有三个类型

内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容

> [!stickies2] 
> 美好的事情即将发生好的事情即将
> - 1333
> - 4444
> - 55555

内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容

> [!stickies3|center,blue] 
> 美好的事情即将发生好的事情即将
> - 1333
> - 4444
> - 55555

内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容

## ob提示框(callout)样式展示
> Obaidian 0.14.2 版本后增加了Callout功能，这个功能就是之前 admonition(简称ad插件) 插件收编的，目前语法跟Microsoft Docs 一致。之前用ad插件设置的提示框可以一键转换成最新的语法样式。

### 目前支持的样式列表
### 官方示例
%%结合主题特有的多彩背景、多彩文字、回顾隐藏文本功能；这些功能如果不写在callout里，预览模式下不会自动渲染%%

#### 提示框类型
> [!note]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].

> [!abstract]
> ```note-imp
>重要文本框
>```

>[!todo]
>```note-cloze
>可以点击To Recall下方长条，显示隐藏的文本
>```

> [!info]
> ```hibox
>鼠标悬浮
>```

> [!tip]
>```note-orange
>彩色文字 note-color；颜色选项：orange, yellow, green, blue, purple, pink, red, gray, brown
>```

> [!success]
>```note-orange-bg
>彩色背景文本框 note-color-bg 或 note-color-background，颜色选项同上
>```

> [!question]

> [!warning]

> [!failure]

> [!danger]

> [!bug]

> [!example]

> [!quote]


除了info 类型还支持以下类型
- note
- abstract, summary, tldr
- info, todo
- tip, hint, important
- success, check, done
- question, help, faq
- warning, caution, attention
- failure, fail, missing
- danger, error
- bug
- example
- quote, cite

### 提示框的各种用法

1. 可以没有内容直接显示标题
> [!TIP] Callouts can have custom titles, which also supports **markdown**!

2. 折叠提示框
> [!FAQ]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden until it is expanded.

3. 自定义提示框
可以通过css设置my-callout-type 的样式

```css
.callout[data-callout="my-callout-type"] {
    --callout-color: 0, 0, 0;
    --callout-icon: icon-id;
    --callout-icon: '<svg>...custom svg...</svg>';
}
```

### 主题自定义示例
#### 目前支持的callout类型
通过添加callout类型，实现各类样式控制。下面以Blue Topaz主题内置的callout样式举例说明，目前支持的callout样式有：

| Callout类型           | 解释                     | 使用                                   |
| ------------------- | ---------------------- | ------------------------------------ |
| cloze               | 字体模糊效果                 | >[!cloze]                            |
| kanban              | 伪看板 无序列表并列             | >[!kanban]                           |
| hibox               | 自动隐藏框                  | >[!hibox]                            |
| bookinfo            | 图书卡片(图片表格左右分布)         | >[!bookinfo]                         |
| xx%                 | callout宽度xx代表10-100的数值 | >[!30%]                              |
| right\|left\|center | callout布局位置            | >[!right] <br>>[!left]<br>>[!center] |
| indent              | 全文自动缩进2字符              | >[!indent]                           |
| blank               | callout 全透明块           | >[!blank]                            |
| timeline            | 时间线样式                  | [[#时间线风格 左右分栏 笔记]]                   |

**注意 以上类型都可以互相组合使用，具体看下面例子**
Ob 0.14.5 以后支持 metadata写法 也就是用管道分割
比如`> [!note|right]` 把一些属性信息用竖线分割，这样就不会影响callout类型。管道后的参数就是metadata。

#### 目前支持metadata的属性

|属性名称            |解释                          |
| ------------------- | ----------------------------- |
| xx%                 | callout宽度xx代表10-100的数值 |
| right\|left\|center | callout布局位置               |
| indent              | 全文自动缩进2字符             |
| nowrap              | 元素不换行(包括图片横排显示)                    |
| noicon              | 隐藏callout图标               |
| banner              | 可以用图片作为callout标题     |
| notitle             | 隐藏callout标题栏             |
| noborder            | 隐藏callout边框             |
| grid                | 元素网格化布局                | 

### 模糊字体

>[!cloze]
>隐藏文本

### 伪看板 kanban

> [!kanban]+ Callout 看板测试
>- [ ] callout 看板测试
>	- [ ] 3333
>	- [ ] 3333
>		- [ ] 333
>		- [ ] 333
>- [ ] 第二个菜单22
>	- [ ] 子列表
>- [ ] 第三个菜单 最好在源码模式下编辑
>	- [ ] 测试测333
>	- [ ] 测试测444
>- [ ] 22222
>- [ ] 2234444
>- 555555
>- 777777

### 自动隐藏框 hibox

>[!hibox]
>这是可以自动隐藏的文字部分
>- 122333
>- [ ] 3333
>	- [x] 33333
>- [ ] 4444

### 信息卡 infobox

> [!Infobox|notitle right 45%]+ ## 关羽
>![[Pasted image 20251006163810.png|circle]]
> 
| 本名     | 关羽                          |
|:-------- |:--------------------------------------------- |
| 别名     | 关云长、关公、汉寿亭侯、武圣                 |
| 昵称     | 二爷                                                                 |
| 国籍     | 中国                                       |
| 出生     | 约160年                                |
| 逝世     | 220年（约60岁）               |
| 职业     | 将领                              |
| 活跃年代 | 东汉末年                       |
| 相关人士 | 大哥：刘备<div>三弟：张飞<br></div><div>子女：关平、关银屏<br></div> |

> [!tip|indent] 三国人物--关羽
> 关羽早年因杀人逃离家乡，奔向涿郡，在此处结识刘备与张飞，三人相谈甚欢，恩若兄弟。
> 建安五年（200年）刘备投奔袁绍，关羽被曹操捉拿后担任偏将军，在万军之中斩杀颜良，立下了大功。不过之后关羽离开曹操阵营投奔刘备，曹操并未挽留，而是认为“彼各为其主”，放他离开了。
> 之后关羽跟随刘备投奔刘表，刘表去世后刘备在南逃过程中派遣关羽带领数百艘船前往江陵，并在被曹操追杀后成功与之汇合，一同前往夏口。在刘备平定益州后关羽总督荆州诸事，并在之后进行了刮骨疗毒的壮举。
> 建安二十四年（219年）刘备自封为汉中王，赐关羽前将军之职，之后在樊城之战中一举斩落庞德，威震华夏。但之后由于孙权反水偷袭以及部下倒戈东吴，关羽军队溃散，败走麦城，被孙权部将抓获，同年十二月在临沮被斩杀。
> 之后孙权将关羽的头颅送给曹操，曹操以诸侯之礼下葬于洛阳，孙权则将身躯下葬于当阳。后被蜀后主刘禅追谥为壮缪侯。
> 关羽去世后，民间尊为“关公”，历代朝廷多有褒封。清朝雍正时期，尊为“武圣”，与“文圣”孔子地位等同。在小说《三国演义》中，名列“五虎上将”之首，使用青龙偃月刀。毛宗岗称其为《演义》三绝中的“义绝”。在宗教文化方面，关羽被道教尊为关圣帝君、文衡帝君，被佛教尊为护法伽蓝菩萨（伽蓝神） 、盖天古佛，被道教尊为协天大帝、翔汉天神等。

### 图书信息卡片 bookinfo

> [!bookinfo]+ 《从零开始的女性主义》
> ![bookcover|200](https://img2.doubanio.com/view/subject/l/public/s33984963.jpg)
>
| 属性     | 内容                                           |
|:-------|:---------------------------------------------|
|  ISBN  |  9787559652317                              |
|  作者    |   '[日]上野千鹤子/[日]田房永子'                           |
|  出版社   |  北京联合出版公司                           |
|  来源    |  [从零开始的女性主义](https://book.douban.com/subject/35523099/)  |
|  评分    |   8.7                             |
|  页码    |  192                         |

### 自定义宽度 位置 

> 目前支持的位置属性有 right，center，left
支持的宽度属性 10%-100% 比如10% 15% 20% 等
它们可以组合使用，支持下面两种写法

```html
 > [!note|30%]
 > [!note 30%]
```


> [!note|right 35% indent ]+ TextBox
> With the development of Chinese economy, the world is watching us. More and more foreigners have sensed the great potential market and come to China to seek for cooperation. Chinese film market had been ignored before, but now more Hollywood directors show their willingness to work with Chinese actors, so as to catch more Chinese audiences and increase the box office.   

> [!tips right 35% ]+ Title
>  Indeed, Chinese box office is increasing every year, even surpasses the foreign’s, which makes the foreign directors pay so much attention to Chinese audiences. It also shows that China has influnced the world and it plays more and more important role in the world economy. There is no doubt that more cooperations will happen during foreign enterprises and Chinese business. 

With the development of Chinese economy, the world is watching us. More and more foreigners have sensed the great potential market and come to China to seek for cooperation. Chinese film market had been ignored before, but now more Hollywood directors show their willingness to work with Chinese actors, so as to catch more Chinese audiences and increase the box office.  
 Indeed, Chinese box office is increasing every year, even surpasses the foreign’s, which makes the foreign directors pay so much attention to Chinese audiences. It also shows that China has influnced the world and it plays more and more important role in the world economy. There is no doubt that more cooperations will happen during foreign enterprises and Chinese business.
 > [!tips center]+ Title
>  Indeed, Chinese box office is increasing every year, even surpasses the foreign’s, which makes the foreign directors pay so much attention to Chinese audiences. It also shows that China has influnced the world and it plays more and more important role in the world economy. There is no doubt that more cooperations will happen during foreign enterprises and Chinese business. 
 With the development of Chinese economy, the world is watching us. More and more foreigners have sensed the great potential market and come to China to seek for cooperation. Chinese film market had been ignored before, but now more Hollywood directors show their willingness to work with Chinese actors, so as to catch more Chinese audiences and increase the box office.  

### 首行缩进2字符 indent 
> 支持下面两种写法

```html
 > [!note|indent]
 > [!note indent]
```

> [!NOTE|indent] Title
> In China, millions of high school students will take part in the very important exam on June, it is the turning point of their lives, because the exam will decide what kind of university they will enter. Most people believe that it even decides their fates. While it is just the beginning of their new lives.
在中国,数以百万计的高中学生会在6月参加重要的考试,这是他们生活的转折点,因为考试将决定他们将进入什么样的大学。大多数人认为,这甚至决定他们的命运。然而这只是他们的新生活的开端。
When high school students finish their study, it is time to think about what kind of major they need to choose. This is a very important question, choosing a major needs to consider many factors. The first is about interest. Studying with passion can make a student happy and love what the major. The second is about foreground. The major always decide the future job, so students need to think about the prospect.
当高中学生完成他们的学业,是时候考虑需要选择什么样的专业。这是一个非常重要的问题,选择专业需要考虑很多因素。第一个是关于兴趣。有激情的学习可以让学生感受到快乐和爱。第二个是关于前景。专业总会决定未来的工作,所以学生需要思考前景。

> [!Example|nowrap] 表格 图片等元素单行显示 nowrap
> 
![](https://i.pinimg.com/564x/13/1f/e4/131fe4d97e3be0a49a5d07431a917d31.jpg)
![](https://i.pinimg.com/564x/84/6c/1c/846c1cab0d47dd7970f9a008eeebd68f.jpg)
![](https://s1.ax1x.com/2022/05/18/OI7Io9.png)
![](https://i.pinimg.com/564x/84/6c/1c/846c1cab0d47dd7970f9a008eeebd68f.jpg)
![](https://i.pinimg.com/564x/c5/0f/09/c50f09d991dfcfdbea600ff139739fd8.jpg)
![](https://i.pinimg.com/564x/a4/94/01/a494019c68ed85630de16cf8f32523f0.jpg)
![[obsidian_image.png]]
![[obsidian_image.png]]
> 
| 表头1                                                    | 表头2表头2                                                 | 表头3                                                                      |
|:-------------------------------------------------------|:-------------------------------------------------------|:-------------------------------------------------------------------------|
| 这是很长的表格内容看 会不会自动换行                                     | 这是很长的表格内容看 会不会自动换行                                     | 这是很长的表格内容看 会不会自动换行                                                       |
| 这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行 | 这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行 | 这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行这是很长的表格内容看 会不会自动换行 |


> [!Example|noborder grid]+ 表格 图片等元素网格显示 grid
> 
![](https://i.pinimg.com/564x/13/1f/e4/131fe4d97e3be0a49a5d07431a917d31.jpg)
![](https://i.pinimg.com/564x/84/6c/1c/846c1cab0d47dd7970f9a008eeebd68f.jpg)
![](https://s1.ax1x.com/2022/05/18/OI7Io9.png)
![](https://i.pinimg.com/564x/84/6c/1c/846c1cab0d47dd7970f9a008eeebd68f.jpg)
![](https://i.pinimg.com/564x/c5/0f/09/c50f09d991dfcfdbea600ff139739fd8.jpg)
![](https://i.pinimg.com/564x/a4/94/01/a494019c68ed85630de16cf8f32523f0.jpg)


---

##  时间线风格 左右分栏 笔记
### 语法
```
> [!timeline] 
>>这里写左栏内容
> ---
正文内容也就是右栏目内容。
```

> timeline类型 分三部分，左栏，中间分割线，右栏。
左栏用>> 右栏> 分割线用 --- 这样就可以组织笔记了。

### 示例效果
#### 左右分栏 康奈尔笔记效果

> [!timeline] 演示
>> 左栏目内容左栏目内容左栏目内容左栏目内容左栏目内容左栏目内容
>--- 
>- 右栏目内容右栏目内容
>- 可以用列表 等md语法 但同类型格式才能排布一起
>
>> 需要右栏目的话 多加一个引用符号即可
>
>右栏目跟左栏目内容需要空一行进行分割
>这样就会识别
>>这是左栏目内容
>
>右栏目内容
>> 左边内容输入完回车两次即可
>
>右栏目内容
>右边内容
>支持复杂的md语法 比如下面的例子

> [!timeline]+  **计算机系统**
>>- 什么是计算机系统
> ---
计算机系统指用于数据库管理的计算机硬软件及网络系统。数据库系统需要大容量的主存以存放和运行操作系统、数据库管理系统程序、应用程序以及数据库、目录、系统缓冲区等，而辅存则需要大容量的直接存取设备。此外，系统应具有较强的网络功能。 
>>- 计算机系统的组成
>
计算机系统由硬件（子）系统和软件（子）系统组成。前者是借助电、磁、光、机械等原理构成的各种物理部件的有机组合，是系统赖以工作的实体。后者是各种程序和文件，用于指挥全系统按指定的要求进行工作。

> [!question]+ 思考内容
> - 专用机的特点是什么?
>- 如何自己做一台计算机?

> [!timeline]+ 时间线样式--近代中国史
> >  1840年6月
> ---
英军发动鸦片战争
> >1842年8月
> 
清政府与英国签订《南京条约》:
1）中国割让香港岛给英国;
2）赔款洋银2100万元;
3）开放广州、厦门、福州、宁波、上海五处为通商口岸;
>> [!cite]+ 《南京条约》影响
>>1. 中国近代史上第一个不平等条约，给中国人民带来深重的灾难，开创了列强以条约形式侵略和奴役中国的恶例;
>2. 中国的国家主权和领土完整遭到破坏，逐步沦为半殖民地半封建社会;
>3. 中国社会的主要矛盾由地主阶级与农民阶级的矛盾，演变为帝国主义和中华民族的矛盾（主要矛盾)、封建主义和人民大众的矛盾;
>4. 反侵略反封建成为中国人民肩负的两大历史任务;
>5. 中国逐渐开始了反帝反封建的资产阶级民主革命。
>
| | |
 | ------ | -------------------------------------- |
 | 1943年 | 中英《虎门条约》签订;                  |
 | 1844年 | 中关《望厦条约》、中法《黄埔条约》签订 | 
> >1841年5月
> 
> 三元里人民的抗英斗争，是中国近代史上中国人民第一次大规模的反侵略武装斗争。
>![ ](https://tse1-mm.cn.bing.net/th/id/R-C.4bbce1406f4442c1360edde26baa894d?rik=iHeUeby0jS5lnw&riu=http%3a%2f%2fp8.qhmsg.com%2fdr%2f270_500_%2ft01dbb76ff833d0a159.jpg&ehk=yggnC0t62%2b6DEVjvBgs%2fXJuuexBucd66FTc5gL0Gw%2fA%3d&risl=&pid=ImgRaw&r=0)
>>1842年
>
> 魏源编著《海国图志》，提出"师夷长技以制夷”
>>1851年1月
>
>洪秀全金田村发动起义，建号太平天国。1853年3月，占领南京,定为首都,改名天京，正式宜告太平天国农民政权的建立。颁布《天朝天亩制度》、天平军北伐
>

---

## 强调
在笔记中，不可避到一些强调方式，比如加粗、高亮等等，这里做一个展示：
*斜体*
**加粗**
***加粗斜体***
`行内代码（也会被人当作强调方式使用）`
==高亮==
==*斜体高亮*==
*==符号反过来也行==*
==**加粗高亮**==
==***加粗斜体高亮***==
==高亮`行内代码`== (有点怪是吧= =||)

---

## 主题内置的 cssclass 样式表

| cssclass           | 用法                     |
| ------------------ | ---------------------- |
| colorful-highlight | 实时预览模式下正确显示多彩高亮        |
| noscroll           | 【阅读模式生效】隐藏当前页面滚动条      |
| fullwidth          | 缩减栏宽开启下，控制页面全宽显示       |
| matrix             | 【阅读模式生效】四象限表格样式        |
| cards              | 对 dataview 表格渲染成卡片视图   |
| cloze              | 实时预览模式下正确显示涂黑和挖空效果     |
| kanban             | 伪看板的样式，无序列表四分栏         |
| noyaml             | 预览状态不显示 frontmatter 区域 |
| fullwidth          | callout 实现文章环绕，全文缩进效果  |
| code-wrap          | 代码块自动换行                |
| img-grid           | 图片自适应分布                |
| inline-list        | 图片和列表混排                |








---
created: <% tp.file.creation_date("YYYY-MM-DD") %>
area: 人际关系
type: contacts
priority: <% tp.system.prompt("请输入亲密度") %>
status: <% tp.system.prompt("请输入状态") %>
证件姓名: <% tp.system.prompt("请输入证件姓名") %>
photo:
英文名: <% tp.system.prompt("请输入英文名") %>
aliases: [<% tp.system.prompt("请输入别名/花名") %>]
keywords:
birthday:
阴历生日:
关系: <% tp.system.suggester(["1-同事", "2-同学", "3-朋友","4-亲戚"],["同事", "同学", "朋友","亲戚"]) %>
个人手机: <% tp.system.prompt("请输入手机号") %>
公司手机:
微信:
电子邮箱:
remark:
所在地:
籍贯:
---

`button-sjournalMetadata`

## 个人信息 `button-supdate`
[生日::]  （生肖：、星座：、年龄）
[血型::] 
[民族::] 
[住所::] 
[籍贯::] 
[毕业院校::] 
[专业::] 
[学历::] 
[个人信息备注::] 
[兴趣爱好::]
[特长::]
[给我的印象::]

---

## 共同认识的人 

---

## 职业履历

| 时间    | 公司   | 职务  | 工作内容/备注 |
| ----- | ---- | --- | ------- |
| 年月-年月 | 公司名称 | 职位  |         |

---

## 家庭情况  `button-supdate`
[配偶::]
[子女::]
[父::]
[母::]

---

## 人际事件  `button-supdate`
[认识缘由::]
[第一次见面地点::]
[第一次见面时间::]

---

## 关联日志：

## 照片

## 事件日志



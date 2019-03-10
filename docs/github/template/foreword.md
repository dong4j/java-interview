# 序言类模板

::: warning 注意
为了更好的阅读体验, 序言类文档不需要写大量文字, 只是一个导读作用.

作为一个引导类文档, 需要将涉及到的文章全部写在 `扩展阅读` 标签中, 方便文章引导.

序言类文档的 sidebar 设置为 `sidebar: false`

需要写一级标题, 而 `sidebar: auto` 时不需要写
:::

```markdown
---
sidebar: false
prev: 
next: xxx
title: 标题
date: 2019-03-10 00:25
author: author
tags:
- 关键词
---

# 标题

::: tip 简介
简介内容
:::

<!-- more -->

## 正文

::: tip 扩展阅读
- [👉 标题](引用的文档相对位置)
:::

**参考与引用:**

- [xxx](https://xxxx)
- [xxx](https://xxxx)
- ...
```
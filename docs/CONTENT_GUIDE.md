# 个人主页内容管理指南

> 本指南教你如何在自己的网站上添加博客、项目和修改个人信息。

---

## 目录

1. [添加博客文章](#1-添加博客文章)
2. [添加项目](#2-添加项目)
3. [修改个人信息](#3-修改个人信息)
4. [替换图片资源](#4-替换图片资源)
5. [提交并部署](#5-提交并部署)

---

## 1. 添加博客文章

### 文件位置
```
src/content/blog/
```

### 创建新文章
1. 在 `src/content/blog/` 目录下创建新的 `.md` 文件
2. 文件名会成为 URL 的一部分（例如：`my-post.md` → `/blog/my-post`）

### 文章格式

```markdown
---
title: '文章标题'
description: '文章简短描述，会显示在文章列表中'
pubDate: '2026-03-11'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['标签1', '标签2']
---

## 正文开始

这里是文章内容，支持完整的 **Markdown** 语法。

### 支持的语法

- **粗体** 和 *斜体*
- [链接](https://example.com)
- `代码`
- 列表

#### 代码块

```javascript
const greeting = 'Hello, World!';
console.log(greeting);
```

#### 引用

> 这是一段引用文字

#### 图片

![图片描述](图片路径)
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `description` | ✅ | 文章描述，显示在列表页 |
| `pubDate` | ✅ | 发布日期 |
| `heroImage` | ❌ | 封面图片路径 |
| `tags` | ❌ | 标签数组 |

### 示例：创建一篇技术博客

文件：`src/content/blog/learn-typescript.md`

```markdown
---
title: 'TypeScript 学习笔记'
description: '记录学习 TypeScript 的过程和心得体会'
pubDate: '2026-03-11'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['TypeScript', '学习笔记', '前端']
---

## 为什么学 TypeScript

TypeScript 是 JavaScript 的超集，添加了静态类型检查...

## 基础类型

```typescript
let name: string = 'Alice';
let age: number = 25;
let isStudent: boolean = true;
```

## 总结

TypeScript 让代码更安全，开发体验更好！
```

---

## 2. 添加项目

### 文件位置
```
src/content/projects/
```

### 创建新项目
1. 在 `src/content/projects/` 目录下创建新的 `.md` 文件
2. 文件名会成为 URL 的一部分（例如：`my-app.md` → `/projects/my-app`）

### 项目格式

```markdown
---
title: '项目名称'
description: '项目简短描述，会显示在项目卡片上'
pubDate: 2026-03-11
heroImage: ../../assets/blog-placeholder-1.jpg
tags: ['技术栈1', '技术栈2']
url: https://项目演示地址.com
repo: https://github.com/你的用户名/项目名
---

## 项目简介

这里是项目的详细介绍...

## 功能特点

- 功能 1
- 功能 2
- 功能 3

## 技术栈

- 前端：Vue 3 + TypeScript
- 后端：Node.js + Express
- 数据库：PostgreSQL

## 截图

![项目截图](图片路径)
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 项目名称 |
| `description` | ✅ | 项目描述，显示在卡片上 |
| `pubDate` | ✅ | 创建日期 |
| `heroImage` | ❌ | 项目封面图片 |
| `tags` | ❌ | 技术标签数组 |
| `url` | ❌ | 项目在线演示地址 |
| `repo` | ❌ | GitHub 仓库地址 |

### 示例：添加一个真实项目

文件：`src/content/projects/todo-app.md`

```markdown
---
title: 待办事项应用
description: 一个简洁高效的待办事项管理应用，支持分类、提醒和云端同步。
pubDate: 2026-03-11
heroImage: ../../assets/blog-placeholder-3.jpg
tags: ['Vue', 'Firebase', 'PWA']
url: https://my-todo-app.com
repo: https://github.com/pheonix2006/todo-app
---

## 项目背景

为了提高工作效率，我开发了这款待办事项应用。

## 主要功能

- ✅ 创建、编辑、删除任务
- 📁 任务分类管理
- ⏰ 截止日期提醒
- ☁️ 云端数据同步
- 📱 支持 PWA，可安装到桌面

## 技术实现

使用 Vue 3 + Vite 构建，Firebase 提供后端服务。

## 在线体验

访问 [todo-app.com](https://my-todo-app.com) 体验完整功能。
```

---

## 3. 修改个人信息

### 3.1 修改网站标题和描述

**文件**：`src/consts.ts`

```typescript
export const SITE_TITLE = '你的名字 - 个人主页';
export const SITE_DESCRIPTION = '欢迎来到我的个人网站，分享技术文章和项目作品';
```

### 3.2 修改关于页面信息

**文件**：`src/pages/about.astro`

找到以下代码块并修改：

```typescript
// 第 12-24 行：个人简介
const aboutData = {
  name: '你的名字',                              // 改成你的名字
  avatar: '/images/avatar.svg',                 // 头像路径
  title: '你的职位 & 身份',                      // 例如：前端开发工程师
  bio: [
    '第一段自我介绍...',
    '第二段自我介绍...',
    '第三段自我介绍...'
  ],
  experience: '3 年',    // 工作经验
  projects: '20+',       // 项目数量
  articles: '50+',       // 文章数量
};

// 第 26-56 行：技能列表
const skills = [
  {
    category: '前端开发',       // 技能分类
    items: [
      { name: 'Vue.js', level: 90 },    // 技能名称和熟练度(0-100)
      { name: 'React', level: 80 },
      // 添加更多技能...
    ],
  },
  // 可以添加更多分类...
];

// 第 58-78 行：联系方式
const contactInfo = [
  {
    type: 'Email',
    value: 'your-email@example.com',          // 你的邮箱
    link: 'mailto:your-email@example.com',
  },
  {
    type: 'GitHub',
    value: 'github.com/pheonix2006',          // 你的 GitHub
    link: 'https://github.com/pheonix2006',
  },
  // 可以添加或删除联系方式...
];
```

### 3.3 修改联系页面

**文件**：`src/pages/contact.astro`

找到第 12-27 行并修改：

```typescript
const contactMethods = [
  {
    name: 'GitHub',
    url: 'https://github.com/pheonix2006',    // 改成你的 GitHub
    icon: 'github',
    description: '查看我的开源项目',
    username: '@pheonix2006',                  // 你的 GitHub 用户名
  },
  {
    name: 'Email',
    url: 'mailto:your-email@example.com',      // 改成你的邮箱
    icon: 'email',
    description: '发送邮件与我联系',
    username: 'your-email@example.com',
  },
];
```

### 3.4 修改首页 Hero 区域

**文件**：`src/pages/index.astro`

找到第 28 行并修改：

```astro
<Hero
  avatar="/images/avatar.svg"           <!-- 头像路径 -->
  name="你的名字"                         <!-- 改成你的名字 -->
  bio="你的个人简介"                      <!-- 改成你的简介 -->
/>
```

### 3.5 修改导航栏名称

**文件**：`src/components/Nav.astro`

找到第 28 行并修改：

```astro
<a href="/" class="...">你的名字</a>    <!-- 改成你想要显示的名称 -->
```

---

## 4. 替换图片资源

### 4.1 头像

1. 准备一张正方形头像图片（推荐 200x200 像素以上）
2. 放到 `public/images/avatar.png`（或其他格式）
3. 修改引用位置：
   - `src/pages/index.astro` 第 28 行
   - `src/pages/about.astro` 第 14 行

### 4.2 博客/项目封面图

1. 把图片放到 `src/assets/` 目录
2. 在文章/项目的 frontmatter 中引用：

```markdown
---
heroImage: ../../assets/你的图片名.jpg
---
```

### 4.3 项目占位图

如果想添加项目专属封面图，放到 `public/images/` 目录，然后引用：

```markdown
---
heroImage: /images/project-cover.jpg
---
```

---

## 5. 提交并部署

### 5.1 本地预览

提交前先本地预览确认效果：

```bash
cd E:/Project/personal_pages
pnpm dev
```

访问 `http://localhost:4321` 查看效果。

### 5.2 提交代码

```bash
# 1. 查看修改了哪些文件
git status

# 2. 添加所有修改
git add .

# 3. 提交（写清楚做了什么修改）
git commit -m "feat: 添加新博客文章和项目"

# 4. 推送到 GitHub（会自动触发部署）
git push
```

### 5.3 查看部署状态

访问 `https://github.com/pheonix2006/pheonix2006.github.io/actions`

等待部署完成后，访问 `https://pheonix2006.github.io` 查看更新。

---

## 快速参考

### 文件速查表

| 要修改的内容 | 文件路径 |
|-------------|----------|
| 博客文章 | `src/content/blog/*.md` |
| 项目 | `src/content/projects/*.md` |
| 网站标题/描述 | `src/consts.ts` |
| 首页 Hero | `src/pages/index.astro` |
| 关于页信息 | `src/pages/about.astro` |
| 联系方式 | `src/pages/contact.astro` |
| 导航名称 | `src/components/Nav.astro` |
| 头像图片 | `public/images/avatar.svg` |

### 常用命令

```bash
pnpm dev      # 启动开发服务器
pnpm build    # 构建生产版本
pnpm preview  # 预览构建结果
git status    # 查看修改状态
git add .     # 添加所有修改
git commit -m "消息"  # 提交
git push      # 推送
```

---

## 需要帮助？

- Astro 文档：https://docs.astro.build
- Markdown 语法：https://www.markdownguide.org

---

*最后更新：2026-03-11*

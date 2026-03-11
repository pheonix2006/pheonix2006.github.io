# pheonix2006 个人主页实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 搭建一个基于 Astro Persona 主题的个人主页站点，包含首页、项目、博客、关于、联系五个页面。

**Architecture:** 使用 Astro 作为静态站点生成器，集成 Astro Persona 主题，通过 Tailwind CSS 定制温暖文艺的视觉风格。内容以 Markdown 文件形式管理，部署到 GitHub Pages。

**Tech Stack:** Astro 5.x, Tailwind CSS 3.x, TypeScript, Astro Persona 主题, 思源宋体 (Google Fonts)

---

## 前置条件

- Node.js 18+ 已安装
- pnpm 已安装（推荐）或 npm/yarn
- Git 已配置

---

## Task 1: 初始化 Astro 项目

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

**Step 1: 使用 pnpm 创建 Astro 项目**

```bash
cd "E:/Project/personal_pages"
pnpm create astro@latest . --template minimal --install --no-git --typescript strict
```

Expected: 项目初始化成功，生成基础文件结构

**Step 2: 验证项目创建成功**

```bash
ls -la "E:/Project/personal_pages"
```

Expected: 看到 `package.json`, `astro.config.mjs`, `src/`, `public/` 等文件/目录

**Step 3: 启动开发服务器验证**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: 服务启动在 `http://localhost:4321`，访问显示 Astro 默认页面

**验收标准:**
- [ ] `package.json` 存在且包含 astro 依赖
- [ ] `pnpm dev` 能成功启动开发服务器
- [ ] 浏览器能访问 `localhost:4321`

---

## Task 2: 安装 Astro Persona 主题

**Files:**
- Modify: `package.json`
- Create: `src/content/config.ts`
- Create: `src/content/blog/`
- Create: `src/content/projects/`

**Step 1: 搜索并确认 Astro Persona 主题包名**

```bash
pnpm search astro-persona
```

Expected: 找到主题包信息，确认包名

**Step 2: 如果主题不可用，使用替代方案**

如果 Astro Persona 不可用或过时，改用 Astro 官方博客模板：

```bash
cd "E:/Project/personal_pages"
pnpm create astro@latest . --template blog --install --no-git --typescript strict --yes
```

Expected: 博客模板安装成功

**Step 3: 验证主题结构**

```bash
ls -la "E:/Project/personal_pages/src/"
```

Expected: 看到 `pages/`, `content/`, `components/`, `layouts/` 等目录

**验收标准:**
- [ ] 项目包含博客所需的基础结构
- [ ] `src/content/` 目录存在
- [ ] 开发服务器仍能正常启动

---

## Task 3: 配置 Tailwind CSS 自定义配色

**Files:**
- Modify: `tailwind.config.mjs` 或 `tailwind.config.js`
- Modify: `src/styles/global.css`（或等效的全局样式文件）

**Step 1: 安装 Tailwind CSS（如果未安装）**

```bash
cd "E:/Project/personal_pages" && pnpm add -D tailwind css
```

Expected: Tailwind CSS 安装成功

**Step 2: 创建/修改 Tailwind 配置文件**

创建或修改 `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 温暖文艺配色
        'warm-white': '#faf8f5',
        'warm-orange': '#e07a5f',
        'warm-brown': '#6b4423',
        'warm-beige': '#f4e8d9',
        'warm-gray': '#5c5c5c',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Source Serif Pro', 'serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 3: 验证 Tailwind 配置**

```bash
cd "E:/Project/personal_pages" && pnpm build
```

Expected: 构建成功，无 Tailwind 相关错误

**验收标准:**
- [ ] `tailwind.config.mjs` 包含自定义配色
- [ ] `pnpm build` 成功完成
- [ ] 无 CSS 相关错误

---

## Task 4: 配置思源宋体 (Google Fonts)

**Files:**
- Modify: `src/layouts/BaseLayout.astro`（或等效的布局文件）
- Modify: `src/styles/global.css`

**Step 1: 在布局文件中添加 Google Fonts 链接**

在 `<head>` 标签中添加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Step 2: 在全局样式中应用字体**

```css
body {
  font-family: 'Noto Serif SC', 'Source Serif Pro', serif;
  background-color: #faf8f5;
}
```

**Step 3: 验证字体加载**

启动开发服务器，打开浏览器开发者工具 Network 标签，确认 fonts.googleapis.com 请求成功。

**验收标准:**
- [ ] Google Fonts 链接正确添加
- [ ] body 使用思源宋体
- [ ] 页面背景为暖白色 `#faf8f5`

---

## Task 5: 创建首页

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/RecentProjects.astro`
- Create: `src/components/RecentPosts.astro`
- Create: `src/components/SocialLinks.astro`

**Step 1: 创建 Hero 组件 (`src/components/Hero.astro`)**

```astro
---
interface Props {
  name: string;
  bio: string;
  avatar?: string;
}
const { name, bio, avatar = '/images/avatar-placeholder.png' } = Astro.props;
---

<section class="hero text-center py-16">
  <img
    src={avatar}
    alt={name}
    class="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-warm-orange"
  />
  <h1 class="text-4xl font-bold text-warm-brown mb-4">{name}</h1>
  <p class="text-lg text-warm-gray max-w-xl mx-auto">{bio}</p>
</section>
```

**Step 2: 创建最近项目组件 (`src/components/RecentProjects.astro`)**

```astro
---
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}
interface Props {
  projects: Project[];
}
const { projects } = Astro.props;
---

<section class="recent-projects py-12">
  <h2 class="text-2xl font-bold text-warm-brown mb-8">最近项目</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <a
        href={`/projects/${project.slug}`}
        class="project-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img src={project.image} alt={project.title} class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold text-warm-brown mb-2">{project.title}</h3>
          <p class="text-sm text-warm-gray mb-3">{project.description}</p>
          <div class="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span class="text-xs px-2 py-1 bg-warm-beige text-warm-brown rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </a>
    ))}
  </div>
</section>
```

**Step 3: 创建最近文章组件 (`src/components/RecentPosts.astro`)**

```astro
---
interface Post {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  readingTime?: string;
}
interface Props {
  posts: Post[];
}
const { posts } = Astro.props;
---

<section class="recent-posts py-12">
  <h2 class="text-2xl font-bold text-warm-brown mb-8">最新文章</h2>
  <ul class="space-y-4">
    {posts.map((post) => (
      <li>
        <a
          href={`/blog/${post.slug}`}
          class="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 class="font-semibold text-warm-brown">{post.title}</h3>
          <div class="flex items-center gap-4 text-sm text-warm-gray mt-2">
            <time>{post.date}</time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
          <p class="text-warm-gray mt-2 text-sm">{post.excerpt}</p>
        </a>
      </li>
    ))}
  </ul>
</section>
```

**Step 4: 创建社交链接组件 (`src/components/SocialLinks.astro`)**

```astro
---
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
interface Props {
  links: SocialLink[];
}
const { links } = Astro.props;
---

<footer class="social-links py-8 text-center">
  <div class="flex justify-center gap-6">
    {links.map((link) => (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        class="text-warm-gray hover:text-warm-orange transition-colors"
        aria-label={link.name}
      >
        {link.icon === 'github' ? (
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        ) : (
          <span>{link.name}</span>
        )}
      </a>
    ))}
  </div>
</footer>
```

**Step 5: 修改首页 (`src/pages/index.astro`)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import RecentProjects from '../components/RecentProjects.astro';
import RecentPosts from '../components/RecentPosts.astro';
import SocialLinks from '../components/SocialLinks.astro';

// Mock 数据
const mockProjects = [
  {
    title: '项目示例一',
    description: '这是一个示例项目的简短描述，展示项目的主要功能和特点。',
    image: '/images/project-placeholder.png',
    tags: ['Vue', 'TypeScript'],
    slug: 'example-project-1',
  },
  {
    title: '项目示例二',
    description: '另一个示例项目，展示不同的技术栈和应用场景。',
    image: '/images/project-placeholder.png',
    tags: ['React', 'Node.js'],
    slug: 'example-project-2',
  },
  {
    title: '项目示例三',
    description: '第三个示例项目，展示更多的可能性。',
    image: '/images/project-placeholder.png',
    tags: ['Astro', 'Tailwind'],
    slug: 'example-project-3',
  },
];

const mockPosts = [
  {
    title: '第一篇博客文章',
    date: '2026-03-10',
    excerpt: '这是博客文章的摘要，简要介绍文章的主要内容...',
    slug: 'first-post',
    readingTime: '3 分钟阅读',
  },
  {
    title: '学习笔记：Astro 入门',
    date: '2026-03-08',
    excerpt: '记录学习 Astro 框架的过程和心得...',
    slug: 'astro-intro',
    readingTime: '5 分钟阅读',
  },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/pheonix2006', icon: 'github' },
];
---

<BaseLayout title="pheonix2006 的个人主页">
  <main class="container mx-auto px-4">
    <Hero
      name="pheonix2006"
      bio="一个热爱编程的开发者，喜欢探索新技术，记录学习和生活中的点滴。"
    />
    <RecentProjects projects={mockProjects} />
    <RecentPosts posts={mockPosts} />
    <SocialLinks links={socialLinks} />
  </main>
</BaseLayout>
```

**Step 6: 验证首页**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: 访问 `localhost:4321` 能看到完整的首页布局

**验收标准:**
- [ ] 首页包含 Hero 区域（头像、名字、简介）
- [ ] 首页包含最近项目卡片
- [ ] 首页包含最新文章列表
- [ ] 首页包含社交链接
- [ ] 整体风格为温暖文艺的配色

---

## Task 6: 创建项目列表页和详情页

**Files:**
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[slug].astro`

**Step 1: 创建项目列表页 (`src/pages/projects/index.astro`)**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';

// Mock 项目数据
const projects = [
  {
    title: '项目示例一',
    description: '这是一个示例项目的简短描述。',
    image: '/images/project-placeholder.png',
    tags: ['Vue', 'TypeScript'],
    slug: 'example-project-1',
  },
  {
    title: '项目示例二',
    description: '另一个示例项目。',
    image: '/images/project-placeholder.png',
    tags: ['React', 'Node.js'],
    slug: 'example-project-2',
  },
];
---

<BaseLayout title="项目 | pheonix2006">
  <main class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-warm-brown mb-8">项目</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <a
          href={`/projects/${project.slug}`}
          class="project-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img src={project.image} alt={project.title} class="w-full h-40 object-cover bg-warm-beige" />
          <div class="p-4">
            <h2 class="font-semibold text-warm-brown mb-2">{project.title}</h2>
            <p class="text-sm text-warm-gray mb-3">{project.description}</p>
            <div class="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span class="text-xs px-2 py-1 bg-warm-beige text-warm-brown rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  </main>
</BaseLayout>
```

**Step 2: 创建项目详情页 (`src/pages/projects/[slug].astro`)**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

// Mock 项目详情
const projectDetails: Record<string, { title: string; description: string; content: string; tags: string[]; github?: string; demo?: string }> = {
  'example-project-1': {
    title: '项目示例一',
    description: '这是一个示例项目',
    content: `
## 项目背景

这是项目的详细介绍，说明项目的起源和目标。

## 技术栈

- Vue 3
- TypeScript
- Tailwind CSS

## 效果展示

项目的主要功能和界面截图将在这里展示。
    `,
    tags: ['Vue', 'TypeScript'],
    github: 'https://github.com/pheonix2006/example-project-1',
  },
  'example-project-2': {
    title: '项目示例二',
    description: '另一个示例项目',
    content: '## 项目介绍\n\n这是第二个项目的详细介绍。',
    tags: ['React', 'Node.js'],
  },
};

export function getStaticPaths() {
  return Object.keys(projectDetails).map((slug) => ({
    params: { slug },
  }));
}

const { slug } = Astro.params;
const project = projectDetails[slug as keyof typeof projectDetails];

if (!project) {
  return Astro.redirect('/404');
}
---

<BaseLayout title={`${project.title} | pheonix2006`}>
  <main class="container mx-auto px-4 py-12">
    <a href="/projects" class="text-warm-orange hover:underline mb-4 inline-block">← 返回项目列表</a>
    <article class="max-w-3xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-warm-brown mb-4">{project.title}</h1>
        <div class="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span class="text-sm px-3 py-1 bg-warm-beige text-warm-brown rounded-full">{tag}</span>
          ))}
        </div>
      </header>
      <div class="prose prose-lg max-w-none" set:html={project.content} />
      <footer class="mt-8 flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-warm-orange text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            查看源码
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 border border-warm-orange text-warm-orange rounded-lg hover:bg-warm-orange hover:text-white transition-colors"
          >
            在线演示
          </a>
        )}
      </footer>
    </article>
  </main>
</BaseLayout>
```

**Step 3: 验证项目页面**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected:
- `localhost:4321/projects` 显示项目列表
- `localhost:4321/projects/example-project-1` 显示项目详情

**验收标准:**
- [ ] `/projects` 显示项目卡片网格
- [ ] `/projects/[slug]` 显示项目详情
- [ ] 详情页包含返回列表的链接

---

## Task 7: 创建博客列表页和详情页

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

**Step 1: 创建博客列表页 (`src/pages/blog/index.astro`)**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

// Mock 博客数据
const posts = [
  {
    title: '第一篇博客文章',
    date: '2026-03-10',
    excerpt: '这是博客文章的摘要，简要介绍文章的主要内容...',
    slug: 'first-post',
    readingTime: '3 分钟阅读',
    tags: ['随笔'],
  },
  {
    title: '学习笔记：Astro 入门',
    date: '2026-03-08',
    excerpt: '记录学习 Astro 框架的过程和心得...',
    slug: 'astro-intro',
    readingTime: '5 分钟阅读',
    tags: ['技术', 'Astro'],
  },
];
---

<BaseLayout title="博客 | pheonix2006">
  <main class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-warm-brown mb-8">博客</h1>
    <ul class="space-y-6 max-w-3xl">
      {posts.map((post) => (
        <li>
          <a
            href={`/blog/${post.slug}`}
            class="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 class="text-xl font-semibold text-warm-brown mb-2">{post.title}</h2>
            <div class="flex items-center gap-4 text-sm text-warm-gray mb-3">
              <time>{post.date}</time>
              <span>{post.readingTime}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span class="text-xs px-2 py-1 bg-warm-beige text-warm-brown rounded-full">{tag}</span>
              ))}
            </div>
            <p class="text-warm-gray">{post.excerpt}</p>
          </a>
        </li>
      ))}
    </ul>
  </main>
</BaseLayout>
```

**Step 2: 创建博客详情页 (`src/pages/blog/[slug].astro`)**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

// Mock 博客详情
const postDetails: Record<string, { title: string; date: string; content: string; tags: string[]; readingTime: string }> = {
  'first-post': {
    title: '第一篇博客文章',
    date: '2026-03-10',
    readingTime: '3 分钟阅读',
    content: `
## 开篇

这是我的第一篇博客文章，记录一些想法和心得。

## 正文

博客内容将在这里展示，支持 Markdown 格式。

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## 总结

感谢阅读！
    `,
    tags: ['随笔'],
  },
  'astro-intro': {
    title: '学习笔记：Astro 入门',
    date: '2026-03-08',
    readingTime: '5 分钟阅读',
    content: '## Astro 简介\n\nAstro 是一个现代化的静态站点生成器...',
    tags: ['技术', 'Astro'],
  },
};

export function getStaticPaths() {
  return Object.keys(postDetails).map((slug) => ({
    params: { slug },
  }));
}

const { slug } = Astro.params;
const post = postDetails[slug as keyof typeof postDetails];

if (!post) {
  return Astro.redirect('/404');
}
---

<BaseLayout title={`${post.title} | pheonix2006`}>
  <main class="container mx-auto px-4 py-12">
    <a href="/blog" class="text-warm-orange hover:underline mb-4 inline-block">← 返回博客列表</a>
    <article class="max-w-3xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-warm-brown mb-4">{post.title}</h1>
        <div class="flex items-center gap-4 text-sm text-warm-gray mb-4">
          <time>{post.date}</time>
          <span>{post.readingTime}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span class="text-sm px-3 py-1 bg-warm-beige text-warm-brown rounded-full">{tag}</span>
          ))}
        </div>
      </header>
      <div class="prose prose-lg max-w-none" set:html={post.content} />
    </article>
  </main>
</BaseLayout>
```

**Step 3: 验证博客页面**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected:
- `localhost:4321/blog` 显示博客列表
- `localhost:4321/blog/first-post` 显示博客详情

**验收标准:**
- [ ] `/blog` 显示文章列表
- [ ] `/blog/[slug]` 显示文章详情
- [ ] 详情页包含返回列表的链接

---

## Task 8: 创建关于页

**Files:**
- Create: `src/pages/about.astro`

**Step 1: 创建关于页 (`src/pages/about.astro`)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="关于 | pheonix2006">
  <main class="container mx-auto px-4 py-12">
    <article class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-warm-brown mb-8">关于我</h1>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-warm-brown mb-4">简介</h2>
        <p class="text-warm-gray leading-relaxed">
          你好！我是 pheonix2006，一个热爱编程的开发者。
        </p>
        <p class="text-warm-gray leading-relaxed mt-4">
          这里可以写更多关于自己的介绍，比如工作经历、兴趣爱好、技术栈等等。
          现在这些是占位文本，你可以随时修改。
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold text-warm-brown mb-4">技能</h2>
        <ul class="list-disc list-inside text-warm-gray space-y-2">
          <li>前端开发：Vue, React, TypeScript</li>
          <li>后端开发：Node.js, Python</li>
          <li>其他技能：待补充...</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-warm-brown mb-4">联系我</h2>
        <p class="text-warm-gray">
          欢迎通过 <a href="/contact" class="text-warm-orange hover:underline">联系页面</a> 与我取得联系。
        </p>
      </section>
    </article>
  </main>
</BaseLayout>
```

**Step 2: 验证关于页**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: `localhost:4321/about` 显示关于页面

**验收标准:**
- [ ] `/about` 显示关于页面
- [ ] 包含简介、技能、联系方式等区域

---

## Task 9: 创建联系页

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: 创建联系页 (`src/pages/contact.astro`)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/pheonix2006', icon: 'github' },
  { name: 'Email', url: 'mailto:your-email@example.com', icon: 'email' },
];
---

<BaseLayout title="联系 | pheonix2006">
  <main class="container mx-auto px-4 py-12">
    <article class="max-w-2xl mx-auto text-center">
      <h1 class="text-3xl font-bold text-warm-brown mb-8">联系我</h1>

      <p class="text-warm-gray mb-8">
        欢迎通过以下方式与我取得联系：
      </p>

      <div class="flex flex-col items-center gap-6">
        {socialLinks.map((link) => (
          <a
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            class="flex items-center gap-4 px-8 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full max-w-xs"
          >
            {link.icon === 'github' ? (
              <svg class="w-8 h-8 text-warm-gray" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            ) : (
              <svg class="w-8 h-8 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            )}
            <span class="text-warm-brown font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </article>
  </main>
</BaseLayout>
```

**Step 2: 验证联系页**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: `localhost:4321/contact` 显示联系页面

**验收标准:**
- [ ] `/contact` 显示联系页面
- [ ] 包含社交链接卡片

---

## Task 10: 创建导航组件

**Files:**
- Create: `src/components/Navigation.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: 创建导航组件 (`src/components/Navigation.astro`)**

```astro
---
const navLinks = [
  { name: '首页', href: '/' },
  { name: '项目', href: '/projects' },
  { name: '博客', href: '/blog' },
  { name: '关于', href: '/about' },
  { name: '联系', href: '/contact' },
];

const currentPath = Astro.url.pathname;
---

<nav class="bg-white shadow-sm sticky top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="text-xl font-bold text-warm-brown">pheonix2006</a>
      <ul class="flex items-center gap-6">
        {navLinks.map((link) => (
          <li>
            <a
              href={link.href}
              class:list={[
                'transition-colors',
                currentPath === link.href
                  ? 'text-warm-orange font-medium'
                  : 'text-warm-gray hover:text-warm-orange',
              ]}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</nav>
```

**Step 2: 创建/修改基础布局 (`src/layouts/BaseLayout.astro`)**

```astro
---
import Navigation from '../components/Navigation.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="pheonix2006 的个人主页" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>{title}</title>
  </head>
  <body class="bg-warm-white font-serif text-warm-gray">
    <Navigation />
    <slot />
    <footer class="py-8 text-center text-sm text-warm-gray">
      <p>&copy; 2026 pheonix2006. All rights reserved.</p>
    </footer>
  </body>
</html>

<style is:global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    font-family: 'Noto Serif SC', 'Source Serif Pro', serif;
  }

  .prose h2 {
    @apply text-xl font-semibold text-warm-brown mt-8 mb-4;
  }

  .prose p {
    @apply text-warm-gray leading-relaxed mb-4;
  }

  .prose code {
    @apply bg-warm-beige px-1 rounded text-sm;
  }

  .prose pre {
    @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4;
  }

  .prose pre code {
    @apply bg-transparent p-0;
  }
</style>
```

**Step 3: 验证导航**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: 所有页面顶部都显示导航栏，当前页面高亮

**验收标准:**
- [ ] 导航栏显示在所有页面顶部
- [ ] 当前页面链接高亮
- [ ] 点击导航能正确跳转

---

## Task 11: 添加占位图片

**Files:**
- Create: `public/images/avatar-placeholder.png`
- Create: `public/images/project-placeholder.png`
- Create: `public/favicon.svg`

**Step 1: 创建 favicon (`public/favicon.svg`)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#faf8f5"/>
  <text x="50" y="68" font-size="50" text-anchor="middle" fill="#e07a5f" font-family="serif" font-weight="bold">P</text>
</svg>
```

**Step 2: 创建简单的占位图片**

使用 SVG 作为占位图，创建 `public/images/project-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <rect width="400" height="200" fill="#f4e8d9"/>
  <text x="200" y="105" text-anchor="middle" fill="#6b4423" font-family="serif">项目封面</text>
</svg>
```

创建 `public/images/avatar-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#f4e8d9"/>
  <text x="100" y="120" text-anchor="middle" fill="#6b4423" font-size="60" font-family="serif">P</text>
</svg>
```

**Step 3: 更新组件引用**

将之前组件中的 `.png` 改为 `.svg`

**验收标准:**
- [ ] favicon 正确显示
- [ ] 项目卡片显示占位图
- [ ] 头像显示占位图

---

## Task 12: 配置 GitHub Pages 部署

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`

**Step 1: 修改 Astro 配置**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://pheonix2006.github.io',
  integrations: [tailwind()],
  output: 'static',
});
```

**Step 2: 创建部署工作流 (`.github/workflows/deploy.yml`)**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: 验证构建**

```bash
cd "E:/Project/personal_pages" && pnpm build
```

Expected: `dist/` 目录生成，包含所有静态文件

**验收标准:**
- [ ] `astro.config.mjs` 包含正确的 site 配置
- [ ] `.github/workflows/deploy.yml` 存在
- [ ] `pnpm build` 成功生成 `dist/` 目录

---

## Task 13: 最终验证

**Step 1: 本地预览构建结果**

```bash
cd "E:/Project/personal_pages" && pnpm preview
```

Expected: 预览服务器启动，所有页面可访问

**Step 2: 检查所有页面**

- [ ] `/` - 首页显示正常
- [ ] `/projects` - 项目列表显示正常
- [ ] `/projects/example-project-1` - 项目详情显示正常
- [ ] `/blog` - 博客列表显示正常
- [ ] `/blog/first-post` - 博客详情显示正常
- [ ] `/about` - 关于页显示正常
- [ ] `/contact` - 联系页显示正常

**Step 3: 检查响应式设计**

在不同屏幕尺寸下测试页面布局。

**验收标准:**
- [ ] 所有页面可访问
- [ ] 导航正常工作
- [ ] 配色符合设计（暖白背景、温暖橙/棕强调色）
- [ ] 字体正确加载（思源宋体）
- [ ] 响应式布局正常

---

## 执行选项

Plan complete and saved to `docs/plans/2026-03-10-personal-homepage-implementation.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**

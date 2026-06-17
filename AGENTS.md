# AGENTS.md

对话和面向用户的总结默认使用中文。

## 项目结构

这是一个 Astro 6 静态个人主页项目，使用 pnpm。Node 要求见 `package.json`，当前为 `>=22.12.0`。

核心目录：

- `src/pages/`：Astro 文件路由。首页 `/`、`/about`、`/contact`、`/blog`、`/blog/[slug]`、`/projects`、`/projects/[slug]`、`/rss.xml` 都在这里。
- `src/data/site-config.ts`：结构化个人信息主来源，包括导航、履历、教育经历、实习经历、技能、联系方式和首页内容。
- `src/content.config.ts`：Astro content collections schema。当前有 `blog`、`projects`、`records`。
- `src/content/blog/`：博客 Markdown/MDX 内容，文件名生成 `/blog/:slug`。
- `src/content/projects/`：项目长文 Markdown/MDX 内容，文件名生成 `/projects/:slug`。
- `src/lib/content.ts`：内容过滤和排序逻辑，例如隐藏 starter 示例内容。
- `src/components/`：导航、页脚、列表预览、日期、SEO head、Mermaid/PDF 等组件。
- `src/layouts/`：页面布局。当前主要使用 `BaseLayout.astro`。
- `src/assets/`：由 Astro 处理的本地图片资源。
- `public/`：直接公开的静态资源，如 favicon、字体、图片、PDF。
- `docs/`：内容维护指南、历史计划和设计记录。
- `e2e/`：Playwright E2E 测试。

## 常用命令

- `npx pnpm@9 dev --host 127.0.0.1`：本地开发预览。
- `npx pnpm@9 build`：静态构建。
- `npx pnpm@9 preview`：预览构建产物。
- `npx pnpm@9 exec playwright test`：运行 E2E 测试。

`package.json` 当前没有 `test`、`lint`、`format`、`check` scripts。Playwright 配置在 `playwright.config.ts`。

## 内容写作约定

- 项目详情页是求职向 long-form case study，不要写成普通 README。
- `src/content/projects/*.md` 应该保留背景、目标、架构、关键实现、技术取舍、结果和反思。
- `src/content/blog/*.md` 用于技术文章、论文精读或项目过程记录。
- 修改项目/博客内容时，优先保持已有中文长文风格；技术名词可以保留英文。
- 不要把不确定推断写成事实。对 GitHub repo 调研时区分：可验证事实、代码推断、需要用户补充的信息。

## 推荐 Agent 工作流

为新的 GitHub 项目写本站项目长文时，推荐采用两轮调查：

1. 第一轮 repo map：1-2 个子代理粗读 README、目录、依赖、入口、用户体验和技术骨架。
2. 第二轮专题深挖：根据第一轮结果拆成后端 pipeline、前端体验、工程质量、测试、部署、对外叙事等专题。
3. 汇总采访前 brief：明确项目事实、技术亮点、风险边界和需要用户补充的问题。
4. 使用 brainstorming 式一问一答采访用户，补充个人贡献、项目动机、关键取舍、结果和反思。
5. 用户确认文章结构后，再写入 `src/content/projects/*.md` 并运行构建和 Playwright 验证。

## 注意事项

- `.research/` 用于临时 clone 和调查外部仓库，已加入 `.gitignore`。
- 不要提交 `.env`、API keys、运行生成的数据或临时研究仓库。
- 当前 records collection 仍在 `src/content.config.ts` 中定义，但公开 records 页面已移除。

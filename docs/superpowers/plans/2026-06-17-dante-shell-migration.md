# Dante Shell Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hand-built personal site shell with a Dante-inspired Astro portfolio/blog shell while preserving existing long-form project and blog content.

**Architecture:** Keep Astro static output and existing content collections. Add a central site config, shared layout/head/nav/footer components, paginated project/blog listings, and long-form detail pages that render existing Markdown bodies with current frontmatter compatibility.

**Tech Stack:** Astro, Astro Content Collections, MDX, Tailwind CSS v4, Playwright, GitHub Pages Actions.

---

### File Structure

- Modify `src/content.config.ts`: keep existing content directories but add blog/project fields required by current content and the Dante shell.
- Create `src/data/site-config.ts`: central site title, URL, hero, navigation, social links, and pagination.
- Replace shell components in `src/components`: `BaseHead.astro`, `Nav.astro`, `Footer.astro`, `FormattedDate.astro`; add `Pagination.astro`, `ProjectPreview.astro`, `PostPreview.astro`, `ThemeToggle.astro` if needed.
- Create/replace `src/layouts/BaseLayout.astro`: shared document layout.
- Replace route pages: `src/pages/index.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/about.astro`, `src/pages/contact.astro`.
- Keep current authored content and assets under `src/content/projects`, `src/content/blog`, `src/assets`, and `public`.
- Remove primary navigation to `records`; records files can remain unlinked for now.
- Update `src/styles/global.css`: Dante-inspired typographic shell while avoiding the current global `!important` font overrides.
- Update `e2e/homepage.spec.ts`: verify preserved content and absence of mock/starter content.

### Task 1: Add Failing Migration Coverage

**Files:**
- Modify: `e2e/homepage.spec.ts`

- [ ] **Step 1: Replace the current broad homepage tests with content-preservation tests**

```ts
import { expect, test } from '@playwright/test';

test.describe('Dante shell migration', () => {
  test('homepage presents the portfolio shell without mock starter identity', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/pheonix2006|Phoenix|Portfolio/i);
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
    await expect(page.getByText('Astro Blog')).toHaveCount(0);
    await expect(page.getByText('hello@example.com')).toHaveCount(0);
    await expect(page.getByText('示例项目一')).toHaveCount(0);
  });

  test('projects listing shows real long-form project entries', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('heading', { name: /projects|项目/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /RAG 检索增强系统与评测框架/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /AI Agent 服务框架/i })).toBeVisible();
    await expect(page.getByText('Example Project')).toHaveCount(0);
  });

  test('project detail preserves existing long-form content and repo link', async ({ page }) => {
    await page.goto('/projects/dify-rag-system');

    await expect(page.getByRole('heading', { name: 'RAG 检索增强系统与评测框架' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '系统架构' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '检索层：混合向量检索引擎' })).toBeVisible();
    await expect(page.getByRole('link', { name: /source|源码|GitHub/i })).toHaveAttribute('href', /github\.com\/pheonix2006\/milvus_test/);
  });

  test('blog detail preserves the real AORCHESTRA article', async ({ page }) => {
    await page.goto('/blog/aorchestra');

    await expect(page.getByRole('heading', { name: /AORCHESTRA/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /系统架构：四元组的魔法/i })).toBeVisible();
    await expect(page.getByText(/SWE-Bench|GAIA|Terminal Bench/)).toBeVisible();
  });

  test('mobile homepage has no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
```

- [ ] **Step 2: Run the migration tests and verify they fail on the current shell**

Run: `npx pnpm@9 exec playwright test e2e/homepage.spec.ts`

Expected: FAIL because the current site still exposes template identity/mock data and has not migrated to the new shell.

### Task 2: Install and Align Dependencies

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Update dependencies needed by the shell**

Run: `npx pnpm@9 add marked @fontsource-variable/inter @fontsource-variable/newsreader @tailwindcss/typography`

Expected: `package.json` and `pnpm-lock.yaml` update successfully.

- [ ] **Step 2: Install dependencies**

Run: `npx pnpm@9 install`

Expected: install completes without dependency resolution errors.

### Task 3: Add Dante-Inspired Shared Shell

**Files:**
- Create: `src/data/site-config.ts`
- Replace: `src/components/BaseHead.astro`
- Replace: `src/components/Nav.astro`
- Replace: `src/components/Footer.astro`
- Create: `src/components/Pagination.astro`
- Create: `src/components/ProjectPreview.astro`
- Create: `src/components/PostPreview.astro`
- Replace: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Implement the site config**

Create `src/data/site-config.ts` with navigation for Home, Projects, Blog, About, Contact; no Records link.

- [ ] **Step 2: Implement shared document head, nav, footer, and layout**

Use static Astro components, local fonts, RSS/sitemap friendly metadata, and accessible navigation.

- [ ] **Step 3: Implement preview and pagination components**

Project and post previews link to existing slugs and show title, description, date, and tags.

### Task 4: Adapt Content Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Extend schemas without changing existing authored Markdown**

Project schema must accept `pubDate`, `updatedDate`, `heroImage`, `url`, `repo`, and `tags`.

Blog schema must accept `pubDate`, `updatedDate`, `heroImage`, `tags`, `repo`, and `paper`.

- [ ] **Step 2: Run build to catch schema errors**

Run: `npx pnpm@9 build`

Expected: current route errors may still exist, but content schema errors should be resolved before moving to route replacement.

### Task 5: Replace Public Routes

**Files:**
- Replace: `src/pages/index.astro`
- Replace: `src/pages/projects/index.astro`
- Replace: `src/pages/projects/[slug].astro`
- Replace: `src/pages/blog/index.astro`
- Replace: `src/pages/blog/[slug].astro`
- Replace: `src/pages/about.astro`
- Replace: `src/pages/contact.astro`

- [ ] **Step 1: Replace homepage**

Homepage should show concise identity, featured projects from real project content, recent writing, and contact links.

- [ ] **Step 2: Replace project listing and detail pages**

Project list should exclude `example-project`; project detail should render Markdown body and show repo/demo/tags/date controls.

- [ ] **Step 3: Replace blog listing and detail pages**

Blog list should exclude starter posts unless explicitly kept; AORCHESTRA must render.

- [ ] **Step 4: Replace About and Contact**

Use conservative non-mock content and GitHub/email links from site config.

### Task 6: Remove Starter/Misleading Surface Area

**Files:**
- Modify or delete route files under `src/pages/records`
- Modify: `src/pages/rss.xml.js`
- Modify: `docs/CONTENT_GUIDE.md`

- [ ] **Step 1: Remove records from reachable navigation**

Records can remain in source but must not be linked from navigation or homepage.

- [ ] **Step 2: Update RSS to use real blog content and site config**

RSS should build from the blog collection and use the configured site URL.

- [ ] **Step 3: Update content guide**

Document that long-form project case studies live in `src/content/projects` and repo metadata remains optional/manual for this phase.

### Task 7: Green Verification

**Files:**
- Verify all changed files

- [ ] **Step 1: Run formatter if configured**

Run: `npx pnpm@9 exec prettier --write "src/**/*.{astro,ts,js,css}" "e2e/**/*.ts" "docs/**/*.md"`

Expected: files format without parser errors.

- [ ] **Step 2: Run build**

Run: `npx pnpm@9 build`

Expected: build exits 0 and writes `dist`.

- [ ] **Step 3: Run Playwright migration tests**

Run: `npx pnpm@9 exec playwright test e2e/homepage.spec.ts`

Expected: all tests pass.

- [ ] **Step 4: Run local dev server and inspect pages**

Run: `npx pnpm@9 dev --host 127.0.0.1`

Open `/`, `/projects`, `/projects/dify-rag-system`, `/blog/aorchestra`, and mobile homepage. Verify no obvious blank screens, broken images, or overflow.

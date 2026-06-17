import { expect, test } from '@playwright/test';

test.describe('Dante shell migration', () => {
  test('homepage presents the portfolio shell without mock starter identity', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/李行健|作品集|Xingjian Li/i);
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: '项目' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: '博客' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /李行健|Xingjian Li/ })).toBeVisible();
    await expect(page.getByText(/HKUST\(GZ\)|香港科技大学/).first()).toBeVisible();
    await expect(page.getByText(/Dean's List|春季学期/).first()).toBeVisible();
    await expect(page.getByText(/DeepWisdom|Atoms/).first()).toBeVisible();
    await expect(page.getByText('Astro Blog')).toHaveCount(0);
    await expect(page.getByText('hello@example.com')).toHaveCount(0);
    await expect(page.getByText('示例项目一')).toHaveCount(0);
  });

  test('homepage is structured like an online resume', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '教育经历' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '实习经历' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '项目经历' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '技术方向' })).toBeVisible();
    await expect(page.getByText(/Cummins China AI 实习生/)).toBeVisible();
    await expect(page.getByText(/DeepWisdom \/ Atoms 算法研究院实习生/).first()).toBeVisible();
    await expect(page.getByText(/LangGraph/).first()).toBeVisible();
    await expect(page.getByText(/Text2SQL/).first()).toBeVisible();
  });

  test('homepage uses resume layout instead of landing page CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.resume-home')).toBeVisible();
    await expect(page.locator('.resume-main-column')).toBeVisible();
    await expect(page.locator('.resume-side-column')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Projects' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'About Me' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'xli807@connect.hkust-gz.edu.cn' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Writing' })).toHaveCount(0);
  });

  test('homepage places education before experience', async ({ page }) => {
    await page.goto('/');

    const educationTop = await page.getByRole('heading', { name: '教育经历' }).evaluate((node) => node.getBoundingClientRect().top);
    const experienceTop = await page.getByRole('heading', { name: '实习经历' }).evaluate((node) => node.getBoundingClientRect().top);

    expect(educationTop).toBeLessThan(experienceTop);
  });

  test('about and contact expose resume information', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByText(/中国人民大学附属中学/)).toBeVisible();
    await expect(page.getByText(/总 GPA：3\.5\/4\.3/)).toBeVisible();
    await expect(page.getByText(/英语：流利/)).toBeVisible();

    await page.goto('/contact');

    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'xli807@connect.hkust-gz.edu.cn' })).toHaveAttribute(
      'href',
      'mailto:xli807@connect.hkust-gz.edu.cn'
    );
    await expect(page.getByText('+86 186-1071-8620')).toBeVisible();
    await expect(page.getByRole('link', { name: /github\.com\/pheonix2006/ })).toBeVisible();
  });

  test('projects listing shows real long-form project entries', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('heading', { name: /projects|项目/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'RAG 检索增强系统与评测框架' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'AI Agent 服务框架' }).first()).toBeVisible();
    await expect(page.getByText('Example Project')).toHaveCount(0);
  });

  test('project detail preserves existing long-form content and repo link', async ({ page }) => {
    await page.goto('/projects/dify-rag-system');

    await expect(page.getByRole('heading', { name: 'RAG 检索增强系统与评测框架' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '系统架构' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '检索层：混合向量检索引擎' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Visit Project|source|源码|GitHub Repo|查看源码/i }).first()).toHaveAttribute(
      'href',
      /github\.com\/pheonix2006\/milvus_test/
    );
  });

  test('projects include the You in Parallel Universes case study', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('link', { name: /You in Parallel Universes/ }).first()).toBeVisible();

    await page.goto('/projects/you-in-parallel-universes');

    await expect(page.getByRole('heading', { name: /You in Parallel Universes/ })).toBeVisible();
    await expect(page.getByText(/UCUG1505 Art final project/).first()).toBeVisible();
    await expect(page.getByText(/LangGraph/).first()).toBeVisible();
    await expect(page.getByText(/SSE/).first()).toBeVisible();
    await expect(page.getByText(/节点级输入输出|trace|可观测/).first()).toBeVisible();
    await expect(page.getByText(/形成一个可以站在装置前直接参与的闭环/)).toHaveCount(0);
    await expect(page.getByText(/这门课的要求很明确/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Visit Project' })).toHaveAttribute('href', /github\.com\/pheonix2006\/You-in-parallel-universes/);
    await expect(page.getByRole('link', { name: 'Watch Demo' })).toHaveAttribute('href', /bilibili\.com/);
    const poster = page.getByRole('img', { name: /You in Parallel Universes/ }).first();
    await expect(poster).toBeVisible();
    const posterRatio = await poster.evaluate((img) => {
      const rect = img.getBoundingClientRect();
      return rect.height / rect.width;
    });
    expect(posterRatio).toBeGreaterThan(0.9);

    const introHeadingGap = await page.getByRole('heading', { name: '项目简介' }).evaluate((heading) => {
      const rect = heading.getBoundingClientRect();
      const next = heading.nextElementSibling?.getBoundingClientRect();
      return next ? next.top - rect.bottom : 0;
    });
    expect(introHeadingGap).toBeGreaterThan(14);
  });

  test('blog detail preserves the real AORCHESTRA article', async ({ page }) => {
    await page.goto('/blog/aorchestra');

    await expect(page.getByRole('heading', { name: 'AORCHESTRA - 智能体编排的未来' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /系统架构：四元组的魔法/i })).toBeVisible();
    await expect(page.getByText(/SWE-Bench|GAIA|Terminal Bench/).first()).toBeVisible();
  });

  test('mobile homepage has no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

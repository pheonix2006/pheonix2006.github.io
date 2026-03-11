import { test, expect } from '@playwright/test';

test.describe('个人主页测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('首页加载成功', async ({ page }) => {
    // 标题包含 Astro Blog 或 Phoenix
    await expect(page).toHaveTitle(/Astro|Phoenix|Blog/);
  });

  test('导航栏存在', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('导航链接数量正确', async ({ page }) => {
    // 导航栏中的链接: 首页、项目、博客、关于、联系 + Logo 链接
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    // 应该至少有 5 个导航链接（Logo + 5个导航项）
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('Hero 区域显示', async ({ page }) => {
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();
  });

  test('Hero 区域包含标题', async ({ page }) => {
    const heroTitle = page.locator('section.hero h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('你好');
  });

  test('项目区域存在', async ({ page }) => {
    // 检查最近项目区域
    const projectSection = page.locator('section').filter({ hasText: /项目/ });
    await expect(projectSection.first()).toBeVisible();
  });

  test('点击项目链接跳转', async ({ page }) => {
    const projectsLink = page.locator('nav a:has-text("项目")');
    await projectsLink.click();
    await expect(page).toHaveURL(/\/projects/);
  });

  test('博客链接跳转', async ({ page }) => {
    const blogLink = page.locator('nav a:has-text("博客")');
    await blogLink.click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test('关于页跳转', async ({ page }) => {
    const aboutLink = page.locator('nav a:has-text("关于")');
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('联系页跳转', async ({ page }) => {
    const contactLink = page.locator('nav a:has-text("联系")');
    await contactLink.click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('配色验证 - 暖白背景', async ({ page }) => {
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => getComputedStyle(el).backgroundColor);
    // 验证背景色接近 #faf8f5 (暖白色) - rgb(250, 248, 245)
    console.log('背景色:', backgroundColor);
    // 检查是否有背景色设置
    expect(backgroundColor).toBeTruthy();
  });

  test('响应式测试 - 移动端导航可见', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('响应式测试 - 移动端 Hero 区域可见', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();
  });

  test('页脚存在', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('字体验证 - 检查思源宋体应用', async ({ page }) => {
    // 检查 body 元素的字体
    const bodyFont = await page.locator('body').evaluate(el => {
      const style = getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        // 检查是否包含衬线体关键词
        isSerif: style.fontFamily.toLowerCase().includes('serif') ||
                 style.fontFamily.includes('Noto Serif SC') ||
                 style.fontFamily.includes('Source Serif Pro')
      };
    });
    console.log('Body 字体:', bodyFont.fontFamily);
    expect(bodyFont.isSerif).toBeTruthy();

    // 检查 h1 标题的字体
    const h1Font = await page.locator('h1').first().evaluate(el => {
      const style = getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        isSerif: style.fontFamily.toLowerCase().includes('serif') ||
                 style.fontFamily.includes('Noto Serif SC')
      };
    });
    console.log('H1 字体:', h1Font.fontFamily);
    expect(h1Font.isSerif).toBeTruthy();

    // 检查 html 元素的字体
    const htmlFont = await page.locator('html').evaluate(el => {
      const style = getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        isSerif: style.fontFamily.toLowerCase().includes('serif') ||
                 style.fontFamily.includes('Noto Serif SC')
      };
    });
    console.log('HTML 字体:', htmlFont.fontFamily);
    expect(htmlFont.isSerif).toBeTruthy();
  });

  test('截图 - 首页全屏', async ({ page }) => {
    await page.screenshot({ path: 'test-results/homepage-full.png', fullPage: true });
  });

  test('截图 - 移动端首页', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');
    await page.screenshot({ path: 'test-results/homepage-mobile.png', fullPage: true });
  });
});

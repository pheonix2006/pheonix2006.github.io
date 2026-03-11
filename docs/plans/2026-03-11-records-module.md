# 记录模块 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为个人主页添加"记录"模块，支持日常简短记录，包含时间线视图、日历视图、分类筛选和统计面板。

**Architecture:** 使用 Astro Content Collections 管理记录数据，按分类文件夹组织（健身/生活/学习等），通过文件路径动态识别分类。页面采用左右布局，左侧为分类导航和统计，右侧为时间线/日历视图（可切换）。

**Tech Stack:** Astro 6.x, Tailwind CSS 4.x, TypeScript

---

## 前置条件

- 项目已初始化，使用 pnpm 管理
- 已有 Content Collections 配置 (`src/content.config.ts`)
- 已有导航组件 (`src/components/Nav.astro`)

---

## Task 1: 配置 Content Collection

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/records/健身/2026-03-11.md`
- Create: `src/content/records/生活/2026-03-10.md`

**Step 1: 添加 records collection 配置**

修改 `src/content.config.ts`，在 `projects` 定义后添加：

```typescript
const records = defineCollection({
  loader: glob({ base: './src/content/records', pattern: '**/*.md' }),
  schema: z.object({
    date: z.coerce.date(),
  }),
});
```

然后修改导出：

```typescript
export const collections = { blog, projects, records };
```

**Step 2: 创建示例记录文件**

创建 `src/content/records/健身/2026-03-11.md`:

```markdown
---
date: 2026-03-11
---

今天完成了5公里晨跑，感觉状态不错。下午做了30分钟力量训练。
```

创建 `src/content/records/生活/2026-03-10.md`:

```markdown
---
date: 2026-03-10
---

周末和朋友聚餐，尝试了一家新开的日料店，味道很不错。
```

**Step 3: 验证配置**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: 启动无报错

**验收标准:**
- [ ] `content.config.ts` 包含 records collection
- [ ] 示例文件创建成功
- [ ] 开发服务器正常启动

---

## Task 2: 创建记录列表页

**Files:**
- Create: `src/pages/records/index.astro`

**Step 1: 创建记录列表页基础结构**

创建 `src/pages/records/index.astro`:

```astro
---
/**
 * 记录列表页 - 时间线视图和日历视图
 * 使用温暖文艺配色，从 content collections 获取数据
 */
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Nav from '../../components/Nav.astro';
import RecordsList from '../../components/RecordsList.astro';
import Calendar from '../../components/Calendar.astro';
import CategoryNav from '../../components/CategoryNav.astro';
import Stats from '../../components/Stats.astro';
import { SITE_TITLE } from '../../consts';

// 获取所有记录
let records = [];
let categories: string[] = [];
try {
  const allRecords = await getCollection('records');
  records = allRecords.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  // 从文件路径提取分类 (格式: "分类/文件名")
  categories = [...new Set(records.map(r => r.id.split('/')[0]))];
} catch (e) {
  console.log('No records found');
}

// 获取 URL 参数
const url = new URL(Astro.request.url);
const activeCategory = url.searchParams.get('category') || '';
const viewMode = url.searchParams.get('view') || 'timeline';

// 按分类筛选
const filteredRecords = activeCategory
  ? records.filter(r => r.id.startsWith(activeCategory + '/'))
  : records;

// 计算统计数据
const stats = {
  total: records.length,
  byCategory: categories.map(c => ({
    name: c,
    count: records.filter(r => r.id.startsWith(c + '/')).length
  })),
  streak: calculateStreak(records.map(r => r.data.date))
};

// 计算连续记录天数
function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;
  const sortedDates = dates
    .map(d => d.toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const next = new Date(sortedDates[i + 1]);
    const diff = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <BaseHead title={`记录 - ${SITE_TITLE}`} description="我的日常记录" />
  </head>
  <body class="bg-warm-white min-h-screen">
    <Nav />

    <main class="max-w-6xl mx-auto px-6 py-12">
      <header class="mb-8">
        <h1 class="text-4xl font-serif text-warm-brown mb-4">记录</h1>
        <p class="text-warm-gray">记录生活的点滴</p>
      </header>

      <!-- 视图切换 -->
      <div class="flex gap-4 mb-6">
        <a
          href={`/records${activeCategory ? `?category=${activeCategory}` : ''}`}
          class:list={[
            'px-4 py-2 rounded-lg transition-colors',
            viewMode === 'timeline' ? 'bg-warm-orange text-white' : 'bg-warm-beige text-warm-brown hover:bg-warm-orange/20'
          ]}
        >
          时间线
        </a>
        <a
          href={`/records?view=calendar${activeCategory ? `&category=${activeCategory}` : ''}`}
          class:list={[
            'px-4 py-2 rounded-lg transition-colors',
            viewMode === 'calendar' ? 'bg-warm-orange text-white' : 'bg-warm-beige text-warm-brown hover:bg-warm-orange/20'
          ]}
        >
          日历
        </a>
      </div>

      <div class="flex gap-8">
        <!-- 左侧：分类导航 + 统计 -->
        <aside class="w-48 flex-shrink-0">
          <CategoryNav categories={categories} activeCategory={activeCategory} />
          <Stats stats={stats} />
        </aside>

        <!-- 右侧：内容区 -->
        <div class="flex-1">
          {viewMode === 'timeline' ? (
            <RecordsList records={filteredRecords} />
          ) : (
            <Calendar records={records} activeCategory={activeCategory} />
          )}
        </div>
      </div>
    </main>

    <Footer />
  </body>
</html>
```

**Step 2: 验证页面可访问**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

Expected: 组件导入无报错（组件还未创建会有警告，但不影响）

**验收标准:**
- [ ] `src/pages/records/index.astro` 创建成功
- [ ] 开发服务器能启动

---

## Task 3: 创建分类导航组件

**Files:**
- Create: `src/components/CategoryNav.astro`

**Step 1: 创建分类导航组件**

创建 `src/components/CategoryNav.astro`:

```astro
---
/**
 * 分类导航组件 - 显示所有记录分类
 */
interface Props {
  categories: string[];
  activeCategory: string;
}

const { categories, activeCategory } = Astro.props;
---

<div class="category-nav mb-8">
  <h3 class="text-lg font-serif text-warm-brown mb-4">分类</h3>
  <ul class="space-y-2">
    <li>
      <a
        href="/records"
        class:list={[
          'block py-2 px-3 rounded-lg transition-colors',
          activeCategory === '' ? 'bg-warm-orange text-white' : 'text-warm-gray hover:bg-warm-beige'
        ]}
      >
        全部
      </a>
    </li>
    {categories.map((category) => (
      <li>
        <a
          href={`/records?category=${category}`}
          class:list={[
            'block py-2 px-3 rounded-lg transition-colors',
            activeCategory === category ? 'bg-warm-orange text-white' : 'text-warm-gray hover:bg-warm-beige'
          ]}
        >
          {category}
        </a>
      </li>
    ))}
  </ul>
</div>
```

**Step 2: 验证组件渲染**

刷新 `/records` 页面，确认左侧分类导航显示。

**验收标准:**
- [ ] 组件创建成功
- [ ] 显示"全部"和各个分类

---

## Task 4: 创建统计面板组件

**Files:**
- Create: `src/components/Stats.astro`

**Step 1: 创建统计面板组件**

创建 `src/components/Stats.astro`:

```astro
---
/**
 * 统计面板组件 - 显示记录统计信息
 */
interface CategoryStat {
  name: string;
  count: number;
}

interface StatsData {
  total: number;
  byCategory: CategoryStat[];
  streak: number;
}

interface Props {
  stats: StatsData;
}

const { stats } = Astro.props;
---

<div class="stats-panel bg-warm-beige/30 rounded-lg p-4">
  <h3 class="text-lg font-serif text-warm-brown mb-4">统计</h3>

  <div class="space-y-4">
    <div class="text-center">
      <div class="text-3xl font-bold text-warm-orange">{stats.total}</div>
      <div class="text-sm text-warm-gray">总记录</div>
    </div>

    <div class="text-center">
      <div class="text-3xl font-bold text-warm-orange">{stats.streak}</div>
      <div class="text-sm text-warm-gray">连续天数</div>
    </div>

    <hr class="border-warm-orange/20" />

    <div class="space-y-2">
      {stats.byCategory.map((cat) => (
        <div class="flex justify-between text-sm">
          <span class="text-warm-gray">{cat.name}</span>
          <span class="text-warm-brown font-medium">{cat.count}</span>
        </div>
      ))}
    </div>
  </div>
</div>
```

**Step 2: 验证统计显示**

刷新页面，确认统计面板显示总记录数和连续天数。

**验收标准:**
- [ ] 组件创建成功
- [ ] 显示总记录数
- [ ] 显示连续天数
- [ ] 显示各分类数量

---

## Task 5: 创建时间线组件

**Files:**
- Create: `src/components/RecordsList.astro`

**Step 1: 创建时间线组件**

创建 `src/components/RecordsList.astro`:

```astro
---
/**
 * 时间线组件 - 按日期倒序展示记录
 */
import FormattedDate from './FormattedDate.astro';

interface RecordData {
  date: Date;
}

interface Record {
  id: string;
  data: RecordData;
  body?: string;
}

interface Props {
  records: Record[];
}

const { records } = Astro.props;

// 格式化日期为中文
function formatDate(date: Date): string {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 从文件路径提取分类
function getCategory(id: string): string {
  return id.split('/')[0];
}
---

<div class="records-list space-y-4">
  {records.length === 0 ? (
    <div class="text-center py-16 text-warm-gray">
      暂无记录
    </div>
  ) : (
    records.map((record) => (
      <article class="record-card bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <time class="text-sm text-warm-gray">
            {formatDate(record.data.date)}
          </time>
          <span class="text-xs px-2 py-1 bg-warm-beige text-warm-brown rounded-full">
            {getCategory(record.id)}
          </span>
        </div>
        <div class="prose prose-warm max-w-none">
          <p class="text-warm-gray leading-relaxed m-0" set:html={record.body} />
        </div>
        <a
          href={`/records/${record.id}`}
          class="inline-block mt-3 text-sm text-warm-orange hover:text-warm-brown transition-colors"
        >
          查看详情 →
        </a>
      </article>
    ))
  )}
</div>
```

**Step 2: 验证时间线显示**

刷新页面，确认记录按时间线展示。

**验收标准:**
- [ ] 组件创建成功
- [ ] 记录按日期倒序显示
- [ ] 显示分类标签

---

## Task 6: 创建日历组件

**Files:**
- Create: `src/components/Calendar.astro`

**Step 1: 创建日历组件**

创建 `src/components/Calendar.astro`:

```astro
---
/**
 * 日历组件 - 显示有记录的日期
 */
interface RecordData {
  date: Date;
}

interface Record {
  id: string;
  data: RecordData;
}

interface Props {
  records: Record[];
  activeCategory: string;
}

const { records, activeCategory } = Astro.props;

// 获取当前年月
const url = new URL(Astro.request.url);
const yearParam = url.searchParams.get('year');
const monthParam = url.searchParams.get('month');

const today = new Date();
const currentYear = yearParam ? parseInt(yearParam) : today.getFullYear();
const currentMonth = monthParam ? parseInt(monthParam) : today.getMonth();

// 筛选当前分类的记录
const filteredRecords = activeCategory
  ? records.filter(r => r.id.startsWith(activeCategory + '/'))
  : records;

// 获取有记录的日期集合
const recordDates = new Set(
  filteredRecords.map(r => r.data.date.toDateString())
);

// 生成日历数据
function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days: Array<{ date: Date; isCurrentMonth: boolean; hasRecord: boolean }> = [];

  // 上个月的日期
  for (let i = 0; i < startDayOfWeek; i++) {
    const date = new Date(year, month, -startDayOfWeek + i + 1);
    days.push({ date, isCurrentMonth: false, hasRecord: recordDates.has(date.toDateString()) });
  }

  // 当月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({ date, isCurrentMonth: true, hasRecord: recordDates.has(date.toDateString()) });
  }

  // 下个月的日期
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ date, isCurrentMonth: false, hasRecord: recordDates.has(date.toDateString()) });
  }

  return days;
}

const calendarDays = generateCalendar(currentYear, currentMonth);
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 上/下月链接
const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

const baseUrl = `/records?view=calendar${activeCategory ? `&category=${activeCategory}` : ''}`;
const prevUrl = `${baseUrl}&year=${prevYear}&month=${prevMonth}`;
const nextUrl = `${baseUrl}&year=${nextYear}&month=${nextMonth}`;
---

<div class="calendar">
  <!-- 月份导航 -->
  <div class="flex items-center justify-between mb-6">
    <a href={prevUrl} class="p-2 text-warm-gray hover:text-warm-orange transition-colors">
      ◀
    </a>
    <h3 class="text-xl font-serif text-warm-brown">
      {currentYear}年{currentMonth + 1}月
    </h3>
    <a href={nextUrl} class="p-2 text-warm-gray hover:text-warm-orange transition-colors">
      ▶
    </a>
  </div>

  <!-- 星期标题 -->
  <div class="grid grid-cols-7 gap-1 mb-2">
    {weekDays.map((day) => (
      <div class="text-center text-sm text-warm-gray py-2">{day}</div>
    ))}
  </div>

  <!-- 日期网格 -->
  <div class="grid grid-cols-7 gap-1">
    {calendarDays.map((day) => (
      <div
        class:list={[
          'text-center py-3 rounded-lg relative',
          day.isCurrentMonth ? 'text-warm-brown' : 'text-warm-gray/40',
          day.hasRecord && day.isCurrentMonth ? 'bg-warm-beige' : ''
        ]}
      >
        {day.date.getDate()}
        {day.hasRecord && day.isCurrentMonth && (
          <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-warm-orange rounded-full"></span>
        )}
      </div>
    ))}
  </div>

  <!-- 图例 -->
  <div class="flex items-center gap-2 mt-6 text-sm text-warm-gray">
    <span class="w-2 h-2 bg-warm-orange rounded-full"></span>
    <span>有记录</span>
  </div>
</div>
```

**Step 2: 验证日历显示**

访问 `/records?view=calendar`，确认日历视图正常显示。

**验收标准:**
- [ ] 组件创建成功
- [ ] 显示当月日历
- [ ] 有记录的日期显示橙色圆点
- [ ] 可切换月份

---

## Task 7: 创建记录详情页

**Files:**
- Create: `src/pages/records/[...slug].astro`

**Step 1: 创建记录详情页**

创建 `src/pages/records/[...slug].astro`:

```astro
---
/**
 * 记录详情页 - 显示单条记录的完整内容
 */
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Nav from '../../components/Nav.astro';
import FormattedDate from '../../components/FormattedDate.astro';
import { SITE_TITLE } from '../../consts';

export async function getStaticPaths() {
  const records = await getCollection('records');
  return records.map((record) => ({
    params: { slug: record.id },
    props: { record },
  }));
}

const { record } = Astro.props;

// 格式化日期
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekDay = weekDays[date.getDay()];
  return `${year}年${month}月${day}日 ${weekDay}`;
}

// 从文件路径提取分类
function getCategory(id: string): string {
  return id.split('/')[0];
}
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <BaseHead title={`${formatDate(record.data.date)} - ${SITE_TITLE}`} description="记录详情" />
  </head>
  <body class="bg-warm-white min-h-screen">
    <Nav />

    <main class="max-w-3xl mx-auto px-6 py-12">
      <a href="/records" class="text-warm-orange hover:underline mb-6 inline-block">
        ← 返回记录列表
      </a>

      <article class="bg-white rounded-lg shadow-md p-8">
        <header class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <time class="text-warm-gray">
              {formatDate(record.data.date)}
            </time>
            <span class="text-sm px-3 py-1 bg-warm-beige text-warm-brown rounded-full">
              {getCategory(record.id)}
            </span>
          </div>
        </header>

        <div class="prose prose-lg max-w-none text-warm-gray leading-relaxed" set:html={record.body} />
      </article>
    </main>

    <Footer />
  </body>
</html>
```

**Step 2: 验证详情页**

点击时间线中的"查看详情"链接，确认跳转到详情页。

**验收标准:**
- [ ] 详情页创建成功
- [ ] 显示记录完整内容
- [ ] 返回链接正常工作

---

## Task 8: 添加导航入口

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: 在导航中添加"记录"链接**

修改 `src/components/Nav.astro`，在 `navLinks` 数组中添加：

```typescript
const navLinks = [
  { name: '首页', href: '/' },
  { name: '项目', href: '/projects' },
  { name: '博客', href: '/blog' },
  { name: '记录', href: '/records' },  // 新增
  { name: '关于', href: '/about' },
  { name: '联系', href: '/contact' },
];
```

**Step 2: 验证导航**

刷新页面，确认导航栏显示"记录"链接。

**验收标准:**
- [ ] 导航栏显示"记录"链接
- [ ] 点击可跳转到记录页

---

## Task 9: 最终验证

**Step 1: 本地测试所有功能**

```bash
cd "E:/Project/personal_pages" && pnpm dev
```

测试项：
- [ ] `/records` 页面正常显示
- [ ] 时间线视图正常
- [ ] 日历视图正常
- [ ] 分类筛选正常
- [ ] 统计面板显示正确
- [ ] 详情页正常
- [ ] 导航链接正常

**Step 2: 构建测试**

```bash
cd "E:/Project/personal_pages" && pnpm build
```

Expected: 构建成功，无错误

**Step 3: 提交代码**

```bash
git add .
git commit -m "feat: 添加记录模块（时间线/日历视图）"
git push
```

---

## 使用说明

### 添加新分类

在 `src/content/records/` 下创建新文件夹，如 `读书/`

### 添加新记录

在新分类文件夹下创建 `.md` 文件：

```markdown
---
date: 2026-03-11
---

今天读了《xxx》第三章，有一些有趣的见解...
```

---

## 执行选项

**Plan complete and saved to `docs/plans/2026-03-11-records-module.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**

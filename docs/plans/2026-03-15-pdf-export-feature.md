# PDF Export Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add PDF export functionality to blog and project detail pages, allowing users to download articles with proper formatting and rendered images.

**Architecture:** Create a reusable `ExportPdf.astro` component that uses html2pdf.js library (loaded on-demand) to generate PDFs from article content. The component will be integrated into both blog and project detail pages.

**Tech Stack:** Astro, html2pdf.js, Tailwind CSS v4

---

## Task 1: Install html2pdf.js Dependency

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run:
```bash
pnpm add html2pdf.js
```

Expected: Package added successfully to dependencies.

**Step 2: Verify installation**

Run:
```bash
pnpm list html2pdf.js
```

Expected: Shows installed version (e.g., `html2pdf.js 0.10.2`)

---

## Task 2: Create ExportPdf Component

**Files:**
- Create: `src/components/ExportPdf.astro`

**Step 1: Create the component with button UI**

Create file `src/components/ExportPdf.astro`:

```astro
---
/**
 * ExportPdf Component - PDF export button for articles
 * Uses html2pdf.js (loaded on-demand) to generate PDFs
 * Supports both blog posts and project pages
 */
interface Props {
  filename?: string;
}

const { filename = 'document' } = Astro.props;
---

<button
  id="export-pdf-btn"
  type="button"
  class="export-pdf-button"
  data-filename={filename}
  aria-label="导出为 PDF 文件"
>
  <svg class="export-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="18" x2="12" y2="12"></line>
    <line x1="9" y1="15" x2="15" y2="15"></line>
  </svg>
  <span class="button-text">导出 PDF</span>
</button>

<style>
  .export-pdf-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--accent, #e07a5f);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-family: "Noto Serif SC", serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;
  }

  .export-pdf-button:hover {
    background-color: var(--accent-dark, #6b4423);
  }

  .export-pdf-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .export-pdf-button.loading .button-text {
    opacity: 0.7;
  }

  .export-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  // Dynamic import of html2pdf.js - only loads when button is clicked
  async function exportToPdf(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    const filename = button.dataset.filename || 'document';

    // Prevent double-click
    if (button.disabled) return;

    // Set loading state
    button.disabled = true;
    button.classList.add('loading');
    const originalText = button.querySelector('.button-text')?.textContent || '导出 PDF';
    if (button.querySelector('.button-text')) {
      button.querySelector('.button-text')!.textContent = '生成中...';
    }

    // Show spinner
    const icon = button.querySelector('.export-icon') as SVGElement;
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    icon.style.display = 'none';
    button.insertBefore(spinner, icon);

    try {
      // Dynamically import html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;

      // Find the article element to export
      const article = document.querySelector('article');
      if (!article) {
        throw new Error('找不到文章内容');
      }

      // Create a clone for PDF generation
      const clone = article.cloneNode(true) as HTMLElement;

      // Create wrapper with proper styling
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        font-family: "Noto Serif SC", "Source Serif Pro", serif;
        color: #5c5c5c;
        line-height: 1.8;
        padding: 20px;
        background-color: #fff;
      `;
      wrapper.appendChild(clone);

      // PDF configuration
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const
        }
      };

      // Generate and download PDF
      await html2pdf().set(opt).from(wrapper).save();

    } catch (error) {
      console.error('PDF export failed:', error);
      if (button.querySelector('.button-text')) {
        button.querySelector('.button-text')!.textContent = '导出失败';
      }
      setTimeout(() => {
        if (button.querySelector('.button-text')) {
          button.querySelector('.button-text')!.textContent = originalText;
        }
      }, 2000);
    } finally {
      // Reset button state
      button.disabled = false;
      button.classList.remove('loading');
      if (button.querySelector('.button-text')) {
        button.querySelector('.button-text')!.textContent = originalText;
      }

      // Restore icon
      spinner.remove();
      icon.style.display = '';
    }
  }

  // Attach click handler
  document.getElementById('export-pdf-btn')?.addEventListener('click', exportToPdf);
</script>
```

**Step 2: Verify file structure**

Run:
```bash
ls src/components/ExportPdf.astro
```

Expected: File exists at the path.

---

## Task 3: Integrate ExportPdf into Blog Detail Page

**Files:**
- Modify: `src/pages/blog/[slug].astro`

**Step 1: Add import statement**

In `src/pages/blog/[slug].astro`, add the import after line 11 (after FormattedDate import):

```astro
import ExportPdf from '../../components/ExportPdf.astro';
```

**Step 2: Add export button to bottom navigation**

Find the bottom navigation section (around line 250-260):

```astro
<!-- 底部返回链接 -->
<nav class="mt-12 pt-8 border-t border-warm-beige">
  <a
    href="/blog"
    class="inline-flex items-center text-warm-orange hover:text-warm-brown transition-colors font-serif"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    返回博客列表
  </a>
</nav>
```

Replace with:

```astro
<!-- 底部操作栏 -->
<nav class="mt-12 pt-8 border-t border-warm-beige flex flex-wrap items-center justify-between gap-4">
  <a
    href="/blog"
    class="inline-flex items-center text-warm-orange hover:text-warm-brown transition-colors font-serif"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    返回博客列表
  </a>
  <ExportPdf filename={title} />
</nav>
```

---

## Task 4: Integrate ExportPdf into Project Detail Page

**Files:**
- Modify: `src/pages/projects/[slug].astro`

**Step 1: Add import statement**

In `src/pages/projects/[slug].astro`, add the import after line 11 (after FormattedDate import):

```astro
import ExportPdf from '../../components/ExportPdf.astro';
```

**Step 2: Add export button to bottom navigation**

Find the bottom navigation section (around line 303-313):

```astro
<!-- 底部返回链接 -->
<nav class="mt-12 pt-8 border-t border-warm-beige">
  <a
    href="/projects"
    class="inline-flex items-center text-warm-orange hover:text-warm-brown transition-colors font-serif"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    返回项目列表
  </a>
</nav>
```

Replace with:

```astro
<!-- 底部操作栏 -->
<nav class="mt-12 pt-8 border-t border-warm-beige flex flex-wrap items-center justify-between gap-4">
  <a
    href="/projects"
    class="inline-flex items-center text-warm-orange hover:text-warm-brown transition-colors font-serif"
  >
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    返回项目列表
  </a>
  <ExportPdf filename={title} />
</nav>
```

---

## Task 5: Test the Feature

**Step 1: Start development server**

Run:
```bash
pnpm dev
```

Expected: Server starts at http://localhost:4321

**Step 2: Test blog page export**

1. Navigate to http://localhost:4321/blog/aorchestra/
2. Scroll to bottom of article
3. Click "导出 PDF" button
4. Verify:
   - Button shows "生成中..." while processing
   - PDF downloads automatically
   - PDF contains article title, date, content
   - Images are rendered correctly (not as links)

**Step 3: Test project page export**

1. Navigate to http://localhost:4321/projects/plug-and-play-diffusion/
2. Scroll to bottom
3. Click "导出 PDF" button
4. Verify same behavior as blog page

**Step 4: Verify no console errors**

Open browser DevTools console and verify no JavaScript errors.

---

## Task 6: Build and Deploy Test

**Step 1: Build the project**

Run:
```bash
pnpm build
```

Expected: Build completes without errors.

**Step 2: Preview production build**

Run:
```bash
pnpm preview
```

Expected: Preview server starts, PDF export works in production build.

---

## Summary

| File | Action |
|------|--------|
| `package.json` | Add html2pdf.js dependency |
| `src/components/ExportPdf.astro` | Create new component |
| `src/pages/blog/[slug].astro` | Add export button |
| `src/pages/projects/[slug].astro` | Add export button |

**Key Implementation Details:**
- html2pdf.js loaded dynamically only when user clicks export button (no impact on initial page load)
- Article content extracted via `document.querySelector('article')`
- PDF configured for A4 format with 10mm margins
- Images rendered via `useCORS: true` and `scale: 2` for quality
- Loading state with spinner animation during generation
- Error handling with user feedback

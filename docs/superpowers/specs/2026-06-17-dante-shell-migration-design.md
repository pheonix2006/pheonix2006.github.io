# Dante Shell Migration Design

## Goal

Use Dante Astro Theme as the presentation shell for the personal website while preserving the user's existing long-form project and blog content.

## Scope

This migration keeps the current repository, GitHub Pages deployment, and authored content as the source of truth. The implementation replaces the current hand-built UI shell with a Dante-inspired portfolio/blog shell and adapts it to the existing content model.

In scope:

- Preserve real project articles in `src/content/projects`.
- Preserve real blog content, especially the AORCHESTRA article.
- Preserve relevant images and files in `src/assets` and `public`.
- Keep `/projects`, `/projects/[slug]`, `/blog`, and `/blog/[slug]` routes.
- Use a central site configuration for title, navigation, hero copy, social links, and pagination.
- Keep project detail pages as long-form Markdown-rendered case studies.
- Keep GitHub Pages static deployment from `main`.

Out of scope for this phase:

- Building a web admin UI.
- Pulling GitHub metadata automatically.
- Rewriting project/blog prose.
- Keeping starter/mock content.
- Keeping the records/life-log module.

## Architecture

The site remains Astro static output. Dante's layout, head, navigation, footer, pagination, and content page patterns become the new shell. Existing Astro content collections remain the content source, with schema compatibility for the current frontmatter fields.

Projects and blog posts render through shared layout primitives. Project detail pages add portfolio-specific metadata controls such as source link, demo link, tags, dates, and optional hero image, while preserving the Markdown body.

## Content Rules

Real content is preserved. Mock content is removed or excluded from navigation.

Project frontmatter remains compatible with:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `heroImage`
- `repo`
- `url`
- `tags`

Blog frontmatter remains compatible with:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `heroImage`
- `tags`
- optional external references such as `repo` and `paper`

## Validation

The migration is acceptable when:

- The site builds as a static Astro site.
- The homepage loads without mock personal data.
- `/projects` lists the real projects.
- Real project pages such as `dify-rag-system` and `ai-agent-framework` render their long-form content.
- `/blog/aorchestra` renders the existing long-form blog article.
- Example starter content is not shown in primary navigation or listings.
- Desktop and mobile screenshots have no obvious blank screens, broken layout, or missing core content.

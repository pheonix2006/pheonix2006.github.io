---
name: humanizer-zh
description: Rewrite and review Chinese portfolio, project, blog, resume, about, and contact copy so it sounds natural, specific, and less AI-generated. Use when editing `src/content/projects/*.md`, `src/content/blog/*.md`, page copy, or any Chinese long-form text that feels report-like, promotional, over-polished, or formulaic.
---

# Humanizer-zh

Use this skill to make Chinese writing in this portfolio sound like it came from a real person with real project experience. The goal is not to make text casual. The goal is to make it concrete, honest, and readable.

This project-level skill is adapted from `op7418/Humanizer-zh`, with extra constraints for Xingjian Li's portfolio site.

## Workflow

1. Read the target text and identify its job: project case study, blog note, resume-style section, about page, or contact copy.
2. List facts that must be preserved: dates, course names, grades, company names, technical stack, repo links, project ownership, and user-provided claims.
3. Remove AI writing patterns: inflated meaning, generic praise, mechanical lists, excessive bold text, slogan-like conclusions, and vague attribution.
4. Rewrite with concrete details, varied rhythm, and first-person perspective when it fits the page.
5. Check the result aloud mentally. If it sounds like a report template, revise again.

## Preserve

- Keep factual claims, dates, names, links, and technical terms unchanged unless the user asks otherwise.
- Keep the user's actual project contribution and ownership claims.
- Keep meaningful uncertainty. Do not turn "I think" into a fake certainty.
- Do not invent metrics, awards, user counts, deployment status, citations, or production claims.
- Do not hide known limitations. Rewrite them plainly.

## Common AI Patterns To Remove

- Inflated phrases: "标志着", "彰显", "体现", "奠定基础", "关键转折点", "持续影响", "不断演变的格局".
- Promotional language: "无缝", "强大", "令人惊叹", "开创性", "丰富的", "充满活力的", "深刻的".
- Empty importance claims: "至关重要", "核心能力", "关键作用", "显著提升", "充分展示".
- Formulaic connectors: "此外", "然而", "总而言之", "值得注意的是", "换句话说".
- Mechanical structures: "不仅...而且...", "这不仅仅是...而是...", forced three-item lists, and repeated "从 X 到 Y".
- Vague authority: "行业专家认为", "多个来源显示", "研究表明" without a named source.
- Chatbot leftovers: "当然", "希望这对你有帮助", "如果你想了解更多".
- Over-formatting: too much bold text, emoji bullets, and bullet items that start with a bold inline title plus colon.
- Generic positive endings: "未来可期", "迈出了重要一步", "有广阔前景".

## Portfolio Style

- Prefer concrete project experience over abstract evaluation.
  - Weak: "这个项目体现了我的 AI 工程能力。"
  - Better: "这个项目里最难的部分不是调接口，而是把生成流程拆成能观察、能重试、能复盘的节点。"
- Use first person when discussing decisions, tradeoffs, and reflection.
- Keep technical English terms such as LangGraph, FastAPI, SSE, MediaPipe, provider, trace, and pipeline when they are the natural project vocabulary.
- Use Chinese punctuation and natural Chinese sentence order.
- Avoid making every paragraph the same size. Mix short paragraphs with longer explanatory ones.
- Do not make every section end with a "lesson" sentence. Let some sections end on a concrete detail.
- Keep Markdown frontmatter unchanged unless the task explicitly asks to edit metadata.

## Project Case Study Shape

For `src/content/projects/*.md`, a natural order is:

1. What the project was and why it existed.
2. What constraint or problem made it interesting.
3. What changed during the project and why.
4. How the system is structured.
5. Which parts were difficult or important.
6. What the result was, with honest limitations.
7. What the author learned or would improve.

This order is a guide, not a required template. Do not force every project into identical headings.

## Rewrite Tactics

- Replace abstract nouns with concrete actions.
- Replace "能力展示" language with "I built / I changed / I debugged / I learned" language.
- Split long, overloaded sentences.
- Merge bullet lists into prose when the list only repeats generic claims.
- Keep lists when they help scanning technical components, but make each item specific.
- Remove a sentence if it only tells the reader how important the previous sentence was.
- Use "是" and "有" instead of inflated structures like "作为" and "具备...能力" when simpler wording works.

## Output

When editing repository files, patch the file directly and summarize the writing changes briefly.

When only asked to rewrite text, return:

1. The rewritten Chinese text.
2. A short note on the main changes, only if useful.

Do not include a numeric score unless the user asks for evaluation.

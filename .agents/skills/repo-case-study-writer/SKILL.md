---
name: repo-case-study-writer
description: Use when turning a GitHub repository or local repo into a Chinese portfolio project case study for this Astro personal site, especially when the task needs repository investigation, user interview, personal contribution capture, long-form project writing, and page/build verification.
---

# Repo Case Study Writer

Turn a repo into a job-facing project case study, not a README summary. The core rule is: first establish evidence, then interview the user for personal contribution and context, then write the project page, then verify it in the site.

## Required Skill Order

- Use `superpowers:dispatching-parallel-agents` when repo investigation has multiple independent tracks.
- Use `superpowers:brainstorming` for the interview and narrative alignment phase.
- Use `humanizer-zh` after the first full draft, again after any substantial rewrite, and before finalizing Chinese prose. Do not claim the prose is final unless this pass has happened.
- Use `superpowers:verification-before-completion` before claiming the page is done.

If one of these skills is unavailable, state the gap and follow the same workflow manually.

## Hard Gates

Do not write or patch the final project page until all three are true:

1. Repo evidence has been collected and separated from inference.
2. The user has answered interview questions about background, contribution, difficulty, tradeoffs, and outcome.
3. The user has approved the article brief or outline.

Exception: if the user explicitly says to proceed from existing notes, state which facts are user-provided and which are repo-derived.

Never invent users, metrics, deployment status, grades, team size, performance gains, production adoption, or personal ownership. If a claim cannot be verified from the repo or user notes, mark it as an assumption or leave it out.

## Repo Investigation

Clone external repos into `.research/` unless the user gives another location. Keep `.research/` ignored.

Run investigation in two rounds:

1. Broad scout with 1-2 agents or passes:
   - README, feature claims, demo links, screenshots, install/run path.
   - Directory structure, language/framework stack, app entrypoints.
2. Targeted scout with parallel tracks:
   - Architecture and data flow.
   - Core algorithms, AI pipeline, prompts, providers, or agent graph.
   - Frontend/user experience/API surface.
   - Tests, CI, config, observability, storage, deployment boundaries.
   - Evidence for complexity, limitations, and risks.

Main agent must re-open the most important files or command outputs before using a claim in the article.

## Evidence Dossier

Before interviewing, produce a compact dossier with three buckets:

- **Verified facts:** directly supported by code, README, config, tests, commit history, demo, or command output.
- **Reasonable inferences:** implied by structure, but not explicitly stated.
- **Interview needed:** personal contribution, motivation, constraints, collaborators, failures, results, and what the user wants emphasized.

Use this dossier to drive questions. Do not dump raw repo notes into the final article.

## Interview Pattern

Interview like a journalist. Ask short rounds instead of one huge questionnaire.

Cover these areas:

- Background: course, internship, personal project, research, competition, or product context.
- Constraint: what made the project non-trivial.
- Contribution: what the user personally designed, built, debugged, tuned, or decided.
- Difficulty: where the project actually got stuck.
- Tradeoff: what alternatives were considered or abandoned.
- Result: grade, demo, deployment, usage, feedback, or credible outcome.
- Reflection: what the user would change now and what limitation should be stated honestly.

Push once when the answer is too generic. For example, ask "你当时为什么这样选，而不是另一种方案？" or "这里具体哪一部分是你亲手做的？"

## Brief Before Writing

After investigation and interview, present a brief for user approval:

- Proposed title and one-sentence positioning.
- Target reader or job signal.
- Three to five strongest project points.
- The reader-first plan: what a first-time reader must understand in the first 3 sections.
- The core workflow that must be expanded, not merely named.
- Internal terms, filenames, statuses, test names, or route names that should be translated into plain language or moved to a technical section.
- Facts to include and facts to avoid.
- Section outline.
- Images, links, repo URL, demo URL, and frontmatter plan.

Only then write files.

## Reader and Narrative Shape

Default target reader: recruiters and interviewers who can judge project value, but may not know this repo, the domain, or the internal code terms. Write so a first-time reader can understand what the project does before seeing implementation details.

Use an A+C shape by default:

- **A: Reader-first project story.** Start with what was built, why it exists, who uses it, and what the user can actually do. Avoid assuming the reader has opened the repo or README.
- **C: Technical deep dive.** Put architecture, workflow mechanics, tests, limitations, and implementation details in a dedicated technical section. Do not remove technical depth; organize it so the reader can follow it.

If the project's main value is a workflow, expand the workflow as a first-class section. Cover: input, task resolution, data/source collection, user checkpoints, execution stages, verification, continuation/repair, and final boundary. Do not write only "supports X workflow".

## Site Integration

For this Astro site, project pages usually live in `src/content/projects/*.md`.

Use existing schema and patterns:

- `title`, `description`, `pubDate`, optional `updatedDate`.
- Optional `heroImage`, usually imported from `src/assets/`.
- Optional `repo`, `url`, `urlLabel`, and `tags`.
- Long-form Markdown body with headings that fit the project, not a rigid template.

Update `src/data/site-config.ts` only when the project should appear on the Home resume section or the user asks for it.

Prefer local assets in `src/assets/` for project images when available. Verify hero images are not cropped in detail pages.

## Writing Standard

Write in Chinese by default for this user's portfolio.

The article should answer:

- What was built?
- Why did it need to exist?
- What was technically or product-wise hard?
- What did the user personally contribute?
- What architecture or workflow made it work?
- What result or evidence exists?
- What limitations remain?

Avoid:

- README paraphrase without personal story.
- Assuming the reader has used the project or knows its internal terms.
- Dumping repo investigation notes directly into the article.
- Long lists of internal filenames, statuses, test names, route names, receipts, handoffs, or JSON artifacts in the main narrative.
- "体现能力", "彰显", "至关重要", "显著提升" unless backed by concrete evidence.
- Overusing bold inline titles in every bullet.
- Hiding uncertainty or unfinished parts.

Keep technical terms in English when they are normal vocabulary: LangGraph, FastAPI, SSE, RAG, Text2SQL, provider, trace, pipeline.

Translate internal terms before publishing. Examples:

| Internal term type | Prefer in article |
| --- | --- |
| Workbench/files/status receipts | 本地工作文件夹、状态记录、继续流程用的记录 |
| Pipeline/router/handoff | 执行计划、流程分支、交接步骤 |
| Source evidence/reference files | 原始资料、来源证据、可回查的材料 |
| Test case names or low-level assertions | 验证了哪些用户可理解的边界 |

Technical names may appear in the technical deep dive when they are necessary, but every such term needs a plain-language explanation nearby.

## Reader-First Self-Check

Run this check before writing, after the first draft, after every substantial rewrite, and before final response:

1. Can a reader who has never seen the repo explain what the project does after the first 3 sections?
2. Is the target reader clear: recruiter/interviewer, possibly technical, but not repo-native?
3. Is the main user journey or product workflow visible before the technical section?
4. Is the strongest workflow expanded with input, checkpoints, execution, verification, recovery, and final boundary?
5. Are internal filenames/statuses/test names translated or moved out of the main narrative?
6. Does the technical section preserve real depth without becoming a raw README or code-review note dump?
7. Did `humanizer-zh` run after the latest substantial prose change?

## Verification

Before completion, run the relevant checks:

- `npx pnpm@9 build`
- Relevant Playwright tests if present.
- Browser or screenshot check for `/projects` and the new project detail page.
- Check links, hero image dimensions, mobile overflow, and visible language.

If the user asks to publish, commit and push intentionally, wait for GitHub Pages deployment, then verify the public URL instead of only localhost.

## Common Failures

| Failure | Correction |
| --- | --- |
| README rewrite | Add interview-derived motivation, contribution, tradeoffs, and reflection. |
| Fake achievements | Remove or mark as unknown unless verified or user-provided. |
| One-shot interview | Ask follow-up questions until contribution and decisions are concrete. |
| Context overload | Use subagents for repo scouting; main agent only verifies key evidence. |
| AI-sounding article | Apply `humanizer-zh` and rewrite with concrete first-person project experience. |
| Build-only verification | Open the actual page and inspect layout, links, image rendering, and mobile behavior. |

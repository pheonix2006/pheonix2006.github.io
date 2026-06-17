import type { CollectionEntry } from 'astro:content';

const hiddenProjectIds = new Set(['example-project']);
const hiddenBlogIds = new Set(['first-post', 'second-post', 'third-post', 'markdown-style-guide', 'using-mdx']);

export function isVisibleProject(project: CollectionEntry<'projects'>) {
  return !hiddenProjectIds.has(project.id);
}

export function isVisiblePost(post: CollectionEntry<'blog'>) {
  return !hiddenBlogIds.has(post.id);
}

export function sortByPubDateDesc<T extends CollectionEntry<'projects'> | CollectionEntry<'blog'>>(a: T, b: T) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

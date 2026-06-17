import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import siteConfig from '../data/site-config';
import { isVisiblePost, sortByPubDateDesc } from '../lib/content';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter(isVisiblePost).sort(sortByPubDateDesc);
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}

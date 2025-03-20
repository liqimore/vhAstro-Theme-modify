import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { fmtTime, getDescription } from '@/utils/index'
import SITE_CONFIG from '@/config';
const { Title, Description } = SITE_CONFIG;


export async function GET(context: any) {
	const posts = await getCollection('blog');
	return rss({
		title: Title,
		description: Description,
		site: context.site,
		items: posts.filter(i => !i.data.hide).map((post) => ({
			title: post.data.title,
			pubDate: post.data.updated || post.data.date,
			description: getDescription(post),
			link: fmtTime(post.data.date, "YYYY") + `/${post.data.id}`
		})).sort((a: any, b: any) => (new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())),
	});
}

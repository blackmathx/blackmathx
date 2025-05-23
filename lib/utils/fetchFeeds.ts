'use client';

import { XMLParser } from 'fast-xml-parser';
import { FeedItem, processFeedItems } from './feedProcessor';


// function to fetch feeds from the server
export async function getRssFeeds() {
	const feedUrl = 'https://feeds.megaphone.fm/GLT1412515089';
	const podcastUrl = 'https://feeds.npr.org/381444908/podcast.xml';
	const foxNewsUrl = 'https://moxie.foxnews.com/google-publisher/latest.xml';
	const arsUrl = 'https://feeds.arstechnica.com/arstechnica/index';
	//const hackerNewsUrl = 'https://hnrss.org/frontpage';
	

	const [jre, freshAir, foxNews, ars] = await Promise.all([
		getFeed(feedUrl),
		getFeed(podcastUrl),
		getFeed(foxNewsUrl),
		getFeed(arsUrl)
	]);

	const processedJre = processFeedItems(jre, {filterKeywords: [], sortBy: 'date', limit: 10});
	const processedFreshAir = processFeedItems(freshAir, {filterKeywords: [], sortBy: 'date', limit: 10});
	const processedFoxNews = processFeedItems(foxNews, {filterKeywords: [], sortBy: 'date', limit: 20});
	const processedArs = processFeedItems(ars, {filterKeywords: [], sortBy: 'date', limit: 20});

	return {
		jreItems: processedJre,
		freshAirItems: processedFreshAir,
		foxNewsItems: processedFoxNews,
		arsItems: processedArs
	};
}


export async function getFeed(url: string): Promise<FeedItem[]> {
	try {
		const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(url));
		const xmlText = await response.text();
		
		const parser = new XMLParser();
		const result = parser.parse(xmlText);
		
		const items: FeedItem[] = [];
		const rssItems = result.rss?.channel?.item || [];
		
		rssItems.slice(0, 15).forEach((item: any) => {
			items.push({
				title: item.title || 'No title',
				link: item.link || '#'
			});
		});
		
		return items;
	} catch (error) {
		console.error("Error loading feed:", error);
		return [];
	}
}
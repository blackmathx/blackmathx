'use client';

import { useEffect, useState } from "react";
import { getRssFeeds } from "@/lib/utils/fetchFeeds";

import { FeedItem } from "@/lib/utils/feedProcessor";



const FeedSection = ({ title, items }: { title: string; items: FeedItem[] }) => (
	<div className="border border-gray-300 m-2 p-2">
		<div className="font-semibold mt-0">{title}</div>
		<div>
			{items.map((item, index) => (
				<div key={index} className="my-1.5 py-0.5 hover:text-slate-600 border-b border-gray-200">
					<a href={item.link} target="_blank" rel="noopener noreferrer">
						{item.title}
					</a>
				</div>
			))}
		</div>
	</div>
);

export default function RssFeed() {


	const [rssFeed, setRssFeed] = useState<{
		jreItems: FeedItem[]
		freshAirItems: FeedItem[]
		foxNewsItems: FeedItem[]
		arsItems: FeedItem[]
	} | null>(null);


	useEffect(() => {
		getRssFeeds()
			.then((data) => {
				setRssFeed(data);
			})
			.catch((error) => {
				console.error("Error fetching RSS feeds:", error);
			});
	}, []);



	return (
		<>


				<section className="w-full md:w-3/4 xl:w-4/5 bg-white p-4 rounded shadow">
					<div className="text-2xl font-semibold mb-4">RSS Feed</div>
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
						{(!rssFeed) ? <p>Loading RSS feeds...</p> :
							<>
								<FeedSection title="JRE" items={rssFeed.jreItems} />
								<FeedSection title="Fresh Air" items={rssFeed.freshAirItems} />
								<FeedSection title="Fox News" items={rssFeed.foxNewsItems} />
								<FeedSection title="Ars Technica" items={rssFeed.arsItems} />\
							</>
						}
					</div>
				</section>

		</>
	);
}



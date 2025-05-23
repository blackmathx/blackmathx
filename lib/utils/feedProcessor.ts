

export interface FeedItem {
	title: string;
	link: string;
}

export function processFeedItems(items: FeedItem[], options?: {
	filterKeywords?: string[];
	sortBy?: 'title' | 'date';
	limit?: number;
}): FeedItem[] {
	let processedItems = [...items];

	// Filter out FBI related items
	processedItems = processedItems.filter(item => 
		!item.title.toLowerCase().includes('fbi')
	);

	// Filter by keywords if provided
	if (options?.filterKeywords && options.filterKeywords.length > 0) {
		processedItems = processedItems.filter(item => 
			options.filterKeywords!.some(keyword => 
				item.title.toLowerCase().includes(keyword.toLowerCase())
			)
		);
	}

	// Sort items if requested
	if (options?.sortBy === 'title') {
		processedItems.sort((a, b) => a.title.localeCompare(b.title));
	}

	// Apply limit if specified
	if (options?.limit) {
		processedItems = processedItems.slice(0, options.limit);
	}

	return processedItems;
} 
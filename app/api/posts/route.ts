
const posts = [
	{ id: '1', title: 'Todo Something', date: '2025-06-09' },
	{ id: '2', title: 'Other data to watch', date: '2025-06-10' },
	{ id: '3', title: 'Anthropic scales', date: '2025-06-11' },
]

export async function GET() {
	return Response.json(posts);
}
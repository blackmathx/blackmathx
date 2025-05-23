



export default async function BlogId({ params, }: { params: Promise<{ blogId: string }>;}) {

	const blogId = (await params).blogId;

	return (
	
		<h1>{blogId}</h1>

	)

}
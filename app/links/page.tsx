import { techNews, news, personalBlogs, techBlogs } from "@/lib/links";
import Head from "next/head";

const LinksPage = () => {
	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<div className="mx-8">
				<div className="text-2xl font-semibold mb-4">Links</div>
				<div className="space-y-8">
					{/* Tech News and News */}
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
						<div>
							<h2 className="text-xl font-medium mb-3">Tech News</h2>
							<ul className="space-y-2">
								{techNews.map((link) => (
									<li key={link.title}>
										<a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-xl font-medium mb-3">News</h2>
							<ul className="space-y-2">
								{news.map((link) => (
									<li key={link.title}>
										<a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Personal Blogs and Tech Blogs */}
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
						<div>
							<h2 className="text-xl font-medium mb-3">Personal Blogs</h2>
							<ul className="space-y-2">
								{personalBlogs.map((link) => (
									<li key={link.title}>
										<a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-xl font-medium mb-3">Tech Blogs</h2>
							<ul className="space-y-2">
								{techBlogs.map((link) => (
									<li key={link.title}>
										<a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LinksPage;

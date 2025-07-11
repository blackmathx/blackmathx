import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
// import Image from "next/image";
// import ProfileImage from "@/public/images/profile.png"
import SignOut from "@/components/SignOut";
import { getUser } from "@/lib/supabase/server";


export const metadata: Metadata = {
	title: "blackmathx",
	description: "",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

	console.log("redering homepage")


	const user = await getUser()


	return (
		<html lang="en">
			<body className="font-sans antialiased">
				<header className="shadow">
					<div className="2xl:max-w-[1900px] xl:max-w-[90%] w-full mx-auto px-4 sm:px-6 lg:px-16">
						<div className="flex justify-between items-center py-4">
							{/* Logo / Title */}
							<div className="flex items-center">
								{/* <Image priority={false} className="rounded-full xl:w-16 xl:h-16 w-12 h-12" src={ProfileImage} alt="" /> */}
								<Link className="text-2xl text-gray-800 pl-4" href="/">blackmathx</Link>
							</div>

							{/* Menu Button (Mobile) */}
							<div className="md:hidden">
								<button
									id="menu-toggle"
									className="text-gray-800 focus:outline-none"
									aria-label="Toggle menu"
								>
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								</button>
							</div>

							{/* Navigation Links (Desktop) */}
							<nav className="hidden md:flex  space-x-12 xl:space-x-24 text-gray-700">
								<Link href="https://github.com/blackmathx/blackmathx" className="hover:text-blue-600 p-1">GitHub</Link>
								<Link href="/photos" className="hover:text-blue-600 p-1">Photos</Link>
								<Link href="/rss-feed" className="hover:text-blue-600 p-1">RSS Feed</Link>
								<Link href="/links" className="hover:text-blue-600 p-1">Links</Link>
								{(user) &&
									<>
										<Link href="/dashboard" className="hover:text-blue-600 p-1">Dashboard</Link>
										<SignOut type="desktop" />
									</>
								}
								{(!user) &&
									<>
										<Link href="/login" className="flex-1 bg-slate-500 hover:bg-blue-700 text-white py-1 px-3 rounded transition-colors">Sign In</Link>

									</>
								}


							</nav>
						</div>

						{/* Mobile Menu */}
						<div id="mobile-menu" className="md:hidden hidden flex-col space-y-2 pb-4">
							{/* <Link href="/about" className="block text-gray-700 hover:text-blue-600">About</Link> */}
							<Link href="https://github.com/blackmathx/blackmathx" className="block text-gray-700 hover:text-blue-600">GitHub</Link>
							<Link href="/photos" className="block text-gray-700 hover:text-blue-600">Photos</Link>
							<Link href="/rss-feed" className="block text-gray-700 hover:text-blue-600">RSS Feed</Link>
							<Link href="/links" className="block text-gray-700 hover:text-blue-600">Links</Link>
							{(user) &&
								<>
									<Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
									<SignOut type="mobile" />
								</>

							}
							{(!user) &&
								<>
									<Link href="/login" className="block text-gray-700 hover:text-blue-600">Sign In</Link>

								</>
							}
						</div>
					</div>
				</header>

				<main className="2xl:max-w-[80%] xl:max-w-[90%] pt-8 mx-auto sm:px-6 lg:px-8">
					{children}
				</main>

				{/* Client-side script for menu toggle */}
				<script dangerouslySetInnerHTML={{
					__html: `
						document.addEventListener('DOMContentLoaded', function() {
							const menuToggle = document.getElementById('menu-toggle');
							const mobileMenu = document.getElementById('mobile-menu');
							
							if (menuToggle && mobileMenu) {
								menuToggle.addEventListener('click', () => {
									mobileMenu.classList.toggle('hidden');
								});
							}
						});
					`
				}} />
			</body>
		</html>
	);
}

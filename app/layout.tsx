import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import ProfileImage from "@/public/images/profile.png"
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
								<Image priority={false} className="rounded-full xl:w-12 xl:h-12 w-10 h-10" src={ProfileImage} alt="" />
								<Link className="text-2xl !text-gray-700 dark:!text-gray-300 pl-4 hover:!no-underline" href="/">blackmathx</Link>
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
								<a href="/github" className="!text-gray-700 dark:!text-gray-300 p-1">GitHub</a>
								<Link href="/photos" className="!text-gray-700 dark:!text-gray-300 p-1">Photos</Link>
								<Link href="/rss-feed" className="!text-gray-700 dark:!text-gray-300 p-1">RSS Feed</Link>
								<Link href="/links" className="!text-gray-700 dark:!text-gray-300 p-1">Links</Link>
								{(user) &&
									<>
										<Link href="/dashboard" className="!text-gray-700 dark:!text-gray-300 p-1">Dashboard</Link>
										<SignOut type="desktop" />
									</>
								}
								{(!user) &&
									<>
										<Link href="/login" className="bg-slate-700 hover:bg-slate-500 !text-white py-1 px-5 rounded transition-colors hover:!no-underline">Sign in</Link>
									</>
								}


							</nav>
						</div>

						{/* Mobile Menu */}
						<div id="mobile-menu" className="md:hidden hidden flex-col space-y-2 pb-4">
							<a href="/github" className="block">GitHub</a>
							<Link href="/photos" className="block">Photos</Link>
							<Link href="/rss-feed" className="block">RSS Feed</Link>
							<Link href="/links" className="block">Links</Link>
							{(user) &&
								<>
									<Link href="/dashboard" className="block">Dashboard</Link>
									<SignOut type="mobile" />
								</>

							}
							{(!user) &&
								<>

									<Link href="/login" className="block">Sign In</Link>

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

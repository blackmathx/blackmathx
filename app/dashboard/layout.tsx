
import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { BsChatRightText } from "react-icons/bs";
import { FaLink, FaRss } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="min-h-screen">
				<header className="py-4">
					<div className="flex flex-row justify-between">
						<div></div>
						<PomodoroTimer />
					</div>
				</header>
				<div className="flex flex-col md:flex-row gap-2">
					<aside className="w-full md:w-1/4 xl:w-1/5 p-4 rounded shadow">
						<nav className="space-y-2">
							<Link href="/dashboard" className="block">
								<RxDashboard className="inline-block mr-2" />Dashboard
							</Link>
							<Link href="/dashboard/rss-feed" className="block">
								<FaRss className="inline-block mr-2" />RSS Feed
							</Link>
							<Link href="/dashboard/links" className="block">
								<FaLink className="inline-block mr-2" />Internet Links
							</Link>
							<Link href="/dashboard/agent" className="block">
								<BsChatRightText className="inline-block mr-2" />AI Agent
							</Link>
							<Link href="/dashboard/notes" className="block">
								<GrDocumentText className="inline-block mr-2" />Notes
							</Link>
						</nav>
					</aside>

					<section className="w-full md:w-3/4 xl:w-4/5 p-4 rounded shadow">
						{children}
					</section>
				</div>
			</div>
		</>
	);
}
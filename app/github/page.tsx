'use client'

import { useEffect, useState } from 'react';
import { GithubProfile } from '@/lib/types/types';




const GithubPage = () => {
	const [profile, setProfile] = useState<GithubProfile | null>(null);
	const [showProfile, setShowProfile] = useState(false);

	useEffect(() => {
		fetch('https://api.github.com/users/blackmathx')
			.then(res => res.json())
			.then((data: GithubProfile) => {
				setProfile(data);
				setTimeout(() => setShowProfile(true), 400);
			});
	}, []);

	if (!profile || !showProfile) {
		return (
			<main className="flex justify-center text-gray-300">
				<p className="p-6 py-16 rounded-2xl shadow-2xl text-center w-full max-w-sm text-lg">Loading...</p>
			</main>
		);
	}

	return (
		<main className="flex justify-center">
			<div className="p-6 rounded-2xl shadow-2xl text-center w-full max-w-[700px]">
				<h1 className="text-2xl font-bold mb-4">Github.com</h1>
				<img
					src={profile.avatar_url}
					alt=""
					className="w-32 h-32 mx-auto rounded-full mb-4"
				/>
				<h2 className="text-xl font-semibold">{profile.login}</h2>
				<p className="text-gray-600 mb-2">{profile.bio}</p>
				<p className="text-sm text-gray-500">Followers: {profile.followers}</p>
				<p className="text-sm text-gray-500 mb-4">Public Repos: {profile.public_repos}</p>
				<a
					href={profile.html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:underline"
				>
					View Profile
				</a>
			</div>
		</main>
	);
};

export default GithubPage;
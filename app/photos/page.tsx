'use client'

import Head from 'next/head';
import Image from "next/image";
import React, { useState } from "react";
import { photos } from "@/lib/photos";

export default function Photos() {
	const [selectedPhoto, setSelectedPhoto] = useState<{ id: string; url: string; alt: string; tags?: string[] } | null>(null);

	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<main className="sm:mx-auto max-w-[1960px] md:p-4">
				<div className="columns-2 gap-1 md:gap-4 sm:columns-3 xl:columns-4 2xl:columns-6">

					{/* Map through the imageUrls and create a link for each one */}
					{photos.slice().reverse().map(({ id, url, alt, tags }) => (
						<button
							key={id}
							onClick={() => setSelectedPhoto({ id, url, alt, tags })}
							className="after:content group relative mb-1 sm:mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
						>
							<div className="relative w-full">
								<Image
									alt={alt}
									className="transform lg:rounded-lg rounded-sm brightness-90 transition will-change-auto group-hover:brightness-100"
									style={{ transform: "translate3d(0, 0, 0)" }}
									src={url}
									width={720}
									height={480}
									sizes="(max-width: 640px) 100vw,
				  					(max-width: 1280px) 50vw,
				  					(max-width: 1536px) 33vw,
				  					25vw"
								/>
								{tags && tags.length > 0 && (
									<div className="absolute bottom-1 left-1 w-full text-white text-base px-2 py-1 flex flex-wrap gap-1 z-10">
										{tags.map((tag, i) => (
											<span key={i} className="mr-2">#{tag}</span>
										))}
									</div>
								)}
							</div>
						</button>
					))}

				</div>
			</main>

			{/* Modal Overlay */}
			{selectedPhoto && (
				<div
					className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setSelectedPhoto(null)}
				>
					<div
						className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedPhoto(null)}
							className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
						>
							×
						</button>
						<Image
							alt={selectedPhoto.alt}
							className="w-full h-auto max-h-[90vh] object-contain"
							src={selectedPhoto.url}
							width={1200}
							height={800}
							sizes="90vw"
						/>
						{selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
							<div className="absolute bottom-4 left-4 text-white text-lg flex flex-wrap gap-2 z-10">
								{selectedPhoto.tags.map((tag, i) => (
									<span key={i} className="bg-black bg-opacity-50 px-2 py-1 rounded">#{tag}</span>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
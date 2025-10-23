'use client'

import Head from 'next/head';
import Image from "next/image";
import React, { useState } from "react";
import { photos } from "@/lib/photos";

export default function Photos() {
	const [selectedPhoto, setSelectedPhoto] = useState<{ id: string; image: string; alt: string; tags?: string[] } | null>(null);

	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<main className="sm:mx-auto max-w-[1960px] md:p-4">
				<div className="columns-2 gap-1 md:gap-4 sm:columns-3 xl:columns-4 2xl:columns-6">

					{/* Map through the imageUrls and create a link for each one */}
					{photos.slice().reverse().map(({ id, image, alt, tags }) => (
						<button
							key={id}
							onClick={() => setSelectedPhoto({ id, image, alt, tags })}
							className="after:content group relative mb-1 sm:mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
						>
							<div className="relative w-full">
								<Image
									alt={alt}
									className="transform lg:rounded-lg rounded-sm brightness-90 transition will-change-auto group-hover:brightness-100"
									style={{ transform: "translate3d(0, 0, 0)" }}
									src={image}
									width={720}
									height={480}
									sizes="(max-width: 640px) 100vw,
									(max-width: 1280px) 75vw,
									(max-width: 1536px) 50vw,
									50vw"
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
						className="relative w-[90vw] h-[90vh] lg:w-[70vw] lg:h-[70vh] overflow-hidden rounded-lg"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button */}
						<button
							onClick={() => setSelectedPhoto(null)}
							className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
							aria-label="Close modal"
						>
							×
						</button>

						{/* Image */}
						<Image
							alt={selectedPhoto.alt}
							src={selectedPhoto.image}
							fill
							sizes="90vw"
							className="object-contain"
							priority
						/>


					</div>
				</div>
			)}

		</>
	)
}
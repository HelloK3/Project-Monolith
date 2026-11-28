"use client";

import Image from "next/image";
import { useState } from "react";

type Skin = { name: string; image: string };

type SkinsGalleryProps = {
	heroName: string;
	skins: Skin[];
};

/**
 * A large view of the selected skin with a row of thumbnails to pick from.
 * The thumbnails are toggle buttons (aria-pressed), so they work with Tab and
 * Enter/Space and announce which skin is showing.
 */
export default function SkinsGallery({ heroName, skins }: SkinsGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const active = skins[activeIndex];

	return (
		<div className="border border-white/10 bg-[#0b0f14]">
			{/* Selected skin */}
			<div className="relative aspect-video overflow-hidden bg-black">
				{skins.map((skin, index) => (
					<Image
						key={skin.image}
						src={skin.image}
						alt={index === activeIndex ? `${heroName}, ${skin.name} skin` : ""}
						fill
						className={`object-cover transition-opacity duration-500 ${
							index === activeIndex ? "opacity-100" : "opacity-0"
						}`}
						sizes="(max-width: 1280px) 100vw, 1280px"
					/>
				))}

				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

				<p
					aria-live="polite"
					className="absolute bottom-5 left-5 text-xl font-bold uppercase tracking-wide md:bottom-8 md:left-8 md:text-3xl"
				>
					{active.name}
				</p>
			</div>

			{/* Skin picker */}
			<div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-4 lg:grid-cols-6">
				{skins.map((skin, index) => {
					const isActive = index === activeIndex;

					return (
						<button
							key={skin.image}
							type="button"
							aria-pressed={isActive}
							aria-label={`Show ${skin.name} skin`}
							onClick={() => setActiveIndex(index)}
							className={`group relative bg-[#0b0f14] p-2 text-left transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-amber-400 sm:p-3 ${
								isActive ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"
							}`}
						>
							<div
								className={`relative aspect-video overflow-hidden border transition-colors ${
									isActive ? "border-amber-400/60" : "border-white/10 group-hover:border-white/25"
								}`}
							>
								<Image
									src={skin.image}
									alt=""
									fill
									className={`object-cover transition-opacity ${
										isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90"
									}`}
									sizes="200px"
								/>
							</div>

							<p
								className={`mt-2 text-[10px] uppercase tracking-[0.25em] ${
									isActive ? "text-amber-400" : "text-white/60"
								}`}
							>
								{skin.name}
							</p>
						</button>
					);
				})}
			</div>
		</div>
	);
}

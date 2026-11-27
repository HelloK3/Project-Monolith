import Image from "next/image";
import Link from "next/link";
import type { Hero } from "@/data/heroes";
import { getRole } from "@/data/roles";
import HeroMonogram from "@/components/HeroMonogram";

type HeroCardProps = {
	hero: Hero;
	/** 1-based position in the roster, shown in the card's corner. */
	number: number;
};

export default function HeroCard({ hero, number }: HeroCardProps) {
	const isComplete = hero.status === "complete";

	return (
		<Link
			href={`/heroes/${hero.slug}`}
			className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-[#0b0f14] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-amber-400"
		>
			{/* Image */}
			<div className="absolute inset-0">
				{isComplete ? (
					<Image
						src={hero.portrait}
						alt=""
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
						sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 17vw"
					/>
				) : (
					<HeroMonogram
						name={hero.name}
						className="transition-transform duration-700 group-hover:scale-105"
					/>
				)}

				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

				{/* Hover tint */}
				<div className="absolute inset-0 bg-amber-400/0 transition-colors duration-500 group-hover:bg-amber-400/[0.04]" />
			</div>

			{/* Content */}
			<div className="absolute inset-x-0 bottom-0 p-4">
				<div className="mb-3 h-px w-8 bg-amber-400 transition-all duration-300 group-hover:w-16" />

				<p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">
					{getRole(hero.role).name}
				</p>

				<h2 className="mt-2 text-lg font-semibold uppercase tracking-wide text-white">
					{hero.name}
				</h2>

				{isComplete && (
					<p className="mt-2 max-h-0 overflow-hidden text-xs leading-5 text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
						{hero.description}
					</p>
				)}
			</div>

			{/* Status (placeholders only) */}
			{!isComplete && (
				<div className="absolute left-4 top-4 border border-white/10 bg-black/40 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
					In progress
				</div>
			)}

			{/* Hero number */}
			<div className="absolute right-4 top-4 text-xs tracking-[0.3em] text-white/20">
				{String(number).padStart(2, "0")}
			</div>
		</Link>
	);
}

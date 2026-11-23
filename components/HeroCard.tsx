import Image from "next/image";
import Link from "next/link";
import type { Hero } from "@/data/heroes";
import { getRole } from "@/data/roles";

type HeroCardProps = {
	hero: Hero;
	/** 1-based position in the roster, shown in the card's corner. */
	number: number;
};

export default function HeroCard({ hero, number }: HeroCardProps) {
	return (
		<Link
			href={`/heroes/${hero.slug}`}
			className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-[#0b0f14]"
		>
			{/* Image */}
			<div className="absolute inset-0">
				<Image
					src={hero.portrait}
					alt={hero.name}
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

				<div className="absolute inset-0 bg-amber-400/0 transition-colors duration-500 group-hover:bg-amber-400/[0.04]" />
			</div>

			{/* Hover overlay */}
			<div className="absolute inset-0 bg-amber-400/0 transition-all duration-500 group-hover:bg-amber-400/[0.04]" />

			{/* Content */}
			<div className="absolute inset-x-0 bottom-0 p-6">
				<div className="mb-3 h-px w-8 bg-amber-400 transition-all duration-300 group-hover:w-16" />

				<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
					{getRole(hero.role).name}
				</p>

				<h2 className="mt-2 text-2xl font-semibold uppercase tracking-wide text-white">
					{hero.name}
				</h2>

				<p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
					{hero.description}
				</p>
			</div>

			{/* Hero number */}
			<div className="absolute right-5 top-5 text-xs tracking-[0.3em] text-white/20">
				{String(number).padStart(2, "0")}
			</div>
		</Link>
	);
}

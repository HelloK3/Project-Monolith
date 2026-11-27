import Image from "next/image";
import Link from "next/link";
import { getAffinity, getRarity, type Card } from "@/data/card-types";

/** A card in the browser grid: its art, affinity color, rarity and name. */
export default function CardTile({ card }: { card: Card }) {
	const affinity = getAffinity(card.affinity);

	return (
		<Link
			href={`/cards/${card.slug}`}
			className="group relative block aspect-[3/5] overflow-hidden border border-white/10 bg-[#0b0f14] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-amber-400"
		>
			<Image
				src={card.art}
				alt=""
				fill
				className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
				sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 17vw"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

			{/* Affinity color strip */}
			<div
				className="absolute inset-x-0 top-0 h-0.5"
				style={{ backgroundColor: affinity.color }}
			/>

			<div className="absolute right-3 top-3 border border-white/10 bg-black/50 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-white/60">
				{getRarity(card.rarity).name}
			</div>

			<div className="absolute inset-x-0 bottom-0 p-4">
				<p
					className="text-[10px] uppercase tracking-[0.3em]"
					style={{ color: affinity.color }}
				>
					{affinity.name}
				</p>

				<h2 className="mt-2 text-base font-semibold uppercase leading-tight tracking-wide text-white">
					{card.name}
				</h2>
			</div>
		</Link>
	);
}

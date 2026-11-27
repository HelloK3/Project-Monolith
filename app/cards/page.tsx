import type { Metadata } from "next";
import Link from "next/link";
import CardTile from "@/components/CardTile";
import { cards } from "@/data/cards";
import {
	affinities,
	getAffinity,
	getRarity,
	isAffinitySlug,
	isRaritySlug,
	rarities,
	type AffinitySlug,
	type RaritySlug,
} from "@/data/card-types";

export const metadata: Metadata = {
	title: "Cards",
	description: "Every card from Paragon v45: affinities, rarities, costs, stats and effects.",
};

type CardsPageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type Filters = { affinity: AffinitySlug | null; rarity: RaritySlug | null };

/** Builds a /cards URL for a filter combination, leaving out empty filters. */
function cardsHref({ affinity, rarity }: Filters) {
	const params = new URLSearchParams();
	if (affinity) params.set("affinity", affinity);
	if (rarity) params.set("rarity", rarity);
	const query = params.toString();
	return query ? `/cards?${query}` : "/cards";
}

// Like the hero roster, both filters live in the URL, so they can be combined
// (?affinity=chaos&rarity=epic), linked to, and need no client-side state.
export default async function CardsPage({ searchParams }: CardsPageProps) {
	const params = await searchParams;
	const active: Filters = {
		affinity: isAffinitySlug(params.affinity) ? params.affinity : null,
		rarity: isRaritySlug(params.rarity) ? params.rarity : null,
	};

	const visibleCards = cards.filter(
		(card) =>
			(!active.affinity || card.affinity === active.affinity) &&
			(!active.rarity || card.rarity === active.rarity),
	);

	const filterGroups = [
		{
			label: "Filter cards by affinity",
			options: [
				{ label: "All", href: cardsHref({ ...active, affinity: null }), isActive: !active.affinity, color: undefined },
				...affinities.map((affinity) => ({
					label: affinity.name,
					href: cardsHref({ ...active, affinity: affinity.slug }),
					isActive: active.affinity === affinity.slug,
					color: affinity.color,
				})),
			],
		},
		{
			label: "Filter cards by rarity",
			options: [
				{ label: "Any rarity", href: cardsHref({ ...active, rarity: null }), isActive: !active.rarity, color: undefined },
				...rarities.map((rarity) => ({
					label: rarity.name,
					href: cardsHref({ ...active, rarity: rarity.slug }),
					isActive: active.rarity === rarity.slug,
					color: undefined,
				})),
			],
		},
	];

	const heading =
		[active.rarity && getRarity(active.rarity).name, active.affinity && getAffinity(active.affinity).name]
			.filter(Boolean)
			.join(" ") || "All";

	return (
		<main className="min-h-screen bg-[#080b0f] text-white">
			{/* Header */}
			<section className="border-b border-white/10 px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
				<div className="mx-auto max-w-7xl">
					<p className="mb-5 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Cards
					</p>

					<h1 className="max-w-4xl text-5xl font-bold uppercase tracking-tight md:text-7xl">
						Build your deck.
					</h1>

					<p className="mt-8 max-w-2xl text-lg leading-8 text-white/50">
						Every card from Paragon v45&apos;s card system, with its affinity,
						rarity, attribute costs, stats and effects, taken from the game
						files.
					</p>
				</div>
			</section>

			{/* Card Gallery */}
			<section className="px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-7xl">
					<div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-white/30">
								Collection
							</p>

							<h2 className="mt-2 text-2xl font-semibold uppercase tracking-wide">
								{heading} Cards
								<span className="ml-3 text-base font-normal text-white/30">
									{visibleCards.length}
								</span>
							</h2>
						</div>

						<div className="flex flex-col gap-3 lg:items-end">
							{filterGroups.map((group) => (
								<nav key={group.label} aria-label={group.label} className="flex flex-wrap gap-2">
									{group.options.map((option) => (
										<Link
											key={option.label}
											href={option.href}
											scroll={false}
											aria-current={option.isActive ? "page" : undefined}
											className={`flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-widest transition-colors ${
												option.isActive
													? "border-amber-400/60 bg-amber-400/10 text-amber-400"
													: "border-white/10 text-white/50 hover:border-amber-400/50 hover:text-amber-400"
											}`}
										>
											{option.color && (
												<span
													aria-hidden="true"
													className="h-2 w-2 rounded-full"
													style={{ backgroundColor: option.color }}
												/>
											)}
											{option.label}
										</Link>
									))}
								</nav>
							))}
						</div>
					</div>

					{visibleCards.length > 0 ? (
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
							{visibleCards.map((card) => (
								<CardTile key={card.slug} card={card} />
							))}
						</div>
					) : (
						<div className="border border-white/10 bg-[#0b0f14] px-8 py-16 text-center">
							<p className="text-sm uppercase tracking-[0.3em] text-white/40">
								No {heading.toLowerCase()} cards
							</p>

							<Link
								href="/cards"
								scroll={false}
								className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-amber-400 transition-colors hover:text-amber-300"
							>
								Show all cards →
							</Link>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}

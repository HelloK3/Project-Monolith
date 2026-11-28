import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbilityDescription from "@/components/AbilityDescription";
import CardTile from "@/components/CardTile";
import { cards } from "@/data/cards";
import { getAffinity, getRarity } from "@/data/card-types";

type CardPageProps = {
	params: Promise<{ slug: string }>;
};

const getCard = (slug: string) => cards.find((card) => card.slug === slug);

// Build every card page ahead of time and 404 anything else.
export function generateStaticParams() {
	return cards.map((card) => ({ slug: card.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
	const card = getCard((await params).slug);
	if (!card) return {};

	return {
		title: card.name,
		description: `${getRarity(card.rarity).name} ${getAffinity(card.affinity).name} card from Paragon v45.`,
	};
}

export default async function CardPage({ params }: CardPageProps) {
	const card = getCard((await params).slug);
	if (!card) notFound();

	const affinity = getAffinity(card.affinity);
	const related = cards
		.filter((other) => other.affinity === card.affinity && other.slug !== card.slug)
		.slice(0, 6);

	const badges = [getRarity(card.rarity).name, card.trait, card.starter && "Starter deck"].filter(
		(badge): badge is string => Boolean(badge),
	);

	return (
		<main className="min-h-screen bg-[#080b0f] text-white">
			<section className="border-b border-white/10 px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
				<div className="mx-auto max-w-7xl">
					<Link
						href="/cards"
						className="mb-12 inline-flex text-xs uppercase tracking-[0.35em] text-white/60 transition-colors hover:text-amber-400"
					>
						← Cards
					</Link>

					<div className="grid gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16 lg:gap-24">
						{/* Card art */}
						<div
							className="relative mx-auto aspect-[1/2] w-full max-w-[340px] overflow-hidden border border-white/10 bg-[#0b0f14]"
							style={{ boxShadow: `0 0 60px ${affinity.color}1f` }}
						>
							<Image
								src={card.art}
								alt={`${card.name} card art`}
								fill
								priority
								className="object-cover"
								sizes="340px"
							/>
							<div className="absolute inset-x-0 top-0 h-0.5" style={{ backgroundColor: affinity.color }} />
						</div>

						{/* Details */}
						<div className="min-w-0">
							<div className="mb-6 flex items-center gap-4">
								<span className="h-px w-12" style={{ backgroundColor: affinity.color }} />
								<p className="text-xs uppercase tracking-[0.45em]" style={{ color: affinity.color }}>
									{affinity.name}
								</p>
							</div>

							<h1 className="break-words text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
								{card.name}
							</h1>

							<div className="mt-8 flex flex-wrap gap-2">
								{badges.map((badge) => (
									<span
										key={badge}
										className="border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/60"
									>
										{badge}
									</span>
								))}
							</div>

							{/* Effects */}
							{card.effects.map((effect) => (
								<div key={effect.name} className="mt-10 border-t border-white/10 pt-8">
									<div className="flex flex-wrap items-center gap-4">
										<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
											{effect.activation}
										</p>
										<span className="h-px w-8 bg-white/10" />
										<h2 className="text-xl font-semibold uppercase tracking-wide">{effect.name}</h2>
									</div>
									<AbilityDescription parts={effect.description} />
								</div>
							))}

							{/* Stats and costs */}
							<div className="mt-10 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3">
								{[
									...card.stats.map((stat) => ({ label: stat.label, value: stat.value })),
									...card.costs.map((cost) => ({ label: `${cost.label} cost`, value: String(cost.amount) })),
								].map((item) => (
									<div key={item.label} className="border-b border-r border-white/10 p-4 sm:p-5">
										<p className="text-[9px] uppercase tracking-[0.3em] text-white/55">{item.label}</p>
										<p className="mt-3 text-sm font-semibold text-white/85 sm:text-base">{item.value}</p>
									</div>
								))}
							</div>

							<p className="mt-6 max-w-xl text-xs leading-6 text-white/55">
								Ranges show how an effect scales across the game&apos;s 20 value steps.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Related cards */}
			{related.length > 0 && (
				<section className="px-6 py-20 md:px-12 md:py-24">
					<div className="mx-auto max-w-7xl">
						<div className="mb-8 flex items-end justify-between gap-6">
							<h2 className="text-2xl font-semibold uppercase tracking-wide">
								More {affinity.name} cards
							</h2>
							<Link
								href={`/cards?affinity=${affinity.slug}`}
								className="text-xs uppercase tracking-[0.3em] text-amber-400 transition-colors hover:text-amber-300"
							>
								View all →
							</Link>
						</div>

						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
							{related.map((other) => (
								<CardTile key={other.slug} card={other} />
							))}
						</div>
					</div>
				</section>
			)}
		</main>
	);
}

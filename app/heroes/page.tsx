import type { Metadata } from "next";
import HeroCard from "@/components/HeroCard";
import { heroes } from "@/data/heroes";

export const metadata: Metadata = {
	title: "Heroes",
};

export default function HeroesPage() {
	return (
		<main className="min-h-screen bg-[#080b0f] text-white">
			{/* Header */}
			<section className="border-b border-white/10 px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
				<div className="mx-auto max-w-7xl">
					<p className="mb-5 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Heroes
					</p>

					<h1 className="max-w-4xl text-5xl font-bold uppercase tracking-tight md:text-7xl">
						Champions of the battlefield.
					</h1>

					<p className="mt-8 max-w-2xl text-lg leading-8 text-white/50">
						Explore the heroes of Paragon v45, their roles, abilities, and
						unique ways of shaping the battlefield.
					</p>
				</div>
			</section>

			{/* Hero Gallery */}
			<section className="px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-7xl">
					<div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-white/30">
								Roster
							</p>

							<h2 className="mt-2 text-2xl font-semibold uppercase tracking-wide">
								Heroes
							</h2>
						</div>

						<div className="flex flex-wrap gap-2">
							{["All", "Offlane", "Mid", "Jungle", "Carry", "Support"].map(
								(role) => (
									<button
										key={role}
										className="border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/50 transition-colors hover:border-amber-400/50 hover:text-amber-400"
									>
										{role}
									</button>
								),
							)}
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{heroes.map((hero, index) => (
							<HeroCard key={hero.slug} hero={hero} number={index + 1} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

import type { Metadata } from "next";
import Link from "next/link";
import HeroCard from "@/components/HeroCard";
import { heroes } from "@/data/heroes";
import { getRole, isRoleSlug, roles } from "@/data/roles";

export const metadata: Metadata = {
	title: "Heroes",
};

type HeroesPageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// The active filter lives in the URL (?role=jungle) instead of component
// state, so filtered views can be linked to, survive a refresh, work with the
// back button, and need no client-side JavaScript.
export default async function HeroesPage({ searchParams }: HeroesPageProps) {
	const { role } = await searchParams;
	const activeRole = isRoleSlug(role) ? role : null;

	const visibleHeroes = activeRole
		? heroes.filter((hero) => hero.role === activeRole)
		: heroes;

	const filters = [
		{ label: "All", href: "/heroes", isActive: activeRole === null },
		...roles.map((r) => ({
			label: r.name,
			href: `/heroes?role=${r.slug}`,
			isActive: activeRole === r.slug,
		})),
	];

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
								{activeRole ? getRole(activeRole).name : "All Heroes"}
								<span className="ml-3 text-base font-normal text-white/30">
									{visibleHeroes.length}
								</span>
							</h2>
						</div>

						<nav aria-label="Filter heroes by role" className="flex flex-wrap gap-2">
							{filters.map((filter) => (
								<Link
									key={filter.label}
									href={filter.href}
									scroll={false}
									aria-current={filter.isActive ? "page" : undefined}
									className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
										filter.isActive
											? "border-amber-400/60 bg-amber-400/10 text-amber-400"
											: "border-white/10 text-white/50 hover:border-amber-400/50 hover:text-amber-400"
									}`}
								>
									{filter.label}
								</Link>
							))}
						</nav>
					</div>

					{visibleHeroes.length > 0 ? (
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
							{visibleHeroes.map((hero) => (
								<HeroCard
									key={hero.slug}
									hero={hero}
									// Number by position in the full roster so a hero
									// keeps the same number when the list is filtered.
									number={heroes.indexOf(hero) + 1}
								/>
							))}
						</div>
					) : (
						<div className="border border-white/10 bg-[#0b0f14] px-8 py-16 text-center">
							<p className="text-sm uppercase tracking-[0.3em] text-white/40">
								No {activeRole && getRole(activeRole).name} heroes added yet
							</p>

							<Link
								href="/heroes"
								scroll={false}
								className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-amber-400 transition-colors hover:text-amber-300"
							>
								Show all heroes →
							</Link>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}

import Link from "next/link";
import AmbientVideo from "@/components/AmbientVideo";
import HeroMonogram from "@/components/HeroMonogram";
import type { PlaceholderHero } from "@/data/heroes";
import { getRole } from "@/data/roles";

const upcomingSections = [
	{
		label: "Overview",
		title: "Hero profile",
		description: "Class, difficulty, traits, and how this hero shapes a match.",
	},
	{
		label: "Base Statistics",
		title: "Core numbers",
		description: "Combat ratings, health, mana, armor, and attack speed.",
	},
	{
		label: "Abilities",
		title: "Full kit",
		description: "Every ability with damage values, cooldowns, costs, and previews.",
	},
];

/** The hero page shown while a hero's full write-up is still in progress. */
export default function PlaceholderHeroProfile({ hero }: { hero: PlaceholderHero }) {
	const role = getRole(hero.role);

	return (
		<main className="min-h-screen bg-[#080b0f] text-white">
			{/* Hero Header */}
			<section className="relative min-h-[70vh] overflow-hidden border-b border-white/10">
				<div className="absolute inset-0">
					{hero.previewVideo ? (
						<AmbientVideo
							src={hero.previewVideo}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					) : (
						<HeroMonogram name={hero.name} />
					)}

					<div className="absolute inset-0 bg-black/50" />
					<div className="absolute inset-0 bg-gradient-to-t from-[#080b0f] via-[#080b0f]/40 to-[#080b0f]/30" />
				</div>

				<div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 pb-20 pt-32 md:px-12 md:pb-24">
					<div className="w-full min-w-0 max-w-3xl">
						<Link
							href="/heroes"
							className="mb-12 inline-flex text-xs uppercase tracking-[0.35em] text-white/35 transition-colors hover:text-amber-400"
						>
							← Heroes
						</Link>

						<div className="mb-6 flex items-center gap-4">
							<span className="h-px w-12 bg-amber-400/80" />

							<p className="text-xs uppercase tracking-[0.45em] text-amber-400">
								{role.name}
							</p>
						</div>

						<h1 className="break-words text-[clamp(2.75rem,13vw,8rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em] text-white">
							{hero.name}
						</h1>

						<p className="mt-8 inline-flex border border-white/10 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
							Profile in progress
						</p>
					</div>
				</div>
			</section>

			{/* Upcoming sections */}
			<section className="px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-7xl">
					<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
						Coming to this page
					</p>

					<h2 className="mt-5 max-w-3xl text-4xl font-bold uppercase tracking-tight md:text-5xl">
						{hero.name}&apos;s full profile is being written.
					</h2>

					<div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
						{upcomingSections.map((section) => (
							<div key={section.label} className="bg-[#0b0f14] p-8 md:p-10">
								<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
									{section.label}
								</p>

								<h3 className="mt-3 text-xl font-semibold uppercase tracking-wide text-white">
									{section.title}
								</h3>

								<p className="mt-4 leading-7 text-white/50">
									{section.description}
								</p>

								{/* Skeleton lines hint at the content to come */}
								<div aria-hidden="true" className="mt-8 space-y-3">
									<div className="h-1 w-full bg-white/[0.06]" />
									<div className="h-1 w-4/5 bg-white/[0.06]" />
									<div className="h-1 w-3/5 bg-white/[0.06]" />
								</div>
							</div>
						))}
					</div>

					<Link
						href={`/heroes?role=${role.slug}`}
						className="group mt-12 inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.15em] text-white/70 transition-all hover:border-amber-400/40 hover:text-white"
					>
						<span>Browse {role.name} heroes</span>

						<span className="text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</Link>
				</div>
			</section>
		</main>
	);
}

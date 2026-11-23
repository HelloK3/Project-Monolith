import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbilityShowcase from "@/components/AbilityShowcase";
import HeroStats from "@/components/HeroStats";
import { heroes } from "@/data/heroes";
import { getRole } from "@/data/roles";

type HeroPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({
	params,
}: HeroPageProps): Promise<Metadata> {
	const { slug } = await params;
	const hero = heroes.find((hero) => hero.slug === slug);

	if (!hero) {
		return {};
	}

	return {
		title: hero.name,
		description: hero.description,
	};
}

export default async function HeroPage({ params }: HeroPageProps) {
	const { slug } = await params;

	const hero = heroes.find((hero) => hero.slug === slug);

	if (!hero) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-[#080b0f] text-white">
			{/* Hero Header */}
			<section className="relative min-h-[calc(100vh-76px)] overflow-hidden border-b border-white/10">
				{/* Atmospheric background */}
				<div className="absolute inset-0">
					<Image
						src={hero.background}
						alt=""
						fill
						priority
						className="object-cover object-[35%_center]"
						sizes="100vw"
					/>

					{/* Darken the environment */}
					<div className="absolute inset-0 bg-black/40" />

					{/* Subtle overall darkening */}
					<div className="absolute inset-0 bg-black/20" />

					{/* Fade toward the bottom */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#080b0f] via-transparent to-[#080b0f]/30" />
				</div>

				{/* Hero foreground artwork */}
				<div className="absolute inset-y-0 right-0 w-[80%] overflow-hidden">
					<Image
						src={hero.artwork}
						alt={hero.name}
						fill
						priority
						className="object-contain object-right"
						sizes="60vw"
					/>
				</div>

				{/* Fade artwork into the bottom of the page */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#080b0f] via-transparent to-[#080b0f]/20" />

				{/* Main content */}
				<div className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl items-end px-6 pb-24 md:px-12 md:pb-28">
					<div className="max-w-3xl">
						<Link
							href="/heroes"
							className="mb-12 inline-flex text-xs uppercase tracking-[0.35em] text-white/35 transition-colors hover:text-amber-400"
						>
							← Heroes
						</Link>

						<div className="mb-6 flex items-center gap-4">
							<span className="h-px w-12 bg-amber-400/80" />

							<p className="text-xs uppercase tracking-[0.45em] text-amber-400">
								{getRole(hero.role).name}
							</p>
						</div>

						<h1 className="text-7xl font-bold uppercase leading-[0.82] tracking-[-0.04em] text-white md:text-9xl lg:text-[10rem]">
							{hero.name}
						</h1>

						<p className="mt-8 max-w-xl text-base leading-7 text-white/55 md:text-lg">
							{hero.description}
						</p>

						{/* Historical hero traits */}
						<div className="mt-8 flex max-w-2xl flex-wrap gap-x-5 gap-y-2">
							{hero.traits.map((trait) => (
								<span
									key={trait}
									className="text-[10px] uppercase tracking-[0.28em] text-white/35"
								>
									{trait}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
					<span className="h-8 w-px bg-amber-400/60" />

					<span className="text-[10px] uppercase tracking-[0.35em] text-white/25">
						Explore Hero
					</span>
				</div>
			</section>

			{/* Hero Overview */}
			<section className="border-b border-white/10 px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-7xl">
					{/* Overview + Hero Profile */}
					<div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
						{/* Description */}
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
								Overview
							</p>

							<h2 className="mt-5 text-4xl font-bold uppercase tracking-tight md:text-5xl">
								Know the hero.
							</h2>

							<p className="mt-8 max-w-2xl text-lg leading-8 text-white/50">
								Understand {hero.name}&apos;s strengths, combat profile, and
								core statistics before taking them into battle.
							</p>
						</div>

						{/* Hero Profile */}
						<div className="border border-white/10 bg-[#0b0f14]">
							<div className="border-b border-white/10 px-6 py-5">
								<p className="text-xs uppercase tracking-[0.3em] text-white/30">
									Hero Profile
								</p>
							</div>

							<div className="grid grid-cols-2">
								{/* Role */}
								<div className="border-b border-r border-white/10 p-6">
									<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
										Role
									</p>

									<p className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
										{getRole(hero.role).name}
									</p>
								</div>

								{/* Class */}
								<div className="border-b border-white/10 p-6">
									<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
										Class
									</p>

									<p className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
										{hero.heroClass}
									</p>
								</div>

								{/* Difficulty */}
								<div className="border-r border-white/10 p-6">
									<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
										Difficulty
									</p>

									<p className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
										{hero.difficulty ?? "—"}
									</p>
								</div>

								{/* Position */}
								<div className="p-6">
									<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
										Position
									</p>

									<p className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">
										{hero.position}
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* Base Stats */}
					<div className="mt-16">
						<HeroStats hero={hero} />
					</div>
				</div>
			</section>

			{/* Abilities */}
			<section className="border-b border-white/10 px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-7xl">
					{/* Section heading */}
					<div className="mb-12">
						<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
							Abilities
						</p>

						<h2 className="mt-4 text-4xl font-bold uppercase tracking-tight md:text-5xl">
							Master the hero.
						</h2>

						<p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
							Explore abilities, mechanics, damage values, cooldowns, and
							additional details.
						</p>
					</div>
					<AbilityShowcase abilities={hero.abilities} />
				</div>
			</section>
		</main>
	);
}

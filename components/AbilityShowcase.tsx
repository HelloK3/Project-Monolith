"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import AbilityDescription from "@/components/AbilityDescription";
import AmbientVideo from "@/components/AmbientVideo";
import type { Ability } from "@/data/heroes";

type AbilityShowcaseProps = {
	abilities: Ability[];
};

/**
 * The ability picker follows the WAI-ARIA tabs pattern: the row of abilities
 * is a tablist, the detail below is its tabpanel, and the arrow, Home and End
 * keys move between abilities (only the selected tab is in the Tab order).
 */
export default function AbilityShowcase({ abilities }: AbilityShowcaseProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const idPrefix = useId();

	const activeAbility = abilities[activeIndex] ?? abilities[0];
	const tabId = (index: number) => `${idPrefix}-tab-${index}`;
	const panelId = `${idPrefix}-panel`;

	const selectTab = (index: number) => {
		const next = (index + abilities.length) % abilities.length;
		setActiveIndex(next);
		tabRefs.current[next]?.focus();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		const moves: Record<string, number> = {
			ArrowRight: activeIndex + 1,
			ArrowLeft: activeIndex - 1,
			Home: 0,
			End: abilities.length - 1,
		};

		if (event.key in moves) {
			event.preventDefault();
			selectTab(moves[event.key]);
		}
	};

	return (
		<div className="border border-white/10 bg-[#0b0f14]">
			{/* Ability navigation */}
			<div
				role="tablist"
				aria-label="Abilities"
				className="grid grid-cols-5 border-b border-white/10"
			>
				{abilities.map((ability, index) => {
					const isActive = index === activeIndex;

					return (
						<button
							key={ability.key}
							ref={(element) => {
								tabRefs.current[index] = element;
							}}
							id={tabId(index)}
							type="button"
							role="tab"
							aria-selected={isActive}
							aria-controls={panelId}
							aria-label={`${ability.label}: ${ability.name}`}
							tabIndex={isActive ? 0 : -1}
							onClick={() => setActiveIndex(index)}
							onKeyDown={handleKeyDown}
							className={`group relative flex min-w-0 flex-col items-center border-r border-white/10 px-1 py-4 text-center transition-all duration-200 last:border-r-0 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-amber-400 sm:items-start sm:px-5 sm:py-6 sm:text-left ${
								isActive
									? "bg-white/[0.045]"
									: "bg-transparent hover:bg-white/[0.025]"
							}`}
						>
							{/* Active indicator */}
							<div
								className={`absolute bottom-0 left-0 h-px bg-amber-400 transition-all duration-300 ${
									isActive ? "w-full" : "w-0 group-hover:w-1/3"
								}`}
							/>

							{/* Ability icon */}
							<div
								className={`mb-3 flex h-10 w-10 items-center justify-center overflow-hidden border transition-all duration-200 sm:mb-4 sm:h-12 sm:w-12 ${
									isActive
										? "border-amber-400/50 bg-black shadow-[0_0_20px_rgba(245,158,11,0.08)]"
										: "border-white/10 bg-black/40 group-hover:border-white/20"
								}`}
							>
								<Image
									src={ability.icon}
									alt=""
									width={48}
									height={48}
									className={`h-full w-full object-cover transition-opacity duration-200 ${
										isActive
											? "opacity-100"
											: "opacity-60 group-hover:opacity-85"
									}`}
								/>
							</div>

							{/* Ability key */}
							<p
								className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
									isActive
										? "text-amber-400"
										: "text-white/30 group-hover:text-white/50"
								}`}
							>
								{ability.label}
							</p>

							{/* Ability type (the key alone is enough on small screens) */}
							<p
								className={`mt-3 hidden text-sm font-semibold uppercase tracking-wide transition-colors md:block ${
									isActive
										? "text-white"
										: "text-white/50 group-hover:text-white/70"
								}`}
							>
								{ability.type}
							</p>
						</button>
					);
				})}
			</div>

			{/* Ability detail */}
			<div
				role="tabpanel"
				id={panelId}
				aria-labelledby={tabId(activeIndex)}
				className="grid gap-8 p-5 md:gap-10 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
			>
				{/* Ability video */}
				<div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
					{/* Artwork underneath the video */}
					{activeAbility.artwork && (
						<Image
							src={activeAbility.artwork}
							alt=""
							fill
							className="object-cover opacity-30"
						/>
					)}

					{activeAbility.video && (
						<AmbientVideo
							key={activeAbility.video}
							src={activeAbility.video}
							decorative={false}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					)}

					{/* Cinematic overlay */}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
				</div>

				{/* Ability information */}
				<div className="flex flex-col justify-center">
					{/* Ability type */}
					<div className="flex flex-wrap items-center gap-4">
						<p className="text-xs uppercase tracking-[0.3em] text-amber-400">
							{activeAbility.label}
						</p>

						<span className="h-px w-8 bg-white/10" />

						<p className="text-xs uppercase tracking-[0.3em] text-white/30">
							{activeAbility.type}
						</p>
					</div>

					{/* Ability name */}
					<h3 className="mt-5 text-3xl font-bold uppercase tracking-tight md:text-5xl">
						{activeAbility.name}
					</h3>

					{/* Description */}
					<AbilityDescription parts={activeAbility.description} />

					{/* Cooldown / Cost */}
					{(activeAbility.cooldown !== "—" || activeAbility.cost !== "—") && (
						<div className="mt-8 grid max-w-xl grid-cols-2 border-t border-white/10 pt-5">
							{activeAbility.cooldown !== "—" && (
								<div className="pr-6">
									<p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
										Cooldown
									</p>

									<p className="mt-2 text-sm font-semibold text-white/80">
										{activeAbility.cooldown}
									</p>
								</div>
							)}

							{activeAbility.cost !== "—" && (
								<div
									className={`${
										activeAbility.cooldown !== "—"
											? "border-l border-white/10 pl-6"
											: ""
									}`}
								>
									<p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
										Cost
									</p>

									<p className="mt-2 text-sm font-semibold text-white/80">
										{activeAbility.cost}
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

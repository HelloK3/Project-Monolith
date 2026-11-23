"use client";

import { useState } from "react";
import Image from "next/image";
import AbilityDescription from "@/components/AbilityDescription";
import type { Ability } from "@/data/heroes";

type AbilityShowcaseProps = {
	abilities: Ability[];
};

export default function AbilityShowcase({ abilities }: AbilityShowcaseProps) {
	const [activeKey, setActiveKey] = useState(abilities[0]?.key);

	const activeAbility =
		abilities.find((ability) => ability.key === activeKey) ?? abilities[0];

	return (
		<div className="border border-white/10 bg-[#0b0f14]">
			{/* Ability navigation */}
			<div className="grid grid-cols-5 border-b border-white/10">
				{abilities.map((ability) => {
					const isActive = ability.key === activeKey;

					return (
						<button
							key={ability.key}
							type="button"
							onClick={() => setActiveKey(ability.key)}
							className={`group relative border-r border-white/10 px-5 py-6 text-left transition-all duration-200 last:border-r-0 ${
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
								className={`mb-4 flex h-12 w-12 items-center justify-center overflow-hidden border transition-all duration-200 ${
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

							{/* Ability type */}
							<p
								className={`mt-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
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
			<div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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

					{/* Ability video */}
					{activeAbility.video && (
						<video
							key={activeAbility.video}
							src={activeAbility.video}
							autoPlay
							muted
							loop
							playsInline
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
					<h3 className="mt-5 text-4xl font-bold uppercase tracking-tight md:text-5xl">
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

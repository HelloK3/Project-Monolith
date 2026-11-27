import type { CompleteHero } from "@/data/heroes";

type HeroStatsProps = {
	hero: CompleteHero;
};

const combatRatings = [
	{
		label: "Basic Attack",
		value: "basicAttack",
	},
	{
		label: "Ability Attack",
		value: "abilityAttack",
	},
	{
		label: "Durability",
		value: "durability",
	},
	{
		label: "Mobility",
		value: "mobility",
	},
] as const;

const baseStats = [
	{
		label: "Health",
		value: "baseHealth",
	},
	{
		label: "Health Regen",
		value: "healthRegen",
	},
	{
		label: "Mana",
		value: "mana",
	},
	{
		label: "Mana Regen",
		value: "manaRegen",
	},
	{
		label: "Ability Armor",
		value: "abilityArmor",
	},
	{
		label: "Basic Armor",
		value: "basicArmor",
	},
	{
		label: "Basic Attack Damage",
		value: "basicAttackDamage",
	},
	{
		label: "Attack Per Second",
		value: "attackPerSecond",
	},
] as const;

function RatingBar({ value }: { value: number }) {
	return (
		<div className="flex items-center gap-4">
			<div className="flex flex-1 gap-1">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className={`h-1 flex-1 ${
							index < value ? "bg-amber-400" : "bg-white/10"
						}`}
					/>
				))}
			</div>

			<span className="w-5 text-right text-sm font-semibold text-white/70">
				{value}
			</span>
		</div>
	);
}

export default function HeroStats({ hero }: HeroStatsProps) {
	const { stats } = hero;

	return (
		<section className="border border-white/10 bg-[#0b0f14]">
			<div className="grid lg:grid-cols-[0.9fr_1.1fr]">
				{/* Combat Profile */}
				<div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r md:p-10">
					<div className="mb-8">
						<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
							Combat Profile
						</p>

						<h3 className="mt-3 text-xl font-semibold uppercase tracking-wide text-white">
							How They Fight
						</h3>
					</div>

					<div className="space-y-7">
						{combatRatings.map((rating) => (
							<div key={rating.value}>
								<div className="mb-3">
									<p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
										{rating.label}
									</p>
								</div>

								<RatingBar value={stats[rating.value]} />
							</div>
						))}
					</div>
				</div>

				{/* Base Statistics */}
				<div className="p-8 md:p-10">
					<div className="mb-8">
						<p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
							Base Statistics
						</p>

						<h3 className="mt-3 text-xl font-semibold uppercase tracking-wide text-white">
							Core Numbers
						</h3>
					</div>

					<div className="grid border-l border-t border-white/10 sm:grid-cols-2">
						{baseStats.map((stat) => (
							<div
								key={stat.value}
								className="border-b border-r border-white/10 p-5"
							>
								<p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
									{stat.label}
								</p>

								<p className="mt-3 text-base font-semibold text-white/85">
									{stats[stat.value]}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

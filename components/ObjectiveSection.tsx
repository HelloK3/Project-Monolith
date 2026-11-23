export default function ObjectiveSection() {
	const objectives = [
		{
			number: "01",
			title: "Minions",
			description:
				"AI-controlled units advance through the lanes, creating pressure and helping your team push toward enemy structures.",
		},
		{
			number: "02",
			title: "Towers",
			description:
				"Powerful defensive structures protect each lane. Work with your minions and your team to break through them.",
		},
		{
			number: "03",
			title: "Inhibitors",
			description:
				"The final defensive structures stand between your team and the enemy Core.",
		},
		{
			number: "04",
			title: "Core",
			description:
				"Reach the heart of the enemy base and destroy the Core. This is the ultimate objective of the match.",
		},
	];

	return (
		<section id="objectives" className="scroll-mt-16 relative overflow-hidden bg-[#0b0f14] px-6 py-24 md:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 max-w-3xl">
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Objective
					</p>

					<h2 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
						Push. Destroy. Conquer.
					</h2>

					<p className="mt-6 text-lg leading-8 text-white/60">
						Every match begins with the same goal: break through the enemy
						defenses and destroy their Core.
					</p>
				</div>

				<div className="relative">
					{/* Progress Line */}
					<div className="absolute left-0 right-0 top-12 hidden h-px bg-white/10 md:block" />

					<div className="grid gap-10 md:grid-cols-4">
						{objectives.map((objective) => (
							<div key={objective.number} className="relative">
								{/* Number */}
								<div className="relative z-10 flex h-24 w-24 items-center justify-center border border-amber-400/40 bg-[#0b0f14]">
									<span className="text-sm tracking-[0.2em] text-amber-400">
										{objective.number}
									</span>
								</div>

								<h3 className="mt-8 text-2xl font-semibold uppercase tracking-wide text-white">
									{objective.title}
								</h3>

								<p className="mt-4 leading-7 text-white/50">
									{objective.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Final Objective */}
				<div className="mt-20 border border-white/10 bg-white/[0.02] p-8 md:p-12">
					<div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-amber-400">
								The Goal
							</p>

							<h3 className="mt-3 text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
								Destroy the Core
							</h3>

							<p className="mt-4 max-w-2xl leading-7 text-white/50">
								Fight together, control the battlefield, and push your way
								through the enemy base. When the opposing Core falls, the match
								is won.
							</p>
						</div>

						<div className="hidden h-24 w-24 items-center justify-center border border-amber-400/30 md:flex">
							<span className="text-2xl text-amber-400">◆</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function BattlefieldSection() {
	return (
		<section id="battlefield" className="scroll-mt-16 bg-[#080b0f] px-6 py-24 md:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Battlefield
					</p>

					<h2 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
						One battlefield. Three lanes.
					</h2>

					<p className="mt-6 text-lg leading-8 text-white/60">
						Two teams fight across a shared battlefield. Three lanes connect the
						opposing bases, while the jungle creates another path through the
						center of the map.
					</p>
				</div>

				{/* Map Placeholder */}
				<div className="relative aspect-[16/8] overflow-hidden border border-white/10 bg-white/[0.02]">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<p className="text-sm uppercase tracking-[0.3em] text-white/30">
								Monolith Battlefield
							</p>

							<p className="mt-3 text-xs uppercase tracking-widest text-white/20">
								Interactive Map — Coming Later
							</p>
						</div>
					</div>

					<div className="absolute left-0 top-0 h-px w-1/4 bg-amber-400" />
					<div className="absolute bottom-0 right-0 h-px w-1/4 bg-amber-400" />
				</div>

				{/* Lanes */}
				<div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
					<BattlefieldCard
						number="01"
						title="Offlane"
						description="Hold your lane, create pressure, and fight from the edge of the battlefield."
					/>

					<BattlefieldCard
						number="02"
						title="Midlane"
						description="Control the center of the map and influence the battlefield from the middle."
					/>

					<BattlefieldCard
						number="03"
						title="Duo Lane"
						description="Work together to control your side of the map and pressure the enemy."
					/>
				</div>
			</div>
		</section>
	);
}

function BattlefieldCard({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-[#0b0f14] p-8 transition-colors hover:bg-[#10151c] md:p-10">
			<p className="text-sm tracking-[0.3em] text-amber-400">{number}</p>

			<h3 className="mt-4 text-2xl font-semibold uppercase tracking-wide text-white">
				{title}
			</h3>

			<p className="mt-4 leading-7 text-white/50">{description}</p>
		</div>
	);
}

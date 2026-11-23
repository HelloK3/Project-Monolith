export default function GameOverview() {
	return (
		<section className="bg-[#0b0f14] px-6 py-24 md:py-32">
			<div className="mx-auto max-w-6xl">
				<div className="mb-16 max-w-3xl">
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Game
					</p>

					<h2 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
						A Third-Person MOBA
					</h2>

					<p className="mt-6 text-lg leading-8 text-white/60">
						Paragon is a third-person multiplayer online battle arena built
						around strategic team play, powerful heroes, and intense
						five-versus-five combat.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="border border-white/10 bg-white/[0.03] p-8">
						<p className="mb-3 text-sm uppercase tracking-widest text-amber-400">
							01
						</p>

						<h3 className="text-xl font-semibold uppercase tracking-wide text-white">
							Heroes
						</h3>

						<p className="mt-4 leading-7 text-white/50">
							Choose from a diverse roster of heroes, each with unique abilities
							and playstyles.
						</p>
					</div>

					<div className="border border-white/10 bg-white/[0.03] p-8">
						<p className="mb-3 text-sm uppercase tracking-widest text-amber-400">
							02
						</p>

						<h3 className="text-xl font-semibold uppercase tracking-wide text-white">
							Strategy
						</h3>

						<p className="mt-4 leading-7 text-white/50">
							Work with your team, control the battlefield, and make the right
							decisions at the right time.
						</p>
					</div>

					<div className="border border-white/10 bg-white/[0.03] p-8">
						<p className="mb-3 text-sm uppercase tracking-widest text-amber-400">
							03
						</p>

						<h3 className="text-xl font-semibold uppercase tracking-wide text-white">
							The Battlefield
						</h3>

						<p className="mt-4 leading-7 text-white/50">
							Fight through lanes, defeat enemy structures, secure objectives,
							and push toward the enemy core.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

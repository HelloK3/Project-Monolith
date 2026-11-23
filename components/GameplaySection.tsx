import Image from "next/image";

export default function GameplaySection() {
	return (
		<section id="gameplay" className="scroll-mt-16 relative overflow-hidden bg-[#0b0f14] px-6 py-24 md:py-32">
			<div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
				{/* Text */}
				<div>
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Perspective
					</p>

					<h2 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
						See the battle differently.
					</h2>

					<p className="mt-6 text-lg leading-8 text-white/60">
						Paragon brings the MOBA battlefield down to the ground. Fight from a
						third-person perspective, aim your attacks, manage your positioning,
						and use the environment to your advantage.
					</p>

					<p className="mt-4 text-lg leading-8 text-white/60">
						Elevation, terrain, and line of sight can change an encounter in an
						instant. Knowing where you are can be just as important as knowing
						when to attack.
					</p>
				</div>

				{/* Environment art */}
				<div className="relative aspect-video overflow-hidden border border-white/10 bg-white/[0.03]">
					<Image
						src="/images/hero/monolith-hero-image.jpg"
						alt="A moss-covered ruin in the Monolith jungle, lit by a glowing amber crystal"
						fill
						className="object-cover object-[40%_center]"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>

					<div className="absolute bottom-0 left-0 h-px w-1/3 bg-amber-400" />
				</div>
			</div>
		</section>
	);
}

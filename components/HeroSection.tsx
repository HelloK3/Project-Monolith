import AmbientVideo from "@/components/AmbientVideo";

export default function HeroSection() {
	return (
		<section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
			{/* Background video */}
			<AmbientVideo
				src="/videos/sparrow.webm"
				preload="auto"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/50" />

			{/* Hero Content */}
			<div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 text-center">
				<div>
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						Paragon v45 Reference
					</p>

					<h1 className="text-5xl font-bold uppercase tracking-[0.15em] text-white sm:text-6xl sm:tracking-[0.2em] md:text-8xl">
						Monolith
					</h1>

					<p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
						Explore the heroes, gameplay, abilities, and systems of the original
						Paragon experience.
					</p>
				</div>
			</div>
		</section>
	);
}

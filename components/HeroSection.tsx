export default function HeroSection() {
	return (
		<section className="relative min-h-[calc(100vh-82px)] overflow-hidden">
			{/* Background video */}
			<video
				className="absolute inset-0 h-full w-full object-cover"
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				aria-hidden="true"
			>
				<source src="/videos/sparrow.webm" type="video/webm" />
			</video>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/50" />

			{/* Hero Content */}
			<div className="relative z-10 flex min-h-[calc(100vh-82px)] items-center justify-center px-6 text-center">
				<div>
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						Paragon v45 Reference
					</p>

					<h1 className="text-6xl font-bold uppercase tracking-[0.2em] text-white md:text-8xl">
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

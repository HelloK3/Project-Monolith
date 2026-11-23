import Link from "next/link";

type ComingSoonProps = {
	eyebrow: string;
	title: string;
	description: string;
};

export default function ComingSoon({
	eyebrow,
	title,
	description,
}: ComingSoonProps) {
	return (
		<main className="flex min-h-screen items-center bg-[#080b0f] px-6 pb-24 pt-32 text-white md:px-12">
			<div className="mx-auto w-full max-w-7xl">
				<p className="mb-5 text-sm uppercase tracking-[0.4em] text-amber-400">
					{eyebrow}
				</p>

				<h1 className="max-w-4xl text-5xl font-bold uppercase tracking-tight md:text-7xl">
					{title}
				</h1>

				<p className="mt-8 max-w-2xl text-lg leading-8 text-white/50">
					{description}
				</p>

				<div className="mt-12 flex items-center gap-4">
					<span className="h-px w-12 bg-amber-400/80" />

					<p className="text-xs uppercase tracking-[0.35em] text-white/35">
						Coming soon
					</p>
				</div>

				<Link
					href="/heroes"
					className="mt-12 inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.15em] text-white/70 transition-all hover:border-amber-400/40 hover:text-white"
				>
					Browse the heroes
					<span className="text-amber-400">→</span>
				</Link>
			</div>
		</main>
	);
}

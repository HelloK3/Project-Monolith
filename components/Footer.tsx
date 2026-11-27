import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
	return (
		<footer className="border-t border-white/10 bg-[#06090d] text-white">
			<div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
				<div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
					{/* Brand */}
					<div>
						<p className="text-3xl font-bold uppercase tracking-[0.2em]">
							Monolith
						</p>

						<p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
							A community-built resource dedicated to the Monolith project and
							the community helping bring it back.
						</p>

						<div className="mt-8 h-px w-12 bg-amber-400" />

						<p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/20">
							Built for the community. Built for the game.
						</p>
					</div>

					{/* Explore */}
					<div>
						<p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">
							Explore
						</p>

						<nav className="mt-6 flex flex-col gap-4">
							<Link
								href="/heroes"
								className="text-sm text-white/50 transition-colors hover:text-white"
							>
								Heroes
							</Link>

							<Link
								href="/cards"
								className="text-sm text-white/50 transition-colors hover:text-white"
							>
								Cards
							</Link>

							<Link
								href="/#battlefield"
								className="text-sm text-white/50 transition-colors hover:text-white"
							>
								Battlefield
							</Link>

							<Link
								href="/#objectives"
								className="text-sm text-white/50 transition-colors hover:text-white"
							>
								Objectives
							</Link>

							<Link
								href="/#gameplay"
								className="text-sm text-white/50 transition-colors hover:text-white"
							>
								Gameplay
							</Link>
						</nav>
					</div>

					{/* Community (hidden until there's a real Discord invite to link to) */}
					{site.discordUrl && (
						<div>
							<p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">
								Community
							</p>

							<div className="mt-6">
								<a
									href={site.discordUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.15em] text-white/70 transition-all hover:border-amber-400/40 hover:text-white"
								>
									<span>Join the Discord</span>

									<span className="text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
										→
									</span>
								</a>

								<p className="mt-4 max-w-xs text-xs leading-6 text-white/25">
									Connect with the community, follow development, and help shape
									the future of Monolith.
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Bottom bar */}
				<div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-white/20 md:flex-row md:items-center md:justify-between">
					<p>© 2026 Monolith Community Project</p>

					<p>Community resource • Unofficial project site</p>
				</div>
			</div>
		</footer>
	);
}

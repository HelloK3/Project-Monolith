import Link from "next/link";
import { roles } from "@/data/roles";

export default function RolesSection() {
	return (
		<section className="bg-[#080b0f] px-6 py-24 md:py-32">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<div className="mb-16 max-w-3xl">
					<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
						The Roles
					</p>

					<h2 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl">
						Every position matters.
					</h2>

					<p className="mt-6 text-lg leading-8 text-white/60">
						Every player has a role to play. Understanding your position,
						responsibilities, and relationship with the rest of your team is
						essential to controlling the battlefield.
					</p>
				</div>

				{/* Role cards: each one opens the hero roster filtered to that role */}
				<div className="grid gap-px bg-white/10 md:grid-cols-5">
					{roles.map((role, index) => (
						<Link
							key={role.slug}
							href={`/heroes?role=${role.slug}`}
							className="group relative flex flex-col justify-between gap-12 overflow-hidden bg-[#0b0f14] p-6 transition-all duration-300 hover:bg-[#111820] focus-visible:bg-[#111820] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-amber-400 md:min-h-80"
						>
							{/* Number */}
							<div className="flex items-center justify-between">
								<span className="text-xs tracking-[0.3em] text-amber-400">
									{String(index + 1).padStart(2, "0")}
								</span>

								<span className="text-xs tracking-widest text-white/55 transition-colors group-hover:text-amber-400/60 group-focus-visible:text-amber-400/60">
									{role.shortName}
								</span>
							</div>

							{/* Role Name */}
							<div>
								<div className="mb-4 h-px w-8 bg-amber-400/50 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-400 group-focus-visible:w-16 group-focus-visible:bg-amber-400" />

								<h3 className="text-xl font-semibold uppercase tracking-wide text-white">
									{role.name}
								</h3>

								{/* Always visible on touch-sized screens; revealed on hover or keyboard focus on desktop */}
								<p className="mt-3 overflow-hidden text-sm leading-6 text-white/50 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-focus-visible:max-h-40 md:group-focus-visible:opacity-100">
									{role.description}
								</p>

								<p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/55 transition-colors group-hover:text-amber-400 group-focus-visible:text-amber-400">
									View heroes →
								</p>
							</div>
						</Link>
					))}
				</div>

				{/* Team Composition */}
				<div className="mt-12 border border-white/10 bg-white/[0.02] p-8 md:p-10">
					<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-amber-400">
								Team Composition
							</p>

							<h3 className="mt-3 text-2xl font-semibold uppercase tracking-wide text-white">
								Five players. One objective.
							</h3>
						</div>

						<div className="flex flex-wrap gap-3">
							{roles.map((role) => (
								<span
									key={role.slug}
									className="border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/50"
								>
									{role.shortName}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

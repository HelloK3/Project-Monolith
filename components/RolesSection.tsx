const roles = [
	{
		number: "01",
		name: "Offlane",
		shortName: "OFF",
		description:
			"A solo lane focused on pressure, survivability, and creating opportunities for the team.",
	},
	{
		number: "02",
		name: "Mid Lane",
		shortName: "MID",
		description:
			"The central position. Mid laners control the middle of the battlefield and can influence both sides of the map.",
	},
	{
		number: "03",
		name: "Jungle",
		shortName: "JGL",
		description:
			"Move between the lanes, secure jungle resources, and create opportunities by attacking from unexpected positions.",
	},
	{
		number: "04",
		name: "Carry",
		shortName: "ADC",
		description:
			"A ranged damage dealer who becomes increasingly powerful as the match progresses.",
	},
	{
		number: "05",
		name: "Support",
		shortName: "SUP",
		description:
			"Enable your teammates through protection, crowd control, vision, and battlefield utility.",
	},
];

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

				{/* Role Selector */}
				<div className="grid gap-px bg-white/10 md:grid-cols-5">
					{roles.map((role) => (
						<div
							key={role.number}
							className="group relative min-h-80 cursor-pointer overflow-hidden bg-[#0b0f14] p-6 transition-all duration-300 hover:bg-[#111820]"
						>
							{/* Number */}
							<div className="flex items-center justify-between">
								<span className="text-xs tracking-[0.3em] text-amber-400">
									{role.number}
								</span>

								<span className="text-xs tracking-widest text-white/20 transition-colors group-hover:text-amber-400/60">
									{role.shortName}
								</span>
							</div>

							{/* Role Name */}
							<div className="absolute bottom-6 left-6 right-6">
								<div className="mb-4 h-px w-8 bg-amber-400/50 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-400" />

								<h3 className="text-xl font-semibold uppercase tracking-wide text-white">
									{role.name}
								</h3>

								<p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/50 opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
									{role.description}
								</p>
							</div>
						</div>
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
									key={role.shortName}
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

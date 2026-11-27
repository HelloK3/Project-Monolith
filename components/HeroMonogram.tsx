type HeroMonogramProps = {
	name: string;
	className?: string;
};

/**
 * Stand-in artwork for heroes without a portrait yet: the hero's initials
 * set large over a dark radial glow, matching the site's amber accent.
 */
export default function HeroMonogram({ name, className = "" }: HeroMonogramProps) {
	const initials = name
		.replace(/[^A-Za-z\s.&-]/g, "")
		.split(/[\s.&-]+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join("");

	return (
		<div
			aria-hidden="true"
			className={`absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.10),transparent_65%)] ${className}`}
		>
			<span className="select-none text-[clamp(4rem,12vw,9rem)] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.07]">
				{initials}
			</span>
		</div>
	);
}

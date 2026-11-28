import { getHero, heroes } from "@/data/heroes";
import { getRole } from "@/data/roles";
import { ogCard, ogSize, publicImage } from "@/lib/og";

export const alt = "Hero profile on Monolith";
export const size = ogSize;
export const contentType = "image/png";

// One preview per hero, rendered at build time.
export function generateStaticParams() {
	return heroes.map((hero) => ({ slug: hero.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const hero = getHero((await params).slug)!;
	const role = getRole(hero.role).name;

	if (hero.status !== "complete") {
		return ogCard({
			eyebrow: role,
			title: hero.name,
			subtitle: "Hero profile in progress.",
			background: await publicImage("/images/hero/monolith-hero-image.jpg"),
		});
	}

	return ogCard({
		eyebrow: `${role} · ${hero.heroClass}`,
		title: hero.name,
		subtitle: "Stats, abilities and ability videos from Paragon v45.",
		background: await publicImage(hero.background),
		// Cut-out art only works over a background without the hero in it.
		foreground: hero.artwork?.endsWith(".png") ? await publicImage(hero.artwork) : undefined,
	});
}

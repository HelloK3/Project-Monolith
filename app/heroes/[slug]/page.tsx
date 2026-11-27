import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompleteHeroProfile from "@/components/CompleteHeroProfile";
import PlaceholderHeroProfile from "@/components/PlaceholderHeroProfile";
import { getHero, heroes } from "@/data/heroes";
import { getRole } from "@/data/roles";

type HeroPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

// Build every hero page ahead of time, and 404 any slug that isn't a hero
// instead of trying to render it on demand.
export function generateStaticParams() {
	return heroes.map((hero) => ({ slug: hero.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: HeroPageProps): Promise<Metadata> {
	const { slug } = await params;
	const hero = getHero(slug);

	if (!hero) {
		return {};
	}

	return {
		title: hero.name,
		description:
			hero.status === "complete"
				? hero.description
				: `${hero.name}, ${getRole(hero.role).name} hero in Paragon v45. Full profile in progress.`,
	};
}

export default async function HeroPage({ params }: HeroPageProps) {
	const { slug } = await params;
	const hero = getHero(slug);

	if (!hero) {
		notFound();
	}

	return hero.status === "complete" ? (
		<CompleteHeroProfile hero={hero} />
	) : (
		<PlaceholderHeroProfile hero={hero} />
	);
}

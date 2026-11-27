import { roster } from "./roster";
import type { Hero } from "./types";

export * from "./types";

/**
 * Hero data lives one file per hero, generated from the Paragon v45 game
 * files by scripts/import-heroes.mjs; roster.ts lists them all.
 */

/** Every hero, alphabetical by name. */
export const heroes: Hero[] = [...roster].sort((a, b) =>
	a.name.localeCompare(b.name),
);

export function getHero(slug: string): Hero | undefined {
	return heroes.find((hero) => hero.slug === slug);
}

export const completedHeroCount = heroes.filter(
	(hero) => hero.status === "complete",
).length;

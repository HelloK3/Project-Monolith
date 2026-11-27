import type { DescriptionPart } from "@/data/heroes";

/** The five card affinities, in display order, with their accent colors. */
export const affinities = [
	{ slug: "chaos", name: "Chaos", color: "#e0533d" },
	{ slug: "death", name: "Death", color: "#a46cf0" },
	{ slug: "growth", name: "Growth", color: "#5fbf5a" },
	{ slug: "knowledge", name: "Knowledge", color: "#4f9de8" },
	{ slug: "order", name: "Order", color: "#e6b440" },
] as const;

export const rarities = [
	{ slug: "common", name: "Common" },
	{ slug: "uncommon", name: "Uncommon" },
	{ slug: "rare", name: "Rare" },
	{ slug: "epic", name: "Epic" },
] as const;

export type AffinitySlug = (typeof affinities)[number]["slug"];
export type RaritySlug = (typeof rarities)[number]["slug"];

export type CardEffect = {
	name: string;
	/** "Passive", "Active" or "Toggle". */
	activation: string;
	description: Extract<DescriptionPart, { type: "text" | "bold" }>[];
};

export type Card = {
	slug: string;
	name: string;
	affinity: AffinitySlug;
	rarity: RaritySlug;
	/** Special rule such as "Consumable"; unset for ordinary cards. */
	trait?: string;
	/** Part of a starter deck. */
	starter: boolean;
	costs: { label: string; amount: number }[];
	stats: { label: string; value: string }[];
	effects: CardEffect[];
	art: string;
};

export function getAffinity(slug: AffinitySlug) {
	return affinities.find((affinity) => affinity.slug === slug)!;
}

export function getRarity(slug: RaritySlug) {
	return rarities.find((rarity) => rarity.slug === slug)!;
}

export function isAffinitySlug(value: unknown): value is AffinitySlug {
	return affinities.some((affinity) => affinity.slug === value);
}

export function isRaritySlug(value: unknown): value is RaritySlug {
	return rarities.some((rarity) => rarity.slug === value);
}

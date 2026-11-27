import type { RoleSlug } from "@/data/roles";

export type DescriptionPart =
	| {
			type: "text";
			value: string;
	  }
	| {
			type: "bold";
			value: string;
	  }
	| {
			type: "icon";
			name: string;
			color:
				| "physical"
				| "magic"
				| "health"
				| "mana"
				| "slow"
				| "stun"
				| "armor"
				| "neutral";
	  };

export type Ability = {
	key: string;
	label: string;
	type: string;
	name: string;
	description: DescriptionPart[];
	damage: string;
	cooldown: string;
	cost: string;
	icon: string;
	artwork?: string;
	video?: string;
};

export type HeroStats = {
	basicAttack: number;
	abilityAttack: number;
	durability: number;
	mobility: number;

	baseHealth: string;
	healthRegen: string;
	mana: string;
	manaRegen: string;
	abilityArmor: string;
	basicArmor: string;
	basicAttackDamage: string;
	attackPerSecond: string;
};

/** Fields every hero has, finished or not. */
type HeroBase = {
	name: string;
	slug: string;
	role: RoleSlug;
	/** Optional showcase clip, used on placeholder pages until full art exists. */
	previewVideo?: string;
};

/**
 * A hero that's still being written up: only the basics are known, so the
 * roster and hero page show a "profile in progress" version.
 */
export type PlaceholderHero = HeroBase & {
	status: "placeholder";
};

/** A fully documented hero with art, stats, and abilities. */
export type CompleteHero = HeroBase & {
	status: "complete";
	description: string;
	heroClass: string;
	position: string;
	/** Leave unset when the difficulty is unknown; the page shows "—". */
	difficulty?: string;
	traits: string[];
	/** Cut-out hero render layered over the background. Optional: without it the background is the header image. */
	artwork?: string;
	portrait: string;
	/** Full-bleed environment image behind the hero header. */
	background: string;
	stats: HeroStats;
	abilities: Ability[];
	/** Skin art, default first. Unset when no skin art is available. */
	skins?: { name: string; image: string }[];
};

/**
 * `status` is the discriminant: checking `hero.status === "complete"` tells
 * TypeScript the full set of fields is available, so a page can't
 * accidentally read stats from a placeholder.
 */
export type Hero = PlaceholderHero | CompleteHero;

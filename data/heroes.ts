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
			color: "physical" | "magic" | "health" | "slow" | "stun" | "armor";
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

export type Hero = {
	name: string;
	slug: string;
	role: RoleSlug;
	description: string;
	heroClass: string;
	position: string;
	/** Leave unset when the difficulty is unknown; the page shows "—". */
	difficulty?: string;
	traits: string[];
	artwork: string;
	portrait: string;
	/** Full-bleed environment image behind the hero header. */
	background: string;
	stats: HeroStats;
	abilities: Ability[];
};

export const heroes: Hero[] = [
	{
		name: "Rampage",
		slug: "rampage",
		role: "jungle",
		description:
			"A powerful melee fighter capable of disrupting enemies, controlling the jungle, and diving into the heart of a fight.",
		heroClass: "Fighter",
		position: "Jungle",
		traits: ["Durable", "Wild", "Attacker", "Initiator", "Elusive", "Ganker"],
		artwork: "/images/hero/rampage/rampage-full.png",
		portrait: "/images/hero/rampage/rampage-portrait.png",
		background: "/images/hero/rampage/rampage-bg.jpg",

		stats: {
			basicAttack: 4,
			abilityAttack: 2,
			durability: 8,
			mobility: 7,

			baseHealth: "662.8 (+75.5)",
			healthRegen: "1.1 (+0.13)",
			mana: "276 (+15)",
			manaRegen: "1.32 (+0.05)",
			abilityArmor: "25",
			basicArmor: "27.84 (+2.18)",
			basicAttackDamage: "61.75 (+2.28)",
			attackPerSecond: "1.18 (+1.35%)",
		},

		abilities: [
			{
				key: "LMB",
				label: "LMB",
				type: "BASIC ATTACK",
				name: "Swipe",

				description: [
					{
						type: "text",
						value: "Melee basic attack dealing ",
					},
					{
						type: "bold",
						value: "63.2",
					},
					{
						type: "icon",
						name: "icon-attr-physdmg",
						color: "physical",
					},
					{
						type: "bold",
						value: "Basic Damage.",
					},
				],

				damage: "63.2",
				cooldown: "—",
				cost: "—",
				icon: "/images/hero/rampage/rampage-swipe.png",
				artwork: "/images/hero/rampage/rampage-swipe.png",
				video: "/videos/heroes/rampage/swipe.webm",
			},

			{
				key: "Q",
				label: "Q",
				type: "PRIMARY ABILITY",
				name: "Boulder Throw",

				description: [
					{
						type: "text",
						value: "Rampage throws a boulder, dealing ",
					},
					{
						type: "bold",
						value: "146 | 205",
					},
					{
						type: "icon",
						name: "icon-attr-endmg",
						color: "magic",
					},
					{
						type: "bold",
						value: "Ability Damage",
					},
					{
						type: "text",
						value: " and a ",
					},
					{
						type: "bold",
						value: "1.2 | 1.6 second",
					},
					{
						type: "icon",
						name: "icon-attr-stun",
						color: "stun",
					},
					{
						type: "bold",
						value: "Stun",
					},
					{
						type: "text",
						value:
							" to enemies. Enemy minions hit by the boulder will also be displaced. On activation, Rampage pulls a boulder from the ground. Rampage's movement speed will be slowed until he throws the boulder or cancels the ability.",
					},
				],

				damage: "146|205",
				cooldown: "18 / 16.5 / 15 / 13.5 / 12s",
				cost: "80 Mana",
				icon: "/images/hero/rampage/rampage-boulder-throw.png",
				artwork: "/images/hero/rampage/rampage-boulder-throw.png",
				video: "/videos/heroes/rampage/boulder-throw.webm",
			},

			{
				key: "RMB",
				label: "RMB",
				type: "ALTERNATE ABILITY",
				name: "King of the Jungle",

				description: [
					{
						type: "bold",
						value: "Active:",
					},
					{
						type: "text",
						value: " Gain bonus basic damage equal to ",
					},
					{
						type: "bold",
						value: "3% of current health",
					},
					{
						type: "text",
						value: " for 5 seconds. ",
					},
					{
						type: "bold",
						value: "Passive:",
					},
					{
						type: "icon",
						name: "icon-attr-hpreg",
						color: "health",
					},
					{
						type: "bold",
						value: "Health Regen +1 | 1.25%",
					},
					{
						type: "text",
						value: " of max health per second while in the jungle.",
					},
				],

				damage: "3% of current health",
				cooldown: "—",
				cost: "—",
				icon: "/images/hero/rampage/rampage-king-of-the-jungle.png",
				artwork: "/images/hero/rampage/rampage-king-of-the-jungle.png",
				video: "/videos/heroes/rampage/king-of-the-jungle.webm",
			},

			{
				key: "E",
				label: "E",
				type: "SECONDARY ABILITY",
				name: "Rumble",

				description: [
					{
						type: "text",
						value: "Rampage pounds the ground with both fists, dealing ",
					},
					{
						type: "bold",
						value: "94 | 152",
					},
					{
						type: "icon",
						name: "icon-attr-endmg",
						color: "magic",
					},
					{
						type: "bold",
						value: "Ability Damage",
					},
					{
						type: "text",
						value: " and ",
					},
					{
						type: "bold",
						value: "25 | 30%",
					},
					{
						type: "icon",
						name: "icon-status-slow",
						color: "slow",
					},
					{
						type: "bold",
						value: "Slow",
					},
					{
						type: "text",
						value: " to all nearby enemies for 2 seconds.",
					},
				],

				damage: "94 | 152",
				cooldown: "8 / 7 / 6 / 5 / 4s",
				cost: "30 Mana",
				icon: "/images/hero/rampage/rampage-rumble.png",
				artwork: "/images/hero/rampage/rampage-rumble.png",
				video: "/videos/heroes/rampage/rumble.webm",
			},

			{
				key: "R",
				label: "R",
				type: "ULTIMATE",
				name: "Enraged",

				description: [
					{
						type: "text",
						value:
							"Rampage becomes enraged for the next 12 seconds. Rumble hits a larger area and its cooldown is reduced by 4 seconds. Boulder Throw can be thrown quickly, but at shorter range. King of the Jungle's",
					},
					{
						type: "icon",
						name: "icon-attr-hpreg",
						color: "health",
					},
					{
						type: "bold",
						value: "Health Regen",
					},
					{
						type: "text",
						value:
							" is multiplied by a factor of 5 and is active everywhere on the map.",
					},
				],

				damage: "—",
				cooldown: "125 / 115 / 105s",
				cost: "100 Mana",
				icon: "/images/hero/rampage/rampage-enraged.png",
				artwork: "/images/hero/rampage/rampage-enraged.png",
				video: "/videos/heroes/rampage/enraged.webm",
			},
		],
	},
];

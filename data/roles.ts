/**
 * The five team roles. This is the single source of truth used by the home
 * page role cards, the roster filter, and each hero's `role` field, so the
 * three can never drift apart.
 */
export const roles = [
	{
		slug: "offlane",
		name: "Offlane",
		shortName: "OFF",
		description:
			"A solo lane focused on pressure, survivability, and creating opportunities for the team.",
	},
	{
		slug: "mid",
		name: "Mid Lane",
		shortName: "MID",
		description:
			"The central position. Mid laners control the middle of the battlefield and can influence both sides of the map.",
	},
	{
		slug: "jungle",
		name: "Jungle",
		shortName: "JGL",
		description:
			"Move between the lanes, secure jungle resources, and create opportunities by attacking from unexpected positions.",
	},
	{
		slug: "carry",
		name: "Carry",
		shortName: "ADC",
		description:
			"A ranged damage dealer who becomes increasingly powerful as the match progresses.",
	},
	{
		slug: "support",
		name: "Support",
		shortName: "SUP",
		description:
			"Enable your teammates through protection, crowd control, vision, and battlefield utility.",
	},
] as const;

export type Role = (typeof roles)[number];
export type RoleSlug = Role["slug"];

export function getRole(slug: RoleSlug): Role {
	// Every RoleSlug exists in `roles`, so this lookup can't miss.
	return roles.find((role) => role.slug === slug)!;
}

export function isRoleSlug(value: unknown): value is RoleSlug {
	return roles.some((role) => role.slug === value);
}

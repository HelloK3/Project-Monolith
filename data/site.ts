/**
 * Site-wide settings. Leave a link as null until it exists: anything that
 * depends on it is hidden instead of rendering a link to nowhere.
 */
export const site = {
	name: "Monolith",
	/** Production URL, used to build absolute links for social previews. */
	url: "https://project-monolith-beta.vercel.app",
	discordUrl: null as string | null,
};

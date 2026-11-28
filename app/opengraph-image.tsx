import { ogCard, ogSize, publicImage } from "@/lib/og";

export const alt = "Monolith, an unofficial Paragon v45 reference";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
	return ogCard({
		eyebrow: "Paragon v45 Reference",
		title: "Monolith",
		subtitle: "37 heroes, 116 cards, every ability and stat, from the game files.",
		background: await publicImage("/images/hero/monolith-hero-image.jpg"),
	});
}

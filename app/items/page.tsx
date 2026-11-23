import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
	title: "Items",
};

export default function ItemsPage() {
	return (
		<ComingSoon
			eyebrow="The Items"
			title="Gear for every fight."
			description="A complete reference of items, their stats, and how they shape a build is on the way."
		/>
	);
}

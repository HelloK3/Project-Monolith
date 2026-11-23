import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
	title: "Builds",
};

export default function BuildsPage() {
	return (
		<ComingSoon
			eyebrow="The Builds"
			title="Plan your loadout."
			description="Hero builds and deck guides from the community will live here."
		/>
	);
}

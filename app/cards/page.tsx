import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
	title: "Cards",
};

export default function CardsPage() {
	return (
		<ComingSoon
			eyebrow="The Cards"
			title="Every card, catalogued."
			description="Card costs, effects, and upgrade paths from Paragon v45 are being documented."
		/>
	);
}

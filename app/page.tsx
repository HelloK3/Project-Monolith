import RolesSection from "@/components/RolesSection";
import ObjectiveSection from "@/components/ObjectiveSection";
import BattlefieldSection from "@/components/BattlefieldSection";
import GameOverview from "@/components/GameOverview";
import GameplaySection from "@/components/GameplaySection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
	return (
		<main>
			<HeroSection />
			<GameOverview />
			<GameplaySection />
			<BattlefieldSection />
			<ObjectiveSection />
			<RolesSection />
		</main>
	);
}

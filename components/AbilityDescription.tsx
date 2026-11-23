import type { DescriptionPart } from "@/data/heroes";

type AbilityDescriptionProps = {
	parts: DescriptionPart[];
};

const iconColors: Record<
	Extract<DescriptionPart, { type: "icon" }>["color"],
	string
> = {
	physical: "#ec685a",
	magic: "#b17bfc",
	health: "#67c587",
	slow: "#5eb6e6",
	stun: "#e5c35a",
	armor: "#9b9b9b",
};

export default function AbilityDescription({ parts }: AbilityDescriptionProps) {
	return (
		<p className="mt-6 max-w-xl text-base leading-7 text-white/50 md:text-lg">
			{parts.map((part, index) => {
				switch (part.type) {
					case "text":
						return <span key={index}>{part.value}</span>;

					case "bold":
						return (
							<strong key={index} className="font-semibold text-white/85">
								{part.value}
							</strong>
						);

					case "icon":
						return (
							<span
								key={index}
								aria-hidden="true"
								className="mx-[0.25em] inline-block h-[1em] w-[1em] align-[-0.12em]"
								style={{
									backgroundColor: iconColors[part.color],
									maskImage: `url("/icons/paragon/${part.name}.svg")`,
									WebkitMaskImage: `url("/icons/paragon/${part.name}.svg")`,
									maskRepeat: "no-repeat",
									WebkitMaskRepeat: "no-repeat",
									maskPosition: "center",
									WebkitMaskPosition: "center",
									maskSize: "contain",
									WebkitMaskSize: "contain",
								}}
							/>
						);

					default:
						return null;
				}
			})}
		</p>
	);
}

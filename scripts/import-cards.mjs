#!/usr/bin/env node
/**
 * Turns the Paragon v45 card export into the site's card data.
 *
 *   node scripts/import-cards.mjs <path to monolith-export>
 *
 * Reads cards/cards.json from the export, converts each card's art to WebP in
 * public/images/cards/, and writes data/cards.ts, a typed list of every card.
 * Needs ffmpeg on the PATH.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const exportDir = process.argv[2];
const cardsFile = exportDir && path.join(exportDir, "cards/cards.json");

if (!cardsFile || !fs.existsSync(cardsFile)) {
	console.error("Usage: node scripts/import-cards.mjs <path to monolith-export>");
	process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const { cards } = JSON.parse(fs.readFileSync(cardsFile, "utf8"));

const statLabels = {
	power: "Power",
	attackSpeedRating: "Attack Speed",
	maxHealth: "Max Health",
	healthRegen: "Health Regen",
	maxMana: "Max Mana",
	manaRegen: "Mana Regen",
	abilityArmor: "Ability Armor",
	basicArmor: "Basic Armor",
};

const costLabels = {
	vitality: "Vitality",
	dexterity: "Dexterity",
	intellect: "Intellect",
	gold: "Gold",
};

const traitLabels = {
	Consumable: "Consumable",
	DiscardOnDeath: "Discarded on death",
	CanNotDiscard: "Can't be discarded",
	Cultivate: "Cultivate",
	Elevate: "Elevate",
};

const activationLabels = {
	Equip: "Passive",
	Input: "Active",
	Toggle: "Toggle",
};

/** Round to at most `digits` decimals and drop trailing zeros. */
function num(value, digits = 1) {
	return String(Number(value.toFixed(digits)));
}

/** Formats one raw value the way the game's display hint says. */
function formatValue(value, format) {
	switch (format) {
		case "Percent_Raw":
			return { text: num(value * 100), unit: "%" };
		case "Percent_SubtractOne":
			return { text: num((value - 1) * 100), unit: "%" };
		case "Percent_Final":
			return { text: num(value), unit: "%" };
		case "Time":
			return { text: num(value), unit: "s" };
		default:
			return { text: num(value, value >= 10 ? 0 : 1), unit: "" };
	}
}

/**
 * Effect values are 20-step curves. Show the full range ("7.4–18.6%") when
 * the value scales, or a single number when it doesn't.
 */
function tokenText(entry) {
	if (!entry) return "—";
	const steps = entry.byLevel?.length ? entry.byLevel : [entry.constant ?? 0];
	const first = formatValue(steps[0], entry.format);
	const last = formatValue(steps.at(-1), entry.format);
	return first.text === last.text
		? `${first.text}${first.unit}`
		: `${first.text}–${last.text}${last.unit}`;
}

/** Fills {Token} placeholders and returns text/bold parts for the description. */
function describe(effect) {
	const raw = (effect.descriptionRaw ?? "").replace(/\s+/g, " ").trim();
	const parts = [];
	let cursor = 0;

	for (const match of raw.matchAll(/\{([^}]+)\}/g)) {
		const before = raw.slice(cursor, match.index);
		if (before) parts.push({ type: "text", value: before });
		let value = tokenText(effect.values?.[match[1]]);
		// "reduced by -30" reads as a double negative; the wording already says it.
		if (/(reduc|decreas|lower)\w*( by)? $/i.test(raw.slice(0, match.index))) {
			value = value.replace(/-(?=\d)/g, "");
		}
		parts.push({ type: "bold", value });
		cursor = match.index + match[0].length;
	}
	if (cursor < raw.length) parts.push({ type: "text", value: raw.slice(cursor) });
	return parts;
}

function saveArt(from, to) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	execFileSync("ffmpeg", [
		"-v", "error", "-y", "-i", from,
		"-c:v", "libwebp", "-quality", "82", "-frames:v", "1", "-update", "1", to,
	]);
}

const imported = [];
const skipped = [];

for (const card of cards) {
	// A few cards have no stats row in the game files: they were never sold
	// in v45, so there's nothing to show beyond a name.
	if (!card.affinity || card.effects.length === 0) {
		skipped.push(card.name);
		continue;
	}

	const art = `/images/cards/${card.slug}.webp`;
	saveArt(path.join(exportDir, "cards", card.art), path.join(root, "public", art));

	imported.push({
		slug: card.slug,
		name: card.name,
		affinity: card.affinity.toLowerCase(),
		rarity: card.rarity.toLowerCase(),
		trait: traitLabels[card.trait],
		starter: card.starter,
		costs: Object.entries(card.costs)
			.filter(([, amount]) => amount > 0)
			.map(([key, amount]) => ({ label: costLabels[key], amount })),
		stats: Object.entries(card.stats)
			.filter(([, amount]) => amount !== 0)
			.map(([key, amount]) => ({ label: statLabels[key], value: `+${num(amount)}` })),
		// Skip effects whose keyword is missing from the game's keyword table:
		// they have no name or text to show.
		effects: card.effects.filter((effect) => effect.name && effect.descriptionRaw).map((effect) => ({
			name: effect.name,
			activation: activationLabels[effect.activation] ?? "Passive",
			description: describe(effect),
		})),
		art,
	});
}

const rarityOrder = ["common", "uncommon", "rare", "epic"];
imported.sort(
	(a, b) =>
		rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity) ||
		a.name.localeCompare(b.name),
);

const source = `// Generated by scripts/import-cards.mjs from the Paragon v45 game files.
// Edit the script and re-run it rather than editing this file.
import type { Card } from "./card-types";

export const cards: Card[] = ${JSON.stringify(imported, null, "\t")};
`;

fs.writeFileSync(path.join(root, "data/cards.ts"), source);
console.log(`Imported ${imported.length} cards. Skipped (no stats in the game files): ${skipped.join(", ")}.`);

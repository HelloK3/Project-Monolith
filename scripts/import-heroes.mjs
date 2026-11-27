#!/usr/bin/env node
/**
 * Turns a Paragon v45 data export into the site's hero data.
 *
 *   node scripts/import-heroes.mjs <path to monolith-export>
 *
 * For every hero in the export's manifest.json it:
 *   - copies the portrait and ability icons into public/images/hero/<slug>/
 *   - builds the header image, banner.jpg (plus, when enabled, a full-body
 *     render from reference/fullbody/<slug>.png over a blurred banner)
 *   - writes data/heroes/<slug>.ts, a typed CompleteHero
 * and then writes data/heroes/roster.ts, which imports them all.
 *
 * Ability videos are converted separately (see README) and are expected at
 * public/videos/heroes/<slug>/<slot>.webm.
 *
 * Images are processed with ffmpeg, which must be on the PATH.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const exportDir = process.argv[2];

if (!exportDir || !fs.existsSync(path.join(exportDir, "manifest.json"))) {
	console.error("Usage: node scripts/import-heroes.mjs <path to monolith-export>");
	process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const manifest = readJson(path.join(exportDir, "manifest.json"));

/* ------------------------------------------------------------------ */
/* Hand-picked overrides                                               */
/* ------------------------------------------------------------------ */

/**
 * Wide key art found in the game files for a few heroes. When a hero has no
 * spotlight image from the old Paragon website, this is the next-best
 * backdrop, ahead of the 960x540 tutorial splash.
 */
const keyArt = {
	serath: "images/Characters/Heroes/FallenAngel/Serath.png",
	yin: "images/Characters/Heroes/Femme/Femme.png",
	aurora: "images/Characters/Heroes/Ice/Aurora.png",
	morigesh: "images/Characters/Heroes/Mambo/Mambo.png",
	shinbi: "images/Characters/Heroes/Mudang/Mudang.png",
};

/**
 * Full-body renders (reference/fullbody/<slug>.png) layered over the banner,
 * like Rampage's header. Off for now: the banner art alone is the header
 * image. Set to true to bring the renders back.
 */
const useFullBodyRenders = false;

/**
 * Rampage was written by hand before the export existed. Keep its custom
 * artwork, description and ability media; everything else comes from the
 * game files like every other hero.
 */
const rampageMedia = (name) => {
	const file = slugify(name);
	return {
		icon: `/images/hero/rampage/rampage-${file}.png`,
		artwork: `/images/hero/rampage/rampage-${file}.png`,
		video: `/videos/heroes/rampage/${file}.webm`,
	};
};

const overrides = {
	rampage: {
		description:
			"A powerful melee fighter capable of disrupting enemies, controlling the jungle, and diving into the heart of a fight.",
		artwork: "/images/hero/rampage/rampage-full.png",
		portrait: "/images/hero/rampage/rampage-portrait.png",
		background: "/images/hero/rampage/rampage-bg.jpg",
		abilityMedia: rampageMedia,
	},
};

/* ------------------------------------------------------------------ */
/* Mapping game data to the site's shapes                              */
/* ------------------------------------------------------------------ */

/** Game lane tags → the site's role slugs (see data/roles.ts). */
const laneToRole = {
	offlane: "offlane",
	toplane: "offlane",
	midlane: "mid",
	middlelane: "mid",
	mid: "mid",
	jungle: "jungle",
	safelaneone: "carry",
	carry: "carry",
	safelanetwo: "support",
	support: "support",
};

const roleNames = {
	offlane: "Offlane",
	mid: "Mid Lane",
	jungle: "Jungle",
	carry: "Carry",
	support: "Support",
};

/** Tab order on the hero page. */
const slotOrder = ["LMB", "Q", "RMB", "E", "R"];

const slotTypes = {
	LMB: "BASIC ATTACK",
	Q: "PRIMARY ABILITY",
	RMB: "ALTERNATE ABILITY",
	E: "SECONDARY ABILITY",
	R: "ULTIMATE",
};

/** `<attr id="…"/>` in descriptions → an icon in public/icons/paragon. */
const attrIcons = {
	endmg: ["icon-attr-endmg", "magic"],
	physdmg: ["icon-attr-physdmg", "physical"],
	dmgbns: ["icon-attr-abilitydamage", "physical"],
	physpen: ["icon-attr-physpen", "physical"],
	atkspd: ["icon-attr-atkspd", "physical"],
	hp: ["icon-attr-hp", "health"],
	hpreg: ["icon-attr-hpreg", "health"],
	lfstl: ["icon-attr-lfstl", "health"],
	mp: ["icon-attr-mp", "mana"],
	mpreg: ["icon-attr-mpreg", "mana"],
	shld: ["icon-attr-shld", "armor"],
	enar: ["icon-attr-enar", "armor"],
	physar: ["icon-attr-physar", "armor"],
	spd: ["icon-attr-spd", "neutral"],
	cdr: ["icon-attr-cdr", "neutral"],
};

/** `<status id="…"/>` → an icon plus the status name, shown in bold. */
const statusIcons = {
	slow: ["icon-status-slow", "slow", "Slow"],
	stun: ["icon-status-stun", "stun", "Stun"],
	root: ["icon-status-root", "stun", "Root"],
	slnc: ["icon-status-slnc", "magic", "Silence"],
	burn: ["icon-status-burn", "physical", "Burn"],
	gold: ["icon-status-gold", "stun", "Gold"],
	shadowplane: [null, null, "Shadow Plane"],
};

/** Self-closing word tags that stand in for plain text. */
const wordTags = { cd: "cooldown", heal: "heal" };

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function camelCase(slug) {
	return slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

/** Round to at most two decimals and drop trailing zeros. */
function num(value) {
	return String(Number(value.toFixed(2)));
}

/** "662.8 (+75.5)", or just "25" when the stat doesn't grow. */
function statText(stat) {
	if (!stat || stat.base == null) return "—";
	return stat.perLevel ? `${num(stat.base)} (+${num(stat.perLevel)})` : num(stat.base);
}

/** Per-rank values as "12 / 11 / 10", collapsed to one number when they're all equal. */
function rankText(values, suffix = "") {
	if (!values || values.every((value) => value == null || value === 0)) return "—";
	const shown = values.map((value) => num(value ?? 0));
	const text = shown.every((value) => value === shown[0]) ? shown[0] : shown.join(" / ");
	return `${text}${suffix}`;
}

/**
 * Splits a game description into the site's DescriptionPart list: plain
 * text, bold numbers and keywords, and damage-type / status icons.
 */
function parseDescription(raw, tokens) {
	const text = raw
		// Fill any {Token} left unresolved with its rank-1 value, or a dash.
		.replace(/\{([^}]+)\}/g, (_, name) => {
			const value = tokens?.[name];
			return Array.isArray(value) && value[0] != null ? num(value[0]) : "—";
		})
		// The game stores percentages as fractions (0.02 for 2%) and formatted
		// them at display time, so scale any "0.xx%" back up.
		.replace(/\b0\.(\d+)%/g, (_, digits) => `${num(Number(`0.${digits}`) * 100)}%`)
		.replace(/\r?\n/g, " ")
		.replace(/\s{2,}/g, " ")
		.trim();

	const parts = [];
	const pushText = (value) => {
		// Bold every number (and its % sign) inside running text.
		for (const piece of value.split(/(\d+(?:\.\d+)?%?)/)) {
			if (!piece) continue;
			const isNumber = /^\d/.test(piece);
			const last = parts.at(-1);
			if (!isNumber && last?.type === "text") last.value += piece;
			else parts.push({ type: isNumber ? "bold" : "text", value: piece });
		}
	};

	const tagPattern = /<attr id="([^"]+)"\/>|<status id="([^"]+)"\/>|<key>(.*?)<\/>|<(\w+)\/>/gi;
	let cursor = 0;

	for (const match of text.matchAll(tagPattern)) {
		pushText(text.slice(cursor, match.index));
		cursor = match.index + match[0].length;

		const [, attr, status, keyword, word] = match;

		if (attr) {
			const icon = attrIcons[attr.toLowerCase()];
			if (icon) parts.push({ type: "icon", name: icon[0], color: icon[1] });
		} else if (status) {
			const [iconName, color, label] = statusIcons[status.toLowerCase()] ?? [null, null, status];
			if (iconName) parts.push({ type: "icon", name: iconName, color });
			parts.push({ type: "bold", value: label });
		} else if (keyword) {
			parts.push({ type: "bold", value: keyword });
		} else if (word) {
			pushText(wordTags[word.toLowerCase()] ?? "");
		}
	}

	pushText(text.slice(cursor));
	return parts;
}

/** Primary and secondary lanes from tags like `HeroMeta.Position.Jungle.Primary`. */
function lanes(hero) {
	const tags = hero.extras?.heroDescriptionTags ?? [];
	const find = (rank) =>
		tags
			.map((tag) => tag.match(new RegExp(`^HeroMeta\\.Position\\.(\\w+)\\.${rank}$`))?.[1])
			.filter(Boolean)
			.map((lane) => laneToRole[lane.toLowerCase()])
			.filter(Boolean);

	const primary = find("Primary")[0] ?? laneToRole[String(hero.role).toLowerCase()];
	const secondary = find("Secondary").filter((role) => role !== primary);
	return { primary, secondary };
}

function describe(hero, { primary, secondary }) {
	const range = (hero.rangeType ?? "").toLowerCase();
	const heroClass = (hero.heroClass ?? "hero").toLowerCase();
	const article = /^[aeiou]/.test(range || heroClass) ? "An" : "A";
	const flex = secondary.length
		? ` who can also flex to ${secondary.map((role) => roleNames[role]).join(" or ")}`
		: "";
	return `${article} ${[range, heroClass].filter(Boolean).join(" ")} built for ${roleNames[primary]}${flex}.`;
}

/* ------------------------------------------------------------------ */
/* Files                                                               */
/* ------------------------------------------------------------------ */

function copyFile(from, to) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.copyFileSync(from, to);
}

function ffmpeg(...args) {
	return execFileSync("ffmpeg", ["-v", "error", "-y", ...args], {
		maxBuffer: 64 * 1024 * 1024,
	});
}

/**
 * Saves the header backdrop as a 1920px JPEG. Behind a full-body render it's
 * blurred, so the hero isn't shown twice and the render stays the focus.
 */
function saveBackdrop(from, to, { blur }) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	const filters = ["scale='min(1920,iw)':-2"];
	if (blur) filters.push("gblur=sigma=18");
	ffmpeg("-i", from, "-vf", filters.join(","), "-q:v", "4", "-frames:v", "1", "-update", "1", to);
}

/** Bounding box of the non-transparent pixels in an image. */
function opaqueBounds(file) {
	const probe = execFileSync("ffprobe", [
		"-v", "error", "-select_streams", "v:0",
		"-show_entries", "stream=width,height", "-of", "csv=p=0", file,
	]).toString().trim();
	const [width, height] = probe.split(",").map(Number);
	const alpha = ffmpeg("-i", file, "-vf", "format=rgba,alphaextract", "-f", "rawvideo", "-pix_fmt", "gray", "-");

	let left = width, right = -1, top = height, bottom = -1;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (alpha[y * width + x] > 8) {
				if (x < left) left = x;
				if (x > right) right = x;
				if (y < top) top = y;
				if (y > bottom) bottom = y;
			}
		}
	}
	return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

/** Crops a transparent render to the hero (plus a little room) and saves it as WebP. */
function saveCutout(from, to) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	const box = opaqueBounds(from);
	const pad = Math.round(box.height * 0.03);
	ffmpeg(
		"-i", from,
		"-vf", `crop=${box.width}:${box.height}:${box.left}:${box.top},pad=iw+${pad * 2}:ih+${pad}:${pad}:${pad}:color=0x00000000`,
		"-c:v", "libwebp", "-quality", "88", "-frames:v", "1", "-update", "1",
		to,
	);
}

/** Serializes a value as TypeScript source, tab-indented, without quoting simple keys. */
function toSource(value, indent = "") {
	const next = `${indent}\t`;
	if (Array.isArray(value)) {
		if (value.length === 0) return "[]";
		if (value.every((item) => typeof item !== "object")) {
			return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
		}
		return `[\n${value.map((item) => `${next}${toSource(item, next)},`).join("\n")}\n${indent}]`;
	}
	if (value && typeof value === "object") {
		const entries = Object.entries(value).filter(([, item]) => item !== undefined);
		return `{\n${entries
			.map(([key, item]) => {
				const name = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
				return `${next}${name}: ${toSource(item, next)},`;
			})
			.join("\n")}\n${indent}}`;
	}
	return JSON.stringify(value);
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

const heroesDir = path.join(root, "data/heroes");
const imported = [];

for (const entry of manifest.heroes) {
	const { slug } = entry;
	const sourceDir = path.join(exportDir, "heroes", slug);
	const hero = readJson(path.join(sourceDir, "hero.json"));
	const { abilities } = readJson(path.join(sourceDir, "abilities.json"));
	const override = overrides[slug] ?? {};

	const imageDir = path.join(root, "public/images/hero", slug);
	const publicPath = (file) => `/images/hero/${slug}/${file}`;

	// Portrait (used on the roster card).
	let portrait = override.portrait;
	if (!portrait) {
		copyFile(path.join(sourceDir, "portrait.png"), path.join(imageDir, "portrait.png"));
		portrait = publicPath("portrait.png");
	}

	// Full-body render, layered over the backdrop like Rampage's header
	// (switched off for now; see useFullBodyRenders).
	let artwork = override.artwork;
	const render = path.join(root, "reference/fullbody", `${slug}.png`);
	if (useFullBodyRenders && !artwork && fs.existsSync(render)) {
		saveCutout(render, path.join(imageDir, "full.webp"));
		artwork = publicPath("full.webp");
	}

	// Backdrop: the website's spotlight art, then game key art, the tutorial
	// splash, and finally the portrait.
	let background = override.background;
	if (!background) {
		const candidates = [
			path.join(imageDir, "spotlight.jpg"),
			keyArt[slug] && path.join(exportDir, keyArt[slug]),
			path.join(sourceDir, "splash.png"),
			path.join(sourceDir, "portrait.png"),
		].filter(Boolean);
		const source = candidates.find((file) => fs.existsSync(file));
		saveBackdrop(source, path.join(imageDir, "banner.jpg"), { blur: Boolean(artwork) });
		background = publicPath("banner.jpg");
	}

	const siteAbilities = slotOrder.map((slot) => {
		const ability = abilities.find((item) => item.slot === slot);
		if (!ability) throw new Error(`${slug}: no ${slot} ability in the export`);

		const media = override.abilityMedia?.(ability.name);
		let icon = media?.icon;
		if (!icon) {
			const from = path.join(sourceDir, `icons/${slot.toLowerCase()}.png`);
			copyFile(from, path.join(imageDir, `abilities/${slot.toLowerCase()}.png`));
			icon = publicPath(`abilities/${slot.toLowerCase()}.png`);
		}

		const isPassive = /passive/i.test(ability.type ?? "");

		return {
			key: slot,
			label: slot,
			type: isPassive ? "PASSIVE" : slotTypes[slot],
			name: ability.name,
			description: parseDescription(
				ability.descriptionResolved ?? ability.descriptionRaw ?? "",
				ability.tokens,
			),
			damage: rankText(ability.damage),
			cooldown: rankText(ability.cooldown, "s"),
			cost: rankText(ability.manaCost, " Mana"),
			icon,
			artwork: media?.artwork,
			video: media?.video ?? `/videos/heroes/${slug}/${slot.toLowerCase()}.webm`,
		};
	});

	const lane = lanes(hero);
	const position = [lane.primary, ...lane.secondary].map((role) => roleNames[role]).join(" / ");
	const stats = hero.stats;

	const data = {
		status: "complete",
		name: hero.name,
		slug,
		role: lane.primary,
		description: override.description ?? describe(hero, lane),
		heroClass: hero.heroClass ?? "—",
		position,
		difficulty: hero.difficulty ?? undefined,
		traits: hero.traits ?? [],
		artwork,
		portrait,
		background,
		stats: {
			basicAttack: hero.ratings.basicAttack,
			abilityAttack: hero.ratings.abilityAttack,
			durability: hero.ratings.durability,
			mobility: hero.ratings.mobility,

			baseHealth: statText(stats.baseHealth),
			healthRegen: statText(stats.healthRegen),
			mana: statText(stats.mana),
			manaRegen: statText(stats.manaRegen),
			abilityArmor: statText(stats.abilityArmor),
			basicArmor: statText(stats.basicArmor),
			basicAttackDamage: statText(stats.basicAttackDamage),
			attackPerSecond: stats.attackSpeed?.attackSpeedRating?.perLevel
				? `${num(stats.attackSpeed.base)} (+${num(stats.attackSpeed.attackSpeedRating.perLevel)}%)`
				: statText(stats.attackSpeed),
		},
		abilities: siteAbilities,
	};

	const name = camelCase(slug);
	const source = `// Generated by scripts/import-heroes.mjs from the Paragon v45 game files.
// Edit the script (or its overrides) and re-run it rather than editing this file.
import type { CompleteHero } from "./types";

export const ${name}: CompleteHero = ${toSource(data)};
`;

	fs.writeFileSync(path.join(heroesDir, `${slug}.ts`), source);
	imported.push({ slug, name });
}

imported.sort((a, b) => a.slug.localeCompare(b.slug));

fs.writeFileSync(
	path.join(heroesDir, "roster.ts"),
	`// Generated by scripts/import-heroes.mjs. Lists every imported hero.
import type { Hero } from "./types";
${imported.map(({ slug, name }) => `import { ${name} } from "./${slug}";`).join("\n")}

export const roster: Hero[] = [
${imported.map(({ name }) => `\t${name},`).join("\n")}
];
`,
);

console.log(`Imported ${imported.length} heroes.`);

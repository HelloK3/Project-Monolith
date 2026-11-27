# Monolith

An unofficial community reference site for **Paragon v45**: its heroes, abilities, stats, and gameplay. Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4.

> Monolith is a fan project and is not affiliated with or endorsed by Epic Games. Paragon and its related assets belong to their respective owners.

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

- `npm run build`: production build
- `npm run start`: serve the production build
- `npm run lint`: run ESLint

## Project layout

```
app/
  page.tsx               Landing page (game overview, gameplay, battlefield, objectives, roles)
  heroes/page.tsx        Hero roster
  heroes/[slug]/page.tsx Hero detail page (profile, stats, abilities)
components/              Page sections and shared UI
data/heroes/             Hero data: one generated file per hero, plus types.ts and roster.ts
data/roles.ts            The five team roles (shared by home page, filter, and heroes)
public/
  images/hero/<slug>/    Hero artwork, portraits, backgrounds, ability icons
  videos/heroes/<slug>/  Ability preview clips (.webm)
  icons/paragon/         In-game stat and status icons (SVG)
scripts/import-heroes.mjs  Generates data/heroes/ from a Paragon v45 data export
```

## Hero data

Every hero's stats, abilities, icons and art come from the Paragon v45 game files. They were exported to JSON and PNG with [CUE4Parse](https://github.com/FabianFG/CUE4Parse), then turned into typed TypeScript by the import script:

```bash
node scripts/import-heroes.mjs <path to monolith-export>
```

The script copies each hero's portrait and ability icons into `public/images/hero/<slug>/`, builds the header image `banner.jpg` (full-body renders in `reference/fullbody/` can be layered on top by switching on `useFullBodyRenders`), and writes `data/heroes/<slug>.ts`. It needs `ffmpeg` installed. Hand-picked art and Rampage's custom media are set in the script's overrides, so re-running it never loses them. The generated files shouldn't be edited by hand.

Ability clips are the game's own preview videos as WebM. The current 720p clips come from the old Paragon website; lighter versions can be made with ffmpeg:

```bash
ffmpeg -i <clip>.mp4 -an -vf scale=854:-2 -c:v libvpx-vp9 -crf 46 -b:v 0 public/videos/heroes/<slug>/<slot>.webm
```

Ability descriptions are arrays of `text`, `bold`, and `icon` parts. Icon names match the SVG file names in `public/icons/paragon/` (without `.svg`), and `color` picks the damage or status color.

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
data/heroes.ts           Hero data and types
data/roles.ts            The five team roles (shared by home page, filter, and heroes)
public/
  images/hero/<slug>/    Hero artwork, portraits, backgrounds, ability icons
  videos/heroes/<slug>/  Ability preview clips (.webm)
  icons/paragon/         In-game stat and status icons (SVG)
```

## Adding a hero

1. Put the hero's images in `public/images/hero/<slug>/` and ability clips in `public/videos/heroes/<slug>/`.
2. Add an entry to the `heroes` array in `data/heroes.ts`. TypeScript will flag any missing fields.
3. The hero then appears on `/heroes` and gets a page at `/heroes/<slug>`.

Ability descriptions are arrays of `text`, `bold`, and `icon` parts. Icon names match the SVG file names in `public/icons/paragon/` (without `.svg`), and `color` picks the damage or status color.

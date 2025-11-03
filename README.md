# Website1.1

A modern Next.js 16 app using the App Router, React 19, and Tailwind CSS v4 with a rich set of interactive UI components (Radix UI + shadcn-style patterns). This repo powers a marketing-style site with hero, features, pricing, testimonials, image carousel, and more.

## Features
- Next.js App Router (`app/` directory) with server-first routing
- React 19 with concurrent rendering and modern hooks
- Tailwind CSS v4 for utility-first styling
- Radix UI primitives and accessible components
- Dark mode support via `next-themes`
- Prebuilt UI building blocks under `components/ui/`
- Ready-to-deploy to Vercel or any Node host

## Tech Stack
- Framework: `next@16`
- UI: `react@19`, `radix-ui`, `tailwindcss@4`
- Utilities: `clsx`, `class-variance-authority`, `zod`, `react-hook-form`
- Charts and visuals: `recharts`, `embla-carousel-react`, `framer-motion`

## Requirements
- Node.js `>=18.18.0` (Node 20+ recommended)
- npm `>=9` (or `pnpm`/`yarn` if you prefer, adapt commands)

## Getting Started
1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`
3. Open the app:
   - Visit `http://localhost:3000`

## Available Scripts
- `npm run dev` — Start Next.js dev server
- `npm run build` — Create production build
- `npm start` — Run the production server
- `npm run lint` — Lint the codebase

## Project Structure
```
app/                # App Router pages/layouts
  globals.css       # Global styles (Tailwind layer imports)
  layout.tsx        # Root layout
  page.tsx          # Home page
components/         # Page sections and shared components
  ui/               # Reusable UI components built on Radix
hooks/              # Custom React hooks
lib/                # Utilities (e.g., helpers)
public/             # Static assets (images, etc.)
styles/globals.css  # Additional global CSS (legacy or supplemental)
next.config.mjs     # Next.js configuration
postcss.config.mjs  # PostCSS/Tailwind config
tsconfig.json       # TypeScript configuration
```

## Styling
- Tailwind v4 is configured with PostCSS.
- Global styles live under `app/globals.css` and/or `styles/globals.css`.
- Utility classes are used throughout components; Radix UI primitives provide accessible behavior.

## Components
- High-level sections: `hero`, `features`, `pricing`, `testimonials`, `footer`, `header`, `cta`.
- Interactive UI under `components/ui/` (accordion, dialog, dropdowns, tabs, toast, etc.).
- The image carousel uses `embla-carousel-react`.

## Dark Mode
- Controlled by `next-themes`. Look for `ThemeProvider` and `theme-toggle` components.

## Analytics (Optional)
- `@vercel/analytics` is present. If enabled in your pages, it will collect basic metrics in production.

## Deployment
- Vercel (recommended):
  - Push your repo to GitHub.
  - Import into Vercel; it auto-detects Next.js and builds.
- Self-host:
  - `npm run build`
  - `npm start` (starts a Node server)

## Troubleshooting
- Node version mismatch:
  - Ensure `node -v` satisfies `>=18.18.0`. Use `nvm` if needed.
- Tailwind styles not applying:
  - Confirm global imports and PostCSS config are present; restart dev server.
- Port in use:
  - Dev server fails if `3000` is busy; set `PORT=3001` when starting.
- VS Code Git warnings:
  - Benign messages like probing non-existent config keys can be ignored; ensure Git works via `git status`.

## Contributing
- Run `npm run dev` and work inside `components/` or `app/`.
- Keep changes minimal and consistent with existing patterns.
- Use `npm run lint` before submitting PRs.

## License
- No license specified. Add your preferred license if needed.
# Aeline

A responsive, editorial AI consulting concept website built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Lucide.

## Development

- `npm install`
- `npm run dev`
- `npx tsc --noEmit`
- `npm run build`

## Structure

- `src/App.tsx`: page composition and dialog state.
- `src/components/`: navigation, hero, content sections, and dialogs.
- `src/components/ui/`: reusable native dialog and sliced-cylinder image reel.
- `src/lib/site-content.ts`: editable service, project, testimonial, and FAQ content.
- `src/index.css`: design tokens, layout, typography, responsive styles, and motion.
- `public/images/`: locally served photography and generated sky background.
- `components.json`: shadcn-compatible aliases and Tailwind configuration.

The `@/` alias maps to `src/`. Reusable UI components belong in `src/components/ui/`, not a separate root-level components directory.

## Contact Flow

The contact form validates input and prepares a project brief in memory. Visitors can open their email app with the brief populated or download it as a text file. It does not pretend to submit data to a server. Configure the destination email in `src/components/dialogs.tsx` and `src/components/sections.tsx` before production use. To receive submissions without an email app, connect a form service or backend endpoint.

Project stories and testimonials are illustrative concept content, not verified client endorsements. Replace them with approved material before publishing.

## Verification

- `npx playwright install --with-deps chromium`
- `npx playwright test`

The browser suite covers desktop and mobile navigation, service and FAQ accordions, project dialogs, contact validation, brief downloads, testimonial navigation, focus restoration, responsive overflow, reel motion, reduced motion, and axe accessibility checks.

## Visual Assets

- Sky: generated for this concept.
- Curved architecture: Jan van der Wolf, Pexels photo 34054383.
- Glass architecture: Brett Sayles, Pexels photo 6036401.
- Studio: Thirdman, Pexels photo 7180493.
- Circuitry and workspace: Unsplash photos 1518770660439-4636190af475 and 1497366754035-f200968a6e72.
- Fonts: Inter Tight, DM Sans, and IBM Plex Mono via Google Fonts.
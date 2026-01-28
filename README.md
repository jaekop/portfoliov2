# Pencil Portfolio

Hand-drawn portfolio built with Next.js 15, TypeScript, Tailwind, shadcn/ui, and playful motion.

## Current version

ALPHA v0.2 (bump the value by +0.1 for every future change and keep `lib/version.ts`, the header badge, and this README in sync).

## Install

```bash
npm install next@15 react@18 react-dom@18 framer-motion gsap lenis next-auth resend posthog-js onnxruntime-web @content-collections/core @content-collections/next @content-collections/mdx zod @prisma/client @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next prettier prisma next-sitemap
```

## shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button card tabs dialog tooltip
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run format`
- `npm run typecheck`

## Environment

Copy `.env.example` to `.env` and fill in values.

Required keys include `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`, and `NEXT_PUBLIC_POSTHOG_KEY`.

## Memory observations

- `npm run dev` regularly peaks around 500 MB because Next 15’s Vite-powered dev server bundles the dev overlay (`next/dist/client/components/dev-overlay`) and its HMR watchers along with the entire app; that allocation is expected in development and not tied to any single module in this repo.
- `components/HeroLoader.tsx` only spins up a GSAP timeline for the loader animation and calls `tl.kill()` in the cleanup effect, so GSAP does not keep listeners open after the hero finishes drawing.
- `components/SignatureDraw.tsx` unsubscribes from the `progress` motion value and stops its animation controls when the drawing completes (or immediately for reduced motion), so Framer Motion also avoids leaking memory.

## Notes

- Tailwind globs live in `tailwind.config.ts`.
- Content Collections config lives in `content-collections.ts`.
- Prisma schema lives in `prisma/schema.prisma` with example migration in `prisma/migrations/0001_init`.
- Generate sitemap with `npx next-sitemap`.
# portfoliov2

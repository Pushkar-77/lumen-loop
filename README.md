# Lumen Loop — Flagship Digital Marketing Agency Platform

> **"Marketing that compounds, not just clicks."**  
> Headquarters: Pune, Maharashtra, India  
> Localization: INR (₹) / USD ($) with real-time toggle  
> Quality Target: Awwwards Site of the Day / Level 100 Portfolio Craft  

---

## Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS pipeline
- **Typography**: Plus Jakarta Sans (UI/Body), Instrument Serif (Editorial Accent), JetBrains Mono (Data/KPIs)
- **3D Graphics**: Three.js via `@react-three/fiber` and `@react-three/drei` (primitives only, DPR capped at 1.5, static vector fallback for mobile and low-power devices)
- **Smooth Scroll**: Lenis smooth momentum scrolling with reduced-motion support
- **State Management**: Zustand stores with persistent storage (cookie for currency, sessionStorage for campaign brief & preloader, localStorage for delight kill-switch)
- **Forms & Validation**: React Hook Form + Zod + in-memory rate limiting + Resend email handler with dev-mode simulation fallback
- **Testing**: Playwright e2e + Vitest pure calculation unit tests

---

## Directory Path & Turbopack Recommendation

> **Important**: It is highly recommended to clone or locate this repository in a file path **without spaces** (e.g. `C:\projects\lumen-loop` instead of `C:\Users\Name\Desktop\Path With Spaces\lumen-loop`).
> 
> When file paths contain spaces on Windows, Next.js Turbopack workers can experience IPC pipe breaks during PostCSS module evaluation. Moving to a space-free directory allows full native Turbopack support:
>
> ### Exact Steps to Move to a Space-Free Directory:
> 1. Stop any running dev/build processes (`Ctrl + C`).
> 2. Open PowerShell or Terminal and create a clean root directory:
>    ```powershell
>    mkdir C:\projects
>    ```
> 3. Copy or move this folder:
>    ```powershell
>    robocopy "c:\Users\Pushkar Patil\OneDrive\Desktop\Digisamaksh Digital Marketing design Design" "C:\projects\lumen-loop" /MIR /XD node_modules .next
>    ```
> 4. Navigate into the new space-free path:
>    ```powershell
>    cd C:\projects\lumen-loop
>    npm install
>    npm run dev
>    ```

---

## Application Routes & Implementation Status

- `/` — Flagship Homepage with 2-column Hero, 3D Funnel Diorama, Bento Services, SERP Rank Climber, and Testimonials with Lucide reactions.
- `/services` — 6 filterable growth disciplines with 3D-tilt & click-to-flip cards + interactive Custom Growth Stack Builder (drag-and-drop & keyboard accessible).
- `/pricing` — Retainers (Starter ₹24,999 / $299, Growth ₹59,999 / $699, Scale ₹1,49,999 / $1,799) with Monthly/Quarterly (-15%) toggle, comparison matrix, and FAQ.
- `/roi-lab` — Interactive deterministic ROI calculation engine, lead source distribution, and 3D Revenue Skyline stage.
- `/contact` — "Get your free growth plan" intake form with pre-filled brief chips, direct email/phone links, and Resend/demo fallback.
- `/work` & `/work/[slug]` — 6 filterable case studies with interactive Before/After metric toggles, currency synchronization, single-scale SVG comparison charts, and dynamic static breakdown pages.
- `/about` — Studio story, operating principles, methodology, sample team profiles, and Pune studio contact details.

---

On Windows environments with spaces in workspace directory paths, Next.js Turbopack worker process spawning can fail during PostCSS asset resolution. To guarantee 100% stable, cross-platform compilation without build worker crashes, both development and production scripts are configured to use the battle-tested Next.js Webpack bundler:

```json
"scripts": {
  "dev": "next dev --webpack",
  "build": "next build --webpack",
  "start": "next start",
  "lint": "eslint"
}
```

This guarantees identical styling and module resolution across both dev server and production builds.

---

## Environment Variables

Create a `.env.local` file (or configure these in Vercel Project Settings -> Environment Variables):

```env
# Required for live email delivery via Resend (if unset, server logs submissions in demo fallback mode)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Required recipient inbox where growth plan requests are sent
RESEND_TO_EMAIL=your-inbox@example.com

# Optional verified sender address (defaults to onboarding@resend.dev if unset)
RESEND_FROM_EMAIL=onboarding@resend.dev

# Optional Demo Mode toggle: enables expandable Dev payload (JSON) drawer on confirmation card
NEXT_PUBLIC_DEMO_MODE=false
```

### Variable Reference
- **`RESEND_API_KEY`**: Server-side API key from [Resend](https://resend.com). When unset, `/api/contact` logs leads to the server console and returns `delivered: false` so the UI clearly reports demo mode instead of claiming the email was sent.
- **`RESEND_TO_EMAIL`**: Destination inbox receiving `"New growth plan request: <name> (<company>)"` emails with `reply_to` set to the visitor's email.
- **`RESEND_FROM_EMAIL`**: Sender identity passed in Resend's `from` field. Defaults to `onboarding@resend.dev` if omitted (verify a custom domain in Resend before using your own domain).
- **`NEXT_PUBLIC_DEMO_MODE`**: Set to `true` to show the expandable **Dev payload (JSON)** drawer after form submission in production demos.

---

## Setup & Verification

```bash
# Install dependencies
npm install

# Run ESLint
npm run lint

# Run development server (runs on port 3000)
npm run dev

# Run production build
npm run build

# Start production server
npm run start
```

---

## Transparency & Content Honesty

All client logos, case studies, metrics, team profiles, and testimonials are **Sample Illustrative Data** designed to showcase world-class engineering, design hierarchy, and full-funnel marketing architecture. All sample elements are explicitly labeled with `Sample` tags in the interface.

---

## Deployment

1. Push to GitHub — Vercel auto-deploys on push to `main`.
2. Set environment variables in Vercel project settings:
   - `RESEND_API_KEY` — enables real email delivery via Resend. If unset, contact submissions are logged to the serverless function console (demo fallback; UI does not claim the request was sent).
   - `RESEND_TO_EMAIL` — recipient address for inbound growth plan leads
   - `RESEND_FROM_EMAIL` — sender address (defaults to `onboarding@resend.dev` if unset)
   - `NEXT_PUBLIC_DEMO_MODE=true` — shows an expandable **Dev payload (JSON)** drawer after a contact form submission. Recommended for client demos; disable in production.

> **Note on rate limiting**: The in-memory IP rate limiter (`5 req / 60s`) resets on every serverless cold start. For persistent cross-instance rate limiting, replace the in-memory `Map` in `src/app/api/contact/route.ts` with an external store such as [Upstash Redis](https://upstash.com/).

---

## Routes & Feature Status

| Route | Status | Notes |
|---|---|---|
| `/` | Production | Hero 3D scene, marquee, services bento, process timeline, testimonials |
| `/services` | Production | 6-service grid with Growth Stack Builder (drag-and-drop + keyboard) |
| `/pricing` | Production | 3-tier hand-set pricing, comparison matrix, FAQ with JSON-LD |
| `/roi-lab` | Production | Deterministic ROI engine, 3D Revenue Skyline (desktop), 2D fallback (mobile) |
| `/work` | Production | Filterable case study grid, Before/After metric toggle |
| `/work/[slug]` | Production | 6 static case study pages with SVG charts, generateStaticParams |
| `/about` | Production | Studio story, 4 principles, approach, sample team grid |
| `/contact` | Production | Zod-validated form, honeypot, rate limiting, Resend/dev fallback, confetti |
| `/api/contact` | Production | POST endpoint — see deployment notes above |
| `sitemap.xml` | Production | Auto-generated, includes all /work slugs |
| `robots.txt` | Production | Disallows /api/, references sitemap |

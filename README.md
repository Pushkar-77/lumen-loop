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
- `/contact` — Growth brief intake form with pre-filled state and studio contact details (all addresses marked placeholder).
- `/work` — *(Temporary Preview Placeholder)* Sample case breakdowns for early review.
- `/about` — *(Temporary Preview Placeholder)* Studio roots and operating principles for early review.

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

Create a `.env.local` file with the following keys:

```env
# Resend API Key for contact form (optional in development - will use simulation fallback)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@example.com
RESEND_TO_EMAIL=growth@example.com

# Demo Mode toggle: enables expandable JSON payload drawer upon form completion
NEXT_PUBLIC_DEMO_MODE=false
```

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

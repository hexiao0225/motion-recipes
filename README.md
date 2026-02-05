# Motion Recipes

A gallery of **10 subtle, accessible UI microinteractions** built with CSS-first animations. Zero animation libraries — just Next.js, TypeScript, and Tailwind CSS.

## Goal

Create production-ready motion patterns that demonstrate:
- Modern motion design principles
- Accessibility-first implementation
- 60fps performance without layout thrashing

## The 10 Recipes

| # | Recipe | Key Technique |
|---|--------|---------------|
| 1 | **Button Press & Hover** | `scale()` + `translateY()` + shadow transitions |
| 2 | **Focus Ring & Transition** | `:focus-visible` with `ring-offset` |
| 3 | **Toast Enter/Exit** | CSS keyframes with `forwards` fill-mode |
| 4 | **Skeleton Shimmer** | Pseudo-element with `translateX()` animation |
| 5 | **Accordion Expand/Collapse** | `grid-template-rows: 0fr → 1fr` (no JS measurement) |
| 6 | **Drawer / Slide-over** | `translateX()` + focus trap + ESC close |
| 7 | **Tooltip** | `opacity` + `scale()` with delay |
| 8 | **Tabs Indicator** | Dynamic `left`/`width` from `offsetLeft` |
| 9 | **List Reorder** | State-driven order swap with transitions |
| 10 | **Success Check** | SVG `stroke-dashoffset` draw animation |

## What I Learned

### Motion Principles
- **150ms** is the sweet spot for micro-interactions (button press, hover)
- **200-300ms** works better for larger movements (drawer slide, accordion)
- `transform` and `opacity` are the only "free" properties to animate
- Always provide a static fallback for `prefers-reduced-motion`

### Accessibility
- `:focus-visible` > `:focus` — hides ring on mouse click, shows on keyboard
- `aria-live="polite"` for toasts; screen readers announce without interrupting
- Focus traps need: move focus in, trap tabs, ESC closes, return focus on close
- `aria-describedby` links tooltip content to trigger for screen readers

### Performance
- Avoid animating `width`, `height`, `top`, `left` — they trigger layout
- CSS Grid `0fr → 1fr` trick for height animation beats JS measurement
- `will-change` sparingly — only on long-running animations like shimmer
- Keep JS out of animation loops; let CSS handle interpolation

## Key Takeaways

1. **CSS-first pays off**: Modern CSS can handle 90% of UI animations without JS libraries
2. **The Grid height trick is magic**: `grid-template-rows: 0fr/1fr` animates height smoothly without measuring DOM
3. **Reduced motion is non-negotiable**: Always respect `prefers-reduced-motion` — instant state changes, no slides
4. **Focus management matters**: Drawers/modals need focus traps; returning focus on close prevents disorientation
5. **Delay prevents jank**: 150ms delay on tooltips prevents accidental triggers during mouse movement

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your repo at [vercel.com/new](https://vercel.com/new)

## Project Structure

```
motion-recipes/
├── app/
│   ├── layout.tsx        # Root layout + MotionProvider
│   ├── page.tsx          # Gallery grid
│   └── globals.css       # Tailwind + keyframes
├── components/
│   ├── Header.tsx        # Title + reduced motion toggle
│   ├── RecipeCard.tsx    # Card wrapper with code toggle
│   ├── CodeBlock.tsx     # Code display with copy
│   └── recipes/          # Individual recipe components
├── context/
│   └── MotionContext.tsx # Reduced motion state
├── lib/
│   ├── recipes.ts        # Recipe metadata + code snippets
│   └── useReducedMotion.ts
└── notes.md              # Field notes & rules of thumb
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (no custom CSS except keyframes)
- **Zero animation libraries**

## License

MIT — use these patterns freely in your projects.

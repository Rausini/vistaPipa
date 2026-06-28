# Site Teardown: Wolverine Worldwide — Header / Menu

**URL:** https://wolverineworldwide.com/
**Platform:** Custom Vite build (ES modules in `/dist/`), web components (`c-header`, `c-mobile-menu`, `c-accordion`)
**Date analyzed:** 2026-06-27
**Scope:** Header, logo transformation, nav positioning, dropdown, mobile menu

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| GSAP **Flip** plugin | `ze.getState([logo,nav,navBg,...dropdowns])` + `ze.from(n,{simple:true,duration:0.4,ease:"power2.out"})` | Smoothly animates the logo/nav **layout reflow** when `has-scrolled` toggles (FLIP technique) |
| Native CSS transitions | `--header-transition-duration` / `--header-transition-ease` on opacity, clip-path, max-width, transform | Does the actual fades/clips; GSAP only smooths position/size jumps |
| `focus-trap` lib | `ti([t, n.parentElement], {clickOutsideDeactivates:true,...})` | Traps focus inside open dropdowns / mobile menu |
| Web components | `<c-header>`, `<c-mobile-menu>`, `<c-accordion>` | Encapsulated behavior |
| State on `<html>` | `has-scrolled`, `has-dropdown-opened`, `has-mobile-menu-open`, `has-passed-fold`, `is-scrolling-down` | All header states are driven by classes on the root element |

## How the Logo Transformation Works (the key effect)

Three logo variants live inside `.c-header_logo` (left-aligned, `justify-self:start`):
- `.-large-desktop` → full **logotype** (icon + wordmark). `position:absolute`, fades on scroll.
- `.-large-mobile` → logotype-only variant for mobile. Animates via `clip-path: inset(0)` → `inset(0 100% 0 0)` (wipes left).
- `.-small` (`#menu-logo`) → **icon only**. In normal flow (defines the box); `visibility:hidden` until scrolled.

**At top (`html:not(.has-scrolled)`):**
- `.-large-desktop` visible (absolute, overlapping the hidden small icon on the left).
- `.-small` icon `visibility:hidden`.
- Header inner is full-width, transparent, logo text is white over the hero.

**On scroll (`html.has-scrolled`):**
- `.-large-desktop` → `opacity:0; visibility:hidden` (transition `--transition-duration --ease`).
- `.-small` icon becomes visible.
- `.c-header_head` flips `justify-content: space-between → center`, `width:100% → auto`.
- `.c-header_inner` shrinks to `max-width: 8/12 grid`, `gap` shrinks, `transform: translateY(spacing) → 0`.
- `.c-header_bg` (the dark pill) fades `opacity:0 → 1` (`backdrop-filter:blur(10px); background:#000c; border-radius:--radius-lg`).
- **GSAP Flip** captures the before-state of `[logo, nav, navBg, dropdowns]`, then `Flip.from(state,{duration:0.4,ease:"power2.out"})` so the size/position change is a smooth morph instead of a snap.

So: **logotype on the left → fades while the header condenses into a centered dark pill showing just the icon.** The "morph" is FLIP smoothing a CSS state change; the fade itself is plain CSS opacity/visibility.

**Hide-on-scroll-down (desktop ≥1000px):**
```css
html.has-passed-fold.is-scrolling-down:not(.has-dropdown-opened):not(.brands-in-view)
  .c-header:not(:has(:focus-visible)) { transform: translateY(-100%); }
```
Header slides up when scrolling down, returns when scrolling up.

## Dropdown (desktop)

- Toggler `[data-header-dropdown-toggler]` → `toggleDropdown()` adds `is-open` to panel, `aria-expanded=true`, and `has-dropdown-opened` on `<html>`.
- Panel `.c-header_dropdown`: `grid-template-columns:repeat(4,1fr)`, animates `clip-path` with `@starting-style { inset(0 20% 100% 20% round) }` → `inset(0 round)` (opens downward from a slit). `transition-behavior: allow-discrete` so it works with `visibility`.
- Chevron flips: `[aria-expanded=true] .c-header_nav-dropdown-toggler-icon { transform: scaleY(-1); }`
- `.c-header:before` dim backdrop (`#0003`, blur 2px) fades in behind when a dropdown is open.

## Mobile Menu

- `.c-header_toggle-mobile` ("Menu +") → focus-trap activate adds `has-mobile-menu-open` (html) + `is-open` (component).
- `.c-mobile-menu_outer` slides/clips in (opacity + clip-path). On close, all `<c-accordion>` `.shrink()`.
- Mobile logo background pill clips to just the icon width on scroll:
  `clip-path: inset(0 calc(100% - var(--icon-width-logo) - ...) 0 0 round radius-lg)`

## Design Tokens (header-relevant, from CSS vars)

| Token | Role |
|---|---|
| `--header-transition-duration` / `--header-transition-ease` | Master header timing |
| `--transition-duration` / `--transition-duration-fast` / `--ease` | Logo + link timings |
| `--z-index-header`, `--z-index-below`, `--z-index-above` | Stacking |
| `--radius-lg`, `--radius-md` | Pill + dropdown rounding |
| Pill bg | `#000c` (black 80%) + `backdrop-filter: blur(10px)` |
| Backdrop dim | `#0003` + `blur(2px)` |
| Nav link hover | `::before` pill `color-mix(currentColor 10%, transparent)`, `radius-md` |
| Breakpoint | `1000px` (desktop), `700px` (gutter) |

## Cloneability

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Logo logotype→icon morph | CSS opacity/clip + width transition; GSAP Flip optional for smooth reflow | Med | Yes (CSS-only is fine for React) |
| Dark pill appears on scroll | `has-scrolled` toggles `opacity` on a blurred bg el | Low | Yes |
| Header hide on scroll-down | `is-scrolling-down` → `translateY(-100%)` | Low | Yes |
| Dropdown clip-path reveal | `@starting-style` + `clip-path` + `allow-discrete` | Med | Yes (or JS height) |
| Nav-link hover pill | `::before` opacity | Low | Yes |

## Adapting to Vista Pipa (Next.js + Tailwind)

- No GSAP in project → replicate the morph with **CSS transitions** (opacity + clip-path on logo layers, `width`/`max-width` on the logo box and inner container). Visually equivalent for this header; FLIP only smooths a reflow we can drive directly.
- Drive states with React (`scrolled`, `scrollingDown`, `menuOpen`) + class toggles, mirroring Wolverine's `has-scrolled` / `is-scrolling-down` / `has-mobile-menu-open`.
- Logo at top: full horizontal lockup `pipa-lockup-horizontal-white.svg` on the **left**. On scroll it fades/clips out and `pipa-icon-white.svg` (kite icon) fades in, header condensing into a centered dark blurred pill.
- Tokens map: pill `bg-black/80 backdrop-blur`, `rounded-[--radius-lg]`, timing ~0.4s `power2.out` ≈ `cubic-bezier(0.16,1,0.3,1)` already used in `tailwind.config.ts`.

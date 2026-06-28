# Site Teardown: Voldog Food — Hero Frame Exit + Convex/Concave Wave Background

**URL:** https://www.voldogfood.com/
**Built by:** chpstudio.gr (Divi Child Theme)
**Platform:** WordPress + Divi 4.27 + custom child theme JS (GSAP/ScrollTrigger/Lenis)
**Date analyzed:** 2026-06-28
**Scope:** Only the two effects requested — (1) the video-background **frame exit** animation, and (2) the **convex→concave background-color wave** transition between sections.

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| GSAP + ScrollTrigger | `gsap.min.js`, `ScrollTrigger.min.js` script tags; `gsapInstance.to(...)` configs | Pin hero, scrub bg-color/border-color, scrub wave height |
| Lenis smooth scroll | `lenis.min.js`; `new Lenis({lerp:0.06...})` | Smooth scroll feeding `ScrollTrigger.update` (desktop ≥981px only) |
| Canvas 2D | `<canvas class="wave-canvas" data-color>` + `getContext("2d")` | Draws the convex/concave bezier wave fill |
| IntersectionObserver | `revealObserver`, `fadeObserver`, `splitTitleObserver` | Toggles `.active` / `.fade-in-active` reveal classes |

---

## The Two Effects — How They Actually Work

### EFFECT 1 — Video-frame "exit" (the quadro saindo)

The hero is a **rounded frame with a fat white border** wrapping a fullscreen video. It doesn't slide away — it **dissolves into the page** while the next section climbs over it. Three things happen simultaneously, all driven by the **same pinned scroll window**.

**The frame markup & base CSS (confirmed):**
```css
/* The white "frame" — 88px radius, 35px solid white border, clips the video */
.et_pb_fullwidth_header_0,
.et_pb_fullwidth_header_1{
  border-radius: 88px 88px 88px 88px;
  overflow: hidden;
  border-width: 35px;
  border-color: #FFFFFF;
}
.et_pb_fullwidth_header_1{
  transform-origin: 50% 50%;
  opacity: 0;                 /* revealed by JS on load */
  transition: background-image 0.4s ease-in-out, border-radius 0.3s ease;
}

#hero-video-block{            /* the <video>, sits behind the frame */
  position: absolute; bottom: 29px; z-index: 3; width: 100%; text-align:center;
}
/* decorative SVG overlays pinned on top of the video */
#hands-svg{ position:absolute; bottom:25px; z-index:3; width:90%; left:50%; transform:translateX(-50%); }
#hands-svg path{ fill:#fff; }
#lines-svg{ position:absolute; z-index:99999999; top:49%; width:200px; left:25%; }
```

**The scroll animation (confirmed from `logo-scroll-reveal.js`):**
```javascript
// 1) PIN the hero in place for 400px of scroll (it does not move)
gsapInstance.to(heroSection, {
  scrollTrigger: { trigger: heroSection, start: "top top", end: "+=400",
                   pin: true, pinSpacing: false }
});

// 2) Tween the PAGE background from white -> target color, scrubbed to scroll
gsapInstance.to(body, {
  backgroundColor: "#eeeff5",          // <-- VoldogFood's target color
  scrollTrigger: { trigger: heroSection, start:"top top", end:"+=400", scrub:true }
});

// 3) Tween the FRAME's white border to the SAME color, scrubbed.
//    => the 35px white border melts into the new page bg = "frame exits"
gsapInstance.to(headerSections, {
  borderColor: "#eeeff5",
  scrollTrigger: { trigger: heroSection, start:"top top", end:"+=400", scrub:true }
});

// 4) Header logo shrinks + drops as you scroll (over 700px)
gsapInstance.to(headerLogo, {
  y: 50, scale: 0.5, transformOrigin: "top center", ease: "none",
  scrollTrigger: { trigger: heroSection, start:"top top", end:"+=700" }
});

// 5) Next section climbs UP over the pinned hero (scrub:5 = laggy/smooth)
gsapInstance.fromTo(nextSection, { /* starts smaller/transparent */ }, {
  paddingTop: 380, scale: 1, opacity: 1,
  scrollTrigger: { trigger: heroSection, start:"top top", end:"+=700", scrub:5 }
});
```

**The key insight:** the "exit" is an illusion built from `pinSpacing:false` (the next section scrolls up while the hero stays put) **plus** the frame's white border tweening to match the new page background. There is **no** scale/clip-path on the frame itself during exit — the dissolve is pure color matching. This is exactly the hook you want: **set the page bg target to your brand color, and the frame border tweens to that same brand color.**

---

### EFFECT 2 — Convex → Concave background wave

Between sections sits a 400px-tall transparent strip containing a `<canvas>`. As you scroll past it, a bezier-curved shape **fills upward** in the canvas's `data-color`, painting the next section's color over the previous one with an organic curved edge. Two variants:

- `.wave-canvas` → **convex** (bulge growing down from the top edge)
- `.wave-inverse-canvas` → **concave** (dip growing up from the bottom edge)

**Markup:**
```html
<div class="wave-wrapper"><canvas class="wave-canvas" data-color="#f4f1eb"></canvas></div>
<!-- or -->
<div class="wave-wrapper"><canvas class="wave-inverse-canvas" data-color="#f4f1eb"></canvas></div>
```
```css
.wave-wrapper{ height:400px; position:relative; background:#fff0; }  /* transparent */
```

**Full drawing + scroll code (confirmed from `reveal-wave-split.js`):**
```javascript
function initWaveCanvas(canvas, inverse = false) {
  const context = canvas.getContext("2d");
  let width = 0, height = 0;
  const progressState = { y: 1 };                       // 0 = flat edge, ~0.7 = full curve
  const color = canvas.dataset.color || "#eeeff4";
  const curve = parseFloat(canvas.dataset.curve) || 0.7; // bulge depth multiplier
  let isVisible = false, rafId = null;

  function resizeCanvas() {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    if (w === width && h === height) return;
    width = w; height = h; canvas.width = w; canvas.height = h;
  }

  function drawFrame() {
    if (!isVisible) { rafId = null; return; }
    context.clearRect(0, 0, width, height);
    context.beginPath();

    if (inverse) {                                       // CONCAVE (fills from bottom)
      context.moveTo(0, height);
      context.lineTo(0, height - progressState.y * height);
      context.bezierCurveTo(
        0.25 * width, height - (1 - progressState.y) * height * curve,
        0.75 * width, height - (1 - progressState.y) * height * curve,
        width,        height - progressState.y * height
      );
      context.lineTo(width, height);
    } else {                                             // CONVEX (fills from top)
      context.moveTo(0, 0);
      context.lineTo(0, progressState.y * height);
      context.bezierCurveTo(
        0.25 * width, (1 - progressState.y) * height * curve,
        0.75 * width, (1 - progressState.y) * height * curve,
        width,        progressState.y * height
      );
      context.lineTo(width, 0);
    }
    context.closePath();
    context.fillStyle = color;
    context.fill();
    rafId = requestAnimationFrame(drawFrame);
  }

  new ResizeObserver(resizeCanvas).observe(canvas);
  resizeCanvas();

  // Only animate while on-screen (perf)
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { if (!isVisible){ isVisible = true; if(!rafId) rafId = requestAnimationFrame(drawFrame);} }
      else isVisible = false;
    });
  }, { threshold: 0.05 }).observe(canvas);

  // Scroll drives the curve depth; quickTo smooths it
  const quickToY = gsap.quickTo(progressState, "y", { duration: 0.3, ease: "power2.out" });
  ScrollTrigger.create({
    trigger: canvas, start: "-10% 100%", end: "-30% 0%", scrub: true,
    onUpdate: (t) => { quickToY( gsap.utils.mapRange(0, 1, 0, 0.7, t.progress) ); }
  });
}
document.querySelectorAll(".wave-canvas").forEach(c => initWaveCanvas(c, false));
document.querySelectorAll(".wave-inverse-canvas").forEach(c => initWaveCanvas(c, true));
```

**The key insight:** the wave is just a **single cubic bezier** between two corners. `progressState.y` (0→0.7, mapped from scroll progress and eased with `gsap.quickTo`) controls how far the straight edge drops and how deep the bulge goes. Control points at `0.25w` and `0.75w` give the symmetric "puddle" shape. The fill color (`data-color`) is the **section you're scrolling INTO**, painted over the section you're leaving.

---

## How the two combine into YOUR requested behavior

You want, on the vistaPipa creme identity (`#faecdd`):

1. **Section 1 (the video frame)** → its page background tweens to the **brand color** as the frame exits (instead of Voldog's `#eeeff5`). So both tweens in Effect 1 (`body` bg and the frame `border-color`) target your brand color → the white frame border dissolves into a brand-colored page.
2. **Section 2 (the wave)** → the wave canvas `data-color` is **white** (`#ffffff`), so as you scroll the convex/concave white shape fills over the brand-colored background → the page "returns to white" with the organic curved edge.

Concretely you change exactly two color constants:
- `body` + `border-color` scrub target → `#faecdd` (or whatever the section-1 brand color is)
- wave `data-color` → `#ffffff`

Everything else (pin window, scrub timing, bezier math) stays identical.

---

## Design Tokens (for this effect set)

| Token | Voldog value | Your value |
|---|---|---|
| Section-1 exit bg (brand) | `#eeeff5` | `#faecdd` (creme) |
| Frame border (start → end) | `#ffffff` → `#eeeff5` | `#ffffff` → `#faecdd` |
| Wave fill (`data-color`) | `#f4f1eb` / `#ffffff` | `#ffffff` |
| Frame radius / border | `88px` / `35px` solid | keep or tune |
| Pin window | `400px` (color), `700px` (logo + next-section) | keep |
| Wave height (`.wave-wrapper`) | `400px` | keep |
| Wave curve depth (`curve`) | `0.7` | keep; lower = flatter |
| Lenis | `lerp:0.06`, desktop ≥981px only | keep |

---

## Build Plan (for the vistaPipa Next.js / React project)

Your repo is React/TS (`components/layout/Header.tsx`). Recommended approach:

### NPM Packages
```bash
npm install gsap lenis
```
(`gsap` includes ScrollTrigger; `lenis` is the maintained successor to `@studio-freight/lenis`.)

### Component structure
1. **`<SmoothScroll>`** provider — init Lenis (`lerp:0.06`), wire `lenis.on('scroll', ScrollTrigger.update)` + RAF ticker. Gate on `matchMedia('(min-width:981px)')`; on touch fall back to native scroll. Register `gsap.registerPlugin(ScrollTrigger)` once.

2. **`<HeroFrame>`** — fixed-ratio rounded box (`border-radius`, `border:35px solid #fff`, `overflow:hidden`) wrapping an autoplay/muted/loop/playsinline `<video>` (+ optional SVG overlays absolutely positioned, `z-index:3`). In a `useLayoutEffect` with a `gsap.context`:
   - `ScrollTrigger` pin: `start:"top top", end:"+=400", pin:true, pinSpacing:false`.
   - scrub tween `document.body` (or a wrapper) `backgroundColor` white → `#faecdd`.
   - scrub tween the frame `borderColor` white → `#faecdd` (same trigger window).
   - optional: scale/translate the next section `fromTo(... {scale, opacity}, {scale:1, opacity:1, paddingTop:380}, {scrub:5})`.

3. **`<WaveDivider variant="convex|concave" color="#ffffff" />`** — a 400px-tall `position:relative` wrapper with a `<canvas>`. Port `initWaveCanvas` verbatim into a `useEffect` (it's framework-agnostic). Pass `variant` → `inverse` boolean and `color` → fill. Place a **convex** divider at the bottom of section 1 and/or a **concave** one entering section 2 so the white shape paints over the creme.

### Section-by-section order on the page
- **Section 1** — `<HeroFrame>` (brand-creme exit). Background of this section/page region = creme during scrub.
- **Wave divider** — `<WaveDivider variant="convex" color="#fff">` (white fills down over creme).
- **Section 2** — white background; content reveals via IntersectionObserver `.fade-in` / `.reveal` classes (CSS transitions already trivial: `opacity 0→1`, `translateY(40px→0)`).
- (Mirror with `variant="concave"` wherever you transition white → creme again.)

---

## Notes / Gotchas

- **Lenis + ScrollTrigger pin**: you MUST feed Lenis scroll into `ScrollTrigger.update`, otherwise pinned + scrubbed tweens jitter. Use `lenis.raf(time)` inside a single RAF loop (don't double-RAF).
- **`pinSpacing:false`** is what makes the next section overlap the pinned hero (the "climb over" look). With `true` you'd get a blank gap instead.
- **Mobile**: Voldog disables Lenis below 981px and shifts the hero with `margin-top` tweaks; on touch, skip the pin/scrub or shorten the window — pinning fullscreen video on mobile is janky.
- **Canvas crispness**: multiply `canvas.width/height` by `devicePixelRatio` and scale the context if it looks soft on retina (Voldog doesn't, but you can improve it).
- **`will-change`** is already set on `.reveal`/`.section-fade-in`; keep it to avoid repaint flicker.
- Reduced motion: gate the whole thing behind `prefers-reduced-motion: no-preference`.

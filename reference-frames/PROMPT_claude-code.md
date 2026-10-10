# Prompt for Claude Code — "Product Illustration Intensive" landing page

> Paste everything below into Claude Code. Put the `reference-frames/` folder in the project root first so it can open the images.

---

Build a single landing page that recreates the look and motion of the reference frames in `./reference-frames/`. **Before writing any code, open and study every image in `reference-frames/keyframes/` and `reference-frames/hero-intro-sequence/`** (the intro sequence is 8 fps, in order: it shows exactly how the hero animates in). Match them as closely as possible. When this brief and the images disagree, the images win.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- GSAP + ScrollTrigger for all animation (register the plugin client-side only)
- Lenis for smooth scrolling, synced with ScrollTrigger
- All illustrations are **built in code** (divs + inline SVG), not images. Icons: `lucide-react`.
- Font: "Inter Tight" or "Geist" (Google Fonts / next/font). Headlines are semibold with tight tracking (`tracking-[-0.04em]`, `leading-[0.95]`).

## Overall frame
- The page sits inside a **rounded "device" container**: outer page background `#0D174A` (deep navy), inner site container with `rounded-[40px]`, a 1px `white/5` border and a soft 20px outer ring of slightly lighter navy (`#111C52`). Inner content max width ~1440px.
- Section rhythm: **dark hero → light grey section → light-to-blue gradient section → dark navy section**. Every section shares the same faint **grid overlay** (1px lines, `white/6%` on blue and `#0B1238/5%` on light, roughly 120px cells, fading out at the edges with a radial mask).

## Color tokens (sampled from the frames)
```
--navy-950: #090B1A   (bottom of last section)
--navy-900: #0C1442   (hero top, dark sections)
--navy-800: #0B1B68
--blue-700: #132BA9
--blue-600: #2644E4
--blue-500: #4366FE   (electric core of the gradient)
--blue-300: #7293FE
--blue-200: #A2BDFF
--blue-100: #C7DEFF
--ice-50:   #E4F0FF
--cyan-accent: #15A0F0 → #A8D5FE (glows, rings, progress bars)
--grey-bg:  #E9ECF1   (light section background)
--card:     #FFFFFF   (cards, chips)
--text-dark:#0B0F1F
```

## 1. Hero (the most important part — spend most effort here)
Reference: `keyframes/06_hero-chips-final.jpg`, `keyframes/00_hero-chips-closeup.jpg`, the whole `hero-intro-sequence/`.

**Background gradient**: vertical, `#0C1442` (0%) → `#0B1B68` (25%) → `#2644E4` (50%) → `#4366FE` (60%) → `#A2BDFF` (78%) → `#E4F0FF` (100%). Add two large blurred radial blobs (blur 120px): an electric blue `#3B5BFF` one center-left and a pale lavender `#C9D4FF` one bottom-left, so the transition from blue to white is soft and curved rather than a straight band (look at how the light area bulges up from the bottom-left corner). Very subtle noise/grain overlay at 3% opacity.

**Top nav (inside the container)**: left a small square logo button (dark glass, 40px, rounded-10); center a segmented pill switch on dark glass: active "☰ All product" (white bg, dark text) + inactive "Free resourses"; right a 40px white square button with a user icon. All 12px text.

**Content, centered**:
- Badge pill: "● Intensive Course" — dark navy glass (`white/5` bg, `white/15` border), rounded-full, 16px text.
- H1, 3 lines, ~80px desktop, white: "Learn to create / stunning product illustrations / right inside Figma".
- Paragraph, ~20px, `white/80`, max-w ~520px: "A practical intensive for designers who want to level up their visual skills and create complex illustrations without leaving their favorite tool."

**The illustration (central element + connected chips)** — build as one absolutely-positioned composition ~1000×420px below the text:
- **Central card** (~340×210): white, rounded-16, 6px inner padding with a faint lavender inner panel, soft shadow `0 30px 60px -20px rgba(20,40,180,.35)`. Its top edge has a thin **iridescent border** (gradient cyan → blue → pink `#F3A6D8` on the right corner). Inside: faint concentric arc lines in the background, a label row "Figma skills … 100%", a progress bar (gradient `#3B4BE0 → #6FB7F5 → #F1A3C5`, 70% filled, on a light track), and a row of 5 small rounded icon buttons (frame, pen, bezier, layers, copy icons) with 1px light borders.
- **Figma tile**: a glassy square (~120px) overlapping the top of the card, half above it, filled with a blue→cyan gradient and a large outlined Figma logo in white/50, with a soft blur/frosted look.
- **Ghost card below**: a second translucent card under the main one (white/25, blurred), with an icon square and two placeholder bars — reads as a stacked list item.
- **Connector lines**: thin 1px lines (`white/60`, on the light area `#FFFFFF/80`) running horizontally/vertically with **rounded 90° elbows (radius ~16px)** — like PCB traces or a node graph — linking the central card to every chip. Draw them as SVG `<path>`s so they can be animated with `stroke-dasharray`.
- **Chips sitting on the lines** (positions relative to the central card, see closeup):
  - top center: round 44px white chip with blue 4-point sparkle, with a pulsing outer ring;
  - top-left: a small dark-glass "gradient picker" bar with 3 stops (blue, cyan, pink) and a gradient track;
  - left: round chip with a **conic gradient ring** (cyan → blue → white) and a sparkle icon inside;
  - far left: a 70px rounded square white chip inside a larger frosted glass square (double layer);
  - bottom-left: white rounded-10 chip with "Aa" in a blue gradient and a tiny blue notification dot at its top-right corner;
  - right: white rounded square with a shield/badge outline icon;
  - right-lower: round chip with conic gradient ring + layers icon;
  - far right (appears later / on scroll): white square with a blue pen/brush icon; far left: white square with blue shield icon.
  - a black mouse **cursor** arrow with a tiny blurred label near the bottom-right — it drifts slowly as if a user is interacting.
- All chips: subtle shadow, 1px `white/70` border, slight inner highlight. On the blue part they look like they float on glass.

**Hero intro animation (GSAP timeline on load — match `hero-intro-sequence/` frame by frame)**:
1. 0.0s – background gradient already there; the central card fades in from opacity 0 → 1 with a slight scale 0.96 → 1 and blur 8px → 0 (0.6s, `power3.out`).
2. 0.3s – the Figma tile drops onto the card (y −20 → 0, opacity, blur), then the card's content (label, progress bar, icons) fades in; the progress bar fills from 0 to 70%.
3. 0.6s – headline reveals **line by line**: each line fades from opacity 0 + blur(10px) + y 20 → sharp, stagger 0.12s. Then the paragraph, same treatment, lighter.
4. 1.2s – connector lines **draw themselves** outward from the card (stroke-dashoffset → 0, 0.8s, `power2.inOut`, staggered).
5. 1.5s – chips **pop in** at the end of each line: scale 0.6 → 1, opacity, blur → 0, `back.out(1.7)`, stagger 0.08s, roughly from nearest to farthest.
6. After intro: idle loop — chips float ±4px on y with different durations (3–5s, `sine.inOut`, yoyo), the ringed chips rotate their conic gradient slowly, the top sparkle chip has a pulsing glow ring, a small light dot occasionally travels along a connector line (animate a circle along the path with MotionPathPlugin), cursor drifts.

**Hero scroll behavior** (see `07_scroll-hero-parallax.jpg`, `08_scroll-section-transition.jpg`): with ScrollTrigger scrub, the headline moves up faster than the illustration (parallax), extra chips (pen, shield) slide in from the sides as you scroll, and the blue gradient's bottom edge transitions softly into the light grey of the next section (no hard edge).

## 2. "What you will do during the intensive" (light section)
Reference: `09_section-what-you-will-do.jpg`.
- Background `#E9ECF1`. Small grey eyebrow pill "Your skills" above the title. Title centered, 2 lines, dark, ~48px.
- Row of **4 cards** (white, rounded-20, soft shadow, ~ 260×300). Each has an illustration area on top and a 2-line caption at the bottom (13px, grey-700):
  1. "Work with vector graphics, modular grids, and shapes" — a mini UI panel with a vertical blue gradient beam crossing it.
  2. "Build balanced compositions and master color theory" — a glowing blue/cyan sphere with a Figma mark, small sparkles around.
  3. "Create scalable and visually consistent UI illustrations" — stacked overlapping UI windows with a blue pointer.
  4. "Apply new techniques directly to your real-world projects" — a small device frame with a blue square and a cursor.
- Animation: title fades + de-blurs in, then the cards reveal **one by one left to right** (opacity 0 → 1, y 40 → 0, blur 10 → 0, stagger 0.15s), triggered at 70% viewport.

## 3. "Artificial intelligence won't do this for you"
Reference: `10_…`, `11_section-ai-cards.jpg`, `12_section-ai-diagram.jpg`.
- Background starts light grey at the top and blooms into the **electric blue gradient** toward the bottom, then into navy (`#E9ECF1 → #A2BDFF → #2644E4 → #0C1442`), with a large radial blue glow behind the bottom diagram.
- Eyebrow pill, title (2 lines), subtitle: "They don't understand context, cannot build solid guidelines, and lack human empathy."
- **3 cards** (white, rounded-24, ~ 300×300):
  1. "Understand logical structure and brand visual hierarchy" — a "Tokens +25%" pill with a ringed icon, connected with elbow lines to a folder-icon card and a small "#primary" color swatch with a cursor.
  2. "Adhere strictly to design systems and UI guidelines" — a curved line with a lightning dot rising to a blue dot + cursor, above a row: green check · "✦ Ask AI" pill with conic ring · blue sparkle.
  3. "Adapt complex metaphors to the specific user context" — a browser window with a folder icon on the left and a JSON code panel on the right.
- Below, on the blue: a **node diagram** — a vertical line drops from above into a frosted rounded square with a white Figma tile, branching with elbow lines to two smaller outlined squares (layers icon, frame icon). Lines draw on scroll, then nodes pop in (same language as the hero chips).
- Small centered text under it in `white/40`: "That is why skilled product illustrators will always be highly valued in the market, while neural networks remain just a supplementary tool."
- Animation: cards slide up with stagger; the whole section's gradient shifts as you scroll (scrub), so the page appears to "dive" from light into deep blue.

## 4. "What is inside the intensive" (dark bento)
Reference: `13_…`, `14_section-materials-bento.jpg`.
- Background navy `#0C1442 → #090B1A`. Eyebrow pill "Materials" (dark glass). Title white ~56px.
- **Bento grid**, 3 columns, white cards rounded-24, title 22px semibold dark + 14px grey description:
  - Col 1: "Product Illustration Anatomy Webinar" (short card) / "Figma Features Overview for Illustration" (tall card with a 3D glass sphere, translucent tilted squares, a fake Figma properties panel with slider and "Color dodge"/"Gloss" dropdowns, cursor).
  - Col 2 (full height): "SaaS UI Style Illustration Video Lessons" — a "Make it beautiful" pill with conic ring + cursor above a browser window with two gradient-thumb list rows with green checks and a floating panel with Slack/Telegram/WhatsApp icons and list chips.
  - Col 3: "Working with Gradients and Color Video Lesson" (grid of small squares in blue/cyan/lavender tones with a "Radial" gradient-picker popover) / two small cards side by side: "Using AI for Idea Generation" (Ask AI pill) and "Massive Texture and Reference Pack" (two overlapping blue glass squares), each with a "🎁 Bonus" pill hanging off the bottom edge.
- Animation: cards reveal with stagger and blur; inside each card the mini-illustration animates in after the card (chips pop, lines draw).

## Global motion language (keep it consistent)
- Every reveal = **opacity + translateY + blur(→0)**, never just a fade. Durations 0.6–0.9s, easing `power3.out`; pops use `back.out(1.6)`.
- Lines always **draw** (stroke-dashoffset), never fade.
- Chips always **pop** (scale 0.6 → 1) and then idle-float.
- Respect `prefers-reduced-motion`: show the final state, no loops.
- Responsive: on mobile, stack cards in one column, scale the hero illustration down to fit (keep the central card + 4 nearest chips, hide far ones), hero H1 ~40px.

## Deliverable & check
- Componentize: `Hero`, `HeroIllustration` (card, chips, connectors as separate components with a shared `Chip` primitive and a `Connector` SVG path component), `SkillsSection`, `AiSection`, `MaterialsBento`.
- When done, run the dev server, take screenshots at 1440px and 390px, and compare them side by side with `reference-frames/keyframes/06_hero-chips-final.jpg`, `09_…`, `11_…`, `14_…`. Fix any differences in spacing, gradient, and chip styling before telling me it's finished.

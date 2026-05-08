# Projects Page Specification

**File:** `app/projects/page.tsx` and new component `components/ProjectsExpanded.tsx`
**Status:** To be built
**Last Updated:** 2026-05-07

---

## OVERVIEW

The Projects page is the **expanded, standalone version** of the Projects section shown on the homepage. It provides:
1. Full list of original music releases
2. System modules with status tracking
3. Dedicated "Sangharsh Album" section (upcoming)
4. Focused layout optimized for deep exploration

---

## PAGE STRUCTURE

```
ProjectsPage (/projects)
├── Navbar (existing component)
├── ProjectsExpanded (NEW COMPONENT)
│   ├── Hero Section
│   ├── Original Music Section (expanded)
│   ├── The Intelligence System Section (modules)
│   └── Upcoming: Sangharsh Album Section (placeholder for now)
├── Footer (existing component)
```

---

## SECTION 1: HERO

**Location:** Top of page, after Navbar

**Layout:**
- Full-width container with padding
- Two-column grid on desktop (title left, CTA right)
- Single column on mobile

**Content:**

```
Label: "Projects" (color: var(--accent-authority-muted), fontSize: 12px, weight: 600, uppercase)

Headline: 
"Original music and the intelligence infrastructure behind it."
(Gradient text on: "infrastructure")

Subheading:
"Both in motion. Everything you see is live data feeding back into the system."

CTA Button:
Text: "Back to Home"
Style: btn btn-secondary
Link: href="/"
```

**Styling Notes:**
- Headline: font-size clamp(28px, 5vw, 48px), line-height 1.08
- Subheading: font-size 16px, color var(--text-secondary), max-width 600px
- Spacing: margin-bottom 3xl after subheading
- Background: var(--bg-primary)

**Responsive:**
- Desktop: 2-column grid with gap 3xl
- Tablet (768px): 1-column, align-items flex-start
- Mobile: Stacked, center-aligned text

---

## SECTION 2: ORIGINAL MUSIC (EXPANDED)

**Location:** After Hero section

**Block Header:**
- Label: "Original Music" (uppercase, 13px, weight 600, letter-spacing 0.08em)
- Border-bottom: 1px solid var(--border-muted)
- Margin-bottom: space-xl
- Padding-bottom: space-md

**Content:** Video cards in grid layout

**Grid Layout:**
- Desktop (1200px+): 3 columns
- Tablet (900px): 2 columns
- Mobile (600px): 1 column
- Gap: var(--space-lg)

**Music Projects Data:**
```javascript
const musicProjects = [
  {
    id: "I8ZQCN9EslU",
    title: "Lately",
    desc: "Our debut release. The first piece of original IP from Polynovea.",
    type: "Release",
    cta: "Watch on YouTube",
    href: "https://youtu.be/I8ZQCN9EslU",
  },
  {
    id: "VqiJCgQTJ0g",
    title: "Lately — Remake",
    desc: "A reimagined version. Same foundation, different resolution.",
    type: "Remake",
    cta: "Watch on YouTube",
    href: "https://youtu.be/VqiJCgQTJ0g",
  },
  {
    id: "IIvCau8-tBw",
    title: "Sangharsh",
    desc: "Our upcoming album. A body of work in active production — releasing progressively.",
    type: "Album (Upcoming)",
    cta: "Watch Teaser",
    href: "https://youtu.be/IIvCau8-tBw",
  },
];
```

**Video Card Component Structure:**

Each card has:
1. Video embed (lazy-loaded, click to play)
2. Card body with title, description, type badge, CTA button

**Video Embed:**
- Aspect ratio: 16:9 (56.25% padding-top trick)
- Default: Show YouTube thumbnail (mqdefault.jpg)
- On click: Replace with `<iframe>` autoplay
- Button overlay: play icon in purple circle (rgba(124, 58, 237, 0.9))
- Hover effect: play button scales 1.1x

**Card Body:**
```
Type badge: "Release" / "Remake" / "Album (Upcoming)"
  - Style: badge, small pill, 11px font
  - Color: var(--text-disabled) text on transparent
  - Border: 1px solid var(--border-muted)
  - No background fill

Title: "Lately" (font-size 17px, weight 600, font-family display)

Description: (font-size 14px, color var(--text-secondary))

CTA Button: "Watch on YouTube →"
  - Style: btn btn-ghost (minimal style)
  - External link (target="_blank", rel="noopener noreferrer")
```

**Animations:**
- data-reveal: Yes (staggered)
- data-reveal-delay: i * 80ms for each card

---

## SECTION 3: THE INTELLIGENCE SYSTEM (MODULES)

**Location:** After Original Music section

**Block Header:**
- Label: "The Intelligence System" (same style as above)
- Border-bottom: 1px solid var(--border-muted)
- Margin: space-xl bottom, space-md padding-bottom
- Margin-top: 3xl before header

**Grid Layout:**
- Desktop (1200px+): 3 columns
- Tablet (900px): 2 columns
- Mobile (600px): 1 column
- Gap: var(--space-lg)

**System Modules Data:**
```javascript
const systemModules = [
  {
    tag: "Module 01",
    title: "Decision Framework",
    status: "Active",
    statusType: "active",
    desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
  },
  {
    tag: "Module 02",
    title: "Acquisition System",
    status: "In Progress",
    statusType: "progress",
    desc: "Two-part system. Part 1 structures raw behavioural data into operational intelligence. Part 2 deploys the acquisition engine to identify and grow the right audience with precision.",
  },
  {
    tag: "Module 03",
    title: "Optimisation System",
    status: "Planned",
    statusType: "planned",
    desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
  },
];
```

**Module Card Structure:**

Each card is a `card` component (class-based) with:

```
Top row (flex, space-between):
  - Tag: "Module 01" (font 11px, weight 600, uppercase, color var(--text-disabled))
  - Status badge: "Active" / "In Progress" / "Planned"

Title: "Decision Framework" (font 20px, weight 600, font-family display)

Description: (font 14px, color var(--text-secondary), line-height 1.6)
```

**Status Badge Styles:**
- Shape: Pill (border-radius var(--radius-pill))
- Padding: 3px 10px
- Font: 11px, weight 600, letter-spacing 0.06em
- Dot indicator: 6px circle, flex-gap 6px

**Badge Types:**
```
.badge-active:
  - background: rgba(34, 197, 94, 0.12)
  - color: #4ade80
  - dot: #4ade80

.badge-progress:
  - background: rgba(124, 58, 237, 0.15)
  - color: #a78bfa
  - dot: #a78bfa

.badge-planned:
  - background: rgba(230, 211, 163, 0.1)
  - color: var(--accent-authority)
  - dot: var(--accent-authority)
```

**Card Styling:**
- Padding: var(--space-xl)
- Border: 1px solid var(--border-muted)
- Background: var(--bg-card)
- Border-radius: var(--radius-md)

**Animations:**
- data-reveal: Yes (staggered)
- data-reveal-delay: i * 80ms for each card

---

## SECTION 4: UPCOMING - SANGHARSH ALBUM (PLACEHOLDER)

**Location:** After System Modules

**Status:** PLACEHOLDER ONLY for now

**Content:**
```
Block Header: "Sangharsh Album" (same style as above)

Placeholder Text:
"Coming soon. Full tracklist and release details will be published here."

(No cards, no data — just a heading and text message)
```

---

## GLOBAL STYLING NOTES

**Colors:**
- Primary text: var(--text-primary)
- Secondary text: var(--text-secondary)
- Disabled/label text: var(--text-disabled)
- Background: var(--bg-primary)
- Card background: var(--bg-card)
- Borders: var(--border-muted)
- Accents: var(--accent-intelligence), var(--accent-authority)

**Spacing Variables:**
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

**Typography:**
- Display font (titles): var(--font-display)
- Body font (text): var(--font-body)
- Label: 11px, weight 600, letter-spacing 0.08em, uppercase

**Responsive Breakpoints:**
- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px
- Large: > 1200px

---

## ROUTING

**Current Setup:**
- `/projects` → wraps ProjectsExpanded component
- No changes needed to routing

**File Changes:**
- CREATE: `components/ProjectsExpanded.tsx`
- MODIFY: `app/projects/page.tsx` (import ProjectsExpanded instead of Projects)

---

## GUARDRAILS (ANTI-HALLUCINATION)

**DO NOT:**
- Add extra sections not in this spec
- Add links/navigation not specified
- Add filters, search, or sorting
- Add individual module detail pages
- Change card layouts beyond stated breakpoints
- Use placeholder content beyond the Sangharsh section
- Hardcode colors (always use CSS variables)
- Remove data-reveal animations

**DO:**
- Use existing CSS-in-JS pattern (style jsx)
- Reuse card component class
- Keep animations consistent with homepage
- Use clamp() for responsive font sizing
- Import ScrollReveal utilities if needed
- Test responsive at 375px, 768px, 1024px, 1440px

---

## COMPLETION CHECKLIST

- [ ] ProjectsExpanded component created
- [ ] Hero section renders correctly
- [ ] Original Music section with 3 video cards
- [ ] System Modules section with 3 module cards
- [ ] Sangharsh placeholder section
- [ ] Responsive layout tested (mobile, tablet, desktop)
- [ ] Animations working (data-reveal)
- [ ] No TypeScript errors
- [ ] No hardcoded colors
- [ ] Links open correctly (external links use target="_blank")

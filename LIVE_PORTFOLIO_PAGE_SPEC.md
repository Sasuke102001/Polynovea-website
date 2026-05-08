# Live Portfolio Page Specification

**File:** `app/live-portfolio/page.tsx` and new component `components/LivePortfolioExpanded.tsx`
**Status:** To be built
**Last Updated:** 2026-05-07

---

## OVERVIEW

The Live Portfolio page is the **expanded, standalone version** of the Live Portfolio section. It provides:
1. Real-time event and performance data
2. Live venue partnerships and collaborations
3. Current tour dates and bookings
4. Live data feeds from the intelligence system
5. Performance metrics and audience engagement

---

## PAGE STRUCTURE

```
LivePortfolioPage (/live-portfolio)
├── Navbar (existing component)
├── LivePortfolioExpanded (NEW COMPONENT)
│   ├── Hero Section
│   ├── Live Events Section (upcoming shows)
│   ├── Venue Partnerships Section (collaborative venues)
│   ├── Live Metrics Section (real-time data)
│   └── Booking & Inquiries Section (CTA)
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
Label: "Live Portfolio" (color: var(--accent-authority-muted), fontSize: 12px, weight: 600, uppercase)

Headline: 
"Live events, real venues, and <span>intelligence</span> in motion."
(Gradient text on: "intelligence")

Subheading:
"Book Polynovea for your venue. Real-time data driving real engagement."

CTA Button:
Text: "Back to Home"
Style: btn btn-secondary
Link: href="/"
```

**Styling Notes:**
- Headline: font-size clamp(34px, 5vw, 64px), line-height 1.04
- Subheading: font-size 16px, color var(--text-secondary), max-width 44rem
- Spacing: margin-bottom 4xl after section
- Background: var(--bg-primary)

**Responsive:**
- Desktop: 2-column grid with gap 2xl, align-items end
- Tablet (900px): 1-column, align-items flex-start
- Mobile (600px): Stacked, single column

---

## SECTION 2: LIVE EVENTS

**Location:** After Hero section

**Block Header:**
- Label: "Upcoming Events" (uppercase, 13px, weight 600, letter-spacing 0.08em)
- Border-bottom: 1px solid var(--border-muted)
- Margin-bottom: space-xl
- Padding-bottom: space-md

**Content:** Event cards in grid layout

**Grid Layout:**
- Desktop (1200px+): 3 columns
- Tablet (900px): 2 columns
- Mobile (600px): 1 column
- Gap: var(--space-lg)

**Live Events Data:**
```javascript
const liveEvents = [
  {
    id: "event-001",
    title: "Sangharsh Album Release Show",
    date: "2026-06-15",
    time: "19:00",
    venue: "The Warehouse, Mumbai",
    city: "Mumbai",
    capacity: "500",
    status: "Live Booking",
    statusType: "active",
    desc: "Exclusive album launch performance with full live band.",
    cta: "Book Tickets",
    href: "https://tickets.polynovea.com/sangharsh-launch",
  },
  {
    id: "event-002",
    title: "Festival Performance - Indie Summer Fest",
    date: "2026-07-22",
    time: "18:30",
    venue: "Summer Festival Grounds",
    city: "Bangalore",
    capacity: "2000",
    status: "Confirmed",
    statusType: "progress",
    desc: "Main stage performance at India's premier indie music festival.",
    cta: "Learn More",
    href: "https://www.indiesummerfest.in",
  },
  {
    id: "event-003",
    title: "Acoustic Intimate Session",
    date: "2026-08-10",
    time: "20:00",
    venue: "Canvas Lounge, Delhi",
    city: "Delhi",
    capacity: "100",
    status: "Coming Soon",
    statusType: "planned",
    desc: "Intimate acoustic performance with audience interaction and Q&A.",
    cta: "Notify Me",
    href: "https://polynovea.com/notify/acoustic-delhi",
  },
];
```

**Event Card Component Structure:**

Each card has:
1. Event details (date, time, venue, city)
2. Event title and description
3. Status badge
4. CTA button

**Card Layout:**
```
Header row (flex, space-between):
  - Left: Date badge (MM/DD) with visual date indicator
  - Right: Status badge (Live Booking / Confirmed / Coming Soon)

Event title: 22px, weight 600, font-display

Venue info:
  - Venue name (16px, weight 500)
  - City (14px, color var(--text-secondary))

Capacity indicator: "Capacity: 500" (12px, color var(--text-secondary))

Description: 14px, color var(--text-secondary), line-height 1.65

CTA Button: btn btn-secondary
```

**Status Badge Styles:**
```
.badge-active (Live Booking):
  - background: rgba(34, 197, 94, 0.12)
  - color: #4ade80
  - dot: #4ade80

.badge-progress (Confirmed):
  - background: rgba(124, 58, 237, 0.15)
  - color: #a78bfa
  - dot: #a78bfa

.badge-planned (Coming Soon):
  - background: rgba(230, 211, 163, 0.1)
  - color: var(--accent-authority)
  - dot: var(--accent-authority)
```

**Date Badge:**
- Background: var(--accent-intelligence)
- Color: var(--text-primary)
- Padding: 8px 12px
- Border-radius: 4px
- Font-size: 13px, weight 600
- Format: "JUN 15" (uppercase, 2-digit month, 2-digit day)

**Animations:**
- data-reveal: Yes (staggered)
- data-reveal-delay: i * 80ms for each card

---

## SECTION 3: VENUE PARTNERSHIPS

**Location:** After Live Events section

**Block Header:**
- Label: "Venue Partnerships" (same style as above)
- Border-bottom: 1px solid var(--border-muted)
- Margin: space-xl bottom, space-md padding-bottom

**Grid Layout:**
- Desktop (1200px+): 3 columns
- Tablet (900px): 2 columns
- Mobile (600px): 1 column
- Gap: var(--space-lg)

**Venue Partnership Data:**
```javascript
const venuePartnerships = [
  {
    id: "venue-001",
    name: "The Warehouse",
    city: "Mumbai",
    capacity: "500",
    type: "Live Music Venue",
    desc: "State-of-the-art venue featuring the latest in sound and lighting technology.",
    contactStatus: "Active Partner",
    statusType: "active",
    logo: "https://cdn.polynovea.com/venues/warehouse.jpg",
  },
  {
    id: "venue-002",
    name: "Canvas Lounge",
    city: "Delhi",
    capacity: "150",
    type: "Intimate Listening Space",
    desc: "Curated acoustic performances in an intimate setting with audience engagement focus.",
    contactStatus: "Booking Available",
    statusType: "progress",
    logo: "https://cdn.polynovea.com/venues/canvas.jpg",
  },
  {
    id: "venue-003",
    name: "Festival Organizer Network",
    city: "Pan-India",
    capacity: "1000+",
    type: "Festival Circuit",
    desc: "Strategic partnerships with major music festivals across India.",
    contactStatus: "Interested",
    statusType: "planned",
    logo: "https://cdn.polynovea.com/venues/festival-network.jpg",
  },
];
```

**Venue Card Structure:**

```
Top row (flex, space-between):
  - Left: Venue type badge
  - Right: Status badge (Active Partner / Booking Available / Interested)

Venue name: 22px, weight 600, font-display

Location: "City • Capacity: XXX" (14px, color var(--text-secondary))

Description: 14px, color var(--text-secondary), line-height 1.65

CTA Button: "Contact Venue" or "Learn More"
  - Style: btn btn-secondary
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

## SECTION 4: LIVE METRICS

**Location:** After Venue Partnerships

**Block Header:**
- Label: "Live Metrics" (same style as above)
- Border-bottom: 1px solid var(--border-muted)

**Content:** Metric cards showing real-time data (non-interactive display)

**Grid Layout:**
- Desktop (1200px+): 4 columns
- Tablet (900px): 2 columns
- Mobile (600px): 1 column
- Gap: var(--space-md)

**Metrics Data:**
```javascript
const liveMetrics = [
  {
    id: "metric-001",
    label: "Total Events Booked",
    value: "12",
    period: "This Year",
    trend: "+45%",
    trendDirection: "up",
  },
  {
    id: "metric-002",
    label: "Audience Reach",
    value: "15.2K",
    period: "Live",
    trend: "+28%",
    trendDirection: "up",
  },
  {
    id: "metric-003",
    label: "Active Venue Partners",
    value: "8",
    period: "Current",
    trend: "+2",
    trendDirection: "up",
  },
  {
    id: "metric-004",
    label: "Engagement Rate",
    value: "87%",
    period: "Average",
    trend: "+12%",
    trendDirection: "up",
  },
];
```

**Metric Card Structure:**

```
Metric label: 13px, weight 600, uppercase, color var(--text-secondary)

Value: 42px, weight 700, font-display, color var(--text-primary)

Period: 12px, color var(--text-secondary), margin-top space-xs

Trend indicator:
  - Icon: ↑ (green) for positive, ↓ (red) for negative
  - Text: "+45%" (color based on direction)
  - Font: 12px, weight 600
```

**Card Styling:**
- Padding: var(--space-lg)
- Border: 1px solid var(--border-muted)
- Background: var(--bg-card)
- Border-radius: var(--radius-md)
- Center-aligned text

**Animations:**
- data-reveal: Yes (staggered)
- data-reveal-delay: i * 80ms for each card

---

## SECTION 5: BOOKING & INQUIRIES

**Location:** After Live Metrics

**Status:** CALL-TO-ACTION SECTION

**Content:**
```
Block Header: "Ready to Book?" (same style as above)

Headline: "Get Polynovea for your event."

Copy: "Whether it's a 100-person intimate show or a 5000-person festival, we bring the music and the intelligence. Contact us for inquiries, bookings, and collaborations."

CTA Buttons (side-by-side):
  - Primary: "Book Now" (href: mailto:bookings@polynovea.com?subject=Event%20Booking%20Inquiry)
  - Secondary: "Learn More" (href: /live-portfolio#partnership)

Background: Subtle gradient or accent color highlight
Padding: var(--space-3xl) vertical, var(--space-xl) horizontal
```

---

## GLOBAL STYLING NOTES

**Colors:**
- Primary text: var(--text-primary)
- Secondary text: var(--text-secondary)
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
- 4xl: 64px

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

## IMPORTANT CODE FIXES & PATTERNS

### Fix 1: YouTube Image Loading Error
**Problem:** Using Next.js Image component with YouTube thumbnail URLs causes configuration error.
**Solution:** Use regular HTML `<img>` tag with `loading="lazy"` instead.

```typescript
// WRONG (causes error):
import Image from "next/image";
<Image 
  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
  alt={title}
  fill
/>

// CORRECT:
<img
  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
  alt={title}
  loading="lazy"
/>
```

### Fix 2: Style JSX Scoping with Nested Components
**Problem:** Child components don't inherit parent `<style jsx>` rules. Status badges and nested elements won't receive parent styles.
**Solution:** Place ALL component-specific styles in a `<style jsx>` block WITHIN that component function.

```typescript
// WRONG (child component won't inherit parent styles):
// Parent component:
<style jsx>{`
  .status-badge { display: inline-flex; ... }
`}</style>

// Child ModuleCard component (receives no styles):
<span className={`status-badge badge-${module.statusType}`}>
  {module.status}
</span>

// CORRECT (each component has its own style jsx block):
function ModuleCard({ module, delay }: ModuleCardProps) {
  return (
    <article className="module-card card">
      <div className="module-top">
        <span className="module-tag">{module.tag}</span>
        <span className={`status-badge badge-${module.statusType}`}>
          <span className="status-dot" />
          {module.status}
        </span>
      </div>
      
      <style jsx>{`
        .module-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding: var(--space-xl);
        }

        .module-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .badge-active {
          background: rgba(34, 197, 94, 0.12);
          color: #4ade80;
        }

        .badge-progress {
          background: rgba(124, 58, 237, 0.15);
          color: #a78bfa;
        }

        .badge-planned {
          background: rgba(230, 211, 163, 0.1);
          color: var(--accent-authority);
        }
      `}</style>
    </article>
  );
}
```

### Fix 3: Status Badge Styling Best Practices
**Pattern:** Always include:
1. `display: inline-flex` for horizontal alignment with gap
2. `align-items: center` for vertical centering
3. `gap: var(--space-xs)` between status dot and text
4. `padding` and `border-radius` for pill shape
5. `flex-shrink: 0` to prevent badge from shrinking
6. Color-coded background and text for each badge type

```typescript
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  flex-shrink: 0;
}
```

---

## ROUTING

**Current Setup:**
- `/live-portfolio` → wraps LivePortfolioExpanded component

**File Changes:**
- CREATE: `components/LivePortfolioExpanded.tsx`
- CREATE: `app/live-portfolio/page.tsx`

---

## GUARDRAILS (ANTI-HALLUCINATION)

**DO NOT:**
- Add extra sections not in this spec
- Add search, filters, or sorting
- Add booking system integration (just links)
- Change card layouts beyond stated breakpoints
- Use placeholder content beyond the Booking section
- Hardcode colors (always use CSS variables)
- Remove data-reveal animations
- Use Next.js Image component for external URLs

**DO:**
- Use existing CSS-in-JS pattern (style jsx)
- Reuse card component class
- Keep animations consistent with homepage
- Use clamp() for responsive font sizing
- Use regular `<img>` tags for external image URLs
- Include style jsx in EACH component that needs styling
- Test responsive at 375px, 768px, 1024px, 1440px

---

## COMPLETION CHECKLIST

- [ ] LivePortfolioExpanded component created
- [ ] Hero section renders correctly
- [ ] Live Events section with 3 event cards
- [ ] Venue Partnerships section with 3 venue cards
- [ ] Live Metrics section with 4 metric cards
- [ ] Booking & Inquiries CTA section
- [ ] Responsive layout tested (mobile, tablet, desktop)
- [ ] Animations working (data-reveal)
- [ ] No TypeScript errors
- [ ] No hardcoded colors
- [ ] All external images use `<img>` tags (not Next.js Image)
- [ ] Status badges styled correctly (pill shapes, colored dots)
- [ ] Each component has its own style jsx block

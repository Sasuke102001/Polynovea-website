# Live Portfolio Page - Codex Implementation Prompt

**Reference Specification:** See LIVE_PORTFOLIO_PAGE_SPEC.md for full details

---

## CRITICAL FIXES TO APPLY

### 1. External Image URLs - Use Regular `<img>` Tags ONLY
Do NOT use Next.js Image component for external URLs. This causes configuration errors.

```typescript
// ✅ CORRECT:
<img
  src={`https://cdn.polynovea.com/venues/${venue.logo}`}
  alt={venue.name}
  loading="lazy"
/>

// ❌ WRONG (will cause errors):
import Image from "next/image"
<Image src={...} fill />
```

### 2. Style JSX Scoping - Each Component Gets Its Own Block
Nested components DO NOT inherit parent `<style jsx>` rules. You MUST include `<style jsx>` within EVERY component that needs styling.

```typescript
// Example: EventCard component structure
function EventCard({ event, delay }: EventCardProps) {
  return (
    <article className="event-card card" data-reveal="true" data-reveal-delay={String(delay)}>
      {/* JSX content */}
      
      <style jsx>{`
        .event-card { /* all event-card styles here */ }
        .event-header { /* all event-header styles here */ }
        .status-badge { /* all badge styles here */ }
        .badge-active { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
        .badge-progress { background: rgba(124, 58, 237, 0.15); color: #a78bfa; }
        .badge-planned { background: rgba(230, 211, 163, 0.1); color: var(--accent-authority); }
      `}</style>
    </article>
  );
}
```

### 3. Status Badges - Must Use inline-flex
Status badges with colored dots require flexbox layout:

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

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  flex-shrink: 0;
}

.badge-active {
  background: rgba(34, 197, 94, 0.12);
  color: #4ade80;
}

.badge-active .status-dot {
  background: #4ade80;
}

.badge-progress {
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
}

.badge-progress .status-dot {
  background: #a78bfa;
}

.badge-planned {
  background: rgba(230, 211, 163, 0.1);
  color: var(--accent-authority);
}

.badge-planned .status-dot {
  background: var(--accent-authority);
}
```

---

## TASK: BUILD LIVE PORTFOLIO PAGE

### Files to Create:
1. `components/LivePortfolioExpanded.tsx` - Main component with 5 sections
2. `app/live-portfolio/page.tsx` - Page wrapper

### Component Structure:

```typescript
// app/live-portfolio/page.tsx
import Navbar from "@/components/Navbar";
import LivePortfolioExpanded from "@/components/LivePortfolioExpanded";
import Footer from "@/components/Footer";

export default function LivePortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <LivePortfolioExpanded />
      </main>
      <Footer />
    </>
  );
}
```

### LivePortfolioExpanded Component Requirements:

**Imports:**
- React hooks: useState (if needed for interactivity)
- Next.js: Link
- Include all data arrays

**Data Arrays (Copy Exactly):**

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

**Sub-Components Required:**
1. `EventCard` - displays one event (title, date, venue, status, cta)
2. `VenueCard` - displays one venue partnership (name, city, type, status, cta)
3. `MetricCard` - displays one metric (label, value, period, trend)

---

## SECTION 1: HERO SECTION

```
- Label: "Live Portfolio" (var(--accent-authority-muted), 12px, 600, uppercase)
- Headline: "Live events, real venues, and <span>intelligence</span> in motion."
  - Gradient text on: "intelligence"
  - Font: clamp(34px, 5vw, 64px), line-height 1.04
- Subheading: "Book Polynovea for your venue. Real-time data driving real engagement."
  - Font: 16px, color var(--text-secondary), max-width 44rem
- CTA: "Back to Home" button (btn btn-secondary, href="/")

Layout:
- Desktop: 2-column grid, gap var(--space-2xl), align-items end
- Tablet (900px): 1-column, align-items flex-start
- Mobile (600px): 1-column

Styling:
- padding: var(--space-xl) inside container
- margin-bottom: var(--space-4xl)
- Background: var(--bg-primary)
```

---

## SECTION 2: LIVE EVENTS

```
Block Header:
- Label: "Upcoming Events"
- Border-bottom: 1px solid var(--border-muted)
- Margin-bottom: var(--space-xl), padding-bottom: var(--space-md)

Cards Grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: var(--space-lg)
- Margin-top: var(--space-4xl)

EventCard Component:
- Maps over liveEvents array with delay={index * 80}
- Displays: date badge (MM/DD), status badge, title, venue, city, capacity, description, CTA button
- Date badge: background var(--accent-intelligence), padding 8px 12px, border-radius 4px, format "JUN 15"
- Status badge styling (use .badge-active, .badge-progress, .badge-planted with dot)
```

---

## SECTION 3: VENUE PARTNERSHIPS

```
Block Header:
- Label: "Venue Partnerships"
- Border-bottom: 1px solid var(--border-muted)
- Margin-top: var(--space-4xl)
- Margin-bottom: var(--space-xl)
- Padding-bottom: var(--space-md)

Cards Grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: var(--space-lg)

VenueCard Component:
- Maps over venuePartnerships array with delay={index * 80}
- Displays: venue type badge (top-left), status badge (top-right), name, city, capacity, description, CTA
- Status badges use .badge-active, .badge-progress, .badge-planned styling
- Card padding: var(--space-xl)
- Border: 1px solid var(--border-muted)
- Background: var(--bg-card)
- Border-radius: var(--radius-md)
```

---

## SECTION 4: LIVE METRICS

```
Block Header:
- Label: "Live Metrics"
- Border-bottom: 1px solid var(--border-muted)
- Margin-top: var(--space-4xl)
- Margin-bottom: var(--space-xl)
- Padding-bottom: var(--space-md)

Cards Grid:
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: var(--space-md)

MetricCard Component:
- Maps over liveMetrics array with delay={index * 80}
- Displays: label (13px, uppercase), value (42px, weight 700, font-display), period, trend indicator
- Trend indicator: "↑ +45%" (green for up, red for down)
- Text alignment: center
- Card padding: var(--space-lg)
- Border: 1px solid var(--border-muted)
- Background: var(--bg-card)
- Border-radius: var(--radius-md)
```

---

## SECTION 5: BOOKING & INQUIRIES

```
Content:
- Block Header: "Ready to Book?"
- Headline: "Get Polynovea for your event."
- Copy: "Whether it's a 100-person intimate show or a 5000-person festival, we bring the music and the intelligence. Contact us for inquiries, bookings, and collaborations."
- CTA Buttons:
  - Primary: "Book Now" (href: "mailto:bookings@polynovea.com?subject=Event%20Booking%20Inquiry")
  - Secondary: "Learn More" (href: "/live-portfolio#partnership")
  - Button style: btn btn-secondary
  - Layout: flex, gap var(--space-md), wrap on mobile

Styling:
- Margin-top: var(--space-4xl)
- Padding: var(--space-3xl) vertical, var(--space-xl) horizontal
- Background: subtle accent or gradient
```

---

## GLOBAL STYLING REQUIREMENTS

1. Use `<style jsx>` at component level for all CSS
2. Use CSS variables for all colors (NO hardcoded hex values)
3. Use `data-reveal="true"` and `data-reveal-delay` on all card containers
4. Use clamp() for responsive font sizes
5. Use regular `<img>` tags for external images (NO Next.js Image)
6. Animations: fade-in with staggered delays (80ms per card)
7. Status badges MUST use inline-flex with colored dots
8. All card padding: var(--space-xl) or var(--space-lg)
9. All borders: 1px solid var(--border-muted)
10. All card backgrounds: var(--bg-card)

---

## IMPLEMENTATION CHECKLIST

- [ ] Create `app/live-portfolio/page.tsx`
- [ ] Create `components/LivePortfolioExpanded.tsx`
- [ ] Define interfaces: LiveEvent, VenuePartnership, Metric, EventCardProps, VenueCardProps, MetricCardProps
- [ ] Add data arrays: liveEvents, venuePartnerships, liveMetrics
- [ ] Build Hero section with proper responsive layout
- [ ] Build EventCard sub-component with date badge and status badge
- [ ] Build Live Events section (mapped cards with staggered delays)
- [ ] Build VenueCard sub-component with status badge styling
- [ ] Build Venue Partnerships section (mapped cards with staggered delays)
- [ ] Build MetricCard sub-component with trend indicators
- [ ] Build Live Metrics section (4-column grid on desktop)
- [ ] Build Booking & Inquiries CTA section
- [ ] Verify all styles are in <style jsx> blocks within components
- [ ] Verify NO Next.js Image components used (use <img> tags)
- [ ] Verify NO hardcoded colors (use CSS variables)
- [ ] Verify responsive breakpoints: 600px, 900px, 1200px
- [ ] Test data-reveal animations on all cards
- [ ] Verify status badges display as colored pills with dots
- [ ] TypeScript: Define all prop interfaces explicitly
- [ ] No console.log statements
- [ ] Test responsiveness: 375px (mobile), 768px (tablet), 1024px, 1440px (desktop)

---

## DO NOT

- ❌ Use Next.js Image component for external URLs
- ❌ Put styles in parent component expecting children to inherit them
- ❌ Hardcode colors - use CSS variables
- ❌ Add features not in this spec
- ❌ Add search, filters, or sorting
- ❌ Remove data-reveal animations
- ❌ Use enum for status types - use string unions instead
- ❌ Add console.log statements

## DO

- ✅ Use regular `<img>` tags for external images
- ✅ Include `<style jsx>` in EACH component that needs styling
- ✅ Use CSS variables for all colors
- ✅ Use inline-flex for status badges with colored dots
- ✅ Include data-reveal and data-reveal-delay attributes
- ✅ Use TypeScript interfaces for all data structures
- ✅ Test responsive layout at specified breakpoints
- ✅ Keep components focused and single-responsibility
- ✅ Use clamp() for responsive font sizing
- ✅ Use "use client" directive at top of file

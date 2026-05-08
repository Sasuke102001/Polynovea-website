# Admin API & Database Setup - Codex Implementation Prompt

**Reference Folders:** 
- API routes: `app/api/content/`
- Utilities: `lib/api/`

---

## OBJECTIVE

Build the complete backend for dynamic content management. This enables the website to fetch live events, past shows, venues, blogs, and metrics from Supabase instead of hardcoded data.

**Key Deliverable:** API endpoints that the website components call to populate content automatically.

---

## SETUP: Supabase Database

### Create a Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Get your credentials:
   - Project URL
   - Anon Public Key
   - Service Role Key (for admin operations)

### Add Environment Variables

Create/update `.env.local` in polynovea-web root:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_API_KEY=temp-admin-key-change-later
```

### Install Dependencies

Run in polynovea-web root:
```bash
npm install @supabase/supabase-js zod
```

Required packages:
- `@supabase/supabase-js` - Supabase client library
- `zod` - Input validation library (likely already installed, verify with `npm list zod`)

---

## DATABASE SCHEMA

Execute these SQL commands in Supabase SQL editor (or let Codex create a migration):

```sql
-- 1. Live Events (Upcoming performances)
CREATE TABLE IF NOT EXISTS live_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER,
  status TEXT NOT NULL,
  status_type TEXT NOT NULL CHECK (status_type IN ('active', 'progress', 'planned')),
  cta_text TEXT DEFAULT 'Book Tickets',
  cta_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_live_events_date ON live_events(date ASC);

-- 2. Past Shows (Archive of completed performances)
CREATE TABLE IF NOT EXISTS past_shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER,
  attendance INTEGER,
  highlight_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_past_shows_date ON past_shows(date DESC);

-- 3. Venue Partnerships (Partner venues)
CREATE TABLE IF NOT EXISTS venue_partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity TEXT,
  type TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  status_type TEXT NOT NULL CHECK (status_type IN ('active', 'progress', 'planned')),
  logo_url TEXT,
  contact_email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_venue_partnerships_city ON venue_partnerships(city);

-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

-- 5. Live Metrics (Dashboard statistics)
CREATE TABLE IF NOT EXISTS live_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  period TEXT,
  trend TEXT,
  trend_direction TEXT CHECK (trend_direction IN ('up', 'down')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## FILES TO CREATE

### 1. `lib/api/types.ts`
Define all TypeScript interfaces:
- `LiveEvent`, `PastShow`, `VenuePartnership`, `BlogPost`, `LiveMetric`
- `ApiResponse<T>` for consistent response format
- All properties exactly match database columns

### 2. `lib/api/validators.ts`
Define Zod schemas for validation:
- `createLiveEventSchema`, `updateLiveEventSchema`
- `createPastShowSchema`, `updatePastShowSchema`
- `createVenuePartnershipSchema`, `updateVenuePartnershipSchema`
- `createBlogPostSchema`, `updateBlogPostSchema`
- `updateLiveMetricsSchema`
- All schemas should validate required fields and types

### 3. `lib/api/supabase.ts`
Initialize Supabase client:
```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabase;
```

### 4. `lib/api/middleware.ts` (optional but recommended)
Helper functions:
- `validateAdminKey()` - Check Authorization header
- `handleError()` - Consistent error responses
- `sendResponse()` - Consistent success responses

### Route File Structure Template

Each route file follows this pattern:

```typescript
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/api/supabase";
import { createLiveEventSchema } from "@/lib/api/validators";

// GET - fetch all records
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("live_events")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// POST - create new record
export async function POST(request: NextRequest) {
  try {
    // Validate auth
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Unauthorized",
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    if (token !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Invalid token",
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const validatedData = createLiveEventSchema.parse(body);

    const { data, error } = await supabase
      .from("live_events")
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid input";
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
```

---

## ORDERING & SORTING RULES

All GET endpoints that return lists must sort results consistently:

| Endpoint | Sort Field | Direction | Reason |
|----------|-----------|-----------|--------|
| `GET /api/content/live-events` | `date` | ASC | Show upcoming events first |
| `GET /api/content/past-shows` | `date` | DESC | Show most recent shows first |
| `GET /api/content/venue-partnerships` | `created_at` | DESC | Show newest partnerships first |
| `GET /api/content/blog-posts` | `published_at` | DESC | Show latest posts first |
| `GET /api/content/live-metrics` | `id` | ASC | Maintain insertion order |

**Important:** Always apply `.order()` to GET endpoints, even if there's only one expected result. This ensures consistent, predictable output.

---

## API ROUTES

### A. Live Events

**File: `app/api/content/live-events/route.ts`**
- `GET` - Return all events sorted by date ASC (upcoming first)
- `POST` - Create new event (requires auth)
  - Validate with `createLiveEventSchema`
  - Insert into `live_events` table
  - Return created event

**File: `app/api/content/live-events/[id]/route.ts`**
- `PUT` - Update event by ID (requires auth)
  - Validate with `updateLiveEventSchema`
  - Update `live_events` table
  - Return updated event
- `DELETE` - Delete event by ID (requires auth)
  - Delete from `live_events` table
  - Return success

---

### B. Past Shows

**File: `app/api/content/past-shows/route.ts`**
- `GET` - Return all past shows sorted by date DESC (newest first)
- `POST` - Create new past show (requires auth)

**File: `app/api/content/past-shows/[id]/route.ts`**
- `PUT` - Update past show (requires auth)
- `DELETE` - Delete past show (requires auth)

---

### C. Venue Partnerships

**File: `app/api/content/venue-partnerships/route.ts`**
- `GET` - Return all venues, optionally filtered by city
- `POST` - Create new venue (requires auth)

**File: `app/api/content/venue-partnerships/[id]/route.ts`**
- `PUT` - Update venue (requires auth)
- `DELETE` - Delete venue (requires auth)

---

### D. Blog Posts

**File: `app/api/content/blog-posts/route.ts`**
- `GET` - Return all published posts (status = 'published'), sorted by published_at DESC
  - Include `featured_image_url`, `excerpt`, `title`, `slug`
- `POST` - Create new blog post (requires auth)
  - Can be draft or published
  - If published, auto-set `published_at` to NOW()

**File: `app/api/content/blog-posts/[id]/route.ts`**
- `PUT` - Update blog post (requires auth)
  - Can change status to/from draft/published
  - Auto-update `published_at` when changing to published
- `DELETE` - Delete blog post (requires auth)

**File: `app/api/content/blog-posts/[slug]/route.ts`**
- `GET` - Fetch single blog post by slug
  - Return full `content` and all fields
  - Return 404 if not found or not published

---

### E. Live Metrics

**File: `app/api/content/live-metrics/route.ts`**
- `GET` - Return all metrics (4 records)
  - Format: `{ label, value, period, trend, trend_direction }`
  - Sort by id (insertion order)
- `PUT` - Update all metrics in one request (requires auth)
  - Accept array of metrics with `label` as the unique key
  - **Upsert behavior:** For each metric:
    - If `label` exists in database, UPDATE that record
    - If `label` doesn't exist, INSERT new record
  - Return all updated/created metrics

**Metrics Upsert Example:**

Request body:
```json
[
  { "label": "Total Events Booked", "value": "15", "period": "This Year", "trend": "+45%", "trend_direction": "up" },
  { "label": "Audience Reach", "value": "18.5K", "period": "Live", "trend": "+32%", "trend_direction": "up" }
]
```

Implementation pattern:
```typescript
const metricsToUpsert = await request.json();

for (const metric of metricsToUpsert) {
  const { error } = await supabase
    .from("live_metrics")
    .upsert(metric, { onConflict: "label" })
    .select();
  
  if (error) throw error;
}

// Then return all metrics
const { data: allMetrics } = await supabase
  .from("live_metrics")
  .select("*")
  .order("id", { ascending: true });
```

---

## IMPLEMENTATION DETAILS

### Response Format (All Endpoints)
```typescript
{
  success: boolean,
  data: T | null,
  error?: string,
  timestamp: string
}
```

Examples:
```typescript
// Success
{ success: true, data: { id: "...", title: "..." }, timestamp: "2026-05-07T..." }

// Error
{ success: false, data: null, error: "Event not found", timestamp: "2026-05-07T..." }
```

### Auth Requirement
All POST/PUT/DELETE routes must validate:
```typescript
const authHeader = request.headers.get("Authorization");
if (!authHeader?.startsWith("Bearer ")) {
  return Response.json(
    { success: false, data: null, error: "Unauthorized" },
    { status: 401 }
  );
}

const token = authHeader.slice(7);
if (token !== process.env.ADMIN_API_KEY) {
  return Response.json(
    { success: false, data: null, error: "Invalid token" },
    { status: 401 }
  );
}
```

### Error Handling

Always return consistent error format with proper HTTP status codes:

**400 Bad Request** - Validation failed
```typescript
{
  success: false,
  data: null,
  error: "Invalid date format. Expected YYYY-MM-DD",
  timestamp: "2026-05-07T10:30:00Z"
}
```

**401 Unauthorized** - Missing or invalid auth token
```typescript
{
  success: false,
  data: null,
  error: "Unauthorized",
  timestamp: "2026-05-07T10:30:00Z"
}
```

**404 Not Found** - Resource doesn't exist
```typescript
{
  success: false,
  data: null,
  error: "Event with id 'abc-123' not found",
  timestamp: "2026-05-07T10:30:00Z"
}
```

**500 Internal Server Error** - Supabase or server issue
```typescript
{
  success: false,
  data: null,
  error: "Database connection failed",
  timestamp: "2026-05-07T10:30:00Z"
}
```

**Validation Error Handling:**
When Zod validation fails, catch the error and return 400:
```typescript
try {
  const validated = createLiveEventSchema.parse(body);
} catch (err) {
  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: `Validation failed: ${err.errors[0].message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
```

### TypeScript
- All route files should be fully typed
- Use `NextRequest`, `NextResponse` from next/server
- Export async functions: `GET`, `POST`, `PUT`, `DELETE`

---

## DATABASE OPERATIONS PATTERNS

### GET all (with optional filtering)
```typescript
const { data, error } = await supabase
  .from("live_events")
  .select("*")
  .order("date", { ascending: true });
```

### GET one by ID
```typescript
const { data, error } = await supabase
  .from("live_events")
  .select("*")
  .eq("id", id)
  .single();
```

### POST (create)
```typescript
const { data, error } = await supabase
  .from("live_events")
  .insert([validatedData])
  .select()
  .single();
```

### PUT (update)
```typescript
const { data, error } = await supabase
  .from("live_events")
  .update(validatedData)
  .eq("id", id)
  .select()
  .single();
```

### DELETE
```typescript
const { error } = await supabase
  .from("live_events")
  .delete()
  .eq("id", id);
```

---

## TESTING ENDPOINTS

Once routes are created, test with curl:

```bash
# GET all events
curl http://localhost:3000/api/content/live-events

# POST new event (requires auth)
curl -X POST http://localhost:3000/api/content/live-events \
  -H "Authorization: Bearer temp-admin-key-change-later" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "date": "2026-06-15",
    "time": "19:00",
    "venue": "Test Venue",
    "city": "Test City",
    "status": "Live Booking",
    "status_type": "active"
  }'

# GET single post by slug
curl http://localhost:3000/api/content/blog-posts/my-blog-post-slug
```

---

## SUCCESS CRITERIA

- [ ] All 5 tables created in Supabase
- [ ] All API routes functional (GET, POST, PUT, DELETE where applicable)
- [ ] Consistent response format on all endpoints
- [ ] Full TypeScript typing on all routes
- [ ] Zod validation on all inputs
- [ ] Auth check on all POST/PUT/DELETE routes
- [ ] Proper error handling (400, 401, 404, 500)
- [ ] Database queries use Supabase JS client correctly
- [ ] All routes tested with sample data
- [ ] README in `app/api/content/` documents all endpoints
- [ ] No console.log statements in final code

---

## DO NOT

- ❌ Use fetch to call Supabase (use `@supabase/supabase-js` client)
- ❌ Expose `SUPABASE_SERVICE_ROLE_KEY` in response
- ❌ Skip input validation
- ❌ Hardcode admin key (use env variable)
- ❌ Add RLS policies yet (we'll do that next phase)
- ❌ Create UI components (APIs only)

## DO

- ✅ Use Supabase JS client for all database operations
- ✅ Validate all inputs with Zod schemas
- ✅ Return consistent response format
- ✅ Require auth on all mutation routes (POST/PUT/DELETE)
- ✅ Sort queries logically (events by date ASC, posts by date DESC)
- ✅ Handle all error cases
- ✅ Use TypeScript strictly
- ✅ Document endpoints in README

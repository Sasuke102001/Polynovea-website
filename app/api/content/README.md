# Content Management API Routes

All API endpoints for managing website content (events, shows, venues, blogs, metrics).

## Folder Structure

```
content/
├── live-events/
│   ├── route.ts          (GET all, POST create)
│   └── [id]/
│       └── route.ts      (PUT update, DELETE)
├── past-shows/
│   ├── route.ts          (GET all, POST create)
│   └── [id]/
│       └── route.ts      (PUT update, DELETE)
├── venue-partnerships/
│   ├── route.ts          (GET all, POST create)
│   └── [id]/
│       └── route.ts      (PUT update, DELETE)
├── blog-posts/
│   ├── route.ts          (GET all, POST create)
│   ├── [id]/
│   │   └── route.ts      (PUT update, DELETE)
│   └── [slug]/
│       └── route.ts      (GET single by slug)
└── live-metrics/
    └── route.ts          (GET, PUT)
```

## Base URL
`/api/content`

## Endpoints
- `/api/content/live-events`
- `/api/content/past-shows`
- `/api/content/venue-partnerships`
- `/api/content/blog-posts`
- `/api/content/live-metrics`

## Shared Utilities
See `lib/api/` for:
- `supabase.ts` - Supabase client
- `validators.ts` - Zod schemas
- `types.ts` - TypeScript interfaces
## Content API

All endpoints return:

```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-05-07T10:30:00.000Z"
}
```

Errors return:

```json
{
  "success": false,
  "data": null,
  "error": "Message",
  "timestamp": "2026-05-07T10:30:00.000Z"
}
```

Mutation routes require:

```http
Authorization: Bearer <ADMIN_API_KEY>
```

## Endpoints

### Live Events

- `GET /api/content/live-events`
- `POST /api/content/live-events`
- `PUT /api/content/live-events/:id`
- `DELETE /api/content/live-events/:id`

### Past Shows

- `GET /api/content/past-shows`
- `POST /api/content/past-shows`
- `PUT /api/content/past-shows/:id`
- `DELETE /api/content/past-shows/:id`

### Venue Partnerships

- `GET /api/content/venue-partnerships`
- `GET /api/content/venue-partnerships?city=Mumbai`
- `POST /api/content/venue-partnerships`
- `PUT /api/content/venue-partnerships/:id`
- `DELETE /api/content/venue-partnerships/:id`

### Blog Posts

- `GET /api/content/blog-posts`
- `POST /api/content/blog-posts`
- `GET /api/content/blog-posts/:slug`
- `PUT /api/content/blog-posts/:id`
- `DELETE /api/content/blog-posts/:id`

`GET /api/content/blog-posts/:slug` returns a published post by slug. `PUT` and `DELETE` on the same dynamic path expect a UUID id.

### Live Metrics

- `GET /api/content/live-metrics`
- `PUT /api/content/live-metrics`

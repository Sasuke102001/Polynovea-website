import { z } from "zod";

const nullableTrimmedString = z
  .string()
  .trim()
  .min(1)
  .nullable()
  .optional()
  .transform((value) => value ?? null);

const statusTypeSchema = z.enum(["active", "progress", "planned"]);
const blogStatusSchema = z.enum(["draft", "published"]);
const trendDirectionSchema = z.enum(["up", "down"]);

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected date in YYYY-MM-DD format");
const timeSchema = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Expected time in HH:MM or HH:MM:SS format");
const uuidSchema = z.string().uuid("Expected a valid UUID");

export const createLiveEventSchema = z.object({
  title: z.string().trim().min(1),
  description: nullableTrimmedString,
  date: dateSchema,
  time: timeSchema,
  venue: z.string().trim().min(1),
  city: z.string().trim().min(1),
  capacity: z.number().int().nonnegative().nullable().optional().transform((value) => value ?? null),
  status: z.string().trim().min(1),
  status_type: statusTypeSchema,
  cta_text: nullableTrimmedString,
  cta_link: z.string().trim().url().nullable().optional().transform((value) => value ?? null),
});

export const updateLiveEventSchema = createLiveEventSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const createPastShowSchema = z.object({
  title: z.string().trim().min(1),
  description: nullableTrimmedString,
  date: dateSchema,
  venue: z.string().trim().min(1),
  city: z.string().trim().min(1),
  capacity: z.number().int().nonnegative().nullable().optional().transform((value) => value ?? null),
  attendance: z.number().int().nonnegative().nullable().optional().transform((value) => value ?? null),
  highlight_link: z.string().trim().url().nullable().optional().transform((value) => value ?? null),
});

export const updatePastShowSchema = createPastShowSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const createVenuePartnershipSchema = z.object({
  name: z.string().trim().min(1),
  city: z.string().trim().min(1),
  capacity: z.string().trim().min(1).nullable().optional().transform((value) => value ?? null),
  type: z.string().trim().min(1),
  description: nullableTrimmedString,
  status: z.string().trim().min(1),
  status_type: statusTypeSchema,
  logo_url: z.string().trim().url().nullable().optional().transform((value) => value ?? null),
  contact_email: z.string().trim().email().nullable().optional().transform((value) => value ?? null),
});

export const updateVenuePartnershipSchema = createVenuePartnershipSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const createBlogPostSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: nullableTrimmedString,
  featured_image_url: z.string().trim().url().nullable().optional().transform((value) => value ?? null),
  status: blogStatusSchema.default("draft"),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export const updateLiveMetricsSchema = z.array(
  z.object({
    label: z.string().trim().min(1),
    value: z.string().trim().min(1),
    period: nullableTrimmedString,
    trend: nullableTrimmedString,
    trend_direction: trendDirectionSchema.nullable().optional().transform((value) => value ?? null),
  })
).min(1, "At least one metric is required");

export const idParamSchema = z.object({
  id: uuidSchema,
});

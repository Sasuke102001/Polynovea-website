import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { createBlogPostSchema } from "@/lib/api/validators";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image_url, status, published_at, created_at, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      throw error;
    }

    return sendSuccess(data ?? []);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  const authError = validateAdminKey(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const validatedData = createBlogPostSchema.parse(body);
    const payload = {
      ...validatedData,
      published_at: validatedData.status === "published" ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase.from("blog_posts").insert([payload]).select("*").single();

    if (error) {
      throw error;
    }

    return sendSuccess(data, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

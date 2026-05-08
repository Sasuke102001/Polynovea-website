import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendError, sendSuccess } from "@/lib/api/middleware";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const params = await context.params;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return sendError(`Blog post with slug '${params.slug}' not found`, 404);
    }

    return sendSuccess(data);
  } catch (error) {
    return handleRouteError(error);
  }
}

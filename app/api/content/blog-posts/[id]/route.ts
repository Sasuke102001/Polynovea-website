import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { idParamSchema, updateBlogPostSchema } from "@/lib/api/validators";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const slug = params.id;

    if (!slug) {
      return sendError("Blog post slug is required", 400);
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return sendError(`Published blog post with slug '${slug}' not found`, 404);
    }

    return sendSuccess(data);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authError = validateAdminKey(request);
  if (authError) {
    return authError;
  }

  try {
    const params = idParamSchema.parse(await context.params);
    const body = await request.json();
    const validatedData = updateBlogPostSchema.parse(body);

    const { data: existing, error: existingError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (existingError) {
      throw existingError;
    }

    if (!existing) {
      return sendError(`Blog post with id '${params.id}' not found`, 404);
    }

    const nextStatus = validatedData.status ?? existing.status;
    const payload = {
      ...validatedData,
      published_at:
        nextStatus === "published"
          ? existing.status === "published" && existing.published_at
            ? existing.published_at
            : new Date().toISOString()
          : null,
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return sendSuccess(data);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authError = validateAdminKey(request);
  if (authError) {
    return authError;
  }

  try {
    const params = idParamSchema.parse(await context.params);

    const { data: existing, error: fetchError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("id", params.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!existing) {
      return sendError(`Blog post with id '${params.id}' not found`, 404);
    }

    const { error } = await supabase.from("blog_posts").delete().eq("id", params.id);

    if (error) {
      throw error;
    }

    return sendSuccess({ id: params.id, deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}

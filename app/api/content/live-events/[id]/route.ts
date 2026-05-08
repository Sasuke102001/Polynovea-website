import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { idParamSchema, updateLiveEventSchema } from "@/lib/api/validators";

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authError = validateAdminKey(request);
  if (authError) {
    return authError;
  }

  try {
    const params = idParamSchema.parse(await context.params);
    const body = await request.json();
    const validatedData = updateLiveEventSchema.parse(body);

    const { data, error } = await supabase
      .from("live_events")
      .update(validatedData)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return sendError(`Event with id '${params.id}' not found`, 404);
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
      .from("live_events")
      .select("id")
      .eq("id", params.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!existing) {
      return sendError(`Event with id '${params.id}' not found`, 404);
    }

    const { error } = await supabase.from("live_events").delete().eq("id", params.id);

    if (error) {
      throw error;
    }

    return sendSuccess({ id: params.id, deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}

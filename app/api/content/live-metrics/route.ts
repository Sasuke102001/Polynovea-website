import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { updateLiveMetricsSchema } from "@/lib/api/validators";

export async function GET() {
  try {
    const { data, error } = await supabase.from("live_metrics").select("*").order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return sendSuccess(data ?? []);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PUT(request: NextRequest) {
  const authError = validateAdminKey(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const validatedData = updateLiveMetricsSchema.parse(body);

    const { error } = await supabase.from("live_metrics").upsert(validatedData, { onConflict: "label" });

    if (error) {
      throw error;
    }

    const { data, error: fetchError } = await supabase
      .from("live_metrics")
      .select("*")
      .order("id", { ascending: true });

    if (fetchError) {
      throw fetchError;
    }

    return sendSuccess(data ?? []);
  } catch (error) {
    return handleRouteError(error);
  }
}

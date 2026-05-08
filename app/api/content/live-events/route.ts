import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { createLiveEventSchema } from "@/lib/api/validators";

export async function GET() {
  try {
    const { data, error } = await supabase.from("live_events").select("*").order("date", { ascending: true });

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
    const validatedData = createLiveEventSchema.parse(body);

    const { data, error } = await supabase.from("live_events").insert([validatedData]).select("*").single();

    if (error) {
      throw error;
    }

    return sendSuccess(data, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

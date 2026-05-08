import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { createPastShowSchema } from "@/lib/api/validators";

export async function GET() {
  try {
    const { data, error } = await supabase.from("past_shows").select("*").order("date", { ascending: false });

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
    const validatedData = createPastShowSchema.parse(body);

    const { data, error } = await supabase.from("past_shows").insert([validatedData]).select("*").single();

    if (error) {
      throw error;
    }

    return sendSuccess(data, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

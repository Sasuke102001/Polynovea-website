import { NextRequest } from "next/server";
import supabase from "@/lib/api/supabase";
import { handleRouteError, sendSuccess, validateAdminKey } from "@/lib/api/middleware";
import { createVenuePartnershipSchema } from "@/lib/api/validators";

export async function GET(request: NextRequest) {
  try {
    const city = request.nextUrl.searchParams.get("city");
    let query = supabase.from("venue_partnerships").select("*");

    if (city) {
      query = query.eq("city", city);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

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
    const validatedData = createVenuePartnershipSchema.parse(body);

    const { data, error } = await supabase
      .from("venue_partnerships")
      .insert([validatedData])
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return sendSuccess(data, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

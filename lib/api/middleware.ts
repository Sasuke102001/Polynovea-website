import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ApiResponse } from "@/lib/api/types";

function timestamp() {
  return new Date().toISOString();
}

export function sendSuccess<T>(data: T, status = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: timestamp(),
  };

  return NextResponse.json(response, { status });
}

export function sendError(error: string, status = 500) {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    error,
    timestamp: timestamp(),
  };

  return NextResponse.json(response, { status });
}

export function validateAdminKey(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return sendError("Unauthorized", 401);
  }

  const token = authHeader.slice(7);
  if (token !== process.env.ADMIN_API_KEY) {
    return sendError("Invalid token", 401);
  }

  return null;
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    const issue = error.issues[0];
    return sendError(`Validation failed: ${issue?.message ?? "Invalid input"}`, 400);
  }

  if (error instanceof Error) {
    return sendError(error.message, 500);
  }

  return sendError("Internal server error", 500);
}

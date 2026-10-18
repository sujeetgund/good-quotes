import { checkRateLimit, rateLimitHeaders, rateLimitResponse, type RateLimitResult } from "@/lib/rate-limit";

export const API_ORIGIN = "good-quotes";

export async function enforceRateLimit(request: Request): Promise<{ blocked?: Response; result: RateLimitResult }> {
  const result = await checkRateLimit(request);
  return { result, blocked: result.allowed ? undefined : rateLimitResponse(result) };
}

export function apiRateHeaders(result: RateLimitResult) {
  return rateLimitHeaders(result);
}

export function jsonError(message: string, status: number, details?: Record<string, unknown>) {
  return Response.json(
    { error: { message, ...details } },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function jsonData<T>(data: T, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=60, s-maxage=300");
  }

  return Response.json({ data }, {
    ...init,
    headers,
  });
}

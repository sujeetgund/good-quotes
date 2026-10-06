import { mcpHandler } from "@/lib/mcp";
import { checkRateLimit, rateLimitHeaders, rateLimitResponse } from "@/lib/rate-limit";

async function handle(request: Request) {
  const rate = await checkRateLimit(request);
  if (!rate.allowed) return rateLimitResponse(rate);

  const response = await mcpHandler.fetch(request);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(rateLimitHeaders(rate))) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;

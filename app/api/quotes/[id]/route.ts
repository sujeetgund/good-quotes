import { apiRateHeaders, enforceRateLimit, jsonData, jsonError } from "@/lib/api";
import { getQuote } from "@/lib/quotes";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const rate = await enforceRateLimit(_request);
  if (rate.blocked) return rate.blocked;
  const { id } = await params;
  const quote = getQuote(id);
  return quote ? jsonData(quote, { headers: apiRateHeaders(rate.result) }) : jsonError("Quote not found.", 404);
}

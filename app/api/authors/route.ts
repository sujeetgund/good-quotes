import { apiRateHeaders, enforceRateLimit, jsonData } from "@/lib/api";
import { listAuthors } from "@/lib/quotes";

export async function GET(request: Request) {
  const rate = await enforceRateLimit(request);
  if (rate.blocked) return rate.blocked;
  return jsonData(listAuthors(), { headers: apiRateHeaders(rate.result) });
}

import { apiRateHeaders, enforceRateLimit, jsonData } from "@/lib/api";
import { listCategories } from "@/lib/quotes";

export async function GET(request: Request) {
  const rate = await enforceRateLimit(request);
  if (rate.blocked) return rate.blocked;
  return jsonData(listCategories(), { headers: apiRateHeaders(rate.result) });
}

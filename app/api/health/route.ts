import { apiRateHeaders, enforceRateLimit, jsonData } from "@/lib/api";
import { quoteCount } from "@/lib/quotes";

export async function GET(request: Request) {
  const rate = await enforceRateLimit(request);
  if (rate.blocked) return rate.blocked;
  return jsonData({ status: "ok", quoteCount: quoteCount(), service: "good-quotes" }, { headers: apiRateHeaders(rate.result) });
}

import { apiRateHeaders, enforceRateLimit, jsonData, jsonError } from "@/lib/api";
import { listQuotes, type QuoteFilters } from "@/lib/quotes";
import { quoteCategories, type QuoteCategory } from "@/lib/types";

const MAX_LIMIT = 100;

export async function GET(request: Request) {
  const rate = await enforceRateLimit(request);
  if (rate.blocked) return rate.blocked;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim().toLowerCase();
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 20), 1), MAX_LIMIT);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);

  if (category && !quoteCategories.includes(category as QuoteCategory)) {
    return jsonError("Unknown category.", 400, { categories: quoteCategories });
  }

  const filters: QuoteFilters = {
    query: searchParams.get("q") || undefined,
    author: searchParams.get("author") || undefined,
    category: category as QuoteCategory | undefined,
    tag: searchParams.get("tag") || undefined,
  };
  const matches = listQuotes(filters);
  const start = (page - 1) * limit;

  return jsonData({
    items: matches.slice(start, start + limit),
    meta: { page, limit, total: matches.length, pages: Math.ceil(matches.length / limit) },
  }, {
    headers: { "X-Total-Count": String(matches.length), ...apiRateHeaders(rate.result) },
  });
}

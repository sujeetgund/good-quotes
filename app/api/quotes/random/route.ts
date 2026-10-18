import { apiRateHeaders, enforceRateLimit, jsonData, jsonError } from "@/lib/api";
import { getRandomQuote } from "@/lib/quotes";
import { quoteCategories, type QuoteCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const rate = await enforceRateLimit(request);
  if (rate.blocked) return rate.blocked;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim().toLowerCase();

  if (category && !quoteCategories.includes(category as QuoteCategory)) {
    return jsonError("Unknown category.", 400, { categories: quoteCategories });
  }

  const quote = getRandomQuote({
    query: searchParams.get("q") || undefined,
    author: searchParams.get("author") || undefined,
    category: category as QuoteCategory | undefined,
    tag: searchParams.get("tag") || undefined,
  });

  return quote
    ? jsonData(quote, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          ...apiRateHeaders(rate.result),
        },
      })
    : jsonError("No quote matched those filters.", 404);
}

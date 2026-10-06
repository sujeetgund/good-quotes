import { describe, expect, test } from "vitest";
import { getQuote, listQuotes, quoteCount } from "@/lib/quotes";

describe("quote service", () => {
  test("contains a stable non-empty catalog", () => {
    expect(quoteCount()).toBeGreaterThan(40);
    expect(getQuote("aurelius-001")?.author).toBe("Marcus Aurelius");
  });

  test("filters by query, category, and tag", () => {
    const results = listQuotes({ query: "mind", category: "wisdom" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((quote) => quote.category === "wisdom")).toBe(true);
    expect(results.some((quote) => quote.tags.includes("mind"))).toBe(true);
  });

  test("matches authors case-insensitively", () => {
    const results = listQuotes({ author: "marcus aurelius" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((quote) => quote.author === "Marcus Aurelius")).toBe(true);
  });

  test("returns no results for an unknown query", () => {
    expect(listQuotes({ query: "not-a-real-quote-term" })).toEqual([]);
  });
});

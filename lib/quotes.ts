import { quotes } from "@/data/quotes";
import type { Quote, QuoteCategory } from "@/lib/types";

export type QuoteFilters = {
  query?: string;
  author?: string;
  category?: QuoteCategory;
  tag?: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function listQuotes(filters: QuoteFilters = {}): Quote[] {
  const query = filters.query ? normalize(filters.query) : "";
  const author = filters.author ? normalize(filters.author) : "";
  const tag = filters.tag ? normalize(filters.tag) : "";

  return quotes.filter((quote) => {
    const searchable = `${quote.text} ${quote.author} ${quote.source} ${quote.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesAuthor = !author || normalize(quote.author) === author;
    const matchesCategory = !filters.category || quote.category === filters.category;
    const matchesTag = !tag || quote.tags.some((item) => normalize(item) === tag);
    return matchesQuery && matchesAuthor && matchesCategory && matchesTag;
  });
}

export function getQuote(id: string) {
  return quotes.find((quote) => quote.id === id);
}

export function getRandomQuote(filters: QuoteFilters = {}) {
  const matches = listQuotes(filters);
  if (matches.length === 0) return undefined;
  return matches[Math.floor(Math.random() * matches.length)];
}

export function listAuthors() {
  return [...new Set(quotes.map((quote) => quote.author))].sort((a, b) => a.localeCompare(b));
}

export function listCategories() {
  return [...new Set(quotes.map((quote) => quote.category))].sort();
}

export function quoteCount() {
  return quotes.length;
}

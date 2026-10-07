"use client";

import { Check, Copy, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Quote } from "@/lib/types";

type QuoteResponse = {
  data: {
    items: Quote[];
    meta: { page: number; pages: number; total: number };
  };
};

const CATEGORIES = [
  { id: "", label: "All" },
  { id: "life", label: "Life" },
  { id: "wisdom", label: "Wisdom" },
  { id: "courage", label: "Courage" },
  { id: "discipline", label: "Discipline" },
  { id: "creativity", label: "Creativity" },
  { id: "kindness", label: "Kindness" },
  { id: "work", label: "Work" },
  { id: "change", label: "Change" },
];

export default function QuotesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ limit: "12", page: String(page) });
        if (query.trim()) params.set("q", query.trim());
        if (category) params.set("category", category);
        const response = await fetch(`/api/quotes?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("The collection could not be loaded.");
        const payload = (await response.json()) as QuoteResponse;
        setQuotes(payload.data.items);
        setTotal(payload.data.meta.total);
        setPages(payload.data.meta.pages);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(requestError instanceof Error ? requestError.message : "The collection could not be loaded.");
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [category, page, query]);

  function copyQuote(quote: Quote) {
    void navigator.clipboard.writeText(`“${quote.text}” — ${quote.author}`);
    setCopiedId(quote.id);
    window.setTimeout(() => setCopiedId(""), 1600);
  }

  function updateCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#181818] text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="max-w-3xl min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#da291c]">
            Browse the collection
          </p>
          <h1 className="mt-3 sm:mt-5 text-3xl sm:text-5xl lg:text-7xl font-medium tracking-[-0.04em] break-words">
            Find a line with some weight.
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed sm:leading-8 text-[#969696]">
            Search by idea, author, or category. Every entry carries its source and provenance.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 sm:mt-14 border-y border-white/10 py-5 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#666]" />
              <Input
                aria-label="Search quotes"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search words, authors, or ideas"
                className="h-12 w-full rounded-none border-white/15 bg-[#242424] pl-11 pr-10 text-base sm:text-sm text-white placeholder:text-[#666] focus-visible:border-[#da291c] focus-visible:ring-1 focus-visible:ring-[#da291c]"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center text-[#666] hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <select
              aria-label="Filter by category"
              value={category}
              onChange={(event) => updateCategory(event.target.value)}
              className="h-12 w-full border border-white/15 bg-[#242424] px-4 text-base sm:text-sm text-white outline-none focus:border-[#da291c] lg:w-56"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id === "" ? "All categories" : cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Category Quick Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666] pr-1 shrink-0">
              Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateCategory(cat.id)}
                  className={`shrink-0 min-h-[36px] px-3 text-xs uppercase tracking-[0.12em] transition-colors ${
                    isSelected
                      ? "bg-[#da291c] text-white font-semibold"
                      : "bg-[#242424] text-[#969696] hover:bg-[#303030] hover:text-white border border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Meta */}
        <div className="mt-6 sm:mt-8 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#666]">
          <span>{total} {total === 1 ? "quote" : "quotes"} found</span>
          <span>Page {page} of {pages}</span>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-6 rounded-none border-[#da291c]">
            <AlertTitle>Could not load quotes</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Quote Grid / Loading / Empty */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="rounded-none border-0 bg-[#242424]">
                <CardContent className="flex min-h-60 flex-col justify-between p-5 sm:p-6">
                  <div className="flex flex-col gap-3">
                    <div className="h-4 w-20 animate-pulse bg-[#3a3a3a]" />
                    <div className="h-20 w-full animate-pulse bg-[#303030]" />
                  </div>
                  <div className="h-4 w-32 animate-pulse bg-[#3a3a3a]" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="mt-6 border border-white/10 bg-[#242424] p-10 sm:p-14 text-center">
            <p className="text-base text-white">No quotes match those filters.</p>
            <p className="mt-2 text-sm text-[#969696]">Try clearing your search query or selecting a different category.</p>
            <Button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
                setPage(1);
              }}
              variant="outline"
              className="mt-6 h-11 rounded-none border-white/20 bg-transparent px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <Card key={quote.id} className="rounded-none border-0 bg-[#242424]">
                <CardHeader className="gap-3 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className="rounded-full border-white/20 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[#b7b7b7]"
                    >
                      {quote.category}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      aria-label={`Copy quote by ${quote.author}`}
                      onClick={() => copyQuote(quote)}
                      className="size-11 sm:size-9 rounded-none text-[#969696] hover:bg-white/10 hover:text-white"
                    >
                      {copiedId === quote.id ? (
                        <Check className="size-4 text-[#03904a]" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-medium leading-snug sm:leading-7 tracking-[-0.02em] text-white break-words">
                    “{quote.text}”
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 p-5 pt-0 sm:p-6 sm:pt-0 text-sm text-[#969696] min-w-0">
                  <span className="font-medium text-white sm:text-[#969696] truncate">{quote.author}</span>
                  <span className="truncate max-w-[180px] sm:max-w-none text-xs text-[#666]">{quote.source}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Separator className="mt-8 sm:mt-10 bg-white/10" />
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[#666]">
            Showing {quotes.length > 0 ? (page - 1) * 12 + 1 : 0}–{Math.min(page * 12, total)} of {total} entries
          </p>
          <div className="flex w-full sm:w-auto gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={page <= 1}
              onClick={() => {
                setPage((val) => val - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="h-12 flex-1 sm:flex-initial rounded-none border-white/20 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10 disabled:opacity-30"
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={page >= pages}
              onClick={() => {
                setPage((val) => val + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="h-12 flex-1 sm:flex-initial rounded-none border-white/20 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10 disabled:opacity-30"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

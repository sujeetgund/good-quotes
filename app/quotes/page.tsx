"use client";
import Link from "next/link";
import { Check, Copy, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Quote } from "@/lib/types";
type QuoteResponse = { data: { items: Quote[]; meta: { page: number; pages: number; total: number } } };
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
      setLoading(true); setError("");
      try {
        const params = new URLSearchParams({ limit: "12", page: String(page) });
        if (query.trim()) params.set("q", query.trim());
        if (category) params.set("category", category);
        const response = await fetch(`/api/quotes?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("The collection could not be loaded.");
        const payload = (await response.json()) as QuoteResponse;
        setQuotes(payload.data.items); setTotal(payload.data.meta.total); setPages(payload.data.meta.pages);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(requestError instanceof Error ? requestError.message : "The collection could not be loaded.");
      } finally { setLoading(false); }
    }, 250);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [category, page, query]);
  function copyQuote(quote: Quote) { void navigator.clipboard.writeText(`“${quote.text}” — ${quote.author}`); setCopiedId(quote.id); window.setTimeout(() => setCopiedId(""), 1600); }
  function updateCategory(value: string) { setCategory(value); setPage(1); }
  return (
    <main className="min-h-screen bg-[#181818] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-white/10 px-6 lg:px-10"><Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">Good Quotes</Link><Link href="/docs" className="text-xs uppercase tracking-[0.14em] text-[#969696] hover:text-white">API docs</Link></nav>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.18em] text-[#da291c]">Browse the collection</p><h1 className="mt-5 text-5xl font-medium tracking-[-0.045em] sm:text-7xl">Find a line with some weight.</h1><p className="mt-6 text-lg leading-8 text-[#969696]">Search by idea, author, or category. Every entry carries its source and provenance.</p></div>
        <div className="mt-14 flex flex-col gap-3 border-y border-white/10 py-5 lg:flex-row"><div className="relative flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><Input aria-label="Search quotes" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search words, authors, or ideas" className="h-12 rounded-none border-white/15 bg-[#242424] pl-11 text-white placeholder:text-[#666]" /></div><select aria-label="Filter by category" value={category} onChange={(event) => updateCategory(event.target.value)} className="h-12 border border-white/15 bg-[#242424] px-4 text-sm text-white outline-none focus:border-[#da291c] lg:w-56"><option value="">All categories</option><option value="life">Life</option><option value="wisdom">Wisdom</option><option value="courage">Courage</option><option value="discipline">Discipline</option><option value="creativity">Creativity</option><option value="kindness">Kindness</option><option value="work">Work</option><option value="change">Change</option></select></div>
        <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#666]"><span>{total} {total === 1 ? "quote" : "quotes"}</span><span>Page {page} of {pages}</span></div>
        {error ? <Alert variant="destructive" className="mt-6 rounded-none"><AlertTitle>Could not load quotes</AlertTitle><AlertDescription>{error}</AlertDescription></Alert> : null}
        {loading ? <div className="mt-6 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Card key={index} className="rounded-none border-0 bg-[#242424]"><CardContent className="flex min-h-64 flex-col justify-between p-6"><div className="flex flex-col gap-3"><div className="h-4 w-20 animate-pulse bg-[#3a3a3a]" /><div className="h-20 w-full animate-pulse bg-[#303030]" /></div><div className="h-4 w-32 animate-pulse bg-[#3a3a3a]" /></CardContent></Card>)}</div> : quotes.length === 0 ? <div className="mt-6 border border-white/10 p-12 text-center text-[#969696]">No quotes match those filters.</div> : <div className="mt-6 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{quotes.map((quote) => <Card key={quote.id} className="rounded-none border-0 bg-[#242424]"><CardHeader className="gap-4 p-6"><div className="flex items-center justify-between gap-3"><Badge variant="outline" className="rounded-full border-white/20 uppercase tracking-[0.14em] text-[#b7b7b7]">{quote.category}</Badge><Button type="button" variant="ghost" size="icon-sm" aria-label={`Copy quote by ${quote.author}`} onClick={() => copyQuote(quote)} className="text-[#969696] hover:bg-white/10 hover:text-white">{copiedId === quote.id ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}</Button></div><CardTitle className="text-xl font-medium leading-7 tracking-[-0.02em] text-white">“{quote.text}”</CardTitle></CardHeader><CardContent className="flex items-end justify-between gap-3 p-6 pt-0 text-sm text-[#969696]"><span>{quote.author}</span><span className="truncate text-right text-xs text-[#666]">{quote.source}</span></CardContent></Card>)}</div>}
        <Separator className="mt-10 bg-white/10" /><div className="mt-6 flex justify-end gap-3"><Button type="button" variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="h-10 rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">Previous</Button><Button type="button" variant="outline" disabled={page >= pages} onClick={() => setPage((value) => value + 1)} className="h-10 rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">Next</Button></div>
      </div>
    </main>
  );
}

"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Quote } from "@/lib/types";

export function QuoteShowcase({ initialQuote }: { initialQuote: Quote }) {
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function getAnotherQuote() {
    setLoading(true);
    setCopied(false);
    try {
      const response = await fetch("/api/quotes/random", { cache: "no-store" });
      if (response.ok) {
        const payload = (await response.json()) as { data: Quote };
        setQuote(payload.data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function copyQuote() {
    await navigator.clipboard.writeText(`“${quote.text}” — ${quote.author}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="border border-white/10 bg-[#242424] p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <Badge variant="outline" className="rounded-full border-white/20 uppercase tracking-[0.16em] text-[#b7b7b7]">{quote.category}</Badge>
        <span className="text-xs uppercase tracking-[0.16em] text-[#666]">{quote.source}</span>
      </div>
      <blockquote className="mt-12 max-w-3xl text-3xl font-medium leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl">“{quote.text}”</blockquote>
      <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#969696]">{quote.author}</p>
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="h-11 rounded-none border-white/20 bg-transparent px-4 uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white" onClick={copyQuote}>
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button type="button" className="h-11 rounded-none bg-[#da291c] px-4 uppercase tracking-[0.12em] text-white hover:bg-[#b01e0a]" onClick={getAnotherQuote} disabled={loading}>
            <RefreshCw data-icon="inline-start" className={loading ? "animate-spin" : undefined} />
            {loading ? "Finding" : "Another"}
          </Button>
        </div>
      </div>
    </div>
  );
}

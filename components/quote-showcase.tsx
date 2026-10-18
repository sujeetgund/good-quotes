"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
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
      const response = await fetch(`/api/quotes/random?t=${Date.now()}`, { cache: "no-store" });
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
    <div className="w-full min-w-0 overflow-hidden border border-white/10 bg-[#242424] p-4 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between gap-3">
        <Badge
          variant="outline"
          className="rounded-full border-white/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#b7b7b7]"
        >
          {quote.category}
        </Badge>
        <span className="max-w-[160px] sm:max-w-xs truncate text-right text-xs uppercase tracking-[0.16em] text-[#666]">
          {quote.source}
        </span>
      </div>

      <blockquote className="mt-6 sm:mt-12 max-w-3xl break-words text-xl sm:text-4xl lg:text-5xl font-medium leading-[1.25] tracking-[-0.03em] text-white">
        “{quote.text}”
      </blockquote>

      <div className="mt-8 sm:mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white sm:text-[#969696]">{quote.author}</p>
          <p className="text-xs text-[#666] sm:hidden truncate">{quote.source}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full sm:w-auto rounded-none border-white/20 bg-transparent px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10 hover:text-white"
            onClick={copyQuote}
          >
            {copied ? (
              <Check className="mr-2 size-4 text-[#03904a] sm:text-white" />
            ) : (
              <Copy className="mr-2 size-4" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </Button>

          <Button
            type="button"
            className="h-12 w-full sm:w-auto rounded-none bg-[#da291c] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#b01e0a]"
            onClick={getAnotherQuote}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 size-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Finding..." : "Another"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

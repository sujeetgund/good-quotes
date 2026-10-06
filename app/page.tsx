import Link from "next/link";
import { ArrowUpRight, Braces, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteShowcase } from "@/components/quote-showcase";
import { quotes } from "@/data/quotes";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#181818] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-white/10 px-6 lg:px-10">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">Good Quotes</Link>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.14em] text-[#969696]">
          <Link href="/quotes" className="transition-colors hover:text-white">Browse</Link>
          <Link href="/docs" className="transition-colors hover:text-white">Docs</Link>
          <Link href="/docs#mcp" className="transition-colors hover:text-white">MCP</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[#da291c]">A small service for better words</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Good quotes, ready for your next idea.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#969696]">A curated, source-aware quote API and MCP server. No keys. No ceremony. Just a useful line when your product, prompt, or morning needs one.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/quotes" />} className="h-12 rounded-none bg-[#da291c] px-6 uppercase tracking-[0.14em] text-white hover:bg-[#b01e0a]">Find a quote <ArrowUpRight data-icon="inline-end" /></Button>
            <Button nativeButton={false} render={<Link href="/docs" />} variant="outline" className="h-12 rounded-none border-white/25 bg-transparent px-6 uppercase tracking-[0.14em] text-white hover:bg-white/10 hover:text-white">Read the API <ArrowUpRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div><p className="text-xs uppercase tracking-[0.18em] text-[#666]">The collection</p><h2 className="mt-3 text-3xl font-medium tracking-[-0.03em]">A thought worth keeping.</h2></div>
          <span className="hidden text-xs uppercase tracking-[0.14em] text-[#666] sm:block">{quotes.length} curated entries</span>
        </div>
        <QuoteShowcase initialQuote={quotes[0]} />
      </section>

      <section id="api" className="border-y border-white/10 bg-[#f7f7f7] text-[#181818]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <div><p className="text-xs uppercase tracking-[0.18em] text-[#666]">Built for builders</p><h2 className="mt-4 text-4xl font-medium tracking-[-0.04em]">One endpoint away from a better answer.</h2><p className="mt-5 max-w-md leading-7 text-[#666]">Fetch a random quote, search the collection, or filter by author, category, and tag. The response stays small, predictable, and easy to cache.</p></div>
          <div className="border border-[#d2d2d2] bg-white p-6 font-mono text-sm"><div className="flex items-center gap-3 text-[#666]"><Braces size={16} /> GET /api/quotes/random</div><pre className="mt-6 overflow-x-auto leading-7 text-[#181818]">{`{
  "data": {
    "text": "The secret of getting ahead is getting started.",
    "author": "Mark Twain",
    "category": "work"
  }
}`}</pre></div>
        </div>
      </section>

      <section id="mcp" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div><div className="flex items-center gap-3 text-[#da291c]"><Radio size={16} /><span className="text-xs uppercase tracking-[0.18em]">MCP ready</span></div><h2 className="mt-5 text-4xl font-medium tracking-[-0.04em]">Give your agents a better source of inspiration.</h2></div>
        <p className="max-w-xl self-end text-lg leading-8 text-[#969696]">The same curated collection will be available through a small set of focused MCP tools. Start with random, search, and lookup; add auth only when the public service needs it.</p>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs uppercase tracking-[0.14em] text-[#666] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row"><span>Good Quotes</span><div className="flex gap-5"><Link href="/quotes" className="hover:text-white">Collection</Link><Link href="/docs" className="hover:text-white">Documentation</Link><span>Open collection · 2026</span></div></div></footer>
    </main>
  );
}

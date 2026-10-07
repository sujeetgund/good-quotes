import Link from "next/link";
import { ArrowUpRight, Braces, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { QuoteShowcase } from "@/components/quote-showcase";
import { quotes } from "@/data/quotes";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#181818] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="max-w-4xl min-w-0">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#da291c]">
            A small service for better words
          </p>
          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.08] sm:leading-[1.05] tracking-[-0.04em] break-words">
            Good quotes, ready for your next idea.
          </h1>
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-relaxed sm:leading-8 text-[#969696]">
            A curated, source-aware quote API and MCP server. No keys. No
            ceremony. Just a useful line when your product, prompt, or morning
            needs one.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/quotes" />}
              className="h-12 w-full sm:w-auto rounded-none bg-[#da291c] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#b01e0a] justify-center"
            >
              <span>Find a quote</span>
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/docs" />}
              variant="outline"
              className="h-12 w-full sm:w-auto rounded-none border-white/25 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10 hover:text-white justify-center"
            >
              <span>Read the API</span>
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Showcase Section */}
      <section
        id="quote"
        className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32"
      >
        <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#666]">
              The collection
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.03em]">
              A thought worth keeping.
            </h2>
          </div>
          <span className="text-xs uppercase tracking-[0.14em] text-[#666]">
            {quotes.length} curated entries
          </span>
        </div>
        <QuoteShowcase initialQuote={quotes[0]} />
      </section>

      {/* REST API Section */}
      <section
        id="api"
        className="w-full overflow-hidden border-y border-white/10 bg-[#f7f7f7] text-[#181818]"
      >
        <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-[#666]">
              Built for builders
            </p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-medium tracking-[-0.04em] break-words">
              One endpoint away from a better answer.
            </h2>
            <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed text-[#666]">
              Fetch a random quote, search the collection, or filter by author,
              category, and tag. The response stays small, predictable, and easy
              to cache.
            </p>
            <div className="mt-6">
              <Button
                nativeButton={false}
                render={<Link href="/docs" />}
                variant="outline"
                className="h-11 w-full sm:w-auto rounded-none border-[#181818]/25 bg-transparent px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#181818] hover:bg-[#181818] hover:text-white justify-center"
              >
                <span>Full API Documentation</span>
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="w-full min-w-0 overflow-hidden border border-[#d2d2d2] bg-white p-4 sm:p-6 font-mono text-xs sm:text-sm shadow-sm">
            <div className="flex items-center gap-2 text-[#666] border-b border-[#ebebeb] pb-3">
              <Braces className="size-4 text-[#da291c] shrink-0" />
              <span className="font-semibold text-[#181818]">GET</span>
              <span className="text-[#666] truncate">/api/quotes/random</span>
            </div>
            <pre className="mt-4 w-full overflow-x-auto text-[11px] sm:text-xs md:text-sm leading-relaxed text-[#181818] [scrollbar-width:thin]">
              <code>{`{
  "data": {
    "text": "The secret of getting ahead is getting started.",
    "author": "Mark Twain",
    "category": "work"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section
        id="mcp"
        className="mx-auto w-full max-w-7xl min-w-0 grid gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-28"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[#da291c]">
            <Radio className="size-4 shrink-0" />
            <span className="text-xs uppercase tracking-[0.18em]">
              MCP ready
            </span>
          </div>
          <h2 className="mt-3 sm:mt-5 text-2xl sm:text-4xl font-medium tracking-[-0.04em] break-words">
            Give your agents a better source of inspiration.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-5 min-w-0">
          <p className="max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-[#969696]">
            The same curated collection is available through a focused Model
            Context Protocol server. Start with random quotes, search, and
            lookup in your AI agent with zero setup friction.
          </p>
          <div>
            <Button
              nativeButton={false}
              render={<Link href="/docs#mcp" />}
              className="h-11 w-full sm:w-auto rounded-none bg-[#da291c] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#b01e0a] justify-center"
            >
              <span>Setup MCP for your Agent</span>
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

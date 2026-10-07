import Link from "next/link";
import { ArrowUpRight, Braces, Terminal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { McpSetup } from "@/components/mcp-setup";
import { BrandLogos } from "@/components/brand-logos";
import { CopyCode } from "@/components/copy-code";

export default function DocsPage() {
  const sections = [
    { id: "rest", label: "REST API" },
    { id: "mcp", label: "MCP Setup" },
    { id: "mcp-tools", label: "MCP Tools" },
    { id: "limits", label: "Limits & Attribution" },
  ];

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#181818] text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="max-w-3xl min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#da291c]">
            Documentation
          </p>
          <h1 className="mt-3 sm:mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-7xl break-words">
            A quiet API for useful words.
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed sm:leading-8 text-[#969696]">
            Public for now. No API key required. Responses are small,
            source-aware, and designed to be called from a product or an agent.
          </p>
        </div>

        {/* Mobile Quick-Jump Nav (Sticky below navbar on mobile) */}
        <div className="sticky top-16 z-30 -mx-4 mt-8 border-y border-white/10 bg-[#181818]/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666] shrink-0 pr-1">
              Jump:
            </span>
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="shrink-0 min-h-[36px] flex items-center border border-white/10 bg-[#242424] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#969696] hover:border-white/25 hover:text-white"
              >
                {sec.label}
              </a>
            ))}
          </div>
        </div>

        {/* Docs Layout */}
        <div className="mt-12 sm:mt-16 grid w-full min-w-0 gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          {/* Desktop Sticky Table of Contents */}
          <aside className="hidden lg:block text-sm text-[#969696]">
            <div className="sticky top-28 flex flex-col gap-4 border-l border-white/10 pl-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#666]">
                Contents
              </span>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="py-1 transition-colors hover:text-white"
                >
                  {sec.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Docs Content */}
          <div className="w-full max-w-3xl min-w-0 space-y-16 sm:space-y-24">
            {/* REST API Section */}
            <section id="rest" className="scroll-mt-28">
              <div className="flex items-center gap-2.5 text-[#da291c]">
                <Braces className="size-4 shrink-0" />
                <span className="text-xs uppercase tracking-[0.18em]">
                  REST API
                </span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-[-0.03em]">
                Read-only endpoints
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#969696]">
                All endpoints return JSON wrapped under a top-level{" "}
                <code className="font-mono text-white">data</code> property.
                Quote lists include pagination metadata.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#969696]">
                    Random quote
                  </p>
                  <CopyCode
                    value="curl https://good-quotes.sujeetgund.in/api/quotes/random"
                    label="cURL Command"
                    context="Fetch a single random quote with full attribution:"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#969696]">
                    Search, filter & taxonomy
                  </p>
                  <CopyCode
                    value={`GET /api/quotes?q=focus&category=work&limit=20&page=1
GET /api/quotes/:id
GET /api/authors
GET /api/categories`}
                    label="Endpoints"
                    context="Standard queryable endpoints for your application:"
                  />
                </div>
              </div>
            </section>

            {/* MCP Setup Section */}
            <section
              id="mcp"
              className="scroll-mt-28 border-t border-white/10 pt-12 sm:pt-16"
            >
              <div className="flex items-center gap-2.5 text-[#da291c]">
                <Terminal className="size-4 shrink-0" />
                <span className="text-xs uppercase tracking-[0.18em]">
                  MCP Setup
                </span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-[-0.03em]">
                Connect Good Quotes to your agent.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#969696]">
                Bring curated quotes into Cursor, Claude Code, OpenAI Codex, or
                any MCP-compatible agent. No keys required.
              </p>

              <McpSetup />
              <BrandLogos />
            </section>

            {/* Limits & Attribution Section */}
            <section
              id="limits"
              className="scroll-mt-28 border-t border-white/10 pt-12 sm:pt-16"
            >
              <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em]">
                Limits & attribution
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#969696]">
                The public service is rate-limited globally (sliding window per
                IP). Quote records include author, source, and license metadata.
                Please preserve that attribution when displaying a quote in your
                product or agent outputs.
              </p>

              <div className="mt-8">
                <Link
                  href="/quotes"
                  className="inline-flex min-h-12 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:text-[#da291c]"
                >
                  <span>Explore the collection</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight, Braces, Terminal } from "lucide-react";
import { McpSetup } from "@/components/mcp-setup";
import { CopyCode } from "@/components/copy-code";
export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#181818] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-white/10 px-6 lg:px-10"><Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">Good Quotes</Link><Link href="/quotes" className="text-xs uppercase tracking-[0.14em] text-[#969696] hover:text-white">Browse quotes</Link></nav>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.18em] text-[#da291c]">Documentation</p><h1 className="mt-5 text-5xl font-medium tracking-[-0.045em] sm:text-7xl">A quiet API for useful words.</h1><p className="mt-6 text-lg leading-8 text-[#969696]">Public for now. No API key required. Responses are small, source-aware, and designed to be called from a product or an agent.</p></div>
        <div className="mt-20 grid gap-16 lg:grid-cols-[0.7fr_1.3fr]"><aside className="text-sm text-[#969696]"><div className="sticky top-8 flex flex-col gap-4"><a href="#rest" className="text-white">REST API</a><a href="#mcp" className="hover:text-white">MCP setup</a><a href="#mcp-tools" className="hover:text-white">MCP tools</a><a href="#limits" className="hover:text-white">Limits & attribution</a></div></aside><div className="max-w-3xl">
          <section id="rest"><div className="flex items-center gap-3 text-[#da291c]"><Braces size={16} /><span className="text-xs uppercase tracking-[0.18em]">REST API</span></div><h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">Read-only endpoints</h2><p className="mt-5 leading-7 text-[#969696]">All endpoints return JSON under a top-level <code className="text-white">data</code> property. Quote lists include pagination metadata.</p><div className="mt-8 flex flex-col gap-5"><div><p className="mb-2 text-sm text-[#969696]">Random quote</p><CopyCode value="curl https://good-quotes.sujeetgund.in/api/quotes/random" label="random quote endpoint" /></div><div><p className="mb-2 text-sm text-[#969696]">Search and filter</p><CopyCode value={'GET /api/quotes?q=focus&category=work&limit=20&page=1\nGET /api/quotes/:id\nGET /api/authors\nGET /api/categories'} label="REST API endpoints" /></div></div></section>
          <section id="mcp" className="mt-24 border-t border-white/10 pt-16"><div className="flex items-center gap-3 text-[#da291c]"><Terminal size={16} /><span className="text-xs uppercase tracking-[0.18em]">MCP setup</span></div><h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">Connect Good Quotes to your agent.</h2><p className="mt-5 leading-7 text-[#969696]">No API key required.</p><McpSetup /></section>
          <section id="limits" className="mt-24 border-t border-white/10 pt-16"><h2 className="text-3xl font-medium tracking-[-0.03em]">Limits & attribution</h2><p className="mt-5 leading-7 text-[#969696]">The public service is rate-limited globally. Quote records include author, source, and license metadata. Please preserve that attribution when displaying a quote in your product.</p><Link href="/quotes" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-white hover:text-[#da291c]">Explore the collection <ArrowUpRight size={16} /></Link></section>
        </div></div>
      </div>
    </main>
  );
}

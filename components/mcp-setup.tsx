"use client";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClaudeMark, CodexMark, CursorMark } from "@/components/brand-logos";
import { CopyCode } from "@/components/copy-code";

const endpoint = "https://good-quotes.sujeetgund.in/mcp";
const cursorConfig = [
  "{",
  '  "mcpServers": {',
  '    "good-quotes": {',
  `      "url": "${endpoint}"`,
  "    }",
  "  }",
  "}",
].join("\n");

export function McpSetup() {
  return (
    <div className="mt-10 space-y-10">
      <div className="border border-white/10 bg-[#202020] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Terminal className="mt-1 text-[#da291c]" size={18} />
          <div>
            <p className="text-sm font-medium text-white">MCP endpoint</p>
          </div>
        </div>
        <CopyCode value={endpoint} label="MCP endpoint" context={"Paste this URL into your MCP client's server URL field."} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-white/25 text-[#b7b7b7]">Streamable HTTP</Badge>
          <Badge variant="outline" className="border-white/25 text-[#b7b7b7]">No auth</Badge>
          <Badge variant="outline" className="border-white/25 text-[#b7b7b7]">Rate limited</Badge>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#666]">Choose your client</p>
        <Tabs defaultValue="codex" className="mt-4">
          <TabsList variant="line" className="w-full justify-start gap-2 overflow-x-auto overflow-y-hidden border-b border-white/10 p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsTrigger value="codex" className="min-w-36 flex-none rounded-none border border-white/10 bg-[#202020] px-4 py-3 text-[#969696] hover:border-white/25 hover:bg-[#242424] hover:text-white data-active:border-[#da291c] data-active:bg-[#da291c]/10 data-active:text-white data-active:shadow-[inset_0_-2px_0_#da291c] after:hidden" aria-label="Codex setup"><CodexMark data-icon="inline-start" />Codex</TabsTrigger>
            <TabsTrigger value="claude" className="min-w-36 flex-none rounded-none border border-white/10 bg-[#202020] px-4 py-3 text-[#969696] hover:border-white/25 hover:bg-[#242424] hover:text-white data-active:border-[#da291c] data-active:bg-[#da291c]/10 data-active:text-white data-active:shadow-[inset_0_-2px_0_#da291c] after:hidden" aria-label="Claude Code setup"><ClaudeMark data-icon="inline-start" />Claude Code</TabsTrigger>
            <TabsTrigger value="cursor" className="min-w-36 flex-none rounded-none border border-white/10 bg-[#202020] px-4 py-3 text-[#969696] hover:border-white/25 hover:bg-[#242424] hover:text-white data-active:border-[#da291c] data-active:bg-[#da291c]/10 data-active:text-white data-active:shadow-[inset_0_-2px_0_#da291c] after:hidden" aria-label="Cursor setup"><CursorMark data-icon="inline-start" />Cursor</TabsTrigger>
          </TabsList>
          <TabsContent value="codex" className="pt-5">
            <CopyCode value={`codex mcp add good-quotes --url ${endpoint}`} label="Codex command" context="Run this in your terminal." />
          </TabsContent>
          <TabsContent value="claude" className="pt-5">
            <CopyCode value={`claude mcp add --transport http good-quotes ${endpoint}`} label="Claude Code command" context="Run this in your terminal." />
          </TabsContent>
          <TabsContent value="cursor" className="pt-5">
            <CopyCode value={cursorConfig} label="Cursor configuration" context="Paste this into Cursor Settings → MCP as a global server." />
          </TabsContent>
        </Tabs>
      </div>

      <div id="mcp-tools" className="border border-white/10 bg-[#202020] p-5 sm:p-6">
        <p className="text-sm font-medium text-white">MCP tools</p>
        <p className="mt-4 text-sm text-[#969696]">Available tools</p>
        <code className="mt-2 block font-mono text-sm leading-7 text-white">get_random_quote<br />search_quotes<br />get_quote<br />list_categories<br />list_authors</code>
      </div>

      <Alert className="rounded-none border-white/10 bg-[#242424] text-[#969696]">
        <AlertTitle className="text-white">Troubleshooting</AlertTitle>
        <AlertDescription>Use a URL ending in <code className="text-white">/mcp</code>. <code className="text-white">429</code> means the global rate limit was reached. No API key is required.</AlertDescription>
      </Alert>
    </div>
  );
}

"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

const mcpTools = [
  { name: "get_random_quote", desc: "Fetch a random quote with attribution" },
  { name: "search_quotes", desc: "Filter by keywords, categories, or author" },
  { name: "get_quote", desc: "Retrieve a specific entry by its ID" },
  { name: "list_categories", desc: "Explore available taxonomy categories" },
  { name: "list_authors", desc: "Inspect all curated authors in index" },
];

export function McpSetup() {
  return (
    <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
      <CopyCode
        value={endpoint}
        label="Endpoint URL"
        context="Paste this URL directly into your MCP client configuration:"
      />

      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#666]">
          Choose your client
        </p>
        <Tabs defaultValue="codex" className="mt-3">
          <TabsList
            className="grid grid-cols-3 sm:flex sm:justify-start gap-1.5 sm:gap-2 border-b border-white/10 pb-3"
          >
            <TabsTrigger
              value="codex"
              className="h-12 px-2.5 sm:px-6 text-xs sm:text-sm"
              aria-label="Codex setup"
            >
              <CodexMark className="size-4 shrink-0" />
              <span className="truncate">Codex</span>
            </TabsTrigger>
            <TabsTrigger
              value="claude"
              className="h-12 px-2.5 sm:px-6 text-xs sm:text-sm"
              aria-label="Claude Code setup"
            >
              <ClaudeMark className="size-4 shrink-0" />
              <span className="truncate">Claude</span>
            </TabsTrigger>
            <TabsTrigger
              value="cursor"
              className="h-12 px-2.5 sm:px-6 text-xs sm:text-sm"
              aria-label="Cursor setup"
            >
              <CursorMark className="size-4 shrink-0" />
              <span className="truncate">Cursor</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="codex" className="pt-4 sm:pt-5">
            <CopyCode
              value={`codex mcp add good-quotes --url ${endpoint}`}
              label="Terminal Command"
              context="Run this command in your terminal to register the server:"
            />
          </TabsContent>
          <TabsContent value="claude" className="pt-4 sm:pt-5">
            <CopyCode
              value={`claude mcp add --transport http good-quotes ${endpoint}`}
              label="Terminal Command"
              context="Run this command in your terminal to register the server:"
            />
          </TabsContent>
          <TabsContent value="cursor" className="pt-4 sm:pt-5">
            <CopyCode
              value={cursorConfig}
              label="Cursor JSON Config"
              context="Paste this snippet into Cursor Settings → MCP as a global server:"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div
        id="mcp-tools"
        className="w-full min-w-0 overflow-hidden border border-white/10 bg-[#202020] p-4 sm:p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
          Registered MCP Tools
        </p>
        <p className="mt-1 text-xs text-[#969696]">
          Tools exposed to your AI assistants
        </p>
        <div className="mt-4 grid gap-2 w-full min-w-0">
          {mcpTools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border border-white/5 bg-[#242424] p-3 text-xs w-full min-w-0"
            >
              <code className="font-mono text-[#da291c] font-medium break-all sm:break-normal">
                {tool.name}
              </code>
              <span className="text-[#969696]">{tool.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <Alert className="rounded-none border-white/10 bg-[#242424] text-[#969696] p-4 sm:p-5">
        <AlertTitle className="text-white text-sm font-medium">
          Troubleshooting
        </AlertTitle>
        <AlertDescription className="mt-1 text-xs leading-relaxed text-[#969696]">
          Make sure your client points to the full URL path ending in{" "}
          <code className="text-white font-mono">/mcp</code>. HTTP status{" "}
          <code className="text-white font-mono">429</code> indicates global
          rate limit has temporarily applied. No API key or registration is
          required.
        </AlertDescription>
      </Alert>
    </div>
  );
}

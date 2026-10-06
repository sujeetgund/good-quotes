import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { getQuote, getRandomQuote, listAuthors, listCategories, listQuotes } from "@/lib/quotes";
import { quoteCategories } from "@/lib/types";

function textResult(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value) }] };
}

export const mcpHandler = createMcpHandler(() => {
  const server = new McpServer({ name: "good-quotes", version: "0.1.0" });

  server.registerTool("get_random_quote", {
    description: "Get one curated quote, optionally filtered by category, author, or tag.",
    inputSchema: z.object({
      category: z.enum(quoteCategories).optional(),
      author: z.string().optional(),
      tag: z.string().optional(),
    }),
  }, async ({ category, author, tag }) => {
    const quote = getRandomQuote({ category, author, tag });
    return quote ? textResult(quote) : { isError: true, ...textResult({ error: "No quote matched those filters." }) };
  });

  server.registerTool("search_quotes", {
    description: "Search the quote collection by free-text query and optional filters.",
    inputSchema: z.object({
      query: z.string().optional(),
      category: z.enum(quoteCategories).optional(),
      author: z.string().optional(),
      tag: z.string().optional(),
      limit: z.number().int().min(1).max(20).optional(),
    }),
  }, async ({ query, category, author, tag, limit = 10 }) => textResult(listQuotes({ query, category, author, tag }).slice(0, limit)));

  server.registerTool("get_quote", {
    description: "Look up one quote by its stable ID.",
    inputSchema: z.object({ id: z.string() }),
  }, async ({ id }) => {
    const quote = getQuote(id);
    return quote ? textResult(quote) : { isError: true, ...textResult({ error: "Quote not found." }) };
  });

  server.registerTool("list_categories", {
    description: "List available quote categories.",
    inputSchema: z.object({}),
  }, async () => textResult(listCategories()));

  server.registerTool("list_authors", {
    description: "List authors represented in the quote collection.",
    inputSchema: z.object({}),
  }, async () => textResult(listAuthors()));

  return server;
});

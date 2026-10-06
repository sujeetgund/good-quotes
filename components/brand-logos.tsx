import type { SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";

type LogoProps = SVGProps<SVGSVGElement>;

export function CodexMark(props: LogoProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" fillRule="evenodd" d="M8.086.457a6.105 6.105 0 0 1 3.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 0 0 .107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 0 1-.18 1.631.167.167 0 0 0 .04.155 5.982 5.982 0 0 1 1.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 0 1-2.934 1.851.162.162 0 0 0-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 0 0-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 0 1-2.595-.622 6.058 6.058 0 0 1-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 0 1-.495-1.283 6.11 6.11 0 0 1-.017-3.064.166.166 0 0 0 .008-.074.115.115 0 0 0-.037-.064 5.958 5.958 0 0 1-1.38-2.202 5.196 5.196 0 0 1-.333-1.589 6.915 6.915 0 0 1 .188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 0 0 .087-.087A6.016 6.016 0 0 1 5.635 2.31C6.315 1.464 7.132.846 8.086.457Zm-.804 7.85a.848.848 0 0 0-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 0 0 1.46.864l1.94-3.272a.849.849 0 0 0 .007-.854l-1.94-3.393Zm5.446 6.24a.849.849 0 0 0 0 1.695h4.848a.849.849 0 0 0 0-1.696h-4.848Z" /></svg>;
}

export function ClaudeMark(props: LogoProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="#D97757" d="M21 10.5h3v3h-3v3h-1.5v3H18v-3h-1.5v3H15v-3H9v3H7.5v-3H6v3H4.5v-3H3v-3H0v-3h3v-6h18Zm-15 0h1.5v-3H6Zm10.5 0H18v-3h-1.5z" /></svg>;
}

export function CursorMark(props: LogoProps) {
  return <svg viewBox="0 0 466.73 532.09" aria-hidden="true" {...props}><path fill="currentColor" d="M457.43 125.94 244.42 2.96c-6.84-3.95-15.28-3.95-22.12 0L9.3 125.94A18.6 18.6 0 0 0 0 142.05v247.99c0 6.65 3.55 12.79 9.3 16.11l213.01 122.98c6.84 3.95 15.28 3.95 22.12 0l213.01-122.98c5.75-3.32 9.3-9.46 9.3-16.11V142.05c0-6.65-3.55-12.79-9.3-16.11ZM444.05 151.99 238.42 508.15c-1.39 2.4-5.06 1.42-5.06-1.36V273.58c0-4.66-2.49-8.97-6.53-11.31L24.87 145.67c-2.4-1.39-1.42-5.06 1.36-5.06h411.26c5.84 0 9.49 6.33 6.57 11.39Z" /></svg>;
}

export function BrandLogos() {
  const clients = [
    { name: "Codex", href: "https://developers.openai.com/learn/docs-mcp", icon: <CodexMark className="size-7 text-[#181818]" /> },
    { name: "Claude Code", href: "https://docs.anthropic.com/en/docs/claude-code/mcp", icon: <ClaudeMark className="size-7" /> },
    { name: "Cursor", href: "https://cursor.com/", icon: <CursorMark className="size-7 text-[#26251e]" /> },
  ];

  return <div className="mt-10"><p className="text-xs uppercase tracking-[0.16em] text-[#666]">Connect from your MCP client</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{clients.map((client) => <a key={client.name} href={client.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-white/10 bg-[#242424] px-4 py-4 text-sm text-white transition-colors hover:border-white/30"><span className="flex size-10 items-center justify-center bg-[#f7f7f7]">{client.icon}</span><span>{client.name}</span><ArrowUpRight data-icon="inline-end" className="ml-auto text-[#666]" /></a>)}</div></div>;
}

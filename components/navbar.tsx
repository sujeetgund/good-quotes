"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const isDocs = pathname === "/docs";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#181818]/95 backdrop-blur-md">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors leading-none"
        >
          <span className="relative -top-px size-2 shrink-0 bg-[#da291c] transition-transform duration-200 group-hover:scale-125" />
          <span>Good Quotes</span>
        </Link>

        {/* Navigation & Action */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/docs"
            className={`hidden min-h-11 md:flex items-center px-2 text-xs uppercase tracking-[0.14em] transition-colors hover:text-white ${
              isDocs ? "font-medium text-white" : "text-[#969696]"
            }`}
          >
            Docs
          </Link>

          <Button
            nativeButton={false}
            render={<Link href="/quotes" />}
            size="sm"
            className="h-9 rounded-none bg-[#da291c] px-3.5 sm:px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#b01e0a]"
          >
            Find a quote
          </Button>
        </div>
      </nav>
    </header>
  );
}

import type { SVGProps } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 250"
      {...props}
    >
      <path
        fill="currentColor"
        d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"
      />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95c-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019c5.875 0 6.955 3.869 6.955 8.894V28z"
      />
    </svg>
  );
}

const CREATOR_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/sujeetgund",
    label: "github/sujeetgund",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sujeetgund",
    label: "in/sujeetgund",
    icon: LinkedinIcon,
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#141414] text-xs uppercase tracking-[0.14em] text-[#969696]">
      {/* Top Colophon / Creator Plate */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center">
          {/* Brand lockup */}
          <div className="space-y-3 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-white leading-none"
            >
              <span className="relative -top-px size-2 shrink-0 bg-[#da291c] transition-transform duration-200 group-hover:scale-125" />
              <span>Good Quotes</span>
            </Link>
            <p className="text-xs leading-relaxed tracking-normal text-[#666] normal-case">
              A quiet, source-aware quote archive & Model Context Protocol
              service. Built for human readers and autonomous agents.
            </p>
          </div>

          {/* Creator Attribution */}
          <div className="border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 bg-[#da291c]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8e8e8e]">
                    Crafted &amp; Curated by
                  </p>
                </div>
                <a
                  href="https://sujeetgund.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1.5 inline-flex items-center gap-2 text-base sm:text-lg font-medium text-white transition-colors"
                >
                  <span className="relative">
                    Sujeet Gund
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#da291c] transition-all duration-300 ease-out group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="size-3.5 text-[#555] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#da291c]" />
                </a>
              </div>

              {/* Creator links */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {CREATOR_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex h-9 items-center gap-2 border border-white/10 bg-[#1a1a1a]/80 px-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8e8e8e] backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-[#222222] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#da291c]"
                    >
                      <Icon className="size-3.5 text-[#737373] transition-colors duration-200 group-hover:text-white" />
                      <span>{item.name}</span>
                      <ArrowUpRight className="size-3 text-[#4a4a4a] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#da291c]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Nav Sub-bar */}
      <div className="border-t border-white/5 bg-[#101010] px-4 py-5 sm:px-6 lg:px-10 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center text-[11px] text-[#666]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/quotes" className="transition-colors hover:text-white">
              Collection
            </Link>
            <Link href="/docs" className="transition-colors hover:text-white">
              Documentation
            </Link>
            <Link
              href="/docs#mcp"
              className="transition-colors hover:text-white"
            >
              MCP Protocol
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span>&copy; 2026 Sujeet Gund</span>
            <span>·</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyCode({
  value,
  label,
  context,
}: {
  value: string;
  label: string;
  context?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="mt-3 w-full min-w-0">
      {context && <p className="mb-2 text-xs sm:text-sm text-[#969696]">{context}</p>}
      <div className="w-full min-w-0 overflow-hidden border border-white/10 bg-[#242424]">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#202020] px-3.5 py-2 sm:px-5">
          <span className="text-xs uppercase tracking-[0.14em] text-[#666] truncate">{label}</span>
          <Button
            type="button"
            variant="outline"
            className="h-9 min-h-[36px] shrink-0 rounded-none border-white/20 bg-transparent px-3 text-xs uppercase tracking-[0.12em] text-[#e7e7e7] hover:border-[#da291c] hover:bg-[#da291c] hover:text-white"
            onClick={copy}
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="mr-1.5 size-3.5 text-[#03904a] sm:text-white" />
            ) : (
              <Clipboard className="mr-1.5 size-3.5" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
        <div className="w-full min-w-0 overflow-x-auto p-3.5 sm:p-5 [scrollbar-width:thin]">
          <pre className="font-mono text-xs sm:text-sm leading-relaxed text-[#e7e7e7]">
            <code>{value}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

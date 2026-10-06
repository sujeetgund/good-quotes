"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyCode({ value, label, context }: { value: string; label: string; context?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={context ? "mt-4" : "relative"}>
      {context ? <p className="text-sm text-[#969696]">{context}</p> : null}
      <div className={`${context ? "mt-2 " : ""}relative border border-white/10 bg-[#242424] p-5 pr-24`}>
        <code className="block whitespace-pre-wrap break-words font-mono text-sm leading-7 text-[#e7e7e7]">{value}</code>
        <Button type="button" variant="outline" size="sm" className="absolute right-3 top-3 border-[#da291c]/60 bg-transparent text-[#e7e7e7] hover:bg-[#da291c] hover:text-white" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? <Check data-icon="inline-start" /> : <Clipboard data-icon="inline-start" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

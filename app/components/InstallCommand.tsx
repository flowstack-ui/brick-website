"use client";

import { useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Code } from "@flowstack-ui/brick/code";
import { Check, Copy } from "lucide-react";

export function InstallCommand({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const command = "npm install @flowstack-ui/brick";

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={compact ? "install-command is-compact" : "install-command"}>
      <Code variant="plain">{command}</Code>
      <Button
        aria-label={copied ? "Copied installation command" : "Copy installation command"}
        tone="neutral"
        variant="ghost"
        size="sm"
        onPress={copy}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </Button>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </div>
  );
}

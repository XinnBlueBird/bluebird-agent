"use client";
import { useEffect, useState } from "react";

const SCRIPT: { kind: "in" | "out" | "ok" | "warn" | "log"; text: string; delay?: number }[] = [
  { kind: "in",   text: "$ bluebird-agent run --auto", delay: 400 },
  { kind: "log",  text: "▸ Loading 16 intelligence sources from sources.txt", delay: 700 },
  { kind: "log",  text: "▸ Connecting to Telegram MTProto as @Anonbross", delay: 700 },
  { kind: "ok",   text: "✓ Listener active · DB: airdrops.db (43 projects tracked)", delay: 800 },
  { kind: "log",  text: "▸ New message: @uangdroid28 — \"LIST AIRDROP HARI INI\"", delay: 900 },
  { kind: "log",  text: "▸ Classifying 14 candidates...", delay: 700 },
  { kind: "ok",   text: "✓ tg_bot: 4   web_x_oauth: 5   wnnr_gleam: 2   skip: 3", delay: 800 },
  { kind: "log",  text: "▸ Executing playbook: tg_bot @ScandicAirdropBot", delay: 900 },
  { kind: "log",  text: "  → solving math captcha: 61 - 13 = 48 ✓", delay: 700 },
  { kind: "log",  text: "  → joining required channels (3)", delay: 600 },
  { kind: "log",  text: "  → submitting EVM 0xB9B7...fcFe", delay: 700 },
  { kind: "ok",   text: "✓ Scandic completed · attempt #1 · 12.3s", delay: 800 },
  { kind: "log",  text: "▸ Posting recap to forum topic 🤖 Bot Farming", delay: 600 },
  { kind: "warn", text: "⚠ Skipped 2 KYC-required projects (policy)", delay: 700 },
  { kind: "ok",   text: "✓ Cycle complete · 4 done · 0 failed · cooldown 6h", delay: 800 },
];

const COLORS = {
  in:   "text-white",
  out:  "text-white/80",
  ok:   "text-emerald-400",
  warn: "text-amber-400",
  log:  "text-white/60",
};

export function TerminalPreview() {
  const [lines, setLines] = useState<typeof SCRIPT>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= SCRIPT.length) {
      const t = setTimeout(() => {
        setLines([]);
        setIdx(0);
      }, 4000);
      return () => clearTimeout(t);
    }
    const line = SCRIPT[idx];
    const t = setTimeout(() => {
      setLines((l) => [...l, line]);
      setIdx((i) => i + 1);
    }, line.delay ?? 600);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-bluebird-500/20 to-transparent rounded-2xl blur-2xl" />
      <div className="relative glass rounded-xl overflow-hidden shadow-2xl">
        {/* macOS chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center text-xs text-white/40 font-mono">
            bluebird-agent ─ live
          </div>
          <div className="text-xs text-white/30 font-mono">v0.1.0</div>
        </div>

        {/* terminal body */}
        <div className="p-5 font-mono text-sm leading-6 h-[420px] overflow-hidden">
          {lines.map((line, i) => (
            <div key={i} className={COLORS[line.kind]}>
              {line.text}
            </div>
          ))}
          <div className="text-bluebird-400 terminal-cursor">$</div>
        </div>
      </div>
    </div>
  );
}

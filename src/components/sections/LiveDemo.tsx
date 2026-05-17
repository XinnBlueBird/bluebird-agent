"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, Terminal as TerminalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLES = [
  "What airdrops dropped today?",
  "Classify this link: t.me/SomeAirdropBot",
  "Show me 7-day farming stats",
  "Plan a swap: 0.1 ETH → SOL on Base",
];

export function LiveDemo() {
  const [active, setActive] = useState<"chat" | "terminal" | "swap">("chat");

  return (
    <section id="demo" className="py-24 relative section-perf">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Talk to the agent.{" "}
            <span className="gradient-text">Watch it think.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Three live surfaces backed by the same agent runtime. Chat, watch
            it work in a terminal, or simulate a swap.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {(["chat", "terminal", "swap"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                active === t
                  ? "border-bluebird-500/50 bg-bluebird-500/10 text-white"
                  : "border-white/5 bg-white/[0.02] text-white/60 hover:text-white"
              }`}
            >
              {t === "chat" && "💬 Chat"}
              {t === "terminal" && "⌨️  Terminal"}
              {t === "swap" && "🔄 Swap by Agent"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {active === "chat" && <ChatDemo />}
            {active === "terminal" && <TerminalDemo />}
            {active === "swap" && <SwapDemo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ChatDemo() {
  return (
    <div className="glass rounded-xl p-6 min-h-[420px]">
      <div className="space-y-4 mb-4">
        <Bubble role="user" text="What airdrops dropped today?" />
        <Bubble
          role="agent"
          text="Today's intake: 14 candidates from @uangdroid28 list (16 May 2026). After classification: 4 tg_bot eligible (Scandic, TetreumBOT, Onchain Meows, Canborsa), 2 already done, 5 web flow queued for manual review, 3 skipped (KYC). I executed the 4 tg_bot ones — Scandic + TetreumBOT + Onchain Meows complete, Canborsa partial (daily quest pending Gmail magic link)."
        />
        <Bubble role="user" text="Show me 7-day farming stats" />
        <Bubble
          role="agent"
          text={`Last 7 days:\n• 47 projects classified\n• 12 done, 4 failed, 8 manual queue\n• 23 skipped (KYC + anti-bot)\n• ~$2.40 gas spent on Base\n• 2 wallets active, 4 idle\nWeekly recap auto-posted to Forum every Monday 09:00 WIB.`}
        />
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-white/5">
        <input
          placeholder={SAMPLES[Math.floor(Math.random() * SAMPLES.length)]}
          disabled
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm placeholder-white/30"
        />
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-bluebird-500 to-bluebird-700 hover:from-bluebird-400 hover:to-bluebird-600 transition text-sm font-medium"
        >
          Open full chat <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Bubble({ role, text }: { role: "user" | "agent"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-bluebird-500 to-bluebird-700 text-white"
            : "bg-white/5 text-white/85"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function TerminalDemo() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
        <TerminalIcon className="w-4 h-4 text-bluebird-400" />
        <span className="text-xs font-mono text-white/60">
          bluebird-agent ~ live (read-only)
        </span>
      </div>
      <pre className="p-5 font-mono text-xs leading-6 text-white/75 min-h-[420px] overflow-x-auto">
{`$ bluebird-agent status

▸ Listener: active · @Anonbross · 16 sources
▸ DB: airdrops.db · 43 tracked · 12 done · 4 failed
▸ Worker: cron 0 */4 * * * · next 04:00 WIB
▸ Forum: -1003843819766 · 7 topics
▸ Wallets:
   main:    0xf2d5...BdFa
   farm-01: 0xB9B7...fcFe (active · 8 attempts)
   farm-02: 0x4a3e...77Fb (idle)
   farm-03..05: idle

$ bluebird-agent classify "https://t.me/ScandicAirdropBot"

▸ playbook: tg_bot
▸ confidence: 0.97
▸ requires_kyc: false
▸ instant_reward: true
▸ cooldown_remaining: 0s
▸ recommendation: EXECUTE

$ _`}
      </pre>
    </div>
  );
}

function SwapDemo() {
  return (
    <div className="glass rounded-xl p-6 min-h-[420px] grid md:grid-cols-2 gap-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
          Intent
        </div>
        <div className="space-y-3">
          <Field label="From" value="0.1 ETH (Base)" />
          <Field label="To" value="SOL (any chain)" />
          <Field label="Slippage" value="0.5%" />
          <Field label="Wallet" value="farm-01 · 0xB9B7…fcFe" />
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3">
          Agent Plan (simulated)
        </div>
        <ol className="space-y-3 text-sm text-white/75">
          <Step n={1} text="Bridge 0.1 ETH (Base) → 0.099 ETH (Solana via deBridge)" />
          <Step n={2} text="Swap 0.099 ETH → 1.42 SOL on Jupiter (routing 3 hops)" />
          <Step n={3} text="Net out: ~1.42 SOL · est. fee $0.41 · ETA 2m" />
          <Step n={4} text="Awaiting confirmation… (demo · no real tx broadcast)" />
        </ol>
        <button
          disabled
          className="mt-6 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" /> Execute (demo only)
        </button>
        <p className="text-xs text-white/40 mt-3">
          Demo never broadcasts on-chain. Production execution requires
          explicit user confirmation and runs on the host wallet.
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm font-mono mt-0.5">{value}</div>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bluebird-500/20 border border-bluebird-500/40 flex items-center justify-center text-[10px] font-medium text-bluebird-300">
        {n}
      </span>
      <span>{text}</span>
    </li>
  );
}

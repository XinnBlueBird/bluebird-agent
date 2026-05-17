"use client";
import { motion } from "framer-motion";
import { Search, ExternalLink, Sparkles, MessageSquare } from "lucide-react";

const SAMPLE_QUERY = "What are people on X saying about Xiaomi MiMo 100T grant?";

const SAMPLE_RESPONSE = [
  {
    handle: "@XiaomiMiMo",
    text: "Up to 100 trillion tokens for AI builders globally. Reasoning, multimodal, TTS — full MiMo V2.5 access.",
    url: "https://x.com/XiaomiMiMo/status/2048822064417755505",
  },
  {
    handle: "@RogueAix",
    text: "Application window: 27 Apr → 27 May 2026. Rolling reviews. Apply at 100t.xiaomimimo.com — takes about 1 minute.",
    url: "https://x.com/RogueAix/status/2054143414258614319",
  },
  {
    handle: "@RogueAix",
    text: "Selective program. Real builders with active GitHub portfolios get accepted. Mass sign-ups skipped.",
    url: "https://x.com/RogueAix/status/2054219496836178048",
  },
];

export function LiveIntel() {
  return (
    <section className="py-24 relative section-perf">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wider text-emerald-300 mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              SUPERGROK · LIVE
            </div>
            <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
              Live X intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              The agent reads X{" "}
              <span className="gradient-text">in real time.</span>
            </h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              BlueBird taps xAI&apos;s Responses API through a SuperGrok OAuth
              session. Every airdrop pre-flight pulls live X sentiment, project
              mentions, and red-flag chatter — synthesized with citations to the
              originating posts.
            </p>
            <ul className="space-y-3 text-sm text-white/75 mb-6">
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">OAuth, not API key</strong> —
                  runs on SuperGrok subscription quota
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">Citations included</strong> —
                  every claim links to a real X post
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">Time-windowed</strong> —{" "}
                  <code className="text-bluebird-300">from_date</code> /{" "}
                  <code className="text-bluebird-300">to_date</code> filters for
                  fresh-only intel
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">Handle scoping</strong> —{" "}
                  <code className="text-bluebird-300">allowed_x_handles</code>{" "}
                  for trusted-source-only queries
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Powered by xAI Grok 4 · grok-cli scope</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-yellow-500/10 via-bluebird-500/10 to-transparent rounded-2xl blur-2xl" />
            <div className="relative glass rounded-xl overflow-hidden shadow-2xl">
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono text-white/60">
                    x_search · live response
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>200 OK</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                    Query
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/85 font-mono leading-relaxed">
                    <span className="text-bluebird-400 mt-0.5">›</span>
                    <span>{SAMPLE_QUERY}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-3">
                    Synthesized takeaways · 3 citations
                  </div>
                  <div className="space-y-3">
                    {SAMPLE_RESPONSE.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="group flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 hover:bg-white/[0.04] transition"
                      >
                        <MessageSquare className="w-4 h-4 text-yellow-400/70 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-semibold text-bluebird-300">
                              {r.handle}
                            </span>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition text-white/40 hover:text-white"
                              aria-label="Open post"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-[13px] text-white/75 leading-relaxed">
                            {r.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";

const SNIPPET = `# classifier.py — pure function, deterministic, auditable
def classify(url: str) -> tuple[str, float]:
    """Return (playbook, confidence) for a project URL."""
    u = url.lower().strip()

    # Telegram bot — instant reward, easiest to automate
    if "t.me/" in u and any(b in u for b in BOT_SUFFIXES):
        return ("tg_bot", 0.97)

    # Gleam.io / Wnnr / Galxe — anti-bot, mostly skip
    if any(d in u for d in WEB_QUEST_DOMAINS):
        return ("wnnr_gleam", 0.92)

    # Web form requiring X OAuth — generalized later
    if any(d in u for d in OAUTH_DOMAINS):
        return ("web_x_oauth", 0.85)

    return ("unknown", 0.0)

# worker_engine.py — idempotent, cooldown-aware
def queue_eligible() -> list[Project]:
    return db.query("""
        SELECT * FROM projects
        WHERE status = 'queued'
          AND requires_kyc = 0
          AND (last_attempt IS NULL OR last_attempt < datetime('now', '-6 hours'))
        ORDER BY created_at ASC
    """)`;

export function CodeShowcase() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="py-24 relative section-perf">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
              The code
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Boring code.{" "}
              <span className="gradient-text">Reliable agent.</span>
            </h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              No black-box neural router. The classifier is a pure function with
              17 unit tests. The worker engine is a SQL query with a six-hour
              cooldown clause. Every decision the agent makes is auditable, and
              every attempt logs to a row you can grep.
            </p>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">Pure functions</strong> — no
                  side-effects in classify()
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">Idempotent SQL</strong> —
                  cooldown enforced at the query level
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">No retries on done/failed</strong>{" "}
                  — terminal states are terminal
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-bluebird-400 font-mono">›</span>
                <span>
                  <strong className="text-white">SQLite WAL</strong> —
                  crash-safe writes, zero external dependencies
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-bluebird-500/20 to-transparent rounded-2xl blur-2xl" />
            <div className="relative glass rounded-xl overflow-hidden shadow-2xl">
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-bluebird-400" />
                  <span className="text-xs font-mono text-white/60">
                    classifier.py
                  </span>
                </div>
                <button
                  onClick={copy}
                  className="text-white/50 hover:text-white p-1 rounded transition"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <pre className="p-5 font-mono text-[12.5px] leading-6 text-white/85 overflow-x-auto max-h-[480px]">
                <code>{SNIPPET}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

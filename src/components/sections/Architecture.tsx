"use client";
import { motion } from "framer-motion";

const NODES = [
  { x: 8, y: 18, label: "Telegram\nMTProto", sub: "@Anonbross · 16 sources", color: "bluebird" },
  { x: 50, y: 18, label: "Listener\nDaemon", sub: "systemd · always-on", color: "violet" },
  { x: 92, y: 18, label: "Outbox", sub: "JSON queue · 1Hz drain", color: "violet" },
  { x: 8, y: 52, label: "Classifier", sub: "tg_bot / web / wnnr / skip", color: "emerald" },
  { x: 50, y: 52, label: "SQLite WAL\nairdrops.db", sub: "projects · actions · sources", color: "amber" },
  { x: 92, y: 52, label: "Worker Engine", sub: "cron 0 */4 · idempotent", color: "pink" },
  { x: 8, y: 86, label: "Playbooks", sub: "tg_bot / web_x / email", color: "cyan" },
  { x: 50, y: 86, label: "Reporter", sub: "5x daily + weekly", color: "rose" },
  { x: 92, y: 86, label: "Forum Recap", sub: "7 topics · auto-posted", color: "orange" },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2],
  [1, 3], [3, 4], [4, 5],
  [5, 6], [4, 7], [7, 8],
];

const COLORS: Record<string, string> = {
  bluebird: "border-bluebird-500/40 bg-bluebird-500/5",
  violet:   "border-violet-500/40 bg-violet-500/5",
  emerald:  "border-emerald-500/40 bg-emerald-500/5",
  amber:    "border-amber-500/40 bg-amber-500/5",
  pink:     "border-pink-500/40 bg-pink-500/5",
  cyan:     "border-cyan-500/40 bg-cyan-500/5",
  rose:     "border-rose-500/40 bg-rose-500/5",
  orange:   "border-orange-500/40 bg-orange-500/5",
};

export function Architecture() {
  return (
    <section id="architecture" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
            Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Single owner. <span className="gradient-text">Many surfaces.</span>
          </h2>
          <p className="text-white/60 text-lg">
            One process owns the Telegram session and SQLite WAL. Every other
            component drops messages into an outbox queue. No locks, no races.
          </p>
        </div>

        <div className="relative h-[500px] md:h-[440px] glass rounded-2xl p-8 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(56,142,255)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(33,107,245)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="url(#edge)"
                strokeWidth="0.25"
                strokeDasharray="0.6 0.6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
              />
            ))}
          </svg>

          {NODES.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-[180px] px-3 py-2.5 rounded-lg border text-center backdrop-blur-sm ${COLORS[n.color]}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="text-xs font-semibold whitespace-pre-line leading-tight">
                {n.label}
              </div>
              <div className="text-[10px] text-white/50 mt-1 font-mono">{n.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Tech name="Runtime" items={["Python 3.11", "Telethon MTProto", "Node 20"]} />
          <Tech name="Storage" items={["SQLite WAL", "Outbox JSON queue", "systemd journals"]} />
          <Tech name="Web Surface" items={["Next.js 14", "MiMo / OpenAI SDK", "Vercel edge"]} />
        </div>
      </div>
    </section>
  );
}

function Tech({ name, items }: { name: string; items: string[] }) {
  return (
    <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
      <div className="text-xs uppercase tracking-wider text-white/40 mb-3">{name}</div>
      <ul className="space-y-1.5 text-sm font-mono text-white/75">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Database, Radio } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  {
    icon: Radio,
    label: "Sources Monitored",
    valueProps: { to: 16 },
    sub: "SEA channels · MTProto",
  },
  {
    icon: Database,
    label: "Projects Tracked",
    valueProps: { to: 43, suffix: "+" },
    sub: "all-time intake",
  },
  {
    icon: CheckCircle2,
    label: "Successful Runs",
    valueProps: { to: 12 },
    sub: "this week",
  },
  {
    icon: Activity,
    label: "Uptime",
    valueProps: { to: 99.4, decimals: 1, suffix: "%" },
    sub: "30-day rolling",
  },
];

export function Stats() {
  return (
    <section id="stats" className="py-24 relative section-perf">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
            Live Stats
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Real numbers from{" "}
            <span className="gradient-text">production farming.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Honest metrics. No vanity. Every number traceable to the SQLite WAL
            on the host.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 rounded-xl border border-white/5 bg-white/[0.02] relative overflow-hidden group hover:border-bluebird-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-bluebird-500/10 rounded-full blur-2xl group-hover:bg-bluebird-500/20 transition-colors" />
              <s.icon className="w-5 h-5 text-bluebird-400 mb-4" />
              <div className="text-4xl font-bold tracking-tight">
                <Counter {...s.valueProps} />
              </div>
              <div className="text-sm text-white/70 mt-1">{s.label}</div>
              <div className="text-xs text-white/40 mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

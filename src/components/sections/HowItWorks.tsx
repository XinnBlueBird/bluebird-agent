"use client";
import { motion } from "framer-motion";
import { Radio, Brain, PlayCircle } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Radio,
    title: "Listen",
    desc: "A Telethon userbot watches 16 curated SEA airdrop channels in real time. Every new message gets parsed for project links and dropped into a SQLite WAL.",
    accent: "from-bluebird-400/30 to-bluebird-700/0",
  },
  {
    n: "02",
    icon: Brain,
    title: "Classify",
    desc: "A deterministic classifier inspects each link. Telegram bot, web with X OAuth, Gleam-style quest, or skip. Every decision is logged and auditable.",
    accent: "from-violet-400/30 to-violet-700/0",
  },
  {
    n: "03",
    icon: PlayCircle,
    title: "Execute",
    desc: "Cron-driven worker picks queued projects and runs the matching state-machine playbook. Captcha solved, channels joined, wallet submitted, recap posted.",
    accent: "from-emerald-400/30 to-emerald-700/0",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Three steps.{" "}
            <span className="gradient-text">Fully autonomous.</span>
          </h2>
          <p className="text-white/60 text-lg">
            From a brand-new Telegram message to a completed airdrop submission,
            the agent works without human input.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden group hover:border-bluebird-500/30 transition-colors"
            >
              <div
                className={`absolute -top-20 -right-10 w-48 h-48 bg-gradient-radial ${s.accent} blur-2xl pointer-events-none`}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-white/30 tracking-widest">
                    {s.n}
                  </span>
                  <s.icon className="w-5 h-5 text-bluebird-400" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

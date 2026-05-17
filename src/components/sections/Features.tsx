"use client";
import {
  Radio,
  Brain,
  PlayCircle,
  ShieldCheck,
  GitBranch,
  Activity,
  Wallet,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Radio,
    title: "16 Intelligence Sources",
    desc: "Listens to curated SEA airdrop Telegram channels via MTProto userbot. Real-time, no polling delay.",
    color: "text-bluebird-400",
  },
  {
    icon: Brain,
    title: "Auto-Classifier",
    desc: "Every link is parsed and routed: tg_bot, web_x_oauth, wnnr_gleam, or skip. Zero manual triage.",
    color: "text-violet-400",
  },
  {
    icon: PlayCircle,
    title: "Playbook Engine",
    desc: "State-machine playbooks per project type. Math captcha solver, channel joiner, form submitter — all automated.",
    color: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    title: "Sybil-Safe by Design",
    desc: "1 wallet = 1 ecosystem. KYC projects auto-skipped. Identity isolation enforced at the schema level.",
    color: "text-amber-400",
  },
  {
    icon: GitBranch,
    title: "Idempotent + Cooldown",
    desc: "Each project gets one attempt every 6 hours. Done/failed never retry. Crash-safe via SQLite WAL.",
    color: "text-pink-400",
  },
  {
    icon: Activity,
    title: "Forum Recap",
    desc: "Auto-posts daily recaps 5x/day + weekly Monday reports to a Telegram forum group with 7 dedicated topics.",
    color: "text-cyan-400",
  },
  {
    icon: Wallet,
    title: "Multi-Wallet Pool",
    desc: "Six pre-generated farm wallets accessed via bluebird-pk CLI. Private keys never leave the host.",
    color: "text-orange-400",
  },
  {
    icon: Bot,
    title: "Pluggable LLM",
    desc: "MiMo-VL by default. Falls back to any OpenAI-compatible endpoint via 9Router for high availability.",
    color: "text-rose-400",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative section-perf">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything an airdrop hunter needs,{" "}
            <span className="gradient-text">automated.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Eight subsystems working in concert. Each one battle-tested in
            production farming runs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group relative p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              <f.icon className={`w-5 h-5 mb-3 ${f.color}`} />
              <h3 className="font-semibold mb-1.5 tracking-tight">{f.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Sparkles, Zap, Shield, Code2 } from "lucide-react";
import { TerminalPreview } from "@/components/ui/TerminalPreview";

const TRUST_BADGES = [
  { icon: Code2, label: "Built with Claude Code" },
  { icon: Sparkles, label: "Powered by MiMo" },
  { icon: Shield, label: "Open Source · MIT" },
];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-bluebird-500/20 via-bluebird-700/10 to-transparent blur-3xl pointer-events-none bg-blob" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-bluebird-500/20 rounded-full blur-3xl pointer-events-none bg-blob" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-bluebird-700/15 rounded-full blur-3xl pointer-events-none bg-blob" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bluebird-500/10 border border-bluebird-500/20 text-xs font-medium text-bluebird-300 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bluebird-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bluebird-400" />
            </span>
            <span>Submitted to Xiaomi MiMo 100T Grant</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Autonomous{" "}
            <span className="gradient-text">crypto agent</span>
            <br />
            that never sleeps.
          </h1>

          <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            BlueBird is an AI-driven research and execution agent. It listens to
            17 Telegram intelligence channels, taps SuperGrok for live X
            sentiment, classifies airdrops by playbook, and executes — fully
            autonomously, 24 by 7.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-bluebird-500 to-bluebird-700 hover:from-bluebird-400 hover:to-bluebird-600 transition shadow-lg shadow-bluebird-500/30 font-medium"
            >
              <Zap className="w-4 h-4" />
              Try the Agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="https://github.com/XinnBlueBird/bluebird-agent"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-medium"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50 mb-6"
          >
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-1.5">
                <b.icon className="w-3.5 h-3.5 text-bluebird-400" />
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agent online</span>
            </div>
            <div>17 sources monitored</div>
            <div>Zero halu policy</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <TerminalPreview />
        </motion.div>
      </div>
    </section>
  );
}

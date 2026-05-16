"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Sparkles, Zap } from "lucide-react";
import { TerminalPreview } from "@/components/ui/TerminalPreview";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-bluebird-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-bluebird-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bluebird-500/10 border border-bluebird-500/20 text-xs font-medium text-bluebird-300 mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Built for Xiaomi MiMo 100T Grant</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Autonomous{" "}
            <span className="gradient-text">crypto agent</span>
            <br />
            that never sleeps.
          </h1>

          <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            BlueBird is an AI-driven research and execution agent. It listens to
            16+ Telegram intelligence channels, classifies airdrops by playbook,
            and executes — fully autonomously, 24/7.
          </p>

          <div className="flex flex-wrap items-center gap-3">
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

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agent online</span>
            </div>
            <div>16 sources monitored</div>
            <div>0% halu policy</div>
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

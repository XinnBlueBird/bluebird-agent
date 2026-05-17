"use client";
import Link from "next/link";
import { ArrowRight, Github, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 relative section-perf">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-2xl p-10 md:p-14 overflow-hidden"
        >
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-bluebird-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-bluebird-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="text-xs uppercase tracking-wider text-bluebird-400 mb-3 font-medium">
              Open source · MIT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 max-w-2xl">
              Built in public.{" "}
              <span className="gradient-text">Submitted to MiMo 100T.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mb-8">
              The full agent runtime, web surface, and playbook engine — all on
              GitHub. Read the code, fork it, run it. Or just chat with the
              live agent.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-bluebird-500 to-bluebird-700 hover:from-bluebird-400 hover:to-bluebird-600 transition shadow-lg shadow-bluebird-500/30 font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with BlueBird
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                href="https://github.com/XinnBlueBird/bluebird-agent"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-medium"
              >
                <Github className="w-4 h-4" />
                Star on GitHub
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

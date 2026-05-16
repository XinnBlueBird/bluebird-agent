import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-bluebird-400 to-bluebird-700" />
            <span className="font-semibold tracking-tight">BlueBird Agent</span>
          </div>
          <p className="text-sm text-white/60 max-w-md">
            Autonomous AI-driven crypto airdrop research and execution agent.
            Open-source. Built for the Xiaomi MiMo 100T Token Creator Incentive program.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Project</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="#features" className="hover:text-white">Features</Link></li>
            <li><Link href="#demo" className="hover:text-white">Live Demo</Link></li>
            <li><Link href="#architecture" className="hover:text-white">Architecture</Link></li>
            <li><Link href="/chat" className="hover:text-white">Try Agent</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Connect</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link
                href="https://github.com/XinnBlueBird/bluebird-agent"
                target="_blank"
                className="flex items-center gap-2 hover:text-white"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/Xinnsky"
                target="_blank"
                className="flex items-center gap-2 hover:text-white"
              >
                <Twitter className="w-3.5 h-3.5" /> @Xinnsky
              </Link>
            </li>
            <li>
              <Link
                href="https://100t.xiaomimimo.com/"
                target="_blank"
                className="hover:text-white"
              >
                MiMo 100T
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© 2026 BlueBird Agent · MIT License</span>
          <span>
            Powered by autonomous agents · Built with Next.js + MiMo
          </span>
        </div>
      </div>
    </footer>
  );
}

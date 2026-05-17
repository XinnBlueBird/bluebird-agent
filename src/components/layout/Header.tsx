"use client";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-bluebird-500/40 blur-md opacity-60 group-hover:opacity-100 transition" />
            <Image
              src="/logo.svg"
              alt="BlueBird Agent"
              width={36}
              height={36}
              priority
              className="relative drop-shadow-[0_2px_6px_rgba(56,189,248,0.35)]"
            />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            BlueBird<span className="text-bluebird-400">.</span>Agent
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#how" className="hover:text-white transition">How</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#demo" className="hover:text-white transition">Demo</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <a href="#stats" className="hover:text-white transition">Stats</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/XinnBlueBird/bluebird-agent"
            target="_blank"
            className="p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="https://x.com/Xinnsky"
            target="_blank"
            className="p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </Link>
          <Link
            href="/chat"
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-br from-bluebird-500 to-bluebird-700 hover:from-bluebird-400 hover:to-bluebird-600 transition shadow-lg shadow-bluebird-500/20"
          >
            Try Agent
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    function compute() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(compute);
        ticking = true;
      }
    }
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
      style={{ contain: "layout paint" }}
    >
      <div
        className="h-full bg-gradient-to-r from-bluebird-400 via-bluebird-500 to-bluebird-700 origin-left will-change-transform shadow-[0_0_8px_rgba(56,142,255,0.6)]"
        style={{
          transform: `scaleX(${progress / 100})`,
          width: "100%",
        }}
      />
    </div>
  );
}

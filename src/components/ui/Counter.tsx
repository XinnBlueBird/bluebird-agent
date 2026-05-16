"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function Counter({ to, duration = 1500, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const [val, setVal] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      // easeOutQuart
      const e = 1 - Math.pow(1 - t, 4);
      setVal(to * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  const display =
    decimals === 0 ? Math.round(val).toString() : val.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

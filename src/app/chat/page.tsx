"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Loader2, RotateCcw } from "lucide-react";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_HINT = `BlueBird Agent — autonomous crypto research assistant.
You can ask me about: airdrop opportunities, project classification, on-chain plans, farming stats, or how my own architecture works.
I never lie about what I haven't actually executed.`;

const STARTERS = [
  "What is BlueBird Agent?",
  "How does the classifier work?",
  "Walk me through a tg_bot playbook",
  "Plan a swap: 0.05 ETH → SOL",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("no body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `⚠️ Couldn't reach the agent backend (${e.message}). The hosted demo runs in fallback mode without an API key — set MIMO_API_KEY or OPENAI_API_KEY in Vercel to enable live chat.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/5 glass">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-bluebird-400" />
            <span className="font-semibold text-sm">BlueBird Agent</span>
            <span className="text-xs text-white/40">· chat</span>
          </div>
          <button
            onClick={() => setMessages([])}
            className="text-white/50 hover:text-white"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-4">
          {messages.length === 0 && (
            <div className="text-center pt-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-bluebird-400 to-bluebird-700 mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                How can I help?
              </h2>
              <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
                {SYSTEM_HINT}
              </p>
              <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition text-sm text-white/80"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-bluebird-500 to-bluebird-700 text-white"
                    : "bg-white/5 text-white/85"
                }`}
              >
                {m.content || (loading && <Loader2 className="w-4 h-4 animate-spin" />)}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 pt-4 border-t border-white/5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask BlueBird anything…"
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-white/30 focus:outline-none focus:border-bluebird-500/50 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-gradient-to-br from-bluebird-500 to-bluebird-700 hover:from-bluebird-400 hover:to-bluebird-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

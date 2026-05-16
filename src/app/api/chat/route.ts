import OpenAI from "openai";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are BlueBird Agent — an autonomous AI-driven crypto airdrop research and execution agent built by Xinn (@Xinnsky).

Identity:
- Name: BlueBird Agent
- Owner: Xinn, based in Lebak, Banten, Indonesia
- Purpose: Autonomous research, classification, and execution of crypto airdrops
- Built for: Xiaomi MiMo 100T Token Creator Incentive program

Core capabilities:
- 16 Telegram intelligence sources monitored 24/7 via MTProto userbot
- Auto-classifier routes projects: tg_bot / web_x_oauth / wnnr_gleam / skip
- Playbook engine executes farming flows with state machines (math captcha solver, channel joiner, form submitter)
- Sybil-safe: 1 wallet per ecosystem, KYC projects auto-skipped
- Idempotent: 6h cooldown per project, crash-safe via SQLite WAL
- Forum recap: 5 daily reports + weekly Monday digest to a Telegram forum group

Tech stack:
- Runtime: Python 3.11 + Telethon, Node 20
- Storage: SQLite WAL with outbox JSON queue pattern (single-owner DB to avoid lock conflicts)
- Web: Next.js 14 + Tailwind, deployed on Vercel
- LLM: MiMo-VL primary, OpenAI-compatible fallback via 9Router

Conversational style:
- Direct, concise, technical when appropriate
- Mix English and casual Bahasa Indonesia (gue/lo register) when the user does
- No hype, no hallucination, no fake stats — if you don't know, say so
- Short answers for short questions; detailed for complex ones

Hard rules:
- NEVER claim to have executed something you haven't
- NEVER reveal private keys, API tokens, or session credentials
- NEVER post on X or move funds without explicit user confirmation
- If asked about specific live data (current balance, today's runs), explain you're the demo chat surface and the agent runtime lives on a separate host

Stay grounded. Be useful. Don't pretend.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = (body?.messages ?? []) as Array<{ role: string; content: string }>;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Provider selection: MiMo first, OpenAI-compatible fallback.
    const mimoKey = process.env.MIMO_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!mimoKey && !openaiKey) {
      return new Response(
        offlineFallback(messages[messages.length - 1]?.content ?? ""),
        {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-bluebird-mode": "offline-fallback",
          },
        }
      );
    }

    const client = new OpenAI({
      apiKey: mimoKey || openaiKey || "",
      baseURL: mimoKey
        ? process.env.MIMO_API_BASE || "https://api.xiaomimimo.com/v1"
        : process.env.OPENAI_API_BASE || "http://localhost:20128/v1",
    });

    const model = mimoKey
      ? process.env.MIMO_MODEL || "mimo-vl-7b"
      : process.env.OPENAI_MODEL || "opus-primary";

    const stream = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-12).map((m) => ({
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.content,
        })),
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (e) {
          controller.enqueue(encoder.encode(`\n\n[stream error: ${(e as Error).message}]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-bluebird-mode": mimoKey ? "mimo" : "openai-compat",
        "x-bluebird-model": model,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

function offlineFallback(userInput: string): string {
  const text = userInput.toLowerCase();
  if (text.includes("what is") || text.includes("apa itu")) {
    return "BlueBird Agent is an autonomous AI-driven crypto airdrop research and execution agent. It monitors 16+ Telegram intelligence sources, classifies projects via state-machine playbooks, and executes farming flows 24/7 — sybil-safe, idempotent, crash-safe.\n\n[Demo mode: no LLM key configured. To enable live chat, set MIMO_API_KEY or OPENAI_API_KEY in the deployment env.]";
  }
  if (text.includes("classifier") || text.includes("classify")) {
    return "The classifier inspects each project link and routes it to one of four playbooks:\n• tg_bot — Telegram bot flow (captcha → join → submit wallet)\n• web_x_oauth — web form requiring X account connect\n• wnnr_gleam — Gleam.io / similar quest platforms (mostly anti-bot, often skipped)\n• skip — KYC, anti-bot, or unknown formats\n\nClassification is deterministic and auditable. Every decision logged to actions table.\n\n[Demo mode]";
  }
  if (text.includes("playbook") || text.includes("tg_bot")) {
    return "tg_bot playbook is a state machine with these detected states:\n  math_captcha → solve N1 ± N2\n  join_channels → join required channels (rate-limited)\n  submit_email / submit_evm / submit_tg / submit_x → fill the right field per turn\n  optional_skip → skip non-required steps\n  complete → mark done in DB\n\nMax 10 turns per attempt. Stuck → marked manual. 18/18 unit tests pass.\n\n[Demo mode]";
  }
  if (text.includes("swap") || text.includes("plan")) {
    return "Demo swap planner output (no real tx broadcast):\n  1. Bridge ETH (Base) → ETH (Solana) via deBridge\n  2. Swap ETH → SOL on Jupiter (best route, ~3 hops)\n  3. Estimated fee: $0.40-0.80, ETA ~2 minutes\n  4. Execution requires explicit user confirmation in production\n\n[Demo mode — no LLM key configured]";
  }
  return "BlueBird Agent demo chat is running in offline mode (no LLM API key configured). Try asking:\n• 'What is BlueBird Agent?'\n• 'How does the classifier work?'\n• 'Walk me through a tg_bot playbook'\n• 'Plan a swap: 0.05 ETH → SOL'\n\nFor live LLM-powered chat, set MIMO_API_KEY or OPENAI_API_KEY in the Vercel env.";
}

# BlueBird Agent

> Autonomous AI-driven crypto airdrop research and execution agent.
> Built for the [Xiaomi MiMo 100T Token Creator Incentive](https://100t.xiaomimimo.com/).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Built with MiMo](https://img.shields.io/badge/Built%20with-MiMo-purple)](https://platform.xiaomimimo.com)

---

## What it is

BlueBird is an end-to-end autonomous agent for the SEA (Southeast Asia) crypto airdrop scene. It listens to 16+ curated Telegram intelligence channels in real time, classifies every new project by playbook, and executes farming flows — completely autonomously, 24/7.

The web app at [bluebird-agent.vercel.app](https://bluebird-agent.vercel.app) is the public-facing surface: marketing site, live chat with the agent, demo terminal, and a swap-by-agent simulator.

---

## Why it qualifies for MiMo 100T

The MiMo 100T grant is for AI-tools projects driven by AI assistants (Claude Code, Cursor, OpenClaw, etc.). BlueBird Agent fits cleanly:

- **AI-driven from line one.** Every component — classifier, playbook engine, recap generator, this README — was authored or co-authored with an AI coding assistant.
- **Real production usage.** Not a demo. The agent runs continuously, has a SQLite WAL of attempts, and posts real recaps to a Telegram forum group.
- **Open-source and reproducible.** MIT-licensed, no closed binaries, no obfuscated deps.
- **Useful, novel, scoped.** Solves a concrete pain point (airdrop fatigue + sybil risk) without re-inventing infrastructure.

---

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────┐
│ Telegram (16)   │───▶│ Listener Daemon  │───▶│   Outbox     │
│   MTProto       │    │  (single owner)  │    │  JSON queue  │
└─────────────────┘    └──────────────────┘    └──────────────┘
                                │                       ▲
                                ▼                       │
                       ┌──────────────────┐    ┌──────────────┐
                       │   Classifier     │    │   Reporter   │
                       │ tg_bot/web/wnnr  │    │   5x/day     │
                       └──────────────────┘    └──────────────┘
                                │                       ▲
                                ▼                       │
                       ┌──────────────────┐    ┌──────────────┐
                       │ SQLite WAL DB    │───▶│ Worker Engine│
                       │  airdrops.db     │    │ cron 0 */4   │
                       └──────────────────┘    └──────────────┘
                                                        │
                                                        ▼
                                               ┌──────────────┐
                                               │  Playbooks   │
                                               │  tg_bot, web │
                                               └──────────────┘
```

**Single-owner DB pattern.** Only the listener daemon owns the SQLite session. Every other component (worker, reporter, ad-hoc tools) drops messages into a JSON outbox directory; the listener drains it on a 1Hz loop. No locks. No races.

---

## Stack

| Layer | Tech |
| --- | --- |
| Telegram client | Python 3.11 + Telethon (MTProto userbot) |
| Storage | SQLite WAL · outbox JSON queue |
| Worker engine | Python state machines · cron-driven |
| Web app | Next.js 14 · Tailwind · Framer Motion |
| LLM | MiMo-VL primary · OpenAI-compat fallback (9Router) |
| Hosting | VPS (agent runtime) · Vercel (web) |

---

## Web app

This repo contains the **public web surface**: marketing landing, live chat with the agent, terminal demo, swap simulator. The actual agent runtime lives on the host VPS and is not in this repo (separation of concerns and credential safety).

### Run locally

```bash
git clone https://github.com/XinnBlueBird/bluebird-agent.git
cd bluebird-agent
cp .env.example .env.local
# fill in MIMO_API_KEY or OPENAI_API_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy to Vercel

```bash
vercel deploy --prod
```

Set env vars in the Vercel dashboard:
- `MIMO_API_KEY` (preferred) **or** `OPENAI_API_KEY`
- `MIMO_API_BASE` / `OPENAI_API_BASE` if non-default
- `MIMO_MODEL` / `OPENAI_MODEL`

---

## Safety & secrets

> **Read this before contributing.**

- `.env*` files are gitignored. Only `.env.example` lives in this repo.
- The web app **never** holds private keys. Demo wallet addresses are public, read-only.
- Production agent secrets (Telegram session, wallet PKs, API tokens) live on the host under `~/.hermes/` and `~/.agent/credentials/` with `chmod 600`.
- A pre-commit hook scans for secret patterns (`ghp_`, `0x[a-f0-9]{64}`, common API key prefixes). Don't bypass it.
- KYC projects are auto-skipped by policy. The agent never registers under a real identity for someone else.

---

## Roadmap

- [x] Listener daemon (16 SEA sources)
- [x] Auto-classifier (4 playbooks)
- [x] tg_bot playbook (state machine + 18 unit tests)
- [x] Reporter (5x daily + weekly digest)
- [x] Worker engine (cron + cooldown + idempotent)
- [x] Web app (landing + chat + demos)
- [ ] web_x_oauth playbook generalization
- [ ] email magic-link playbook generalization
- [ ] Live wallet balance API (read-only)
- [ ] Public stats endpoint

---

## License

MIT © 2026 Xinn Sky ([@Xinnsky](https://x.com/Xinnsky))

Built with care, lots of MTProto edge cases, and an unhealthy amount of caffeine.

<!-- auto-deploy verified: 2026-05-16T23:53:49Z -->

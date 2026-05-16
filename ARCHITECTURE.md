# Architecture

A walkthrough of how BlueBird Agent works end-to-end. This document covers the runtime that lives on the host VPS, plus the Next.js web surface in this repo.

## Component map

| Component | Role | Concurrency model |
| --- | --- | --- |
| `listener.py` | Owns Telegram MTProto session + SQLite WAL writer | Single instance, systemd-managed |
| `outbox/` | Filesystem JSON queue | Producers append, listener drains 1Hz |
| `classifier.py` | URL → playbook mapping | Pure function, no I/O |
| `worker_engine.py` | Iterates queued projects, dispatches playbooks | cron `0 */4 * * *`, idempotent |
| `playbook_tg_bot.py` | State machine for Telegram bot flows | Per-attempt subprocess |
| `reporter.py` | Daily/weekly recap generator | cron 5x/day + weekly Mon |
| `bluebird-{say,mail,pk}` | Operator CLIs | Drop into outbox, stateless |
| Next.js app (this repo) | Public marketing + chat + demos | Vercel edge runtime |

## Data flow

```
TG channel msg
   │
   ▼
listener.py ─── inserts into messages table ───▶ SQLite WAL
   │
   │  (extract links, dedupe by URL hash)
   ▼
classifier.py ─── tags playbook + KYC flag ───▶ projects table
                                                   │
   ┌───────────────────────────────────────────────┘
   │
   ▼
worker_engine.py (cron)
   │  selects WHERE status='queued' AND requires_kyc=0 AND last_attempt < now()-6h
   │
   ▼
playbook_*.py (subprocess per project)
   │  state machine: detect → act → wait → repeat (max 10 turns)
   │
   ▼
attempts logged to actions table
   │
   ▼
reporter.py (cron)
   │  reads actions in window, formats recap
   │
   ▼
outbox/<topic>.json
   │
   ▼
listener.py drains → posts to forum topic via MTProto
```

## Why outbox queue

SQLite + Telethon both want exclusive write access. Two processes hitting `airdrops.db` or the same Telegram session at once = `database is locked` or `AuthKeyDuplicatedError`.

The outbox pattern fixes this without a message broker:

- Listener daemon is the **only** holder of the Telegram session and the SQLite write lock.
- Everything else writes JSON files into `outbox/<topic_slug>/<uuid>.json`.
- Listener has a 1Hz loop that drains the outbox in mtime order, sends each message, renames file to `.sent`.
- Atomic via filesystem rename. No external dependencies. Crash-safe.

## State machine playbooks

Each playbook is a tagged-state finite-state machine. Example for `tg_bot`:

```
init
 ├─ math_captcha (regex match) ─▶ solve & reply
 ├─ join_channels (button list) ─▶ join all → /start
 ├─ submit_email                 ─▶ post farming email
 ├─ submit_evm                   ─▶ post farm-N wallet
 ├─ submit_tg_username           ─▶ post @Anonbross
 ├─ submit_x_username            ─▶ post @AmericanBasedd
 ├─ optional_skip                ─▶ click skip button
 └─ complete                     ─▶ mark done in DB
```

If no detector matches for 10 consecutive turns → mark `manual` → operator handles.

## Idempotence + cooldown

- `attempts` table tracks every run with timestamp.
- Worker engine refuses to re-attempt within 6 hours.
- `done` and `failed` projects are terminal — never retried automatically.
- On crash mid-attempt, the project is left in `running` state; a self-healing pass on next worker tick promotes orphans to `failed` after 30 min.

## Web surface (this repo)

Pure Next.js 14 app router. No server-side state. The `/api/chat` route is the only backend touch:

- Reads `MIMO_API_KEY` first, then falls back to `OPENAI_API_KEY` (9Router-compatible).
- If neither is set, returns deterministic offline responses so the demo never hard-fails.
- Streams tokens via `ReadableStream` — works on Vercel edge.

The web app is fully static otherwise. No DB connection. No live wallet access. No secrets at the edge.

## Deployment topology

```
┌──────────────────────────────────┐    ┌─────────────────────┐
│  Host VPS (agent runtime)        │    │  Vercel edge (web)  │
│                                  │    │                     │
│  - listener.py (systemd)         │    │  - Next.js 14 app   │
│  - worker cron                   │    │  - /api/chat        │
│  - reporter cron                 │    │  - static landing   │
│  - SQLite + outbox/              │    │                     │
│  - ~/.hermes (secrets, sessions) │    │                     │
└──────────────────────────────────┘    └─────────────────────┘
                │                                  │
                └──── (no direct connection) ──────┘
```

The two are intentionally decoupled. The web app talks to LLM providers directly; the agent runtime is operator-controlled and never exposed to the internet.

## Future work

- Generalize `web_x_oauth` and `email_magic_link` playbooks (currently ad-hoc per project).
- Read-only public stats endpoint so the live `Stats` section pulls real numbers.
- Add tracing across the outbox boundary for auditability (OpenTelemetry).
- Support multiple Telegram identities (currently single `@Anonbross`).

# Helpdesk Project

## Overview
AI-powered support ticket management system. See `project-scope.md` for full requirements and `implementation-plan.md` for the build roadmap.

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript + React Router v7 + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + Express 5 + TypeScript, running on Bun
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Better Auth — email/password + database sessions (`better-auth` with Prisma adapter)
- **AI:** Claude API (Anthropic)
- **Email:** Resend (outbound) + Mailgun (inbound webhooks)
- **Deployment:** Docker

## Project Structure
```
helpdesk/
├── client/        # React + Vite frontend (port 5173)
└── server/        # Express API backend (port 3000)
```

## Development
```bash
bun run dev          # start both client and server
bun run dev:client   # client only
bun run dev:server   # server only
```

Vite proxies `/api/*` to `http://localhost:3000` — no CORS issues in dev.

## Rules
- All API routes must be prefixed with `/api`
- Always use Context7 to fetch up-to-date documentation before using any library or framework
- Use Bun as the package manager (`~/.bun/bin/bun`)

# Implementation Plan

## Phase 1 — Project Setup & Infrastructure

- [ ] Initialise monorepo structure (`/client`, `/server`)
- [ ] Set up Express server with TypeScript
- [ ] Set up React + Vite + TypeScript
- [ ] Set up PostgreSQL database
- [ ] Set up Prisma with PostgreSQL connection
- [ ] Configure ESLint + Prettier across both workspaces


## Phase 2 — Database Schema

- [ ] Define `User` model (id, email, password hash, role, timestamps)
- [ ] Define `Session` model for database-backed sessions
- [ ] Define `Ticket` model (id, subject, body, status, category, sender email, timestamps)
- [ ] Define `Message` model (ticket replies and email thread)
- [ ] Define `KnowledgeBaseArticle` model (title, content, timestamps)
- [ ] Run initial migrations


## Phase 3 — Auth

- [ ] Password hashing with bcrypt
- [ ] `POST /auth/login` — validate credentials, create session
- [ ] `POST /auth/logout` — destroy session
- [ ] `GET /auth/me` — return current user from session
- [ ] Session middleware using `express-session` + `connect-pg-simple`
- [ ] Auth guard middleware for protected routes
- [ ] Role guard middleware (`requireAdmin`, `requireAgent`)
- [ ] Frontend: login page
- [ ] Frontend: protected route wrapper
- [ ] Frontend: persist and restore auth state


## Phase 4 — User Management (Admin)

- [ ] `POST /admin/agents` — create agent account
- [ ] `GET /admin/agents` — list all agents
- [ ] `PATCH /admin/agents/:id` — update agent (deactivate, etc.)
- [ ] Seed script to create initial admin on first deploy
- [ ] Frontend: agent list page
- [ ] Frontend: create agent form


## Phase 5 — Ticket Core

- [ ] `POST /tickets` — create ticket manually
- [ ] `GET /tickets` — list tickets with filtering (status, category) and sorting
- [ ] `GET /tickets/:id` — ticket detail with message thread
- [ ] `PATCH /tickets/:id` — update status or category
- [ ] `POST /tickets/:id/messages` — add a reply to a ticket
- [ ] Frontend: dashboard with ticket list and stats
- [ ] Frontend: ticket list with filter/sort controls
- [ ] Frontend: ticket detail view with message thread
- [ ] Frontend: reply composer
- [ ] Frontend: status and category badge components


## Phase 6 — Email Integration

- [ ] Mailgun inbound webhook (`POST /webhooks/mailgun`) — parse and create ticket from email
- [ ] Extract sender, subject, body, and attachments from inbound payload
- [ ] Match inbound reply emails to existing tickets (via `References` / `In-Reply-To` headers)
- [ ] Resend integration — send outbound replies from ticket detail
- [ ] Store sent emails as messages on the ticket thread


## Phase 7 — AI Features

- [ ] Integrate Claude API client (shared service module)
- [ ] Auto-classify ticket on creation (set category via AI)
- [ ] Generate AI summary for ticket detail view
- [ ] Generate AI-suggested reply for agent review
- [ ] Auto-generate response using knowledge base articles as context
- [ ] Frontend: display AI summary on ticket detail
- [ ] Frontend: "Use suggestion" button to insert AI reply into composer
- [ ] Frontend: show classification confidence or allow override


## Phase 8 — Knowledge Base

- [ ] `GET /knowledge-base` — list articles
- [ ] `POST /knowledge-base` — create article (admin only)
- [ ] `PATCH /knowledge-base/:id` — update article (admin only)
- [ ] `DELETE /knowledge-base/:id` — delete article (admin only)
- [ ] Wire relevant articles into AI response generation (retrieval by category)
- [ ] Frontend: knowledge base management page (admin)


## Phase 9 — Production & Deployment

- [ ] Write production `Dockerfile` for server
- [ ] Write production `Dockerfile` for client (Nginx static build)
- [ ] Write production `docker-compose.yml`
- [ ] Database migration step in container startup
- [ ] Health check endpoint (`GET /health`)
- [ ] Centralised error handling middleware
- [ ] Request logging (morgan or pino)
- [ ] Environment variable validation on startup

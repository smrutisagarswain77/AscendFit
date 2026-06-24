# AI Context — Handoff Document

> **Critical:** Read this file first before making any code changes.  
> **Source of truth:** Ascension System specification  
> **Last updated:** 2026-06-23

---

## Project Summary

**AscendFit** is a gamified fitness mobile application built per the **Ascension System** specification at `d:\AscendFit`. Users track workouts, earn XP, complete daily quests, progress through levels, and generate AI-assisted workouts — with push notifications for engagement.

**Current state:** Documentation and architecture are complete for the Ascension System stack. **No application code exists yet.** The workspace contains only the `/docs` folder (11 governance files).

### Confirmed Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile frontend | **React Native** + **TypeScript** — Android first, scalable to iOS |
| Backend | **Python** + **Django** |
| API | **Django REST Framework** |
| Database | **PostgreSQL** |
| Authentication | **JWT** (access + refresh via `djangorestframework-simplejwt`) |
| AI | **OpenAI API** (server-side proxy in Django `ai` app) |
| Mobile state | React Context + custom hooks |
| Architecture | Feature-first modular, Service layer, Repository/API client pattern |
| Version control | Git with conventional commits per milestone |

---

## Architecture Summary

```
AscendFit/
├── backend/                 ← Django + DRF (not yet created)
│   └── apps/
│       ├── accounts/
│       ├── workouts/
│       ├── exercises/
│       ├── gamification/
│       └── ai/
├── mobile/                  ← React Native + TypeScript (not yet created)
│   └── src/
│       ├── core/            ← api, auth, navigation, theme, utils
│       ├── shared/          ← components, hooks, types
│       └── features/        ← auth, profile, workouts, exercises, xp, quests, ai, notifications
└── docs/                    ← 11 governance files (only content so far)
```

### Layer Flow

**Mobile:**
```
Screen → Hook/Context → Service → API Client → Django REST API
```

**Backend:**
```
View/ViewSet → Serializer → Service → Model → PostgreSQL
                                    ↘ OpenAI API (ai app)
```

- **Never** call HTTP or OpenAI directly from React Native screens.
- **Never** expose OpenAI API keys on the mobile client.
- **Hooks/Context** manage UI state (loading, error, data) and call services.
- **Services** contain business logic orchestration.
- **API client** attaches JWT Bearer token, handles 401 refresh.

### Data Model (PostgreSQL via Django ORM)

| Table | Scope | Purpose |
|-------|-------|---------|
| `auth_user` | Per user | Django user (email login) |
| `user_profiles` | Per user | Profile, level, XP, streak, FCM token |
| `workouts` | Per user | Workout sessions |
| `workout_exercises` | Per workout | Exercises and sets within session |
| `xp_transactions` | Per user | XP earn history |
| `quest_progress` | Per user | Daily quest progress |
| `exercises` | Global | Exercise catalog (read-only for users) |
| `quest_templates` | Global | Quest definitions (admin-managed) |

See `DATABASE_SCHEMA.md` for full field definitions.

---

## Current Development State

| Item | Status |
|------|--------|
| Documentation | ✅ Complete (11 files, Ascension System stack) |
| Tech stack | ✅ Decided (see `DECISIONS.md`) |
| Django backend | ❌ Not scaffolded |
| React Native mobile | ❌ Not scaffolded |
| PostgreSQL | ❌ Not provisioned |
| OpenAI API | ❌ Not configured |
| Application features | ❌ None implemented |

**Phase:** Sprint 0 — Foundation  
**Milestone M0 (Docs & stack):** Complete  
**Next milestone M1:** Backend + mobile scaffold + PostgreSQL

---

## Active Features

| Feature | Status |
|---------|--------|
| Documentation governance | Complete |
| Architecture & schema design | Complete |

No application features are implemented.

---

## Pending Features (Priority Order)

1. Git initialization (if not done)
2. Django backend scaffold with DRF + PostgreSQL
3. React Native mobile scaffold with TypeScript
4. JWT authentication (backend + mobile)
5. User profiles (DRF + avatar upload)
6. Workout CRUD + active session
7. XP system + level calculation
8. Daily quests + claim rewards
9. AI workout generator (OpenAI via Django)
10. Push notifications
11. iOS build (post-MVP)

Full detail: `FEATURES.md`, `NEXT_TASKS.md`

---

## Important Decisions

| ID | Decision | Date |
|----|----------|------|
| ADR-001 | React Native + TypeScript, Android first | 2026-06-23 |
| ADR-002 | Python + Django + DRF backend | 2026-06-23 |
| ADR-003 | PostgreSQL database | 2026-06-23 |
| ADR-004 | JWT authentication | 2026-06-23 |
| ADR-005 | Django media storage | 2026-06-23 |
| ADR-006 | React Native push notifications | 2026-06-23 |
| ADR-007 | React Context + hooks (mobile state) | 2026-06-23 |
| ADR-008 | Feature-first modular architecture | 2026-06-23 |
| ADR-009 | Service + Repository/API client pattern | 2026-06-23 |
| ADR-010 | Git conventional commits | 2026-06-23 |
| ADR-011 | Documentation-first workflow | 2026-06-23 |
| ADR-017 | OpenAI API (server-side proxy) | 2026-06-23 |

Open: ADR-012 (navigation), ADR-013 (MVP scope), ADR-015 (exercise seed), ADR-016 (XP formula), ADR-018 (RN bootstrap), ADR-019 (object storage)

Full detail: `DECISIONS.md`

---

## Coding Standards

1. Read `AI_CONTEXT.md` → `CURRENT_PROGRESS.md` → `NEXT_TASKS.md` before coding.
2. Update documentation **before** implementing code changes.
3. After coding: update docs → `CHANGELOG.md` → `CURRENT_PROGRESS.md` → `NEXT_TASKS.md`.
4. Feature-first: mobile code under `mobile/src/features/{name}/`; backend code in Django apps.
5. Layer separation: no HTTP in screens; no OpenAI calls outside `ai` app service.
6. JWT tokens stored in AsyncStorage; refresh on 401.
7. User-scoped DRF querysets must filter by `request.user`.
8. Workout completion uses Django `@transaction.atomic`.
9. Meaningful commits: `feat:`, `fix:`, `docs:`, `refactor:` — never vague messages.
10. Android-first: test on Android emulator/device.

---

## Environment Requirements

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥ 18 | React Native tooling |
| Python | ≥ 3.11 | Django backend |
| PostgreSQL | ≥ 16 | Database |
| Docker | Latest | PostgreSQL container (optional) |
| Android Studio | Latest | Android SDK, emulator |
| Git | Latest | Version control |

### Configuration (Not Yet Set Up)

| File / Variable | Location | Notes |
|-----------------|----------|-------|
| `DATABASE_URL` | Backend `.env` | PostgreSQL connection — **not in git** |
| `OPENAI_API_KEY` | Backend `.env` | OpenAI access — **not in git** |
| `SECRET_KEY` | Backend `.env` | Django secret — **not in git** |
| `API_BASE_URL` | Mobile `.env` | DRF API URL for emulator/device |

### Planned Backend Dependencies (`requirements.txt`)

```
django
djangorestframework
djangorestframework-simplejwt
psycopg2-binary
django-cors-headers
openai
Pillow
```

### Planned Mobile Dependencies

```
@react-navigation/native
@react-navigation/native-stack
@react-navigation/bottom-tabs
@react-native-async-storage/async-storage
axios
```

---

## Known Issues

1. **No application code** — all architectural docs describe planned implementation.
2. **No PostgreSQL** — required before Django migrations.
3. **No OpenAI API key** — required before AI feature development.
4. **XP level formula undecided** — ADR-016 open; placeholder table in `DATABASE_SCHEMA.md`.
5. **Previous Flutter/Firebase stack obsolete** — fully replaced in documentation.

---

## Recommended Next Steps

1. **Initialize git** and commit documentation (if not done).
2. **Scaffold Django backend** with apps per `ARCHITECTURE.md`.
3. **Provision PostgreSQL** via Docker Compose.
4. **Scaffold React Native app** with TypeScript and feature-first folders.
5. **Implement JWT auth vertical slice** as first end-to-end feature.

---

## AI Handoff Notes

### Must-know for next session

- Stack is **decided per Ascension System** — do not re-debate React Native vs Flutter or Firebase vs Django.
- Use **React Context + hooks** for mobile state unless ADR-007 is formally superseded.
- Use **Django + DRF** for all API endpoints — no Firebase SDK.
- Use **JWT** — not Firebase Auth or session cookies for mobile.
- Use **OpenAI API only on backend** — mobile calls `/api/ai/generate-workout/`.
- Use **feature-first** folders on mobile and **Django apps** on backend.
- **Android first** — primary testing target is Android emulator/device.
- PostgreSQL uses **relational tables** with FK to user — not Firestore subcollections.
- Exercise catalog and quest templates are **global tables** (read-only for users).
- Workout completion uses **Django atomic transactions** (workout + XP + quest progress).

### Documentation map

| Need | File |
|------|------|
| Product vision & stack | `PROJECT_OVERVIEW.md` |
| Folder structure & data flow | `ARCHITECTURE.md` |
| PostgreSQL tables & fields | `DATABASE_SCHEMA.md` |
| REST API endpoints | `API_DOCUMENTATION.md` |
| Screens, routes, navigation | `UI_SCREENS.md` |
| Feature status | `FEATURES.md` |
| Sprint progress & blockers | `CURRENT_PROGRESS.md` |
| Prioritized task list | `NEXT_TASKS.md` |
| Change history | `CHANGELOG.md` |
| Architecture decisions (ADRs) | `DECISIONS.md` |
| This handoff summary | `AI_CONTEXT.md` |

### Governance workflow

```
Before coding:  AI_CONTEXT → CURRENT_PROGRESS → NEXT_TASKS → DECISIONS
During coding:  update docs first → implement → verify against source
After coding:   CHANGELOG → CURRENT_PROGRESS → NEXT_TASKS → AI_CONTEXT → commit
```

### Suggested first code commits (after scaffold)

```
feat: scaffold Django backend with DRF, JWT, and PostgreSQL configuration
feat: scaffold React Native TypeScript app with feature-first architecture
```

---

*This file must be updated after every meaningful change.*

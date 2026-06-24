# Architecture & Product Decisions

> **Purpose:** Record significant technical and product decisions so future developers (and AI agents) understand *why* choices were made.  
> **Source of truth:** Ascension System specification  
> **Last updated:** 2026-06-23

---

## Decision Log

### ADR-001: Mobile Platform — React Native (Android First)

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Ascension System requires a cross-platform mobile app with fast iteration and strong UI for a gamified fitness experience. |
| **Decision** | Use **React Native** with **TypeScript**. Target **Android first**, scalable to **iOS**. |
| **Alternatives considered** | Flutter, native Kotlin/Swift |
| **Rationale** | TypeScript ecosystem, large community, strong API-driven architecture fit with Django REST backend. |
| **Consequences** | iOS build maintained but not primary focus until Android MVP is stable. |

---

### ADR-002: Backend — Python + Django + Django REST Framework

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Ascension System requires a structured backend with REST API, admin tooling, and relational data integrity. |
| **Decision** | Use **Python**, **Django**, and **Django REST Framework (DRF)** as the API layer. |
| **Alternatives considered** | FastAPI, Node/Express, Firebase BaaS |
| **Rationale** | Mature ORM, built-in admin, DRF serializers/views, strong PostgreSQL integration, testable service layer. |
| **Consequences** | Server deployment required (vs BaaS); full control over business logic and AI proxy. |

---

### ADR-003: Database — PostgreSQL

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need relational integrity for users, workouts, quests, XP events, and exercise catalog. |
| **Decision** | Use **PostgreSQL** as the primary database via Django ORM. |
| **Alternatives considered** | MySQL, SQLite (dev only), Cloud Firestore |
| **Rationale** | ACID transactions, joins, indexes, JSON fields where needed; aligns with Django best practices. |
| **Consequences** | Migrations managed via Django; database must be provisioned for each environment. |

---

### ADR-004: Authentication — JWT

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Mobile client needs stateless, token-based authentication against DRF API. |
| **Decision** | Use **JWT** (access + refresh tokens) via `djangorestframework-simplejwt`. |
| **Alternatives considered** | Session auth, OAuth-only, Firebase Auth |
| **Rationale** | Standard for mobile + REST; refresh token rotation; no server-side session store required. |
| **Consequences** | Token storage and refresh logic required on mobile; secure token handling mandatory. |

---

### ADR-005: File Storage — Django + Media Backend

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Users need profile avatars; future features may include workout media. |
| **Decision** | Use **Django `FileField`/`ImageField`** with configurable storage backend (local dev, S3-compatible for production). |
| **Alternatives considered** | Firebase Storage, Cloudinary |
| **Rationale** | Unified with Django models; media URLs served via API or CDN. |
| **Consequences** | Production requires object storage configuration; client-side compression recommended. |

---

### ADR-006: Notifications — React Native Push

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Daily quests and streaks require timely user re-engagement. |
| **Decision** | Use **React Native push notification libraries** with backend-triggered notifications via Django (FCM/APNs integration planned). |
| **Alternatives considered** | Firebase Cloud Messaging only, local notifications only |
| **Rationale** | Decoupled from Firebase BaaS; backend controls notification scheduling and content. |
| **Consequences** | FCM/APNs credentials and device token storage in PostgreSQL required. |

---

### ADR-007: Mobile State Management — React Context + Hooks (MVP)

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need predictable, testable state management for MVP without excessive boilerplate. |
| **Decision** | Use **React Context + custom hooks** for auth and app state; feature-scoped hooks for domain logic. |
| **Alternatives considered** | Redux Toolkit, Zustand, MobX |
| **Rationale** | Low overhead for MVP; sufficient for feature-scoped state; easy migration to Redux/Zustand if needed. |
| **Consequences** | Large apps may adopt Redux Toolkit or Zustand later. |

---

### ADR-008: Architecture Pattern — Feature-First Modular

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Multiple feature domains (auth, workouts, XP, quests) must scale independently. |
| **Decision** | **Mobile:** organize under `mobile/src/features/{feature}/`. **Backend:** Django apps per domain (`accounts`, `workouts`, `gamification`, etc.). |
| **Alternatives considered** | Layer-first only, monolithic Django app |
| **Rationale** | Features are vertically sliced; teams/agents can work on one feature without cross-cutting churn. |
| **Consequences** | Shared code in `mobile/src/shared/` and `mobile/src/core/`; shared Django utilities in project package. |

---

### ADR-009: Data Access — Service + Repository Pattern

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | UI must not call HTTP/ORM directly; business logic must be testable. |
| **Decision** | **Mobile:** Screens → Hooks/Context → Services → API Client → DRF. **Backend:** Views → Serializers → Services → Models → PostgreSQL. |
| **Alternatives considered** | Direct API calls in components, fat views without services |
| **Rationale** | Clear separation: API clients handle HTTP; services handle business rules (XP math, quest validation). |
| **Consequences** | More files per feature; compensated by testability and maintainability. |

---

### ADR-010: Version Control — Git with Conventional Commits

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need traceable history aligned with documentation updates. |
| **Decision** | Use **Git** with meaningful conventional commits after every completed milestone (`feat:`, `fix:`, `docs:`, `refactor:`). |
| **Alternatives considered** | Unstructured commit messages |
| **Rationale** | Supports governance workflow; enables changelog automation later. |
| **Consequences** | Documentation updates should accompany or precede feature commits. |

---

### ADR-011: Documentation-First Workflow

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Multi-agent and multi-developer continuity requires synchronized knowledge. |
| **Decision** | Update documentation **before** code changes; maintain `/docs` as living project memory aligned with Ascension System spec. |
| **Alternatives considered** | Docs after development, docs only at release |
| **Rationale** | Prevents drift; enables AI handoff via `AI_CONTEXT.md`. |
| **Consequences** | Slight upfront overhead; pays off in reduced onboarding time. |

---

### ADR-017: AI Provider — OpenAI API

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Ascension System includes AI-assisted workout generation; API keys must not live on the mobile client. |
| **Decision** | Use **OpenAI API** proxied through Django backend service (`ai` app). |
| **Alternatives considered** | Gemini, on-device models, client-side API calls |
| **Rationale** | Server-side proxy protects API keys; DRF endpoint returns structured workout plans. |
| **Consequences** | OpenAI API key in server env; rate limiting and cost monitoring required. |

---

## Superseded Decisions

The following ADRs from the previous Flutter/Firebase stack are **superseded** by ADR-001 through ADR-004 and ADR-017:

| Former ADR | Former Decision | Superseded By |
|------------|-----------------|---------------|
| Flutter mobile | Flutter | ADR-001 (React Native) |
| Firebase BaaS | Firebase | ADR-002 (Django + DRF) |
| Cloud Firestore | Firestore | ADR-003 (PostgreSQL) |
| Firebase Auth | Firebase Authentication | ADR-004 (JWT) |
| Firebase Storage | Firebase Storage | ADR-005 (Django media) |
| FCM direct | Firebase Cloud Messaging | ADR-006 (RN push + Django) |
| Provider | Provider (Flutter) | ADR-007 (React Context + hooks) |

---

## Pending Decisions

| ID | Topic | Options | Status |
|----|-------|---------|--------|
| ADR-012 | Navigation library | React Navigation vs Expo Router | **Open** — React Navigation recommended |
| ADR-013 | MVP feature scope | Which features in v1.0 | **Open** |
| ADR-015 | Exercise catalog source | Seed data vs external API | **Open** |
| ADR-016 | XP formula | Linear vs exponential leveling | **Open** |
| ADR-018 | Mobile bootstrap | Bare RN vs Expo | **Open** |
| ADR-019 | Object storage | Local vs S3-compatible for production media | **Open** |

---

## How to Add a Decision

1. Assign the next ADR number.
2. Fill in Date, Status, Context, Decision, Alternatives, Rationale, Consequences.
3. Update `AI_CONTEXT.md` Important Decisions section.
4. Add entry to `CHANGELOG.md`.
5. Cross-reference in `ARCHITECTURE.md` if architectural impact.

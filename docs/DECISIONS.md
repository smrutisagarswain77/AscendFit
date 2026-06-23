# Architecture & Product Decisions

> **Purpose:** Record significant technical and product decisions so future developers (and AI agents) understand *why* choices were made.  
> **Last updated:** 2026-06-23

---

## Decision Log

### ADR-001: Mobile Platform — Flutter (Android First)

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need a cross-platform mobile app with fast iteration and strong UI capabilities for a gamified fitness experience. |
| **Decision** | Use **Flutter** as the mobile framework. Target **Android first**, with architecture and project structure scalable to **iOS**. |
| **Alternatives considered** | React Native, native Kotlin/Swift |
| **Rationale** | Single codebase, strong widget system for custom UI (XP bars, quest cards), excellent Android tooling, mature Firebase integration. |
| **Consequences** | iOS build maintained but not primary focus until Android MVP is stable. |

---

### ADR-002: Backend — Firebase (BaaS)

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Greenfield project needs rapid MVP delivery without operating custom server infrastructure. |
| **Decision** | Use **Firebase** as the backend platform. |
| **Alternatives considered** | Custom Node/Python API + PostgreSQL, Supabase |
| **Rationale** | Integrated Auth, Firestore, Storage, and FCM in one ecosystem; official Flutter SDKs; Security Rules for access control; offline support on mobile. |
| **Consequences** | Vendor coupling to Google Cloud; complex server logic deferred to Cloud Functions when needed. |

---

### ADR-003: Database — Cloud Firestore

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need flexible schema for user profiles, workouts, quests, and XP events with real-time sync. |
| **Decision** | Use **Cloud Firestore** (NoSQL document database). |
| **Alternatives considered** | Realtime Database, PostgreSQL via Cloud SQL |
| **Rationale** | Hierarchical data (user subcollections), real-time listeners, offline persistence, scales with Firebase Auth UID scoping. |
| **Consequences** | Query patterns must respect Firestore indexing limits; relational joins replaced by denormalization where needed. |

---

### ADR-004: Authentication — Firebase Authentication

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Secure user identity required for all user-scoped data. |
| **Decision** | Use **Firebase Authentication** with email/password for MVP. |
| **Alternatives considered** | Custom JWT auth, Auth0 |
| **Rationale** | Native integration with Firestore Security Rules via `request.auth.uid`; session persistence handled by SDK. |
| **Consequences** | OAuth providers (Google, Apple) can be added later without architectural change. |

---

### ADR-005: File Storage — Firebase Storage

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Users need profile avatars; future features may include workout media. |
| **Decision** | Use **Firebase Storage** for user-generated files. |
| **Alternatives considered** | Cloudinary, S3 |
| **Rationale** | Unified Firebase security model; path-based rules aligned with Auth UID. |
| **Consequences** | Storage costs scale with media usage; compression should be applied client-side. |

---

### ADR-006: Notifications — Firebase Cloud Messaging

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Daily quests and streaks require timely user re-engagement. |
| **Decision** | Use **Firebase Cloud Messaging (FCM)** for push notifications. |
| **Alternatives considered** | OneSignal, local notifications only |
| **Rationale** | Native Firebase integration; supports data and notification payloads; works with Cloud Functions for scheduling. |
| **Consequences** | Android notification channels required; iOS APNs setup needed when iOS is prioritized. |

---

### ADR-007: State Management — Provider

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Need predictable, testable state management without excessive boilerplate for MVP. |
| **Decision** | Use **Provider** (`ChangeNotifier` + `MultiProvider`). |
| **Alternatives considered** | Riverpod, Bloc, GetX |
| **Rationale** | Official Flutter team recommendation; low learning curve; sufficient for feature-scoped state; easy to test with mocks. |
| **Consequences** | Large apps may migrate to Riverpod later; avoid over-nesting providers. |

---

### ADR-008: Architecture Pattern — Feature-First Modular

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | Multiple feature domains (auth, workouts, XP, quests) must scale independently. |
| **Decision** | Organize code **feature-first** under `lib/features/{feature}/` with `data/`, `domain/`, `presentation/`, and `services/` subfolders. |
| **Alternatives considered** | Layer-first (all repositories together), clean architecture packages |
| **Rationale** | Features are vertically sliced; teams/agents can work on one feature without cross-cutting churn. |
| **Consequences** | Shared code must live in `lib/shared/` or `lib/core/` to avoid circular imports. |

---

### ADR-009: Data Access — Service + Repository Pattern

| Field | Value |
|-------|-------|
| **Date** | 2026-06-23 |
| **Status** | Accepted |
| **Context** | UI must not call Firebase SDK directly; business logic must be testable. |
| **Decision** | **Providers → Services → Repositories → Datasources (Firebase SDK)** |
| **Alternatives considered** | Direct Firestore in widgets, Repository-only without services |
| **Rationale** | Clear separation: repositories handle data I/O; services handle business rules (XP math, quest validation). |
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
| **Decision** | Update documentation **before** code changes; maintain `/docs` as living project memory. |
| **Alternatives considered** | Docs after development, docs only at release |
| **Rationale** | Prevents drift; enables AI handoff via `AI_CONTEXT.md`. |
| **Consequences** | Slight upfront overhead; pays off in reduced onboarding time. |

---

## Pending Decisions

| ID | Topic | Options | Status |
|----|-------|---------|--------|
| ADR-012 | Routing library | go_router vs auto_route | **Open** — go_router recommended |
| ADR-013 | MVP feature scope | Which features in v1.0 | **Open** |
| ADR-014 | AI provider | OpenAI, Gemini, Cloud Functions proxy | **Open** — post-MVP |
| ADR-015 | Exercise catalog source | Seed data vs external API | **Open** |
| ADR-016 | XP formula | Linear vs exponential leveling | **Open** |

---

## How to Add a Decision

1. Assign the next ADR number.
2. Fill in Date, Status, Context, Decision, Alternatives, Rationale, Consequences.
3. Update `AI_CONTEXT.md` Important Decisions section.
4. Add entry to `CHANGELOG.md`.
5. Cross-reference in `ARCHITECTURE.md` if architectural impact.

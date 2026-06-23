# AI Context — Handoff Document

> **Critical:** Read this file first before making any code changes.  
> **Last updated:** 2026-06-23

---

## Project Summary

**AscendFit** is a gamified fitness mobile application being built at `d:\AscendFit`. Users track workouts, earn XP, complete daily quests, and progress through levels — with push notifications for engagement.

**Current state:** Documentation and architecture are complete. **No Flutter application code exists yet.** The workspace contains only the `/docs` folder (11 governance files).

### Confirmed Tech Stack

| Layer | Technology |
|-------|------------|
| Platform | **Flutter** — Android first, scalable to iOS |
| Backend | **Firebase** (BaaS) |
| Database | **Cloud Firestore** |
| Authentication | **Firebase Authentication** (email/password MVP) |
| Storage | **Firebase Storage** (avatars, media) |
| Notifications | **Firebase Cloud Messaging (FCM)** |
| State management | **Provider** (ChangeNotifier + MultiProvider) |
| Architecture | Feature-first modular, Service layer, Repository pattern |
| Version control | Git with conventional commits per milestone |

---

## Architecture Summary

```
AscendFit/
└── docs/                    ← 11 governance files (only content so far)

Target (not yet created):
lib/
├── main.dart / app.dart
├── core/                    ← theme, routing, firebase, constants, utils
├── shared/                  ← shared widgets, models, app-level providers
└── features/
    ├── auth/                ← data/, domain/, presentation/, services/
    ├── profile/
    ├── workouts/
    ├── exercises/
    ├── xp/
    ├── quests/
    └── notifications/
```

### Layer Flow

```
Screen → Provider → Service → Repository → Firebase SDK
```

- **Never** call Firebase directly from widgets.
- **Providers** manage UI state (loading, error, data) and call services.
- **Services** contain business logic (XP calculation, quest validation).
- **Repositories** abstract Firestore/Auth/Storage paths.

### Firebase Data Model (Firestore)

| Collection | Scope | Purpose |
|------------|-------|---------|
| `users/{uid}` | Per user | Profile, level, XP, streak, FCM token |
| `users/{uid}/workouts/{id}` | Per user | Workout sessions |
| `users/{uid}/xp_transactions/{id}` | Per user | XP earn history |
| `users/{uid}/quest_progress/{id}` | Per user | Daily quest progress |
| `exercises/{id}` | Global | Exercise catalog (read-only) |
| `quests/{id}` | Global | Quest templates (read-only) |

See `DATABASE_SCHEMA.md` for full field definitions.

---

## Current Development State

| Item | Status |
|------|--------|
| Documentation | ✅ Complete (11 files) |
| Tech stack | ✅ Decided (see `DECISIONS.md`) |
| Flutter project | ❌ Not scaffolded |
| Firebase project | ❌ Not linked |
| Git repository | ❌ Not initialized |
| Application features | ❌ None implemented |

**Phase:** Sprint 0 — Foundation  
**Milestone M0 (Docs & stack):** Complete  
**Next milestone M1:** Flutter scaffold + Firebase setup

---

## Active Features

| Feature | Status |
|---------|--------|
| Documentation governance | Complete |
| Architecture & schema design | Complete |

No application features are implemented.

---

## Pending Features (Priority Order)

1. Git initialization
2. Flutter project scaffold with feature-first structure
3. Firebase project setup (Auth, Firestore, Storage, FCM)
4. Firestore security rules deployment
5. Authentication vertical slice (register, login, logout)
6. App shell (theme, routing, bottom nav)
7. User profiles (Firestore + avatar upload)
8. Workout CRUD + active session
9. XP system + level calculation
10. Daily quests + claim rewards
11. FCM push notifications
12. AI workout generator (post-MVP)

Full detail: `FEATURES.md`, `NEXT_TASKS.md`

---

## Important Decisions

| ID | Decision | Date |
|----|----------|------|
| ADR-001 | Flutter, Android first | 2026-06-23 |
| ADR-002 | Firebase BaaS backend | 2026-06-23 |
| ADR-003 | Cloud Firestore database | 2026-06-23 |
| ADR-004 | Firebase Authentication | 2026-06-23 |
| ADR-005 | Firebase Storage | 2026-06-23 |
| ADR-006 | Firebase Cloud Messaging | 2026-06-23 |
| ADR-007 | Provider state management | 2026-06-23 |
| ADR-008 | Feature-first modular architecture | 2026-06-23 |
| ADR-009 | Service + Repository pattern | 2026-06-23 |
| ADR-010 | Git conventional commits | 2026-06-23 |
| ADR-011 | Documentation-first workflow | 2026-06-23 |

Open: ADR-012 (routing lib), ADR-013 (MVP scope), ADR-014 (AI provider), ADR-015 (exercise seed), ADR-016 (XP formula)

Full detail: `DECISIONS.md`

---

## Coding Standards

1. Read `AI_CONTEXT.md` → `CURRENT_PROGRESS.md` → `NEXT_TASKS.md` before coding.
2. Update documentation **before** implementing code changes.
3. After coding: update docs → `CHANGELOG.md` → `CURRENT_PROGRESS.md` → `NEXT_TASKS.md`.
4. Feature-first: all feature code lives under `lib/features/{name}/`.
5. Layer separation: UI → Provider → Service → Repository → Firebase.
6. No Firebase SDK calls in widgets or providers — only in repositories/datasources.
7. Use `ChangeNotifier` providers; register via `MultiProvider` in `app.dart`.
8. Firestore paths as constants in `core/constants/firestore_paths.dart`.
9. Meaningful commits: `feat:`, `fix:`, `docs:`, `refactor:` — never vague messages.
10. Android-first: test on Android emulator/device; keep iOS folder maintained.

---

## Environment Requirements

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Flutter SDK | ≥ 3.16 | Mobile framework |
| Dart SDK | ≥ 3.2 | Language |
| Android Studio | Latest | Android SDK, emulator |
| Firebase CLI | Latest | Rules deploy, emulators |
| FlutterFire CLI | Latest | Firebase config generation |
| Git | Latest | Version control |

### Firebase Configuration (Not Yet Set Up)

| File | Location | Notes |
|------|----------|-------|
| `google-services.json` | `android/app/` | From Firebase Console — **not in git** |
| `firebase_options.dart` | `lib/core/firebase/` | Generated by `flutterfire configure` |
| `firestore.rules` | Project root | Security rules |
| `storage.rules` | Project root | Storage access rules |

### Planned pubspec.yaml Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^latest
  firebase_auth: ^latest
  cloud_firestore: ^latest
  firebase_storage: ^latest
  firebase_messaging: ^latest
  provider: ^latest
  go_router: ^latest
```

---

## Known Issues

1. **No application code** — all architectural docs describe planned implementation.
2. **No git history** — initialize before first feature commit.
3. **No Firebase project** — required before any Firebase feature development.
4. **XP level formula undecided** — ADR-016 open; placeholder table in `DATABASE_SCHEMA.md`.
5. **MVP scope not finalized** — AI generator confirmed as post-MVP; confirm quest priority.

---

## Recommended Next Steps

1. **Initialize git** and commit documentation:
   ```
   git init && git add . && git commit -m "docs: establish Flutter Firebase stack and governance documentation"
   ```
2. **Scaffold Flutter project:**
   ```
   flutter create --org com.ascendfit --project-name ascendfit .
   ```
3. **Create Firebase project** and run `flutterfire configure`
4. **Create folder structure** per `ARCHITECTURE.md`
5. **Implement auth vertical slice** as first end-to-end feature

---

## AI Handoff Notes

### Must-know for next session

- Stack is **decided** — do not re-debate Flutter vs RN or Firebase vs custom API.
- Use **Provider**, not Riverpod/Bloc, unless ADR-007 is formally superseded.
- Use **feature-first** folders — not layer-first (`all repos together`).
- **Android first** — primary testing target is Android emulator/device.
- Firestore uses **subcollections** under `users/{uid}/` for user data.
- Exercise catalog and quest templates are **global collections** (read-only for users).
- Complete workouts should use **Firestore batch writes** (workout update + XP transaction + quest progress).

### Documentation map

| Need | File |
|------|------|
| Product vision & stack | `PROJECT_OVERVIEW.md` |
| Folder structure & data flow | `ARCHITECTURE.md` |
| Firestore collections & fields | `DATABASE_SCHEMA.md` |
| Firebase SDK operations | `API_DOCUMENTATION.md` |
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

### Suggested first code commit (after scaffold)

```
feat: scaffold Flutter project with feature-first architecture and Firebase dependencies
```

---

*This file must be updated after every meaningful change.*

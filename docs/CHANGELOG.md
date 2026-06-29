# Changelog

All meaningful project changes are recorded here.

---

## 2026-06-29

Type
feat

Description

Completed the backend MVP foundation.

Added

• JWT Authentication
• User Registration
• Profile API
• Workout CRUD
• Exercise CRUD
• WorkoutExercise CRUD
• Docker PostgreSQL integration
• Django Admin configuration
• Protected user querysets
• JWT authorization
• Postman API testing

Current Status

Backend MVP approximately 40% complete.
Beginning Gamification module.

## 2026-06-23 (Update 3)

**Type:** docs

**Description:**  
Migrated entire documentation system from obsolete Flutter/Firebase stack to **Ascension System specification**. New stack: React Native + TypeScript (mobile), Python + Django + Django REST Framework (backend), PostgreSQL (database), JWT (authentication), OpenAI API (AI). Rewrote architecture, database schema (Firestore → PostgreSQL relational tables), API documentation (Firebase SDK → REST endpoints), UI screens (Flutter → React Navigation), features, progress, next tasks, and AI context. Added ADR-017 (OpenAI API). Marked former Flutter/Firebase ADRs as superseded in `DECISIONS.md`. AI workout generator moved into MVP scope via server-side Django proxy.

**Files Modified:**

* `docs/PROJECT_OVERVIEW.md` (updated)
* `docs/ARCHITECTURE.md` (updated)
* `docs/DATABASE_SCHEMA.md` (updated)
* `docs/API_DOCUMENTATION.md` (updated)
* `docs/UI_SCREENS.md` (updated)
* `docs/FEATURES.md` (updated)
* `docs/CURRENT_PROGRESS.md` (updated)
* `docs/NEXT_TASKS.md` (updated)
* `docs/AI_CONTEXT.md` (updated)
* `docs/DECISIONS.md` (updated)
* `docs/CHANGELOG.md` (updated)

---

## 2026-06-23 (Update 2)

**Type:** docs

**Description:**  
Updated entire documentation system with confirmed AscendFit tech stack: Flutter (Android first), Firebase backend (Auth, Firestore, Storage, FCM), Provider state management, and feature-first modular architecture with Service + Repository pattern. Added `DECISIONS.md` with ADR-001 through ADR-011. Populated Firestore schema, Firebase SDK API surface, Flutter screen catalog, and architecture diagrams. Updated progress and next tasks to reflect stack selection complete and scaffolding as next priority.

**Status:** Superseded by Update 3 (Ascension System migration).

**Files Modified:**

* `docs/PROJECT_OVERVIEW.md` (updated)
* `docs/ARCHITECTURE.md` (updated)
* `docs/DATABASE_SCHEMA.md` (updated)
* `docs/API_DOCUMENTATION.md` (updated)
* `docs/UI_SCREENS.md` (updated)
* `docs/FEATURES.md` (updated)
* `docs/CURRENT_PROGRESS.md` (updated)
* `docs/NEXT_TASKS.md` (updated)
* `docs/AI_CONTEXT.md` (updated)
* `docs/DECISIONS.md` (created)
* `docs/CHANGELOG.md` (updated)

---

## 2026-06-23 (Initial)

**Type:** docs

**Description:**  
Initialized project governance documentation system. Completed Phase 1 analysis confirming an empty greenfield workspace with no application source code, dependencies, or git repository. Created all required `/docs` files with accurate current-state documentation.

**Files Modified:**

* `docs/PROJECT_OVERVIEW.md` (created)
* `docs/ARCHITECTURE.md` (created)
* `docs/DATABASE_SCHEMA.md` (created)
* `docs/API_DOCUMENTATION.md` (created)
* `docs/UI_SCREENS.md` (created)
* `docs/FEATURES.md` (created)
* `docs/CURRENT_PROGRESS.md` (created)
* `docs/NEXT_TASKS.md` (created)
* `docs/CHANGELOG.md` (created)
* `docs/AI_CONTEXT.md` (created)

---

## Template (for future entries)

**Date:** YYYY-MM-DD

**Type:** feat | fix | refactor | docs | chore

**Description:**  
Brief summary of what changed and why.

**Files Modified:**

* `path/to/file.ext`

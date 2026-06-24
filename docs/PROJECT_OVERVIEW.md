# Project Overview

## Project Name

**AscendFit**

## Purpose

AscendFit is a **gamified fitness mobile application** built on the **Ascension System** specification. It helps users build consistent training habits through structured workouts, progress tracking, and motivational game mechanics (XP, levels, daily quests).

The project is currently in **Sprint 0 (Foundation)**. The tech stack and architecture are defined per the Ascension System; application source code has not yet been scaffolded.

## Vision

Enable users to ascend their fitness journey through engaging, goal-oriented experiences — combining reliable workout logging, visible progress, and rewarding progression systems that keep users coming back.

## Goals

| Goal | Status |
|------|--------|
| Define product requirements and MVP scope | In progress |
| Select tech stack and project scaffolding | **Stack selected** — scaffolding pending |
| Implement core user authentication and profiles | Planned |
| Implement workout and progress tracking | Planned |
| Implement gamification (XP, quests, achievements) | Planned |
| Implement AI-assisted workout generation | Planned (MVP via OpenAI API) |
| Establish CI/CD and deployment pipeline | Planned |

## Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| User accounts & profiles | JWT auth + PostgreSQL user profile | Planned |
| Workout tracking | Log sessions, exercises, sets/reps | Planned |
| XP & progression | Experience points, levels, rewards | Planned |
| Daily quests | Recurring challenges for engagement | Planned |
| Push notifications | Quest reminders (React Native) | Planned |
| Progress analytics | Streaks, charts, milestones | Planned |
| AI workout generator | Personalized workout suggestions via OpenAI API | Planned |

## User Personas

### The Beginner
- New to structured fitness
- Needs guided workouts and simple progress feedback
- Motivated by small wins, streaks, and daily quests

### The Consistent Trainer
- Works out regularly
- Wants efficient logging and performance trends
- Motivated by quests, levels, and personal records

### The Goal-Driven Athlete
- Training toward specific targets (strength, endurance, body composition)
- Needs customization and advanced programming
- Motivated by measurable progress and analytics

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Mobile frontend** | React Native | Android first; scalable to iOS |
| **Frontend language** | TypeScript | Strict typing across mobile app |
| **Backend** | Python + Django | Web framework and project structure |
| **API layer** | Django REST Framework | RESTful JSON API |
| **Database** | PostgreSQL | Relational data store |
| **Authentication** | JWT | Access + refresh tokens via DRF |
| **AI** | OpenAI API | Workout generation and coaching suggestions |
| **Architecture** | Feature-first modular | Service layer + Repository pattern |
| **Version control** | Git | Meaningful conventional commits per milestone |

### Key Dependencies (Planned)

**Mobile (React Native / TypeScript)**

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Screen navigation |
| `axios` or `fetch` wrapper | HTTP client for DRF API |
| `@react-native-async-storage/async-storage` | JWT token persistence |
| `react-native-push-notification` (or equivalent) | Local/push notifications |

**Backend (Python / Django / DRF)**

| Package | Purpose |
|---------|---------|
| `django` | Web framework |
| `djangorestframework` | REST API |
| `djangorestframework-simplejwt` | JWT authentication |
| `psycopg2` (or `psycopg`) | PostgreSQL adapter |
| `openai` | OpenAI API client |
| `django-cors-headers` | CORS for mobile client |
| `Pillow` | Image handling (avatars) |

## Development Principles

1. **Source code is the single source of truth** — documentation must reflect actual implementation.
2. **Ascension System spec governs product behavior** — docs describe how the stack implements that spec.
3. **Documentation before code** — update docs, then implement, then update progress and changelog.
4. **Feature-first modularity** — each feature owns its screens, hooks/stores, services, and API clients on mobile; Django apps on backend.
5. **Separation of concerns** — Mobile: UI → State → Service → API Client → DRF. Backend: View → Serializer → Service → Model → PostgreSQL.
6. **Reusable components** — shared UI and utilities in `mobile/src/shared/` and `mobile/src/core/`.
7. **Security by default** — JWT-protected endpoints; user-scoped queryset filtering in DRF views.
8. **Meaningful git history** — conventional commits after every completed milestone.

## Repository State

- **Workspace path:** `d:\AscendFit`
- **Application code:** Not yet scaffolded
- **Documentation:** `/docs` — 11 governance files
- **Backend:** Not yet scaffolded
- **Mobile app:** Not yet scaffolded
- **PostgreSQL database:** Not yet provisioned
- **OpenAI API:** Not yet configured

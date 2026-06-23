# Project Overview

## Project Name

**AscendFit**

## Purpose

AscendFit is a **gamified fitness mobile application** that helps users build consistent training habits through structured workouts, progress tracking, and motivational game mechanics (XP, levels, daily quests).

The project is currently in **Sprint 0 (Foundation)**. The tech stack and architecture are defined; application source code has not yet been scaffolded.

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
| Implement AI-assisted workout generation | Planned (post-MVP) |
| Establish CI/CD and deployment pipeline | Planned |

## Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| User accounts & profiles | Firebase Auth + Firestore profile | Planned |
| Workout tracking | Log sessions, exercises, sets/reps | Planned |
| XP & progression | Experience points, levels, rewards | Planned |
| Daily quests | Recurring challenges for engagement | Planned |
| Push notifications | Quest reminders via FCM | Planned |
| Progress analytics | Streaks, charts, milestones | Planned |
| AI workout generator | Personalized workout suggestions | Planned (post-MVP) |

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
| **Platform** | Flutter | Android first; scalable to iOS |
| **Backend** | Firebase | BaaS — Auth, Firestore, Storage, FCM |
| **Database** | Cloud Firestore | NoSQL document store |
| **Authentication** | Firebase Authentication | Email/password (MVP); OAuth extensible |
| **Storage** | Firebase Storage | Profile images, media assets |
| **Notifications** | Firebase Cloud Messaging (FCM) | Quest reminders, streak nudges |
| **State management** | Provider | ChangeNotifier + MultiProvider |
| **Architecture** | Feature-first modular | Service layer + Repository pattern |
| **Version control** | Git | Meaningful conventional commits per milestone |

### Key Flutter Dependencies (Planned)

| Package | Purpose |
|---------|---------|
| `firebase_core` | Firebase initialization |
| `firebase_auth` | Authentication |
| `cloud_firestore` | Database |
| `firebase_storage` | File storage |
| `firebase_messaging` | Push notifications |
| `provider` | State management |
| `go_router` | Declarative routing (recommended) |

## Development Principles

1. **Source code is the single source of truth** — documentation must reflect actual implementation.
2. **Documentation before code** — update docs, then implement, then update progress and changelog.
3. **Feature-first modularity** — each feature owns its screens, providers, services, and repositories.
4. **Separation of concerns** — UI → Provider → Service → Repository → Firebase SDK.
5. **Reusable components** — shared widgets and utilities in `lib/shared/` and `lib/core/`.
6. **Small, focused files** — one responsibility per file where practical.
7. **Security by default** — Firestore Security Rules enforce user-scoped data access.
8. **Meaningful git history** — conventional commits after every completed milestone.

## Repository State

- **Workspace path:** `d:\AscendFit`
- **Application code:** Not yet scaffolded
- **Git repository:** Not initialized
- **Documentation:** `/docs` — 11 governance files
- **Firebase project:** Not yet linked (pending setup)

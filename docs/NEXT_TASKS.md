# Next Tasks

> **Last updated:** 2026-06-23  
> **Source of truth:** Ascension System specification  
> **Stack:** React Native + TypeScript · Django + DRF · PostgreSQL · JWT · OpenAI API  
> Tasks ordered by priority (highest first).

---

## Immediate Tasks (P0)

Priority 1 (Current)

1.
Finish WorkoutExercise testing

2.
Create Gamification Models

XPTransaction

Quest

QuestProgress

DailyQuest

3.
Gamification CRUD

4.
Workout Completion Endpoint

When workout completes

Give XP

Update streak

Update quests

5.
XP Calculation Service

6.
Level Calculation Service

7.
Quest Reward System

After Backend

React Native App

Authentication

Workout Screens

Exercise Screens

Dashboard

Profile

Gamification UI

Leaderboard (Optional)

AI Workout Generator

Notification System

Final Testing

Deployment

## Short-Term Tasks (P1 — Sprint 1)

### 8. Implement JWT authentication vertical slice

**Backend:**
- [ ] Register, login, refresh endpoints
- [ ] UserProfile creation on register
- [ ] DRF permission classes

**Mobile:**
- [ ] `AuthContext`, `AuthService`, API client with JWT interceptors
- [ ] Login, Register, Forgot Password screens
- [ ] React Navigation auth stack / main tabs switch
- [ ] Update `UI_SCREENS.md` with actual file paths

### 9. Build app shell

- [ ] Theme in `core/theme/`
- [ ] Bottom tab navigator (Home, Workouts, Quests, Profile)
- [ ] Splash screen with JWT validation
- [ ] Home dashboard placeholder

### 10. Implement user profile feature

- [ ] Profile serializer, viewset, avatar upload endpoint
- [ ] `useProfile` hook, ProfileService
- [ ] Profile screen with level, XP, streak
- [ ] Edit profile + avatar upload

### 11. Implement workout CRUD

- [ ] Workout serializers, viewsets, services
- [ ] `useWorkouts` hook, WorkoutService
- [ ] Workout list, detail, create flows

### 12. Implement active workout + XP

- [ ] Complete workout endpoint (atomic transaction)
- [ ] XPService level calculation
- [ ] Active workout screen with timer
- [ ] Workout summary screen with XP animation

### 13. Implement daily quests

- [ ] Quest template seed data
- [ ] Daily quest assignment logic (management command or service)
- [ ] Quest progress tracking on workout completion
- [ ] Claim reward endpoint and flow

### 14. Implement AI workout generator

- [ ] `OpenAIService` in `ai` app
- [ ] `POST /api/ai/generate-workout/` endpoint
- [ ] Mobile AI workout screen
- [ ] Save generated workout as planned workout

---

## Long-Term Roadmap

| Phase | Sprint | Focus | Deliverable |
|-------|--------|-------|-------------|
| **0 — Foundation** | Current | Docs, stack, scaffold | Documented, runnable API + empty mobile app |
| **1 — Auth & Shell** | 1 | JWT login, routing, theme | Users can register and log in |
| **2 — Core Fitness** | 2 | Workouts, exercises | Users can log training |
| **3 — Gamification + AI** | 3 | XP, quests, OpenAI workouts | Engagement loop + AI generation |
| **4 — Notifications** | 4 | Push integration | Quest reminders |
| **5 — Polish & Release** | 5 | UX, testing, Play Store | Android MVP release |
| **6 — iOS** | 6+ | iOS build and release | Cross-platform availability |

---

## Open Decisions (see DECISIONS.md)

| ID | Topic | Recommendation |
|----|-------|----------------|
| ADR-012 | Navigation library | React Navigation |
| ADR-013 | MVP feature scope | Auth + Workouts + XP + Quests + AI in v1.0 |
| ADR-015 | Exercise catalog | Seed 50–100 common exercises |
| ADR-016 | XP formula | Linear early levels, exponential after L10 |
| ADR-018 | Mobile bootstrap | Bare React Native CLI with TypeScript |
| ADR-019 | Object storage | S3-compatible for production media |

---

## Documentation Maintenance Checklist

After each feature milestone:

- [ ] Update affected doc (`ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, etc.)
- [ ] Update `FEATURES.md` status
- [ ] Update `CURRENT_PROGRESS.md`
- [ ] Update `AI_CONTEXT.md`
- [ ] Add entry to `CHANGELOG.md`
- [ ] Commit with conventional message

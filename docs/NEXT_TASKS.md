# Next Tasks

> **Last updated:** 2026-06-23  
> **Stack:** Flutter + Firebase + Provider  
> Tasks ordered by priority (highest first).

---

## Immediate Tasks (P0)

### 1. Initialize Git repository

```bash
cd d:\AscendFit
git init
git add .
git commit -m "docs: establish Flutter Firebase stack and governance documentation"
```

### 2. Scaffold Flutter project

```bash
flutter create --org com.ascendfit --project-name ascendfit .
```

Then create feature-first folder structure per `ARCHITECTURE.md`:

```
lib/
├── main.dart
├── app.dart
├── core/{constants,theme,routing,firebase,utils}/
├── shared/{widgets,models,providers}/
└── features/{auth,profile,workouts,exercises,xp,quests,notifications}/
```

Add dependencies to `pubspec.yaml`:
- `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_storage`, `firebase_messaging`
- `provider`
- `go_router`

### 3. Create Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project: **AscendFit**
3. Enable: Authentication (Email/Password), Firestore, Storage, Cloud Messaging
4. Register Android app with package name `com.ascendfit.ascendfit`
5. Download `google-services.json` → `android/app/`
6. Run `flutterfire configure` to generate `firebase_options.dart`

### 4. Deploy Firestore security rules

Create `firestore.rules` per `API_DOCUMENTATION.md` security summary.
Create `firestore.indexes.json` per `DATABASE_SCHEMA.md` index requirements.

```bash
firebase init firestore
firebase deploy --only firestore:rules,firestore:indexes
```

### 5. Seed exercise catalog

Create seed script or Firebase console import for initial `exercises/` collection.

---

## Short-Term Tasks (P1 — Sprint 1)

### 6. Implement authentication vertical slice

- [ ] `AuthRepository` + `AuthService` + `AuthProvider`
- [ ] Login, Register, Forgot Password screens
- [ ] Create Firestore profile on registration
- [ ] go_router auth redirect guards
- [ ] Update `UI_SCREENS.md` with actual file paths

### 7. Build app shell

- [ ] Material 3 theme (`core/theme/`)
- [ ] Bottom navigation with ShellRoute
- [ ] Splash screen with auth state check
- [ ] Home dashboard placeholder

### 8. Implement user profile feature

- [ ] `UserRepository`, `ProfileService`, `ProfileProvider`
- [ ] Profile screen with level, XP, streak
- [ ] Edit profile + avatar upload to Firebase Storage

### 9. Implement workout CRUD

- [ ] `WorkoutRepository`, `WorkoutService`, `WorkoutProvider`
- [ ] Workout list, detail, create flows
- [ ] Firestore subcollection reads/writes

### 10. Implement active workout + XP

- [ ] Active workout session screen with timer
- [ ] Workout completion batch write (workout + XP transaction)
- [ ] `XPService` level calculation
- [ ] Workout summary screen with XP animation

### 11. Implement daily quests

- [ ] Quest template seed data
- [ ] Daily quest assignment logic
- [ ] Quest progress tracking on workout completion
- [ ] Claim reward flow

---

## Long-Term Roadmap

| Phase | Sprint | Focus | Deliverable |
|-------|--------|-------|-------------|
| **0 — Foundation** | Current | Docs, stack, scaffold | Documented, runnable empty app |
| **1 — Auth & Shell** | 1 | Login, routing, theme | Users can register and log in |
| **2 — Core Fitness** | 2 | Workouts, exercises | Users can log training |
| **3 — Gamification** | 3 | XP, quests, streaks | Engagement loop active |
| **4 — Notifications** | 4 | FCM integration | Push quest reminders |
| **5 — Polish & Release** | 5 | UX, testing, Play Store | Android MVP release |
| **6 — Intelligence** | 6+ | AI workouts, Cloud Functions | Personalized programming |
| **7 — iOS** | 7+ | iOS build and release | Cross-platform availability |

---

## Open Decisions (see DECISIONS.md)

| ID | Topic | Recommendation |
|----|-------|----------------|
| ADR-012 | Routing library | go_router |
| ADR-013 | MVP feature scope | Auth + Workouts + XP + Quests in v1.0 |
| ADR-014 | AI provider | Gemini via Cloud Functions (post-MVP) |
| ADR-015 | Exercise catalog | Seed 50–100 common exercises |
| ADR-016 | XP formula | Linear early levels, exponential after L10 |

---

## Documentation Maintenance Checklist

After each feature milestone:

- [ ] Update affected doc (`ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, etc.)
- [ ] Update `FEATURES.md` status
- [ ] Update `CURRENT_PROGRESS.md`
- [ ] Update `AI_CONTEXT.md`
- [ ] Add entry to `CHANGELOG.md`
- [ ] Commit with conventional message

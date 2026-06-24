# Next Tasks

> **Last updated:** 2026-06-23  
> **Source of truth:** Ascension System specification  
> **Stack:** React Native + TypeScript · Django + DRF · PostgreSQL · JWT · OpenAI API  
> Tasks ordered by priority (highest first).

---

## Immediate Tasks (P0)

### 1. Initialize Git repository (if not done)

```bash
cd d:\AscendFit
git init
git add .
git commit -m "docs: migrate stack to Ascension System (RN, Django, PostgreSQL, JWT, OpenAI)"
```

### 2. Scaffold Django backend

```bash
mkdir backend && cd backend
python -m venv venv
# activate venv (Windows: venv\Scripts\activate)
pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers openai pillow
django-admin startproject ascendfit .
python manage.py startapp accounts
python manage.py startapp workouts
python manage.py startapp exercises
python manage.py startapp gamification
python manage.py startapp ai
```

Configure per `ARCHITECTURE.md`:
- DRF + JWT in settings
- PostgreSQL in `DATABASES`
- CORS for mobile dev
- App URLs under `/api/`

### 3. Provision PostgreSQL

Create `docker-compose.yml` at project root:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ascendfit
      POSTGRES_USER: ascendfit
      POSTGRES_PASSWORD: ascendfit
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

```bash
docker compose up -d db
```

### 4. Scaffold React Native mobile app

```bash
npx @react-native-community/cli init AscendFitMobile --directory mobile --template react-native-template-typescript
```

Create feature-first folder structure per `ARCHITECTURE.md`:

```
mobile/src/
├── App.tsx
├── core/{api,auth,navigation,theme,utils}/
├── shared/{components,hooks,types}/
└── features/{auth,profile,workouts,exercises,xp,quests,notifications,ai}/
```

Add dependencies:
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- `@react-native-async-storage/async-storage`
- `axios`

### 5. Create `.env.example`

```env
# Backend
SECRET_KEY=
DATABASE_URL=postgres://ascendfit:ascendfit@localhost:5432/ascendfit
OPENAI_API_KEY=
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8081

# Mobile
API_BASE_URL=http://10.0.2.2:8000/api/
```

### 6. Implement Django models and migrations

Create models per `DATABASE_SCHEMA.md`:
- `accounts`: UserProfile
- `workouts`: Workout, WorkoutExercise
- `exercises`: Exercise
- `gamification`: XPTransaction, QuestTemplate, QuestProgress

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Seed exercise catalog

Create Django management command for initial `exercises` table data (50–100 common exercises).

---

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

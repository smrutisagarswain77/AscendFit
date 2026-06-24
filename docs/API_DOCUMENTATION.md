# API Documentation

> **Backend:** Python + Django + Django REST Framework  
> **Authentication:** JWT (access + refresh tokens)  
> **Database:** PostgreSQL  
> **AI:** OpenAI API (server-side proxy)  
> **Last verified against source code:** 2026-06-23  
> **Source of truth:** Ascension System specification  
> **Current state:** API surface designed; Django views and serializers not yet implemented.

---

## Overview

AscendFit exposes a **RESTful JSON API** via Django REST Framework. The React Native mobile client communicates over HTTPS with JWT Bearer authentication.

All user-scoped endpoints require a valid access token. OpenAI API calls are **never made from the mobile client** — they are proxied through the Django `ai` app.

**Base URL (planned):**
- Development: `http://localhost:8000/api/`
- Production: `https://api.ascendfit.com/api/`

---

## Authentication (JWT)

Powered by `djangorestframework-simplejwt`.

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| Register | POST | `/api/auth/register/` | No | Create user + profile |
| Login | POST | `/api/auth/login/` | No | Issue access + refresh tokens |
| Refresh | POST | `/api/auth/refresh/` | Refresh token | Issue new access token |
| Logout | POST | `/api/auth/logout/` | Yes | Blacklist refresh token (optional) |
| Password reset request | POST | `/api/auth/password-reset/` | No | Send reset email |
| Password reset confirm | POST | `/api/auth/password-reset/confirm/` | No | Set new password |

### Register

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "display_name": "Alex"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "display_name": "Alex"
  },
  "tokens": {
    "access": "<jwt_access_token>",
    "refresh": "<jwt_refresh_token>"
  }
}
```

### Login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

### Token Usage

Include on all authenticated requests:
```
Authorization: Bearer <access_token>
```

**Error Responses:**

| Status | Code | Description | User Message |
|--------|------|-------------|--------------|
| 400 | `invalid_email` | Malformed email | "Please enter a valid email." |
| 400 | `weak_password` | Password too short | "Password must be at least 8 characters." |
| 401 | `invalid_credentials` | Wrong email/password | "Incorrect email or password." |
| 401 | `token_expired` | Access token expired | Trigger refresh flow |
| 409 | `email_exists` | Email already registered | "This email is already registered." |
| 429 | `rate_limited` | Too many attempts | "Too many attempts. Try again later." |

---

## User Profile

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| Get profile | GET | `/api/profile/` | Yes | Current user profile |
| Update profile | PATCH | `/api/profile/` | Yes | Update display name, preferences |
| Upload avatar | POST | `/api/profile/avatar/` | Yes | Multipart image upload |

**Response (GET /api/profile/):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "display_name": "Alex Trainer",
  "avatar_url": "http://localhost:8000/media/users/1/avatar.jpg",
  "level": 5,
  "total_xp": 1250,
  "current_streak": 7,
  "longest_streak": 14,
  "preferences": {
    "units": "metric",
    "notifications_enabled": true
  },
  "created_at": "2026-06-01T08:00:00Z",
  "updated_at": "2026-06-23T10:30:00Z"
}
```

---

## Workouts

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| List workouts | GET | `/api/workouts/` | Yes | Paginated list (`?status=`, `?page=`) |
| Get workout | GET | `/api/workouts/{id}/` | Yes | Single workout with exercises |
| Create workout | POST | `/api/workouts/` | Yes | New workout |
| Update workout | PATCH | `/api/workouts/{id}/` | Yes | Update in-progress session |
| Delete workout | DELETE | `/api/workouts/{id}/` | Yes | Remove workout |
| Start workout | POST | `/api/workouts/{id}/start/` | Yes | Set status to `active` |
| Complete workout | POST | `/api/workouts/{id}/complete/` | Yes | Finalize, award XP, update quests |

**Request (POST /api/workouts/):**
```json
{
  "title": "Push Day",
  "status": "planned",
  "exercises": []
}
```

**Request (POST /api/workouts/{id}/complete/):**
```json
{
  "duration_seconds": 2700,
  "exercises": [
    {
      "exercise_id": 1,
      "name": "Bench Press",
      "sets": [
        { "reps": 10, "weight": 60, "completed": true },
        { "reps": 8, "weight": 65, "completed": true }
      ]
    }
  ]
}
```

**Response (complete):**
```json
{
  "id": 42,
  "status": "completed",
  "xp_earned": 75,
  "level_up": false,
  "new_level": 5,
  "quest_updates": [
    { "quest_progress_id": 7, "progress": 1, "target": 1, "status": "completed" }
  ]
}
```

---

## Exercise Catalog

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| List exercises | GET | `/api/exercises/` | Yes | Browse catalog (`?muscle_group=`, `?search=`) |
| Get exercise | GET | `/api/exercises/{id}/` | Yes | Single exercise |

**Response:**
```json
{
  "id": 1,
  "name": "Bench Press",
  "muscle_group": "chest",
  "equipment": "barbell",
  "difficulty": "intermediate",
  "instructions": "Lie flat on bench, lower bar to chest, press up.",
  "is_active": true
}
```

---

## XP Transactions

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| List XP history | GET | `/api/xp/transactions/` | Yes | Recent XP events (`?limit=50`) |

**Response item:**
```json
{
  "id": 101,
  "amount": 75,
  "source": "workout",
  "reference_id": "42",
  "description": "Completed Push Day",
  "earned_at": "2026-06-23T07:45:00Z"
}
```

> XP awards are created server-side on workout completion and quest claim — not via direct client POST.

---

## Quests

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| List active quests | GET | `/api/quests/` | Yes | User's active/completed quests |
| Claim reward | POST | `/api/quests/{progress_id}/claim/` | Yes | Claim XP for completed quest |

**Response (GET /api/quests/):**
```json
[
  {
    "id": 7,
    "quest_id": 1,
    "title": "Daily Grind",
    "description": "Complete 1 workout today",
    "status": "active",
    "progress": 0,
    "target": 1,
    "xp_reward": 50,
    "assigned_at": "2026-06-23T00:00:00Z"
  }
]
```

---

## AI Workout Generation (OpenAI API)

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| Generate workout | POST | `/api/ai/generate-workout/` | Yes | Request AI-generated plan |

**Request:**
```json
{
  "goal": "strength",
  "duration_minutes": 45,
  "equipment": ["barbell", "dumbbell"],
  "muscle_groups": ["chest", "triceps"],
  "difficulty": "intermediate"
}
```

**Response:**
```json
{
  "title": "AI Push Strength Session",
  "estimated_duration_minutes": 45,
  "exercises": [
    {
      "name": "Barbell Bench Press",
      "muscle_group": "chest",
      "sets": 4,
      "reps": "8-10",
      "rest_seconds": 90,
      "notes": "Control the eccentric"
    }
  ],
  "generated_by": "openai"
}
```

**Server-side:** Django `OpenAIService` calls OpenAI API with structured prompt; API key stored in environment only.

---

## Notifications

| Operation | Method | Endpoint | Auth | Description |
|-----------|--------|----------|------|-------------|
| Register device token | POST | `/api/notifications/register/` | Yes | Save FCM/APNs token to profile |

**Request:**
```json
{
  "fcm_token": "<device_token>",
  "platform": "android"
}
```

---

## External APIs

| Provider | Purpose | Configuration | Env Variables |
|----------|---------|---------------|---------------|
| **OpenAI** | AI workout generation | Django `ai` app proxy | `OPENAI_API_KEY` |
| **PostgreSQL** | Primary database | Django DATABASES setting | `DATABASE_URL` or `DB_*` vars |
| **FCM/APNs** (planned) | Push notifications | Django notification service | `FCM_SERVER_KEY` |

---

## Environment & Configuration

### Backend (Django)

| Variable | Purpose | In Git? |
|----------|---------|---------|
| `SECRET_KEY` | Django secret | No |
| `DATABASE_URL` | PostgreSQL connection | No |
| `OPENAI_API_KEY` | OpenAI API access | No |
| `ALLOWED_HOSTS` | Host whitelist | No (prod) |
| `CORS_ALLOWED_ORIGINS` | Mobile dev origins | No |

### Mobile (React Native)

| Variable | Purpose | In Git? |
|----------|---------|---------|
| `API_BASE_URL` | DRF API base URL | No (use `.env`) |

### Local Development (Planned)

```bash
# Start PostgreSQL
docker compose up -d db

# Run Django
cd backend && python manage.py migrate && python manage.py runserver

# Run React Native
cd mobile && npm start
```

| Service | Port (default) |
|---------|----------------|
| Django API | 8000 |
| PostgreSQL | 5432 |
| Metro bundler | 8081 |

---

## Permission Summary

| Resource | Read | Write |
|----------|------|-------|
| Own profile | Authenticated owner | Authenticated owner |
| Own workouts | Authenticated owner | Authenticated owner |
| Own XP transactions | Authenticated owner | Server-only (via services) |
| Own quest progress | Authenticated owner | Server-only (via services) |
| Exercise catalog | Authenticated users | Admin only |
| Quest templates | Authenticated users | Admin only |
| AI generate | Authenticated users | N/A (POST only) |
| Media uploads | Authenticated owner | Authenticated owner |

---

## Error Handling Convention (Planned)

DRF returns standard error shapes:

```json
{
  "detail": "Authentication credentials were not provided."
}
```

Field validation errors:
```json
{
  "email": ["Enter a valid email address."],
  "password": ["This field is required."]
}
```

Mobile services map HTTP status codes to user-facing messages in hooks.

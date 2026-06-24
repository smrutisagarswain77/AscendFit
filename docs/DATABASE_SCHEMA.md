# Database Schema

> **Database:** PostgreSQL  
> **ORM:** Django  
> **Last verified against source code:** 2026-06-23  
> **Source of truth:** Ascension System specification  
> **Current state:** Schema designed; Django models and migrations not yet created.

---

## Overview

AscendFit uses **PostgreSQL** as its primary data store, accessed via **Django ORM**. Data is organized in relational tables with foreign keys to the user model. User-scoped data is filtered in DRF views by authenticated user.

Security is enforced via **JWT authentication** and **DRF permission classes** — users may only access their own records unless explicitly public (e.g., exercise catalog).

---

## Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--|| USER_PROFILE : "OneToOne"
    USER ||--o{ WORKOUT : "owns"
    USER ||--o{ XP_TRANSACTION : "owns"
    USER ||--o{ QUEST_PROGRESS : "owns"
    WORKOUT ||--o{ WORKOUT_EXERCISE : "contains"
    EXERCISE ||--o{ WORKOUT_EXERCISE : "referenced by"
    QUEST_TEMPLATE ||--o{ QUEST_PROGRESS : "referenced by"

    USER {
        int id PK
        string email UK
        string password_hash
        boolean is_active
        datetime date_joined
    }

    USER_PROFILE {
        int id PK
        int user_id FK UK
        string display_name
        string avatar_url
        int level
        int total_xp
        int current_streak
        int longest_streak
        jsonb preferences
        string fcm_token
        datetime created_at
        datetime updated_at
    }

    WORKOUT {
        int id PK
        int user_id FK
        string title
        string status "planned|active|completed"
        datetime started_at
        datetime completed_at
        int duration_seconds
        int xp_earned
        text notes
        datetime created_at
        datetime updated_at
    }

    WORKOUT_EXERCISE {
        int id PK
        int workout_id FK
        int exercise_id FK
        string name "denormalized"
        jsonb sets "reps, weight, completed"
        int order_index
    }

    EXERCISE {
        int id PK
        string name
        string muscle_group
        string equipment
        string difficulty
        text instructions
        boolean is_active
    }

    XP_TRANSACTION {
        int id PK
        int user_id FK
        int amount
        string source "workout|quest|bonus|streak"
        string reference_id
        string description
        datetime earned_at
    }

    QUEST_TEMPLATE {
        int id PK
        string title
        text description
        string type "daily|weekly"
        int xp_reward
        jsonb criteria
        boolean is_active
    }

    QUEST_PROGRESS {
        int id PK
        int user_id FK
        int quest_id FK
        string title "denormalized"
        string status "active|completed|claimed"
        int progress
        int target
        int xp_reward
        datetime assigned_at
        datetime completed_at
        datetime claimed_at
    }
```

---

## Tables

### `auth_user` (Django built-in, extended via profile)

Django's default user model (or custom user with email as username).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | User ID |
| `email` | varchar | UNIQUE, NOT NULL | Login email |
| `password` | varchar | NOT NULL | Hashed password |
| `is_active` | boolean | DEFAULT true | Account active flag |
| `date_joined` | timestamptz | NOT NULL | Registration time |

**Relationships:** OneToOne with `user_profiles`; FK parent of workouts, XP, quest progress.

---

### `user_profiles`

Extended profile data (Django app: `accounts`).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Profile ID |
| `user_id` | int | FK → auth_user, UNIQUE | Owner |
| `display_name` | varchar | NULL | Display name |
| `avatar` | varchar | NULL | Media file path or URL |
| `level` | int | DEFAULT 1 | Current level |
| `total_xp` | int | DEFAULT 0 | Lifetime XP |
| `current_streak` | int | DEFAULT 0 | Consecutive workout days |
| `longest_streak` | int | DEFAULT 0 | Best streak record |
| `preferences` | jsonb | DEFAULT `{}` | `{ units, notifications_enabled }` |
| `fcm_token` | varchar | NULL | Push notification device token |
| `created_at` | timestamptz | NOT NULL | Profile creation |
| `updated_at` | timestamptz | NOT NULL | Last update |

**Indexes:** `user_id` (unique)

**Example Row:**
```json
{
  "user_id": 1,
  "display_name": "Alex Trainer",
  "avatar": "/media/users/1/avatar.jpg",
  "level": 5,
  "total_xp": 1250,
  "current_streak": 7,
  "longest_streak": 14,
  "preferences": { "units": "metric", "notifications_enabled": true }
}
```

---

### `workouts`

User workout sessions (Django app: `workouts`).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Workout ID |
| `user_id` | int | FK → auth_user | Owner |
| `title` | varchar | NOT NULL | Workout name |
| `status` | varchar | CHECK | `planned`, `active`, `completed` |
| `started_at` | timestamptz | NULL | Session start |
| `completed_at` | timestamptz | NULL | Session finish |
| `duration_seconds` | int | NULL | Total duration |
| `xp_earned` | int | DEFAULT 0 | XP awarded on completion |
| `notes` | text | NULL | User notes |
| `created_at` | timestamptz | NOT NULL | Creation time |
| `updated_at` | timestamptz | NOT NULL | Last update |

**Indexes:**
- `(user_id, status, created_at DESC)` — list workouts by status

---

### `workout_exercises`

Exercises within a workout session.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Row ID |
| `workout_id` | int | FK → workouts | Parent workout |
| `exercise_id` | int | FK → exercises | Catalog reference |
| `name` | varchar | NOT NULL | Denormalized exercise name |
| `sets` | jsonb | NOT NULL | `[{ reps, weight, completed }]` |
| `order_index` | int | DEFAULT 0 | Display order |

**Example `sets` JSON:**
```json
[
  { "reps": 10, "weight": 60, "completed": true },
  { "reps": 8, "weight": 65, "completed": true }
]
```

---

### `exercises`

Global exercise catalog (Django app: `exercises`). Read-only for regular users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Exercise ID |
| `name` | varchar | NOT NULL | Exercise name |
| `muscle_group` | varchar | NOT NULL | e.g., `chest`, `legs` |
| `equipment` | varchar | NULL | e.g., `barbell`, `bodyweight` |
| `difficulty` | varchar | NULL | `beginner`, `intermediate`, `advanced` |
| `instructions` | text | NULL | How-to text |
| `is_active` | boolean | DEFAULT true | Soft delete flag |

**Indexes:**
- `(muscle_group, name)`
- `(is_active, name)`

---

### `xp_transactions`

XP earn history (Django app: `gamification`).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Transaction ID |
| `user_id` | int | FK → auth_user | Owner |
| `amount` | int | NOT NULL | XP earned (positive) |
| `source` | varchar | NOT NULL | `workout`, `quest`, `bonus`, `streak` |
| `reference_id` | varchar | NULL | Related workout/quest ID |
| `description` | varchar | NULL | Human-readable label |
| `earned_at` | timestamptz | NOT NULL | When XP was earned |

**Indexes:**
- `(user_id, earned_at DESC)` — XP history timeline

---

### `quest_templates`

Global quest definitions (Django app: `gamification`). Admin-managed.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Quest template ID |
| `title` | varchar | NOT NULL | Quest title |
| `description` | text | NOT NULL | Quest description |
| `type` | varchar | NOT NULL | `daily`, `weekly` |
| `xp_reward` | int | NOT NULL | XP on completion |
| `criteria` | jsonb | NOT NULL | `{ type, target }` |
| `is_active` | boolean | DEFAULT true | Available for assignment |

**Example `criteria`:**
```json
{ "type": "complete_workout", "target": 1 }
```

---

### `quest_progress`

Per-user quest assignment and progress.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | serial | PK | Progress ID |
| `user_id` | int | FK → auth_user | Owner |
| `quest_id` | int | FK → quest_templates | Template reference |
| `title` | varchar | NOT NULL | Denormalized quest title |
| `status` | varchar | NOT NULL | `active`, `completed`, `claimed` |
| `progress` | int | DEFAULT 0 | Current progress count |
| `target` | int | NOT NULL | Goal to complete |
| `xp_reward` | int | NOT NULL | Denormalized reward |
| `assigned_at` | timestamptz | NOT NULL | Assignment time |
| `completed_at` | timestamptz | NULL | Target met |
| `claimed_at` | timestamptz | NULL | Reward claimed |

**Indexes:**
- `(user_id, status, assigned_at DESC)`

---

## Media Storage Paths

| Path | Purpose | Access |
|------|---------|--------|
| `media/users/{user_id}/avatar.jpg` | Profile avatar | Owner upload; authenticated read |
| `media/users/{user_id}/workouts/{workout_id}/` | Workout media (future) | Owner only |

---

## Level Calculation (Planned Business Logic)

Documented here for schema context; implemented in backend `XPService`:

| Level | XP Required (cumulative) |
|-------|--------------------------|
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 4 | 500 |
| 5 | 850 |
| n | TBD — formula in ADR-016 |

> Update this table when XP formula is finalized in `DECISIONS.md`.

---

## Migration & Seeding Strategy

| Task | Approach |
|------|----------|
| Schema | Django migrations (`python manage.py makemigrations`) |
| Exercise catalog | Django management command or fixture JSON |
| Quest templates | Django fixture or admin seed |
| Local development | PostgreSQL via Docker Compose |
| Test database | Separate PostgreSQL DB or SQLite for unit tests |

---

## Transaction Patterns

Workout completion must be **atomic** (Django `@transaction.atomic`):

1. Update `workouts` status, `completed_at`, `xp_earned`
2. Insert `xp_transactions` row
3. Update `user_profiles.total_xp` and `level`
4. Update `quest_progress.progress` where applicable

---

## Notes

- **Not yet implemented in code** — update when Django models and migrations exist.
- Denormalize frequently displayed fields (quest title, exercise name) to reduce joins on hot paths.
- All user-scoped queries must filter by `request.user` in DRF viewsets.

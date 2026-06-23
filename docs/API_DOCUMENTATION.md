# API Documentation

> **Backend:** Firebase (BaaS) — no custom REST API for MVP  
> **Last verified against source code:** 2026-06-23  
> **Current state:** API surface designed; Firebase SDK integration not yet implemented.

---

## Overview

AscendFit does **not** expose a traditional REST API for MVP. The Flutter app communicates directly with Firebase services via official SDKs, protected by Security Rules.

Future server-side logic (AI generation, scheduled quests) may be added via **Cloud Functions** (HTTP callable or triggers).

---

## Internal APIs

### Firebase Authentication

| Operation | SDK Method | Auth Required | Description |
|-----------|------------|---------------|-------------|
| Register | `createUserWithEmailAndPassword(email, password)` | No | Create new account |
| Login | `signInWithEmailAndPassword(email, password)` | No | Sign in existing user |
| Logout | `signOut()` | Yes | End session |
| Password reset | `sendPasswordResetEmail(email)` | No | Send reset email |
| Auth state stream | `authStateChanges()` | — | Real-time session listener |
| Current user | `currentUser` | — | Synchronous current user |

**Error Responses (FirebaseAuthException):**

| Code | Description | User Message |
|------|-------------|--------------|
| `email-already-in-use` | Email registered | "This email is already registered." |
| `invalid-email` | Malformed email | "Please enter a valid email." |
| `weak-password` | Password too short | "Password must be at least 6 characters." |
| `user-not-found` | No account for email | "No account found with this email." |
| `wrong-password` | Incorrect password | "Incorrect password." |
| `too-many-requests` | Rate limited | "Too many attempts. Try again later." |

---

### Cloud Firestore

#### User Profile

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| Get profile | `users/{uid}` | `get()` | Yes (owner) | Load user profile |
| Create profile | `users/{uid}` | `set()` | Yes (owner) | Create on registration |
| Update profile | `users/{uid}` | `update()` | Yes (owner) | Update display name, preferences |
| Stream profile | `users/{uid}` | `snapshots()` | Yes (owner) | Real-time profile updates |

**Request (create profile):**
```json
{
  "uid": "abc123",
  "email": "user@example.com",
  "displayName": "Alex",
  "level": 1,
  "totalXp": 0,
  "currentStreak": 0,
  "longestStreak": 0,
  "preferences": { "units": "metric", "notificationsEnabled": true },
  "createdAt": "<serverTimestamp>",
  "updatedAt": "<serverTimestamp>"
}
```

**Response:** Firestore document snapshot.

**Errors:** Handled as `FirebaseException` with `permission-denied`, `not-found`, etc.

---

#### Workouts

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| List workouts | `users/{uid}/workouts` | `query().orderBy('createdAt', desc)` | Yes (owner) | Paginated workout list |
| Get workout | `users/{uid}/workouts/{id}` | `get()` | Yes (owner) | Single workout |
| Create workout | `users/{uid}/workouts/{id}` | `set()` | Yes (owner) | New workout |
| Update workout | `users/{uid}/workouts/{id}` | `update()` | Yes (owner) | Update in-progress session |
| Delete workout | `users/{uid}/workouts/{id}` | `delete()` | Yes (owner) | Remove workout |
| Stream active | `users/{uid}/workouts` | `where('status', isEqualTo: 'active').snapshots()` | Yes (owner) | Active session listener |

**Request (create workout):**
```json
{
  "title": "Push Day",
  "status": "planned",
  "exercises": [],
  "xpEarned": 0,
  "createdAt": "<serverTimestamp>",
  "updatedAt": "<serverTimestamp>"
}
```

**Request (complete workout — via WorkoutService batch):**
```json
{
  "status": "completed",
  "completedAt": "<serverTimestamp>",
  "durationSeconds": 2700,
  "xpEarned": 75,
  "updatedAt": "<serverTimestamp>"
}
```

---

#### Exercise Catalog

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| List exercises | `exercises` | `query().where('isActive', isEqualTo: true)` | Yes | Browse catalog |
| Get exercise | `exercises/{id}` | `get()` | Yes | Single exercise |
| Search by muscle | `exercises` | `where('muscleGroup', isEqualTo: group)` | Yes | Filtered list |

**Response (exercise):**
```json
{
  "id": "ex_bench_press",
  "name": "Bench Press",
  "muscleGroup": "chest",
  "equipment": "barbell",
  "difficulty": "intermediate",
  "isActive": true
}
```

---

#### XP Transactions

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| List XP history | `users/{uid}/xp_transactions` | `orderBy('earnedAt', desc).limit(50)` | Yes (owner) | Recent XP events |
| Add XP | `users/{uid}/xp_transactions/{id}` | `set()` + update `users/{uid}.totalXp` | Yes (owner) | Award XP (batch write) |

**Request (add XP — atomic batch):**
```json
{
  "amount": 75,
  "source": "workout",
  "referenceId": "workout_001",
  "description": "Completed Push Day",
  "earnedAt": "<serverTimestamp>"
}
```

---

#### Quests

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| List templates | `quests` | `where('isActive', isEqualTo: true)` | Yes | Available quest types |
| Get user quests | `users/{uid}/quest_progress` | `where('status', in: ['active','completed'])` | Yes (owner) | Today's quests |
| Update progress | `users/{uid}/quest_progress/{id}` | `update({ progress })` | Yes (owner) | Increment progress |
| Claim reward | `users/{uid}/quest_progress/{id}` | `update({ status: 'claimed' })` + XP batch | Yes (owner) | Claim XP reward |

---

### Firebase Storage

| Operation | Path | Method | Auth | Description |
|-----------|------|--------|------|-------------|
| Upload avatar | `users/{uid}/avatar.jpg` | `putFile()` | Yes (owner) | Upload profile image |
| Get avatar URL | `users/{uid}/avatar.jpg` | `getDownloadURL()` | Yes | Retrieve public URL |
| Delete avatar | `users/{uid}/avatar.jpg` | `delete()` | Yes (owner) | Remove avatar |

**Upload constraints (planned):**
- Max size: 5 MB
- Allowed types: `image/jpeg`, `image/png`
- Client-side compression before upload

---

### Firebase Cloud Messaging

| Operation | SDK Method | Auth | Description |
|-----------|------------|------|-------------|
| Request permission | `requestPermission()` | Yes | Ask notification permission (Android 13+) |
| Get FCM token | `getToken()` | Yes | Device token for push |
| Token refresh | `onTokenRefresh` | Yes | Update token in Firestore profile |
| Foreground messages | `onMessage` | — | Handle in-app notifications |
| Background tap | `onMessageOpenedApp` | — | Deep link to quest/workout screen |

**Token storage:** Saved to `users/{uid}.fcmToken` in Firestore.

---

## Cloud Functions (Planned — Post-MVP)

| Function | Trigger | Purpose |
|----------|---------|---------|
| `generateDailyQuests` | Scheduled (daily) | Assign quests to active users |
| `generateWorkout` | HTTPS Callable | Proxy AI API, return workout plan |
| `validateXP` | Firestore trigger | Server-side XP integrity check |
| `sendQuestReminder` | Scheduled | Push FCM for incomplete daily quests |

> Document request/response schemas here when Cloud Functions are implemented.

---

## External APIs

| Provider | Purpose | Configuration | Rate Limits | Env Variables |
|----------|---------|---------------|-------------|---------------|
| **Firebase** | Auth, DB, Storage, FCM | `google-services.json` (Android), `GoogleService-Info.plist` (iOS) | Firebase plan quotas | Firebase config files (not in git) |
| **Google AI / OpenAI** (planned) | AI workout generation | Cloud Function proxy | Provider-specific | `AI_API_KEY` in Cloud Functions secrets |

---

## Environment & Configuration

### Firebase Project Setup (Required)

| File | Platform | Location | In Git? |
|------|----------|----------|---------|
| `google-services.json` | Android | `android/app/` | No (use CI secrets) |
| `GoogleService-Info.plist` | iOS | `ios/Runner/` | No |
| `firebase_options.dart` | Flutter | `lib/core/firebase/` | Generated by FlutterFire CLI |

### FlutterFire CLI Setup (Planned)

```bash
# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Configure Firebase for Flutter
flutterfire configure
```

### Firebase Emulator (Development)

```bash
firebase emulators:start --only auth,firestore,storage
```

| Emulator | Port (default) |
|----------|----------------|
| Auth | 9099 |
| Firestore | 8080 |
| Storage | 9199 |

---

## Security Rules Summary (Planned)

| Resource | Read | Write |
|----------|------|-------|
| `users/{uid}` | Owner only | Owner only |
| `users/{uid}/workouts/{id}` | Owner only | Owner only |
| `users/{uid}/xp_transactions/{id}` | Owner only | Owner only |
| `users/{uid}/quest_progress/{id}` | Owner only | Owner only |
| `exercises/{id}` | Authenticated users | Admin only |
| `quests/{id}` | Authenticated users | Admin only |
| Storage `users/{uid}/*` | Owner + read URL | Owner only |

---

## Error Handling Convention (Planned)

All repository methods return typed results:

```dart
// Pattern (planned)
sealed class Result<T> {
  const Result();
}
class Success<T> extends Result<T> { final T data; }
class Failure<T> extends Result<T> { final String message; final String? code; }
```

Providers map `Failure` to user-facing error strings and loading states.

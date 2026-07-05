# 🚀 AscendFit Backend

AscendFit is a fitness tracking and gamification backend built with Django REST Framework and PostgreSQL. It provides authentication, workout tracking, AI-powered workout recommendations, gamification (XP, levels, quests, streaks), and analytics through a REST API.

---

# ✨ Features

## 👤 Authentication
- User Registration
- JWT Authentication
- User Profile
- Secure API Access

## 🏋️ Workout Management
- Create Workouts
- Update Workouts
- Delete Workouts
- Workout Exercises
- Workout Completion

## 💪 Exercise Catalog
- Global Exercise Database
- Muscle Groups
- Difficulty Levels
- Equipment Information

## 🎮 Gamification
- XP System
- Level Progression
- Daily Streak
- Quest Templates
- Quest Progress
- Reward Claim
- XP Transaction History

## 🤖 AI Recommendation Engine
- Personalized Workout Recommendation
- Muscle Rotation Logic
- Exercise Recommendation
- Recovery Suggestions
- Motivational Coaching Messages

## 📊 Dashboard & Analytics
- Dashboard Summary
- Weekly Analytics
- Monthly Analytics
- Progress History

---

# 🛠 Tech Stack

- Python 3.14
- Django 6
- Django REST Framework
- PostgreSQL
- JWT Authentication
- CORS Headers

---

# 📁 Project Structure

```
backend/
│
├── accounts/
├── workouts/
├── exercises/
├── gamification/
├── ai/
├── dashboard/
├── ascendfit/
├── manage.py
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <repository-url>
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure PostgreSQL

Create a PostgreSQL database.

Update `settings.py`:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "ascendfit",
        "USER": "...",
        "PASSWORD": "...",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```

Run migrations:

```bash
python manage.py migrate
```

Create superuser:

```bash
python manage.py createsuperuser
```

Start server:

```bash
python manage.py runserver
```

---

# 🔐 Authentication

AscendFit uses JWT Authentication.

Obtain token:

```
POST /api/token/
```

Refresh token:

```
POST /api/token/refresh/
```

Include token:

```
Authorization: Bearer <access_token>
```

---

# 📚 API Endpoints

## Accounts

| Method | Endpoint |
|---------|----------|
| POST | /api/accounts/register/ |
| GET | /api/accounts/profile/ |

---

## Workouts

| Method | Endpoint |
|---------|----------|
| GET | /api/workouts/ |
| POST | /api/workouts/ |
| GET | /api/workouts/{id}/ |
| PATCH | /api/workouts/{id}/ |
| DELETE | /api/workouts/{id}/ |

---

## Workout Exercises

| Method | Endpoint |
|---------|----------|
| GET | /api/workout-exercises/ |
| POST | /api/workout-exercises/ |
| PATCH | /api/workout-exercises/{id}/ |
| DELETE | /api/workout-exercises/{id}/ |

---

## Exercises

| Method | Endpoint |
|---------|----------|
| GET | /api/exercises/ |
| POST | /api/exercises/ |
| PATCH | /api/exercises/{id}/ |
| DELETE | /api/exercises/{id}/ |

---

## Gamification

| Method | Endpoint |
|---------|----------|
| GET | /api/gamification/xp-transactions/ |
| GET | /api/gamification/quests/ |
| GET | /api/gamification/progress/ |
| POST | /api/gamification/progress/{id}/claim/ |

---

## AI

| Method | Endpoint |
|---------|----------|
| GET | /api/ai/recommend/ |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard/ |
| GET | /api/dashboard/weekly/ |
| GET | /api/dashboard/monthly/ |
| GET | /api/dashboard/history/ |

---

# 🧠 Backend Architecture

```
Client
      ↓
REST API
      ↓
Views
      ↓
Services
      ↓
Models
      ↓
PostgreSQL
```

Business logic is separated into service classes to keep views lightweight and maintainable.

---

# 🔒 Security

- JWT Authentication
- User-level Query Filtering
- Request Validation
- Database Transactions
- Logging
- Permission Classes
- Serializer Validation

---

# 📈 Future Improvements

- React Native Mobile Application
- AI Model Integration (OpenAI/Gemini)
- Push Notifications
- Social Features
- Leaderboards
- Wearable Device Integration
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

Developed as an internship project to demonstrate backend development skills using Django REST Framework, PostgreSQL, REST APIs, gamification, analytics, and AI-assisted recommendation systems.
# 🚀 AscendFit Backend

A production-ready fitness tracking backend built with **Django REST Framework** and **PostgreSQL**.

AscendFit provides secure authentication, workout management, AI-powered workout recommendations, gamification (XP, levels, quests, streaks), and user analytics through a RESTful API. The project follows a modular architecture with separated business logic, making it scalable and maintainable.

---

# 📌 Project Status

## ✅ Backend Complete

The backend has been fully implemented and end-to-end tested.

### Completed Modules

* ✅ Authentication & JWT Security
* ✅ User Profile
* ✅ Workout Management
* ✅ Exercise Catalog
* ✅ AI Workout Recommendation
* ✅ Gamification System
* ✅ Dashboard & Analytics
* ✅ Logging
* ✅ Transactions
* ✅ Validation
* ✅ Security & User Isolation

---

# ✨ Features

## 👤 Authentication

* User Registration
* JWT Authentication
* User Profile
* Secure Protected APIs

---

## 🏋️ Workout Management

* Create Workouts
* Update Workouts
* Delete Workouts
* Workout Exercises
* Workout Completion Tracking

---

## 💪 Exercise Catalog

* Global Exercise Database
* Muscle Groups
* Difficulty Levels
* Equipment Information
* Exercise Descriptions

---

## 🎮 Gamification

* XP System
* Level Progression
* Daily Streak
* Quest Templates
* Quest Progress
* Reward Claim
* XP Transaction History

---

## 🤖 AI Recommendation Engine

* Personalized Workout Recommendations
* Muscle Rotation Logic
* Exercise Recommendations
* Recovery Suggestions
* Motivational Coaching Messages

---

## 📊 Dashboard & Analytics

* Dashboard Summary
* Weekly Analytics
* Monthly Analytics
* XP Progress History

---

# 📊 Project Statistics

* **6 Django Apps**
* **20+ REST API Endpoints**
* **JWT Authentication**
* **PostgreSQL Database**
* **AI Recommendation Engine**
* **Gamification System**
* **Analytics Dashboard**
* **Service Layer Architecture**
* **Transaction-safe Business Logic**
* **End-to-End Tested with Postman**

---

# 🛠 Tech Stack

## Backend

* Python
* Django
* Django REST Framework
* PostgreSQL

## Authentication

* Simple JWT

## Environment

* python-dotenv

## API

* REST APIs
* JSON

## Other

* django-cors-headers

---

# 📁 Project Structure

```text
backend/
│
├── accounts/
├── workouts/
├── exercises/
├── gamification/
├── ai/
├── dashboard/
├── ascendfit/
│
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

---

# 🏗 Backend Architecture

```text
                Client
                   │
                   ▼
            Django REST API
                   │
                   ▼
                Views
                   │
                   ▼
              Service Layer
                   │
                   ▼
                Models
                   │
                   ▼
             PostgreSQL Database
```

Business logic is intentionally separated into service modules to keep views lightweight and maintainable.

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd backend
```

---

## 2. Create Virtual Environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Copy the example environment file.

Windows

```bash
copy .env.example .env
```

Linux / macOS

```bash
cp .env.example .env
```

Update the values inside `.env` according to your PostgreSQL configuration.

---

## 5. Run Database Migrations

```bash
python manage.py migrate
```

---

## 6. Create Superuser

```bash
python manage.py createsuperuser
```

---

## 7. Start Development Server

```bash
python manage.py runserver
```

Server:

```text
http://127.0.0.1:8000/
```

---

# 🔐 Authentication

AscendFit uses **JWT Authentication**.

Obtain Access Token

```http
POST /api/token/
```

Refresh Token

```http
POST /api/token/refresh/
```

Include the token with every protected request.

```text
Authorization: Bearer <access_token>
```

---

# 📚 API Modules

## 👤 Accounts

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/auth/register/ |
| GET    | /api/auth/profile/  |

---

## 🏋 Workouts

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/workouts/      |
| POST   | /api/workouts/      |
| GET    | /api/workouts/{id}/ |
| PATCH  | /api/workouts/{id}/ |
| DELETE | /api/workouts/{id}/ |

---

## 💪 Exercises

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/exercises/      |
| POST   | /api/exercises/      |
| PATCH  | /api/exercises/{id}/ |
| DELETE | /api/exercises/{id}/ |

---

## 🎮 Gamification

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| GET    | /api/gamification/xp-transactions/     |
| GET    | /api/gamification/quests/              |
| GET    | /api/gamification/progress/            |
| POST   | /api/gamification/progress/{id}/claim/ |

---

## 🤖 AI

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/ai/recommend/ |

---

## 📊 Dashboard

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /api/dashboard/          |
| GET    | /api/dashboard/weekly/   |
| GET    | /api/dashboard/monthly/  |
| GET    | /api/dashboard/progress/ |

---

# 🔒 Security

* JWT Authentication
* User-level Data Isolation
* Permission Classes
* Serializer Validation
* Database Transactions
* Logging
* Environment Variables
* Protected API Endpoints

---

# 🧪 Testing

The backend has been tested end-to-end using Postman.

### Verified Modules

* User Registration
* Login
* Profile
* Workout CRUD
* Exercise CRUD
* Workout Completion
* XP & Level System
* Daily Streak
* Quest Progress
* Quest Reward Claim
* AI Recommendation
* Dashboard Analytics
* Progress History
* Validation
* Security & Authorization

---

# 🚀 Roadmap

## ✅ Completed

* Django REST Backend
* Authentication
* Workout Management
* Exercise Catalog
* AI Recommendation Engine
* Gamification System
* Dashboard Analytics

## 🚧 Currently In Development

* React Native Mobile Application

## 🔮 Future Improvements

* Gemini/OpenAI Integration
* Push Notifications
* Leaderboards
* Social Features
* Wearable Device Integration
* Docker Deployment
* CI/CD Pipeline
* Automated Testing

---

# 📄 License

This project was developed for educational purposes and internship portfolio demonstration.

---

# 👨‍💻 Author

Developed as a full-stack fitness application backend to demonstrate backend engineering skills using Django REST Framework, PostgreSQL, REST APIs, authentication, AI-assisted recommendation systems, analytics, and gamification.

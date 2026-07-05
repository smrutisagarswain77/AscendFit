import logging
from workouts.models import Workout
from exercises.models import Exercise

logger = logging.getLogger(__name__)

def get_workout_recommendation(user):
    """
    Generate a personalized workout recommendation based on
    the user's profile and workout history.
    """

    profile = user.profile

    # Determine difficulty
    if profile.level <= 3:
        difficulty = "Beginner"
        duration = 30
    elif profile.level <= 7:
        difficulty = "Intermediate"
        duration = 45
    else:
        difficulty = "Advanced"
        duration = 60

    # Get last completed workout
    last_workout = (
        Workout.objects.filter(user=user, completed=True)
        .order_by("-completed_at")
        .first()
    )

    # AI Recommendation Logic
    recommendation_map = {
        "Chest": "Back",
        "Back": "Legs",
        "Legs": "Shoulders",
        "Shoulders": "Arms",
        "Arms": "Core",
        "Core": "Chest",
        "Full Body": "Chest",
    }

    if last_workout:
        last_group = last_workout.muscle_group
        focus = recommendation_map.get(last_group, "Full Body")

        reason = (
            f"Your last workout focused on {last_group}. "
            f"Today, train {focus} to balance recovery and muscle development."
        )
    else:
        focus = "Full Body"
        reason = (
            "You don't have any completed workouts yet. "
            "A Full Body workout is the best place to start."
        )

    # Motivation Message
    if profile.streak_days >= 7:
        message = (
            f"Amazing! You're on a {profile.streak_days}-day streak! 🔥 "
            "Keep pushing yourself!"
        )
    elif profile.streak_days >= 1:
        message = (
            f"You're on a {profile.streak_days}-day streak. Keep it going! 💪"
        )
    else:
        message = (
            "Let's begin your fitness journey today! 🚀"
        )

    # Get recommended exercises
    recommended_exercises = Exercise.objects.filter(
        muscle_group__iexact=focus,
        difficulty__iexact=difficulty,
    )[:3]

    estimated_calories = (
        200 if difficulty == "Beginner"
        else 350 if difficulty == "Intermediate"
        else 500
    )

    if profile.level <= 3:
        coaching_tip = (
            "Focus on learning proper form before increasing weight."
        )
    elif profile.level <= 7:
        coaching_tip = (
            "Maintain consistent training and gradually increase intensity."
        )
    else:
        coaching_tip = (
            "Challenge yourself with progressive overload while maintaining good technique."
        )

    recovery_tip = (
        f"Since today's focus is {focus}, allow at least 48 hours before training this muscle group again."
    )

    logger.info(
        "Generated AI recommendation for user %s",
        user.username,
    )
    
    return {
        
        "focus": focus,
        "difficulty": difficulty,
        "duration": duration,
        "estimated_calories": estimated_calories,
        "recommended_exercises": [
            {
                "name": exercise.name,
                "equipment": exercise.equipment,
                "difficulty": exercise.difficulty,

                "sets": (
                    2 if difficulty == "Beginner"
                    else 3 if difficulty == "Intermediate"
                    else 4
                ),

                "reps": (
                    "12-15" if difficulty == "Beginner"
                    else "10-12" if difficulty == "Intermediate"
                    else "6-10"
                ),

                "rest_seconds": (
                    45 if difficulty == "Beginner"
                    else 60 if difficulty == "Intermediate"
                    else 90
                ),
            }
            for exercise in recommended_exercises
        ],
        "reason": reason,
        "message": message,
        "coaching_tip": coaching_tip,
        "recovery_tip": recovery_tip,
    }
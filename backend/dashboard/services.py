from accounts.models import UserProfile
from workouts.models import Workout
from gamification.models import QuestProgress
from django.utils import timezone
from datetime import timedelta

from gamification.models import XPTransaction

def get_dashboard_summary(user):
    """
    Returns a summary of the user's dashboard statistics.
    """

    profile = UserProfile.objects.get(user=user)

    completed_workouts = Workout.objects.filter(
        user=user,
        completed=True,
    )

    completed_workout_count = completed_workouts.count()

    total_calories = sum(
        workout.calories_burned or 0
        for workout in completed_workouts
    )

    quests_completed = QuestProgress.objects.filter(
        user=user,
        completed=True,
    ).count()

    return {
        "username": user.username,
        "level": profile.level,
        "current_xp": profile.current_xp,
        "total_xp": profile.total_xp,
        "streak": profile.streak_days,
        "completed_workouts": completed_workout_count,
        "total_calories": total_calories,
        "quests_completed": quests_completed,
    }


def get_weekly_analytics(user):
    """
    Returns analytics for the last 7 days.
    """

    week_ago = timezone.now() - timedelta(days=7)

    workouts = Workout.objects.filter(
        user=user,
        completed=True,
        completed_at__gte=week_ago,
    )

    xp_transactions = XPTransaction.objects.filter(
        user=user,
        created_at__gte=week_ago,
    )

    quests = QuestProgress.objects.filter(
        user=user,
        completed=True,
        completed_at__gte=week_ago,
    )

    return {
        "workouts_this_week": workouts.count(),
        "calories_this_week": sum(
            workout.calories_burned or 0
            for workout in workouts
        ),
        "xp_gained_this_week": sum(
            xp.amount
            for xp in xp_transactions
        ),
        "quests_completed_this_week": quests.count(),
    }


def get_monthly_analytics(user):
    """
    Returns analytics for the last 30 days.
    """

    month_ago = timezone.now() - timedelta(days=30)

    workouts = Workout.objects.filter(
        user=user,
        completed=True,
        completed_at__gte=month_ago,
    )

    xp_transactions = XPTransaction.objects.filter(
        user=user,
        created_at__gte=month_ago,
    )

    quests = QuestProgress.objects.filter(
        user=user,
        completed=True,
        completed_at__gte=month_ago,
    )

    return {
        "workouts_this_month": workouts.count(),
        "calories_this_month": sum(
            workout.calories_burned or 0
            for workout in workouts
        ),
        "xp_gained_this_month": sum(
            xp.amount
            for xp in xp_transactions
        ),
        "quests_completed_this_month": quests.count(),
    }

def get_progress_history(user):
    """
    Returns XP history grouped by transaction.
    """

    transactions = XPTransaction.objects.filter(
        user=user
    ).order_by("created_at")

    history = []

    running_total = 0

    for transaction in transactions:
        running_total += transaction.amount

        history.append({
            "date": transaction.created_at.date(),
            "xp": running_total,
        })

    return history
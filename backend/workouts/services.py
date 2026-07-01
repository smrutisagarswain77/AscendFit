from django.utils import timezone

from accounts.models import UserProfile
from gamification.models import XPTransaction, QuestProgress


XP_PER_LEVEL = 100
WORKOUT_XP = 100


def complete_workout(workout):
    """
    Handle all business logic when a workout is completed.
    """

    if workout.completed_at is not None:
        return

    # Mark completion time
    workout.completed_at = timezone.now()
    workout.save()


    # Update daily streak
    today = timezone.now().date()

    last_completed_workout = (
        workout.user.workouts.exclude(completed_at__isnull=True)
        .exclude(id=workout.id)
        .order_by("-completed_at")
        .first()
    )


    # Award workout XP
    profile = UserProfile.objects.get(user=workout.user)

    if last_completed_workout is None:
        # First completed workout ever
        profile.streak_days = 1
    else:
        last_date = last_completed_workout.completed_at.date()

        if last_date == today:
            # Already worked out today
            pass

        elif (today - last_date).days == 1:
            # Consecutive day
            profile.streak_days += 1

        else:
            # Streak broken
            profile.streak_days = 1

    profile.current_xp += WORKOUT_XP
    profile.total_xp += WORKOUT_XP

    while profile.current_xp >= XP_PER_LEVEL:
        profile.level += 1
        profile.current_xp -= XP_PER_LEVEL

    profile.save()

    # Create XP transaction
    XPTransaction.objects.create(
        user=workout.user,
        amount=WORKOUT_XP,
        reason="Workout Completed",
    )

    # Update quest progress
    quest_progress_records = QuestProgress.objects.filter(
        user=workout.user,
        completed=False,
    )

    for quest_progress in quest_progress_records:
        quest_progress.progress += 1

        if quest_progress.progress >= quest_progress.quest.target_value:
            quest_progress.completed = True
            quest_progress.completed_at = timezone.now()

        quest_progress.save()
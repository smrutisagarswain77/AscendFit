from django.conf import settings
from django.db import models


class Workout(models.Model):
    """
    A training session logged by a user.
    Mark completed when the hunter finishes a dungeon (workout).
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workouts",
    )
    title = models.CharField(max_length=200)
    notes = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Total session length in minutes.",
    )
    calories_burned = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Estimated calories burned for the session.",
    )
    completed = models.BooleanField(
        default=False,
        help_text="Whether the workout has been finished.",
    )
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Timestamp when the workout was marked complete.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Workout"
        verbose_name_plural = "Workouts"

    def __str__(self):
        status = "Completed" if self.completed else "In progress"
        return f"{self.title} — {self.user.get_username()} ({status})"


class WorkoutExercise(models.Model):
    """
    One exercise performed during a workout with set/rep/weight details.
    """

    workout = models.ForeignKey(
        Workout,
        on_delete=models.CASCADE,
        related_name="workout_exercises",
    )
    exercise = models.ForeignKey(
        "exercises.Exercise",
        on_delete=models.PROTECT,
        related_name="workout_entries",
    )
    sets = models.PositiveIntegerField(
        default=1,
        help_text="Number of sets performed.",
    )
    reps = models.PositiveIntegerField(
        default=10,
        help_text="Repetitions per set.",
    )
    weight = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0,
        help_text="Weight used per set (user's preferred unit).",
    )

    class Meta:
        ordering = ["id"]
        verbose_name = "Workout exercise"
        verbose_name_plural = "Workout exercises"

    def __str__(self):
        return f"{self.exercise.name} — {self.sets}x{self.reps} @ {self.weight}"

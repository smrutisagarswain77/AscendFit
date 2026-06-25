from django.db import models


class Exercise(models.Model):
    """
    Global exercise catalog entry.
    Shared across all users; referenced when building workouts.
    """

    name = models.CharField(max_length=150,unique=True,)
    muscle_group = models.CharField(
        max_length=50,
        help_text="Primary muscle group, e.g. chest, legs, back.",
    )
    equipment = models.CharField(
        max_length=50,
        blank=True,
        help_text="Equipment needed, e.g. barbell, dumbbell, bodyweight.",
    )
    difficulty = models.CharField(
        max_length=20,
        blank=True,
        help_text="beginner, intermediate, or advanced.",
    )
    description = models.TextField(
        blank=True,
        help_text="Short instructions or notes about the exercise.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["muscle_group", "name"]
        verbose_name = "Exercise"
        verbose_name_plural = "Exercises"

    def __str__(self):
        return f"{self.name} ({self.muscle_group})"

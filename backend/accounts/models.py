from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    """
    Solo Leveling-style hunter profile linked to the auth User.
    Stores progression stats shown on the mobile dashboard.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    level = models.PositiveIntegerField(
        default=1,
        help_text="Current hunter rank / level.",
    )
    current_xp = models.PositiveIntegerField(
        default=0,
        help_text="XP earned toward the next level.",
    )
    total_xp = models.PositiveIntegerField(
        default=0,
        help_text="Lifetime XP accumulated.",
    )
    streak_days = models.PositiveIntegerField(
        default=0,
        help_text="Consecutive days with a completed workout.",
    )
    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
        help_text="Profile image for the hunter avatar.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        verbose_name = "User profile"
        verbose_name_plural = "User profiles"

    def __str__(self):
        return f"{self.user.get_username()} — Level {self.level}"

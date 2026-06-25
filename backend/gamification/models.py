from django.conf import settings
from django.db import models


class XPTransaction(models.Model):
    """
    Ledger entry when a user earns (or loses) XP.
    Created on workout completion, quest claims, bonuses, etc.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="xp_transactions",
    )
    amount = models.IntegerField(
        help_text="XP change. Positive for gains, negative for penalties.",
    )
    reason = models.CharField(
        max_length=100,
        help_text="Why XP changed, e.g. workout_complete, quest_claimed.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "XP transaction"
        verbose_name_plural = "XP transactions"

    def __str__(self):
        sign = "+" if self.amount >= 0 else ""
        return f"{self.user.get_username()} {sign}{self.amount} XP ({self.reason})"


class QuestTemplate(models.Model):
    """
    Reusable quest definition (daily grind, weekly challenge, etc.).
    Admin or seed data creates templates; users get QuestProgress rows.
    """

    title = models.CharField(max_length=200)
    description = models.TextField()
    xp_reward = models.PositiveIntegerField(
        help_text="XP awarded when the quest is claimed.",
    )
    target_value = models.PositiveIntegerField(
        default=1,
        help_text="Goal count, e.g. complete 1 workout.",
    )
    active = models.BooleanField(
        default=True,
        help_text="Whether this quest can be assigned to users.",
    )

    class Meta:
        ordering = ["title"]
        verbose_name = "Quest template"
        verbose_name_plural = "Quest templates"

    def __str__(self):
        status = "Active" if self.active else "Inactive"
        return f"{self.title} ({status})"


class QuestProgress(models.Model):
    """
    Per-user progress on a quest template.
    Tracks completion and whether the XP reward has been claimed.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quest_progress",
    )
    quest = models.ForeignKey(
        QuestTemplate,
        on_delete=models.CASCADE,
        related_name="progress_records",
    )
    progress = models.PositiveIntegerField(
        default=0,
        help_text="Current progress toward target_value.",
    )
    completed = models.BooleanField(
        default=False,
        help_text="Whether the quest target has been met.",
    )
    claimed = models.BooleanField(
        default=False,
        help_text="Whether the user collected the XP reward.",
    )
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the quest was marked complete.",
    )

    class Meta:
        ordering = ["-completed_at", "-id"]
        unique_together = ("user", "quest")
        verbose_name = "Quest progress"
        verbose_name_plural = "Quest progress records"

    def __str__(self):
        return f"{self.user.get_username()} — {self.quest.title} ({self.progress}/{self.quest.target_value})"

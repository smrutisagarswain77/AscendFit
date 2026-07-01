from rest_framework import viewsets, permissions

from .models import XPTransaction, QuestTemplate, QuestProgress
from .serializers import (
    XPTransactionSerializer,
    QuestTemplateSerializer,
    QuestProgressSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.models import UserProfile

class XPTransactionViewSet(viewsets.ModelViewSet):
    """
    CRUD API for XP transaction history.
    """

    serializer_class = XPTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return XPTransaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuestTemplateViewSet(viewsets.ModelViewSet):
    """
    CRUD API for quest templates.
    """

    queryset = QuestTemplate.objects.all()
    serializer_class = QuestTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]


class QuestProgressViewSet(viewsets.ModelViewSet):
    """
    CRUD API for a user's quest progress.
    """

    serializer_class = QuestProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuestProgress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=["post"])
    def claim(self, request, pk=None):
        quest_progress = self.get_object()

        if not quest_progress.completed:
            return Response(
                {"detail": "Quest is not completed yet."},
                status=400,
            )

        if quest_progress.claimed:
            return Response(
                {"detail": "Reward already claimed."},
                status=400,
            )

        profile = UserProfile.objects.get(user=request.user)

        profile.current_xp += quest_progress.quest.xp_reward
        profile.total_xp += quest_progress.quest.xp_reward

        XP_PER_LEVEL = 100

        while profile.current_xp >= XP_PER_LEVEL:
            profile.level += 1
            profile.current_xp -= XP_PER_LEVEL

        profile.save()

        XPTransaction.objects.create(
            user=request.user,
            amount=quest_progress.quest.xp_reward,
            reason=f"Quest Reward: {quest_progress.quest.title}",
        )

        quest_progress.claimed = True
        quest_progress.save()

        return Response(
            {"detail": "Quest reward claimed successfully."}
        )
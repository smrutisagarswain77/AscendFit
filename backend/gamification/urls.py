from rest_framework.routers import DefaultRouter

from .views import (
    XPTransactionViewSet,
    QuestTemplateViewSet,
    QuestProgressViewSet,
)

router = DefaultRouter()
router.register(r"xp-transactions", XPTransactionViewSet, basename="xp-transaction")
router.register(r"quests", QuestTemplateViewSet, basename="quest")
router.register(r"progress", QuestProgressViewSet, basename="quest-progress")

urlpatterns = router.urls
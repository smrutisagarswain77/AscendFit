from rest_framework import generics, permissions
from rest_framework.response import Response

from .serializers import (
    DashboardSerializer,
    WeeklyAnalyticsSerializer,
    MonthlyAnalyticsSerializer,
    ProgressHistorySerializer,
)

from .services import (
    get_dashboard_summary,
    get_weekly_analytics,
    get_monthly_analytics,
    get_progress_history,
)

class DashboardSummaryView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DashboardSerializer

    def get(self, request):
        data = get_dashboard_summary(request.user)
        serializer = self.get_serializer(data)
        return Response(serializer.data)

class WeeklyAnalyticsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WeeklyAnalyticsSerializer

    def get(self, request):
        data = get_weekly_analytics(request.user)
        serializer = self.get_serializer(data)
        return Response(serializer.data)

class MonthlyAnalyticsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MonthlyAnalyticsSerializer

    def get(self, request):
        data = get_monthly_analytics(request.user)
        serializer = self.get_serializer(data)
        return Response(serializer.data)

class ProgressHistoryView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProgressHistorySerializer

    def get(self, request):
        data = get_progress_history(request.user)
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)
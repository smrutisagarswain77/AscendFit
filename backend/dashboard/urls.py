from django.urls import path



from .views import (
    DashboardSummaryView,
    WeeklyAnalyticsView,
    MonthlyAnalyticsView,
    ProgressHistoryView,
)

urlpatterns = [
    path("", DashboardSummaryView.as_view(), name="dashboard-summary"),
    path("weekly/", WeeklyAnalyticsView.as_view(), name="weekly-analytics"),
    path("monthly/", MonthlyAnalyticsView.as_view(), name="monthly-analytics"),
    path("progress-history/", ProgressHistoryView.as_view(), name="progress-history"),
]
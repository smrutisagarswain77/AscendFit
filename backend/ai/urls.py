from django.urls import path

from .views import WorkoutRecommendationView

urlpatterns = [
    path(
        "workout-recommendation/",
        WorkoutRecommendationView.as_view(),
        name="workout-recommendation",
    ),
]
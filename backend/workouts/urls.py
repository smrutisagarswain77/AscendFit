from django.urls import path
from .views import (
    WorkoutListCreateView,
    WorkoutDetailView,
    WorkoutExerciseListCreateView,
    WorkoutExerciseDetailView,
)

from .views import WorkoutListCreateView, WorkoutDetailView

urlpatterns = [
    path("", WorkoutListCreateView.as_view(), name="workout-list"),
    path("<int:pk>/", WorkoutDetailView.as_view(), name="workout-detail"),
    path(
        "exercise/",
        WorkoutExerciseListCreateView.as_view(),
        name="workout-exercise-list",
    ),
    path(
        "exercise/<int:pk>/",
        WorkoutExerciseDetailView.as_view(),
        name="workout-exercise-detail",
    ),
]


from rest_framework import generics, permissions
from .models import Workout, WorkoutExercise
from .serializers import WorkoutSerializer, WorkoutExerciseSerializer



from .services import complete_workout




class WorkoutListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        previous = self.get_object()

        was_completed = previous.completed

        workout = serializer.save()

        if not was_completed and workout.completed:
            complete_workout(workout)

class WorkoutExerciseListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(
            workout__user=self.request.user
        )


class WorkoutExerciseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(
            workout__user=self.request.user
        )
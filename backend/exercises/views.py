from rest_framework import viewsets, permissions

from .models import Exercise
from .serializers import ExerciseSerializer


class ExerciseViewSet(viewsets.ModelViewSet):
    """
    CRUD API for the global exercise catalog.
    """

    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
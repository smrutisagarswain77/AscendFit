from rest_framework import serializers

from .models import Workout , WorkoutExercise


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = "__all__"
        read_only_fields = ["user", "created_at", "completed_at"]




class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutExercise
        fields = "__all__"
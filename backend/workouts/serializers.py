from rest_framework import serializers

from .models import Workout , WorkoutExercise


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = "__all__"
        read_only_fields = ["user", "created_at", "completed_at"]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Workout title cannot be empty."
            )
        return value


    def validate_duration_minutes(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Duration must be greater than 0."
            )
        return value


    def validate_calories_burned(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Calories burned cannot be negative."
            )
        return value



class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutExercise
        fields = "__all__"
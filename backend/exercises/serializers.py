from rest_framework import serializers
from .models import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = "__all__"
    
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Exercise name cannot be empty."
            )
        return value
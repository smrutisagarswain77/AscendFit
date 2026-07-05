from django.contrib.auth.models import User
from rest_framework import serializers
from gamification.models import QuestTemplate, QuestProgress
from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        # Create user profile
        UserProfile.objects.create(user=user)

        # Initialize quest progress for all existing quest templates
        quests = QuestTemplate.objects.all()

        for quest in quests:
            QuestProgress.objects.create(
                user=user,
                quest=quest,
                progress=0,
                completed=False,
                claimed=False,
            )

        return user

        UserProfile.objects.create(user=user)

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")

    class Meta:
        model = UserProfile
        fields = [
            "username",
            "email",
            "level",
            "current_xp",
            "total_xp",
            "streak_days",
        ]
from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):
    username = serializers.CharField()
    level = serializers.IntegerField()
    current_xp = serializers.IntegerField()
    total_xp = serializers.IntegerField()
    streak = serializers.IntegerField()
    completed_workouts = serializers.IntegerField()
    total_calories = serializers.IntegerField()
    quests_completed = serializers.IntegerField()

class WeeklyAnalyticsSerializer(serializers.Serializer):
    workouts_this_week = serializers.IntegerField()
    calories_this_week = serializers.IntegerField()
    xp_gained_this_week = serializers.IntegerField()
    quests_completed_this_week = serializers.IntegerField()

class MonthlyAnalyticsSerializer(serializers.Serializer):
    workouts_this_month = serializers.IntegerField()
    calories_this_month = serializers.IntegerField()
    xp_gained_this_month = serializers.IntegerField()
    quests_completed_this_month = serializers.IntegerField()

class ProgressHistorySerializer(serializers.Serializer):
    date = serializers.DateField()
    xp = serializers.IntegerField()
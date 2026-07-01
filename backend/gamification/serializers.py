from rest_framework import serializers

from .models import XPTransaction, QuestTemplate, QuestProgress


class XPTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = XPTransaction
        fields = "__all__"
        read_only_fields = ["user", "created_at"]


class QuestTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestTemplate
        fields = "__all__"


class QuestProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestProgress
        fields = "__all__"
        read_only_fields = ["user", "completed_at"]

    def validate(self, attrs):
        user = self.context["request"].user
        quest = attrs["quest"]

        if self.instance is None:
            if QuestProgress.objects.filter(user=user, quest=quest).exists():
                raise serializers.ValidationError(
                    {
                        "quest": "You already have progress for this quest."
                    }
                )

        return attrs
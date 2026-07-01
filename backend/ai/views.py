from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import get_workout_recommendation


class WorkoutRecommendationView(APIView):
    """
    Return an AI-generated workout recommendation for the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        recommendation = get_workout_recommendation(request.user)
        return Response(recommendation)
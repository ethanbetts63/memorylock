from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, login

from api.serializers.anonymous_event_serializer import AnonymousEventCreateSerializer

User = get_user_model()

class AnonymousEventCreateView(APIView):
    """
    API view for anonymous users to create an event.
    This process also creates a new, password-less user account and logs them in
    via a session cookie.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        """
        Handles the POST request to create an event.
        """
        email = request.data.get('email')
        user = User.objects.filter(email__iexact=email).first()

        serializer_context = {}

        if user:
            # User with this email exists.
            if user.has_usable_password():
                # This is a fully registered user. They should log in.
                return Response(
                    {"detail": "An account with this email address already exists. Please log in to create an event."},
                    status=status.HTTP_409_CONFLICT
                )
            else:
                # This is a password-less user. Reuse this user account.
                serializer_context['user'] = user

        serializer = AnonymousEventCreateSerializer(data=request.data, context=serializer_context)
        
        if serializer.is_valid():
            event = serializer.save()
            
            # Log the new or existing password-less user in
            login(request, event.user)

            response_data = {
                "status": "success",
                "message": "Event created successfully.",
                "eventId": event.id,
                "userEmail": event.user.email,
                "eventName": event.name,
                "eventDate": event.event_date,
                "weeksInAdvance": event.weeks_in_advance
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login

from api.serializers.anonymous_event_serializer import AnonymousEventCreateSerializer

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
        serializer = AnonymousEventCreateSerializer(data=request.data)
        if serializer.is_valid():
            # The .create() method of the serializer returns the event instance,
            # which has the user linked to it.
            event = serializer.save()
            
            # Log the new user in to create a session and set the cookie
            user = event.user
            login(request, user)

            # For now, we return a simple success response.
            # We will enhance this later to return the serialized event data.
            response_data = {
                "status": "success",
                "message": "Event created successfully.",
                "eventId": event.id,
                "userEmail": user.email,
                "eventName": event.name,
                "eventDate": event.event_date
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

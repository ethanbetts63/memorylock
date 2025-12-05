from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction

from events.models import Event
from users.models import EmergencyContact

User = get_user_model()

class _EmergencyContactSerializer(serializers.ModelSerializer):
    """
    Serializer for the nested emergency contact data.
    Field names match the frontend form.
    """
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    phoneNumber = serializers.CharField(source='phone')

    class Meta:
        model = EmergencyContact
        fields = ['firstName', 'lastName', 'email', 'phoneNumber']
        extra_kwargs = {
            'email': {'required': False, 'allow_blank': True},
        }


class AnonymousEventCreateSerializer(serializers.Serializer):
    """
    Serializer for the anonymous event creation flow.
    This serializer handles creating a new User, a new Event, and an
    optional EmergencyContact, all in one go.
    """
    # Event details
    eventName = serializers.CharField()
    eventDate = serializers.DateField()

    # User details
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    email = serializers.EmailField()
    phoneNumber = serializers.CharField()
    backupEmail = serializers.EmailField(required=False, allow_blank=True)
    backupPhoneNumber = serializers.CharField(required=False, allow_blank=True)
    
    # Social media handles
    facebook = serializers.CharField(required=False, allow_blank=True, source='facebook_handle')
    instagram = serializers.CharField(required=False, allow_blank=True, source='instagram_handle')
    snapchat = serializers.CharField(required=False, allow_blank=True, source='snapchat_handle')
    x = serializers.CharField(required=False, allow_blank=True, source='x_handle')

    # Nested emergency contact
    emergencyContact = _EmergencyContactSerializer(required=False)

    def create(self, validated_data):
        """
        Custom create method to orchestrate object creation.
        """
        with transaction.atomic():
            # Pop nested data
            emergency_contact_data = validated_data.pop('emergencyContact', None)
            
            # Pop user-related data
            user_data = {
                'first_name': validated_data.pop('firstName'),
                'last_name': validated_data.pop('lastName'),
                'email': validated_data.pop('email'),
                'username': validated_data.get('email'), # Use email as username for simplicity
                'phone': validated_data.pop('phoneNumber'),
                'backup_email': validated_data.pop('backupEmail', None),
                'backup_phone': validated_data.pop('backupPhoneNumber', None),
                'facebook_handle': validated_data.pop('facebook_handle', None),
                'instagram_handle': validated_data.pop('instagram_handle', None),
                'snapchat_handle': validated_data.pop('snapchat_handle', None),
                'x_handle': validated_data.pop('x_handle', None),
            }
            
            # Create the user but don't set a password
            user = User.objects.create(**user_data)
            
            # Event data is what's left in validated_data
            event_data = {
                'name': validated_data.pop('eventName'),
                'event_date': validated_data.pop('eventDate'),
            }
            
            # Create the event
            event = Event.objects.create(user=user, **event_data)

            # Create emergency contact if data was provided
            if emergency_contact_data:
                EmergencyContact.objects.create(user=user, **emergency_contact_data)
            
            # We will return the event object, but the view will handle the full response
            return event

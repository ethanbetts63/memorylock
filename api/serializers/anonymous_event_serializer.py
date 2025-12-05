from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction

from events.models import Event
from users.models import EmergencyContact
from .emergency_contact_serializer import EmergencyContactSerializer

User = get_user_model()

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
    emergencyContact = EmergencyContactSerializer(required=False)

    def validate(self, attrs):
        """
        Custom validation to handle the nested emergency contact.
        """
        if 'emergencyContact' in attrs:
            emergency_contact_data = attrs.get('emergencyContact')
            
            # Check if any data was provided for the emergency contact
            is_partially_filled = any(emergency_contact_data.values())

            if is_partially_filled:
                # If any field is filled, enforce that the core fields are required.
                errors = {}
                first_name = emergency_contact_data.get('first_name')
                last_name = emergency_contact_data.get('last_name')
                phone = emergency_contact_data.get('phone')

                if not first_name:
                    errors['firstName'] = 'This field is required when providing an emergency contact.'
                if not last_name:
                    errors['lastName'] = 'This field is required when providing an emergency contact.'
                if not phone:
                    errors['phoneNumber'] = 'This field is required when providing an emergency contact.'
                
                if errors:
                    raise serializers.ValidationError({'emergencyContact': errors})
            else:
                # If the emergencyContact object was sent but is completely empty, remove it.
                attrs.pop('emergencyContact')
                
        return attrs

    def create(self, validated_data):
        """
        Custom create method to orchestrate object creation.
        """
        with transaction.atomic():
            # Pop nested data
            emergency_contact_data = validated_data.pop('emergencyContact', None)
            
            # Pop user-related data
            email = validated_data.pop('email') # Get email once
            user_data = {
                'first_name': validated_data.pop('firstName'),
                'last_name': validated_data.pop('lastName'),
                'email': email,
                'username': email, # Use the same email for username
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

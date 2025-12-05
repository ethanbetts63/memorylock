from rest_framework import serializers
from users.models import EmergencyContact

class EmergencyContactSerializer(serializers.ModelSerializer):
    """
    Serializer for the nested emergency contact data.
    Field names match the frontend form.
    Made lenient to allow parent serializer to handle validation.
    """
    firstName = serializers.CharField(source='first_name', required=False, allow_blank=True)
    lastName = serializers.CharField(source='last_name', required=False, allow_blank=True)
    phoneNumber = serializers.CharField(source='phone', required=False, allow_blank=True)

    class Meta:
        model = EmergencyContact
        fields = ['firstName', 'lastName', 'email', 'phoneNumber']
        extra_kwargs = {
            'email': {'required': False, 'allow_blank': True},
        }

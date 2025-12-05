from rest_framework import serializers
from users.models import EmergencyContact

class EmergencyContactSerializer(serializers.ModelSerializer):
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

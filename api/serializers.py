from rest_framework import serializers
from datamanagement.models import FAQ

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ('question', 'answer')

from django.contrib.auth.models import User
from django.db import models

class EmergencyContact(models.Model):
    """
    Stores emergency contact information for a user. A user can have multiple
    emergency contacts.
    """
    user = models.ForeignKey(User, related_name='emergency_contacts', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} (Emergency Contact for {self.user.username})"
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model that includes fields for various contact methods.
    """
    phone = models.CharField(max_length=20, blank=True, null=True)
    backup_phone = models.CharField(max_length=20, blank=True, null=True)
    physical_address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
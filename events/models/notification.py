from django.db import models
from django.conf import settings
from .event import Event
from ..utils.send_reminder_email import send_reminder_email
from ..utils.send_reminder_sms import send_reminder_sms

class Notification(models.Model):
    """
    Represents a single, scheduled communication to be sent for a specific event.
    """
    
    CHANNEL_CHOICES = [
        ('primary_email', 'Primary Email'),
        ('primary_sms', 'Primary SMS'),
        ('backup_email', 'Backup Email'),
        ('backup_sms', 'Backup SMS'),
        ('social_media', 'Social Media Outreach Task'),
        ('emergency_contact', 'Emergency Contact Outreach'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('sent', 'Sent'),
        ('failed', 'Failed'),
        ('delivered', 'Delivered'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    scheduled_send_time = models.DateTimeField(db_index=True)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', db_index=True)
    
    recipient_contact_info = models.CharField(
        max_length=255,
        help_text="The contact info used for sending. Populated after the notification is sent.",
        null=True,
        blank=True
    )

    message_sid = models.CharField(
        max_length=40, 
        null=True, 
        blank=True, 
        unique=True, 
        db_index=True,
        help_text="The unique identifier for the message from the provider (e.g., Twilio SID)."
    )

    failure_reason = models.TextField(
        null=True, 
        blank=True,
        help_text="Reason for failure, captured from provider or sending exception."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Notification for {self.event.name} to {self.user.email} via {self.get_channel_display()} on {self.scheduled_send_time}"

    def send(self):
        """
        Sends the notification based on its channel.
        Updates status, saves message_sid on success, and logs exceptions on failure.
        """
        if self.status != 'pending':
            return

        self.status = 'in_progress'
        self.save()

        sid_or_success = None
        recipient = None

        try:
            if self.channel == 'primary_email':
                recipient = self.user.email
                if recipient:
                    sid_or_success = send_reminder_email(self, recipient)
            elif self.channel == 'backup_email':
                recipient = self.user.backup_email
                if recipient:
                    sid_or_success = send_reminder_email(self, recipient)
            elif self.channel == 'primary_sms':
                recipient = self.user.phone_number
                if recipient:
                    sid_or_success = send_reminder_sms(self, recipient)
            elif self.channel == 'backup_sms':
                recipient = self.user.backup_phone_number
                if recipient:
                    sid_or_success = send_reminder_sms(self, recipient)
            elif self.channel == 'emergency_contact':
                recipient = self.user.emergency_contact_phone
                if recipient:
                    sid_or_success = send_reminder_sms(self, recipient)

            if sid_or_success:
                self.status = 'sent'
                self.recipient_contact_info = recipient
                # For SMS, this will be the SID. For email, it might just be True.
                if isinstance(sid_or_success, str):
                    self.message_sid = sid_or_success
            else:
                self.status = 'failed'
                if not self.failure_reason: # Don't overwrite a reason if one was already logged
                    self.failure_reason = "Sending function returned a falsy value."

        except Exception as e:
            self.status = 'failed'
            self.failure_reason = str(e)
        
        self.save()

    class Meta:
        ordering = ['scheduled_send_time']
        indexes = [
            models.Index(fields=['status', 'scheduled_send_time']),
            models.Index(fields=['message_sid']),
        ]
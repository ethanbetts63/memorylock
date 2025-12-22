from ..models import Notification

def _create_notification(event, channel, send_time, contact_info):
    """
    Helper function to create a Notification object if contact info is present.
    """
    if not contact_info:
        return
    
    Notification.objects.create(
        event=event,
        user=event.user,
        channel=channel,
        scheduled_send_time=send_time,
        recipient_contact_info=contact_info,
    )

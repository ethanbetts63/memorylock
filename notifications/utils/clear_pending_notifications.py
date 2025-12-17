from notifications.models import Notification

def clear_pending_notifications(event: 'Event'):
    """
    Deletes all notifications with a 'pending' status for a given event.
    """
    # This local import prevents a potential circular dependency between the
    # 'events' and 'notifications' apps.
    from events.models import Event
    Notification.objects.filter(event=event, status='pending').delete()

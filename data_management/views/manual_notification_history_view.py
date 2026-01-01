from .base_analytics_view import BaseAnalyticsView

class ManualNotificationHistoryView(BaseAnalyticsView):
    """
    Provides time-series data for manual notifications.
    """
    CHANNELS = ['admin_call', 'social_media', 'emergency_contact']

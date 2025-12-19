from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
from datetime import timedelta, date
from collections import defaultdict
from django.db.models.functions import TruncDate
from django.db.models import Count

from notifications.models import Notification

class BaseAnalyticsView(APIView):
    """
    Base class for notification analytics views to share common logic.
    """
    permission_classes = [IsAdminUser]

    # To be defined by subclasses
    CHANNELS = []
    COMPLETED_STATUSES = []

    def get(self, request, *args, **kwargs):
        # 1. Determine date range
        pending_notifications = Notification.objects.filter(
            channel__in=self.CHANNELS,
            status='pending'
        ).order_by('scheduled_send_time')

        earliest_pending = pending_notifications.first()
        latest_pending = pending_notifications.last()

        today = timezone.now().date()
        start_date = today - timedelta(days=30) # Default: last 30 days
        end_date = today + timedelta(days=30)   # Default: next 30 days

        if earliest_pending:
            start_date = earliest_pending.scheduled_send_time.date() - timedelta(days=7)
        
        if latest_pending:
            end_date = latest_pending.scheduled_send_time.date() + timedelta(days=7)

        # 2. Get "scheduled" counts
        scheduled_counts = Notification.objects.filter(
            channel__in=self.CHANNELS,
            scheduled_send_time__date__range=[start_date, end_date]
        ).annotate(day=TruncDate('scheduled_send_time')).values('day').annotate(count=Count('id')).order_by('day')

        # 3. Get "completed" counts
        completed_counts = Notification.objects.filter(
            channel__in=self.CHANNELS,
            status__in=self.COMPLETED_STATUSES,
            updated_at__date__range=[start_date, end_date]
        ).annotate(day=TruncDate('updated_at')).values('day').annotate(count=Count('id')).order_by('day')
        
        # 4. Combine and format the data
        chart_data = defaultdict(lambda: {'scheduled': 0, 'completed': 0})

        for item in scheduled_counts:
            chart_data[item['day']]['scheduled'] = item['count']

        for item in completed_counts:
            chart_data[item['day']]['completed'] = item['count']

        # 5. Format for the chart
        response_data = []
        current_date = start_date
        while current_date <= end_date:
            data_point = chart_data[current_date]
            response_data.append({
                'date': current_date.strftime('%Y-%m-%d'),
                'scheduled': data_point['scheduled'],
                'completed': data_point['completed'],
            })
            current_date += timedelta(days=1)

        return Response(response_data)


class AutomatedNotificationHistoryView(BaseAnalyticsView):
    """
    Provides time-series data for automated notifications.
    - Scheduled: All notifications of this type.
    - Completed: Notifications with 'sent' status.
    """
    CHANNELS = ['primary_email', 'primary_sms', 'backup_email', 'backup_sms']
    COMPLETED_STATUSES = ['sent']


from django.contrib.auth import get_user_model
from events.models import Event
from payments.models import Payment
from dateutil.relativedelta import relativedelta
from django.db.models.functions import TruncMonth


class ManualNotificationHistoryView(BaseAnalyticsView):
    """
    Provides time-series data for manual notifications.
    - Scheduled: All notifications of this type.
    - Completed: Notifications with 'completed' status.
    """
    CHANNELS = ['admin_call', 'social_media', 'emergency_contact']
    COMPLETED_STATUSES = ['completed']


class HistoricalSummaryView(APIView):
    """
    Provides a historical summary of platform-wide analytics for the last 12 months,
    grouped by month.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        today = timezone.now().date()
        twelve_months_ago = today - relativedelta(months=12)

        User = get_user_model()

        # Aggregate data by month
        user_counts = User.objects.filter(
            date_joined__gte=twelve_months_ago
        ).annotate(month=TruncMonth('date_joined')).values('month').annotate(count=Count('id')).order_by('month')

        event_counts = Event.objects.filter(
            created_at__gte=twelve_months_ago
        ).annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).order_by('month')
        
        payment_counts = Payment.objects.filter(
            status='succeeded',
            created_at__gte=twelve_months_ago
        ).annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).order_by('month')

        # Create a dictionary to hold data for all months in the range
        chart_data = defaultdict(lambda: {'users': 0, 'events': 0, 'payments': 0})

        for item in user_counts:
            chart_data[item['month'].date()]['users'] = item['count']
        
        for item in event_counts:
            chart_data[item['month'].date()]['events'] = item['count']

        for item in payment_counts:
            chart_data[item['month'].date()]['payments'] = item['count']

        # Format for the chart response
        response_data = []
        # Start from the first day of the month, 12 months ago
        current_month = twelve_months_ago.replace(day=1)
        
        while current_month <= today:
            data_point = chart_data.get(current_month, {'users': 0, 'events': 0, 'payments': 0})
            response_data.append({
                'month': current_month.strftime('%Y-%m'),
                'users': data_point['users'],
                'events': data_point['events'],
                'payments': data_point['payments'],
            })
            # Move to the first day of the next month
            current_month += relativedelta(months=1)

        return Response(response_data)

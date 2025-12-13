from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta

from users.models import User
from events.models import Event
from payments.models import Payment

class DashboardAnalyticsView(APIView):
    """
    Provides aggregated data for the admin dashboard analytics chart.

    This view is accessible only to admin users.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        # Define the time range for the analytics (e.g., last 30 days)
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        
        # --- Data Aggregation ---
        
        # 1. Profile Creations
        profile_creations = (
            User.objects
            .filter(date_joined__date__gte=start_date)
            .annotate(date=TruncDate('date_joined'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )

        # 2. Event Creations
        event_creations = (
            Event.objects
            .filter(created_at__date__gte=start_date)
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )

        # 3. Successful Payments
        successful_payments = (
            Payment.objects
            .filter(status='succeeded', created_at__date__gte=start_date)
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )

        # --- Data Merging ---

        # Create a dictionary to hold the merged data, with a key for each date
        # in the range.
        all_dates = [start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)]
        chart_data = {date.strftime('%Y-%m-%d'): {
            "date": date.strftime('%Y-%m-%d'),
            "profileCreations": 0,
            "eventCreations": 0,
            "successfulPayments": 0
        } for date in all_dates}
        
        # Populate the dictionary with data from the queries
        for item in profile_creations:
            date_str = item['date'].strftime('%Y-%m-%d')
            if date_str in chart_data:
                chart_data[date_str]['profileCreations'] = item['count']

        for item in event_creations:
            date_str = item['date'].strftime('%Y-%m-%d')
            if date_str in chart_data:
                chart_data[date_str]['eventCreations'] = item['count']
        
        for item in successful_payments:
            date_str = item['date'].strftime('%Y-%m-%d')
            if date_str in chart_data:
                chart_data[date_str]['successfulPayments'] = item['count']

        # Convert the dictionary of data back to a list of objects for the chart
        # and rename date to month to match the example
        final_data = [{**v, 'month': v['date']} for v in chart_data.values()]
        
        return Response(list(final_data))

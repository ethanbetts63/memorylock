from django.urls import path
from .views.notification_views import NotificationStatsView, AdminTaskListView

urlpatterns = [
    path('stats/', NotificationStatsView.as_view(), name='notification-stats'),
    path('admin-tasks/', AdminTaskListView.as_view(), name='notification-admin-tasks'),
]

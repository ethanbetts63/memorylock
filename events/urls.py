from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.event_view import EventViewSet
from .views.event_creation_views import AuthenticatedEventCreateView

router = DefaultRouter()
router.register(r'', EventViewSet, basename='event')

urlpatterns = [
    path('', include(router.urls)),
    path('create/', AuthenticatedEventCreateView.as_view(), name='create-event'),
]

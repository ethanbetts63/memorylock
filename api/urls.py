from django.urls import path
from .views.frontend_views.faq_list_view import FaqListView
from .views.anonymous_event_view import AnonymousEventCreateView

urlpatterns = [
    path('faqs/', FaqListView.as_view(), name='faq-list'),
    path('events/create/anonymous/', AnonymousEventCreateView.as_view(), name='anonymous-event-create'),
]

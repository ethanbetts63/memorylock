from django.urls import path
from .views.frontend_views.faq_list_view import FaqListView

urlpatterns = [
    path('faqs/', FaqListView.as_view(), name='faq-list'),
]

from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
import json
from data_management.models import FAQ
from payments.models import Price
from api.serializers import FaqSerializer

def catchall_view(request: HttpRequest) -> HttpResponse:
    """
    A custom view to serve the React frontend's index.html, with preloaded data.
    """
    
    # Fetch FAQ data for the homepage
    try:
        home_faqs_qs = FAQ.objects.filter(pages__contains='home')
        faq_serializer = FaqSerializer(home_faqs_qs, many=True)
        faq_data = faq_serializer.data
    except Exception:
        faq_data = []

    # Fetch single event price data
    try:
        price = Price.objects.filter(is_active=True, type='one_time').first()
        if not price:
            price_data = {"error": "No active price configured for purchase."}
        else:
            # Manually serialize the data to match the existing API response
            price_data = {
                'priceId': price.id,
                'amount': str(price.amount), # Convert Decimal to string for JSON
                'currency': price.currency,
            }
    except Exception:
        price_data = {"error": "An unexpected error occurred."}

    preloaded_data = {
        "faqs": faq_data,
        "singleEventPrice": price_data
    }
    
    context = {
        'preloaded_data': json.dumps(preloaded_data)
    }
    return render(request, 'index.html', context)

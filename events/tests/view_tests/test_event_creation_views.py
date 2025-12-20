# events/tests/view_tests/test_event_creation_views.py
import pytest
from rest_framework.test import APIClient
from users.tests.factories.user_factory import UserFactory
from payments.tests.factories.tier_factory import TierFactory
from events.models import Event

@pytest.mark.django_db
def test_authenticated_event_create_success():
    """
    Tests that an authenticated user can successfully create an event.
    """
    # Required "Automated" tier for the serializer to work
    TierFactory(name="Automated")
    user = UserFactory()
    client = APIClient()
    client.force_authenticate(user=user)

    event_data = {
        'name': 'Test Event',
        'event_date': '2025-12-25',
        'notes': 'Test notes',
        'weeks_in_advance': 4,
    }

    response = client.post('/api/events/create/', event_data, format='json')

    assert response.status_code == 201
    assert Event.objects.count() == 1
    
    event = Event.objects.first()
    assert event.user == user
    assert event.name == event_data['name']
    assert event.tier.name == "Automated" # Check if the default tier was assigned

@pytest.mark.django_db
def test_authenticated_event_create_unauthenticated():
    """
    Tests that an unauthenticated user cannot create an event and gets a 401.
    """
    client = APIClient()
    event_data = {
        'name': 'Test Event',
        'event_date': '2025-12-25',
    }

    response = client.post('/api/events/create/', event_data, format='json')

    assert response.status_code == 401
    assert Event.objects.count() == 0

import pytest
from events.serializers.event_creation_serializers import AuthenticatedEventCreateSerializer
from users.tests.factories.user_factory import UserFactory
from payments.tests.factories.tier_factory import TierFactory

@pytest.mark.django_db
def test_authenticated_event_create_serializer(drf_request_factory):
    """
    Tests that the AuthenticatedEventCreateSerializer correctly creates an event
    for an authenticated user.
    """
    user = UserFactory()
    tier = TierFactory(name="Automated")
    
    event_data = {
        'name': 'Test Event',
        'event_date': '2025-12-25',
        'notes': 'Test notes',
        'weeks_in_advance': 4,
    }

    # Use the fixture to create a DRF request with the user
    request = drf_request_factory(method="post", user=user, data=event_data)

    serializer = AuthenticatedEventCreateSerializer(
        data=event_data, 
        context={'request': request}
    )
    assert serializer.is_valid(raise_exception=True)
    
    event = serializer.save()

    assert event.user == user
    assert event.name == event_data['name']
    assert event.tier == tier

import pytest
from events.models import Event
from events.tests.factories.event_factory import EventFactory

@pytest.mark.django_db
def test_event_factory():
    """
    Tests that the EventFactory can successfully create an Event instance.
    """
    event = EventFactory()
    assert isinstance(event, Event)
    assert event.name is not None
    assert event.event_date is not None
    assert event.user is not None
    assert event.tier is not None

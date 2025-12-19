import factory
from factory.django import DjangoModelFactory
from factory import Faker
from payments.models import Tier

class TierFactory(DjangoModelFactory):
    class Meta:
        model = Tier

    name = Faker('word')
    description = Faker('paragraph')
    stripe_product_id = Faker('uuid4')
    is_active = Faker('boolean')

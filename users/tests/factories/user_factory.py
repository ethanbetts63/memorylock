import factory
from factory.django import DjangoModelFactory
from factory import Faker
from users.models import User

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)

    username = Faker('user_name')
    first_name = Faker('first_name')
    last_name = Faker('last_name')
    email = Faker('email')
    is_staff = False
    is_active = True
    is_superuser = False
    country_code = Faker('country_code')
    phone = Faker('phone_number')
    backup_email = Faker('email')
    facebook_handle = Faker('user_name')
    instagram_handle = Faker('user_name')
    snapchat_handle = Faker('user_name')
    x_handle = Faker('user_name')
    is_email_verified = Faker('boolean')

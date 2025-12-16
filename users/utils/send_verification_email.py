from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from users.models import User


def send_verification_email(user: User):
    """
    Sends an email to the user with a link to verify their account.
    """
    try:
        # Generate a token and user ID for the verification URL
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Construct the verification URL
        verification_url = f"{settings.SITE_URL}/api/users/verify-email/{uid}/{token}/"

        context = {
            'user': user,
            'verification_url': verification_url,
            'site_url': settings.SITE_URL,
        }

        subject = "Verify Your FutureReminder Account"
        html_content = render_to_string("users/emails/verification_email.html", context)
        text_content = render_to_string("users/emails/verification_email.txt", context)

        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        return True
    except Exception as e:
        # In a real app, you would have more robust error logging here
        print(f"Failed to send verification email to {user.email}. Error: {e}")
        return False

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from users.models import User
from django.conf import settings
from users.utils.send_verification_email import send_verification_email


class EmailVerificationView(APIView):
    """
    View to handle the email verification link clicked by the user.
    """
    def get(self, request, uidb64, token, *args, **kwargs):
        """
        Verifies the user's email address.
        """
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
            
            # Redirect to a frontend page indicating success.
            return redirect(f"{settings.SITE_URL}/verification-success/")
        else:
            # Redirect to a frontend page indicating failure.
            return redirect(f"{settings.SITE_URL}/verification-failed/")


class ResendVerificationView(APIView):
    """
    Allows a logged-in user to request a new verification email.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Sends a new verification email to the currently authenticated user.
        """
        user = request.user
        if user.is_email_verified:
            return Response(
                {"detail": "This email has already been verified."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Re-send the verification email
        send_verification_email(user)
        
        return Response(
            {"detail": "A new verification email has been sent to your primary email address."},
            status=status.HTTP_200_OK
        )


import jwt
from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions
from api.models import Member


class JWTAuthentication(authentication.BaseAuthentication):
    """
    JWT authentication class for validating JWT tokens in the Authorization header.
    """

    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            return None

        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                return None
        except ValueError:
            return None

        try:
            payload = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM]
            )
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Токен истёк.')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Неверный токен.')

        try:
            user = Member.objects.get(id=payload['user_id'])
        except Member.DoesNotExist:
            raise exceptions.AuthenticationFailed('Пользователь не найден.')

        if not user.is_active:
            raise exceptions.AuthenticationFailed('Пользователь неактивен.')

        return (user, token)

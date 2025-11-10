import jwt
from datetime import datetime, timedelta
from django.conf import settings


def generate_jwt_token(user):
    """
    Generate JWT token for the given user.
    """
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + settings.JWT_ACCESS_TOKEN_LIFETIME,
        'iat': datetime.utcnow()
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return token

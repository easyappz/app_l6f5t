from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.utils import timezone
from api.serializers import (
    MessageSerializer,
    RegistrationSerializer,
    LoginSerializer,
    UserProfileSerializer
)
from api.models import Member
from api.utils import generate_jwt_token


class HelloView(APIView):
    def get(self, request):
        serializer = MessageSerializer(data={
            'message': 'Hello, World!',
            'timestamp': timezone.now()
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


class RegistrationView(APIView):
    """
    Register a new user and return JWT token.
    """

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = generate_jwt_token(user)

            return Response(
                {
                    'token': token,
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name
                    }
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):
    """
    Authenticate user and return JWT token.
    """

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {'errors': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = Member.objects.get(email=email)
        except Member.DoesNotExist:
            return Response(
                {'error': 'Неверный email или пароль.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.check_password(password):
            return Response(
                {'error': 'Неверный email или пароль.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {'error': 'Аккаунт неактивен.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        token = generate_jwt_token(user)

        return Response(
            {
                'token': token,
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            },
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    """
    Logout user by invalidating token.
    Since we're using stateless JWT, we just return success.
    Client should remove the token.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response(
            {'message': 'Выход выполнен успешно.'},
            status=status.HTTP_200_OK
        )


class ProfileView(APIView):
    """
    Retrieve and update authenticated user profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer = UserProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

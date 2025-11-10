from django.urls import path
from .views import (
    HelloView,
    RegistrationView,
    LoginView,
    LogoutView,
    ProfileView
)

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("profile/", ProfileView.as_view(), name="profile"),
]

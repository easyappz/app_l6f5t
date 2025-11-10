from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class MemberManager(BaseUserManager):
    """
    Custom manager for Member model where email is the unique identifier
    for authentication instead of username.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular Member with the given email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Member(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model where email is the unique identifier for authentication.
    """
    email = models.EmailField(
        max_length=255,
        unique=True,
        verbose_name='Email address'
    )
    first_name = models.CharField(
        max_length=150,
        verbose_name='First name'
    )
    last_name = models.CharField(
        max_length=150,
        verbose_name='Last name'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Active status'
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name='Staff status'
    )
    date_joined = models.DateTimeField(
        default=timezone.now,
        verbose_name='Date joined'
    )

    objects = MemberManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
        ordering = ['-date_joined']

    def __str__(self):
        return self.email

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()

    def get_short_name(self):
        """
        Return the short name for the user.
        """
        return self.first_name

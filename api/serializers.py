from rest_framework import serializers
from api.models import Member


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={'input_type': 'password'},
        error_messages={
            'required': 'Пароль обязателен для заполнения.',
            'blank': 'Пароль не может быть пустым.',
            'min_length': 'Пароль должен содержать минимум 8 символов.'
        }
    )
    email = serializers.EmailField(
        error_messages={
            'required': 'Email обязателен для заполнения.',
            'blank': 'Email не может быть пустым.',
            'invalid': 'Введите корректный email адрес.'
        }
    )
    first_name = serializers.CharField(
        max_length=150,
        error_messages={
            'required': 'Имя обязательно для заполнения.',
            'blank': 'Имя не может быть пустым.',
            'max_length': 'Имя не может превышать 150 символов.'
        }
    )
    last_name = serializers.CharField(
        max_length=150,
        error_messages={
            'required': 'Фамилия обязательна для заполнения.',
            'blank': 'Фамилия не может быть пустой.',
            'max_length': 'Фамилия не может превышать 150 символов.'
        }
    )

    class Meta:
        model = Member
        fields = ['email', 'first_name', 'last_name', 'password']

    def validate_email(self, value):
        if Member.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует.')
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Пароль должен содержать минимум 8 символов.')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        member = Member(**validated_data)
        member.set_password(password)
        member.save()
        return member


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        error_messages={
            'required': 'Email обязателен для заполнения.',
            'blank': 'Email не может быть пустым.',
            'invalid': 'Введите корректный email адрес.'
        }
    )
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        error_messages={
            'required': 'Пароль обязателен для заполнения.',
            'blank': 'Пароль не может быть пустым.'
        }
    )


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        read_only=True
    )
    first_name = serializers.CharField(
        max_length=150,
        error_messages={
            'required': 'Имя обязательно для заполнения.',
            'blank': 'Имя не может быть пустым.',
            'max_length': 'Имя не может превышать 150 символов.'
        }
    )
    last_name = serializers.CharField(
        max_length=150,
        error_messages={
            'required': 'Фамилия обязательна для заполнения.',
            'blank': 'Фамилия не может быть пустой.',
            'max_length': 'Фамилия не может превышать 150 символов.'
        }
    )

    class Meta:
        model = Member
        fields = ['email', 'first_name', 'last_name']

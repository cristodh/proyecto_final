# importar ModelSerializer que es una function de framework para traducir
from rest_framework.serializers import ModelSerializer
from .models import User  # importar el modelo User
from .models import Role
from .models import Key_interests
from .models import RecoveryCode
from .models import RejectionReason
from rest_framework import serializers, validators
import re


class UserSerializer(ModelSerializer):
    
    email = serializers.EmailField(
        validators=[validators.UniqueValidator(queryset=User.objects.all())]
    )
    role_name = serializers.CharField(source='role.role', read_only=True)
    role_id = serializers.IntegerField(source='role.id', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'address','role_name', 'role_id',
              'phone_number', 'role', 'nationality', 'date_of_birth', 'goverment_ID', 'gender', 'date_joined','created_at' ,'active']

    def create(self, validated_data):
        # Sacamos la contrasenia de todos los datos
        password = validated_data.pop('password')
        user = User(**validated_data)  # El usuario
        user.set_password(password)  # Ciframos la contrasenia
        user.save()  # guardamos el cambio
        return user  # se regresa el usuario creado

    # validacion de la contraseña
    def validate(self, validated_data):
        password = validated_data.get('password')

        # Validar longitud mínima
        if len(password) < 8:
            raise serializers.ValidationError(
                "La contraseña debe tener al menos 8 caracteres.")

        # Validar que tenga al menos una letra mayúscula
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError(
                "La contraseña debe contener al menos una letra mayúscula.")

        # Validar que tenga al menos un número
        if not re.search(r'[0-9]', password):
            raise serializers.ValidationError(
                "La contraseña debe contener al menos un número.")

        # Validar que tenga al menos un carácter especial
        if not re.search(r'[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]', password):
            raise serializers.ValidationError(
                "La contraseña debe contener al menos un carácter especial (!@#$%^&* etc).")
        

        return validated_data


class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'role']


class Key_interestsSerializer(ModelSerializer):
    class Meta:
        model = Key_interests
        fields = '__all__'

class RecoveryCodeSerializer(ModelSerializer):
    class Meta:
        model = RecoveryCode
        fields = '__all__'


class RejectionReasonSerializer(ModelSerializer):
    """
    Serializer para el modelo RejectionReason
    Permite crear y actualizar motivos de rechazo
    """
    class Meta:
        model = RejectionReason
        fields = ['id', 'user', 'rejection_reason', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
from rest_framework.serializers import ModelSerializer # importar ModelSerializer que es una function de framework para traducir
from .models import User # importar el modelo User
from .models import Role
from .models import Nationality
from .models import Key_interests

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'address', 'phone_number', 'role', 'nationality', 'date_of_birth','goverment_ID','gender']

    def create(self,validated_data):
        password = validated_data.pop('password') # Sacamos la contrasenia de todos los datos
        user = User(**validated_data) # El usuario
        user.set_password(password) # Ciframos la contrasenia
        user.save() # guardamos el cambio
        return user # se regresa el usuario creado

class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class NationalitySerializer(ModelSerializer):
    class Meta:
        model = Nationality
        fields = "__all__"

class Key_interestsSerializer(ModelSerializer):
    class Meta:
        model = Key_interests
        fields = '__all__'
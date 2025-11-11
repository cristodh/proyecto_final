from rest_framework.serializers import ModelSerializer # importar ModelSerializer que es una function de framework para traducir
from .models import User # importar el modelo User
from .models import Role
from .models import Nationality

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'address', 'phone_number', 'role', 'nationality']

class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class NationalitySerializer(ModelSerializer):
    class Meta:
        model = Nationality
        fields = "__all__"


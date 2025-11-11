from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView # importar ListCreateAPIView para traer info y crear User y todos lo demas

from .models import User
from .models import Role
from .models import Nationality

from .serializers import UserSerializer
from .serializers import RoleSerializer
from .serializers import NationalitySerializer


# Create your views here.

class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all() # traer todos los User (MODELO)
    serializer_class = UserSerializer # usar el UserSerializer para traducir la info (TRADUCE EL MODELO A JSON)

class RoleListCreateView(ListCreateAPIView):
    queryset = Role.objects.all() # traer todos los Role (MODELO)
    serializer_class = RoleSerializer # usar el RoleSerializer para traducir la info (TRADUCE EL MODELO A JSON)

class NationalityListCreateView(ListCreateAPIView):
    queryset = Nationality.objects.all() # traer todos los Nationality (MODELO)
    serializer_class = NationalitySerializer # usar el NationalitySerializer para traducir la info (TRADUCE EL MODELO A JSON)
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView # importar ListCreateAPIView para traer info y crear User y todos lo demas
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .models import User
from .models import Role
from .models import Nationality
from .models import Key_interests

from .serializers import UserSerializer
from .serializers import RoleSerializer
from .serializers import NationalitySerializer
from .serializers import Key_interestsSerializer


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

class Key_interestsListCreateView(ListCreateAPIView):
    queryset = Key_interests.objects.all() # traer todos los Key_interests (MODELO)
    serializer_class = Key_interestsSerializer # usar el Key_interestsSerializer para traducir la info (TRADUCE EL MODELO A JSON)

class UserLoginView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        usuario = authenticate(username=username,password=password)

        if usuario is not None:
            return Response({'message':'Login successful'})
        else:
            return Response({'message':'Invalid credentials'},status=401)
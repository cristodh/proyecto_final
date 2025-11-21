from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView # importar ListCreateAPIView para traer info y crear User y todos lo demas
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

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

        user = authenticate(username=username,password=password) # lo de la izq es la DB lo de la der es la variable

        if user is not None:
            token = RefreshToken.for_user(user)
            return Response({
                'message':'Login successful',
                'id': user.id,
                'token': str(token.access_token)
                })
        else:
            return Response({'message':'Invalid credentials'},status=401)

# Pista  Se usa el ListCreateAPIView.
# Pista  Se usa el UserSerializer.
# Pista hay que modificar el queryset para que traiga solo los usuarios por id desde el localstorage


class UserByID(ListCreateAPIView):
    method = 'get'
    serializer_class = UserSerializer  # Usa el serializador de usuario

    # Sobrescribimos get_queryset para filtrar por ID
    def get_queryset(self):
        # Obtener el ID desde la URL (pk = primary key)
        user_id = self.kwargs.get("pk")
        # Filtrar el usuario por ese ID
        return User.objects.filter(id=user_id)
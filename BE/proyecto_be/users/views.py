from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView # importar ListCreateAPIView para traer info y crear User y todos lo demas
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .models import Role
from .models import Key_interests
from .models import RecoveryCode

from .serializers import UserSerializer
from .serializers import RoleSerializer
from .serializers import Key_interestsSerializer
from .serializers import RecoveryCodeSerializer



class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all() # traer todos los User (MODELO)
    serializer_class = UserSerializer # usar el UserSerializer para traducir la info (TRADUCE EL MODELO A JSON)

class RoleListCreateView(ListCreateAPIView):
    queryset = Role.objects.all() # traer todos los Role (MODELO)
    serializer_class = RoleSerializer # usar el RoleSerializer para traducir la info (TRADUCE EL MODELO A JSON)

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
    
class RecoveryCodeAPIView(APIView): 
    def post(self, request): 
        user_id = request.data.get('user_id') # ID del usuario al que se le asignará el código
        code = request.data.get('code') # Código de recuperación a asignar
        
        try:
            user=User.objects.get(id=user_id) # Obtener el usuario por ID
        except User.DoesNotExist:
            user = None
            return Response({'message': 'User not found'}, status=404) # Usuario no encontrado
        
        if user:
            recovery_code = RecoveryCode.objects.create(user=user, code=code) # se guarda el código de recuperación
            serializer = RecoveryCodeSerializer(recovery_code)  # Serializar el código de recuperación
            return Response(serializer.data, status=201) # Devolver la respuesta con el código serializado
        else:
            return Response({'message': 'User not found'}, status=404) # Usuario no encontrado
        
class RecoveryCodeListView(ListCreateAPIView):
    queryset = RecoveryCode.objects.all()  # Traer todos los RecoveryCode (MODELO)
    serializer_class = RecoveryCodeSerializer  # Usar el RecoveryCodeSerializer para traducir la info (TRADUCE EL MODELO A JSON)


# TODO: Implementar el uso del codigo de recuperacion para cambiar la contraseña
class RecoverPasswordView(APIView):
    def patch(self,request):
        email_user = request.data.get('email_user') # le pedimos el correo al usuario
        new_password = request.data.get('new_password') # la clave nueva que se va a actualizar
        
        """
            Verficamos que el usuario exista.
            
            Luego, si el usuario escribio una contraseña se la asignamos
        """
        try:
            user = User.objects.get(email=email_user)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        
        if new_password:
            user.set_password(new_password)
            user.save() # se confirma el guardado para que se modifique en la base de datos (el save, es una propiedad del user)
            return Response({'message': 'Password updated successfully'}, status=200)
        else:
            return Response({'message': 'New password not provided'}, status=400)
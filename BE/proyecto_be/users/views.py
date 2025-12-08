from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView # importar ListCreateAPIView para traer info y crear User y todos lo demas
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,IsAdminUser # los permisos para validar si el usuario esta autenticado (inicio sesion)

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
    permission_classes = [IsAdminUser]  # Requiere autenticación para acceder a esta vista
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

# Login para administradores
class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            # Verificar si el usuario es administrador
            # El usuario debe tener un rol de admin o estar en is_staff/is_superuser
            if user.is_staff or user.is_superuser or (hasattr(user, 'role') and user.role and 'admin' in str(user.role).lower()):
                token = RefreshToken.for_user(user)
                return Response({
                    'message': 'Admin login successful',
                    'id': user.id,
                    'token': str(token.access_token),
                    'is_admin': True
                })
            else:
                return Response({'message': 'User is not an administrator'}, status=403)
        else:
            return Response({'message': 'Invalid credentials'}, status=401)

# Vista para obtener datos del admin autenticado
# class GetAdminView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         """Obtener datos del admin autenticado usando el token"""
#         user = request.user
        
#         # Verificar que sea admin
#         if not (user.is_staff or user.is_superuser or (hasattr(user, 'role') and user.role and 'admin' in str(user.role).lower())):
#             return Response({'message': 'User is not an administrator'}, status=403)
        
#         serializer = UserSerializer(user)
#         return Response({
#             'message': 'Admin data retrieved successfully',
#             'admin': serializer.data,
#             'is_admin': True
#         }, status=200)


class UserByID(ListCreateAPIView):
    method = 'get'
    serializer_class = UserSerializer  # Usa el serializador de usuario

    permission_classes = [IsAuthenticated] # obligamos que para el uso de la vista, el usuario tenga que estar autenticado
    
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

# Guarda el codigo de recuperacion en la bd     
class RecoveryCodeListView(ListCreateAPIView):
    queryset = RecoveryCode.objects.all()  # Traer todos los RecoveryCode (MODELO)
    serializer_class = RecoveryCodeSerializer  # Usar el RecoveryCodeSerializer para traducir la info (TRADUCE EL MODELO A JSON)


# valida que el codigo de recuperacion pertenezca al usuario y actualiza la contraseña
class RecoverPasswordView(APIView):
    def patch(self,request):
        email_user = request.data.get('email_user') # le pedimos el correo al usuario
        new_password = request.data.get('new_password') # la clave nueva que se va a actualizar
        code = request.data.get('code') # el codigo de recuperacion que se le envio al usuario
        
        """
            Verficamos que el usuario exista.
            
            Luego, si el usuario escribio una contraseña se la asignamos
        """
        try:
            user = User.objects.get(email=email_user)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        
        try:
            recovery_code = RecoveryCode.objects.get(user=user, code=code)
            if not recovery_code:
                return Response({'message': 'Invalid recovery code'}, status=400)
            if new_password:
                user.set_password(new_password)
                user.save() # se confirma el guardado para que se modifique en la base de datos (el save, es una propiedad del user)
                recovery_code.delete()  # Eliminar el código de recuperación después de usarlo
                return Response({'message': 'Password updated successfully'}, status=200)
            else:
                return Response({'message': 'New password not provided'}, status=400)
        except RecoveryCode.DoesNotExist:
            return Response({'message': 'Invalid recovery code'}, status=400)

# Vista para actualizar y eliminar usuarios
class UserUpdateDeleteView(APIView):
    permission_classes = [IsAuthenticated]  # Requiere autenticación
    
    def put(self, request):
        """Actualizar un usuario existente"""
        user_id = request.data.get('id')
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        
        # Actualizar campos permitidos
        if 'role' in request.data:
            try:
                role = Role.objects.get(role=request.data['role'])
                user.role = role
            except Role.DoesNotExist:
                return Response({'message': 'Role not found'}, status=404)
        
        if 'active' in request.data:
            user.active = request.data['active']
        
        if 'first_name' in request.data:
            user.first_name = request.data['first_name']
        
        if 'last_name' in request.data:
            user.last_name = request.data['last_name']
        
        if 'email' in request.data:
            user.email = request.data['email']
        
        user.save()
        serializer = UserSerializer(user)
        return Response({'message': 'User updated successfully', 'user': serializer.data}, status=200)
    
    def delete(self, request):
        """Eliminar un usuario"""
        user_id = request.query_params.get('id')
        
        if not user_id:
            return Response({'message': 'User ID is required'}, status=400)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=200)

#TODO: Implementar la vista para aprobar organizaciones
class ApproveOrganization(APIView):
    pass


class CreateAdminUser(APIView):
    permission_classes = [IsAdminUser]  # Solo administradores pueden crear otros administradorees
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')


        User.objects.create_superuser(
            username=username,
            password=password,
            email=email,
            phone_number='0000000000',
            date_of_birth='2000-01-01',
            first_name='Admin',
            last_name='User',
            address='Admin Address',
            goverment_ID='ADMIN0000',
            gender='Other',
            role=Role.objects.filter(id=5).first(),
        )

        return Response({'message':'Admin user created successfully'},status=201)


        


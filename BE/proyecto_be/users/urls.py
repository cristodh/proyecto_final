from django.urls import path

from .views import UserListCreateView
from .views import RoleListCreateView
from .views import UserLoginView
from .views import Key_interestsListCreateView
from .views import UserByID
from .views import RecoveryCodeListView
from .views import RecoveryCodeAPIView
from .views import RecoverPasswordView

urlpatterns = [
    path('new_users/', UserListCreateView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('new_roles/', RoleListCreateView.as_view()),
    path('new_key_interests/', Key_interestsListCreateView.as_view()),
    path('user_id/<int:pk>/', UserByID.as_view()),
    path('get_recovery_code/', RecoveryCodeListView.as_view()),
    path('create_recovery_code/', RecoveryCodeAPIView.as_view()),
    path('recover_password/', RecoverPasswordView.as_view()),

]
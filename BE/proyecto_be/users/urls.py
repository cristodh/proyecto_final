from django.urls import path

from .views import UserListCreateView
from .views import RoleListCreateView
from .views import NationalityListCreateView
from .views import UserLoginView
from .views import Key_interestsListCreateView
from .views import UserByID

urlpatterns = [
    path('new_users/', UserListCreateView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('new_roles/', RoleListCreateView.as_view()),
    path('new_nationalities/', NationalityListCreateView.as_view()),
    path('new_key_interests/', Key_interestsListCreateView.as_view()),
    path('user_id/<int:pk>/', UserByID.as_view()),
]
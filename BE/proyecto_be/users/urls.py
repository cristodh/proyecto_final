from django.urls import path

from .views import UserListCreateView
from .views import RoleListCreateView
from .views import NationalityListCreateView

urlpatterns = [
    path('new_users/', UserListCreateView.as_view()),
    path('new_roles/', RoleListCreateView.as_view()),
    path('new_nationalities/', NationalityListCreateView.as_view()),
]
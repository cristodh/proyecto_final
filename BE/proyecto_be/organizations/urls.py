from django.urls import path
from .views import OrganizationCreateView


urlpatterns = [
    path('create_organization/', OrganizationCreateView.as_view(), name='organization-create'),
]
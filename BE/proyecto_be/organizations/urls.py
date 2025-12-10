from django.urls import path
from .views import OrganizationCreateView, OrganizationUpdateDeleteView


urlpatterns = [
    path('', OrganizationCreateView.as_view(), name='organization-list-create'),
    path('create_organization/', OrganizationCreateView.as_view(), name='organization-create'),
    path('update_delete/', OrganizationUpdateDeleteView.as_view(), name='organization-update-delete'),
]
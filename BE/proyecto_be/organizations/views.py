from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationCreateView(ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
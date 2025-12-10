from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationCreateView(ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class OrganizationUpdateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        """Actualizar una organización existente"""
        org_id = request.data.get('id')

        try:
            organization = Organization.objects.get(id=org_id)
        except Organization.DoesNotExist:
            return Response({'message': 'Organization not found'}, status=404)

        # Actualizar campos permitidos
        if 'organization_name' in request.data:
            organization.organization_name = request.data['organization_name']

        if 'organization_type' in request.data:
            organization.organization_type = request.data['organization_type']

        if 'tax_id' in request.data:
            organization.tax_id = request.data['tax_id']

        if 'website' in request.data:
            organization.website = request.data['website']

        if 'experience_years' in request.data:
            organization.experience_years = request.data['experience_years']

        if 'focus_area' in request.data:
            organization.focus_area = request.data['focus_area']

        if 'description' in request.data:
            organization.description = request.data['description']

        organization.save()
        serializer = OrganizationSerializer(organization)
        return Response({'message': 'Organization updated successfully', 'organization': serializer.data}, status=200)

    def delete(self, request):
        """Eliminar una organización"""
        org_id = request.query_params.get('id')

        if not org_id:
            return Response({'message': 'Organization ID is required'}, status=400)

        try:
            organization = Organization.objects.get(id=org_id)
        except Organization.DoesNotExist:
            return Response({'message': 'Organization not found'}, status=404)

        organization.delete()
        return Response({'message': 'Organization deleted successfully'}, status=200)
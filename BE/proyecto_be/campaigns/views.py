from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView 
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView

from .models import Campaign
from .models import Category # importar el modelo Category
from .models import MediaContent # importar el modelo MediaContent
from .models import Donation # importar el modelo Donation

from .serializers import CampaignSerializer # importar el serializador CampaignSerializer
from .serializers import CategorySerializer # importar el serializador CategorySerializer
from .serializers import MediaContentSerializer # importar el serializador MediaContentSerializer
from .serializers import DonationSerializer # importar el serializador DonationSerializer


# ============================================================
# VISTAS CRUD - CAMPAÑAS
# ============================================================

class CampaignListCreateView(ListCreateAPIView):
    """
    Vista para listar todas las campañas y crear nuevas campañas
    - GET: Lista todas las campañas
    - POST: Crea una nueva campaña (requiere autenticación)
    """
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Asigna automáticamente el usuario logueado como creator
        """
        serializer.save(creator=self.request.user)

class UserCampaignListView(ListCreateAPIView):
    """
    Vista para listar todas las campañas creadas por el usuario autenticado
    - GET: Lista todas las campañas del usuario autenticado
    """
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra las campañas por el usuario autenticado
        """
        user_id = self.kwargs['user_id']
        return Campaign.objects.filter(creator=user_id)

from rest_framework.views import APIView
from rest_framework.response import Response

class CampaignUpdateView(APIView):
    """
    Vista para actualizar una campaña existente
    - PATCH: Actualiza campos específicos de una campaña
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            campaign = Campaign.objects.get(id=pk)
            
            # Campos básicos
            if 'name' in request.data:
                campaign.name = request.data.get('name')
            if 'description' in request.data:
                campaign.description = request.data.get('description')
            if 'short_description' in request.data:
                campaign.short_description = request.data.get('short_description')
            if 'slogan' in request.data:
                campaign.slogan = request.data.get('slogan')
            if 'story' in request.data:
                campaign.story = request.data.get('story')
            
            # Campos de fechas
            if 'start_date' in request.data:
                campaign.start_date = request.data.get('start_date')
            if 'end_date' in request.data:
                campaign.end_date = request.data.get('end_date')
            
            # Campos financieros
            if 'goal_amount' in request.data:
                campaign.goal_amount = request.data.get('goal_amount')
            
            # Campos de ubicación y categoría
            if 'location' in request.data:
                campaign.location = request.data.get('location')
            if 'category' in request.data:
                campaign.category_id = request.data.get('category')
            
            # Campos de contacto
            if 'contact_phone' in request.data:
                campaign.contact_phone = request.data.get('contact_phone')
            if 'contact_email' in request.data:
                campaign.contact_email = request.data.get('contact_email')
            if 'website' in request.data:
                campaign.website = request.data.get('website')
            
            # Campos adicionales
            if 'permissions' in request.data:
                campaign.permissions = request.data.get('permissions')
            if 'campaign_status' in request.data:
                campaign.campaign_status = request.data.get('campaign_status')
            
            # Comentario del administrador
            if 'admin_comment' in request.data:
                campaign.admin_comment = request.data.get('admin_comment')
            
            # PDF Documents
            if 'pdf_documents' in request.data:
                campaign.pdf_documents = request.data.get('pdf_documents')
            
            # Project Sections (metas por sección)
            if 'project_sections' in request.data:
                campaign.project_sections = request.data.get('project_sections')
            
            campaign.save()
            
            # Retornar la campaña actualizada
            serializer = CampaignSerializer(campaign)
            return Response({
                'message': 'Campaña actualizada exitosamente',
                'campaign': serializer.data
            }, status=200)
            
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaña no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class CampaignStatusUpdateView(APIView):
    """
    Vista para actualizar solo el estado de una campaña (para admin)
    - PATCH: Actualiza el estado de la campaña y comentario del admin
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            campaign = Campaign.objects.get(id=pk)
            
            if 'campaign_status' in request.data:
                campaign.campaign_status = request.data.get('campaign_status')
                
                # Actualizar comentario del administrador si viene en la petición
                if 'admin_comment' in request.data:
                    campaign.admin_comment = request.data.get('admin_comment')
                
                campaign.save()
                
                serializer = CampaignSerializer(campaign)
                return Response({
                    'message': f'Estado actualizado a {campaign.campaign_status}',
                    'campaign': serializer.data
                }, status=200)
            else:
                return Response({'error': 'Se requiere el campo campaign_status'}, status=400)
                
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaña no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

# ============================================================
# VISTAS CRUD - CATEGORÍAS
# ============================================================

class CategoryListCreateView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# ============================================================
# VISTAS CRUD - CONTENIDO MULTIMEDIA
# ============================================================

class MediaContentListCreateView(ListCreateAPIView):
    queryset = MediaContent.objects.all()
    serializer_class = MediaContentSerializer

# ============================================================
# VISTAS CRUD - DONACIONES
# ============================================================

class DonationListCreateView(ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

class DeleteCampaignView(DestroyAPIView):
    """
    Vista para eliminar una campaña existente
    - DELETE: Elimina una campaña por su ID
    """
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
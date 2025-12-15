from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView 
from rest_framework.permissions import IsAuthenticated

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
    def patch(self,request):
        id_campaign = request.data.get('id')
        name = request.data.get('name')
        description = request.data.get('description')
        

        try:    
            campaign = Campaign.objects.get(id=id_campaign)

            if name:
                campaign.name = name
            if description:
                campaign.description = description
            campaign.save()

            return Response({'message': 'Campaign updated successfully'}, status=200)
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaign not found'}, status=404)

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


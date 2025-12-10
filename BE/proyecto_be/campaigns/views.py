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

from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView 

from .models import Campaign
from .models import Category # importar el modelo Category
from .models import MediaContent # importar el modelo MediaContent
from .models import Donation # importar el modelo Donation

from .serializers import CampaignSerializer # importar el serializador CampaignSerializer
from .serializers import CategorySerializer # importar el serializador CategorySerializer
from .serializers import MediaContentSerializer # importar el serializador MediaContentSerializer
from .serializers import DonationSerializer # importar el serializador DonationSerializer

class CampaignListCreateView(ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class CategoryListCreateView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MediaContentListCreateView(ListCreateAPIView):
    queryset = MediaContent.objects.all()
    serializer_class = MediaContentSerializer

class DonationListCreateView(ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
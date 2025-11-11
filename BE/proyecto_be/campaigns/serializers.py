from rest_framework.serializers import ModelSerializer # importar ModelSerializer que es una function de framework para traducir

from .models import Campaign # importar el modelo Campaign
from .models import Category # importar el modelo Category
from .models import MediaContent # importar el modelo MediaContent
from .models import Donation # importar el modelo Donation

class CampaignSerializer(ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class MediaContentSerializer(ModelSerializer):
    class Meta:
        model = MediaContent
        fields = '__all__'

class DonationSerializer(ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'
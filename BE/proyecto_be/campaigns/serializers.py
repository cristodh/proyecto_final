from rest_framework.serializers import ModelSerializer # importar ModelSerializer que es una function de framework para traducir
from rest_framework import serializers

from .models import Campaign # importar el modelo Campaign
from .models import Category # importar el modelo Category
from .models import MediaContent # importar el modelo MediaContent
from .models import Donation # importar el modelo Donation

class CampaignSerializer(ModelSerializer):
    """
    Serializer para el modelo Campaign
    Incluye todos los campos del formulario de creación
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    creator_username = serializers.CharField(source='creator.username', read_only=True)
    
    class Meta:
        model = Campaign
        fields = [
            'id', 'name', 'description', 'short_description', 'slogan', 'story',
            'start_date', 'end_date', 'goal_amount', 'current_amount',
            'location', 'category', 'category_name', 'contact_phone', 'contact_email',
            'website', 'permissions', 'campaign_status', 'admin_comment', 'creator', 'creator_username',
            'pdf_documents', 'project_sections', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'current_amount', 'created_at', 'updated_at', 'creator']

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
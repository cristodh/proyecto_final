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
            'pdf_documents', 'project_sections', 'main_image', 'created_at', 'updated_at'
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
    # Campos de solo lectura para mostrar info relacionada
    donor_username = serializers.CharField(source='donor.username', read_only=True)
    donor_email = serializers.CharField(source='donor.email', read_only=True)
    campaign_name = serializers.CharField(source='campaign.name', read_only=True)
    approved_by_username = serializers.CharField(source='approved_by.username', read_only=True, allow_null=True)
    
    class Meta:
        model = Donation
        fields = [
            'id', 'amount', 'donated_at', 'message', 'anonymous',
            'payment_method', 'campaign', 'campaign_name', 'donor', 
            'donor_username', 'donor_email', 'confirmation_number', 
            'confirmation_email', 'proof_of_payment_url', 'proof_of_payment_description',
            'donation_status', 'approved_at', 'approved_by', 'approved_by_username', 'rejection_reason'
        ]
        read_only_fields = ['id', 'donated_at', 'confirmation_number', 'donor', 'approved_at', 'approved_by', 'approved_by_username']


class DonationCreateSerializer(ModelSerializer):
    """
    Serializer específico para crear donaciones
    No requiere confirmation_number (se genera automáticamente)
    """
    class Meta:
        model = Donation
        fields = [
            'amount', 'message', 'anonymous', 'payment_method', 
            'campaign', 'confirmation_email', 'proof_of_payment_url', 
            'proof_of_payment_description'
        ]
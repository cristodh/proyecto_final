from django.urls import path

from .views import CampaignListCreateView
from .views import CategoryListCreateView
from .views import MediaContentListCreateView
from .views import UserCampaignListView
from .views import CampaignUpdateView
from .views import CampaignStatusUpdateView
from .views import DeleteCampaignView
from .views import PublicCampaignListView, PublicCampaignDetailView

# Vistas de donaciones
from .views import (
    DonationListCreateView,
    DonationCreateView,
    CampaignDonationsView,
    UserDonationsView,
    DonorDonationsView,
    DonationDetailView,
    PaymentMethodsView,
    BankAccountsView,
    DonationApprovalsView,
    DonationApproveView,
    DonationRejectView,
    UserReportCreateView,
    UserReportListView,
    UserReportStatusUpdateView,
)

urlpatterns = [
    # ============================================================
    # CAMPAÑAS PÚBLICAS (sin autenticación)
    # ============================================================
    path('explore/', PublicCampaignListView.as_view()),
    path('explore/<int:pk>/', PublicCampaignDetailView.as_view()),
    
    # ============================================================
    # CAMPAÑAS (requieren autenticación)
    # ============================================================
    path('new_campaigns/', CampaignListCreateView.as_view()),
    path('user_campaigns/<int:user_id>/', UserCampaignListView.as_view()),
    path('update/<int:pk>/', CampaignUpdateView.as_view()),
    path('status/<int:pk>/', CampaignStatusUpdateView.as_view()),
    path('campaign_delete/<int:id>/', DeleteCampaignView.as_view()),
    
    # ============================================================
    # CATEGORÍAS (público para lectura)
    # ============================================================
    path('categories/', CategoryListCreateView.as_view()),
    path('new_categories/', CategoryListCreateView.as_view()),
    
    # ============================================================
    # CONTENIDO MULTIMEDIA
    # ============================================================
    path('new_media-content/', MediaContentListCreateView.as_view()),
    
    # ============================================================
    # DONACIONES
    # ============================================================
    # Obtener métodos de pago disponibles (GET)
    path('payments/methods/', PaymentMethodsView.as_view()),
    # Obtener cuentas bancarias (GET)
    path('payments/bank-accounts/', BankAccountsView.as_view()),
    
    # Crear donación (POST)
    path('donations/create/', DonationCreateView.as_view()),
    
    # Listar todas las donaciones - admin (GET)
    path('donations/', DonationListCreateView.as_view()),
    
    # Donaciones pendientes de una campaña (GET) - para admin
    path('donations/campaign/<int:campaign_id>/pending/', DonationApprovalsView.as_view()),
    
    # Donaciones de una campaña específica (GET)
    path('donations/campaign/<int:campaign_id>/', CampaignDonationsView.as_view()),
    
    # Historial de donaciones del usuario logueado (GET)
    path('donations/my-donations/', UserDonationsView.as_view()),
    
    # Donaciones de un donante específico - admin (GET)
    path('donations/donor/<int:donor_id>/', DonorDonationsView.as_view()),
    
    # Detalle de una donación por número de confirmación (GET)
    path('donations/detail/<str:confirmation_number>/', DonationDetailView.as_view()),
    
    # Aprobar una donación (PATCH)
    path('donations/<int:donation_id>/approve/', DonationApproveView.as_view()),
    
    # Rechazar una donación (PATCH)
    path('donations/<int:donation_id>/reject/', DonationRejectView.as_view()),
    
    # ============================================================
    # REPORTES DE USUARIOS
    # ============================================================
    # Crear un reporte (POST)
    path('reports/create/', UserReportCreateView.as_view()),
    # Listar reportes (GET) y gestionar un reporte (PATCH/DELETE)
    path('reports/', UserReportListView.as_view()),
    path('reports/<int:report_id>/', UserReportStatusUpdateView.as_view()),
]
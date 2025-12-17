from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView 
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import DestroyAPIView
from django.db.models import Q
from django.utils import timezone

from .models import Campaign
from .models import Category # importar el modelo Category
from .models import MediaContent # importar el modelo MediaContent
from .models import Donation # importar el modelo Donation
from .models import UserReport # importar el modelo UserReport

from .serializers import CampaignSerializer # importar el serializador CampaignSerializer
from .serializers import CategorySerializer # importar el serializador CategorySerializer
from .serializers import MediaContentSerializer # importar el serializador MediaContentSerializer
from .serializers import DonationSerializer, DonationCreateSerializer # importar los serializadores de donaciones
from .serializers import UserReportSerializer, UserReportCreateSerializer # importar los serializadores de reportes

import uuid
from decimal import Decimal
from django.db import transaction
from django.db.models import Sum


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
# VISTAS PÚBLICAS - EXPLORACIÓN DE CAMPAÑAS
# ============================================================

class PublicCampaignListView(APIView):
    """
    Vista pública para listar campañas activas (no requiere autenticación)
    - GET: Lista campañas activas con filtros opcionales
    """
    permission_classes = []  # Sin autenticación requerida

    def get(self, request):
        try:
            # Solo campañas activas para el público
            campaigns = Campaign.objects.filter(campaign_status='active')
            
            # Filtros opcionales
            category = request.query_params.get('category')
            location = request.query_params.get('location')
            search = request.query_params.get('search')
            sort_by = request.query_params.get('sort_by', 'recent')
            min_goal = request.query_params.get('min_goal')
            max_goal = request.query_params.get('max_goal')
            
            # Aplicar filtros
            if category:
                campaigns = campaigns.filter(category_id=category)
            
            if location:
                campaigns = campaigns.filter(location__icontains=location)
            
            if search:
                campaigns = campaigns.filter(
                    Q(name__icontains=search) |
                    Q(description__icontains=search) |
                    Q(short_description__icontains=search)
                )
            
            if min_goal:
                campaigns = campaigns.filter(goal_amount__gte=min_goal)
            
            if max_goal:
                campaigns = campaigns.filter(goal_amount__lte=max_goal)
            
            # Ordenamiento
            if sort_by == 'recent':
                campaigns = campaigns.order_by('-created_at')
            elif sort_by == 'popular':
                # Ordenar por progreso (current_amount / goal_amount)
                campaigns = campaigns.order_by('-current_amount')
            elif sort_by == 'ending':
                campaigns = campaigns.order_by('end_date')
            elif sort_by == 'top':
                campaigns = campaigns.order_by('-goal_amount')
            elif sort_by == 'name':
                campaigns = campaigns.order_by('name')
            
            serializer = CampaignSerializer(campaigns, many=True)
            
            return Response({
                'count': campaigns.count(),
                'campaigns': serializer.data
            }, status=200)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class PublicCampaignDetailView(APIView):
    """
    Vista pública para ver detalles de una campaña activa
    - GET: Detalle de una campaña (campos limitados si no está autenticado)
    """
    permission_classes = []  # Sin autenticación requerida

    def get(self, request, pk):
        try:
            campaign = Campaign.objects.get(id=pk)
            
            # Solo mostrar campañas activas al público
            if campaign.campaign_status != 'active' and not request.user.is_authenticated:
                return Response({
                    'error': 'Esta campaña no está disponible'
                }, status=403)
            
            serializer = CampaignSerializer(campaign)
            data = serializer.data
            
            # Si no está autenticado, ocultar algunos campos sensibles
            if not request.user.is_authenticated:
                # Campos a ocultar para usuarios no autenticados
                fields_to_hide = ['contact_phone', 'contact_email', 'admin_comment']
                for field in fields_to_hide:
                    if field in data:
                        data[field] = None
            
            # Obtener estadísticas de donaciones
            donations_count = Donation.objects.filter(campaign=campaign).count()
            
            return Response({
                'campaign': data,
                'stats': {
                    'donations_count': donations_count,
                    'progress_percentage': round(
                        (float(campaign.current_amount) / float(campaign.goal_amount)) * 100, 2
                    ) if campaign.goal_amount > 0 else 0
                }
            }, status=200)
            
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaña no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


# ============================================================
# VISTAS CRUD - CATEGORÍAS
# ============================================================

class CategoryListCreateView(ListCreateAPIView):
    """
    Categorías - GET es público, POST requiere autenticación
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

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
    """
    Vista para listar todas las donaciones (admin) y crear nuevas
    - GET: Lista todas las donaciones
    - POST: Crea una nueva donación
    """
    queryset = Donation.objects.all().order_by('-donated_at')
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]


class DonationCreateView(APIView):
    """
    Crea una donación en estado PENDING.
    La donación NO se refleja en el monto actual de la campaña
    hasta que sea aprobada por un administrador.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Transacción atómica para evitar inconsistencias
            with transaction.atomic():

                # Obtener la campaña
                campaign_id = request.data.get("campaign")
                campaign = Campaign.objects.get(id=campaign_id)

                # Validar que la campaña esté activa
                if campaign.campaign_status != "active":
                    return Response(
                        {"error": "Solo se pueden recibir donaciones en campañas activas"},
                        status=400
                    )

                # Validar monto
                amount = Decimal(str(request.data.get("amount")))
                if amount <= 0:
                    return Response(
                        {"error": "El monto de la donación debe ser mayor a 0"},
                        status=400
                    )

                # Generar número de confirmación único
                confirmation_number = f"DON-{uuid.uuid4().hex[:8].upper()}-{campaign.id}"

                # Crear donación en estado PENDING
                donation = Donation.objects.create(
                    campaign=campaign,
                    donor=request.user,
                    amount=amount,
                    message=request.data.get("message", ""),
                    anonymous=request.data.get("anonymous", False),
                    payment_method=request.data.get("payment_method"),
                    confirmation_number=confirmation_number,
                    confirmation_email=request.data.get(
                        "confirmation_email",
                        request.user.email
                    ),

                    # Comprobante de pago (Cloudinary)
                    proof_of_payment_url=request.data.get(
                        "proof_of_payment_url", ""
                    ),
                    proof_of_payment_description=request.data.get(
                        "proof_of_payment_description", ""
                    ),
                    proof_of_payment_name=request.data.get(
                        "proof_of_payment_name", ""
                    ),

                    # 🔑 Estado inicial
                    donation_status="pending"
                )

                # Serializar respuesta
                serializer = DonationSerializer(donation)

                return Response(
                    {
                        "message": "Donación registrada correctamente y pendiente de aprobación",
                        "donation": serializer.data
                    },
                    status=201
                )

        except Campaign.DoesNotExist:
            return Response(
                {"error": "La campaña indicada no existe"},
                status=404
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=400
            )


class CampaignDonationsView(APIView):
    """
    Vista para obtener todas las donaciones de una campaña específica
    - GET: Lista donaciones de una campaña
    """
    permission_classes = [AllowAny]

    def get(self, request, campaign_id):
        try:
            campaign = Campaign.objects.get(id=campaign_id)
            donations = Donation.objects.filter(campaign=campaign,donation_status='approved')
            
            # Para donaciones anónimas, ocultar información del donante
            donation_list = []
            for donation in donations:
                data = DonationSerializer(donation).data
                if donation.anonymous:
                    data['donor_username'] = 'Anónimo'
                    data['donor_email'] = None
                    data['donor'] = None
                donation_list.append(data)
            
            # Estadísticas de la campaña
            total_donations = donations.count()
            total_amount = donations.aggregate(Sum('amount'))['amount__sum'] or 0
            
            return Response({
                'campaign_id': campaign.id,
                'campaign_name': campaign.name,
                'donations': donation_list,
                'stats': {
                    'total_donations': total_donations,
                    'total_amount': str(total_amount),
                    'goal_amount': str(campaign.goal_amount),
                    'current_amount': str(campaign.current_amount),
                    'progress_percentage': round((float(campaign.current_amount) / float(campaign.goal_amount)) * 100, 2) if campaign.goal_amount > 0 else 0
                }
            }, status=200)
            
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaña no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class UserDonationsView(APIView):
    """
    Vista para obtener el historial de donaciones del usuario autenticado
    - GET: Lista todas las donaciones hechas por el usuario logueado
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            donations = Donation.objects.filter(donor=request.user).order_by('-donated_at')
            serializer = DonationSerializer(donations, many=True)
            
            # Estadísticas del donante
            total_donations = donations.count()
            total_amount = donations.aggregate(Sum('amount'))['amount__sum'] or 0
            campaigns_supported = donations.values('campaign').distinct().count()
            
            return Response({
                'donations': serializer.data,
                'stats': {
                    'total_donations': total_donations,
                    'total_amount': str(total_amount),
                    'campaigns_supported': campaigns_supported
                }
            }, status=200)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class DonorDonationsView(APIView):
    """
    Vista para obtener las donaciones de un donante específico (para admin)
    - GET: Lista todas las donaciones de un usuario por su ID
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, donor_id):
        try:
            donations = Donation.objects.filter(donor_id=donor_id).order_by('-donated_at')
            
            # Ocultar info de donaciones anónimas excepto el monto
            donation_list = []
            for donation in donations:
                data = DonationSerializer(donation).data
                if donation.anonymous:
                    data['message'] = '[Mensaje oculto - donación anónima]'
                donation_list.append(data)
            
            # Estadísticas
            total_donations = donations.count()
            total_amount = donations.aggregate(Sum('amount'))['amount__sum'] or 0
            
            return Response({
                'donor_id': donor_id,
                'donations': donation_list,
                'stats': {
                    'total_donations': total_donations,
                    'total_amount': str(total_amount)
                }
            }, status=200)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class DonationDetailView(APIView):
    """
    Vista para obtener detalles de una donación específica
    - GET: Obtiene los detalles de una donación por su número de confirmación
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, confirmation_number):
        try:
            donation = Donation.objects.get(confirmation_number=confirmation_number)
            
            # Solo el donante o un admin puede ver los detalles completos
            if donation.donor != request.user and not request.user.is_staff:
                if donation.anonymous:
                    return Response({
                        'error': 'No tienes permiso para ver esta donación'
                    }, status=403)
            
            serializer = DonationSerializer(donation)
            return Response(serializer.data, status=200)
            
        except Donation.DoesNotExist:
            return Response({'error': 'Donación no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class DeleteCampaignView(DestroyAPIView):
    """
    Vista para eliminar una campaña existente
    - DELETE: Elimina una campaña por su ID
    """
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class PaymentMethodsView(APIView):
    """
    Vista para obtener las opciones de métodos de pago disponibles
    - GET: Retorna lista de métodos de pago con sus etiquetas
    """
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            payment_methods = [
                {
                    'value': choice[0],
                    'label': choice[1]
                }
                for choice in Donation.PAYMENT_CHOICES
            ]
            
            return Response({
                'payment_methods': payment_methods
            }, status=200)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class DonationApprovalsView(APIView):
    """
    Vista para obtener todas las donaciones pendientes de una campaña (para admin)
    - GET: Lista donaciones pendientes de una campaña
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, campaign_id):
        try:
            campaign = Campaign.objects.get(id=campaign_id)
            # Verificar que es el creator de la campaña o es admin
            if request.user != campaign.creator and not request.user.is_staff:
                return Response({'error': 'No tienes permiso para ver estas donaciones'}, status=403)
            
            donations = Donation.objects.filter(campaign=campaign, donation_status='pending').order_by('-donated_at')
            serializer = DonationSerializer(donations, many=True)
            return Response({
                'pending_donations': serializer.data,
                'count': donations.count()
            }, status=200)
            
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaña no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class DonationApproveView(APIView):
    """
    Vista para aprobar una donación
    - PATCH: Aprueba una donación y suma el monto a la campaña
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, donation_id):
        try:
            with transaction.atomic():
                donation = Donation.objects.select_for_update().get(id=donation_id)
                campaign = donation.campaign
                
                # Verificar permiso
                if request.user != campaign.creator and not request.user.is_staff:
                    return Response({'error': 'No tienes permiso'}, status=403)
                
                if donation.donation_status != 'pending':
                    return Response({'error': f'La donación ya está {donation.donation_status}'}, status=400)
                
                # Aprobar donación
                donation.donation_status = 'approved'
                donation.approved_at = timezone.now()
                donation.approved_by = request.user
                donation.save()
                
                # Actualizar el current_amount de la campaña
                campaign.current_amount = Decimal(str(campaign.current_amount)) + Decimal(str(donation.amount))
                campaign.save()
                
                serializer = DonationSerializer(donation)
                return Response({
                    'message': 'Donación aprobada exitosamente',
                    'donation': serializer.data,
                    'campaign_current_amount': str(campaign.current_amount)
                }, status=200)
                
        except Donation.DoesNotExist:
            return Response({'error': 'Donación no encontrada'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class DonationRejectView(APIView):
    """
    Vista para rechazar una donación
    - PATCH: Rechaza una donación con motivo
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, donation_id):
        try:
            with transaction.atomic():
                donation = Donation.objects.select_for_update().get(
                    id=donation_id,
                    donation_status='pending'
                )

                campaign = donation.campaign

                # Verificar permiso
                if request.user != campaign.creator and not request.user.is_staff:
                    return Response({'error': 'No tienes permiso'}, status=403)

                rejection_reason = request.data.get('rejection_reason')
                if not rejection_reason:
                    return Response(
                        {'error': 'Debes proporcionar un motivo de rechazo'},
                        status=400
                    )

                # ❌ Rechazar donación (NO afecta montos)
                donation.donation_status = 'rejected'
                donation.rejection_reason = rejection_reason
                donation.approved_by = request.user
                donation.save()

                serializer = DonationSerializer(donation)
                return Response({
                    'message': 'Donación rechazada correctamente',
                    'donation': serializer.data
                }, status=200)

        except Donation.DoesNotExist:
            return Response(
                {'error': 'Donación no encontrada o ya procesada'},
                status=404
            )
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class BankAccountsView(APIView):
    """
    Vista para obtener las cuentas bancarias de la plataforma
    - GET: Retorna lista de cuentas bancarias ficticias para recibir donaciones
    """
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            bank_accounts = [
                {
                    'bank': 'Banco de Costa Rica (BCR)',
                    'account_type': 'Cuenta IBAN',
                    'account_number': 'CR12015202001026284066',
                    'account_holder': 'Plataforma de Donaciones CR',
                    'currency': 'CRC',
                    'sinpe_phone': None
                },
                {
                    'bank': 'Banco Nacional de Costa Rica',
                    'account_type': 'Cuenta Cliente',
                    'account_number': '100-01-000-123456-7',
                    'account_holder': 'Plataforma de Donaciones CR',
                    'currency': 'CRC',
                    'sinpe_phone': None
                },
                {
                    'bank': 'BAC San José',
                    'account_type': 'Cuenta Corriente',
                    'account_number': '923456789',
                    'account_holder': 'Plataforma de Donaciones CR',
                    'currency': 'CRC',
                    'sinpe_phone': None
                },
                {
                    'bank': 'SINPE Móvil',
                    'account_type': 'Teléfono',
                    'account_number': '8888-8888',
                    'account_holder': 'Plataforma de Donaciones CR',
                    'currency': 'CRC',
                    'sinpe_phone': '88888888'
                },
            ]
            
            return Response({
                'bank_accounts': bank_accounts,
                'instructions': 'Por favor realice su transferencia a cualquiera de estas cuentas y luego suba el comprobante de pago.'
            }, status=200)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class UserReportCreateView(APIView):
    """
    Vista para crear un reporte de usuario
    - POST: Crea un reporte de un usuario sobre otro usuario
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Validar que el usuario reportado existe
            reported_user_id = request.data.get('reported_user')
            campaign_id = request.data.get('campaign')
            donation_id = request.data.get('donation')

            # Para reportar campañas se permite reported_user vacío; para reportar usuarios es obligatorio
            if not reported_user_id and not campaign_id:
                return Response({'error': 'Debes enviar reported_user o campaign'}, status=400)
            
            # Verificar que no se está reportando a sí mismo (solo si viene reported_user)
            if reported_user_id and str(reported_user_id) == str(request.user.id):
                return Response({'error': 'No puedes reportarte a ti mismo'}, status=400)
            
            # Crear el reporte
            report = UserReport.objects.create(
                reporter=request.user,
                reported_user_id=reported_user_id if reported_user_id else None,
                campaign_id=campaign_id,
                donation_id=donation_id,
                reason=request.data.get('reason', 'other'),
                description=request.data.get('description', '')
            )
            
            serializer = UserReportSerializer(report)
            return Response({
                'message': 'Reporte enviado exitosamente',
                'report': serializer.data
            }, status=201)
            
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class UserReportListView(APIView):
    """
    Vista para listar todos los reportes (solo admin)
    - GET: permite filtrar por tipo con query param ?type=campaign|user|all
    - Default: campaign (solo campañas) para evitar mezclar con reportes de usuario
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not request.user.is_staff:
                return Response({'error': 'No tienes permiso'}, status=403)

            report_type = request.query_params.get('type', 'campaign')
            reports = UserReport.objects.all().select_related(
                'reporter', 'reported_user', 'campaign', 'donation'
            ).order_by('-created_at')

            if report_type == 'campaign':
                reports = reports.filter(campaign__isnull=False, reported_user__isnull=True)
            elif report_type == 'user':
                reports = reports.filter(reported_user__isnull=False)

            serializer = UserReportSerializer(reports, many=True)
            return Response({
                'count': reports.count(),
                'results': serializer.data
            }, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class UserReportStatusUpdateView(APIView):
    """
    Vista para actualizar o eliminar un reporte (solo admin)
    - PATCH: actualiza el estado del reporte
    - DELETE: elimina el reporte
    """
    permission_classes = [IsAuthenticated]
    allowed_status = ['open', 'reviewed', 'dismissed']

    def _get_report(self, report_id):
        try:
            return UserReport.objects.get(id=report_id)
        except UserReport.DoesNotExist:
            return None

    def patch(self, request, report_id):
        try:
            if not request.user.is_staff:
                return Response({'error': 'No tienes permiso'}, status=403)

            report = self._get_report(report_id)
            if not report:
                return Response({'error': 'Reporte no encontrado'}, status=404)

            new_status = request.data.get('status')
            if new_status not in self.allowed_status:
                return Response({'error': 'Estado inválido'}, status=400)

            report.status = new_status
            report.save()

            serializer = UserReportSerializer(report)
            return Response({
                'message': 'Estado actualizado',
                'report': serializer.data
            }, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

    def delete(self, request, report_id):
        try:
            if not request.user.is_staff:
                return Response({'error': 'No tienes permiso'}, status=403)

            report = self._get_report(report_id)
            if not report:
                return Response({'error': 'Reporte no encontrado'}, status=404)

            report.delete()
            return Response({'message': 'Reporte eliminado'}, status=204)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
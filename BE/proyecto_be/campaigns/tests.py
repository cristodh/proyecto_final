from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from decimal import Decimal
from .models import Campaign, Category, Donation
from users.models import Role

User = get_user_model()


class DonationAPITestCase(APITestCase):
    """
    Tests para los endpoints de donaciones
    """
    
    def setUp(self):
        """
        Configuración inicial para cada test
        """
        # Crear rol de donante
        self.donor_role, _ = Role.objects.get_or_create(id=4, defaults={'role': 'Donor'})
        
        # Crear usuario donante con todos los campos requeridos
        self.donor = User.objects.create_user(
            username='donante_test',
            email='donante@test.com',
            password='testpass123',
            first_name='Juan',
            last_name='Pérez',
            address='San José, Costa Rica',
            phone_number=88888888,
            date_of_birth='1990-01-01',
            goverment_ID='123456789',
            gender='Male',
            nationality='Costa Rica',
            role=self.donor_role
        )
        
        # Crear usuario manager (creador de campañas)
        self.manager = User.objects.create_user(
            username='manager_test',
            email='manager@test.com',
            password='testpass123',
            first_name='María',
            last_name='González',
            address='Cartago, Costa Rica',
            phone_number=77777777,
            date_of_birth='1985-05-15',
            goverment_ID='987654321',
            gender='Female',
            nationality='Costa Rica',
            role=self.donor_role
        )
        
        # Crear categoría
        self.category = Category.objects.create(
            name='Educación',
            description='Proyectos educativos'
        )
        
        # Crear campaña activa
        self.campaign = Campaign.objects.create(
            name='Campaña de Prueba',
            description='Descripción de prueba',
            start_date='2025-01-01',
            end_date='2025-12-31',
            goal_amount=Decimal('100000.00'),
            current_amount=Decimal('0.00'),
            location='San José',
            category=self.category,
            creator=self.manager,
            campaign_status='active'
        )
        
        # Crear campaña pendiente (no activa)
        self.pending_campaign = Campaign.objects.create(
            name='Campaña Pendiente',
            description='Esta campaña no está activa',
            start_date='2025-01-01',
            end_date='2025-12-31',
            goal_amount=Decimal('50000.00'),
            current_amount=Decimal('0.00'),
            location='Cartago',
            category=self.category,
            creator=self.manager,
            campaign_status='pending'
        )
        
        self.client = APIClient()
    
    def test_create_donation_success(self):
        """
        Test: Crear donación exitosamente a una campaña activa
        """
        self.client.force_authenticate(user=self.donor)
        
        data = {
            'campaign': self.campaign.id,
            'amount': '5000.00',
            'message': '¡Éxito con el proyecto!',
            'anonymous': False,
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'donante@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('donation', response.data)
        self.assertIn('confirmation_number', response.data['donation'])
        self.assertEqual(response.data['donation']['amount'], '5000.00')
        
        # Verificar que el current_amount de la campaña se actualizó
        self.campaign.refresh_from_db()
        self.assertEqual(self.campaign.current_amount, Decimal('5000.00'))
    
    def test_create_donation_to_inactive_campaign(self):
        """
        Test: No se puede donar a una campaña que no está activa
        """
        self.client.force_authenticate(user=self.donor)
        
        data = {
            'campaign': self.pending_campaign.id,
            'amount': '5000.00',
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'donante@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
    
    def test_create_donation_invalid_amount(self):
        """
        Test: No se puede donar un monto inválido (0 o negativo)
        """
        self.client.force_authenticate(user=self.donor)
        
        # Monto cero
        data = {
            'campaign': self.campaign.id,
            'amount': '0',
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'donante@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Monto negativo
        data['amount'] = '-100'
        response = self.client.post('/campaign/donations/create/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_donation_unauthenticated(self):
        """
        Test: No se puede donar sin autenticación
        """
        data = {
            'campaign': self.campaign.id,
            'amount': '5000.00',
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'test@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_create_anonymous_donation(self):
        """
        Test: Crear donación anónima
        """
        self.client.force_authenticate(user=self.donor)
        
        data = {
            'campaign': self.campaign.id,
            'amount': '10000.00',
            'message': 'Donación secreta',
            'anonymous': True,
            'payment_method': 'bank_transfer',
            'confirmation_email': 'donante@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['donation']['anonymous'])
    
    def test_get_campaign_donations(self):
        """
        Test: Obtener donaciones de una campaña específica
        """
        self.client.force_authenticate(user=self.donor)
        
        # Crear algunas donaciones primero
        Donation.objects.create(
            amount=Decimal('1000.00'),
            campaign=self.campaign,
            donor=self.donor,
            payment_method='sinpe_movil',
            confirmation_number='DON-TEST001',
            confirmation_email='test@test.com'
        )
        Donation.objects.create(
            amount=Decimal('2000.00'),
            campaign=self.campaign,
            donor=self.manager,
            payment_method='bank_transfer_bcr',
            confirmation_number='DON-TEST002',
            confirmation_email='test2@test.com',
            anonymous=True
        )
        
        response = self.client.get(f'/campaign/donations/campaign/{self.campaign.id}/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['donations']), 2)
        self.assertIn('stats', response.data)
        self.assertEqual(response.data['stats']['total_donations'], 2)
        
        # Verificar que la donación anónima oculta el nombre
        anonymous_donation = [d for d in response.data['donations'] if d['anonymous']][0]
        self.assertEqual(anonymous_donation['donor_username'], 'Anónimo')
    
    def test_get_user_donations(self):
        """
        Test: Obtener historial de donaciones del usuario logueado
        """
        self.client.force_authenticate(user=self.donor)
        
        # Crear donación
        Donation.objects.create(
            amount=Decimal('5000.00'),
            campaign=self.campaign,
            donor=self.donor,
            payment_method='sinpe_movil',
            confirmation_number='DON-USER001',
            confirmation_email='donante@test.com'
        )
        
        response = self.client.get('/campaign/donations/my-donations/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['donations']), 1)
        self.assertEqual(response.data['stats']['total_donations'], 1)
        self.assertEqual(response.data['stats']['total_amount'], '5000.00')
    
    def test_get_donation_by_confirmation_number(self):
        """
        Test: Obtener detalle de donación por número de confirmación
        """
        self.client.force_authenticate(user=self.donor)
        
        donation = Donation.objects.create(
            amount=Decimal('7500.00'),
            campaign=self.campaign,
            donor=self.donor,
            payment_method='bank_transfer_bn',
            confirmation_number='DON-DETAIL001',
            confirmation_email='donante@test.com',
            message='Mensaje de prueba'
        )
        
        response = self.client.get(f'/campaign/donations/detail/{donation.confirmation_number}/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['amount'], '7500.00')
        self.assertEqual(response.data['message'], 'Mensaje de prueba')
    
    def test_multiple_donations_update_campaign_amount(self):
        """
        Test: Múltiples donaciones actualizan correctamente el current_amount
        """
        self.client.force_authenticate(user=self.donor)
        
        # Primera donación
        data = {
            'campaign': self.campaign.id,
            'amount': '10000.00',
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'test@test.com'
        }
        self.client.post('/campaign/donations/create/', data)
        
        # Segunda donación
        data['amount'] = '5000.00'
        self.client.post('/campaign/donations/create/', data)
        
        # Tercera donación
        data['amount'] = '2500.00'
        self.client.post('/campaign/donations/create/', data)
        
        # Verificar total
        self.campaign.refresh_from_db()
        self.assertEqual(self.campaign.current_amount, Decimal('17500.00'))
    
    def test_donation_to_nonexistent_campaign(self):
        """
        Test: No se puede donar a una campaña que no existe
        """
        self.client.force_authenticate(user=self.donor)
        
        data = {
            'campaign': 99999,  # ID que no existe
            'amount': '5000.00',
            'payment_method': 'sinpe_movil',
            'confirmation_email': 'test@test.com'
        }
        
        response = self.client.post('/campaign/donations/create/', data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class DonationModelTestCase(TestCase):
    """
    Tests para el modelo Donation
    """
    
    def setUp(self):
        self.donor_role, _ = Role.objects.get_or_create(id=4, defaults={'role': 'Donor'})
        
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123',
            address='Test Address',
            phone_number=66666666,
            date_of_birth='1995-06-15',
            goverment_ID='111222333',
            gender='Male',
            nationality='Costa Rica',
            role=self.donor_role
        )
        self.category = Category.objects.create(
            name='Test',
            description='Test category'
        )
        self.campaign = Campaign.objects.create(
            name='Test Campaign',
            description='Test',
            start_date='2025-01-01',
            end_date='2025-12-31',
            goal_amount=Decimal('10000.00'),
            location='Test',
            category=self.category,
            creator=self.user,
            campaign_status='active'
        )
    
    def test_donation_str_representation(self):
        """
        Test: Representación string del modelo Donation
        """
        donation = Donation.objects.create(
            amount=Decimal('1000.00'),
            campaign=self.campaign,
            donor=self.user,
            payment_method='sinpe_movil',
            confirmation_number='DON-STR001',
            confirmation_email='test@test.com'
        )
        
        expected_str = f"Donation of 1000.00 by testuser to Test Campaign"
        self.assertEqual(str(donation), expected_str)
    
    def test_donation_confirmation_number_unique(self):
        """
        Test: El número de confirmación debe ser único
        """
        Donation.objects.create(
            amount=Decimal('1000.00'),
            campaign=self.campaign,
            donor=self.user,
            payment_method='sinpe_movil',
            confirmation_number='DON-UNIQUE001',
            confirmation_email='test@test.com'
        )
        
        # Intentar crear otra donación con el mismo confirmation_number
        from django.db import IntegrityError
        with self.assertRaises(IntegrityError):
            Donation.objects.create(
                amount=Decimal('2000.00'),
                campaign=self.campaign,
                donor=self.user,
                payment_method='bank_transfer_bac',
                confirmation_number='DON-UNIQUE001',  # Duplicado
                confirmation_email='test2@test.com'
            )

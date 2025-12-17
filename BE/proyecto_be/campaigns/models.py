from django.db import models

# Create your models here.
class Campaign(models.Model):
    # ============================================================
    # CAMPOS BÁSICOS
    # ============================================================
    name = models.CharField(max_length=100)
    description = models.TextField()
    short_description = models.CharField(max_length=200, blank=True, null=True)
    slogan = models.CharField(max_length=255, blank=True, null=True)
    story = models.TextField(blank=True, null=True)
    
    # ============================================================
    # CAMPOS DE FECHAS Y ESTADO
    # ============================================================
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # ============================================================
    # CAMPOS FINANCIEROS
    # ============================================================
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # ============================================================
    # CAMPOS DE UBICACIÓN Y CATEGORÍA
    # ============================================================
    location = models.CharField(max_length=255)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    
    # ============================================================
    # CAMPOS DE CONTACTO
    # ============================================================
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    
    # ============================================================
    # CAMPOS ADICIONALES
    # ============================================================
    CAMPAIGN_STATUS = (
        ('active', 'Active'),
        ('detained', 'Detained'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending')
    )
    permissions = models.TextField(blank=True, null=True)
    campaign_status = models.CharField(max_length=20, choices=CAMPAIGN_STATUS, default='pending')
    
    # ============================================================
    # RELACIONES
    # ============================================================
    creator = models.ForeignKey('users.User', on_delete=models.CASCADE)

    # ============================================================
    # IMAGEN PRINCIPAL / PORTADA
    # ============================================================
    main_image = models.URLField(blank=True, null=True)
    
    # ============================================================
    # PDF
    # ============================================================
    pdf_documents = models.JSONField(blank=True, null=True)
    
    # ============================================================
    # METAS POR SECCIÓN DEL PROYECTO
    # ============================================================
    # Formato: [{"name": "Mano de obra", "goal": 50000}, ...]
    project_sections = models.JSONField(blank=True, null=True)
    
    # ============================================================
    # COMENTARIO DEL ADMINISTRADOR
    # ============================================================
    # Razón por la cual se aprobó, rechazó, detuvo, etc.
    admin_comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class MediaContent(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    media_file = models.FileField(upload_to='media/')
    media_type = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.media_type} for {self.campaign.name}"

class Donation(models.Model):
    PAYMENT_CHOICES = [
        ('sinpe_movil', 'SINPE Móvil'),
        ('bank_transfer_bcr', 'Transferencia Bancaria - BCR'),
        ('bank_transfer_bn', 'Transferencia Bancaria - Banco Nacional'),
        ('bank_transfer_bac', 'Transferencia Bancaria - BAC'),
        ('bank_transfer_other', 'Transferencia Bancaria - Otro Banco'),
    ]
    
    DONATION_STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donated_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(blank=True, null=True)
    anonymous = models.BooleanField(default=False)
    payment_method = models.CharField(choices=PAYMENT_CHOICES, max_length=50)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    donor = models.ForeignKey('users.User', on_delete=models.CASCADE)
    confirmation_number = models.CharField(max_length=100, unique=True)
    confirmation_email = models.EmailField()
    
    # ============================================================
    # COMPROBANTE DE PAGO (PROOF OF PAYMENT)
    # ============================================================
    proof_of_payment_url = models.URLField(blank=True, null=True, help_text="URL de Cloudinary del comprobante de pago")
    proof_of_payment_description = models.TextField(blank=True, null=True, help_text="Descripción del comprobante de pago (referencia, número de transacción, etc.)")
    proof_of_payment_name = models.CharField(max_length=255, blank=True, null=True, help_text="Nombre de archivo del comprobante de pago")
    
    # ============================================================
    # ESTADO DE LA DONACIÓN
    # ============================================================
    donation_status = models.CharField(max_length=20, choices=DONATION_STATUS, default='pending', help_text="Estado de aprobación de la donación")
    approved_at = models.DateTimeField(blank=True, null=True, help_text="Fecha de aprobación")
    approved_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, blank=True, null=True, related_name='approved_donations', help_text="Admin que aprobó la donación")
    rejection_reason = models.TextField(blank=True, null=True, help_text="Motivo del rechazo")

    def __str__(self):
        return f"Donation of {self.amount} by {self.donor.username} to {self.campaign.name}"


class UserReport(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('reviewed', 'Reviewed'),
        ('dismissed', 'Dismissed'),
    ]

    REASONS = [
        ('spam', 'Spam o contenido no deseado'),
        ('fraud', 'Fraude o estafa'),
        ('abuse', 'Acoso o abuso'),
        ('inappropriate', 'Contenido inapropiado'),
        ('other', 'Otro'),
    ]

    reporter = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name='reports_made')
    reported_user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='reports_received', null=True, blank=True)
    campaign = models.ForeignKey('Campaign', on_delete=models.SET_NULL, null=True, blank=True)
    donation = models.ForeignKey('Donation', on_delete=models.SET_NULL, null=True, blank=True)
    reason = models.CharField(max_length=20, choices=REASONS)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Report {self.id} - {self.get_reason_display()}"


    

   
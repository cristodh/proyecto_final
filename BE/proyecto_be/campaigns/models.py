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
    # PDF
    # ============================================================
    pdf_documents = models.JSONField(blank=True, null=True)

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
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer'),
        ('sinpe_movil', 'SINPE Movil'),
        ('other', 'Other'),
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

    def __str__(self):
        return f"Donation of {self.amount} by {self.donor.username} to {self.campaign.name}"


    

   
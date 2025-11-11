from django.db import models

# Create your models here.
class Campaign(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=255)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    creator = models.ForeignKey('users.User', on_delete=models.CASCADE)

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


    

   
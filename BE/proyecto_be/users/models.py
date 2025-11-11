from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    address = models.CharField(max_length=255,null=False)
    phone_number = models.IntegerField(null=False)
    role = models.ForeignKey("Role",on_delete=models.CASCADE)
    nationality = models.ForeignKey("Nationality",on_delete=models.CASCADE)

    def __str__(self):
        return self.username

class Role(models.Model):
    ROLE_CHOICES = (
        ("Contributor","CONTRIBUTOR"),
        ('Admin','ADMIN'),
        ('CampaignManager','CAMPAIGNMANAGER'),
        ('User','USER')
        )
    role = models.CharField(choices=ROLE_CHOICES,max_length=20)

    def __str__(self):
        return self.role

class Nationality(models.Model):
    nationality = models.CharField(max_length=50)

    def __str__(self):
        return self.nationality

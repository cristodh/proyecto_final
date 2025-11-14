from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    GENDER_CHOICES = (
        ("Male","MALE"),
        ("Female","FEMALE"),
        ("Other","OTHER"),
        ("Prefer not to say","PREFER_NOT_TO_SAY"),
    )
    address = models.CharField(max_length=255,null=False)
    phone_number = models.IntegerField(null=False)
    date_of_birth = models.DateField(null=False)
    goverment_ID = models.CharField(max_length=20,null=False)
    gender = models.CharField(max_length=10,null=False)
    role = models.ForeignKey("Role",on_delete=models.CASCADE)
    nationality = models.ForeignKey("Nationality",on_delete=models.CASCADE)

    def __str__(self):
        return self.username

class Key_interests(models.Model):
    INTEREST_CHOICES = (
        ("Environment","ENVIRONMENT"), 
        ("Education","EDUCATION"), 
        ("Health","HEALTH"), 
        ("Animal Welfare","ANIMAL_WELFARE"), 
        ("Arts and Culture","ARTS_AND_CULTURE"), 
        ("Community Development","COMMUNITY_DEVELOPMENT"),
        ("Science and Technology","SCIENCE_AND_TECHNOLOGY"),
        ("Sports and Recreation","SPORTS_AND_RECREATION"),
        ("Other","OTHER") 
    )
    interest = models.CharField(choices=INTEREST_CHOICES,max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='key_interests')

    def __str__(self):
        return self.interest

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

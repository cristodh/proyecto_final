from django.db import models

class Organization(models.Model):
    ORGANIZATION_CHOICES = (
        ('ONG','ONG'),
        ('Foundation','FOUNDATION'),
        ('Social Enterprise','SOCIAL_ENTERPRISE'),
        ('Cooperative','COOPERATIVE'),
        ('Other','OTHER')
    )
    FOCUS_AREA_CHOICES = (
        ("Education","EDUCATION"),
        ("Health","HEALTH"),
        ("Environment","ENVIRONMENT"),
        ("Community Development","COMMUNITY_DEVELOPMENT"),
        ("Technology","TECHNOLOGY"),
        ("Arts and Culture","ARTS_AND_CULTURE"),
        ("Other","OTHER")
    )
        
    organization_name = models.CharField(max_length=255, null=False)
    organization_type = models.CharField(max_length=20, choices=ORGANIZATION_CHOICES, null=False)
    legal_entity_number = models.CharField(max_length=50, null=False)
    website = models.URLField(max_length=200, null=True, blank=True)
    focus_area = models.CharField(max_length=30, choices=FOCUS_AREA_CHOICES, null=False)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='organizations')
    
from django.db import models

class Organization(models.Model):

    ORGANIZATION_CHOICES = (
        ('ONG', 'ONG'),
        ('Fundación', 'Fundación'),
        ('Empresa Social', 'Empresa Social'),
        ('Cooperativa', 'Cooperativa'),
        ('Otra', 'Otra'),
    )

    FOCUS_AREA_CHOICES = (
        ('Educación', 'Educación'),
        ('Salud', 'Salud'),
        ('Medio Ambiente', 'Medio Ambiente'),
        ('Desarrollo Comunitario', 'Desarrollo Comunitario'),
        ('Tecnología', 'Tecnología'),
        ('Arte y Cultura', 'Arte y Cultura'),
        ('Otra', 'Otra'),
    )

    PROVINCE_CHOICES = (
        ('San José', 'San José'),
        ('Alajuela', 'Alajuela'),
        ('Cartago', 'Cartago'),
        ('Heredia', 'Heredia'),
        ('Guanacaste', 'Guanacaste'),
        ('Puntarenas', 'Puntarenas'),
        ('Limón', 'Limón'),
    )
    #  RELACIÓN CON USUARIO (manager_id)
    manager = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name='organizations'
    )

    #  INFORMACIÓN PRINCIPAL
    organization_name = models.CharField(max_length=255)
    organization_type = models.CharField(
        max_length=50, choices=ORGANIZATION_CHOICES)
    organization_type_other = models.CharField(
        max_length=100, null=True, blank=True
    )

    tax_id = models.CharField(max_length=10)  # Cédula jurídica CR
    website = models.URLField(max_length=200, null=True, blank=True)

    experience_years = models.CharField(max_length=20)
    focus_area = models.CharField(max_length=50, choices=FOCUS_AREA_CHOICES)

    #  REPRESENTANTE LEGAL
    legal_representative = models.CharField(max_length=255)
    legal_rep_id = models.CharField(max_length=20)

    #  CONTACTO
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    #  UBICACIÓN
    province = models.CharField(max_length=100, choices=PROVINCE_CHOICES)
    canton = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    address = models.TextField()

    #  DESCRIPCIÓN (OPCIONAL)
    description = models.TextField(null=True, blank=True)

    # TIMESTAMPS OPCIONALES ÚTILES
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.organization_name

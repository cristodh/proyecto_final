# Auto-created merge migration to resolve multiple leaf nodes
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0010_donation_approved_at_donation_approved_by_and_more'),
        ('campaigns', '0009_add_proof_of_payment_name_to_donation'),
    ]

    operations = [
        # This merge migration has no operations; it just resolves the graph
    ]

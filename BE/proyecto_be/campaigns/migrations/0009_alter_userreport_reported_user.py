from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0008_campaign_main_image'),
        ('users', '0010_user_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userreport',
            name='reported_user',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='reports_received',
                to='users.user'
            ),
        ),
    ]

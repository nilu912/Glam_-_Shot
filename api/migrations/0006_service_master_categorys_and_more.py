# Generated by Django 5.0.1 on 2024-04-21 23:01

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_salonaddress_alter_salon_salon_address_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service_Master_Categorys',
            fields=[
                ('categorys_id', models.IntegerField(default=api.models.generate_unique_service_id, primary_key=True, serialize=False)),
                ('categorys', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='services_master',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.service_master_categorys'),
        ),
        migrations.CreateModel(
            name='Service_Master_Categorys_Types',
            fields=[
                ('category_types_id', models.IntegerField(default=api.models.generate_unique_service_id, primary_key=True, serialize=False)),
                ('category_types', models.CharField(max_length=50)),
                ('categorys_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.service_master_categorys')),
            ],
        ),
        migrations.AlterField(
            model_name='services_master',
            name='typeofservice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.service_master_categorys_types'),
        ),
    ]
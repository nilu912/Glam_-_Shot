# Generated by Django 5.0.1 on 2024-04-16 09:31

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_address_salon_salon_address_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='SalonAddress',
            fields=[
                ('salon_address_id', models.IntegerField(default=api.models.generate_unique_s_address_id, primary_key=True, serialize=False)),
                ('address', models.CharField(max_length=100)),
                ('pincode', models.IntegerField()),
                ('city_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cities')),
                ('state_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.states')),
            ],
        ),
        migrations.AlterField(
            model_name='salon',
            name='salon_address_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.salonaddress'),
        ),
    ]
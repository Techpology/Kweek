# Generated by Django 4.0.5 on 2022-12-29 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0004_alter_customer_activeorders'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='favorites',
            field=models.TextField(default='[]'),
        ),
    ]

# Generated by Django 4.1.4 on 2022-12-25 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0003_customer_activeorders_customer_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='activeOrders',
            field=models.TextField(default='[]'),
        ),
    ]

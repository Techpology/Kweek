# Generated by Django 4.0.5 on 2022-12-23 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='banner',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='store',
            name='pfp',
            field=models.TextField(default=''),
        ),
    ]
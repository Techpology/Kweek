# Generated by Django 4.0.5 on 2022-12-21 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_product_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.IntegerField(default=0),
        ),
    ]
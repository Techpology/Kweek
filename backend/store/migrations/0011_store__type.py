# Generated by Django 4.0.5 on 2023-01-06 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='_type',
            field=models.IntegerField(default=0),
        ),
    ]

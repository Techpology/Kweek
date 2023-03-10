# Generated by Django 4.0.5 on 2022-12-17 16:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='isStore',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='customer',
            name='store',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.store'),
        ),
    ]

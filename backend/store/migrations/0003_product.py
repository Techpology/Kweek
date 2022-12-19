# Generated by Django 4.0.5 on 2022-12-19 22:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_store_categories'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visible', models.IntegerField(default=0)),
                ('name', models.TextField(default='')),
                ('description', models.TextField(default='')),
                ('ean', models.TextField(default='', null=True)),
                ('unit', models.TextField(default='')),
                ('price', models.FloatField(default=0.0)),
                ('store', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.store')),
            ],
        ),
    ]

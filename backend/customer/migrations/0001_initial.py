# Generated by Django 4.0.5 on 2022-12-17 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(default='')),
                ('email', models.TextField(default='')),
                ('password', models.TextField(default='')),
                ('city', models.TextField(default='')),
                ('region', models.TextField(default='')),
            ],
        ),
    ]

# Generated by Django 4.0.5 on 2022-12-25 04:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0003_customer_activeorders_customer_cart'),
        ('store', '0007_store_city_alter_store_categories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='city',
            field=models.TextField(default=''),
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderId', models.TextField(default='')),
                ('price', models.FloatField(default=0.0)),
                ('products', models.TextField(default='[]')),
                ('isActive', models.BooleanField(default=True)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='customer.customer')),
                ('store', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.store')),
            ],
        ),
    ]

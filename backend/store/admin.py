from django.contrib import admin
from store.models import Store
from store.models import Product
from store.models import Order

admin.site.register(Store)
admin.site.register(Product)
admin.site.register(Order)

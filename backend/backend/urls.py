"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.http import HttpResponse

# Customer
from customer.views import create_account
from customer.views import signIn_account
from customer.views import signOut_account
from customer.views import getSession

from customer.views import get_store
from customer.views import get_store_category_products

# Store
from store.views import get_store_details
from store.views import set_store_details
from store.views import get_store_categories
from store.views import create_product_category
from store.views import delete_product_category
from store.views import edit_product_category

from store.views import create_product
from store.views import get_products
from store.views import del_product
from store.views import edit_product

from store.views import set_pfp
from store.views import set_banner

urlpatterns = [
    path('admin/', admin.site.urls),

    # Customer
    path("customer/create/", create_account),
    path("customer/signin/", signIn_account),
    path("customer/signout", signOut_account),
    path("customer/get/session", getSession),
    
    path("customer/get/store/", get_store),
    path("customer/get/store/category/products/", get_store_category_products),

    # Store
    path("store/details", get_store_details),
    path("store/set/details", set_store_details),

    path("store/get/categories", get_store_categories),
    path("store/add/category/", create_product_category),
    path("store/del/category/", delete_product_category),
    path("store/edit/category/", edit_product_category),

    path("store/set/product/", create_product),
    path("store/get/products", get_products),
    path("store/del/product/", del_product),
    path("store/edit/product/", edit_product),
    
    path("store/set/pfp/", set_pfp),
    path("store/set/banner/", set_banner),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

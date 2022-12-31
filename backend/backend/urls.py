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
from customer.views import get_stores_at_location

from customer.views import add_to_cart
from customer.views import get_cart_prods
from customer.views import del_cart
from customer.views import clear_cart
from customer.views import post_order
from customer.views import edit_cart_amt
from customer.views import rem_cart
from customer.views import customer_get_active_orders
from customer.views import setFave # _stores
from customer.views import get_fave_stores
from customer.views import get_posts
from customer.views import like_post

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

from store.views import get_active_orders
from store.views import get_order_prods
from store.views import edit_order
from store.views import order_done

from store.views import create_post
from store.views import get_store_posts

urlpatterns = [
    path('admin/', admin.site.urls),

    # Customer
    path("customer/create/", create_account),
    path("customer/signin/", signIn_account),
    path("customer/signout", signOut_account),
    path("customer/get/session", getSession),
    
    path("customer/get/store/", get_store),
    path("customer/get/store/category/products/", get_store_category_products),
    path("customer/get/stores/at/location", get_stores_at_location),
    
    path("customer/add/cart/", add_to_cart),
    path("customer/get/cart/products/", get_cart_prods),
    path("customer/del/cart/", del_cart),
    path("customer/clear/cart", clear_cart),
    path("customer/post/order/", post_order),
    path("customer/edit/cart/", edit_cart_amt),
    path("customer/rem/cart/", rem_cart),
    path("customer/get/active", customer_get_active_orders),
    
    path("customer/set/fave/", setFave),
    path("customer/get/fave", get_fave_stores),

    path("customer/get/posts", get_posts),
    path("customer/like/post/", like_post),

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
    
    path("store/get/active_orders", get_active_orders),
    path("store/get/order/products/", get_order_prods),
    path("store/edit/order/products/", edit_order),
    path("store/order/done/", order_done),
    
    path("store/set/post/", create_post),
    path("store/get/post/", get_store_posts),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.db import models
from store.models import Store

class Customer(models.Model):
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)
	password = models.TextField(default="", null=False)

	city = models.TextField(default="", null=False)
	region = models.TextField(default="", null=False)

	# Push notifications
	expoNotificationToken = models.TextField(default="", null=False)

	# Store relation
	isStore  = models.IntegerField(default=0, null=False)
	store = models.ForeignKey(Store, on_delete=models.SET_NULL, blank=True, null=True)
	favorites = models.TextField(default="[]", null=False)
	likedPosts = models.TextField(default="[]", null=False)

	# Orders
	cart = models.TextField(default="{}", null=False)
	activeOrders = models.TextField(default="[]", null=False)


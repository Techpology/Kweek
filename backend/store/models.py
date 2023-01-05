from django.db import models
import json

class Store(models.Model):
	_type = models.IntegerField(default=0, null=False)		# [livsmedel, restaurant, clothes, electronics, Entertainment]
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)
	pfp = models.TextField(default="", null=False)
	banner = models.TextField(default="", null=False)

	Address = models.TextField(default="", null=False)
	phoneNumber = models.TextField(default="", null=False)
	city = models.TextField(default="", null=False)

	# Products relation
	categories = models.TextField(default=json.dumps(
		{0: "Frozen food", 1: "Canned food", 2: "Vegetables", 3: "other"}
	).replace("'",'"'), null=False)

	# Statistics
	fave = models.IntegerField(default=0, null=False)

class Product(models.Model):
	visible = models.IntegerField(default=0, null=False)
	name = models.TextField(default="", null=False)
	category = models.IntegerField(default=0, null=False)
	description = models.TextField(default="", null=False)
	ean = models.TextField(default="", null=True)
	unit = models.TextField(default="", null=False)
	price = models.FloatField(default=0.0, null=False)
	img = models.TextField(default="", null=False)
	store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True)

class Order(models.Model):
	customer = models.ForeignKey("customer.Customer", on_delete=models.SET_NULL, null=True)
	store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True)
	orderId = models.TextField(default="", null=False)
	price = models.FloatField(default=0.0, null=False)
	products = models.TextField(default="[]", null=False)
	isActive = models.BooleanField(default=True, null=False)

class Post(models.Model):
	store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True)
	title = models.TextField(default="", null=False)
	desc = models.TextField(default="", null=False)
	img = models.TextField(default="", null=False)
	city = models.TextField(default="", null=False)
	likes = models.IntegerField(default=0, null=False)
	created = models.DateTimeField(auto_now_add=True)

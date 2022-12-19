from django.db import models
import json

class Store(models.Model):
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)

	Address = models.TextField(default="", null=False)
	phoneNumber = models.TextField(default="", null=False)

	# Products relation
	categories = models.TextField(default=json.dumps(
		{0: "Frozen", 1: "Canned", 2: "Vegetables"}
	).replace("'",'"'), null=False)

	# Orders relation
	# Forum relation

class Product(models.Model):
	visible = models.IntegerField(default=0, null=False)
	name = models.TextField(default="", null=False)
	description = models.TextField(default="", null=False)
	ean = models.TextField(default="", null=True)
	unit = models.TextField(default="", null=False)
	price = models.FloatField(default=0.0, null=False)
	store = models.ForeignKey(Store, on_delete=models.SET_NULL)

from django.db import models

class Store(models.Model):
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)

	Address = models.TextField(default="", null=False)
	phoneNumber = models.TextField(default="", null=False)

	# Products relation
	categories = {0: "Frozen", 1: "Canned", 2: "Vegetables"}
	# Orders relation
	# Forum relation
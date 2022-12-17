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
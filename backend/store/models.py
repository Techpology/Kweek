from django.db import models

class Store(models.Model):
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)

	Address = models.TextField(default="", null=False)
	phoneNumber = models.TextField(default="", null=False)

	# Products relation
	# Orders relation
	# Forum relation
from django.db import models

class Customer(models.Model):
	name = models.TextField(default="", null=False)
	email = models.TextField(default="", null=False)
	password = models.TextField(default="", null=False)

	city = models.TextField(default="", null=False)
	region = models.TextField(default="", null=False)

	# Store relation
	isStore  = models.IntegerField(default=0, null=False)

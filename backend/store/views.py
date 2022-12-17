##########################################
'''
	Store:
		The store is a binding to a customer account
		which is not free. It allows uploading products,
		uploading images, and recieving orders amongst other features.
		The base functionality for a store is:

		- Upload images for pfp and banner		[ ]
		- Manage store details					[ ]
		- Get store details						[ ]
		- Upload and manage forum posts			[ ]
		- Create categories						[ ]
		- Create products						[ ]
		- Get active orders						[ ]
		- Get order history						[ ]
		
		Other functionality that the store
		does not have access to but the app needs
		to handle the store.
'''
##########################################

# Functions/Classes
from django.http import HttpResponse
from utils.views import requestHandler
import json

# Models
from store.models import Store
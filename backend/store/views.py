##########################################
'''
	Store:
		The store is a binding to a customer account
		which is not free. It allows uploading products,
		uploading images, and recieving orders amongst other features.
		The base functionality for a store is:

		- Upload images for pfp and banner		[ ]
		- Manage store details					[*]
		- Get store details						[*]
		- Upload and manage forum posts			[ ]
		- Create categories						[*]
		- Get categories						[*]
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
from customer.models import Customer

def get_store_details(request):
	if(request.method == "GET"):
		_email = request.session["account"]["email"]
		_store = Customer.objects.filter(email=_email)[0].store

		_details = {
			"name": _store.name,
			"email": _store.email,
			"Address": _store.Address,
			"phoneNumber": _store.phoneNumber
		}
		ret = json.dumps(_details).replace("'",'"')

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def set_store_details(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)
		
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Update data
		_store = query[0].store

		_store.name = str(req["name"])
		_store.email = str(req["email"])
		_store.Address = str(req["Address"])
		_store.phoneNumber = str(req["phoneNumber"])
		_store.save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_store_categories(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Get data
		_store = query[0].store
		ret = json.dumps(_store.categories).replace("'", '"')

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def create_product_category(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Add category
		_store = query[0].store
		_categories = _store.categories
		_categories[len(_categories) - 1] = req["name"]

		_store.categories = _categories
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)
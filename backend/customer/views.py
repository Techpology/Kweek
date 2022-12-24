##########################################
'''
	Customer:
		The customer will be the free user
		who shops from our merchants.
		The base functionality for a customer is:

		- Create account		[*]
		- Signin				[*]
		- forgot password		[ ]
		- Order					[ ]
		- Add to favorites		[ ]
		- Signout				[*]
		
		Other functionality that the customer
		does not have access to but the app needs
		to handle the customer are sessions.
'''
##########################################

# Functions/Classes
from django.http import HttpResponse
from utils.views import requestHandler
import json

# Models
from customer.models import Customer
from store.models import Store

def create_account(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# User info
		_name		= req["name"]
		_email		= req["email"]
		_password	= req["password"]
		
		_city		= req["city"]
		_region		= req["region"]

		# Processing
		if(len(Customer.objects.filter(email=_email)) > 0):
			return HttpResponse(
				"An account with the provided email has already been registered",
				status=500
				)
		
		_enc_password = requestHandler.encrypt(_password)

		# Database
		new_customer = Customer(
			name = _name,
			email = _email,
			password = _enc_password,
			city = _city,
			region = _region,
			isStore = 0
		).save()

		# Session
		_session = {
			"name": _name,
			"email": _email,
			"city": _city,
			"region": _region
		}

		request.session["account"] = _session

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def signIn_account(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# User info
		_email		= req["email"]
		_password	= req["password"]

		# Processing
		query = Customer.objects.filter(email=_email)
		if(len(query) == 0):
			return HttpResponse(
				"The provided email or password are incorrect",
				status=500
				)
		
		_verify_password = requestHandler.verify(_password, query[0].password)
		if(not _verify_password):
			return HttpResponse(
				"The provided email or password are incorrect",
				status=500
				)
		
		# Session
		_session = {
				"store_id": query[0].store.id,
				"store_name": query[0].store.name,
				"store_address": query[0].store.Address,
				"store_pfp": query[0].store.pfp,
				"store_banner": query[0].store.banner,
				"name": query[0].name,
				"email": _email,
				"city": query[0].city,
				"region": query[0].region,
				"store": query[0].isStore
			}

		request.session["account"] = _session
		ret = json.dumps(request.session["account"]).replace("'", '"')

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def signOut_account(request):
	if(request.method == "GET"):
		del request.session["account"]
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def getSession(request):
	if(request.method == "GET"):
		if("account" not in request.session): return HttpResponse("0", status=200)
		
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		_store = query[0].store
		request.session["account"]["store_pfp"] = _store.pfp
		request.session["account"]["store_banner"] = _store.banner

		ret = json.dumps(request.session["account"]).replace("'",'"')
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def get_store(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		_store = Store.objects.filter(id=req["id"])[0]
		_s = _store.__dict__
		
		print(_store.categories.replace('"', "'"))
		_ret = {
			"name": _store.name,
			"address": _store.Address,
			"banner": _store.banner,
			"pfp": _store.pfp,
			"phone": _store.phoneNumber,
			"categories": json.dumps(list(json.loads(_store.categories).values()))
		}

		return HttpResponse(json.dumps(_ret), status=200)
	return HttpResponse("Invalid request", status=409)

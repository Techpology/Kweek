##########################################
'''
	Customer:
		The customer will be the free user
		who shops from our merchants.
		The base functionality for a customer is:

		- Create account		[*]
		- Signin				[ ]
		- forgot password		[ ]
		- Order					[ ]
		- Add to favorites		[ ]
		- Logout				[ ]
		
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
			region = _region
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
			"name": query[0].name,
			"email": _email,
			"city": query[0].city,
			"region": query[0].region
		}

		request.session["account"] = _session
		ret = json.dumps(request.session["account"]).replace("'", '"')

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)
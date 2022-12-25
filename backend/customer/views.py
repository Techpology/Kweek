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
import datetime
import random
import json

# Models
from customer.models import Customer
from store.models import Store
from store.models import Product
from store.models import Order

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
				"store": query[0].isStore,
				"cart": query[0].cart
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
		request.session["account"]["cart"] = query[0].cart

		ret = json.dumps(request.session["account"]).replace("'",'"')
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def get_store(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		_store = Store.objects.filter(id=req["id"])[0]
		
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

def get_store_category_products(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		_store = Store.objects.filter(id=req["id"])[0]

		# Processing
		categs = list(json.loads(_store.categories).values())
		index = -1
		for i in range(len(categs)):
			if(req["ind"] == categs[i]):
				index = i
				break
		if(index == -1): return HttpResponse("Invalid category", status= 500)

		prods = Product.objects.filter(store=_store, category=index).all().values()
		ret = json.dumps(list(prods))

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def get_stores_at_location(request):
	if(request.method == "GET"):
		_city = request.session["account"]["city"]
		_stores = Store.objects.filter(city=_city).all().values()
		ret = json.dumps(list(_stores))
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def add_to_cart(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store_name = req["storeName"]
		_prod = req["product"] # {"id": 0, "amt": 2}

		_cart = json.loads(query[0].cart)
		if(_store_name in _cart):
			_cart[_store_name].append(_prod)
		else:
			_cart[_store_name] = [_prod]
		query[0].cart = json.dumps(_cart).replace("'",'"')

		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_cart_prods(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		print(query[0].cart)
		_cart = json.loads(query[0].cart)
		_store_name = req["storeName"]
		_prods = _cart[_store_name]
		print(_prods)

		_query_prods = []
		for i in _prods:
			x = Product.objects.filter(id=i["id"]).all().values()
			toAppend = list(x)[0]
			toAppend["amt"] = i["amt"]
			print(toAppend)
			_query_prods.append(toAppend)
		print(json.dumps(_query_prods))

		return HttpResponse(json.dumps(_query_prods), status=200)
	return HttpResponse("Invalid request", status=409)

def del_cart(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store = req["storeName"]
		del query[0].cart[_store]
		query[0].save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def clear_cart(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		query[0].cart = "{}"
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def post_order(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store_name = req["storeName"]
		_store = Store.objects.filter(name=_store_name)[0]
		_prods = query[0].cart[_store_name]
		if(len(_prods) == 0): return HttpResponse("No products where placed in the order", status=500)

		_cart = query[0].cart
		current_date = datetime.date.today()
		current_time = datetime.time()
		current_date = current_date.replace("-", random.randint(0,9))
		_store_name = _store_name[0:random.randint(0, len(_store_name))]
		_id = f"{_store_name}{current_date}{current_time[0:5]}-{query[0].name[0:1]}"

		_price = 0
		for i in _prods:
			_price += int(Product.objects.filter(id=i)[0].price)
		
		_newOrder = Order(
			customer= query[0],
			store= _store,
			orderId= _id,
			price= _price,
			products= _prods,
			isActive= True
		).save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

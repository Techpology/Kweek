##########################################
'''
	Customer:
		The customer will be the free user
		who shops from our merchants.
		The base functionality for a customer is:

		- Create account		[*]
		- Signin				[*]
		- forgot password		[ ]
		- Order					[*]
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
from store.models import Post

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
		print(query[0])
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
		if(query[0].isStore == 1):
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
		else:
			_session ={
				"name": query[0].name,
				"email": _email,
				"city": query[0].city,
				"region": query[0].region,
				"store": query[0].isStore,
				"cart": query[0].cart
			}
		request.session["account"] = _session
		ret = json.dumps(request.session["account"]).replace("'", '"')
		print(ret)

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def signOut_account(request):
	if(request.method == "GET"):
		del request.session["account"]
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def getSession(request):
	print("getting session")
	if(request.method == "GET"):
		if("account" not in request.session): return HttpResponse("0", status=200)
		print("account in session")
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		if(query[0].isStore == 1):
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

		prods = Product.objects.filter(store=_store, category=index, visible=1).all().values()
		ret = json.dumps(list(prods))

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def add_to_cart(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store_name = req["storeName"]
		_prod = req["product"] # {"id": 0, "amt": 2}
		_prod["check"] = False

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
		query = Customer.objects.filter(email=_email)

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
		query = Customer.objects.filter(email=_email)

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
		query = Customer.objects.filter(email=_email)

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
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		print(req)
		_store_name = req["storeName"]
		_store = Store.objects.filter(name=_store_name)[0]
		_cart = json.loads(query[0].cart.replace("'",'"'))
		_prods = _cart[_store_name]
		if(len(_prods) == 0): return HttpResponse("No products where placed in the order", status=500)

		current_date = str(datetime.date.today())
		current_time = str(datetime.time())
		current_date = current_date.replace("-", str(random.randint(0,9)))
		_store_name = _store_name[0:random.randint(0, len(_store_name))]
		_id = f"{_store_name}{current_date}{current_time[0:5]}-{query[0].name[0:1]}"

		_price = 0
		for i in _prods:
			_price += float(Product.objects.filter(id=i["id"])[0].price) * int(i["amt"])
		
		_newOrder = Order(
			customer= query[0],
			store= _store,
			orderId= _id,
			price= _price,
			products= _prods,
			isActive= True
		).save()

		ao = json.loads(query[0].activeOrders)
		print(ao)
		ao.append({"order": _id, "store": req["storeName"]})
		query[0].activeOrders = json.dumps(ao)
		del _cart[req["storeName"]]
		query[0].cart = json.dumps(_cart).replace("'",'"')
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def edit_cart_amt(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store_name = req["storeName"]
		_key = req["key"]
		_amt = req["amt"]
		print(query[0].cart.replace("'",'"'))
		_cart = json.loads(query[0].cart.replace("'",'"'))

		_cart[_store_name][_key]["amt"] = _amt
		print(_cart)
		query[0].cart = json.dumps(_cart).replace("'",'"')
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def rem_cart(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		print(req)
		_store_name = req["storeName"]
		_key = int(req["key"])
		_cart = json.loads(query[0].cart.replace("'",'"'))

		del _cart[_store_name][_key]
		if(len(_cart[_store_name]) == 0):
			del _cart[_store_name]
		query[0].cart = json.dumps(_cart).replace("'",'"')
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def customer_get_active_orders(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		return HttpResponse(query[0].activeOrders, status=200)
	return HttpResponse("Invalid request", status=409)

def setFave(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store = Store.objects.filter(id=int(req["id"]))
		if(len(_store) == 0): return HttpResponse("Invalid store id", status=500)
		_store = _store[0]
		faves = json.loads(query[0].favorites)
		
		if(int(req["id"]) in faves):
			del faves[faves.index(int(req["id"]))]
			a = _store.fave
			a -= 1
			_store.fave = a
			_store.save()
		else:
			a = _store.fave
			a += 1
			_store.fave = a
			_store.save()
			faves.append(int(req["id"]))
		
		query[0].favorites = json.dumps(faves)
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_fave_stores(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		vals = []
		for i in json.loads(query[0].favorites):
			vals.append(Store.objects.filter(id = i).all().values()[0])
		ret = json.dumps(vals)
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def get_stores_at_location(request):
	if(request.method == "GET"):
		_city = request.session["account"]["city"]
		_stores = Store.objects.filter(city=_city).all().values()
		ret = json.dumps(list(_stores))
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def like_post(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		faves = json.loads(query[0].favorites)

		if(int(req["id"]) in faves):
			print("liked")
			faves.remove(int(req["id"]))
		else:
			faves.append(int(req["id"]))
		
		query[0].favorites = faves
		query[0].save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_posts(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_posts = Post.objects.filter(city=query[0].city).defer("created").all().values()
		_ret = json.dumps(list(_posts))

		return HttpResponse(_ret, status=200)
	return HttpResponse("Invalid request", status=409)

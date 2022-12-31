##########################################
'''
	Store:
		The store is a binding to a customer account
		which is not free. It allows uploading products,
		uploading images, and recieving orders amongst other features.
		The base functionality for a store is:

		- Upload images for pfp and banner		[*]
		- Manage store details					[*]
		- Get store details						[*]
		- Upload and manage forum posts			[ ]
		- Create categories						[*]
		- Get categories						[*]
		- Delete categories						[*]
		- Edit categories						[*]
		- Create products						[*]
		- Get products							[*]
		- Get active orders						[*]
		- Get order history						[ ]
		
		Other functionality that the store
		does not have access to but the app needs
		to handle the store.
'''
##########################################

# Functions/Classes
from django.http import HttpResponse
from utils.views import requestHandler
from utils.views import imageHandler
import json

# Models
from store.models import Store
from store.models import Product
from store.models import Order
from store.models import Post
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
		ret = json.dumps(list(json.loads(_store.categories).values()))
		print(ret)

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
		_categ = json.loads(_store.categories)
		_categories = list(json.loads(_store.categories))
		print(len(_categories))
		print(type(_categories))
		print(type(_categ))
		_categ[len(_categories)] = req["name"]
		print(_categ)

		_store.categories = json.dumps(_categ).replace("'",'"')
		_store.save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def delete_product_category(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Update data
		_store = query[0].store
		_categories = list(json.loads(_store.categories).values())
		print(_categories)
		print(type(_categories))
		del _categories[int(req["ind"])]
		
		temp = {}
		for i in range(len(_categories)):
			temp[i] = _categories[i]
		
		print(temp)
		_store.categories = json.dumps(temp).replace("'",'"')
		_store.save()
		
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def edit_product_category(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		_store = query[0].store
		_categories = json.loads(_store.categories)
		_categories[req["ind"]] = req["val"]
		print(req["val"])

		_store.categories = json.dumps(_categories).replace("'", '"')
		_store.save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def create_product(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		_store = query[0].store

		# Create product
		_newProd = Product(
			visible = req["visible"],
			name = req["name"],
			description = req["description"],
			ean = req["ean"],
			unit = req["unit"],
			category = req["category"],
			price = float(req["price"]),
			store = _store
		)
		
		if(req["img"] != None):
			if(len(Product.objects.values_list()) != 0):
				_n = str(Product.objects.last().id + 1)
				print(_n + '.' + req["ext"])
			else:
				_n = "0"
				print(_n + '.' + req["ext"])
			imageHandler.storeImage(req["img"], str(_store.id), _n + '.' + req["ext"])
			_newProd.img = f"media/{str(_store.id)}/{_n + '.' + req['ext']}"

		_newProd.save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_products(request):
	if(request.method == "GET"):
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		_store = query[0].store
		_prods = Product.objects.filter(store=_store).all().values()
		ret = json.dumps(list(_prods))
		print(ret)
		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def del_product(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)
		
		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		_store = query[0].store
		prod = Product.objects.filter(store=_store, id=req["id"])[0]
		imageHandler.delImage(prod.img)
		prod.delete()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def edit_product(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		_store = query[0].store
		_id = req["id"]
		
		_prod = Product.objects.filter(id=_id, store=_store)[0]
		_prod.visible = req["visible"]
		_prod.name = req["name"]
		_prod.description = req["description"]
		_prod.ean = req["ean"]
		_prod.unit = req["unit"]
		_prod.price = float(req["price"])
		_prod.category = int(req["category"])

		if(req["img"] != None):
			imageHandler.storeImage(req["img"], str(_store.id), str(_id) + '.' + req["ext"])
			_prod.img = "media/" + str(_store.id) + '/' + str(_id) + '.' + req["ext"]

		_prod.save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def set_pfp(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		_store = query[0].store

		# Image processing
		imageHandler.storeImage(req["img"], str(_store.id), f"pfp.{req['ext']}")
		_store.pfp = f"media/{str(_store.id)}/pfp.{req['ext']}"
		_store.save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def set_banner(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		_store = query[0].store

		# Image processing
		imageHandler.storeImage(req["img"], str(_store.id), f"banner.{req['ext']}")
		_store.banner = f"media/{str(_store.id)}/banner.{req['ext']}"
		_store.save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def get_active_orders(request):
	if(request.method == "GET"):
		
		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)

		_store = query[0].store

		# Processing
		_orders = Order.objects.filter(store=_store, isActive = 1).all().values()
		ret = json.dumps(list(_orders))

		return HttpResponse(ret, status=200)
	return HttpResponse("Invalid request", status=409)

def get_order_prods(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		print(req)
		a = req["products"].replace("'",'"')
		a = a.replace("False", "false")
		a = a.replace("True", "true")
		a = json.loads(a)
		print(a)


		_query_prods = []
		for i in a:
			x = Product.objects.filter(id=i["id"]).all().values()
			toAppend = list(x)[0]
			toAppend["amt"] = i["amt"]
			toAppend["check"] = i["check"]
			print(toAppend)
			_query_prods.append(toAppend)
		print(json.dumps(_query_prods))

		return HttpResponse(json.dumps(_query_prods), status=200)
	return HttpResponse("Invalid request", status=409)

def edit_order(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_key = req["id"]
		_prod_key = req["prodKey"]

		_prods = Order.objects.filter(id= int(_key)).all().values()
		a = _prods[0]["products"].replace("'",'"')
		a = a.replace("False", "false")
		a = a.replace("True", "true")
		a = json.loads(a)

		a[_prod_key]["check"] = not(a[_prod_key]["check"])
		_p = Order.objects.filter(id= int(_key))[0]
		_p.products = json.dumps(a)
		_p.save()


		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def order_done(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)
		a = Order.objects.filter(orderId=req["order"])[0]
		b = json.loads(a.customer.activeOrders)
		c = -1
		for i in range(len(b)):
			if(b[i]["order"] == req["order"]):
				c = i
				break
		del b[c]
		a.isActive = 0
		a.save()
		a.customer.activeOrders = b
		a.customer.save()
		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

def create_post(request):
	if(request.method == "POST"):
		req = requestHandler.extractRequest(request)

		# Verification
		_email = request.session["account"]["email"]
		query = Customer.objects.filter(email=_email, isStore=1)

		if(len(query) == 0):
			return HttpResponse("Unauthorized", status=403)
		
		# Processing
		_store = query[0].store
		_title = req["title"]
		_desc = req["desc"]
		_img = req["img"]

		_n = str(Order.objects.last().id + 1)
		imageHandler.storeImage(req["img"], str(_store.id) + "/posts/", _n + '.' + req["ext"])
		_img_path = f"media/{str(_store.id)}/posts/{_n + '.' + req['ext']}"

		_newOrder = Post(
			store = _store,
			title = _title,
			desc = _desc,
			img = _img
		).save()

		return HttpResponse(status=200)
	return HttpResponse("Invalid request", status=409)

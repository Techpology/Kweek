from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from django.http import HttpResponse
from django.conf import settings
from passlib.hash import argon2
import json
import base64
import os

class requestHandler:
    
    def extractRequest(_req):
        return json.loads(_req.body.decode('utf-8'))

    def encrypt(_x):
        return argon2.hash(_x)
    
    def verify(_x, _h):
        return argon2.verify(_x, _h)

class imageHandler:

    def storeImage(data, path, file):
        if(os.path.exists(f"media/{path}") == False):
            os.makedirs(f"media/{path}")
        
        with open(f"media/{path}/{file}", "wb") as f:
            f.write(base64.b64decode(data))
        
        return f"media/{path}/{file}"
    
    def delImage(path):
        try:
            os.remove(path)
            return True
        except:
            return False

class notificationsHandler:
    def sendPushMessage(token, message, extra=None):
        try:
            response = PushClient().publish(
                PushMessage(to=token, title=message, body=extra, display_in_foreground=True)
            )
        except PushServerError as exc:
            print(exc.message)
            return False
        print(response)
        try:
            response.validate_response()
        except DeviceNotRegisteredError:
            return False
        return True

sCountries = [
    "Sweden"
]

sCities = [
    "Norrköping"
]

def getSupportedCountries(request):
    if(request.method == "GET"):
        return HttpResponse(json.dumps(sCountries), status = 200)
    return HttpResponse("Invalid request", status=409)

def getSupportedCities(request):
    if(request.method == "GET"):
        return HttpResponse(json.dumps(sCities), status = 200)
    return HttpResponse("Invalid request", status=409)
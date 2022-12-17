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
            f.write(data)
        
        return f"media/{path}/{file}"

import requests
import os
from os import environ

#Temporary remove when its working and environment is set in compose
os.environ["NEXT_PUBLIC_API_URL"] = "HTTP://flaskapp:4000"

url = environ.get["NEXT_PUBLIC_API_URL"] + "/api/flask/guest/delete-guests"
response = requests.post(url)
print(response, flush=True)
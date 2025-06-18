import jwt
from datetime import datetime, timedelta

# Use the same secret and algorithm as your Flask app
SECRET_KEY = '343f018754c2dda5d2c5e771dd39f0b3d86ad369b5f31eb457f5bd973e206843'
ALGORITHM = 'HS256'

payload = {
    "sub": "0",  # developer user id, or whatever identity you want
    "exp": datetime.utcnow() + timedelta(days=30),  # expires in 30 days
    "name": "Developer"
}

token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
print(token)
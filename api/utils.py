# myapp/utils.py
import random
import string
from .models import Profiles,Customer,S_Admin,Salon,Schedule,Services_master,Appointments,UsersAddress,Salon_media
import jwt
from datetime import datetime, timedelta

# def generate_jwt_token(user):
#     # Define payload containing user information
#     payload = {
#         'user_id': user.user_id,
#         'email': user.email,  # Assuming p_id is the primary key of the Profiles model
#         # Add other user information as needed
#         'exp': datetime.utcnow() + timedelta(days=1)  # Token expiry time
#     }

#     # Generate JWT token
#     token = jwt.encode(payload, 'your_secret_key', algorithm='HS256')
#     return token

def generate_unique_p_id(length=6):
    while True:
        p_id = ''.join(random.choices(string.digits, k=length))
        if Profiles.objects.filter(p_id=p_id).count() == 0:
            break
    return p_id
def generate_unique_user_id(length=6):
    while True:
        user_id = ''.join(random.choices(string.digits, k=length))
        if Customer.objects.filter(user_id=user_id).count() == 0:
            break
    return user_id
def generate_unique_admin_id(length=6):
    while True:
        admin_id = ''.join(random.choices(string.digits, k=length))
        if S_Admin.objects.filter(admin_id=admin_id).count() == 0:
            break
    return admin_id
def generate_unique_salon_id(length=6):
    while True:
        salon_id = ''.join(random.choices(string.digits, k=length))
        if Salon.objects.filter(salon_id=salon_id).count() == 0:
            break
    return salon_id
def generate_unique_schedule_id(length=6):
    while True:
        schedule_id = ''.join(random.choices(string.digits, k=length))
        if Schedule.objects.filter(schedule_id=schedule_id).count() == 0:
            break
    return schedule_id
def generate_unique_service_id(length=6):
    while True:
        service_id = ''.join(random.choices(string.digits, k=length))
        if Services_master.objects.filter(service_id=service_id).count() == 0:
            break
    return service_id
def generate_unique_appointment_id(length=6):
    while True:
        app_id = ''.join(random.choices(string.digits, k=length))
        if Appointments.objects.filter(app_id=app_id).count() == 0:
            break
    return app_id
def generate_unique_address_id(length=6):
    while True:
        user_address_id = ''.join(random.choices(string.digits, k=length))
        if UsersAddress.objects.filter(user_address_id=user_address_id).count() == 0:
            break
    return user_address_id

def generate_unique_img_id(length=6):
    while True:
        img_id = ''.join(random.choices(string.digits, k=length))
        if Salon_media.objects.filter(img_id=img_id).count() == 0:
            break
    return img_id

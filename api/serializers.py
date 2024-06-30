from rest_framework import serializers
from .models import (
    MyUser,Profiles,Customer,S_Admin,
    Salon,Schedule,Appointments,Offer_master,
    Payment,Appointed_stylist,Payment,
    Services_master,Upi,Stylists,Card,Cash,
    Provided_services,Stylist_appointments,Stylists,
    Salon_media,States,Cities,UsersAddress,SalonAddress,
    Service_Master_Categorys,Service_Master_Categorys_Types
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyuserSerializer(serializers.Serializer):
    class Meta:
        model = MyUser
        fields = ('user_id', 'email')

class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
       model = Profiles
       fields = ('p_id','first_name','last_name','dob','gender','mob','email','user_address_id')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['user_id','password','p_id']
    
    def update(self, instance, validated_data):
        # Update the instance with the validated data
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.password = validated_data.get('password', instance.password)
        instance.p_id = validated_data.get('p_id', instance.p_id)
        instance.save()
        return instance

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = S_Admin
        fields = ['admin_id','password','p_id']
    
class SalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['salon_id','salon_password','admin_id','salon_name','salon_address_id','cust_gender']

class SalonMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon_media
        fields = ['img_id', 'salon_id', 'category', 'image']

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['schedule_id','salon_id','day','opening_time','closing_time','upcoming_holiday']

class StylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stylists
        fields = ['sty_id', 'p_id', 'expertice']

class ServicesMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services_master
        fields = ['service_id', 'salon_id', 'category', 'typeofservice', 'img', 'duration', 'charge']

class ProvidedServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provided_services
        fields = ['app_id', 'service_id', 'offer_id']

class OfferMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer_master
        fields = ['offer_id','salon_id', 'services_id', 'offer_name', 'offer_type', 'offer_date', 'offer_end', 'off_amm']

class AppointedStylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointed_stylist
        fields = ['sty_id', 'salon_id', 'service_id', 'charge_amm']

class StylistAppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stylist_appointments
        fields = ['sty_id', 'app_id', 'charge_amm']

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = ['app_id','salon_id', 'user_id', 'date_of_book', 'date_of_appointment', 'start_time', 'end_time', 'tot_duration', 'total_amm', 'canceled', 'cancellation_reasion', 'app_status', 'app_mode']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['pay_id','user_id', 'app_id', 'salon_id', 'payment_type', 'status', 'paid_am', 'pending_am', 'payment_date', 'mode']

class CashSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cash
        fields = ['cash_id', 'pay_id', 'amm']

class UpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upi
        fields = ['pay_id', 'upi_id', 'transaction_id', 'transaction_date', 'transaction_time']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['pay_id', 'card_no', 'hold_name', 'exp_date', 'cvv_no']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = user.user_id
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff

        return token
    
class LoginSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField()
    password = serializers.CharField()

class StatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = States
        fields = ['state_id','state_name']

class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = ['city_id','city_name','state_id']

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersAddress
        fields = ['user_address_id','address','pincode','city_id','state_id']

class SalonAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonAddress
        fields = ['salon_address_id','address','pincode','city_id','state_id']

class ServiceMasterCategorysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service_Master_Categorys
        fields = ['categorys_id','categorys']

class ServiceMasterCategorysTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service_Master_Categorys_Types
        fields = ['category_types_id','category_types','categorys_id']        
    
class SalonUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['salon_name', 'cust_gender']

class SalonAddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonAddress
        fields = ['address', 'pincode','city_id','state_id']

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ['first_name', 'last_name','dob','gender','mob','email']

class UserAddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersAddress
        fields = ['address', 'pincode','city_id','state_id']

class SalonImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon_media
        fields = ['image']

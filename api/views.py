from django.shortcuts import render
from rest_framework import generics, status
from django.http import JsonResponse, HttpResponse
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, views
from .serializers import ( MyuserSerializer, ProfilesSerializer, CustomerSerializer, AdminSerializer,
    SalonSerializer, ScheduleSerializer, AppointmentsSerializer, OfferMasterSerializer,
    PaymentSerializer, AppointedStylistSerializer, ServicesMasterSerializer, UpiSerializer,
    StylistsSerializer, CardSerializer, CashSerializer, ProvidedServicesSerializer,
    StylistAppointmentsSerializer,LoginSerializer,SalonMediaSerializer,StatesSerializer,
    CitiesSerializer,UserAddressSerializer,SalonAddressSerializer,ServiceMasterCategorysSerializer,
    ServiceMasterCategorysTypeSerializer,SalonUpdateSerializer,SalonAddressUpdateSerializer,
    ProfileUpdateSerializer,UserAddressUpdateSerializer,SalonImageUpdateSerializer)
from .models import (    MyUser,Profiles,Customer,S_Admin,
    Salon,Schedule,Appointments,Offer_master,
    Payment,Appointed_stylist,Payment,
    Services_master,Upi,Stylists,Card,Cash,
    Provided_services,Stylist_appointments,Stylists,
    Salon_media,States,Cities,UsersAddress,SalonAddress,
    Service_Master_Categorys,Service_Master_Categorys_Types
)
from rest_framework.views import APIView
from rest_framework.response import Response
import string
import random
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from .utils import (generate_unique_p_id, generate_unique_user_id, generate_unique_admin_id,
                    generate_unique_salon_id, generate_unique_schedule_id,generate_unique_appointment_id,
                    generate_unique_service_id,generate_unique_address_id,generate_unique_img_id)
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

class LoginApiView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            serializer = LoginSerializer(data = data)
            if serializer.is_valid():
                user_id = serializer.data['user_id']
                password = serializer.data['password']

                user = authenticate(user_id = user_id, password = password)

                if user is None:
                    return Response({
                        'status' : 400,
                        'message' : 'invalid password',
                        'data' : serializer.errors                
                    })
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })

            return Response({
                'status' : 400,
                'message' : 'something went wrong',
                'data' : serializer.errors                
            })
        except Exception as e:
            pass
# from .utils import generate_jwt_token

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(MyUser)

#         # Add custom claims
#         token['user_id'] = user.user_id
#         # ...

#         return token
# class MyTokkenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
    
def generate_unique_p_id_view(request):
    unique_p_id = generate_unique_p_id()
    return JsonResponse({'p_id': unique_p_id})
def generate_unique_user_id_view(request):
    unique_user_id = generate_unique_user_id()
    return JsonResponse({'user_id': unique_user_id})
def generate_unique_admin_id_view(request):
    unique_admin_id = generate_unique_admin_id()
    return JsonResponse({'admin_id': unique_admin_id})
def generate_unique_salon_id_view(request):
    unique_salon_id = generate_unique_salon_id()
    return JsonResponse({'salon_id': unique_salon_id})
def generate_unique_schedule_id_view(request):
    unique_schedule_id = generate_unique_schedule_id()
    return JsonResponse({'schedule_id': unique_schedule_id})
def generate_unique_appointments_id_view(request):
    unique_appointment_id = generate_unique_appointment_id()
    return JsonResponse({'appointment_id': unique_appointment_id})
def generate_unique_service_id_view(request):
    unique_service_id = generate_unique_service_id()
    return JsonResponse({'service_id': unique_service_id})
def generate_unique_address_id_view(request):
    unique_address_id = generate_unique_address_id()
    return JsonResponse({'user_address_id': unique_address_id})
def generate_unique_img_id_view(request):
    unique_img_id = generate_unique_img_id()
    return JsonResponse({'user_img_id': unique_img_id})


# Create your views here.
class StatesListCreateView(ListAPIView):
    serializer_class = StatesSerializer
    def get_queryset(self):
        return States.objects.all()
    def get(self, request, *args, **kwargs):
        state_info = self.get_queryset()
        serializer = self.serializer_class(state_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            state_id = serializer.data.get('state_id')
            state_name = serializer.data.get('state_name')
            state = States(state_id=state_id,state_name=state_name)
            state.save()
            return Response(self.serializer_class(state).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CitiesListCreateView(ListAPIView):
    serializer_class = CitiesSerializer
    def get_queryset(self):
        return Cities.objects.all()
    def get(self, request, *args, **kwargs):
        state_info = self.get_queryset()
        serializer = self.serializer_class(state_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            city_id = serializer.data.get('city_id')
            city_name = serializer.data.get('city_name')
            state_id = serializer.data.get('state_id') 
            state_instance = States.objects.get(state_id=state_id)
            city = Cities(city_id=city_id,city_name=city_name,state_id=state_instance)
            city.save()
            return Response(self.serializer_class(city).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StatesNameSearchByIdView(RetrieveAPIView):
    serializer_class = StatesSerializer
    queryset = States.objects.all()
    lookup_field = 'state_id'

class SalonFilterByStatesIdView(ListAPIView):
    serializer_class = SalonSerializer

    def get_queryset(self):
        state_id = self.kwargs['state_id']
        return Salon.objects.filter(salon_address_id__state_id=state_id)
    
class SalonFilterByCityIdView(ListAPIView):
    serializer_class = SalonSerializer

    def get_queryset(self):
        city_id = self.kwargs['city_id']
        return Salon.objects.filter(salon_address_id__city_id=city_id)

class CitysearchView(RetrieveAPIView):
    serializer_class = CitiesSerializer
    queryset = Cities.objects.all()
    lookup_field = 'city_id'

class CitysearchByStateView(ListAPIView):
    serializer_class = CitiesSerializer

    def get_queryset(self):
        state_id = self.kwargs['state_id']
        return Cities.objects.filter(state_id=state_id)


class UserAddressListCreateView(ListAPIView):
    serializer_class = UserAddressSerializer
    def get_queryset(self):
        return UsersAddress.objects.all()
    def get(self, request, *args, **kwargs):
        state_info = self.get_queryset()
        serializer = self.serializer_class(state_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_address_id = serializer.data.get('user_address_id')
            address = serializer.data.get('address')
            pincode = serializer.data.get('pincode') 
            state_id = serializer.data.get('state_id')
            state_instance = States.objects.get(state_id=state_id)
            city_id = serializer.data.get('city_id') 
            city_instance = Cities.objects.get(city_id=city_id)
            useraddress = UsersAddress(user_address_id=user_address_id,address=address,pincode=pincode,state_id=state_instance,city_id=city_instance)
            useraddress.save()
            return Response(self.serializer_class(useraddress).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SalonAddressListCreateView(ListAPIView):
    serializer_class = SalonAddressSerializer
    def get_queryset(self):
        return SalonAddress.objects.all()
    def get(self, request, *args, **kwargs):
        state_info = self.get_queryset()
        serializer = self.serializer_class(state_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            salon_address_id = serializer.data.get('salon_address_id')
            address = serializer.data.get('address')
            pincode = serializer.data.get('pincode') 
            state_id = serializer.data.get('state_id')
            state_instance = States.objects.get(state_id=state_id)
            city_id = serializer.data.get('city_id') 
            city_instance = Cities.objects.get(city_id=city_id)
            useraddress = SalonAddress(salon_address_id=salon_address_id,address=address,pincode=pincode,state_id=state_instance,city_id=city_instance)
            useraddress.save()
            return Response(self.serializer_class(useraddress).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UseraddresssearchView(RetrieveAPIView):
    serializer_class = UserAddressSerializer
    queryset = UsersAddress.objects.all()
    lookup_field = 'user_address_id'

class SalonaddresssearchView(RetrieveAPIView):
    serializer_class = SalonAddressSerializer
    queryset = SalonAddress.objects.all()
    lookup_field = 'salon_address_id'

class ProfileListCreateView(APIView):
    serializer_class = ProfilesSerializer
    def get_queryset(self):
        return Profiles.objects.all()
    def get(self, request, *args, **kwargs):
        profiles = self.get_queryset()
        serializer = self.serializer_class(profiles, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            p_id = serializer.data.get('p_id')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            dob = serializer.data.get('dob')
            gender = serializer.data.get('gender') 
            mob = serializer.data.get('mob')
            email = serializer.data.get('email')
            user_address_id = serializer.data.get('user_address_id')
            usersaddress_instance = UsersAddress.objects.get(user_address_id=user_address_id)            
            profiles = Profiles(p_id=p_id,first_name=first_name,last_name=last_name,dob=dob,gender=gender,mob=mob,email=email,user_address_id=usersaddress_instance)
            profiles.save()

            return Response(self.serializer_class(profiles).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileListByPIdCreateView(RetrieveAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()
    lookup_field = 'p_id'
    
class CustomerListCreateView(ListAPIView):
    serializer_class = CustomerSerializer
    def get_queryset(self):
        return Customer.objects.all()
    def get(self, request, *args, **kwargs):
        customers = self.get_queryset()
        serializer = self.serializer_class(customers, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id')  # Use validated_data here
            password = serializer.validated_data.get('password')
            p_id = serializer.data.get('p_id')
            profiles_instance = Profiles.objects.get(p_id=p_id)
            customer = Customer(user_id=user_id, password=password, p_id=profiles_instance)
            customer.save()
            try:
                subject = 'Welcome to Our Platform!'
                message = f'Thank you for registering with us. Your user_id: {customer.user_id}. We hope you enjoy our services.'
                from_email = 'panchalnilu91202@gmail.com'
                to_email = [profiles_instance.email]
                send_mail(subject, message, from_email, to_email, fail_silently=False)
            except Exception as e:
                print("Mail not sent:", e)
            return Response(self.serializer_class(customer).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerListRetrieveView(RetrieveAPIView):
    def get(self, request, user_id):
        try:
            customer = Customer.objects.get(user_id=user_id)
            user_profile_data = {
                "user_id": customer.user_id,
                "first_name": customer.p_id.first_name,
            }
            return Response(user_profile_data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class CustomerUpdateView(UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class AdminListCreateView(ListAPIView):
    serializer_class = AdminSerializer
    def get_queryset(self):
        return S_Admin.objects.all()
    def get(self, request, *args, **kwargs):
        admins_info = self.get_queryset()
        serializer = self.serializer_class(admins_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            admin_id = serializer.data.get('admin_id')
            password = serializer.data.get('password')
            p_id = serializer.data.get('p_id')
            profiles_instance = Profiles.objects.get(p_id=p_id)
            admins = S_Admin(admin_id=admin_id,password=password,p_id=profiles_instance)
            admins.save()
            try:
                subject = 'Welcome to Our Platform!'
                message = f'Thank you for registering with us your salon. Your Admin_id: {admins.admin_id}. We hope you enjoy our services.'
                from_email = 'panchalnilu91202@gmail.com'
                to_email = [profiles_instance.email]
                send_mail(subject, message, from_email, to_email, fail_silently=False)
            except Exception as e:
                print("Mail not sent:", e)

            return Response(self.serializer_class(admins).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminListRetrieveView(RetrieveAPIView):
    def get(self, request, admin_id):
        try:
            s_admin = S_Admin.objects.get(admin_id=admin_id)
            user_profile_data = {
                "admin_id": s_admin.admin_id,
                "first_name": s_admin.p_id.first_name,
                "p_id": s_admin.p_id.p_id,
            }
            return Response(user_profile_data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class SalonListCreateView(ListAPIView):
    serializer_class = SalonSerializer
    def get_queryset(self):
        return Salon.objects.all()
    def get(self, request, *args, **kwargs):
        salons_info = self.get_queryset()
        serializer = self.serializer_class(salons_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            salon_id = serializer.data.get('salon_id')
            salon_password = serializer.data.get('salon_password')
            admin_id = serializer.data.get('admin_id')
            admin_instance = S_Admin.objects.get(admin_id=admin_id)
            salon_name = serializer.data.get('salon_name')
            salon_address_id = serializer.data.get('salon_address_id')
            address_instance = SalonAddress.objects.get(salon_address_id=salon_address_id)
            cust_gender = serializer.data.get('cust_gender')
            salon = Salon(salon_id=salon_id,salon_password=salon_password,admin_id=admin_instance,salon_name=salon_name,salon_address_id=address_instance,cust_gender=cust_gender)
            salon.save()
            return Response(self.serializer_class(salon).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#salon info search with salon_id
class SalonRetrieveView(RetrieveAPIView):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()
    lookup_field = 'salon_id'
#salon info search with admin_id
class SalonRetrieveByAdminIdView(RetrieveAPIView):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()
    lookup_field = 'admin_id'
#salon info search by gender
# class SalonDataRetrieveAsGenderView(RetrieveAPIView):
#     serializer_class = SalonSerializer
#     queryset = Salon.objects.all()
#     lookup_field = 'cust_gender'
class SalonDataRetrieveAsGenderView(ListAPIView):
    serializer_class = SalonSerializer
    def get_queryset(self):
        cust_gender = self.kwargs['cust_gender']
        return Salon.objects.filter(cust_gender=cust_gender)
    
class SalonDataRetrieveAsSearchView(ListAPIView):
    serializer_class = SalonSerializer
    def get_queryset(self):
        salon_name = self.kwargs['salon_name']
        return Salon.objects.filter(salon_name=salon_name)
    
class ServiceMasterCategorysListCreateview(ListAPIView):
    serializer_class = ServiceMasterCategorysSerializer
    def get_queryset(self):
        return Service_Master_Categorys.objects.all()
    def get(self, request, *args, **kwargs):
        service_master_categorys_info = self.get_queryset()
        serializer = self.serializer_class(service_master_categorys_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            categorys_id = serializer.data.get('categorys_id')
            categorys = serializer.data.get('categorys')
            service_master_categorys = Service_Master_Categorys(categorys_id=categorys_id,categorys=categorys)
            service_master_categorys.save()
            return Response(self.serializer_class(service_master_categorys).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServiceMasterCategorysTypesListCreateview(ListAPIView):
    serializer_class = ServiceMasterCategorysTypeSerializer
    def get_queryset(self):
        return Service_Master_Categorys_Types.objects.all()
    def get(self, request, *args, **kwargs):
        service_master_categorys_types_info = self.get_queryset()
        serializer = self.serializer_class(service_master_categorys_types_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            category_types_id = serializer.data.get('category_types_id')
            category_types = serializer.data.get('category_types')
            categorys_id = serializer.data.get('categorys_id')
            category_id_instatnce = Service_Master_Categorys.objects.get(categorys_id=categorys_id)
            service_master_categorys_types = Service_Master_Categorys_Types(category_types_id=category_types_id,category_types=category_types,categorys_id=category_id_instatnce)
            service_master_categorys_types.save()
            return Response(self.serializer_class(service_master_categorys_types).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategorySearchByIdView(ListAPIView):
    serializer_class = ServiceMasterCategorysSerializer

    def get_queryset(self):
        categorys_id = self.kwargs['categorys_id']
        return Service_Master_Categorys.objects.filter(categorys_id=categorys_id)

class CategoryTypeSearchByIdView(ListAPIView):
    serializer_class = ServiceMasterCategorysTypeSerializer

    def get_queryset(self):
        category_types_id = self.kwargs['category_types_id']
        return Service_Master_Categorys_Types.objects.filter(category_types_id=category_types_id)

class SalonMediaListView(APIView):
    def get(self, request):
        salon_media = Salon_media.objects.all()
        serializer = SalonMediaSerializer(salon_media, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SalonMediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
        

class SalonMediaImgView(APIView):
    def get(self, request, salon_id):
        salon_media = Salon_media.objects.filter(salon_id=salon_id)
        serializer = SalonMediaSerializer(salon_media, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    
class ScheduleListCreateView(ListAPIView):
    serializer_class = ScheduleSerializer
    def get_queryset(self):
        return Schedule.objects.all()
    def get(self, request, *args, **kwargs):
        schedules = self.get_queryset()
        serializer = self.serializer_class(schedules, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            schedule_id = serializer.data.get('schedule_id')
            salon_id = serializer.data.get('salon_id')
            salon_instance = Salon.objects.get(salon_id=salon_id)
            day = serializer.data.get('day')
            opening_time = serializer.data.get('opening_time')
            closing_time = serializer.data.get('closing_time')
            upcoming_holiday = serializer.data.get('upcoming_holiday')
            schedule = Schedule(schedule_id=schedule_id,salon_id=salon_instance,day=day,opening_time=opening_time,closing_time=closing_time,upcoming_holiday=upcoming_holiday)
            schedule.save()
            return Response(self.serializer_class(schedule).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScheduleListRetrieveView(RetrieveAPIView):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    lookup_field = 'salon_id'

class StylistsListCreateView(ListAPIView):
    serializer_class = StylistsSerializer
    def get_queryset(self):
        return Stylists.objects.all()
    def get(self, request, *args, **kwargs):
        stylists = self.get_queryset()
        serializer = self.serializer_class(stylists, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sty_id = serializer.data.get('sty_id')
            p_id = serializer.data.get('p_id')
            profiles_instance = Profiles.objects.get(p_id=p_id)            
            expertice = serializer.data.get('expertice')
            stylists = Stylists(sty_id=sty_id, p_id=profiles_instance,expertice=expertice)
            stylists.save()
            return Response(self.serializer_class(stylists).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.parsers import MultiPartParser, FormParser

# class ServicesMasterListView(APIView):
#     serializer_class = ServicesMasterSerializer
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         return Services_master.objects.all()

#     def get(self, request, *args, **kwargs):
#         services_master = self.get_queryset()
#         serializer = self.serializer_class(services_master, many=True)
#         return Response(serializer.data)

#     def post(self, request, formate=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServicesMasterListView(APIView):
    def get(self, request):
        services_master = Services_master.objects.all()
        serializer = ServicesMasterSerializer(services_master, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ServicesMasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ServicesMasterDeleteView(APIView):
    def delete(self, request, service_id):
        try:
            service = Services_master.objects.get(service_id=service_id)
            service.delete()
            return Response({"message": "Service deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Services_master.DoesNotExist:
            return Response({"error": "Service does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        

class ServiceMasterUpdateView(UpdateAPIView):
    queryset = Services_master.objects.all()
    serializer_class = ServicesMasterSerializer

class ServiceMasterDeleteView(UpdateAPIView):
    queryset = Services_master.objects.all()
    serializer_class = ServicesMasterSerializer

class ServiceMasterListRetrieveView(ListAPIView):
    serializer_class = ServicesMasterSerializer

    def get_queryset(self):
        salon_id = self.kwargs['salon_id']
        return Services_master.objects.filter(salon_id=salon_id)

class ProvidedServicesListView(ListAPIView):
    serializer_class = ProvidedServicesSerializer
    def get_queryset(self):
        return Provided_services.objects.all()
    def get(self, request, *args, **kwargs):
        Provided_services_info = self.get_queryset()
        serializer = self.serializer_class(Provided_services_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            app_id = serializer.data.get('app_id')
            appointments_instance = Appointments.objects.get(app_id=app_id)
            service_id = serializer.data.get('service_id')
            services_master_instance = Services_master.objects.get(service_id=service_id)
            offer_id = serializer.data.get('offer_id')
            if offer_id is not None:
                offer_master_instance = Offer_master.objects.get(offer_id=offer_id)
            else:
                offer_master_instance = None
            provided_services = Provided_services(app_id=appointments_instance, service_id=services_master_instance,offer_id=offer_master_instance)
            provided_services.save()
            return Response(self.serializer_class(provided_services).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OfferMasterListView(ListAPIView):
    serializer_class = OfferMasterSerializer
    def get_queryset(self):
        return Offer_master.objects.all()
    def get(self, request, *args, **kwargs):
        offer_master_info = self.get_queryset()
        serializer = self.serializer_class(offer_master_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            offer_id = serializer.data.get('offer_id')
            salon_id = serializer.data.get('salon_id')
            salon_instance = Salon.objects.get(salon_id=salon_id)
            services_id = serializer.data.get('services_id')
            services_instance = Services_master.objects.get(service_id=services_id)
            offer_name = serializer.data.get('offer_name')
            offer_type = serializer.data.get('offer_type')
            offer_date = serializer.data.get('offer_date')
            offer_end = serializer.data.get('offer_end')
            off_amm = serializer.data.get('off_amm')
            offer_master = Offer_master(offer_id=offer_id, salon_id=salon_instance, services_id=services_instance, offer_name=offer_name, offer_type=offer_type, offer_date=offer_date, offer_end=offer_end,off_amm=off_amm)
            offer_master.save()
            return Response(self.serializer_class(offer_master).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointedStylistListView(ListAPIView):
    serializer_class = AppointedStylistSerializer
    def get_queryset(self):
        return Appointed_stylist.objects.all()
    def get(self, request, *args, **kwargs):
        appointed_stylist_info = self.get_queryset()
        serializer = self.serializer_class(appointed_stylist_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sty_id = serializer.data.get('sty_id')
            stylist_instance = Stylists.objects.get(sty_id=sty_id)
            salon_id = serializer.data.get('salon_id')
            salon_instance = Salon.objects.get(salon_id=salon_id)            
            service_id = serializer.data.get('service_id')
            service_instance = Services_master.objects.get(service_id=service_id)            
            charge_amm = serializer.data.get('charge_amm')
            appointed_stylist = Appointed_stylist(sty_id=stylist_instance, salon_id=salon_instance, service_id=service_instance, charge_amm=charge_amm)
            appointed_stylist.save()
            return Response(self.serializer_class(appointed_stylist).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StylistAppointmentsListView(ListAPIView):
    serializer_class = StylistAppointmentsSerializer
    def get_queryset(self):
        return Stylist_appointments.objects.all()
    def get(self, request, *args, **kwargs):
        stylist_appointments_info = self.get_queryset()
        serializer = self.serializer_class(stylist_appointments_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sty_id = serializer.data.get('sty_id')
            stylist_instance = Stylists.objects.get(sty_id=sty_id)
            app_id = serializer.data.get('app_id')
            appointments_instance = Appointments.objects.get(app_id=app_id)
            charge_amm = serializer.data.get('charge_amm')
            stylist_appointments = Stylist_appointments(sty_id=stylist_instance, app_id=appointments_instance, charge_amm=charge_amm)
            stylist_appointments.save()
            return Response(self.serializer_class(stylist_appointments).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentsListView(ListAPIView):
    serializer_class = AppointmentsSerializer
    def get_queryset(self):
        return Appointments.objects.all()
    def get(self, request, *args, **kwargs):
        appointments_info = self.get_queryset()
        serializer = self.serializer_class(appointments_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            app_id = serializer.data.get('app_id')
            salon_id = serializer.data.get('salon_id')
            salon_instance = Salon.objects.get(salon_id=salon_id)
            user_id = serializer.data.get('user_id')
            customer_instance = Customer.objects.get(user_id=user_id)
            date_of_book = serializer.data.get('date_of_book')
            date_of_appointment = serializer.data.get('date_of_appointment')
            start_time = serializer.data.get('start_time')
            end_time = serializer.data.get('end_time')
            # tot_duration = serializer.data.get('tot_duration')
            total_amm = serializer.data.get('total_amm')
            canceled = serializer.data.get('canceled')
            cancellation_reasion = serializer.data.get('cancellation_reasion')
            app_status = serializer.data.get('app_status')
            app_mode = serializer.data.get('app_mode')
            appointments = Appointments(app_id=app_id, salon_id=salon_instance, user_id=customer_instance, date_of_book=date_of_book, date_of_appointment=date_of_appointment, start_time=start_time, end_time=end_time, total_amm=total_amm, canceled=canceled, cancellation_reasion=cancellation_reasion, app_status=app_status, app_mode=app_mode)
            appointments.save()
            
            try:
                customer_profile_instance = Profiles.objects.get(p_id=customer_instance.p_id.p_id)
                print(customer_profile_instance.email)
            except Profiles.DoesNotExist:
                return Response({"error": "Profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                subject = 'Welcome to Our Platform!'
                message = f'Thank you for Choosing Us, and your appointment is successfully Booked. Your Appointment Id : {appointments.app_id}. And Appointment Date Is : {appointments.date_of_appointment},We hope you enjoy our services.'
                from_email = 'panchalnilu91202@gmail.com'
                to_email = [customer_profile_instance.email]
                send_mail(subject, message, from_email, to_email, fail_silently=False)
            except Exception as e:
                print("Mail not sent:", e)

            return Response(self.serializer_class(appointments).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentListRetrieveView(ListAPIView):
    serializer_class = AppointmentsSerializer
    def get_queryset(self):
        salon_id = self.kwargs['salon_id']
        return Appointments.objects.filter(salon_id=salon_id)
        
from datetime import datetime
class CheckAppointmentAvailability(RetrieveAPIView):
    def get(self, request):
        date_of_appointment = request.GET.get('date_of_appointment')
        start_time = request.GET.get('start_time')

        all_date_appointments = Appointments.objects.filter(date_of_appointment=date_of_appointment)

        # Serialize the queryset to JSON response
        serializer = AppointmentsSerializer(all_date_appointments, many=True)
        data = serializer.data

        # Extract start time and end time from each appointment
        start_times = [appointment['start_time'] for appointment in data]
        end_times = [appointment['end_time'] for appointment in data]

        # Convert start_time to datetime object for comparison
        start_time_obj = datetime.strptime(start_time, '%H:%M:%S').time()

        # Check if the provided start_time falls within any existing appointment time range
        for start, end in zip(start_times, end_times):
            start_obj = datetime.strptime(start, '%H:%M:%S').time()
            end_obj = datetime.strptime(end, '%H:%M:%S').time()
            if start_time_obj >= start_obj and start_time_obj <= end_obj:
                available = False
                break
        else:
            available = True

        return JsonResponse({'available': available})
    
# class CompletedAppointmentsListView(ListAPIView):
#     serializer_class = AppointmentsSerializer

#     def get_queryset(self):
#         # Filter appointments where status is 'completed'
#         return Appointments.objects.filter(status='complete')

#     def get(self, request, *args, **kwargs):
#         appointments_info = self.get_queryset()
#         serializer = self.serializer_class(appointments_info, many=True)
#         return Response(serializer.data)
class CompletedAppointmentsListView(ListAPIView):
    serializer_class = AppointmentsSerializer

    def get_queryset(self):
        salon_id = self.kwargs['salon_id']
        return Appointments.objects.filter(salon_id=salon_id,app_status='complete')

# class CenceledAppointmentsListView(ListAPIView):
#     serializer_class = AppointmentsSerializer

#     def get_queryset(self):
#         # Filter appointments where status is 'canceled'
#         return Appointments.objects.filter(status='canceled')

#     def get(self, request, *args, **kwargs):
#         appointments_info = self.get_queryset()
#         serializer = self.serializer_class(appointments_info, many=True)
#         return Response(serializer.data)
class CenceledAppointmentsListView(ListAPIView):
    serializer_class = AppointmentsSerializer

    def get_queryset(self):
        salon_id = self.kwargs['salon_id']
        return Appointments.objects.filter(salon_id=salon_id,app_status='canceled')

# class PendingAppointmentsListView(ListAPIView):
#     serializer_class = AppointmentsSerializer

#     def get_queryset(self,salon_id):
#         # Filter appointments where status is 'pending'
#         return Appointments.objects.filter(salon_id=salon_id,status='pending')

#     def get(self, request, *args, **kwargs):
#         appointments_info = self.get_queryset()
#         serializer = self.serializer_class(appointments_info, many=True)
#         return Response(serializer.data)

class PendingAppointmentsListView(ListAPIView):
    serializer_class = AppointmentsSerializer
    def get_queryset(self):
        salon_id = self.kwargs['salon_id']
        return Appointments.objects.filter(salon_id=salon_id,app_status='pending')
    
class AppointmentsUpdateView(UpdateAPIView):
    queryset = Appointments.objects.all()
    serializer_class = AppointmentsSerializer

class PaymentListView(ListAPIView):
    serializer_class = PaymentSerializer
    def get_queryset(self):
        return Payment.objects.all()
    def get(self, request, *args, **kwargs):
        payment_info = self.get_queryset()
        serializer = self.serializer_class(payment_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pay_id = serializer.data.get('pay_id')
            user_id = serializer.data.get('user_id')
            customer_instance = Customer.objects.get(user_id=user_id)
            app_id = serializer.data.get('app_id')
            appointment_instance = Appointments.objects.get(app_id=app_id)
            salon_id = serializer.data.get('salon_id')
            salon_instance = Salon.objects.get(salon_id=salon_id)
            payment_type = serializer.data.get('payment_type')
            status = serializer.data.get('status')
            # paid_am = appointment_instance.total_amm.value
            paid_am = serializer.data.get('paid_am')
            pending_am = serializer.data.get('pending_am')
            payment_date = serializer.data.get('payment_date')
            mode = serializer.data.get('mode')
            payment = PaymentSerializer(pay_id=pay_id, user_id=customer_instance, app_id=appointment_instance, salon_id=salon_instance, payment_type=payment_type, status=status, paid_am=paid_am, pending_am=pending_am, payment_date=payment_date, mode=mode)
            payment.save()
            return Response(self.serializer_class(payment).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CashListView(ListAPIView):
    serializer_class = CashSerializer
    def get_queryset(self):
        return Cash.objects.all()
    def get(self, request, *args, **kwargs):
        cash_info = self.get_queryset()
        serializer = self.serializer_class(cash_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            cash_id = serializer.data.get('cash_id')
            pay_id = serializer.data.get('pay_id')
            amm = serializer.data.get('amm')
            cash = Cash(cash_id=cash_id, pay_id=pay_id, amm=amm)
            cash.save()
            return Response(self.serializer_class(cash).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpiListView(ListAPIView):
    serializer_class = UpiSerializer
    def get_queryset(self):
        return Upi.objects.all()
    def get(self, request, *args, **kwargs):
        upi_info = self.get_queryset()
        serializer = self.serializer_class(upi_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pay_id = serializer.data.get('pay_id')
            payment_instance = Payment.objects.get(pay_id=pay_id)
            upi_id = serializer.data.get('upi_id')
            transaction_id = serializer.data.get('transaction_id')
            transaction_date = serializer.data.get('transaction_date')
            transaction_time = serializer.data.get('transaction_time')
            upi = Upi(pay_id=payment_instance, upi_id=upi_id, transaction_id=transaction_id, transaction_date=transaction_date, transaction_time=transaction_time)
            upi.save()
            return Response(self.serializer_class(upi).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CardListView(ListAPIView):
    serializer_class = CardSerializer
    def get_queryset(self):
        return Card.objects.all()
    def get(self, request, *args, **kwargs):
        card_info = self.get_queryset()
        serializer = self.serializer_class(card_info, many=True)
        return Response(serializer.data)
    def post(self, request, formate=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pay_id = serializer.data.get('pay_id')
            payment_instance = Payment.objects.get(pay_id=pay_id)            
            card_no = serializer.data.get('card_no')
            hold_name = serializer.data.get('hold_name')
            exp_date = serializer.data.get('exp_date')
            cvv_no = serializer.data.get('cvv_no')
            card = Card(pay_id=payment_instance, card_no=card_no, hold_name=hold_name, exp_date=exp_date, cvv_no=cvv_no)
            card.save()
            return Response(self.serializer_class(card).data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SalonUpdateView(APIView):
    def put(self, request, salon_id):
        try:
            salon = Salon.objects.get(salon_id=salon_id)
        except Salon.DoesNotExist:
            return Response({"error": "Salon not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SalonUpdateSerializer(salon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SalonAddressUpdateView(APIView):
    def put(self, request, salon_address_id):
        try:
            salon = SalonAddress.objects.get(salon_address_id=salon_address_id)
        except SalonAddress.DoesNotExist:
            return Response({"error": "Salon Address not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SalonAddressUpdateSerializer(salon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateView(APIView):
    def put(self, request, p_id):
        try:
            profile = Profiles.objects.get(p_id=p_id)
        except Profiles.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileUpdateSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAddressUpdateView(APIView):
    def put(self, request, user_address_id):
        try:
            useradd = UsersAddress.objects.get(user_address_id=user_address_id)
        except UsersAddress.DoesNotExist:
            return Response({"error": "User Address not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserAddressUpdateSerializer(useradd, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SalonImageUpdateView(APIView):
        def put(self, request, salon_id):
            try:
                salonimg = Salon_media.objects.get(salon_id=salon_id)
            except Salon_media.DoesNotExist:
                return Response({"error": "salonimg data not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = SalonImageUpdateSerializer(salonimg, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SalonMediaImageUploadListView(APIView):
    def post(self, request, salon_id):
            try:
                salonimg = Salon_media.objects.get(salon_id=salon_id)
            except Salon_media.DoesNotExist:
                return Response({"error": "salonimg data not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = SalonImageUpdateSerializer(salonimg, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordCustomerView(ListAPIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')  # Assuming email is passed in request data
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        try:
            profile = Profiles.objects.get(email=email)
            print(f"Profile ID: {profile.p_id}")  # Debug print
            
            try:
                customer = Customer.objects.get(p_id=profile.p_id)
                print(f"Customer ID: {customer.user_id}")  # Debug print
                
                subject = 'Your Credentials for Our Platform'
                message = f'Your user_id is:  and password is: . Please keep them confidential.'
                from_email = 'panchalnilu91202@gmail.com'
                to_email = [profile.email]
                
                send_mail(subject, message, from_email, to_email, fail_silently=False)
                
                return JsonResponse({'success': 'Credentials sent successfully'}, status=200)
            
            except Customer.DoesNotExist:
                print("Customer does not exist for the provided profile")
                return JsonResponse({'error': 'Customer profile not found for the provided email'}, status=404)
        
        except Profiles.DoesNotExist:
            print(f"Profile with email {email} not found")
            return JsonResponse({'error': 'Profile with provided email not found'}, status=404)
        
        except Exception as e:
            print(f"Error sending credentials: {e}")
            return JsonResponse({'error': f'Failed to send credentials: {e}'}, status=500)    # def post(self, request, format=None):
    #     email = request.data.get('email')  # Assuming email is passed in the request data
        
    #     if not email:
    #         return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     try:
    #         # Fetch customer profile instance by email
    #         customer_profile_instance = Profiles.objects.get(email=email)
    #         customer_instace = Customer.objects.get(p_id=customer_profile_instance.p_id)
    #     except Profiles.DoesNotExist:
    #         return Response({"error": "Profile with the provided email does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    #     # Send email
    #     try:
    #         subject = 'Welcome to Our Platform!'
    #         message = f'Password Forgot Successfully. Your user_id: {customer_instace.user_id} and your Password: {customer_instace.password}We hope you enjoy our services.'
    #         from_email = 'panchalnilu91202@gmail.com'
    #         to_email = [customer_profile_instance.email]
    #         send_mail(subject, message, from_email, to_email, fail_silently=False)
            
    #         return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
            
    #     except Exception as e:
    #         print("Mail not sent:", e)
    #         return Response({"error": "Failed to send email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CategoryTypeSearchcategoryByIdView(ListAPIView):
    serializer_class = ServiceMasterCategorysTypeSerializer
    def get_queryset(self):
        categorys_id = self.kwargs['categorys_id']
        return Service_Master_Categorys_Types.objects.filter(categorys_id=categorys_id)


from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models
import string
import random
from datetime import datetime
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

# from .utils import generate_unique_p_id, generate_unique_user_id,generate_unique_schedule_id,generate_unique_admin_id,generate_unique_salon_id,generate_unique_service_id
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
def generate_unique_stylist_id(length=6):
    while True:
        sty_id = ''.join(random.choices(string.digits, k=length))
        if Stylists.objects.filter(sty_id=sty_id).count() == 0:
            break
    return sty_id
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
def generate_unique_img_id(length=6):
    while True:
        img_id = ''.join(random.choices(string.digits, k=length))
        if Salon_media.objects.filter(img_id=img_id).count() == 0:
            break
    return img_id
def generate_unique_offer_id(length=6):
    while True:
        offer_id = ''.join(random.choices(string.digits, k=length))
        if Offer_master.objects.filter(offer_id=offer_id).count() == 0:
            break
    return offer_id
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
def generate_unique_payment_id(length=6):
    while True:
        pay_id = ''.join(random.choices(string.digits, k=length))
        if Payment.objects.filter(pay_id=pay_id).count() == 0:
            break
    return pay_id
def generate_unique_cash_id(length=6):
    while True:
        cash_id = ''.join(random.choices(string.digits, k=length))
        if Cash.objects.filter(cash_id=cash_id).count() == 0:
            break
    return cash_id
def generate_unique_state_id(length=6):
    while True:
        state_id = ''.join(random.choices(string.digits, k=length))
        if States.objects.filter(state_id=state_id).count() == 0:
            break
    return state_id
def generate_unique_city_id(length=6):
    while True:
        city_id = ''.join(random.choices(string.digits, k=length))
        if Cities.objects.filter(city_id=city_id).count() == 0:
            break
    return city_id
def generate_unique_address_id(length=6):
    while True:
        user_address_id = ''.join(random.choices(string.digits, k=length))
        if UsersAddress.objects.filter(user_address_id=user_address_id).count() == 0:
            break
    return user_address_id
def generate_unique_s_address_id(length=6):
    while True:
        salon_address_id = ''.join(random.choices(string.digits, k=length))
        if SalonAddress.objects.filter(salon_address_id=salon_address_id).count() == 0:
            break
    return salon_address_id


class Offer_master_b(models.Model):
    offer_id = models.IntegerField(primary_key=True,default=generate_unique_offer_id)
class Appointments_b(models.Model):
    app_id = models.IntegerField(primary_key=True,default=generate_unique_appointment_id)

class States(models.Model):
    state_id = models.IntegerField(primary_key=True,default=generate_unique_state_id)
    state_name = models.CharField(max_length=30,null=False)

    def __str__(self):
        return str(self.state_id)

class Cities(models.Model):
    city_id = models.IntegerField(primary_key=True,default=generate_unique_city_id)
    city_name = models.CharField(max_length=30,null=False)
    state_id = models.ForeignKey(States, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.city_id)

class UsersAddress(models.Model):
    user_address_id = models.IntegerField(primary_key=True,default=generate_unique_address_id) 
    address = models.CharField(max_length=100)
    pincode = models.IntegerField()
    city_id = models.ForeignKey(Cities, on_delete=models.CASCADE)
    state_id = models.ForeignKey(States, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user_address_id)
    
class SalonAddress(models.Model):
    salon_address_id = models.IntegerField(primary_key=True,default=generate_unique_s_address_id) 
    address = models.CharField(max_length=100)
    pincode = models.IntegerField()
    city_id = models.ForeignKey(Cities, on_delete=models.CASCADE)
    state_id = models.ForeignKey(States, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.salon_address_id)

class MyUserManager(BaseUserManager):
    def create_user(self, user_id, email, password=None):
        """
        Creates and saves a User with the given user_id, email and password.
        """
        if not user_id:
            raise ValueError("Users must have an user_id attribute")

        MyUser = self.model(
            user_id=user_id,
            email=email,
            password=password,
        )

        MyUser.set_password(password)
        MyUser.save(using=self._db)
        return MyUser

    def create_superuser(self, user_id, email, password=None):
        """
        Creates and saves a superuser with the given user_id, email and password.
        """
        MyUser = self.create_user(
            user_id,
            password=password,
            email=email,
        )
        MyUser.is_admin = True
        MyUser.save(using=self._db)
        return MyUser


class MyUser(AbstractBaseUser):
    user_id = models.IntegerField(
        # unique=True,
        primary_key=True,
        # default=generate_unique_code_myuser
        # default=generate_unique_code_myuser
    )
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    # password = models.CharField(max_length=16)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "user_id"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return str(self.user_id)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


# Create manual models from here.
class Profiles(models.Model):
    GENDER=[
        ("M","Male"),
        ("F","Female"),
    ]
    p_id=models.IntegerField(primary_key=True,default=generate_unique_p_id,unique=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    dob=models.DateField()
    gender=models.CharField(max_length=1, choices=GENDER, default="M")
    # gender=models.TextChoices("Male","Female")
    mob=models.CharField(max_length=10)
    email=models.CharField(max_length=30)
    user_address_id=models.ForeignKey(UsersAddress, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.p_id)

class Customer(models.Model):
    user_id=models.IntegerField(primary_key=True,default=generate_unique_user_id,unique=True)
    password=models.CharField(max_length=20)
    p_id=models.OneToOneField(Profiles,on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.user_id)

@receiver(post_save, sender=Customer)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Assuming there's a one-to-one relationship between Customer and Profile
        profile = instance.p_id
        MyUser.objects.create_user(user_id=instance.user_id, email=profile.email, password=instance.password)

@receiver(post_save, sender=Customer)
def save_user_profile(sender, instance, **kwargs):
    try:
        # Retrieve the associated MyUser instance
        user_instance = MyUser.objects.get(user_id=instance.user_id)
        user_instance.save()
    except MyUser.DoesNotExist:
        # Handle the case where MyUser instance does not exist
        pass

class S_Admin(models.Model):
    admin_id=models.IntegerField(primary_key=True,default=generate_unique_admin_id,unique=True)
    password=models.CharField(max_length=20)
    p_id=models.OneToOneField(Profiles,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.admin_id)

@receiver(post_save, sender=S_Admin)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Assuming there's a one-to-one relationship between Customer and Profile
        profile = instance.p_id
        MyUser.objects.create_user(user_id=instance.admin_id, email=profile.email, password=instance.password)

@receiver(post_save, sender=S_Admin)
def save_user_profile(sender, instance, **kwargs):
    try:
        # Retrieve the associated MyUser instance
        user_instance = MyUser.objects.get(user_id=instance.admin_id)
        user_instance.save()
    except MyUser.DoesNotExist:
        # Handle the case where MyUser instance does not exist
        pass

class Stylists(models.Model):
    sty_id = models.IntegerField(primary_key=True,default=generate_unique_stylist_id,unique=True)
    p_id = models.OneToOneField(Profiles, on_delete=models.CASCADE)
    expertice = models.CharField(max_length=40)

    def __str__(self):
        return str(self.sty_id)
    
class Salon(models.Model):
    genders_c = [('Both','Both'),('Male','Male'),('Female','Female')]
    salon_id=models.IntegerField(primary_key=True,default=generate_unique_salon_id,unique=True)
    salon_password=models.CharField(max_length=20)
    admin_id=models.OneToOneField(S_Admin, on_delete=models.CASCADE)
    salon_name=models.CharField(max_length=30)
    salon_address_id=models.ForeignKey(SalonAddress, on_delete=models.CASCADE)
    cust_gender=models.CharField(max_length=50,choices=genders_c)

    def __str__(self):
        return str(self.salon_id)
    
class Schedule(models.Model):
    schedule_id=models.IntegerField(primary_key=True,default=generate_unique_schedule_id,unique=True)
    salon_id=models.OneToOneField(Salon, on_delete=models.CASCADE)
    day=models.CharField(max_length=50)
    opening_time = models.TimeField()
    closing_time = models.TimeField()    
    upcoming_holiday = models.DateField(default=None, null=True)

    def __str__(self):
        return str(self.schedule_id)
    
class Service_Master_Categorys(models.Model):
    categorys_id =  models.IntegerField(primary_key=True,default=generate_unique_service_id)
    categorys=models.CharField(max_length=50,null=False)

    def __str__(self):
        return str(self.categorys_id)

class Service_Master_Categorys_Types(models.Model):
    category_types_id =  models.IntegerField(primary_key=True,default=generate_unique_service_id)
    category_types=models.CharField(max_length=50,null=False)
    categorys_id=models.ForeignKey(Service_Master_Categorys,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.categorys_id)

class Services_master(models.Model):
    categorys = [('hair','hair'), ("beard","beard"),("massage","massage"),('facials','facials')]
    category_types = {
        'hair': ['cut', 'wash', 'color','styling'],
        'beard': ['shave', 'color', 'wash','trimming','shaping'],
        'massage': ['relaxation', 'full body', 'sports','stress-relief','hai foot'],
        'facials': ['hydrating', 'exfoliating', 'clarifying']
    }
    service_id=models.IntegerField(primary_key=True,default=generate_unique_service_id)
    salon_id=models.ForeignKey(Salon, on_delete=models.CASCADE)
    # category=models.CharField(max_length=50, choices=categorys,default='hair')
    # typeofservice=models.CharField(max_length=100)
    category=models.ForeignKey(Service_Master_Categorys, on_delete=models.CASCADE)
    typeofservice=models.ForeignKey(Service_Master_Categorys_Types, on_delete=models.CASCADE)
    # typeofservice = models.CharField(max_length=100, choices=[], default='cut')
    img = models.ImageField(upload_to='images/', default='default_image.jpg')
    duration=models.TimeField()
    charge=models.IntegerField(null=False)

    def __str__(self):
        return str(self.service_id)

class Offer_master(Offer_master_b):
    # offer_id = models.IntegerField(primary_key=True,default=None)
    salon_id = models.ForeignKey(Salon,null=False,on_delete=models.CASCADE)
    services_id = models.ForeignKey(Services_master,null=False,on_delete=models.CASCADE)
    offer_name = models.CharField(max_length=30,null=False)
    offer_type = models.CharField(max_length=20,null=False)
    offer_date = models.DateField(null=False)
    offer_end = models.DateField(null=False)
    off_amm = models.IntegerField(null=False)

    def __str__(self):
        return str(self.offer_id)

class Appointed_stylist(models.Model):
    # appointed_stl_id = models.IntegerField(null=False,primary_key=True,default=generate_unique_admin_id)
    sty_id = models.ForeignKey(Stylists,on_delete=models.CASCADE)
    salon_id = models.ForeignKey(Salon, on_delete=models.CASCADE)
    service_id = models.ForeignKey(Services_master, on_delete=models.CASCADE)
    charge_amm = models.IntegerField(null=False)

    def __str__(self):
        return str(self.sty_id)

    class Meta:
        # Define the composite primary key
        unique_together = (("sty_id", "salon_id",'service_id'),)
    
class Appointments(Appointments_b):
    status_c = [('pending','pending'),('complete','complete'),('canceled','canceled')]
    mode = [('salon', 'salon'),('home', 'home'),]
    # app_id = models.IntegerField(primary_key=True,default=generate_unique_admin_id)
    salon_id = models.ForeignKey(Salon, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date_of_book = models.DateField(default=timezone.now)
    date_of_appointment = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    tot_duration = models.DurationField(default='00:00:00')
    total_amm = models.IntegerField(null=False)
    canceled = models.BooleanField(default=False)
    cancellation_reasion = models.CharField(max_length=100,default=None,null=True)
    app_status = models.CharField(max_length=20,choices=status_c)
    app_mode = models.CharField(max_length=20,choices=mode,default='salon')
    def save(self, *args, **kwargs):
        if isinstance(self.start_time, str):
            self.start_time = datetime.strptime(self.start_time, '%H:%M:%S').time()
        if isinstance(self.end_time, str):
            self.end_time = datetime.strptime(self.end_time, '%H:%M:%S').time()
        start_datetime = datetime.combine(timezone.now().date(), self.start_time)
        end_datetime = datetime.combine(timezone.now().date(), self.end_time)
        duration = end_datetime - start_datetime
        self.tot_duration = duration
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.app_id)

class Salon_media(models.Model):
    img_id = models.IntegerField(primary_key=True,default=generate_unique_img_id)
    salon_id = models.ForeignKey(Salon, on_delete=models.CASCADE)
    category = models.CharField(max_length=20)
    image = models.ImageField(upload_to='images/', default='default_image.jpg')
    
    def __str__(self):
        return str(self.img_id)

class Provided_services(models.Model):
    app_id = models.ForeignKey(Appointments, on_delete=models.CASCADE)
    service_id = models.ForeignKey(Services_master, on_delete=models.CASCADE)
    offer_id = models.ForeignKey(Offer_master,blank=True,null=True,default=None, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Recalculate total amount for the appointment
        appointment = self.app_id
        total_amount = 0
        provided_services = Provided_services.objects.filter(app_id=appointment)
        for service in provided_services:
            total_amount += service.service_id.charge
        appointment.total_amm = total_amount
        appointment.save()

    def __str__(self):
        return str(self.app_id)
    class Meta:
        unique_together = (("app_id", "service_id"))

class Stylist_appointments(models.Model):
    # appointed_sty_id = models.IntegerField(primary_key=True,default=generate_unique_admin_id)
    sty_id = models.ForeignKey(Stylists, on_delete=models.CASCADE)
    app_id = models.ForeignKey(Appointments, on_delete=models.CASCADE)
    charge_amm = models.IntegerField(null=False)

    def __str__(self):
        return f"{self.sty_id} - {self.app_id}"
    
    class Meta:
        # Define the composite primary key
        unique_together = (("sty_id", "app_id"),)

class Payment(models.Model):
    pay_choice = [('cash', 'cash'), ('upi', 'upi'),('card', 'card')]
    status_c = [('pending','pending'),('complete','complete'),('canceled','canceled')]
    mode_c = [('online','online'),('offline','offline')]
    pay_id = models.IntegerField(primary_key=True,default=generate_unique_payment_id)
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    app_id = models.ForeignKey(Appointments , on_delete=models.CASCADE)
    salon_id = models.ForeignKey(Salon, on_delete=models.CASCADE)
    payment_type = models.CharField(max_length=10,choices=pay_choice, default='upi')
    status = models.CharField(max_length=10,choices=status_c,default='complete')
    paid_am = models.IntegerField()
    pending_am = models.IntegerField(default=0)
    payment_date = models.DateTimeField(auto_now_add=True)
    mode = models.CharField(max_length=50,choices=mode_c,default='online')

    def save(self, *args, **kwargs):
        if not self.pk:  # Only calculate pending_am if the instance is being created, not updated
            self.pending_am = self.app_id.total_amm - self.paid_am
        super().save(*args, **kwargs)
    
    def __str__(self):
        return str(self.pay_id)

class Cash(models.Model):
    cash_id = models.IntegerField(primary_key=True,default=generate_unique_cash_id)
    pay_id = models.ForeignKey(Payment, on_delete=models.CASCADE)
    amm = models.IntegerField(null=False)

    def __str__(self):
        return str(self.cash_id)

class Upi(models.Model):
    pay_id = models.OneToOneField(Payment, on_delete=models.CASCADE,primary_key=True)
    upi_id = models.IntegerField(null=False)
    transaction_id = models.IntegerField(null=False)
    transaction_date = models.DateField(auto_now_add=True)
    transaction_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pay_id)

class Card(models.Model):
    pay_id = models.OneToOneField(Payment, on_delete=models.CASCADE,primary_key=True)
    card_no = models.IntegerField(null=False)
    hold_name = models.CharField(max_length=40, null=False)
    exp_date = models.DateField(null=False)
    cvv_no = models.IntegerField(null=False)

    def __str__(self):
        return str(self.pay_id)
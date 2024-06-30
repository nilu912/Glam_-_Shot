from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about', index),
    path('termsandconditions', index),
    path('s-login', index),
    path('c-login', index),
    path('s-reg', index),
    path('c-reg', index),
    path('admin', index),
    path('customer', index),
    path('selectedsalon', index),
]

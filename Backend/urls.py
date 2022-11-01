from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView  
from api.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls') ),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/', include('api.urls')),
    path('',TemplateView.as_view(template_name='index.html')),
    path('login',TemplateView.as_view(template_name='index.html')),

]

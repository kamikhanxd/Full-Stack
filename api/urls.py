from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *
from api import views

router=DefaultRouter()

router.register(r'tasks',views.TaskViewSet)

urlpatterns=[
    path('',include(router.urls))
]
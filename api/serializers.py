from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class TaskSerializer(serializers.ModelSerializer):
    owner=serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Task
        fields = '__all__'
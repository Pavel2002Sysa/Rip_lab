from rest_framework import serializers
from rest_framework.fields import CharField
from bmstu_lab.models import *

class FootballersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footballers
        fields = '__all__'

class FootballersDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footballers
        fields = '__all__'
        depth = 2

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrdersDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        depth=2

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class LoginRequestSerializer(serializers.Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)

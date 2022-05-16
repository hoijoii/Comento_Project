from rest_framework import serializers
from .models import User
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'realname', 'companyCode']

        #password안보여줌.
        extra_kwargs = {'password':{
           'write_only':True,
           'required':True
           }
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #패스워드에 해쉬알고리즘
        Token.objects.create(user=user) #토큰 자동생성
        return user
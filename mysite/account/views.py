from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    '''
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    '''
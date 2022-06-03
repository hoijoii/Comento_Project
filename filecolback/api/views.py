from .models import Post, File
from .serializers import PostSerializer, FileSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
'''
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import JSONParser
from .forms import DocumentForm
import json
import os
from rest_framework.response import Response
'''

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

post_detail = PostViewSet.as_view({
    'get': 'retrieve',
})


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    #permission_classes = [IsAuthenticated]
    #authentication_classes = (TokenAuthentication,)

file_detail = FileViewSet.as_view({
        'get': 'retrieve',
    })





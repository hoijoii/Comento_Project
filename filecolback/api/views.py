from .models import Post, File
from .serializers import PostSerializer, FileSerializer
from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import JSONParser
from .forms import DocumentForm
import json
import os
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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

'''
@method_decorator(csrf_exempt, name="dispatch")
def file_list(request):
    if request.method=="GET":
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method=="POST":
        #data = JSONParser().parse(request)
        up_file = request.FILES['file']
        serializer = FileSerializer(request.POST, up_file)
        #serializer = FileSerializer(request.FILES)
        if serializer.is_valid():
            serializer.uploader = up_file.uploader
            serializer.post = up_file.post
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)


    if request.method=="POST":
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.uploader = request.uploader
            form.post = post_id
            form.save()
            return HttpResponse(json.dumps({"status": "Success"}))
        else:
            return HttpResponse(json.dumps({"status": "Failed"}))

'''



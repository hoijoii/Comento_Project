from .models import Post, File
from .serializers import PostSerializer, FileSerializer
from rest_framework import viewsets
from django.http import FileResponse
from django.core.files.storage import FileSystemStorage
import os

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


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
    '''
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
'''
file_detail = FileViewSet.as_view({
        'get': 'retrieve',
    })





'''
@csrf_exempt
def article_details(request, pk):
    try:
        post = Post.object.get(pk=pk)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method=='GET':
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
'''
from .models import Post, File, Company
from .serializers import PostSerializer, FileSerializer, CompanySerializer
from rest_framework import viewsets
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

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

company_detail = CompanyViewSet.as_view({
        'get': 'retrieve',
    })
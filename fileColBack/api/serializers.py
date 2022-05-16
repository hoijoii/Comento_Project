from rest_framework import serializers
from .models import Post, File

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'writer', 'created_at', 'startDay', 'endDay']

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'title', 'files', 'uploader', 'upload_at', 'post']

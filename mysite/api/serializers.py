from rest_framework import serializers
from .models import Post, File, Filedata

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'writer', 'created_at', 'startDay', 'endDay', 'formfile']

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'title', 'files', 'uploader', 'upload_at']

class FiledataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filedata
        fields = ['id', 'companyCode', 'companyName', 'classification', 'closingMonth', 'revenue', 'operatingIncome', 'netIncome']
from rest_framework import serializers
<<<<<<< HEAD
from .models import Post, File, Filedata
=======
from .models import Post, File
>>>>>>> develop

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
<<<<<<< HEAD
        fields = ['id', 'title', 'description', 'writer', 'created_at', 'startDay', 'endDay', 'formfile']
=======
        fields = ['id', 'title', 'description', 'writer', 'created_at', 'startDay', 'endDay']
>>>>>>> develop

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'title', 'files', 'uploader', 'upload_at']
<<<<<<< HEAD

class FiledataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filedata
        fields = ['id', 'companyCode', 'companyName', 'classification', 'closingMonth', 'revenue', 'operatingIncome', 'netIncome']
=======
>>>>>>> develop

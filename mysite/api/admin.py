from django.contrib import admin
from .models import Post, File

@admin.register(Post)
class PostModel(admin.ModelAdmin):
    list_filter = ('title', 'description', 'created_at') #우측에 리스트 추가
    list_display = ('title', 'startDay', 'endDay' , 'writer', 'created_at') #리스트 구분을 추가


@admin.register(File)
class FileModel(admin.ModelAdmin):
    list_display = ('title', 'files', 'uploader', 'upload_at')  # 리스트 구분을 추가
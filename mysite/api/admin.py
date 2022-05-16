from django.contrib import admin
from .models import Post, File, Filedata
from import_export.admin import ImportExportModelAdmin

@admin.register(Post)
class PostModel(admin.ModelAdmin):
    list_filter = ('title', 'description', 'created_at') #우측에 리스트 추가
    list_display = ('title', 'startDay', 'endDay' , 'writer', 'created_at', 'formfile') #리스트 구분을 추가

@admin.register(File)
class FileModel(admin.ModelAdmin):
    list_display = ('title', 'file', 'uploader', 'upload_at')  # 리스트 구분을 추가

@admin.register(Filedata)
class FiledataAdmin(ImportExportModelAdmin):
    list_display = ('companyCode', 'companyName', 'classification', 'closingMonth', 'revenue', 'operatingIncome', 'netIncome')

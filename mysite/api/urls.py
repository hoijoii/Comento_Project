from django.urls import re_path, path, include
from .views import PostViewSet, FileViewSet, import_data_to_db
from . import views
from rest_framework.routers import DefaultRouter
from account.views import UserViewSet
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('files', FileViewSet, basename='files')
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
    path('posts/<int:id>/', views.post_detail),
    path('files/<int:id>/', views.file_detail),
    path('filedata/', views.import_data_to_db, name="import_data_to_db"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
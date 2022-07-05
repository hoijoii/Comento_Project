from django.urls import path, include
from .views import PostViewSet, FileViewSet, CompanyViewSet
from . import views
from rest_framework.routers import DefaultRouter
from account.views import UserViewSet

router = DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('files', FileViewSet, basename='files')
router.register('users', UserViewSet, basename='users')
router.register('companies', CompanyViewSet, basename='companies')

urlpatterns = [
    path('api/', include(router.urls)),
    path('posts/<int:id>/', views.post_detail),
    path('files/<int:id>', views.file_detail)
]

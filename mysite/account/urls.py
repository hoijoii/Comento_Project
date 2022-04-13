
from django.urls import path, include
from .views import UserViewSet
from rest_framework.routers import DefaultRouter

#뷰셋등록
router = DefaultRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('account/', include(router.urls)),
]
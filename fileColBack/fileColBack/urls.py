from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
# from account.views import CustomAuthToken


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('', include('account.urls')),
    path('auth/', obtain_auth_token),
    #path('api-token-auth/', CustomAuthToken.as_view())
]

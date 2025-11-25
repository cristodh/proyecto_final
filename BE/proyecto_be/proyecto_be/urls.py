from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('campaign/', include('campaigns.urls')),
    path('organization/', include('organizations.urls')),
]

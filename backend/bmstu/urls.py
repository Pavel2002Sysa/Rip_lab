"""bmstu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from bmstu_lab import views
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'footballers', views.FootballersViewSet, basename='footballers')
router.register(r'footballers-depth', views.FootballersDepthViewSet, basename='footballers-depth')
router.register(r'user', views.UserViewSet)
router.register(r'orders', views.OrdersViewSet)
router.register(r'orders-date', views.OrdersDateViewSet, basename='orders-date')
router.register(r'orders-depth', views.OrdersDepthViewSet, basename='orders-depth')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_user', views.getJson, name='getJson'),
    path('api/user', views.user, name='user'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

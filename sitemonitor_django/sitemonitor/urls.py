from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from sitemonitor.views import (MonitorView, 
    SystemInfoView, SystemSettingViewSet, index,
    AuthViewSet)

router = routers.DefaultRouter()
router.register(r'system-settings', SystemSettingViewSet)
router.register(r'monitor', MonitorView, basename='monitor')
router.register(r'system-info', SystemInfoView, basename='system_info')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('/api/', include(router.urls)),
    url(r'^(?P<path>.*)/$', index)
]
from sitemonitor.models import SystemSetting
from rest_framework import viewsets, mixins, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from sitemonitor.serializers import (SystemSettingSerializer,
    UserSerializer)
from sitemonitor.config import monitor, sys_info
from django.shortcuts import render
from django.contrib import auth
from django.conf import settings

User = auth.get_user_model()


class SystemSettingViewSet(viewsets.ModelViewSet):
    queryset = SystemSetting.objects.all()
    serializer_class = SystemSettingSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False)
    def types(self, request):
        return Response([x[0] for x in SystemSetting.VALUE_TYPE_CHOICES])

    def create(self, request):
        data = request.data
        print(data)

        try:
            new_setting = SystemSetting(
                key = data.get('key'),
                label = data.get("label"),
                value_type = data.get("value_type"),
                value = data.get("value", ""),
                deletable = data.get("deletable")
            )
            new_setting.save()

            return Response(SystemSettingSerializer(new_setting).data, 
                status=status.HTTP_201_CREATED)
        except Exception as m:
            return Response(m, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk = None):
        old_setting = self.get_object()
        data = request.data
        print(data)

        try:
            old_setting.key = data.get('key')
            old_setting.label = data.get("label")
            old_setting.value_type = data.get("value_type")
            old_setting.value = data.get("value", "")
            old_setting.deletable = data.get("deletable")

            old_setting.save()

            return Response(SystemSettingSerializer(old_setting).data, 
                status=status.HTTP_200_OK)
        except Exception as m:
            return Response(m, status=status.HTTP_400_BAD_REQUEST)


class MonitorView(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAdminUser]
    
    def list(self, request):
        return Response(monitor.get_data())


class SystemInfoView(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAdminUser]

    def list(self, request):
        return Response(sys_info.get_data())


def index(request, path=''):
    baseURL = '/' + settings.SITEMONITOR_PATH
    return render(request, 'sitemonitor/index.html', {'base_path': baseURL})


class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def current(self, request):
        if request.user:
            return Response(UserSerializer(request.user).data, 
                status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def is_authenticated(self, request):
        return Response(request.user.is_authenticated)

    @action(detail=False, methods=['post'])
    def login(self, request):
        if request.method == 'GET':
            if request.user.is_authenticated():
                serializer = UserSerializer(request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'POST':
            data = request.data
            username = data.get('username', None)
            password = data.get('password', None)

            try:
                user = User.objects.get(username = username)
            except User.DoesNotExist:
                return Response({
                        'status': 'Unauthorized',
                        'message': 'Account does not exist. Please contact an administrator.'
                    }, status=status.HTTP_400_BAD_REQUEST)

            if username and password:
                auth_user = auth.authenticate(username=username, password=password)
                if auth_user is not None:
                    auth.login(request, auth_user)
                    serialized = UserSerializer(request.user)
                    return Response(serialized.data, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'status': 'Unauthorized',
                        'message': 'Incorrect password'
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'Username/password combination invalid.'
                }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        auth.logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
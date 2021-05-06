from sitemonitor.models import SystemSetting
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


# Serializers define the API representation.
class SystemSettingSerializer(serializers.HyperlinkedModelSerializer):
    value = serializers.SerializerMethodField()

    class Meta:
        model = SystemSetting
        fields = ['id','key', 'label', 'value', 
            'value_type', 'deletable']

    def get_value(self, obj):
        return obj.get_value()
    
class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['username', 'token']

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)

        return token.key
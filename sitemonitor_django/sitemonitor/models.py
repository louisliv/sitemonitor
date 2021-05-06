from django.db import models
from itertools import chain
import json

# Create your models here.

class SystemSetting(models.Model):
    CHAR_TYPE = 'char'
    LIST_TYPE = 'list'
    BOOL_TYPE = 'bool'
    INT_TYPE = 'int'
    FLOAT_TYPE = 'float'
    DICT_TYPE = 'dict'
    TUPLE_TYPE = 'tuple'

    VALUE_TYPE_CHOICES = [
        (CHAR_TYPE, 'char'),
        (LIST_TYPE, 'list'),
        (BOOL_TYPE, 'boolean'),
        (INT_TYPE, 'int'),
        (FLOAT_TYPE, 'float'),
        (DICT_TYPE, 'dict'),
        (TUPLE_TYPE, 'tuple')
    ]

    key = models.CharField(max_length=25)
    label = models.CharField(max_length=50)
    value = models.SlugField(allow_unicode=True, default='')
    value_type = models.CharField(max_length=5, 
        choices=VALUE_TYPE_CHOICES, default=CHAR_TYPE)
    deletable = models.BooleanField(default=True)

    def get_value(self):
        method_name = f"get_{self.value_type}"
        method_to_call = getattr(self, method_name)
        return method_to_call()

    def get_char(self):
        return str(self.value)

    def get_list(self):
        return [int(e) if e.isdigit() else e for e in self.value.split(',')]

    def get_bool(self):
        value_str = self.get_char()

        return True if value_str == "True" else False

    def get_int(self):
        value_str = self.get_char()

        return int(value_str)

    def get_float(self):
        value_str = self.get_char()

        return float(value_str)

    def get_dict(self):
        value_str = self.get_char()

        return json.loads(value_str)

    def get_tuple(self):
        value_str = self.get_char()

        return eval(value_str)

    def save(self, *args, **kwargs):
        self.convert_value()
        super(SystemSetting, self).save(*args, **kwargs)

    def convert_value(self):
        method_name = f"convert_{self.value_type}"
        method_to_call = getattr(self, method_name)
        return method_to_call()

    def convert_char(self):
        self.value = str(self.value)

    def convert_list(self):
        self.value = ",".join([str(x) for x in self.value])

    def convert_bool(self):
        self.value = "True" if self.value else "False"

    def convert_int(self):
        self.value = str(self.value)

    def convert_float(self):
        self.value = str(self.value)

    def convert_dict(self):
        self.value = json.dumps(self.value)

    def convert_tuple(self):
        self.value = ",".join([str(x) for x in self.value])

    def __str__(self):
        return self.label
    
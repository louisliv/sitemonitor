from django.test import TestCase
from sitemonitor.models import SystemSetting

# Create your tests here.
class SystemSettingTestCase(TestCase):
    fixtures=['tests.json']

    def test_get_value(self):
        char_setting = SystemSetting.objects.get(key='test_char')
        list_setting = SystemSetting.objects.get(key='test_list')
        tuple_setting = SystemSetting.objects.get(key='test_tuple')
        true_setting = SystemSetting.objects.get(key='test_true')
        false_setting = SystemSetting.objects.get(key='test_false')
        int_setting = SystemSetting.objects.get(key='test_int')
        float_setting = SystemSetting.objects.get(key='test_float')
        dict_setting = SystemSetting.objects.get(key='test_dict')

        test_value = char_setting.get_value() 
        assert test_value == "test"
        assert isinstance(test_value, str)

        test_value = list_setting.get_value()
        assert test_value == [1, 2, 3]
        assert isinstance(test_value, list)

        test_value = tuple_setting.get_value()
        assert test_value == (1, 2, 3)
        assert isinstance(test_value, tuple)

        test_value = true_setting.get_value() 
        assert test_value is True
        assert isinstance(test_value, bool)

        test_value = false_setting.get_value() 
        assert test_value == False
        assert isinstance(test_value, bool)

        test_value = int_setting.get_value() 
        assert test_value == 3
        assert isinstance(test_value, int)

        test_value = float_setting.get_value()
        assert test_value == 3.5
        assert isinstance(test_value, float)

        test_value = dict_setting.get_value() 
        check_value = {"test1": "test1", "test2": [1,2,3]}
        assert test_value == check_value
        assert isinstance(test_value, dict)

    def test_convert_value(self):
        setting = SystemSetting.objects.create(
            key="test_convert_char",
            label="test convert char",
            value="test",
            value_type=SystemSetting.CHAR_TYPE
        )

        assert setting.value == "test"

        setting = SystemSetting.objects.create(
            key="test_convert_list",
            label="test convert list",
            value=[1,2,3],
            value_type=SystemSetting.LIST_TYPE
        )

        assert setting.value == "1,2,3"

        setting = SystemSetting.objects.create(
            key="test_convert_tuple",
            label="test convert tuple",
            value=(1,2,3),
            value_type=SystemSetting.TUPLE_TYPE
        )

        assert setting.value == "1,2,3"

        setting = SystemSetting.objects.create(
            key="test_convert_true",
            label="test convert true",
            value=True,
            value_type=SystemSetting.BOOL_TYPE
        )

        assert setting.value == "True"

        setting = SystemSetting.objects.create(
            key="test_convert_false",
            label="test convert false",
            value=False,
            value_type=SystemSetting.BOOL_TYPE
        )

        assert setting.value == "False"

        setting = SystemSetting.objects.create(
            key="test_convert_false",
            label="test convert false",
            value=False,
            value_type=SystemSetting.BOOL_TYPE
        )

        assert setting.value == "False"

        setting = SystemSetting.objects.create(
            key="test_convert_int",
            label="test convert int",
            value=3,
            value_type=SystemSetting.INT_TYPE
        )

        assert setting.value == "3"

        setting = SystemSetting.objects.create(
            key="test_convert_float",
            label="test convert float",
            value=3.5,
            value_type=SystemSetting.FLOAT_TYPE
        )

        assert setting.value == "3.5"

        value_to_save = {"test1": "test1", "test2": [1,2,3]}
        setting = SystemSetting.objects.create(
            key="test_convert_dict",
            label="test convert dict",
            value=value_to_save,
            value_type=SystemSetting.DICT_TYPE
        )

        assert setting.value == '{"test1": "test1", "test2": [1, 2, 3]}'

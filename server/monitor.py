import random, json, subprocess, psutil
from datetime import datetime

KEY_VALUES = [
    'cpu_usage',
    'hdd_percent',
    'used_mem',
    'percent_mem',
    'hdd_total',
    'hdd_used',
    'mem_total'
]

class Monitor:
    data={
        'cpu_temps': {}
    }

    def __init__(self):
        for value in KEY_VALUES:
            self.data[value] = None

    def cpu_usage(self):
        cpu_usage = psutil.cpu_percent(interval=2)
        self.data['cpu_usage'] = float(cpu_usage)

    def disk_usage(self):
        disk_usage = psutil.disk_usage('/')

        self.data['hdd_percent'] = disk_usage.percent
        self.data['hdd_total'] = sizeof_fmt(disk_usage.total)
        self.data['hdd_used'] = sizeof_fmt(disk_usage.used)

    def used_mem(self):
        mem_used = psutil.virtual_memory()
        self.data['used_mem'] = sizeof_fmt(mem_used.used)

    def total_mem(self):
        mem_total = psutil.virtual_memory()
        self.data['mem_total'] = sizeof_fmt(
            mem_total.total - mem_total.inactive)

    def percent_mem(self):
        mem_percent = psutil.virtual_memory().percent
        self.data['percent_mem'] = mem_percent

    def get_cpu_temps(self):
        sensors = psutil.sensors_temperatures()

        if (sensors.get('coretemp', None)):
            self.get_standard_temps(sensors['coretemp'])
        else:
            self.get_non_standard_temps(sensors)

    def get_non_standard_temps(self, temps): 
        for temp in temps['k10temp']:
            temp_clone = [
                'CPU', 
                temp[1],
                temp[2],
                temp[3]
            ]
            self.set_temp(temp_clone)

    def get_standard_temps(self, temps):
        for temp in temps:
            if "core" in temp[0].lower():
                self.set_temp(temp)

    def set_temp(self, temp):
        key = temp[0]
        current_temp = {
            'temp': temp[1], 
            'time': datetime.now().strftime("%H:%M:%S")
        }
        high_temp = temp[2]
        critical_temp = temp[3]

        if (self.data['cpu_temps'].get(key, None) and 
            self.data['cpu_temps'][key].get('data', None)):
            current_list = self.data['cpu_temps'][key]['data']
            new_list = current_list[-19:]
            new_list.append(current_temp)
            self.data['cpu_temps'][key]['data'] = new_list
        else:
            self.data['cpu_temps'][key] = {}
            self.data['cpu_temps'][key]['data'] = [current_temp]
            self.data['cpu_temps'][key]['high_temp'] = high_temp
            self.data['cpu_temps'][key]['critical_temp'] = critical_temp
            self.data['cpu_temps'][key]['label'] = key

    def get_data(self):
        self.cpu_usage()
        self.disk_usage()
        self.used_mem()
        self.percent_mem()
        self.total_mem()
        self.get_cpu_temps()

        return self.data

def sizeof_fmt(num, suffix='B'):
    for unit in ['','K','M','G','T','P','E','Z']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Y', suffix)

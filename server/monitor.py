import random, json, subprocess, psutil

KEY_VALUES = [
    'cpu_usage', 
    'cpu_temp', 
    'hdd_percent',
    'used_mem',
    'percent_mem',
    'hdd_total',
    'hdd_used',
    'mem_total'
]

class Monitor:
    data={}

    def __init__(self):
        for value in KEY_VALUES:
            self.data[value] = None

    def cpu_usage(self):
        cpu_usage = psutil.cpu_percent(interval=2)
        self.data['cpu_usage'] = float(cpu_usage)

    def cpu_temp(self):
        temps = psutil.sensors_temperatures()

        self.data['cpu_temp'] = temps

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

    def get_data(self):
        self.cpu_usage()
        self.cpu_temp()
        self.disk_usage()
        self.used_mem()
        self.percent_mem()
        self.total_mem()

        return self.data

def sizeof_fmt(num, suffix='B'):
    for unit in ['','K','M','G','T','P','E','Z']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Y', suffix)

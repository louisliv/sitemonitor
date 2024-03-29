import random, json, subprocess, psutil
from datetime import datetime
from sitemonitor.models import SystemSetting

KEY_VALUES = [
    "cpu_usage",
    "hdd_percent",
    "used_mem",
    "percent_mem",
    "hdd_total",
    "hdd_used",
    "mem_total",
]

MOUNT_POINTS_TO_SKIP = ["/boot", "/snap"]


class Monitor:
    data = {"cpu_temps": {}}

    def __init__(self):
        for value in KEY_VALUES:
            self.data[value] = None

    def cpu_usage(self):
        cpu_usage = psutil.cpu_percent(interval=2)
        self.data["cpu_usage"] = float(cpu_usage)

    def disk_usage(self):
        disks = {}

        partitions = psutil.disk_partitions()

        for partition in partitions:
            # Skip the specified mount points
            if [x for x in MOUNT_POINTS_TO_SKIP if x in partition.mountpoint]:
                continue

            disk_usage = psutil.disk_usage(partition.mountpoint)
            disks[partition.mountpoint] = {
                "percent": disk_usage.percent,
                "total": disk_usage.total,
                "used": disk_usage.used,
            }

        self.data["disks"] = disks

    def used_mem(self):
        mem_used = psutil.virtual_memory()
        self.data["used_mem"] = sizeof_fmt(mem_used.used)

    def total_mem(self):
        mem_total = psutil.virtual_memory()
        self.data["mem_total"] = sizeof_fmt(mem_total.total)

    def percent_mem(self):
        mem_percent = psutil.virtual_memory().percent
        self.data["percent_mem"] = mem_percent

    def get_cpu_temps(self):
        temp_key_setting = SystemSetting.objects.get(key="cpu_temp_key")
        temps = psutil.sensors_temperatures()[temp_key_setting.value]

        for temp in temps:
            key = temp[0] if temp[0] else temp_key_setting.value
            current_temp = {
                "temp": temp[1],
                "time": datetime.now().strftime("%H:%M:%S"),
            }
            high_temp = temp[3]

            if self.data["cpu_temps"].get(key, None) and self.data["cpu_temps"][
                key
            ].get("data", None):
                current_list = self.data["cpu_temps"][key]["data"]
                new_list = current_list[-19:]
                new_list.append(current_temp)
                self.data["cpu_temps"][key]["data"] = new_list
            else:
                self.data["cpu_temps"][key] = {}
                self.data["cpu_temps"][key]["data"] = [current_temp]
                self.data["cpu_temps"][key]["high_temp"] = high_temp
                self.data["cpu_temps"][key]["label"] = key

    def get_data(self):
        self.cpu_usage()
        self.disk_usage()
        self.used_mem()
        self.percent_mem()
        self.total_mem()
        self.get_cpu_temps()

        return self.data


def sizeof_fmt(num, suffix="B"):
    for unit in ["", "K", "M", "G", "T", "P", "E", "Z"]:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, "Y", suffix)

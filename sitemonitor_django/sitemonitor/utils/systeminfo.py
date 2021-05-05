from cpuinfo import get_cpu_info
import psutil, csv

KEY_VALUES = [
    'CPU', 
    'Architecture', 
    'CPU Count',
    'Thread Count',
    'OS'
]

class SystemInfo:
    data={}

    def __init__(self):
        for value in KEY_VALUES:
            self.data[value] = None

    def set_sys_info(self):
        sysinfo = get_cpu_info()

        self.data['CPU'] = sysinfo['brand_raw']
        self.data['Architecture'] = sysinfo['arch']
        self.data['CPU Count'] = psutil.cpu_count(logical=False)
        self.data['Thread Count'] = psutil.cpu_count()
        self.data['OS'] = self.get_os()

    def get_os(self):
        RELEASE_DATA = {}
        with open("/etc/os-release") as f:
            reader = csv.reader(f, delimiter="=")
            for row in reader:
                if row:
                    RELEASE_DATA[row[0]] = row[1]
        if RELEASE_DATA["ID"] in ["debian", "raspbian"]:
            with open("/etc/debian_version") as f:
                DEBIAN_VERSION = f.readline().strip()
            major_version = DEBIAN_VERSION.split(".")[0]
            version_split = RELEASE_DATA["VERSION"].split(" ", maxsplit=1)
            if version_split[0] == major_version:
                # Just major version shown, replace it with the full version
                RELEASE_DATA["VERSION"] = " ".join([DEBIAN_VERSION] + version_split[1:])
        return "{} {}".format(RELEASE_DATA["NAME"], RELEASE_DATA["VERSION"])

    def get_data(self):
        self.set_sys_info()

        return self.data
        
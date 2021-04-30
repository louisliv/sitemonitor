from flask import Flask, jsonify
from monitor import Monitor
from systeminfo import SystemInfo
from flask_cors import CORS
import waitress

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

monitor = Monitor()
system_info = SystemInfo()

@app.route('/monitor')
def get_monitor():
    return jsonify(monitor.get_data())

@app.route('/sysinfo')
def get_system_info():
    return jsonify(system_info.get_data())

if __name__ == "__main__":
    waitress.serve(app, host='0.0.0.0', port=5000)
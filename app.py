import json
import random
import socket
import sqlite3
import time

# Config
UDP_IP = "127.0.0.1"
UDP_PORT = 5005


def main():
    while True:
        send_payload()
        time.sleep(10)


def send_payload():
    payload = {
        "actual_download_speed": get_actual_download_speed(),
        "actual_upload_speed": get_actual_upload_speed(),
        "advertised_download_speed": get_advertised_download_speed(),
        "advertised_upload_speed": get_advertised_upload_speed(),
        "uptime": get_uptime(),
        "network_usage": get_network_usage(),
        "connected_devices": get_connected_devices(),
        "disconnected_devices": get_disconnected_devices()
    }

    payload = json.dumps(payload)

    print(payload)

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(payload, (UDP_IP, UDP_PORT))


def get_actual_download_speed():
    result = 5
    return result


def get_advertised_download_speed():
    result = 30
    return result


def get_advertised_upload_speed():
    result = 5
    return result


def get_actual_upload_speed():
    result = 1
    return result


def get_advertised_upload_speed():
    result = 5
    return result


def get_uptime():
    # Return uptime in milliseconds to parse into human-friendly relative time
    result = 1000
    return result


def get_network_usage():
    # Return network usage as a percentage of total capacity
    result = 50
    return result


def get_connected_devices():
    # TODO: Get products connected to the network

    result = []

    # DEMO CODE START
    test_device_1 = {
        "label": "Steve's Tablet",
        "type": "tablet",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    test_device_2 = {
        "label": "Jill's Laptop",
        "type": "laptop",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    result.append(test_device_1)
    result.append(test_device_2)
    # DEMO CODE END

    return result


def get_disconnected_devices():
    # TODO: Work out what devices are usually connected, but not connected now
    result = []

    # DEMO CODE START
    test_device_1 = {
        "label": "Living Room",
        "type": "tv",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    result.append(test_device_1)
    # DEMO CODE END

    return result

if __name__ == "__main__":
    main()

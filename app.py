import json
import socket
import time

# Config
UDP_IP = "127.0.0.1"
UDP_PORT = 5005

def main():
    print("Python daemon started")

    while True:
        print("Payload sent")
        time.sleep(2)

def send_payload():
    payload = {
        "download_speed": get_download_speed(),
        "upload_speed": get_upload_speed(),
        "uptime": get_uptime(),
        "network_usage": get_network_usage(),
        "connected_devices": get_connected_devices(),
        "disconnected_devices": get_disconnected_devices()
    }

    payload = json.dumps(payload)

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(payload, (UDP_IP, UDP_PORT))


def get_download_speed():
    result = 11
    return result

def get_upload_speed():
    result = 1
    return result

def get_uptime():
    result = 10
    return result

def get_network_usage():
    result = 62
    return result

def get_connected_devices():
    # TODO: Get products connected to the network

    result = []

    test_device_1 = {
        "label": "Ian's iPhone",
        "type": "phone",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    test_device_2 = {
        "label": "Ian's Tablet",
        "type": "tablet",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    test_device_3 = {
        "label": "Phil's Laptop",
        "type": "laptop",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    result.append(test_device_1)
    result.append(test_device_2)
    result.append(test_device_3)

    return result

def get_disconnected_devices():
    result = []

    test_device_1 = {
        "label": "Living Room",
        "type": "tv",
        "mac_address": "AB:CD:EF:01:23:45"
    }

    result.append(test_device_1)

    return result

if __name__ == "__main__":
    main()

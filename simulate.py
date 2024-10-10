import random
import requests
import json
from datetime import datetime

# List of devices and their corresponding parking bays
devices = ["MPC_1", "MPC_2", "MPC_3", "MPC_4", "MPC_5"]
spaces = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"]

# Number of days to simulate
days_to_simulate = 7

# Function to generate random license plate
def generate_license_plate():
    return f"W{random.randint(1000, 9999)}L"

# Function to generate random vehicle color
def generate_vehicle_color():
    colors = ["Black", "White", "Red", "Gray", "Blue", "Green"]
    return random.choice(colors)

# Function to generate random vehicle brand
def generate_vehicle_brand():
    brands = ["Toyota", "Honda", "Ford", "Nissan", "BMW", "Audi"]
    return random.choice(brands)

# Function to simulate sending parking data for a day
def simulate_day(day):
    for hour in range(10, 24):
        is_peak_time = 18 <= hour <= 21
        num_events = random.randint(100, 150) if is_peak_time else random.randint(30, 60)

        for _ in range(num_events):
            occupancy = random.randint(0, 1)
            minute = random.randint(0, 59)
            time = datetime(year=2024, month=10, day=day, hour=hour, minute=minute).strftime("%Y-%m-%d %H:%M:%S")
            device = random.choice(devices)
            space = spaces[devices.index(device)]

            # Prepare vehicle data if occupied
            data = {
                "device": device,
                "time": time,
                "space_name": space,
                "occupancy": occupancy,
                "duration": 0,
            }
            if occupancy == 1:
                data.update({
                    "License Plate": generate_license_plate(),
                    "Vehicle Type": "Car",
                    "Vehicle Color": generate_vehicle_color(),
                    "Vehicle Brand": generate_vehicle_brand()
                })
            else:
                data.update({
                    "License Plate": "-",
                    "Vehicle Type": "-",
                    "Vehicle Color": "-",
                    "Vehicle Brand": "-"
                })

            # Send data using requests
            try:
                response = requests.post(
                    "http://localhost:5000/api/bay-status-update",
                    headers={"Content-Type": "application/json"},
                    data=json.dumps(data)
                )

                if response.status_code == 200:
                    print(f"Sent data for device: {device}, time: {time}")
                else:
                    print(f"Failed to send data for device: {device}, time: {time}, response: {response.text}")

            except requests.exceptions.RequestException as e:
                print(f"Error sending data for device: {device}, time: {time}, error: {str(e)}")

# Simulate multiple days
for day in range(1, days_to_simulate + 1):
    print(f"Simulating day {day}...")
    simulate_day(day)

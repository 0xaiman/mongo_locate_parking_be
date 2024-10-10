// This code seeds the database with list of devices and parkinbays
// into MongoDB. This is so that value other than the listed can be handled as error

import mongoose from "mongoose";
import deviceModels from "../models/device.models.js";
import parkingBayModels from "../models/parkingBay.models.js";
import dotenv from "dotenv";

dotenv.config();

async function seedDatabase() {
  try {
    const parkingBayCount = await parkingBayModels.countDocuments();
    const deviceCount = await deviceModels.countDocuments();
    if (!parkingBayCount && !deviceCount) {
      await mongoose.connect(process.env.MONGODB_URL);

      // Example parking bay data for 5 IoT Devices

      const devices = [
        { device_id: "MPC_1" },
        { device_id: "MPC_2" },
        { device_id: "MPC_3" },
        { device_id: "MPC_4" },
        { device_id: "MPC_5" },
      ];

      const insertedDevices = await deviceModels.insertMany(devices);
      const deviceIds = insertedDevices.map((device) => device._id);

      // Example parking bay data for 5 parking bays
      const parkingBays = [
        { bay_id: "B1", status: "vacant", device: deviceIds[0] },
        { bay_id: "B2", status: "vacant", device: deviceIds[1] },
        { bay_id: "B3", status: "vacant", device: deviceIds[2] },
        { bay_id: "B4", status: "vacant", device: deviceIds[3] },
        { bay_id: "B5", status: "vacant", device: deviceIds[4] },
      ];

      await parkingBayModels.insertMany(parkingBays);
      console.log("Databse seeded succesfully");
      console.log("Inserted device IDs:", deviceIds);
    } else {
      console.log("Database already seeded");
    }
  } catch (error) {
    console.log("Error is Seeding Database", error);
  }
}

export default seedDatabase;

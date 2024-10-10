import express from "express";
import ParkingLog from "../models/parkingLogs.models.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("express app - Locate Parking BE is running");
});

//End point that receives request from IoT devices, process then store in DB
// TODO: Image handling, pending decision on what database to use
router.post("/api/bay-status-update", async (req, res) => {
  console.log("bay update OK");
  try {
    let data = req.body;
    let device = data.device;
    let time = data.time;
    let bay_name = data.space_name;
    let occupancy = data.occupancy;
    let duration = data.duration;
    let license_plate = data["License Plate"];
    let vehicle_type = data["Vehicle Type"];
    let vehicle_color = data["Vehicle Color"];
    let vehicle_brand = data["Vehicle Brand"];

    const parkingLog = new ParkingLog({
      device: device,
      time: time,
      bay_name: bay_name,
      occupancy: occupancy,
      duration: duration,
      license_plate: license_plate,
      vehicle_type: vehicle_type,
      vehicle_color: vehicle_color,
      vehicle_brand: vehicle_brand,
    });

    await parkingLog.save();

    res
      .status(201)
      .json({ message: "Parking log entry created successfully." });
  } catch (error) {
    console.error("Error updating parking bay status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/find-my-car", async (req, res) => {
  // Pseudo code:
  // 1.Retrieving the license plate from the request body (req.body.license_plate).
  // 2.Using the ParkingLog.findOne() method to search for the document where the license_plate matches the value provided.
  // 3.Returning the found document in the response.
  const plateRequested = req.body.license_plate;
  console.log("Find my car ok");
  console.log("Plate entered", plateRequested);

  try {
    const response = await ParkingLog.findOne({
      license_plate: plateRequested,
    }).sort({ time: -1 });
    if (response) {
      const bay = response.bay_name;
      const area = response.area || "Basement";
      const time = response.time;

      res.status(200).json({
        message: `${plateRequested} found`,
        licensePlate: plateRequested,
        bay: bay,
        area: area,
        time: time,
        found: true,
      });
    } else {
      res.status(200).json({
        message: `${plateRequested} not found in record`,
        found: false,
      });
    }
  } catch (error) {
    console.log("Error Fetching License Plate from Database :", error);
  }
});

export default router;

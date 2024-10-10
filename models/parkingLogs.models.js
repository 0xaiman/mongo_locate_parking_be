import mongoose from "mongoose";

const parkingLogSchema = new mongoose.Schema(
  {
    device: { type: String, required: true },
    time: { type: Date, required: true },
    bay_name: { type: String, required: true },
    occupancy: { type: Number, required: true },
    duration: { type: Number, required: true },
    license_plate: { type: String, required: true },
    vehicle_type: { type: String, required: true },
    vehicle_color: { type: String, required: true },
    vehicle_brand: { type: String, default: "-" },
  },
  { collection: "parking_logs" }
);

export default mongoose.model("ParkingLog", parkingLogSchema);

import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  lisence_plate: { type: String, required: true, unique: true },
  parking_bay: {
    type: mongoose.Schema.ObjectId,
    ref: "ParkingBay",
    default: null,
  },
  vehicle_color: { type: String },
});

export default mongoose.model("Vehicle", vehicleSchema);

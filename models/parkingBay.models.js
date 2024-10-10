import mongoose from "mongoose";

const parkingBaySchema = new mongoose.Schema(
  {
    bay_id: { type: String, required: true, unique: true },
    status: { type: String, enum: ["vacant", "occupied"], default: "vacant" },
    vehicle: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle",
      default: null,
    },
    device: { type: String, required: true, unique: true },
  },
  { collection: "parkingbays" }
);

export default mongoose.model("ParkingBay", parkingBaySchema);

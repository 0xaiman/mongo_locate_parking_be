import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  device_id: { type: String, required: true, unique: true },
  parking_bay: { type: String, required: true, unique: true },
});

export default mongoose.model("Device", deviceSchema);

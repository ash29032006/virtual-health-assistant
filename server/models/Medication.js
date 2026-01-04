import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  timeToTake: { type: String, required: true },
  notes: { type: String },
  lastTaken: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Medication = mongoose.model("Medication", medicationSchema);
export default Medication;

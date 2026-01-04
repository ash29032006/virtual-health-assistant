import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Medication from "./models/Medication.js";

const app = express();

// Updated CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Add error logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB Connection with better error handling
mongoose
  .connect("mongodb://127.0.0.1:27017/medicine-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Medicine Tracker API is running" });
});

// Updated medications route with better error handling
app.get("/api/medications", async (req, res) => {
  try {
    const medications = await Medication.find().sort({ createdAt: -1 });
    console.log("Fetched medications:", medications);
    res.json(medications);
  } catch (error) {
    console.error("Error fetching medications:", error);
    res.status(500).json({
      message: "Failed to fetch medications",
      error: error.message,
    });
  }
});

app.post("/api/medications", async (req, res) => {
  try {
    const medication = new Medication(req.body);
    const newMedication = await medication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/medications/:id", async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.json(medication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/medications/:id", async (req, res) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a test route to verify API is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/`);
});

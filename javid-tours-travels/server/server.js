import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import dns from "dns";

dotenv.config();   // ✅ MUST BE FIRST

const app = express();

app.use(cors());
app.use(express.json());

// Force IPv4
dns.setDefaultResultOrder("ipv4first");

const mongoUri = process.env.MONGO_URI;

if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.log("MongoDB unavailable. Using local fallback storage for bookings.");
      console.log(err.message);
    });
} else {
  console.log("MONGO_URI not set. Using local fallback storage for bookings.");
}

app.use("/api", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
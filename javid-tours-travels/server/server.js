import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import dns from "dns";

dotenv.config();   // ✅ MUST BE FIRST

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://exquisite-hummingbird-439c9a.netlify.app"
];

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = configuredOrigins.length > 0
  ? configuredOrigins
  : defaultAllowedOrigins;

function isTrustedNetlifyPreview(origin = "") {
  // Supports preview URLs like:
  // https://<hash>--exquisite-hummingbird-439c9a.netlify.app
  // https://<hash>-exquisite-hummingbird-439c9a.netlify.app
  return /^https:\/\/[a-z0-9-]+-{1,2}exquisite-hummingbird-439c9a\.netlify\.app$/i.test(origin);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || isTrustedNetlifyPreview(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));
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

const port = Number(process.env.PORT) || 5000;
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
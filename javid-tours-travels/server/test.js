import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected Successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Connection Failed");
    console.error(err);
    process.exit();
  });
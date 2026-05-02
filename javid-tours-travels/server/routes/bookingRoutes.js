import express from "express";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFilePath = path.join(__dirname, "..", "data", "bookings-fallback.json");


// ================= EMAIL FUNCTION (BREVO SMTP) =================

async function sendBookingEmails(booking) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const submittedAt = new Date(booking.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    // 📩 CUSTOMER EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: booking.email,
      subject: "We received your inquiry - Javid Tours",
      html: `
        <h2>Thank you for contacting Javid Tours</h2>
        <p>We received your inquiry and will contact you soon.</p>
        <hr/>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Message:</b> ${booking.message || "No message"}</p>
      `
    });

    // 📩 OWNER EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.BOOKING_OWNER_EMAIL,
      subject: `New Booking from ${booking.name}`,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Message:</b> ${booking.message || "No message"}</p>
        <p><b>Submitted:</b> ${submittedAt}</p>
      `,
      replyTo: booking.email
    });

    console.log("✅ Emails sent via Brevo");

  } catch (error) {
    console.log("❌ Email failed:", error.message);
  }
}


// ================= FALLBACK STORAGE =================

async function saveBookingToFallback(booking) {
  const fallbackDir = path.dirname(fallbackFilePath);
  await mkdir(fallbackDir, { recursive: true });

  let existing = [];
  try {
    const data = await readFile(fallbackFilePath, "utf8");
    existing = JSON.parse(data);
  } catch {}

  existing.push(booking);
  await writeFile(fallbackFilePath, JSON.stringify(existing, null, 2));
}


// ================= ROUTE =================

router.post("/book", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const bookingPayload = {
      name,
      phone,
      email: email.toLowerCase(),
      message,
      createdAt: new Date().toISOString()
    };

    // Save to DB or fallback
    if (mongoose.connection.readyState === 1) {
      const newBooking = new Booking(bookingPayload);
      await newBooking.save();
    } else {
      await saveBookingToFallback(bookingPayload);
    }

    // Send emails (non-blocking)
    sendBookingEmails(bookingPayload);

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;
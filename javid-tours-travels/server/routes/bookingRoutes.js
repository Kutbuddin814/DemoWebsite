import express from "express";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFilePath = path.join(__dirname, "..", "data", "bookings-fallback.json");

// ================= EMAIL TEMPLATES (UI/UX ENHANCED) =================

const BRAND_COLOR = "#0f172a"; // Sophisticated Navy
const ACCENT_COLOR = "#3b82f6"; // Trustworthy Blue

const getEmailLayout = (content) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: ${BRAND_COLOR}; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">JAVID TOURS</h1>
    </div>
    <div style="padding: 32px; background-color: #ffffff;">
      ${content}
    </div>
    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #64748b;">
        © ${new Date().getFullYear()} Javid Tours. All rights reserved. <br>
        This is an automated notification regarding your travel inquiry.
      </p>
    </div>
  </div>
`;

// ================= EMAIL FUNCTION (BREVO SMTP) =================

async function sendBookingEmails(booking) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const ownerEmail = process.env.BOOKING_OWNER_EMAIL;

    const submittedAt = new Date(booking.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    // CUSTOMER EMAIL UI
    const customerHtml = getEmailLayout(`
      <h2 style="color: ${BRAND_COLOR}; margin-top: 0;">Hello ${booking.name},</h2>
      <p>Thank you for choosing <strong>Javid Tours</strong>. We have received your inquiry and our team is already working on crafting the perfect itinerary for you.</p>
      <div style="margin: 24px 0; padding: 16px; background-color: #f1f5f9; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: ${BRAND_COLOR};">What happens next?</p>
        <p style="margin: 8px 0 0 0; font-size: 14px;">One of our travel consultants will contact you via phone or email within the next 24 hours.</p>
      </div>
      <p>Need immediate assistance? Just reply to this email.</p>
      <div style="margin-top: 32px;">
        <a href="https://yourwebsite.com" style="background-color: ${ACCENT_COLOR}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Visit Our Website</a>
      </div>
    `);

    // OWNER EMAIL UI
    const ownerHtml = getEmailLayout(`
      <h2 style="color: ${BRAND_COLOR}; margin-top: 0;">New Booking Lead 🚀</h2>
      <p>You have a new inquiry from the website. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Customer Name</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${booking.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Phone Number</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600;"><a href="tel:${booking.phone}" style="color: ${ACCENT_COLOR}; text-decoration: none;">${booking.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Email Address</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${booking.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Submitted On</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${submittedAt}</td>
        </tr>
      </table>
      <div style="padding: 16px; background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; font-weight: 600; color: #92400e;">Message/Requirements:</p>
        <p style="margin: 8px 0 0 0; color: #b45309; white-space: pre-line;">${booking.message || "No specific message provided."}</p>
      </div>
      <div style="margin-top: 32px; text-align: center;">
        <a href="mailto:${booking.email}" style="background-color: ${BRAND_COLOR}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reply to Customer</a>
      </div>
    `);

    // Execute API Calls
    const sendRequest = (to, subject, html) => axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Javid Tours", email: ownerEmail },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
      },
      { headers: { "api-key": apiKey, "Content-Type": "application/json" } }
    );

    await Promise.all([
      sendRequest(booking.email, "Exploring awaits! We received your inquiry - Javid Tours", customerHtml),
      sendRequest(ownerEmail, `New Booking Request: ${booking.name}`, ownerHtml)
    ]);

    console.log("✅ Professional emails sent successfully");

  } catch (error) {
    console.error("❌ Email API failed:", error.response?.data || error.message);
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
  } catch {
    existing = [];
  }

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
        message: "Please provide your name, phone, and email."
      });
    }

    const bookingPayload = {
      name,
      phone,
      email: email.toLowerCase(),
      message,
      createdAt: new Date().toISOString()
    };

    // DB logic
    if (mongoose.connection.readyState === 1) {
      const newBooking = new Booking(bookingPayload);
      await newBooking.save();
    } else {
      await saveBookingToFallback(bookingPayload);
    }

    // Fire-and-forget emails
    sendBookingEmails(bookingPayload);

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully! We will contact you soon."
    });

  } catch (error) {
    console.error("Booking Route Error:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred."
    });
  }
});

export default router;
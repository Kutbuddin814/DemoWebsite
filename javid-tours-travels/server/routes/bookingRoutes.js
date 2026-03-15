import express from "express";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFilePath = path.join(__dirname, "..", "data", "bookings-fallback.json");
const logoFilePath = path.join(__dirname, "..", "..", "frontend", "src", "assets", "Logo.png");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderDetailRows(booking) {
  const details = [
    ["Name", booking.name],
    ["Phone", booking.phone],
    ["Email", booking.email],
    ["Message", booking.message || "No additional message provided."],
    ["Submitted", booking.submittedAt]
  ];

  return details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 12px 14px; width: 140px; color: #4d675f; font-weight: 700; border-bottom: 1px solid #e3ece9; vertical-align: top;">${escapeHtml(label)}</td>
          <td style="padding: 12px 14px; color: #17332e; border-bottom: 1px solid #e3ece9;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");
}

function renderEmailShell({ eyebrow, title, intro, accentText, booking, footerText, actionLabel, actionHref }) {
  const actionMarkup = actionLabel && actionHref
    ? `
      <div style="margin-top: 24px;">
        <a href="${actionHref}" style="display: inline-block; padding: 12px 22px; border-radius: 999px; background: #ffcc00; color: #102825; text-decoration: none; font-weight: 700;">${escapeHtml(actionLabel)}</a>
      </div>
    `
    : "";

  return `
    <div style="margin: 0; padding: 0; background: #edf6f3; font-family: Arial, Helvetica, sans-serif; color: #17332e;">
      <div style="max-width: 680px; margin: 0 auto; padding: 32px 18px;">
        <div style="border-radius: 24px; overflow: hidden; background: #ffffff; box-shadow: 0 20px 45px rgba(0, 56, 46, 0.12); border: 1px solid #d9e7e2;">
          <div style="padding: 26px 30px; background: linear-gradient(135deg, #063a32 0%, #0a5b4c 100%); color: #ffffff; text-align: center;">
            <div style="width: 132px; height: 132px; margin: 0 auto 14px; border-radius: 999px; background: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);">
              <img src="cid:javid-logo" alt="Javid Tours and Travels" style="width: 104px; max-width: 100%; height: auto; display: block; filter: brightness(0) invert(1);" />
            </div>
            <div style="font-size: 12px; letter-spacing: 1.6px; text-transform: uppercase; opacity: 0.84; font-weight: 700;">${escapeHtml(eyebrow)}</div>
            <h1 style="margin: 10px 0 8px; font-size: 32px; line-height: 1.15;">${escapeHtml(title)}</h1>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #dbf0ea;">${escapeHtml(intro)}</p>
          </div>

          <div style="padding: 28px 30px 30px; background: linear-gradient(180deg, #ffffff 0%, #f7fbfa 100%);">
            <div style="margin-bottom: 18px; padding: 14px 16px; border-left: 4px solid #ffcc00; background: #fff8db; border-radius: 12px; color: #5e4a00; font-size: 14px; font-weight: 700;">
              ${escapeHtml(accentText)}
            </div>

            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #dfeae6; border-radius: 16px; overflow: hidden;">
              ${renderDetailRows(booking)}
            </table>

            ${actionMarkup}

            <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e3ece9; font-size: 14px; line-height: 1.7; color: #547068;">
              ${escapeHtml(footerText)}<br />
              WhatsApp: 9767856773
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createMailTransport() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
}

async function sendBookingEmails(booking) {
  const transport = createMailTransport();
  const ownerEmail = process.env.BOOKING_OWNER_EMAIL;
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!transport || !ownerEmail || !fromEmail) {
    return {
      sent: false,
      reason: "Email settings are not configured"
    };
  }

  const submittedAt = new Date(booking.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const bookingSummary = {
    ...booking,
    submittedAt
  };

  const customerHtml = renderEmailShell({
    eyebrow: "Javid Tours and Travels",
    title: "Your Booking Inquiry Is Confirmed",
    intro: "Thank you for reaching out. Our team has received your travel request and will contact you shortly with the next steps.",
    accentText: "We have safely received your inquiry details.",
    booking: bookingSummary,
    footerText: "If you need urgent assistance, reply to this email or message us on WhatsApp.",
    actionLabel: "Chat on WhatsApp",
    actionHref: "https://wa.me/919767856773"
  });

  const ownerHtml = renderEmailShell({
    eyebrow: "New Website Booking",
    title: "A New Inquiry Has Arrived",
    intro: "A customer submitted a fresh booking inquiry from the website contact form.",
    accentText: "Please review the enquiry and contact the customer soon.",
    booking: bookingSummary,
    footerText: "This notification was generated automatically from the Javid Tours website.",
    actionLabel: `Reply to ${booking.name}`,
    actionHref: `mailto:${encodeURIComponent(booking.email)}`
  });

  let attachments = [];
  try {
    await access(logoFilePath);
    attachments = [
      {
        filename: "javid-logo.png",
        path: logoFilePath,
        cid: "javid-logo"
      }
    ];
  } catch {
    attachments = [];
  }

  await Promise.all([
    transport.sendMail({
      from: fromEmail,
      to: booking.email,
      subject: "We received your Javid Tours inquiry",
      html: customerHtml,
      attachments
    }),
    transport.sendMail({
      from: fromEmail,
      to: ownerEmail,
      replyTo: booking.email,
      subject: `New website booking from ${booking.name}`,
      html: ownerHtml,
      attachments
    })
  ]);

  return { sent: true };
}

async function saveBookingToFallback(booking) {
  const fallbackDir = path.dirname(fallbackFilePath);
  await mkdir(fallbackDir, { recursive: true });

  let existingBookings = [];
  try {
    const existing = await readFile(fallbackFilePath, "utf8");
    existingBookings = JSON.parse(existing);
    if (!Array.isArray(existingBookings)) {
      existingBookings = [];
    }
  } catch {
    existingBookings = [];
  }

  existingBookings.push(booking);
  await writeFile(fallbackFilePath, JSON.stringify(existingBookings, null, 2), "utf8");
}

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

    if (mongoose.connection.readyState === 1) {
      const newBooking = new Booking(bookingPayload);
      await newBooking.save();
    } else {
      await saveBookingToFallback(bookingPayload);
    }

    let emailStatus = { sent: false };
    try {
      emailStatus = await sendBookingEmails(bookingPayload);
    } catch (emailError) {
      console.error("Booking email send failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: emailStatus.sent
        ? "Inquiry received successfully"
        : "Inquiry saved successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit inquiry right now"
    });
  }
});

export default router;
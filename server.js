const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!message) {
    return res.status(400).json({ ok: false, error: "Message is required" });
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: "emmizokwizera@gmail.com",
    subject: `Portfolio contact from ${name || "Anonymous"}`,
    text: `From: ${name || "Anonymous"}\nEmail: ${
      email || "N/A"
    }\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (err) {
    console.error("Error sending email", err);
    res
      .status(500)
      .json({ ok: false, error: "Failed to send email. Check server logs." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Email API server listening on port ${PORT}`);
});



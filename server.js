require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static(PUBLIC_DIR));

const required = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "TO_EMAIL"];
const missing = required.filter(k => !process.env[k]);
if (missing.length) console.warn("Missing environment variables:", missing.join(", "));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

function clean(value, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

app.post("/api/contact", async (req, res) => {
  try {
    const name = clean(req.body.name, 100);
    const company = clean(req.body.company, 150);
    const email = clean(req.body.email, 180);
    const service = clean(req.body.service, 120);
    const message = clean(req.body.message, 4000);

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in your name, email and requirement." });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return res.status(400).json({ message: "Please enter a valid email address." });

    await transporter.sendMail({
      from: `"HYDUP Website" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New HYDUP Technology enquiry — ${name}`,
      text:
`NEW WEBSITE ENQUIRY

Name: ${name}
Company: ${company || "-"}
Email: ${email}
Service: ${service || "-"}

Requirement:
${message}
`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px">
          <h2 style="color:#176ff0">New HYDUP Technology Enquiry</h2>
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Service:</b> ${escapeHtml(service || "-")}</p>
          <hr>
          <p><b>Requirement:</b></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>`
    });

    res.json({ ok: true, message: "Enquiry sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "We couldn't send your enquiry right now. Please try again." });
  }
});

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

app.get("*", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));

app.listen(PORT, () => console.log(`HYDUP Technology running on http://localhost:${PORT}`));

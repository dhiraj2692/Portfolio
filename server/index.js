require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const gmailUser = process.env.GMAIL_USER?.trim();
const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
const mailTransporter =
  gmailUser && gmailPassword
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        auth: { user: gmailUser, pass: gmailPassword },
      })
    : null;
let smtpStatus = mailTransporter ? "checking" : "not_configured";

if (mailTransporter) {
  const smtpVerificationTimer = setTimeout(() => {
    smtpStatus = "connection_timeout";
    console.error("Gmail SMTP connection verification timed out.");
  }, 15000);
  mailTransporter
    .verify()
    .then(() => {
      clearTimeout(smtpVerificationTimer);
      smtpStatus = "ready";
      console.log("Gmail SMTP connection verified.");
    })
    .catch((error) => {
      clearTimeout(smtpVerificationTimer);
      smtpStatus = error.code || "unavailable";
      console.error("Gmail SMTP connection verification failed:", {
        code: error.code,
        responseCode: error.responseCode,
        command: error.command,
      });
    });
}
app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  }),
);
app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin && origin === clientUrl) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }
  if (req.method === "OPTIONS")
    return res.sendStatus(origin === clientUrl ? 204 : 403);
  next();
});
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (_req, res) =>
  res.json({
    status: "ok",
    mailConfigured: Boolean(mailTransporter),
    smtpStatus,
  }),
);
app.post(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many messages sent. Please try again later." },
  }),
  async (req, res) => {
    const { name, email, subject, message } = req.body || {};
    const clean = (value) => (typeof value === "string" ? value.trim() : "");
    const data = {
      name: clean(name),
      email: clean(email),
      subject: clean(subject),
      message: clean(message),
    };
    if (Object.values(data).some((value) => !value))
      return res.status(400).json({ error: "Please complete every field." });
    if (data.name.length < 2 || data.name.length > 100)
      return res
        .status(400)
        .json({ error: "Name must be between 2 and 100 characters." });
    if (data.subject.length < 3 || data.subject.length > 150)
      return res
        .status(400)
        .json({ error: "Subject must be between 3 and 150 characters." });
    if (data.message.length < 10 || data.message.length > 5000)
      return res
        .status(400)
        .json({ error: "Message must be between 10 and 5000 characters." });
    if (
      data.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    )
      return res
        .status(400)
        .json({ error: "Please provide a valid email address." });
    if (!mailTransporter)
      return res.status(503).json({
        error:
          "Contact messaging is not configured yet. Please try again later.",
      });
    try {
      await mailTransporter.sendMail({
        from: `Portfolio contact <${gmailUser}>`,
        to: gmailUser,
        replyTo: { name: data.name, address: data.email },
        subject: `[Portfolio] ${data.subject.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      });
      return res.status(200).json({ message: "Message sent successfully." });
    } catch (error) {
      console.error("Contact email delivery failed:", {
        code: error.code,
        responseCode: error.responseCode,
        command: error.command,
        message: error.message,
      });
      const networkCodes = ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "EDNS"];
      const errorMessage =
        error.code === "EAUTH"
          ? "Gmail rejected authentication. Check the Gmail address and App Password in the server environment."
          : networkCodes.includes(error.code)
            ? "The server could not connect to Gmail. Check outbound SMTP access and try again."
            : "Email delivery failed. Please try again later.";
      return res.status(502).json({
        error: errorMessage,
      });
    }
  },
);
app.use("/api", (_req, res) =>
  res.status(404).json({ error: "API route not found." }),
);
const dist = path.join(__dirname, "..", "dist");
if (fs.existsSync(path.join(dist, "index.html"))) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  console.error("Unhandled request error:", error.message);
  return res.status(error.status || 500).json({
    error: "The server could not process this request. Please try again later.",
  });
});
app.listen(port, () => console.log(`Portfolio API listening on port ${port}`));

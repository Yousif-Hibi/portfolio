import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;

    // Configure Nodemailer (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Set in Vercel env vars
        pass: process.env.GMAIL_PASS, // Use an App Password
      },
    });

    // Send email to yourself
    await transporter.sendMail({
      from: `"Website Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Your email
      replyTo: `${name} <${email}>`, // Visitor's email (for replies)
      subject: `New message from ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

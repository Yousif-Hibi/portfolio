import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g., "yourname@gmail.com"
      pass: process.env.EMAIL_PASS, // e.g., "abcdefghijklmnop"
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: "yousif.hibi@gmail.com",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}

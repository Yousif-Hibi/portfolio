import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Input validation
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Simple spam protection
  if (req.body.honeypot || message.length > 1000) {
    return res.status(200).json({ success: true }); // Silent fail for bots
  }

  // Environment check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email credentials not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Optional settings for better reliability:
    pool: true,
    maxConnections: 1,
    rateDelta: 20000, // 20 seconds delay between messages
    maxMessages: 3,
  });

  // Email content
  const mailOptions = {
    from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
    to: "yousif.hibi@gmail.com",
    replyTo: email, // Allows direct reply to sender
    subject: `New message from ${name} (Website Contact)`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin-top: 5px;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p style="margin-top: 20px; font-size: 0.8em; color: #666;">
          Sent from website contact form
        </p>
      </div>
    `,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);

    let errorMessage = "Failed to send email";
    if (error.code === "EAUTH") {
      errorMessage = "Authentication failed - check email settings";
    } else if (error.code === "EENVELOPE") {
      errorMessage = "Invalid recipient address";
    }

    return res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

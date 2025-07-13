import nodemailer from "nodemailer";

// Helper function to validate email inputs
const validateInput = ({ name, email, message }) => {
  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format");
  }
};

export default async function handler(req, res) {
  // Set CORS headers (adjust origin in production)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }

  try {
    // 1. Validate input
    const { name, email, message } = req.body;
    validateInput({ name, email, message });

    // 2. Configure transporter (Gmail + SendGrid fallback)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Optional: Timeout settings
      connectionTimeout: 5000,
      socketTimeout: 10000,
    });

    // 3. Prepare email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || "yousif.hibi@gmail.com",
      subject: `New message from ${name} (via Contact Form)`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // 4. Send email
    await transporter.sendMail(mailOptions);

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email send error:", error);

    // Specific error messages for common cases
    let errorMessage = "Failed to send email";
    if (error.message.includes("Invalid login")) {
      errorMessage = "Email authentication failed (check credentials)";
    } else if (error.message.includes("ENOTFOUND")) {
      errorMessage = "Email server connection failed";
    } else if (error.message.includes("Timeout")) {
      errorMessage = "Email server timeout";
    }

    return res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

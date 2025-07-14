const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const { name, email, message } = JSON.parse(event.body);

    // Configure Nodemailer (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Set in Netlify dashboard
        pass: process.env.GMAIL_PASS, // Set in Netlify dashboard
      },
    });

    await transporter.sendMail({
      from: `"Website Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email, // So you can reply to the visitor
      subject: `New message from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
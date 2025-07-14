import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contactsc">
      <h1 className="title">Contact info</h1>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <span className="heading">Get in touch</span>
          <input
            placeholder="Name"
            type="text"
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Say Hello"
            rows="10"
            name="message"
            className="textarea"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <div className="button-container">
            <button
              type="submit"
              className="send-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
          {submitStatus === "success" && (
            <p className="success-message">Message sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="error-message">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;

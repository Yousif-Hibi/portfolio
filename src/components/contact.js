import React, { useState, useEffect } from "react";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contactsc">
      <h1 className="title">Contact info</h1>

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <span className="heading">Get in touch</span>

          <div className="input-group">
            <input
              placeholder="Name"
              type="text"
              className={`input ${errors.name ? "error" : ""}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder="Email"
              type="email"
              className={`input ${errors.email ? "error" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <textarea
              placeholder="Say Hello"
              rows="10"
              name="message"
              className={`textarea ${errors.message ? "error" : ""}`}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && (
              <span className="error-text">{errors.message}</span>
            )}
          </div>

          <div className="button-container">
            <button
              type="submit"
              className="send-button"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          {submitStatus === "success" && (
            <p className="success-message" role="status">
              Message sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="error-message" role="alert">
              Failed to send. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css"; // Importing CSS file

const ContactPage = () => {
  const [firstName, setFirstName] = useState(""); // State for First Name
  const [lastName, setLastName] = useState(""); // State for Last Name
  const [phone, setPhone] = useState(""); // State for Phone Number
  const [message, setMessage] = useState(""); // State for Message
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(false); // Success message state
  const [timer, setTimer] = useState(43200); // 12 hours (43200 seconds)

  const chatId = "5838205785"; // Telegram chat ID
  const telegramBotId = "7753999301:AAF44xI3AzisnwNu-sCWu5cVs8gnadqx9JY"; // Telegram bot token
  const url = `https://api.telegram.org/bot${telegramBotId}/sendMessage`; // Telegram API URL

  const sendRequest = async (e) => {
    e.preventDefault(); // Prevent page reload

    const messageContent = `👤 First Name: ${firstName}\n👤 Last Name: ${lastName}\n📞 Phone: ${phone}\n✉️ Message: ${message}\n🆔 ID: ${chatId}`;

    const formData = {
      chat_id: chatId,
      text: messageContent,
    };

    setLoading(true); // Start loading
    setError(""); // Clear error message
    setSuccess(false); // Clear success state

    try {
      await axios.post(url, formData);
      setSuccess(true); // Set success state
      // Clear form fields
      setFirstName("");
      setLastName("");
      setPhone("");
      setMessage("");
      startTimer(); // Start timer
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Something went wrong!"); // Show error message
    } finally {
      setLoading(false); // End loading
    }
  };

  const startTimer = () => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCloseModal = () => {
    setSuccess(false); // Close modal
    setTimer(43200); // Reset timer
  };

  return (
    <div className="for-back">
      <div className="contact-page">
        <h1 className="contact-title">Contact Us</h1>
        <form className="contact-form" onSubmit={sendRequest}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              className={`js-first-name ${error ? "input-error" : ""}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              className={`js-last-name ${error ? "input-error" : ""}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              className={`js-phone ${error ? "input-error" : ""}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              className={`js-message ${error ? "input-error" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          {error && <div className="error-message">{error}</div>} {/* Error message */}
          <button type="submit" className="load-more submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {/* Display success overlay */}
        {success && (
          <div className="overlay" onClick={handleCloseModal}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
              <h1>Your message has been successfully sent!</h1>
              <p>We will contact you within 12 hours.</p>
              <div id="timer">{formatTime(timer)}</div>
              <img
                src="https://madhous3.ru/png/success.gif"
                height="50"
                width="50"
                alt="Success Icon"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

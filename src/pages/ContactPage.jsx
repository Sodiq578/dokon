import React, { useState } from "react";
import axios from "axios";
import "./Contact.css"; // CSS faylini import qilish

const ContactPage = () => {
  const [name, setName] = useState(""); // Ismni saqlash uchun state
  const [email, setEmail] = useState(""); // Emailni saqlash uchun state
  const [message, setMessage] = useState(""); // Xabarni saqlash uchun state
  const [loading, setLoading] = useState(false); // Yuklash holati
  const [error, setError] = useState(""); // Xato holati

  const handleSubmit = async (e) => {
    e.preventDefault(); // Formani yuborishda sahifaning yangilanishini oldini olish
    const botToken = "7753999301:AAF44xI3AzisnwNu-sCWu5cVs8gnadqx9JY"; // Telegram bot tokenini kiriting
    const chatId = "5838205785"; // Telegram chat ID'ni kiriting

    const text = `
      Ism: ${name}
      Email: ${email}
      Xabar: ${message}
    `;

    setLoading(true); // Yuklash holatini faollashtirish

    try {
      await axios.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }
      );

      // Formani tozalash
      setName("");
      setEmail("");
      setMessage("");
      setError(""); // Xatoni tozalash
      alert("Xabar muvaffaqiyatli jo'natildi!");
    } catch (err) {
      console.error("Xabar jo'natishda xatolik:", err);
      setError("Xabar jo'natishda xatolik yuz berdi.");
    } finally {
      setLoading(false); // Yuklash holatini to'xtatish
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Biz bilan bog'laning</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="info-title">Aloqa ma'lumotlari</h2>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
          <p>Telefon: <a href="tel:+123456789">+1 234 567 89</a></p>
          <p>Manzil: Tashkent, Uzbekistan</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Xabar qoldiring</h2>
          {error && <div className="error-message">{error}</div>} {/* Xato xabari */}
          <div className="form-group">
            <label htmlFor="name">Ismingiz:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Xabar:</label>
            <textarea
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

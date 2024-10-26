import React, { useState } from "react";
import axios from "axios";
import "./Contact.css"; // CSS faylini import qilish

const ContactPage = () => {
  const [firstName, setFirstName] = useState(""); // Ism uchun state
  const [lastName, setLastName] = useState(""); // Familiya uchun state
  const [phone, setPhone] = useState(""); // Telefon raqami uchun state
  const [complaint, setComplaint] = useState(""); // Shikoyat uchun state
  const [loading, setLoading] = useState(false); // Yuklanish jarayonini ko'rsatish uchun state
  const [error, setError] = useState(""); // Xatolik xabarini ko'rsatish uchun state
  const [success, setSuccess] = useState(false); // Muvaffaqiyatli yuborilganligini ko'rsatish uchun state

  const chatId = "5838205785"; // Telegram chat ID
  const telegramBotId = "7753999301:AAF44xI3AzisnwNu-sCWu5cVs8gnadqx9JY"; // Telegram bot tokeni
  const url = `https://api.telegram.org/bot${telegramBotId}/sendMessage`; // Telegram API uchun URL

  const sendRequest = async (e) => {
    e.preventDefault(); // Sahifani yangilanishini oldini olish

    const message = `
👤 Ism: ${firstName}
👤 Familiya: ${lastName}
📞 Telefon: ${phone}
📝 Shikoyat: ${complaint}
🆔 ID: ${chatId}
    `;

    const formData = {
      chat_id: chatId,
      text: message,
    };

    setLoading(true); // Yuklanishni boshlash
    setError(""); // Xato xabarini tozalash
    setSuccess(false); // Muvaffaqiyatli holatini tozalash

    try {
      await axios.post(url, formData);
      setSuccess(true); // Muvaffaqiyatli holatini o'rnatish
      // Formani tozalash
      setFirstName("");
      setLastName("");
      setPhone("");
      setComplaint("");
    } catch (err) {
      console.error("Xabar jo'natishda xatolik:", err);
      setError("Nimadir xato ketdi!"); // Xato holatida xabar ko'rsatish
    } finally {
      setLoading(false); // Yuklanishni tugatish
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Ro'yxatdan o'tish</h1>
      <form className="contact-form" onSubmit={sendRequest}>
        <div className="form-group">
          <label htmlFor="firstName">Ismingiz:</label>
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
          <label htmlFor="lastName">Familiyangiz:</label>
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
          <label htmlFor="phone">Telefon raqamingiz:</label>
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
          <label htmlFor="complaint">Shikoyatingiz:</label>
          <textarea
            id="complaint"
            className={`js-complaint ${error ? "input-error" : ""}`}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <div className="error-message">{error}</div>} {/* Xato xabari */}
        {success && <div className="success-message">Sizning so'rovingiz qabul qilindi. Sizga aloqaga chiqamiz! 👋</div>} {/* Muvaffaqiyatli xabar */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;

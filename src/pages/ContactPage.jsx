import React, { useState, useEffect } from "react";
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
  const [timer, setTimer] = useState(43200); // 12 soat (43200 soniya)

  const chatId = "5838205785"; // Telegram chat ID
  const telegramBotId = "7753999301:AAF44xI3AzisnwNu-sCWu5cVs8gnadqx9JY"; // Telegram bot tokeni
  const url = `https://api.telegram.org/bot${telegramBotId}/sendMessage`; // Telegram API uchun URL

  const sendRequest = async (e) => {
    e.preventDefault(); // Sahifani yangilanishini oldini olish

    const message = `👤 Ism: ${firstName}\n👤 Familiya: ${lastName}\n📞 Telefon: ${phone}\n📝 Shikoyat: ${complaint}\n🆔 ID: ${chatId}`;

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
      startTimer(); // Timerni boshlash
    } catch (err) {
      console.error("Xabar jo'natishda xatolik:", err);
      setError("Nimadir xato ketdi!"); // Xato holatida xabar ko'rsatish
    } finally {
      setLoading(false); // Yuklanishni tugatish
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
    setSuccess(false); // Modalni yopish
    setTimer(43200); // Timerni tiklash
  };

  return (
<div className="for-back">
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
      <button type="submit" className="load-more submit-btn" disabled={loading}>
        {loading ? "Yuborilmoqda..." : "Yuborish"}
      </button>
    </form>

    {/* Overlay va kontent ko'rinishini ko'rsatish */}
    {success && (
      <div className="overlay" onClick={handleCloseModal}>
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <h1>Ваше сообщение успешно отправлено!</h1>
          <p>Мы свяжемся с вами в течение 12 часов.</p>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Yo'naltirish uchun

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Agar foydalanuvchi ro'yxatdan o'tgan bo'lsa, to'g'ridan-to'g'ri profil sahifasiga o'tkazish
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Oddiy login tekshiruvi (buni haqiqiy API qo'ng'irog'i bilan almashtiring)
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/profile'); // Muvaffaqiyatli login bo'lsa, profil sahifasiga yo'naltirish
    } else {
      alert('Noto\'g\'ri ma\'lumotlar');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

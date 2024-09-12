import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Foydalanuvchini olish

  const handleLogout = () => {
    localStorage.removeItem('user'); // Foydalanuvchini o'chirish
    navigate('/login'); // Login sahifasiga qaytarish
  };

  if (!user) {
    return <p>Foydalanuvchi topilmadi. Iltimos, tizimga kiring.</p>;
  }

  return (
    <div>
      <h1>Salom, {user.name}</h1>
      <img src={user.picture} alt="Profil rasmi" />
      <button onClick={handleLogout}>Chiqish</button>
    </div>
  );
};

export default ProfilePage;

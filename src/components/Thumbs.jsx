import React, { useState } from 'react';
import './Thumbs.css'; // CSS faylini qo'shish
import thumbs1 from '../img/thumbs1.svg';
import thumbs2 from '../img/thumbs2.svg';
import thumbs3 from '../img/thumbs3.svg';
import thumbs4 from '../img/thumbs4.svg';

const Thumbs = () => {
  const [mainImage, setMainImage] = useState(thumbs1); // Katta rasm uchun lokal rasm
  const [currentIndex, setCurrentIndex] = useState(0); // Hozirgi kichik rasm indeksi

  const smallImages = [thumbs1, thumbs2, thumbs3, thumbs4]; // Kichik rasmlar lokal rasm

  const handleImageClick = (src, index) => {
    setMainImage(src);
    setCurrentIndex(index); // Hozirgi kichik rasm indeksini yangilash
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % smallImages.length; // Keyingi rasm indeksi
    setMainImage(smallImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + smallImages.length) % smallImages.length; // Oldingi rasm indeksi
    setMainImage(smallImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="thumbs-wrapper container">
      <div className="main-wrapper">
        <div className="main-image-box">
          <img src={mainImage} alt="Main" className="main-image-bottom" />
        </div>
        <div className="small-images-container">
          {smallImages.map((src, index) => (
            <img 
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              className={`small-image ${index === currentIndex ? 'active' : ''}`} // Hozirgi kichik rasmga klass qo'shish
              onClick={() => handleImageClick(src, index)}
            />
          ))}
        </div>
      </div>
      <div className="content-section">
        <h2 className="content-title">Tabiiy asal haqida ma’lumot</h2>
        <p className="content-description">Tabiiy asal — asalari tomonidan gul nektaridan to'liq tabiiy jarayon orqali ishlab chiqariladigan mahsulotdir. Bu asal tarkibida sun'iy qo'shimchalar yoki shakar yo'q. U nafaqat shirinlik sifatida, balki sog'liq uchun foydali bo'lgan ko'plab xususiyatlarga ega:</p>
        <ol className='content-list'>
          <li className='content-list-item'>Vitamin va minerallar: Tabiiy asal A, B, C vitaminlari, kaliy, kaltsiy, temir kabi muhim ozuqalar bilan boy.</li>
          <li className='content-list-item'>Antibakterial va antioksidant xususiyatlar: Asalni yaralarni davolashda va immunitetni mustahkamlashda qo'llash mumkin.</li>
          <li className='content-list-item'>Energiya manbai: Asal tez so'riladigan tabiiy shakar bo'lgani uchun energiyani tezda oshiradi va kuch-quvvat beradi.</li>
        </ol>
      </div>
    </div>
  );
};

export default Thumbs;

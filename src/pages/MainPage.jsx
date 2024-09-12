import React, { useEffect, useRef, useState } from 'react';
import './MainPage.css';
import imgCarusel from "../img/img-carseulwhan.jpeg";
import imgCaruseltwoo from "../img/carsuelImgTwoo.jpeg";
import imgCaruselThree from "../img/img-carseulwhan.jpeg";

const MainPage = () => {
  const [index, setIndex] = useState(0);
  const carouselInnerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = [imgCarusel, imgCaruseltwoo, imgCaruselThree]; // Tasvirlarni to'plang

  const showSlide = (n) => {
    if (n >= images.length) setIndex(0);
    else if (n < 0) setIndex(images.length - 1);
    else setIndex(n);

    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) {
      showSlide(index + 1); // O'ngdan chapga surilgan
    }
    if (touchStartX.current - touchEndX.current < -50) {
      showSlide(index - 1); // Chapdan o'ngga surilgan
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showSlide(index + 1);
    }, 5000); // 5 sekundda avtomatik o'tish

    return () => clearInterval(interval); // Komponent unmount bo'lganda intervalni to'xtatish
  }, [index]);

  return (
    <div className="main-page">
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-inner" ref={carouselInnerRef}>
          {images.map((img, idx) => (
            <div className="carousel-item" key={idx}>
              <img src={img} alt={`Image ${idx + 1}`} />
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`carousel-indicator ${index === idx ? 'active' : ''}`}
              onClick={() => showSlide(idx)}
            />
          ))}
        </div>
      </div>
      <section className="about-us">
        <h1>Biz Haqimizda</h1>
        <p>Kompaniyamiz haqida qisqa ma'lumot.</p>
      </section>
      <section className="features">
        <h2>Xususiyatlar</h2>
        <div className="feature">
          <h3>Xususiyat 1</h3>
          <p>Tavsif 1</p>
        </div>
        <div className="feature">
          <h3>Xususiyat 2</h3>
          <p>Tavsif 2</p>
        </div>
        {/* Qo'shimcha xususiyatlar */}
      </section>
    </div>
  );
};

export default MainPage;

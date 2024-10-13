import React, { useState, useEffect } from 'react';
import './BigSlider.css';
import Imgslider from '../img/carusel-asal rasmi.webp'; // Import qilingan rasm

const BigSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Har 3 sekundda slayd almashadi

    return () => clearInterval(slideInterval);
  }, [slides.length]);


  return (
    <div className="big-slider">
      <div className="slide" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
        <div className="slide-content">
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>
    </div>
  );
};

export default BigSlider;

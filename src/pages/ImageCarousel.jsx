import React, { useEffect, useState } from 'react';
import './ImageCarousel.css';
import Imgslider from '../img/carsuelAsal3.jpeg'; // Import qilingan rasm
import imgSlider2 from '../img/asalcarusel2.jpg';
import imgSlider3 from "../img/asalRasimunsp1.avif";
import imgSlider5 from "../img/asalrasimunsp3.avif";
import imgSlider6 from "../img/imgunsp4.avif"; // Bu ham import qilingan rasm
import imgSlider7 from "../img/imgunps5.avif"; // Bu ham import qilingan rasm
import imgSlider8 from "../img/imgunps6.avif"; // Bu ham import qilingan rasm
import imgSlider9 from "../img/imgunsp7.avif"; // Bu ham import qilingan rasm

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first duplicate
  const itemWidth = 320; // Image width (300px) + margin-right (20px)

  // Import qilingan rasmlarni saqlash
  useEffect(() => {
    const allImages = [
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
      imgSlider9,
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
      imgSlider9,
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
<<<<<<< HEAD
      imgSlider9,
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
      imgSlider9,
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
      imgSlider9,
      Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
=======
>>>>>>> 22aa6dacf8b05926782f71211ce29377d338f41d
      imgSlider9,  Imgslider,
      imgSlider2,
      imgSlider3,
      imgSlider5,
      imgSlider6,
      imgSlider7,
      imgSlider8,
      imgSlider9,
    ];
    
    setImages([allImages, ...allImages, allImages[0]]); // Cheksiz aylanish uchun tasvirlarni ikki marta qo'shamiz va birinchi tasvirni oxirida qaytadan qo'shamiz
  }, []);

  // Automatic slide transition
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [currentIndex]);

  // Infinite scrolling - wrap around logic
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 1 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 2 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Carousel item ${index}`} className="carousel-img" />
          </div>
        ))}
      </div>

      {/* Control buttons */}
      
    </div>
  );
};

export default ImageCarousel;

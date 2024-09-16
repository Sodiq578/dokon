import React, { useEffect, useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 320; // Image width (300px) + margin-right (20px)

  // API'dan rasmlarni olish
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setImages(data.map(product => product.image));
      } catch (error) {
        console.error('Rasmlarni olishda xato:', error);
      }
    };

    fetchImages();
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
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Carousel item ${index}`} className="carousel-img" />
          </div>
        ))}
      </div>

      {/* Control buttons */}
      <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
        Prev
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default ImageCarousel;

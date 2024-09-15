import React from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image} alt={`carousel-item-${index}`} className="carousel-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

import React, { useState } from 'react';
import './Thumbs.css'; // Adding the CSS file
import thumbs1 from '../img/thumbs1.svg';
import thumbs2 from '../img/thumbs2.svg';
import thumbs3 from '../img/thumbs3.svg';
import thumbs4 from '../img/thumbs4.svg';

const Thumbs = () => {
  const [mainImage, setMainImage] = useState(thumbs1); // Local image for the main display
  const [currentIndex, setCurrentIndex] = useState(0); // Current index of the thumbnail

  const smallImages = [thumbs1, thumbs2, thumbs3, thumbs4]; // Local images for thumbnails

  const handleImageClick = (src, index) => {
    setMainImage(src);
    setCurrentIndex(index); // Update current thumbnail index
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % smallImages.length; // Next image index
    setMainImage(smallImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + smallImages.length) % smallImages.length; // Previous image index
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
              className={`small-image ${index === currentIndex ? 'active' : ''}`} // Add class to the current thumbnail
              onClick={() => handleImageClick(src, index)}
            />
          ))}
        </div>
      </div>
      <div className="content-section">
        <h2 className="content-title">Information About Natural Honey</h2>
        <p className="content-description">
          Natural honey is a product produced by bees from flower nectar through a complete natural process. This honey does not contain artificial additives or sugars. It possesses many beneficial properties for health, not just as a sweetener:
        </p>
        <ol className='content-list'>
          <li className='content-list-item'>Vitamins and minerals: Natural honey is rich in essential nutrients such as vitamins A, B, C, potassium, calcium, and iron.</li>
          <li className='content-list-item'>Antibacterial and antioxidant properties: Honey can be used for wound healing and boosting the immune system.</li>
          <li className='content-list-item'>Source of energy: Because honey is a quickly absorbed natural sugar, it rapidly boosts energy levels and provides strength.</li>
        </ol>
      </div>
    </div>
  );
};

export default Thumbs;

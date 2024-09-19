import React, { useState, useEffect } from 'react';
import './BigSlider.css';

const BigSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); // API manzili
        const data = await response.json();
        // API dan kelgan ma'lumotni slayd formatiga moslashtiramiz
        const formattedSlides = data.slice(0, 3).map((item) => ({
          image: item.image, // API dan kelgan rasm
          title: item.title, // API dan kelgan nom
          description: item.description // API dan kelgan izoh
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Har 3 sekundda slayd almashadi

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  if (slides.length === 0) {
    return <div>Loading...</div>; // Ma'lumot kelguncha yuklanayotgan holati
  }

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

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Accordion.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItems = [
    {
      question: "How much does honey cost?",
      answer: "The price of honey can vary depending on the specific type of honey you're interested in and the quantity you want to purchase."
    },
    {
      question: "Why choose us?",
      answer: "Choosing us means you're opting for high-quality honey that is 100% pure, natural, and sourced from beekeepers who follow sustainable practices."
    },
    {
      question: "Do you offer delivery?",
      answer: "Yes, we offer delivery services both locally and internationally, making it convenient for you to enjoy our honey no matter where you are."
    },
    {
      question: "How can I place an order?",
      answer: "Placing an order is easy on our website. Simply browse through our selection, add items to your cart, and proceed to checkout."
    },
    {
      question: "What types of honey do you sell?",
      answer: "We offer a wide variety of honey types including wildflower honey, clover honey, acacia honey, and more."
    }
  ];

  return (
    <div className="container accordion-container">
      <ul className="accordion-list">
        {faqItems.map((item, index) => (
          <li 
            key={index} 
            className={activeIndex === index ? 'active' : ''} 
            onClick={() => toggleAccordion(index)}
            data-aos="fade-left" 
            data-aos-duration="500"
          >
            <h3>{item.question}</h3>
            <div className="answer">
              <p>{item.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;

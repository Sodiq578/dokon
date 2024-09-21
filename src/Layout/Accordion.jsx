import React, { useState } from 'react';
import './Accordion.css'; // Create this CSS file for styling

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItems = [
    {
      question: "How much does a website cost?",
      answer: `While we would love to be able to give a definitive, fixed price for a website...`
    },
    {
      question: "Nega aynan bizni tanlashingiz kerak?",
      answer: `Bizni tanlash sababi...`
    },
    {
      question: "How much does a website cost?",
      answer: `While we would love to be able to give a definitive, fixed price for a website...`
    },
    {
      question: "Nega aynan bizni tanlashingiz kerak?",
      answer: `Bizni tanlash sababi...`
    }, {
      question: "How much does a website cost?",
      answer: `While we would love to be able to give a definitive, fixed price for a website...`
    },
    {
      question: "Nega aynan bizni tanlashingiz kerak?",
      answer: `Bizni tanlash sababi...`
    }, {
      question: "How much does a website cost?",
      answer: `While we would love to be able to give a definitive, fixed price for a website...`
    },
    {
      question: "Nega aynan bizni tanlashingiz kerak?",
      answer: `Bizni tanlash sababi...`
    },
    
    // Qo'shimcha savollar va javoblar
  ];

  return (
    <div className="container accordion-container">
      <ul className="accordion-list">
        {faqItems.map((item, index) => (
          <li 
            key={index} 
            className={activeIndex === index ? 'active' : ''} 
            onClick={() => toggleAccordion(index)} // Bu yerga `onClick` ni li tagiga ham qo'shyapmiz
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

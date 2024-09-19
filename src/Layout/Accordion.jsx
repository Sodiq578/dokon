// Accordion.jsx
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
      answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
      With that being said - here are some general guidelines on what to expect from a pricing standpoint.
      If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
      Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
    },

    {
        question: "Nega aynan bizni tanlashingiz kerak",
        answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
        With that being said - here are some general guidelines on what to expect from a pricing standpoint.
        If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
        Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
      },  {
        question: "How much does a website cost?",
        answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
        With that being said - here are some general guidelines on what to expect from a pricing standpoint.
        If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
        Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
      },
  
      {
          question: "Nega aynan bizni tanlashingiz kerak",
          answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
          With that being said - here are some general guidelines on what to expect from a pricing standpoint.
          If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
          Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
        },
        {
            question: "How much does a website cost?",
            answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
            With that being said - here are some general guidelines on what to expect from a pricing standpoint.
            If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
            Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
          },
      
          {
              question: "Nega aynan bizni tanlashingiz kerak",
              answer: `While we would love to be able to give a definitive, fixed price for a website, it really depends on the specific needs for each individual business. If one business needs a website comprised of five pages, while another has a substantially larger site of over 100 pages - obviously those projects are going to command different price points.
              With that being said - here are some general guidelines on what to expect from a pricing standpoint.
              If you can get by with a small website (between 3 - 10 pages) using a pre-designed template, you can expect to pay approximately $2,500.00. A mid-sized website that has anywhere from 11 - 25 pages, but still uses a pre-made template, will be between $3,000.00 - $5,000.00. If you have a lot of pages, are looking for something completely custom, or are looking for something that has special functionality such as eCommerce, custom calculators, or integrations with other services, you may be looking at anywhere from $10,000 - $20,000.
              Ultimately, the takeaway here is that we can accommodate projects of just about any budget - so long as expectations are set accordingly.`
            },
            
    // Add other FAQ items here...
  ];

  return (
    
    <div className="container accordion-container">
      <ul className="accordion-list">
        {faqItems.map((item, index) => (
          <li key={index} className={activeIndex === index ? 'active' : ''}>
            <h3 onClick={() => toggleAccordion(index)}>{item.question}</h3>
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

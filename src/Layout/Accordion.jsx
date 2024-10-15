import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Accordion.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

 

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItems = [
    {
      question: "How much does honey cost?",
      answer: "The price of honey can vary depending on several factors. For instance, the specific type of honey, such as wildflower, clover, or acacia honey, can have different prices. Additionally, the quantity you purchase plays a role—larger orders typically come with bulk pricing or discounts. Seasonal availability and the geographical location where the honey is sourced from may also affect the cost, as some regions produce honey that is more expensive due to rarity or higher production costs."
    },
    {
      question: "Why choose us?",
      answer: "Choosing us means you’re not just purchasing honey—you’re investing in a product that is 100% pure, natural, and free from additives. Our honey is sourced directly from beekeepers who follow sustainable practices, ensuring the health of bee populations and the environment. We prioritize quality and customer satisfaction, offering a variety of honey types that cater to different tastes. Furthermore, our commitment to eco-friendly packaging and ethical sourcing sets us apart from the competition, ensuring that when you buy from us, you're supporting responsible and environmentally conscious production methods."
    },
    {
      question: "Do you offer delivery?",
      answer: "Yes, we offer comprehensive delivery services both locally and internationally. No matter where you are, you can conveniently receive our premium honey at your doorstep. For local deliveries, we ensure a fast turnaround time so you can enjoy fresh honey as soon as possible. For international deliveries, we collaborate with reliable shipping companies to make sure your order arrives safely and on time, packaged securely to maintain the quality and freshness of the honey. We also provide tracking information, so you can monitor the progress of your shipment at any time."
    },
    {
      question: "How can I place an order?",
      answer: "Placing an order on our website is quick and straightforward. All you need to do is browse through our selection of honey products, which are categorized for easy navigation. Once you’ve chosen your desired products, simply add them to your cart. From there, proceed to the checkout page where you can review your order, select your preferred shipping method, and make a secure payment. We accept a variety of payment options, including credit/debit cards and online payment platforms. Once your order is confirmed, you’ll receive an email with the order details and tracking information."
    },
    {
      question: "What types of honey do you sell?",
      answer: "We pride ourselves on offering a diverse range of honey types to suit various preferences and culinary needs. Our selection includes popular varieties such as wildflower honey, known for its complex and aromatic flavor, and clover honey, which is mild and sweet. We also offer acacia honey, prized for its light color and delicate taste, and many more options. Each type of honey we sell is harvested from specific floral sources, ensuring distinct flavors, colors, and textures. Whether you’re looking for honey to sweeten your tea, use in cooking, or enjoy by itself, we have something for everyone."
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
            
            data-aos-duration="500"
            data-aos-once="true" // AOS faqat bir martta ishlaydi
          >
            <h3>{item.question}</h3>
            <div className={`answer ${activeIndex === index ? 'show' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;

import React, { useEffect, useState } from 'react';
import './Modal.css'; // Custom styles

const Modal = ({ isOpen, onClose, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Skrolni o'chirish
    } else {
      document.body.style.overflow = 'auto'; // Skrolni qaytarish
      setTimeout(() => setIsVisible(false), 300); // Fade-out animatsiyasi uchun vaqt
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>Yopish</button>
        {content}
      </div>
    </div>
  );
};

export default Modal;

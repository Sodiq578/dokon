import React from 'react';
import './Modal.css'; // If you have custom styles

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close the modal if the overlay (background) is clicked
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>Yopish</button>
        {content}
      </div>
    </div>
  );
};

export default Modal;

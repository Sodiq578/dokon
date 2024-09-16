import React from 'react';
import './Modal.css'; // If you have custom styles

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>Close</button>
        {content}
      </div>
    </div>
  );
};

export default Modal;

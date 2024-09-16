import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;

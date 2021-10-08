import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

function Modal(props) {
  useEffect(() => {
    const modalContainer = document.getElementById('modal-container');
    const handleClose = (e) => {
      if (e.target === modalContainer) {
        props.closeModal();
      }
    };
    modalContainer.addEventListener('click', handleClose);
    return () => modalContainer.removeEventListener('click', handleClose);
  });
  return (
    <div id="modal-container" className="modal">
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func,
};

export default Modal;

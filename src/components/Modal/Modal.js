import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import Proptypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, handleBackdropClick }) => {
  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: Proptypes.element.isRequired,
  handleBackdropClick: Proptypes.func.isRequired,
};

export default Modal;

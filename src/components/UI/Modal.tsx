import React from 'react';
import Backdrop from './Backdrop';

import classes from './Modal.module.scss';

type ModalProps = {
  show: boolean;
  clickToClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, clickToClose, children }) => {
  return (
    <>
      <Backdrop show={show} clicked={clickToClose} />
      <div
        className={classes.modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;

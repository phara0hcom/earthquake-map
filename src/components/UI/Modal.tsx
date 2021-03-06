import React from 'react';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import Backdrop from './Backdrop';

import classes from './Modal.module.scss';

type ModalProps = {
  show: boolean;
  clickToClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  show,
  clickToClose,
  children,
  className
}) => {
  const { render, animate } = useDelayUnmount(305, show);

  return render ? (
    <>
      <Backdrop show={animate} clicked={clickToClose} />
      <div
        className={`${classes.modal} ${className || classes.defaultModal}`}
        style={{
          transform: animate ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: animate ? '1' : '0'
        }}
      >
        {children}
      </div>
    </>
  ) : null;
};

export default Modal;

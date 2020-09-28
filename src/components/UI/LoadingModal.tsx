import React from 'react';
import Backdrop from './Backdrop';

import classes from './LoadingModal.module.scss';

type LoadingModalProps = {
  show: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
  return (
    <>
      <Backdrop show={show} />
      <div
        className={classes.modal}
        style={{
          opacity: show ? '1' : '0'
        }}
      >
        <div className={classes.loading} />
      </div>
    </>
  );
};

export default LoadingModal;

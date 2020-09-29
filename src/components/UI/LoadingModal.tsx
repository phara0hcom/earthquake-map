import React from 'react';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import Backdrop from './Backdrop';

import classes from './LoadingModal.module.scss';

type LoadingModalProps = {
  show: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
  const { render, animate } = useDelayUnmount(305, show);

  return render ? (
    <>
      <Backdrop show={animate} className={classes.loadingBack} />
      <div
        className={classes.modal}
        style={{
          opacity: animate ? '1' : '0'
        }}
      >
        <div className={classes.loading} />
      </div>
    </>
  ) : null;
};

export default LoadingModal;

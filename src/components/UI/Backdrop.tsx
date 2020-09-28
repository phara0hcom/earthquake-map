import React from 'react';

import classes from './Backdrop.module.scss';

type BackdropProps = {
  show: boolean;
  clicked?: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ show, clicked }) => {
  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (
      (event.key === 'Escape' || event.key === ' ' || event.key === 'Enter') &&
      clicked
    ) {
      clicked();
    }
  };

  return (
    <>
      {show ? (
        <div
          aria-label="close modal"
          className={classes.Backdrop}
          onKeyPress={onKeyPressHandler}
          onClick={clicked}
          role="button"
          tabIndex={0}
        />
      ) : null}
    </>
  );
};

export default Backdrop;

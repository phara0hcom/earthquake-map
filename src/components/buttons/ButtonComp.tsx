import React from 'react';

import classes from './ButtonComp.module.scss';

export interface ButtonCompProps {
  children: React.ReactNode;
  id: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  secondary?: boolean;
}

const ButtonComp: React.FC<ButtonCompProps> = ({
  children,
  onClick,
  id,
  disabled,
  className,
  secondary
}) => {
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`${
        classes[secondary ? 'buttonSecondary' : 'button']
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComp;

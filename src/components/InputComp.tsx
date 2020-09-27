import React, { useEffect, useRef } from 'react';

import classes from './InputComp.module.scss';

type InputCompProps = {
  type: 'text' | 'date' | 'number';
  id: string;
  value: number | string;
  hasError?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  max?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputComp: React.FC<InputCompProps> = ({
  type,
  placeholder,
  id,
  className,
  required,
  value,
  max,
  onChange,
  autoFocus,
  hasError
}) => {
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusRef && focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <input
      required={required}
      ref={autoFocus ? focusRef : null}
      type={type}
      placeholder={placeholder}
      id={id}
      className={`${classes.input} ${
        hasError ? classes.inputError : ''
      } ${className}`}
      value={value}
      max={max}
      onChange={onChange}
    />
  );
};

export default InputComp;

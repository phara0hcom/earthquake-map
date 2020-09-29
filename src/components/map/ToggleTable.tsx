import React from 'react';

import viewTable from '../../svg/view_list-24px.svg';

import classes from './ToggleTable.module.scss';

export interface ToggleTableProps {
  onClick: () => void;
}

const ToggleTable: React.SFC<ToggleTableProps> = ({ onClick }) => {
  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className={classes.toggleTable}
      onClick={onClick}
      aria-label="close modal"
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
    >
      <img
        src={viewTable}
        alt="show table"
        className={classes.toggleTableImg}
      />
      <div>Show Table</div>
    </div>
  );
};

export default ToggleTable;

import dayjs from 'dayjs';
import React from 'react';

import editSvg from '../../svg/edit-24px.svg';

import { DateSelectObj } from '../../hooks/useDateSelect';

import classes from './FromToInfoBox.module.scss';

type FromToInfoBoxProps = {
  dateRange: DateSelectObj;
  onClick: () => void;
};

const FromToInfoBox: React.FC<FromToInfoBoxProps> = ({
  dateRange,
  onClick
}) => {
  const { startDate, endDate } = dateRange;

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className={classes.fromToInfoBox}
      onClick={onClick}
      aria-label="close modal"
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
    >
      <img src={editSvg} className={classes.editIcon} alt="edit dates" />
      <div>{`From: ${dayjs(startDate).format('YYYY-MM-DD')}`}</div>
      <div>{`Till: ${dayjs(endDate).format('YYYY-MM-DD')}`}</div>
    </div>
  );
};

export default FromToInfoBox;

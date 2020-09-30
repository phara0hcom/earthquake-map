import dayjs from 'dayjs';
import React from 'react';

import { DateSelectObj, MagnitudeRange } from '../../hooks/useMapFilter';

import classes from './FromToInfoBox.module.scss';

type FromToInfoBoxProps = {
  dateRange: DateSelectObj;
  magnitudeRange: MagnitudeRange;
  onClick: () => void;
};

const FromToInfoBox: React.FC<FromToInfoBoxProps> = ({
  dateRange,
  magnitudeRange,
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
      <div className={classes.icon} />
      <div className={classes.values}>
        <div className={classes.dateRange}>
          <div>{`From: ${dayjs(startDate).format('YYYY-MM-DD')}`}</div>
          <div>{`Till: ${dayjs(endDate).format('YYYY-MM-DD')}`}</div>
        </div>
        <div>{`Magnitude: ${
          !magnitudeRange
            ? 'OFF'
            : `min = ${magnitudeRange.min} ~ max = ${magnitudeRange.max}`
        }`}</div>
      </div>
    </div>
  );
};

export default FromToInfoBox;

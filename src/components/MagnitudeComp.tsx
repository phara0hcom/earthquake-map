import React from 'react';
import { magnitudeScaleColors } from '../constants';

import classes from './MagnitudeComp.module.scss';

export interface MagnitudeCompProps {
  mag: number;
}

const MagnitudeComp: React.FC<MagnitudeCompProps> = ({ mag }) => (
  <div className={classes.magWrap}>
    <div
      className={classes.magColor}
      style={{ backgroundColor: magnitudeScaleColors[Math.floor(mag)] }}
    />
    {Math.round(mag * 10) / 10}
  </div>
);

export default MagnitudeComp;

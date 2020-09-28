import dayjs from 'dayjs';
import React from 'react';
import { FeatureProperties } from '../../api/earthquakeData';

import classes from './HoverToolTip.module.scss';

export type HoveredFeature = { properties: FeatureProperties };

type HoverToolTipProps = {
  hoveredFeature: HoveredFeature;
  x: number;
  y: number;
};

const HoverToolTip: React.FC<HoverToolTipProps> = ({
  hoveredFeature,
  x,
  y
}) => (
  <div className={classes.tooltip} style={{ left: x, top: y }}>
    <div>{hoveredFeature.properties.place}</div>
    <div>Magnitude: {hoveredFeature.properties.mag}</div>
    <div>
      Date:
      {` ${dayjs(hoveredFeature.properties.time).format(
        'YYYY-MM-DD HH:mm:ss'
      )}`}
    </div>
  </div>
);

export default HoverToolTip;
